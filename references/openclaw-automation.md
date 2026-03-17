# OpenClaw Automation

Use this file when the user wants recurring delivery in OpenClaw.

This skill is intended to work in two ways:

- Manual: the user asks for a one-off scan and the skill runs immediately. Users can say "餐饮资讯", "来一份餐饮资讯", "餐饮雷达" etc.
- Scheduled: a cron job is automatically created during installation via the bootstrap hook, invoking the skill on a recurring schedule.

This repository ships a bootstrap hook that automatically creates the cron job after installation.

## Default Schedule

Default:

- Frequency: daily
- Time: `08:45`
- Cron job name: `餐饮资讯`
- Purpose: generate a Chinese morning restaurant radar covering the past 24 hours

The bootstrap hook creates this schedule automatically. Users can change the time at any time.

## Enable Scheduled Delivery

The bootstrap hook creates the cron job automatically. If manual creation is needed:

```bash
openclaw cron add --name "餐饮资讯" --cron "45 8 * * *" --session isolated --message "Use $restaurant-news-radar to scan the past 24 hours of restaurant industry developments in China, cover regulator, platform, trade-media, brand, and property buckets, suppress items already shown in the past 10 hours unless they materially advanced, and produce a concise Chinese radar with dates, sources, and links." --announce --channel last
```

Recommended behavior of the scheduled prompt:

- Use the past 24 hours as the default time window.
- Produce a concise Chinese radar.
- Prioritize source breadth and freshness.
- Include dates, links, and source attribution on every item.
- Check all core source buckets before finalizing the digest.
- Suppress items already shown within the last `10 hours` unless they materially advanced.

## Change the Scheduled Time

Users can change the schedule by telling the agent in natural language:

- "把餐饮资讯改到7点"
- "餐饮资讯提前到6:30"
- "把推送时间换成18:00"

The agent should:

1. Run `openclaw cron list` to find the job id for `餐饮资讯`.
2. Run `openclaw cron edit <job-id> --cron "<new-expression>"` to update.
3. Confirm the change to the user.

Time conversion reference:

- `06:00` -> `0 6 * * *`
- `06:30` -> `30 6 * * *`
- `07:00` -> `0 7 * * *`
- `07:30` -> `30 7 * * *`
- `08:00` -> `0 8 * * *`
- `08:45` -> `45 8 * * *`
- `18:00` -> `0 18 * * *`
- `20:30` -> `30 20 * * *`

Always update the existing `餐饮资讯` job instead of creating a duplicate.

## Disable / Re-enable

Users can disable or re-enable the schedule by telling the agent:

- Disable: "关掉餐饮资讯定时" / "取消定时推送"
- Re-enable: "重新开启餐饮资讯" / "恢复定时推送"

Disable:

```bash
openclaw cron edit <job-id> --no-deliver
```

Re-enable:

```bash
openclaw cron edit <job-id> --announce --channel last
```

## Manual Trigger

Manual use must continue to work even when no cron job exists.

Users can trigger manually by saying:

- 餐饮资讯
- 来一份餐饮资讯
- 餐饮雷达
- 餐饮动态
- 今天餐饮有什么新闻

Or using the standard skill reference:

```text
Use $restaurant-news-radar to scan the latest restaurant industry developments from the past 24 hours in China and produce a concise Chinese radar.
```

Examples of manual variants:

- Scan the latest coffee-chain developments this week.
- Produce an evening brief for delivery-platform policy updates.
- Track tea-drink brand openings, financing, and pricing moves.

## Recommended Product Behavior

1. Install the skill.
2. Enable the bootstrap hook (`openclaw hooks enable restaurant-radar-setup`).
3. The hook automatically creates the daily 08:45 cron job on first bootstrap.
4. Users can change the time, disable, or re-enable via natural language.
5. Manual invocation is always available.

## Bootstrap Hook

Enable the hook for automatic cron creation on install:

```bash
openclaw hooks enable restaurant-radar-setup
```

What it does:

- On `agent:bootstrap`, checks if a `餐饮资讯` cron job exists
- If not, creates it with the default 08:45 schedule
- Tells the user that manual trigger and schedule changes are available
