---
name: restaurant-news-radar
description: "餐饮资讯雷达、餐饮资讯、餐饮提莫。扫描餐饮行业最新动态，覆盖品牌、平台、政策、食品安全、融资、开店、茶饮、咖啡、火锅、外卖。触发词：餐饮资讯、来一份餐饮资讯、餐饮雷达、餐饮动态、餐饮新闻、今天餐饮有什么新闻。Monitor and summarize the latest restaurant and foodservice intelligence with strict recency handling, broad source coverage, source attribution, deduplication, and priority ranking. Use when the agent needs to manually scan or scheduled-push timely restaurant industry updates, such as brand moves, platform rule changes, policy updates, food safety incidents, supply-chain signals, financing news, store expansion, category trends, or local market developments."
---

# 餐饮提莫 - 探探路

## Overview

Public display alias: `餐饮提莫 - 探探路`

Keep the skill directory and repository id in English as `restaurant-news-radar`. Use the Chinese alias for user-facing titles, prompts, and digest headers when appropriate.

Run a fast, source-aware intelligence workflow for restaurant and foodservice updates. Favor fresh, decision-useful signals over generic summaries, and always preserve where each claim came from.

Treat this skill as a workflow for scanning, filtering, deduplicating, and packaging restaurant intelligence for either on-demand requests or recurring push digests.

This skill supports both manual invocation and scheduled delivery. For OpenClaw scheduling examples, read [references/openclaw-automation.md](./references/openclaw-automation.md).

For strict recency execution, read [references/search-playbook.md](./references/search-playbook.md).
For bucketed query templates, read [references/keyword-templates.md](./references/keyword-templates.md).
For direct content-entry watchlists, read [references/direct-source-watchlist.md](./references/direct-source-watchlist.md).
For cross-run repeat suppression, read [references/state-and-dedup.md](./references/state-and-dedup.md).
For fixed brand monitoring, read [references/brand-official-watchlist.md](./references/brand-official-watchlist.md).

This repository includes `state/install-status.json` so the installation flow can make the user-visible install state explicit before scheduled delivery is enabled.

## Workflow

### 1. Confirm the brief

Identify the run mode before collecting information:

- Manual scan: answer a user request such as "scan the last 24 hours", "track coffee chains this week", or "find the latest China restaurant platform updates".
- Scheduled push: prepare a digest suitable for repeated delivery, such as a morning radar, evening brief, or weekly sector watch.

For scheduled pushes in OpenClaw, the recommended default daily morning run is at `08:45`, but the schedule should only be created after the user explicitly asks to enable it. Users can change the schedule time at any time.

If the user does not specify scope, assume:

- Geography: the market implied by the user; if unclear, prefer China-first with global spillover only when it materially affects restaurant operators.
- Time window: last 24 hours for urgent radar requests, and expand only when needed.
- Output count: 5-10 items for manual scans, 8-15 items for scheduled digests.

Before collecting new items, load recent-output memory from `state/recent-items.json` if it exists. If it does not exist, create it with the default schema described in `references/state-and-dedup.md`.

### 2. Search for fresh signals first

Always prioritize current information sources over static knowledge. Do not rely on memory for "latest" requests.

Search broadly across source types. Use [references/source-map.md](./references/source-map.md) to choose the right source mix for the request.
Use [references/search-playbook.md](./references/search-playbook.md) to enforce strict time windows and layer the search from `T0` to `T2`.
Use [references/keyword-templates.md](./references/keyword-templates.md) to avoid ad hoc searching and keep coverage fast but structured.
Use [references/direct-source-watchlist.md](./references/direct-source-watchlist.md) when the task benefits from pulling directly from known content pages rather than relying only on search.

For China-focused runs, explicitly cover the source stack in `source-map.md`: official brand sources, platform merchant notices, regulator releases, restaurant trade media, retail and local-services media, mall and property channels, supply-chain media, data tools, and a verified social early-warning layer.

