import DOMPurify from "isomorphic-dompurify";

export function sanitizeArticleHtml(html: string): string {
    return DOMPurify.sanitize(html, {
        ALLOWED_TAGS: [
            "p", "br", "strong", "em", "u", "s", "a",
            "h1", "h2", "h3", "h4",
            "ul", "ol", "li",
            "blockquote", "img", "figure", "figcaption",
        ],
        ALLOWED_ATTR: ["href", "src", "alt", "title", "target", "rel"],
    });
}