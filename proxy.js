import {
  CallToolRequestSchema,
  CompleteRequestSchema,
  GetPromptRequestSchema,
  ListPromptsRequestSchema,
  ListResourcesRequestSchema,
  ListResourceTemplatesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
  ResourceUpdatedNotificationSchema,
  SubscribeRequestSchema,
  UnsubscribeRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

export const proxyServer = async ({ client, server }) => {
  server.setRequestHandler(GetPromptRequestSchema, async (args) => {
    return client.getPrompt(args.params);
  });

  server.setRequestHandler(ListPromptsRequestSchema, async (args) => {
    return client.listPrompts(args.params);
  });
  server.setRequestHandler(ListResourcesRequestSchema, async (args) => {
    return client.listResources(args.params);
  });

  server.setRequestHandler(ListResourceTemplatesRequestSchema, async (args) => {
    return client.listResourceTemplates(args.params);
  });

  server.setRequestHandler(ReadResourceRequestSchema, async (args) => {
    return client.readResource(args.params);
  });

  server.setNotificationHandler(
    ResourceUpdatedNotificationSchema,
    async (args) => {
      return client.notification(args);
    }
  );

  server.setRequestHandler(SubscribeRequestSchema, async (args) => {
    return client.subscribeResource(args.params);
  });

  server.setRequestHandler(UnsubscribeRequestSchema, async (args) => {
    return client.unsubscribeResource(args.params);
  });

  server.setRequestHandler(CallToolRequestSchema, async (args) => {
    return client.callTool(args.params);
  });

  server.setRequestHandler(ListToolsRequestSchema, async (args) => {
    return client.listTools(args.params);
  });

  server.setRequestHandler(CompleteRequestSchema, async (args) => {
    return client.complete(args.params);
  });
};
