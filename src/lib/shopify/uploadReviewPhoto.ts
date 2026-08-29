import "server-only";
import { adminGraphqlFetch } from "@/lib/shopify/admin";

const STAGED_UPLOADS_CREATE = `
  mutation StagedUploadsCreate($input: [StagedUploadInput!]!) {
    stagedUploadsCreate(input: $input) {
      stagedTargets {
        url
        resourceUrl
        parameters { name value }
      }
      userErrors { field message }
    }
  }
`;

const FILE_CREATE = `
  mutation FileCreate($files: [FileCreateInput!]!) {
    fileCreate(files: $files) {
      files { id fileStatus }
      userErrors { field message }
    }
  }
`;

const FILE_STATUS_QUERY = `
  query FileStatus($id: ID!) {
    node(id: $id) {
      ... on File {
        fileStatus
        preview { image { url } }
      }
    }
  }
`;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Uploads a base64-encoded image to Shopify's Files storage and returns its
 * public CDN url. Judge.me only accepts publicly reachable image URLs, not
 * raw uploads, so this is the hop that makes photo reviews possible.
 * Returns null on any failure so callers can fall back gracefully.
 */
export async function uploadReviewPhoto(
  base64: string,
  filename: string,
  mimeType: string
): Promise<string | null> {
  try {
    const stagedData = await adminGraphqlFetch<{
      stagedUploadsCreate: {
        stagedTargets: Array<{ url: string; resourceUrl: string; parameters: Array<{ name: string; value: string }> }>;
        userErrors: Array<{ field: string[]; message: string }>;
      };
    }>(STAGED_UPLOADS_CREATE, {
      input: [
        {
          resource: "SHOP_IMAGE",
          filename,
          mimeType,
          httpMethod: "POST",
        },
      ],
    });

    const target = stagedData.stagedUploadsCreate.stagedTargets[0];
    if (!target || stagedData.stagedUploadsCreate.userErrors.length > 0) return null;

    const form = new FormData();
    for (const param of target.parameters) {
      form.append(param.name, param.value);
    }
    const buffer = Buffer.from(base64, "base64");
    form.append("file", new Blob([buffer], { type: mimeType }), filename);

    const uploadRes = await fetch(target.url, { method: "POST", body: form });
    if (!uploadRes.ok) return null;

    const fileData = await adminGraphqlFetch<{
      fileCreate: {
        files: Array<{ id: string; fileStatus: string }>;
        userErrors: Array<{ field: string[]; message: string }>;
      };
    }>(FILE_CREATE, {
      files: [
        {
          originalSource: target.resourceUrl,
          contentType: "IMAGE",
          alt: "Zdjęcie klienta do opinii",
        },
      ],
    });

    const file = fileData.fileCreate.files[0];
    if (!file || fileData.fileCreate.userErrors.length > 0) return null;

    for (let attempt = 0; attempt < 6; attempt++) {
      const statusData = await adminGraphqlFetch<{
        node: { fileStatus: string; preview: { image: { url: string } | null } | null } | null;
      }>(FILE_STATUS_QUERY, { id: file.id });

      const url = statusData.node?.preview?.image?.url;
      if (statusData.node?.fileStatus === "READY" && url) return url;

      await sleep(700);
    }

    return null;
  } catch (error) {
    console.error("uploadReviewPhoto failed", error);
    return null;
  }
}
