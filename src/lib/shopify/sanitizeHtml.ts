import sanitizeHtmlLib from "sanitize-html";

export function sanitizeArticleHtml(html: string): string {
    return sanitizeHtmlLib(html, {
        allowedTags: [
            "p", "br", "strong", "em", "u", "s", "a",
            "h1", "h2", "h3", "h4",
            "ul", "ol", "li",
            "blockquote", "img", "figure", "figcaption",
        ],
        allowedAttributes: {
            a: ["href", "title", "target", "rel"],
            img: ["src", "alt", "title"],
        },
        allowedSchemes: ["https", "mailto"],
    });
}