# Output Templates

Use these templates to keep outputs crisp, dated, and action-oriented.

Default to Simplified Chinese unless the user asks for another language. Keep headings and labels natural for Chinese business readers.

Recommended Chinese labels:

- `Restaurant Radar` -> `餐饮提莫-探探路 🍜`
- `Morning Restaurant Radar` -> `餐饮资讯`
- `Evening Restaurant Brief` -> `餐饮晚报`
- `Weekly Foodservice Watch` -> `餐饮周观察`
- `Top line` -> `核心看点`
- `Priority items` -> `重点动态`
- `Watchlist` -> `观察名单`
- `Why it matters` -> `影响判断`
- `Open questions` -> `待确认点`

## Manual Scan

Use for ad hoc requests such as "scan the last 24 hours" or "what changed in the past 3 days in restaurant delivery platforms?"

Recommended structure:

```markdown
**餐饮提莫-探探路 🍜**
2026-03-18 09:20

**[P1.1]** **标题**
影响判断：一句话说明这条动态对品牌、商家、平台或投资人的影响。
来源：媒体或官方渠道，发布时间

**[P2.1]** **标题**
影响判断：...
来源：...
```

## Morning Push

Use for recurring delivery when the audience wants the most important overnight or same-day signals.

Recommended structure:

```markdown
**餐饮提莫-探探路 🍜**
2026-03-18 08:45

**[P1.1]** **标题**
影响判断：...
来源：...

**[P2.1]** **标题**
影响判断：...
来源：...
```

## Evening Brief

Use for end-of-day wrap-ups with a quick "what changed today" angle.

Recommended structure:

```markdown
**餐饮提莫-探探路 🍜**
2026-03-18 18:20

**[P1.1]** **标题**
影响判断：...
来源：...

**[P2.1]** **标题**
影响判断：...
来源：...
```

## Weekly Sector Watch

Use for category or investor-style roundups.

Recommended structure:

```markdown
**餐饮提莫-探探路 🍜**
2026-03-18 20:30

**[P1.1]** **标题**
影响判断：...
来源：...

**[P2.1]** **标题**
影响判断：...
来源：...
```

## Writing Rules

- Lead with signal, not scene-setting.
- Keep each item compact.
- Include source and date on every item.
- Use absolute dates instead of only relative terms.
- Always render items in strict priority order: all `P1` items first, then all `P2`, then all `P3`.
- Never place a `P2` or `P3` item above a remaining `P1` item.
- Within the same priority band, place newer items first.
- When multiple items share the same priority band, number them sequentially as `P1.1`, `P1.2`, `P1.3` or `P2.1`, `P2.2`, etc.
- Default to `影响判断` for a cleaner product feel.
- Do not add `核心看点`、`去重说明`、`后续观察`、`观察名单` unless the user explicitly asks for them.
- Do not include `来源类型` unless the user explicitly asks for it.
- Bold the priority tag together with the event title.
- Prefer Chinese industry wording over literal translation.
- For user-facing Chinese outputs, prefer `**餐饮提莫-探探路 🍜**` as the visible product title and keep the English skill id out of the visible copy unless the user asks for installation details.
- Do not show raw links by default. Only include links when the user explicitly asks for them or when links are required for the task.
