import { StdioServerTransport } from "@modelcontextprotocol/server/stdio";
import { createServer } from "./server.js";

// stdout carries the MCP protocol, so every diagnostic message goes to stderr.
async function main(): Promise<void> {
  await createServer().connect(new StdioServerTransport());
  console.error("Weather MCP server is running on stdio");
}

main().catch((error: unknown) => {
  console.error("Weather MCP server failed to start:", error);
  process.exit(1);
});