Favor this source order when available:

1. Original source: official company site, official account, official newsroom, platform announcement, regulator release, exchange filing.
2. High-quality primary reporting: established industry or business outlet with named sourcing.
3. Specialist trade media: restaurant, retail, foodservice, commercial real-estate, supply-chain coverage.
4. Secondary commentary: analyst notes, newsletters, creator summaries, reposts.

Keep source diversity high. A strong result set should cover multiple source types rather than ten articles repeating the same post.
Do not let early hits from one source type stop the rest of the sweep. For broad scans, cover the required source buckets before deciding the result set is strong enough.

Strict recency rules:

1. Start with `T0`: past 24 hours only.
2. Expand to `T1`: past 72 hours only if `T0` produces too few high-confidence items.
3. Expand to `T2`: past 7 days only if the user asked for a weekly view or if `T0` and `T1` remain too thin.
4. Do not pull in older items just to fill the digest.
5. If fresh, high-quality items are limited, say so explicitly.

Required coverage for a broad daily scan:

1. Regulator or policy bucket
2. Platform or merchant-rule bucket
3. Trade-media bucket
4. Brand or company-move bucket
5. Property, channel, or traffic bucket

If a bucket returns nothing fresh, note the gap internally and move on. Do not backfill it with stale content.

### 3. Apply recency discipline

Record concrete dates for every item. If the user uses relative language such as "today" or "this week", restate the absolute date range in the response.

Treat recency as part of ranking:

- Highest priority: same-day items, breaking updates, regulator actions, platform rule changes, food safety incidents, major brand moves.
- Medium priority: last 2-7 days, financing, expansion plans, pricing changes, category launches, channel partnerships.
- Lower priority: older analysis pieces unless they explain why a new development matters.

If a source republishes an older story, prefer the earliest credible publication date and note when later coverage is a follow-up rather than new information.

Reject stale filler:

- Do not include an item outside the active search layer unless the user explicitly asked for background.
- Do not treat a newly published rewrite of an older event as fresh news.
- If an article says "recently" or "these days" without a concrete date, verify the underlying event date before including it.

### 4. Deduplicate before summarizing

Group overlapping reports into one signal. Keep the best representative item by preferring:

1. Original source over any rewrite.
2. Earliest credible timestamp over later reposts.
3. More complete reporting over thinner rewrites.
4. Higher-confidence sourcing over anonymous aggregation.

When several outlets cover the same event, cite one primary source and optionally one corroborating source instead of listing all duplicates.

Apply cross-run suppression for repeated manual or scheduled scans:

- Keep a recent-output memory for previously shown items.
- Default no-repeat window: `10 hours`
- If an item was already shown within the last `10 hours`, do not show it again.
- Match repeats by primary link first, then by normalized title or event identity when links differ across rewrites.
- Allow a repeat only when there is a material new development, such as regulator action, official response, financing close, reopening, expanded recall scope, or a concrete new operating impact.
- If a repeated event is allowed back in because it materially advanced, summarize the new development rather than reusing the earlier framing.

Operational rule:

1. Load `state/recent-items.json` before finalizing the candidate list.
2. Compare each candidate against recent items using canonical link first, then normalized title.
3. Suppress any candidate shown within the last `10 hours` unless it materially advanced.
4. After producing the final output, append or refresh the surviving items in `state/recent-items.json`.
5. Remove expired entries older than the suppression window plus a small cleanup buffer.

### 5. Score the signal

For each candidate item, judge:

- Urgency: does it require immediate awareness?
- Operator impact: could it affect store traffic, pricing, compliance, labor, supply, or competition?
- Novelty: is it actually new information?
- Credibility: how trustworthy is the source chain?
- Reach: is this a local incident, a platform-wide change, or a category-wide trend?

Assign a practical priority label:

- `P1`: immediate attention
- `P2`: important this week
- `P3`: useful background

