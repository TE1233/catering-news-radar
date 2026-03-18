---
name: restaurant-news-radar
description: "餐饮资讯雷达、餐饮资讯、餐饮提莫。扫描餐饮行业最新动态，覆盖品牌、平台、政策、食品安全、融资、开店、茶饮、咖啡、火锅、外卖。触发词：餐饮资讯、来一份餐饮资讯、餐饮雷达、餐饮动态、餐饮新闻、今天餐饮有什么新闻、餐饮快报、餐饮闪报。Monitor and summarize the latest restaurant and foodservice intelligence with strict recency handling, broad source coverage, source attribution, deduplication, and priority ranking. Use when the agent needs to manually scan or scheduled-push timely restaurant industry updates."
---

# 餐饮提莫 - 探探路

## Overview

Public display alias: `餐饮提莫 - 探探路 🍜`

Keep the skill directory and repository id in English as `restaurant-news-radar`. Use the Chinese alias for user-facing titles, prompts, and digest headers when appropriate.

Treat this skill as a workflow for scanning, filtering, deduplicating, and packaging restaurant intelligence for either on-demand requests or recurring push digests.

This skill supports both manual invocation and scheduled delivery. For OpenClaw scheduling examples, read [openclaw-automation.md](D:/Backup/openclaw-backup/catering-news-radar-main/references/openclaw-automation.md).

For strict recency execution, read [search-playbook.md](D:/Backup/openclaw-backup/catering-news-radar-main/references/search-playbook.md).
For bucketed query templates, read [keyword-templates.md](D:/Backup/openclaw-backup/catering-news-radar-main/references/keyword-templates.md).
For direct content-entry watchlists, read [direct-source-watchlist.md](D:/Backup/openclaw-backup/catering-news-radar-main/references/direct-source-watchlist.md).
For cross-run repeat handling, read [state-and-dedup.md](D:/Backup/openclaw-backup/catering-news-radar-main/references/state-and-dedup.md).
For fixed brand monitoring, read [brand-official-watchlist.md](D:/Backup/openclaw-backup/catering-news-radar-main/references/brand-official-watchlist.md).
For display format, read [output-templates.md](D:/Backup/openclaw-backup/catering-news-radar-main/references/output-templates.md).

This repository includes [install-status.json](D:/Backup/openclaw-backup/catering-news-radar-main/state/install-status.json) so the installation flow can make install state explicit before scheduled delivery is enabled.

## Workflow

### 1. Confirm the brief

Identify the run mode before collecting information:

- Manual scan: answer a user request such as “扫一下过去 24 小时”、“看近 3 天咖啡连锁动态” or “find the latest China restaurant platform updates”.
- Scheduled push: prepare a digest suitable for repeated delivery, such as a morning radar or evening brief.

If the user does not specify scope, assume:

- Geography: China-first, with global spillover only when it materially affects restaurant operators.
- Time window: past 24 hours by default, expanding only when needed.
- Output count: 5-10 items for manual scans, 8-15 items for scheduled digests.

Before collecting new items, load recent-output memory from [recent-items.json](D:/Backup/openclaw-backup/catering-news-radar-main/state/recent-items.json) if it exists. If it does not exist, create it with the default schema described in [state-and-dedup.md](D:/Backup/openclaw-backup/catering-news-radar-main/references/state-and-dedup.md).

### 2. Search for fresh signals first

Always prioritize current information sources over static knowledge. Do not rely on memory for “latest” requests.

Search broadly across source types. Use [source-map.md](D:/Backup/openclaw-backup/catering-news-radar-main/references/source-map.md) to choose the right source mix for the request.
Use [search-playbook.md](D:/Backup/openclaw-backup/catering-news-radar-main/references/search-playbook.md) to enforce strict time windows and layer the search from `T0` to `T1`.
Use [keyword-templates.md](D:/Backup/openclaw-backup/catering-news-radar-main/references/keyword-templates.md) to avoid ad hoc searching and keep coverage fast but structured.
Use [direct-source-watchlist.md](D:/Backup/openclaw-backup/catering-news-radar-main/references/direct-source-watchlist.md) when the task benefits from pulling directly from known content pages, but never rely on direct pages alone.

For China-focused runs, explicitly cover the source stack in [source-map.md](D:/Backup/openclaw-backup/catering-news-radar-main/references/source-map.md): official brand sources, platform merchant notices, regulator releases, restaurant trade media, retail and local-services media, mall and property channels, supply-chain media, data tools, and a verified social early-warning layer.

