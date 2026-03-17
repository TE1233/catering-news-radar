# Search Playbook

Use this file for any request involving "latest", "today", "recent", "breaking", or scheduled morning and evening pushes.

The main job is to protect freshness. Search in layers and preserve coverage across source buckets.

## Default Search Layers

### T0: Past 24 hours

This is the default for:

- latest restaurant news
- today's updates
- morning radar
- evening brief
- urgent brand, platform, policy, or safety watch

Search order:

1. Regulator and policy sources
2. Platform merchant-rule and announcement sources
3. Brand official sources
4. Fast restaurant and consumer trade media
5. Property, channel, and supply-chain sources

Goal:

- Return only same-day or past-24-hour items
- Favor high-confidence items with exact dates
- Cover all core buckets before deciding the set is already strong

### T1: Past 72 hours

Use this only if T0 is too thin.

T0 is too thin when:

- there are fewer than 3 high-confidence items for a broad radar
- there are fewer than 2 high-confidence items for a narrow category watch
- the result set is dominated by one source type or one low-impact theme

Search order:

1. Re-run high-value official and platform sources over the past 72 hours
2. Expand trade-media passes
3. Add mall, channel, and supply-chain sources
4. Add data-tool validation when needed

Goal:

- Fill gaps without drifting into stale weekly coverage
- Preserve exact dates and source attribution

### T2: Past 7 days

Use this only when:

- the user explicitly asked for weekly or recent-trend coverage
- T0 and T1 still do not produce enough material
- background context is needed to explain a new development

Restrictions:

- Keep T2 items clearly labeled as older than the main fresh layer
- Do not let T2 dominate a "latest news" digest
- Use T2 mainly for context, not for padding

## Stop Conditions

Stop searching within the active layer only when all are true:

- At least 3-5 high-confidence items exist for a broad daily scan, or 2-4 for a narrow niche scan
- At least two source types are represented
- At least one item comes from an original source
- The result set is within the active time layer
- All relevant core buckets have been checked at least once

If these conditions are not met, expand one layer. If they are still not met at T2, state that fresh high-confidence updates are limited.

Core buckets for a broad scan:

1. regulator or policy
2. platform or merchant rules
3. trade media
4. brand or company moves
5. property, channel, or traffic

Optional expansion buckets:

1. supply chain
2. financing and capital markets
3. category-specific
4. social early-warning

## Freshness Filters

Apply these filters before keeping any item:

1. Confirm the published date, not just the page update date.
2. Check whether the story is a rewrite of an older event.
3. Reject reposts with no new fact.
4. Reject listicles and trend pieces unless they contain new, dated facts.
5. Prefer exact day-level timestamps over vague wording like "recently".

## Source Routing by Topic

### Policy or food-safety topic

Search order:

1. Regulator release
2. Local news or policy reporting
3. Company response
4. Platform response if relevant

### Platform-rule topic

Search order:

1. Platform merchant notice or governance page
2. Business or local-services media
3. Merchant or operator feedback

### Brand opening or financing topic

Search order:

1. Brand official account or release
2. Mall or property confirmation
3. Trade-media or business-media coverage
4. Data-tool validation

### Category trend topic

Search order:

1. Category trade media
2. Brand official channels
3. Supplier and ingredient media
4. Data-tool confirmation

## Output Rules for Thin News Days

On slow days:

- Return fewer items instead of adding stale content.
- Say clearly that high-confidence fresh updates are limited.
- Use a watchlist section for early signals that are not yet fully confirmed.
- Separate confirmed updates from lower-confidence observations.
- Still mention that the core buckets were checked, even if some returned no strong same-day developments.

## Recommended Language

When the results are thin, say something like:

- "Fresh, high-confidence restaurant updates within the past 24 hours are limited today."
- "Most newly published items trace back to older events, so they were excluded from the main digest."
- "The watchlist below contains early signals that still need stronger confirmation."