Also assign a source label:

- `original`
- `reported`
- `aggregated`
- `commentary`

### 6. Produce an output that is decision-useful

Use [references/output-templates.md](./references/output-templates.md) for the response shape. Every pushed or manual digest should include:

- A clear time window with absolute dates.
- Priority labels on items.
- A one-line "why it matters" angle for restaurant operators, investors, founders, or market watchers.
- Source attribution for every item.
- A link for every item when available.

Prefer concise, scannable summaries. Default to a compact radar list rather than a long brief with extra framing. Avoid long article-style prose unless the user asks for a deep dive.

### 7. Default to Chinese industry reporting style

Unless the user explicitly asks for English output, write the final output in Simplified Chinese.

When writing in Chinese:

- Use China-market restaurant language first, such as restaurant industry, chain brands, tea drinks, coffee, quick service, hotpot, bakery, local services, delivery platforms, trade areas, franchising, store openings, and store closures.
- Prefer compact newsroom-style labels equivalent to daily radar, morning brief, evening brief, weekly watch, key updates, worth watching, and next watchpoints.
- Translate internal scoring into readable Chinese while preserving the label:
  - `P1`: highest priority / immediate attention
  - `P2`: important this week
  - `P3`: background reference
- Turn "Why it matters" into a natural Chinese business label such as impact judgment or why this matters.
- Turn "Watchlist" into a natural Chinese label such as watchlist or continued tracking.

Use explicit absolute dates in a Chinese-friendly form, for example `2026-03-15` or `2026/03/15`. If the user says today or this week, restate the exact date range.

Prefer a concise business-analysis tone:

- Lead with the fact, not with scene-setting.
- Summarize impact on merchants, brands, operators, founders, investors, or platforms in one sentence.
- Avoid inflated media language, marketing adjectives, or vague trend claims without evidence.
- Distinguish clearly between confirmed items, watch items, and multi-source retellings.

## Coverage Guidance

Cover more than media headlines. Include any of these when relevant:

- Brand activity: store openings, closures, financing, M&A, franchising, menu launches, pricing, partnerships, campaigns.
- Platform changes: food delivery, local services, reviews, ad products, ranking rules, merchant policies.
- Policy and compliance: food safety, labeling, labor, delivery rules, subsidies, local consumption policies.
- Supply chain: ingredient prices, shortages, cold chain, packaging, logistics, upstream manufacturer moves.
- Property and channel signals: mall tenant changes, foot traffic themes, convenience retail-food overlap, travel and tourism demand.
- Consumer demand shifts: coffee, tea, bakery, quick service, hotpot, healthy dining, regional cuisine trends.

## Quality Bar

Follow these guardrails:

- Never claim an item is "latest" without checking current sources during the run.
- Never let quantity override freshness.
- Never present a rumor as confirmed news.
- Never omit the source when summarizing a material claim.
- Prefer one strong original source over many weak reposts.
- Say explicitly when information is still developing or only partially verified.
- Keep duplicates out of the final digest unless comparing different perspectives adds value.
- In Chinese output, keep wording plain and businesslike rather than dramatic or slogan-like.

## Suggested Triggers

This skill is a strong fit for requests like:

- "Scan the latest restaurant news."
- "Make a morning digest for catering and foodservice investors."
- "Track the latest chain-brand openings and financing news."
- "Watch Meituan, Douyin local services, and delivery policy changes."
- "Push a daily restaurant radar with broad sources and strict freshness."

## Invocation Modes

Use one of these operating styles:

### Manual mode

Use when the user asks for an immediate scan, deep dive, or ad hoc watchlist. Manual mode should work with no scheduler configured.

Typical manual prompts:

- "Use $restaurant-news-radar to scan the latest restaurant news from the past 24 hours in China."
- "Use $restaurant-news-radar to track coffee and tea chain developments this week."

Recommended default manual routing:

