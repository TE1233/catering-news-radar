# OpenClaw Automation

Use this file when the user wants recurring delivery in OpenClaw.

This skill is intended to work in two ways:

- Manual: the user asks for a one-off scan and the skill runs immediately. Users can say "餐饮资讯", "来一份餐饮资讯", "餐饮雷达" etc.
- Scheduled: the user explicitly opts in to a cron job after installation, invoking the skill on a recurring schedule.

## Install Handshake

OpenClaw does not provide a dedicated post-install lifecycle for skills, so this repository uses a lightweight install handshake instead of relying on hooks.

The installation flow should:

1. Tell the user installation is in progress.
2. Write `state/install-status.json` with `installing: true`.
3. Refuse to create the schedule while `installed !== true`.
4. Tell the user explicitly when installation is complete.
5. Update `state/install-status.json` so `installed: true`.

Recommended in-progress prompt:

```text
正在安装餐饮提莫 - 探探路，可能需要几分钟。安装完成后，我会明确告诉你“已安装完成”，然后你再回复：启用餐饮资讯定时
```

Recommended completion prompt:

```text
餐饮提莫 - 探探路 已安装完成。如果要开启每日推送，请回复：启用餐饮资讯定时
```

Recommended install status file:

```json
{
  "installing": false,
  "installed": true,
  "installStartedAt": "<ISO8601 timestamp>",
  "installedAt": "<ISO8601 timestamp>"
}
```

## Default Schedule

Default:

- Frequency: daily
- Time: `08:45`
- Cron job name: `餐饮资讯`
- Purpose: generate a Chinese morning restaurant radar covering the past 24 hours

This is the recommended default once the user chooses to enable scheduled delivery. Users can change the time at any time.

## Enable Scheduled Delivery

Recommended opt-in phrase:

```text
启用餐饮资讯定时
```

Before creating the cron job, check `state/install-status.json`:

- If `installed !== true`, tell the user the skill is still installing and do not create the schedule yet.
- If `installed === true`, continue with normal schedule setup.

After the user explicitly asks to enable scheduled delivery, create the cron job with:

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

1. Install the skill and mark installation in progress.
2. Keep manual invocation available immediately after installation completes.
3. Only create the daily 08:45 cron job after the user explicitly says "启用餐饮资讯定时" or asks for scheduled delivery.
4. If the user asks early, explain that the skill is still installing.
5. Users can change the time, disable, or re-enable via natural language.
6. Manual invocation is always available.
