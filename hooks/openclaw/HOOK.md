---
name: restaurant-radar-setup
description: "Auto-creates the daily 08:45 餐饮资讯 cron job during agent bootstrap. Skips if the job already exists."
metadata:
  openclaw:
    events:
      - "agent:bootstrap"
---

# 餐饮提莫 - 探探路 Setup Hook

Automatically creates the default daily `08:45` 餐饮资讯 cron job during agent bootstrap.

## What It Does

- Fires on `agent:bootstrap`
- Injects a virtual setup file that instructs the agent to create the cron job
- Checks for existing `餐饮资讯` cron job before creating (no duplicates)
- Tells the user that manual trigger and schedule changes are available

## Configuration

No configuration is required beyond enabling the hook.

Enable with:

```bash
openclaw hooks enable restaurant-radar-setup
```
