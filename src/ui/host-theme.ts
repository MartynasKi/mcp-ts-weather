import {
  applyDocumentTheme,
  applyHostFonts,
  applyHostStyleVariables,
  type McpUiHostContext,
} from "@modelcontextprotocol/ext-apps";

// Hosts send only the fields that changed, so each one is applied independently.
export function applyHostContext({ theme, styles, safeAreaInsets }: McpUiHostContext): void {
  if (theme) {
    applyDocumentTheme(theme);
  }
  if (styles?.variables) {
    applyHostStyleVariables(styles.variables);
  }
  if (styles?.css?.fonts) {
    applyHostFonts(styles.css.fonts);
  }
  if (safeAreaInsets) {
    const { top, right, bottom, left } = safeAreaInsets;
    document.body.style.padding = `${top}px ${right}px ${bottom}px ${left}px`;
  }
}
