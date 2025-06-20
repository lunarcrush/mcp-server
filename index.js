import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { proxyServer } from "./proxy.js";
import { z } from "zod";

const args = process.argv;
if (Array.isArray(args)) {
  args.forEach((arg) => {
    if (arg.includes("/")) {
      //skip
    } else {
      if (arg && arg.length > 20) {
        // probably api key
        if (!process.env.LUNARCRUSH_API_KEY) {
          process.env.LUNARCRUSH_API_KEY = arg;
        }
      }
    }
  });
}
//console.log("args", args);

const clientTransport = new StreamableHTTPClientTransport(
  new URL(
    `https://lunarcrush.ai/mcp?key=${process.env.LUNARCRUSH_API_KEY || ""}`
  )
);

const client = new Client({
  name: "LunarCrush",
  version: "1.0.0",
});

// Create an MCP server
const server = new Server(
  {
    name: "LunarCrush",
    version: "1.0.0",
  },
  {
    capabilities: {
      prompts: {},
      resources: { subscribe: true },
      tools: {},
      //logging: {},
      completions: {},
    },
  }
);

export const configSchema = z.object({
  apiKey: z.string().describe("LunarCrush API key"),
});

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();

async function main() {
  await server.connect(transport);
  await client.connect(clientTransport);
  await proxyServer({ client, server });
}
main().catch((error) => {
  console.error("Error starting MCP proxy server:", error);
  process.exit(1);
});
// console.log(
//   "LunarCrush MCP Proxy Server is running... with client key",
//   process.env.LUNARCRUSH_API_KEY
// );
