---
title: "DA MCP: Giving AI Assistants Direct Access to Document Authoring"
description: I built a remote MCP server that connects AI assistants like Claude
  directly to Adobe's Document Authoring platform. Here's what it does, how it
  works, and how to get started.
category: work
tags:
  - adobe
  - aem
  - ai
images:
  feature: /assets/images/adaptto-2023.jpeg
date: 2026-03-16
permalink: da-mcp/
---
Over the past few months, AI assistants have gone from useful chat tools to something more interesting: agents that can actually *do* things. Not just draft text, but read files, write content, move things around, and connect to external systems. The key technology making this possible is the [Model Context Protocol](https://modelcontextprotocol.io) (MCP) — an open standard for giving AI tools structured access to external services.

I've been working deeply with [Document Authoring (DA)](https://da.live) — Adobe's content platform for Edge Delivery Services — and I kept thinking about the same question: what if Claude could just *talk* to DA directly? Not through copy-pasting, not through a browser, but as a first-class tool in a conversation?

So I built it.

## What is DA MCP?

[DA MCP](https://github.com/adobe-rnd/da-mcp) is a remote MCP server that gives AI assistants like Claude or ChatGPT direct access to DA management operations. Once connected, your AI assistant can browse your DA repositories, read and write files, create new pages, move content around, check version history, and look up media and fragment references — all without leaving the chat window.

Think of it as giving your AI assistant a command-line-like interface to DA. Instead of switching between tools and copying content back and forth, you can say things like:

> "Draft a new landing page at /products/overview and save it directly to DA."

or

> "Show me what changed in this document over the last week."

And it just does it.

## The 10 Tools

DA MCP exposes 10 tools covering the full content lifecycle:

| Tool | What it does |
|------|-------------|
| `da_list_sources` | Browse directories and list files in a repository |
| `da_get_source` | Read the full content of any file |
| `da_create_source` | Create a new file with provided content |
| `da_update_source` | Update an existing file in place |
| `da_delete_source` | Delete a file |
| `da_copy_content` | Copy content from one location to another |
| `da_move_content` | Move or rename content |
| `da_get_versions` | View version history for a file |
| `da_lookup_media` | Look up media asset references |
| `da_lookup_fragment` | Look up content fragment references |

## How It Works

The server is built in TypeScript and runs on Cloudflare Workers. Authentication uses a token pass-through model — the client sends a DA Admin API token in the `Authorization` header, which the server forwards to the DA Admin API. If you use the public endpoint at `mcp.adobeaemcloud.com`, Adobe IMS authentication is handled automatically. No token configuration needed.

The code is open source: [github.com/adobe-rnd/da-mcp](https://github.com/adobe-rnd/da-mcp). Pull requests and feedback welcome.


## Getting Connected

**Claude.ai** is the easiest way to start. Go to **Settings → Connectors**, find *DA MCP*, click **Connect**, and sign in with your Adobe IMS account. Done.

For **Claude Desktop**, add this to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "da-live-admin": {
      "type": "streamable-http",
      "url": "https://mcp.adobeaemcloud.com/adobe/mcp/da"
    }
  }
}
```

For **VS Code or Cursor**, add to `.vscode/mcp.json`:

```json
{
  "mcpServers": {
    "da-prod-mcp": {
      "url": "https://mcp.adobeaemcloud.com/adobe/mcp/da"
    }
  }
}
```

## What I've Been Using It For

I've been running this day-to-day for a few weeks. A few things work well: drafting and saving content without leaving the conversation, bulk updates across multiple pages without writing scripts, and using `da_get_versions` to check what changed in a file without context-switching. Combining it with web research is also useful — Claude can look something up and save the result to DA in one pass.

## A Real-World Example

A colleague [posted a good example on LinkedIn](https://www.linkedin.com/posts/auniverseaway_adobeexperiencemanager-edgedeliveryservices-activity-7439341002504658944-9BNN): auditing Summit Labs for missing content pages, scaffolding them out from a CSV export — all in a single conversation, saving around 6 hours of manual work. That's the kind of multi-step workflow where having Claude directly connected to DA pays off.