Favor this source order when available:

1. Original source: official company site, official account, official newsroom, platform announcement, regulator release, exchange filing.
2. High-quality primary reporting: established industry or business outlet with named sourcing.
3. Specialist trade media: restaurant, retail, foodservice, commercial real-estate, supply-chain coverage.
4. Secondary commentary: analyst notes, newsletters, creator summaries, reposts.

Keep source diversity high. A strong result set should cover multiple source types rather than ten articles repeating the same post.
Do not let early hits from one source type stop the rest of the sweep.
For both manual and scheduled runs, combine direct-page checks with targeted search-engine queries. A run is incomplete if it uses only direct pages or only search results.

Strict recency rules:

1. Start with `T0`: past 24 hours only.
2. Expand to `T1`: past 72 hours only if `T0` produces too few high-confidence items.
3. Do not expand beyond `T1`: the hard outer limit for this skill is the past 72 hours.
4. Do not pull in older items just to fill the digest.
5. If fresh, high-quality items are limited, say so explicitly.

Required coverage for a broad daily scan:

1. Regulator or policy bucket
2. Platform or merchant-rule bucket
3. Trade-media bucket
4. Brand or company-move bucket
5. Property, channel, or traffic bucket

Minimum search requirement for both manual and scheduled runs:

1. Check direct-entry pages from the watchlist for fast discovery.
2. Run targeted search-engine queries across at least the regulator, platform, and brand/company buckets during every run.
3. Use search results to discover missing signals and verify dates or wording on ambiguous items.
4. Do not claim broad coverage if search-engine discovery was skipped.

### 3. Apply recency discipline

Record concrete dates for every item. If the user uses relative language such as “today” or “this week”, restate the absolute date range in the response.

Treat recency as part of ranking:

- Highest priority: same-day items, breaking updates, regulator actions, platform rule changes, food safety incidents, major brand moves.
- Medium priority: last 2-3 days, financing, expansion plans, pricing changes, category launches, channel partnerships.
- Lower priority: background-only context that is still within the active window and helps explain a new development.

Reject stale filler:

- Do not include an item outside the active search layer unless the user explicitly asked for background.
- Do not treat a newly published rewrite of an older event as fresh news.
- If an article says “recently” or “these days” without a concrete date, verify the underlying event date before including it.
- Do not include an event whose underlying fact date is older than 72 hours in the default digest, even if the article itself was published today.

### 4. Deduplicate across runs

Group overlapping reports into one signal. Keep the best representative item by preferring:

1. Original source over any rewrite.
2. Earliest credible timestamp over later reposts.
3. More complete reporting over thinner rewrites.
4. Higher-confidence sourcing over anonymous aggregation.

Apply cross-run repeat handling for repeated manual or scheduled scans:

- Keep a recent-output memory for previously shown items.
- Default repeat-friendly window: `10 hours`
- If an item was already shown within the last `10 hours`, it may appear again.
- Suppress it only after it stays materially unchanged for more than `10 hours`.
- Match repeats by primary link first, then by normalized title or event identity when links differ across rewrites.
- Allow a repeat when there is a material new development, such as regulator action, official response, financing close, reopening, expanded recall scope, or a concrete new operating impact.

Operational rule:

1. Load [recent-items.json](D:/Backup/openclaw-backup/catering-news-radar-main/state/recent-items.json) before finalizing the candidate list.
2. Compare each candidate against recent items using canonical link first, then normalized title.
3. Keep candidates eligible when they were shown within the last `10 hours`. Suppress a candidate only after it has stayed materially unchanged for more than `10 hours`.
4. After producing the final output, append or refresh the surviving items in [recent-items.json](D:/Backup/openclaw-backup/catering-news-radar-main/state/recent-items.json).
5. Remove expired entries older than the suppression window plus a small cleanup buffer.

### 5. Score the signal

For each candidate item, judge:

- Urgency
- Operator impact
- Novelty
- Credibility
- Reach

Assign a practical priority label:

- `P1`: immediate attention
- `P2`: important this week
- `P3`: useful background

Before presenting the final digest, sort all items in this exact order:

1. `P1` first
2. `P2` second
3. `P3` last

Within the same priority band, sort by:

1. Newer underlying event date first
2. Stronger operator impact first
3. Stronger source confidence first

