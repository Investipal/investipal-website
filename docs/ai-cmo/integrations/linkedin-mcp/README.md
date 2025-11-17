# LinkedIn MCP Server Integration

Source: [linkedin-mcp-server](https://github.com/stickerdaniel/linkedin-mcp-server)

## Quick Setup (uvx)

1) Install uv (if needed):
```
curl -LsSf https://astral.sh/uv/install.sh | sh
```

2) Configure client to run the server with cookie env:
```
{
  "mcpServers": {
    "linkedin": {
      "command": "uvx",
      "args": [
        "--from",
        "git+https://github.com/stickerdaniel/linkedin-mcp-server",
        "linkedin-mcp-server"
      ],
      "env": {
        "LINKEDIN_COOKIE": "li_at=YOUR_COOKIE_VALUE"
      }
    }
  }
}
```

3) Optional: get cookie via CLI (may prompt for login / 2FA):
```
uvx --from git+https://github.com/stickerdaniel/linkedin-mcp-server \
  linkedin-mcp-server --get-cookie
```
Copy the `li_at` cookie value into `LINKEDIN_COOKIE`.

## HTTP Mode (optional)
```
uvx --from git+https://github.com/stickerdaniel/linkedin-mcp-server linkedin-mcp-server \
  --transport streamable-http --host 127.0.0.1 --port 8080 --path /mcp
```

## Notes
- Cookie expires ~30 days; refresh as needed.
- Use in accordance with LinkedIn’s Terms of Service.

## Troubleshooting
- Use `--no-headless` and `--no-lazy-init` for debugging login flows.
- Ensure ChromeDriver version matches your Chrome if developing locally.
