1. Run a bucketed scan over the past 24 hours.
2. Pull directly from known source-entry pages first.
3. Use targeted search only to fill gaps or verify a signal.

### Scheduled mode

Use when the user wants recurring delivery. In OpenClaw, recommend a separate enable step that creates a cron job which calls this skill at a defined time. The recommended default is daily at `08:45`, but the user may change the schedule later.

Scheduled-mode defaults:

- Time window: past 24 hours
- Geography: China-first
- Format: morning digest
- Volume: 8-12 items
- Required fields: headline, why it matters, source, published date, source type
- Coverage rule: touch all core buckets before finalizing the digest

## Trigger And Schedule Rules

Use these rules as the default operating contract for the skill:

### Manual trigger

- Manual trigger must always remain available.
- The skill should run immediately when the user invokes `$restaurant-news-radar`.
- Manual trigger does not require any scheduler or cron setup.
- Default manual scope is China-first and past 24 hours unless the user asks for a different window or market.

### Scheduled trigger

- Installation status should be explicit. When this skill is being installed, the install flow should mark `state/install-status.json` with `installing: true`, then switch to `installed: true` only after the install is complete.
- Scheduled trigger is opt-in and should only be created after explicit user confirmation.
- The default schedule is every day at `08:45`.
- The recommended enable phrase is `启用餐饮资讯定时`.
- Before creating a scheduled job, check `state/install-status.json`. If `installed !== true`, tell the user the skill is still installing and wait for installation to finish.
- Users can change the schedule time by telling the agent (e.g., "把餐饮资讯改到7点").
- The cron job name is `餐饮资讯`.

### Scheduled-run defaults

When the default daily schedule is enabled, the run should:

- scan the past 24 hours
- use China-first restaurant and foodservice coverage
- check regulator, platform, trade-media, brand, and property buckets
- produce a concise Chinese radar
- include date, source, and link on every item when available
- suppress items already shown in the past `10 hours` unless they materially advanced

### Changing the schedule

- Users should be able to change the scheduled time after enablement.
- Keep the skill prompt the same unless the user wants different coverage.
- Update only the cron time or expression.
- Prefer editing the existing scheduled job instead of creating duplicates.

### Manual and scheduled coexistence

- Manual use should continue to work even when a scheduled job exists.
- A scheduled job should not block or replace manual use.
- If both exist, treat them as two valid invocation paths for the same skill.
- Manual and scheduled runs should share the same recent-output memory so the `10-hour` no-repeat rule works across both paths.

## Recent-Output Memory

Use a lightweight state file if the runtime supports local persistence.

Recommended state path:

- `state/recent-items.json`

Recommended fields per item:

- normalized title
- canonical link
- first shown time
- last shown time
- source
- optional event id or hash

Behavior:

- Before finalizing output, compare candidate items against recent-output memory.
- Skip any item shown within the last `10 hours`.
- Update memory after a successful manual or scheduled run.
- Expire old entries automatically once they fall outside the suppression window plus a small buffer.

Default file:

- `state/recent-items.json` is included in this repository and should be treated as the shared suppression memory for both manual and scheduled runs.

## References

Read only what is needed:

- Read [references/source-map.md](./references/source-map.md) when choosing where to search and how to broaden source coverage.
- Read [references/search-playbook.md](./references/search-playbook.md) when executing a latest-news scan with strict time windows and stepwise expansion from 24 hours to 72 hours to 7 days.
- Read [references/keyword-templates.md](./references/keyword-templates.md) when you need bucketed, reusable query patterns that balance speed and coverage.
- Read [references/direct-source-watchlist.md](./references/direct-source-watchlist.md) when you want directly fetchable content-entry pages for restaurant, policy, platform, property, and retail signals.
- Read [references/brand-official-watchlist.md](./references/brand-official-watchlist.md) when you want a fixed watchlist of brand-official sources for major restaurant, tea, coffee, and hotpot operators.
- Read [references/state-and-dedup.md](./references/state-and-dedup.md) when the runtime supports local persistence and you want a `10-hour` no-repeat window across manual and scheduled runs.
- Read [references/output-templates.md](./references/output-templates.md) when formatting a manual scan, morning push, evening brief, weekly watch, or a niche category report.
- Read [references/openclaw-automation.md](./references/openclaw-automation.md) when enabling or changing the daily cron schedule, or explaining how users can manually trigger the skill alongside scheduled runs.

