import { type ImageBlockItem, type BlockItem, BlockTypes } from "@/types/block";
import { CSSProperties } from "react";

/**
 * Преобразовать объект стилей (react inline style) в email-friendly string (kebab-case)
 */
function getStyleString(properties: CSSProperties | undefined): string {
  if (!properties) return "";
  return Object.entries(properties)
    .filter(
      ([key, value]) =>
        key !== "content" && value !== undefined && value !== null
    )
    .map(([key, value]) => {
      // Convert camelCase to kebab-case
      const kebabKey = key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
      return `${kebabKey}:${value}`;
    })
    .join(";");
}

/**
 * TEXT BLOCK
 */
function renderTextBlock(block: BlockItem) {
  const style = getStyleString(block.properties);
  const content = block.properties?.content ?? "";

  return `<tr>
    <td>
      <div style="${style}">
        ${content}
      </div>
    </td>
  </tr>`;
}

/**
 * HEADING BLOCK
 */
function renderHeadingBlock(block: BlockItem) {
  const style = getStyleString(block.properties);
  const content = block.properties?.content ?? "";
  // h2 because HeadingBlock uses <h2>
  return `<tr>
    <td>
      <h2 style="${style}">
        ${content}
      </h2>
    </td>
  </tr>`;
}

/**
 * BUTTON BLOCK
 */
function renderButtonBlock(block: BlockItem) {
  const style = getStyleString(block.properties);
  const content = block.properties?.content ?? "";
  // In emails they use <a> styled as button, but for simplicity keep <button>
  return `<tr>
    <td>
      <button style="${style}" type="button">
        ${content}
      </button>
    </td>
  </tr>`;
}

/**
 * LINK BLOCK
 */
function renderLinkBlock(block: BlockItem) {
  const style = getStyleString(block.properties);
  const content = block.properties?.content ?? "";
  const href = block.href || "#";
  return `<tr>
    <td>
      <div style="${style}">
        <a href="${href}" style="color:inherit;text-decoration:underline;">${content}</a>
      </div>
    </td>
  </tr>`;
}

/**
 * IMAGE BLOCK
 */
function renderImageBlock(block: ImageBlockItem) {
  // .properties: rest of image styles
  // src/alt via .src, .alt
  const imgStyle = getStyleString(block.properties);

  // alignItems/justifyContent are handled by parent div in component, so follow suit
  const containerStyle = [
    "display:flex",
    block.properties?.alignItems
      ? `align-items:${block.properties.alignItems}`
      : "",
    block.properties?.justifyContent
      ? `justify-content:${block.properties.justifyContent}`
      : "",
    "width:100%",
  ]
    .filter(Boolean)
    .join(";");

  return `<tr>
    <td>
      <div style="${containerStyle}">
        <img src="${block.src || ""}" alt="${
    block.alt || ""
  }" style="${imgStyle}" />
      </div>
    </td>
  </tr>`;
}

/**
 * DIVIDER BLOCK
 */
function renderDividerBlock(block: BlockItem) {
  const style = getStyleString(block.properties);

  return `<tr>
    <td>
      <hr style="${style}" />
    </td>
  </tr>`;
}

/**
 * SPACER BLOCK
 */
function renderSpacerBlock(block: BlockItem) {
  const style = getStyleString(block.properties);

  // Match <div aria-hidden="true" ... />
  return `<tr>
    <td>
      <div style="${style}" aria-hidden="true"></div>
    </td>
  </tr>`;
}

// fallback + main switcher (by BlockTypes)
function renderBlock(block: BlockItem): string {
  switch (block.type) {
    case BlockTypes.text:
      return renderTextBlock(block);
    case BlockTypes.heading:
      return renderHeadingBlock(block);
    case BlockTypes.button:
      return renderButtonBlock(block);
    case BlockTypes.link:
      return renderLinkBlock(block);
    case BlockTypes.image:
      return renderImageBlock(block as ImageBlockItem);
    case BlockTypes.divider:
      return renderDividerBlock(block);
    case BlockTypes.spacer:
      return renderSpacerBlock(block);
    // columns will be done later
    case BlockTypes.columns:
      // return renderColumnsBlock(block as ColumnsBlockItem);
      return "";
    default:
      return "";
  }
}

/**
 * Экспортирует готовое HTML, сохраняет стили/структуру именно тех блоков, которые на канвасе.
 */
export function convertStoreCanvasToHTML(blocks: BlockItem[]) {
  // Email-friendly simple structure (optionally outer bg etc)
  const html = `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Email Card</title>
      <meta name="viewport" content="width=device-width" />
      <style>
        body {
          font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
          font-size: 16px;
          line-height: 1.5;
          color: #111827; /* Tailwind gray-900 */
          background: #f3f3f3;
          margin: 0;
          padding: 0;
          min-width: 100%;
        }
      </style>
    </head>
    <body style="Margin:0;padding:0;min-width:100%;background:#f3f3f3;">
      <center>
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background:#f3f3f3;padding:30px 0;">
          <tr>
            <td>
              <table role="presentation" align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="background:#fff;border-radius:4px;box-shadow:0 1px 8px rgba(0,0,0,0.06);Margin:0 auto;">
                <tr>
                  <td style="padding:40px 16px;">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="8px" width="100%">
                      ${blocks.map(renderBlock).join("\n")}
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </center>
    </body>
  </html>`;

  // download
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "email.html";
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 350);
}