### 6. Produce an output that is decision-useful

Every pushed or manual digest should include:

- The visible title `**餐饮提莫-探探路 🍜**`
- The current trigger time, shown as a plain timestamp without extra label
- Priority labels on items
- A one-line `影响判断`
- Source attribution for every item
- Items displayed in strict `P1 -> P2 -> P3` order with no cross-band mixing
- When a priority band contains multiple items, sequential numbering inside the band, for example `P1.1`, `P1.2`, `P1.3`
- Bold priority tag together with the title, such as `**[P1.1]** **标题**`

Prefer concise, scannable summaries. Default to a compact radar list rather than a long brief.

### 7. Default to Chinese industry reporting style

Unless the user explicitly asks for English output, write the final output in Simplified Chinese.

When writing in Chinese:

- Use China-market restaurant language first.
- Prefer compact newsroom-style labels.
- Turn “Why it matters” into `影响判断`.
- Default the visible title to `**餐饮提莫-探探路 🍜**`.
- Under the title, show only the current trigger time, for example `2026-03-18 09:20`.
- Do not show raw links by default.

Use explicit absolute dates in a Chinese-friendly form, such as `2026-03-18`.

## Trigger And Schedule Rules

### Manual trigger

- Manual trigger must always remain available.
- The skill should run immediately when the user invokes `$restaurant-news-radar`.
- Default manual scope is China-first and past 24 hours unless the user asks for a different window or market.
- Recognize Chinese aliases including `餐饮资讯`, `来一份餐饮资讯`, `餐饮雷达`, `餐饮动态`, `今天餐饮有什么新闻`, `餐饮快报`, and `餐饮闪报`.

Recommended default manual routing:

1. Run a bucketed scan over the past 24 hours.
2. Pull directly from known source-entry pages first.
3. Run targeted search-engine queries across the core buckets during the same run.
4. Use both direct pages and search results to fill gaps, discover missing signals, and verify dates.

### Scheduled trigger

- Installation status should be explicit. When this skill is being installed, the install flow should mark [install-status.json](D:/Backup/openclaw-backup/catering-news-radar-main/state/install-status.json) with `installing: true`, then switch to `installed: true` only after install is complete.
- Scheduled trigger is opt-in and should only be created after explicit user confirmation.
- The default schedule is every day at `08:45`.
- The recommended enable phrase is `启用餐饮资讯定时`.
- Before creating a scheduled job, check [install-status.json](D:/Backup/openclaw-backup/catering-news-radar-main/state/install-status.json). If `installed !== true`, tell the user the skill is still installing and wait for completion.
- Before creating a scheduled job, inspect the current session route. Prefer explicit delivery fields from the current conversation. If routing is ambiguous, ask the user to confirm the destination or create the job with `--no-deliver`.
- Users can change the schedule time by natural language.
- The cron job name is `餐饮资讯`.

Scheduled-run defaults:

- Scan the past 24 hours
- Use China-first restaurant coverage
- Check regulator, platform, trade-media, brand, and property buckets
- Produce a concise Chinese radar
- Run both direct-page checks and targeted search-engine queries
- Apply the 10-hour repeat-friendly rule

### Manual and scheduled coexistence

- Manual use should continue to work even when a scheduled job exists.
- A scheduled job should not block or replace manual use.
- Manual and scheduled runs should share the same recent-output memory.

## References

Read only what is needed:

- [source-map.md](D:/Backup/openclaw-backup/catering-news-radar-main/references/source-map.md)
- [search-playbook.md](D:/Backup/openclaw-backup/catering-news-radar-main/references/search-playbook.md)
- [keyword-templates.md](D:/Backup/openclaw-backup/catering-news-radar-main/references/keyword-templates.md)
- [direct-source-watchlist.md](D:/Backup/openclaw-backup/catering-news-radar-main/references/direct-source-watchlist.md)
- [brand-official-watchlist.md](D:/Backup/openclaw-backup/catering-news-radar-main/references/brand-official-watchlist.md)
- [state-and-dedup.md](D:/Backup/openclaw-backup/catering-news-radar-main/references/state-and-dedup.md)
- [output-templates.md](D:/Backup/openclaw-backup/catering-news-radar-main/references/output-templates.md)
- [openclaw-automation.md](D:/Backup/openclaw-backup/catering-news-radar-main/references/openclaw-automation.md)