## Schedule Management

When the user asks to change, enable, or disable the scheduled delivery, follow these rules.

### Recognizing user intent

Listen for these patterns:

- **Enable**: 启用、开启定时、开始定时、每天推送、加个定时、定时发
- **Change time**: 改到、调到、换成、提前到、推迟到、X点推送、X点发、每天X点
- **Disable**: 关掉、取消、停止、不要定时了、暂停推送
- **Re-enable**: 开启、恢复、重新开始、再开

### Changing the schedule time

1. Parse the user's desired time and convert to a cron expression:
   - 6:00 → `0 6 * * *`
   - 6:30 → `30 6 * * *`
   - 7:00 → `0 7 * * *`
   - 7:30 → `30 7 * * *`
   - 8:00 → `0 8 * * *`
   - 8:45 → `45 8 * * *`
   - 18:00 → `0 18 * * *`
   - 20:30 → `30 20 * * *`
2. Run `openclaw cron list` to find the job id for the `餐饮资讯` cron job.
3. Run `openclaw cron edit <job-id> --cron "<new-expression>"` to update the schedule.
4. Confirm the change to the user, for example: "已将餐饮资讯调整到每天 7:00 推送 ✅"

### Enabling the schedule

1. Confirm the user wants scheduled delivery. Treat phrases like "启用餐饮资讯定时" as explicit consent.
2. Check `state/install-status.json` before doing anything else.
3. If `installed !== true`, do not create the cron job yet. Tell the user the skill is still installing and ask them to wait for the explicit install-complete message.
4. If `installed === true`, run `openclaw cron list` to check whether a `餐饮资讯` cron job already exists.
5. If no job exists, run `openclaw cron add --name "餐饮资讯" --cron "45 8 * * *" --session isolated --message "Use $restaurant-news-radar to scan the past 24 hours of restaurant industry developments in China, cover regulator, platform, trade-media, brand, and property buckets, suppress items already shown in the past 10 hours unless they materially advanced, and produce a concise Chinese radar with dates, sources, and links." --announce --channel last`
6. If the user specified a time while enabling, replace `45 8 * * *` with the requested schedule.
7. If a matching job already exists, tell the user it is already enabled instead of creating a duplicate.

### Disabling the schedule

1. Run `openclaw cron list` to find the job id for the `餐饮资讯` cron job.
2. Run `openclaw cron edit <job-id> --no-deliver` to stop delivery.
3. Confirm to the user: "已关闭餐饮资讯定时推送 ✅ 手动触发仍然可用。"

### Re-enabling the schedule

1. Run `openclaw cron list` to find the job id for the `餐饮资讯` cron job.
2. Run `openclaw cron edit <job-id> --announce --channel last` to restore delivery.
3. Confirm to the user: "已重新开启餐饮资讯定时推送 ✅"

### Creating the schedule if it does not exist

If the user asks for scheduled delivery but no `餐饮资讯` cron job exists, create one:

```bash
openclaw cron add --name "餐饮资讯" --cron "45 8 * * *" --session isolated --message "Use $restaurant-news-radar to scan the past 24 hours of restaurant industry developments in China, cover regulator, platform, trade-media, brand, and property buckets, suppress items already shown in the past 10 hours unless they materially advanced, and produce a concise Chinese radar with dates, sources, and links." --announce --channel last
```

Replace `45 8 * * *` with the user's preferred time if they specified one.
