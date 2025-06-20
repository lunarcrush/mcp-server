More information on using LunarCrush AI & MCP Capabilities here: https://lunarcrush.com/developers/api/ai

# LunarCrush Remote MCP Server (preferred)

**Streamable HTTP**

```
{
  "mcpServers": {
    "LunarCrush": {
      "type": "http",
      "url": "https://lunarcrush.ai/mcp",
      "headers": {
        "Authorization": "Bearer ${input:lunarcrush-api-key}"
      }
    }
  }
}
```

**SSE**

```
{
  "mcpServers": {
    "LunarCrush": {
      "type": "http",
      "url": "https://lunarcrush.ai/sse",
      "headers": {
        "Authorization": "Bearer ${input:lunarcrush-api-key}"
      }
    }
  }
}
```

# LunarCrush stdio MCP Server

```
{
  "mcpServers": {
    "LunarCrush": {
      "command": "node",
      "args": ["<absolute_path_to_project_root>/index.js"],
      "env": {
        "LUNARCRUSH_API_KEY": "<your_lunarcrush_api_key>",
      }
    }
  }
}
```

## Authentication / API Key

Get your LunarCrush API keys here: https://lunarcrush.com/developers/api/authentication
