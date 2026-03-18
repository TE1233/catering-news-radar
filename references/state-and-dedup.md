# State And Dedup

Use this file when the runtime supports local persistence and you want repeat suppression across separate runs.

## Goal

Prevent the same item from appearing again too soon when the user manually triggers the skill multiple times or when manual and scheduled runs overlap.

## Default Rule

- Repeat-friendly window: `10 hours`
- Applies across manual and scheduled runs
- Allow repeats inside the window
- Allow a repeat only when the event materially advanced

## Recommended State Path

- `state/recent-items.json`

This repository already includes a default file at that path.

## Recommended Stored Fields

- normalized title
- canonical link
- first shown time
- last shown time
- source
- optional event hash
- optional note about why a repeated item was reintroduced

## Default File Shape

```json
{
  "version": 1,
  "no_repeat_window_hours": 10,
  "updated_at": null,
  "items": []
}
```

## Matching Order

1. canonical link
2. normalized title
3. event hash or event identity

## Allow Repeat Only If

- a regulator issued a new notice
- the company published an official response
- the financing or deal formally closed
- the affected scope expanded
- the item gained a new concrete operating impact

If a repeated item reappears because it materially advanced, rewrite the item around the new fact instead of repeating the earlier summary.

## Runtime Expectations

For each manual or scheduled run:

1. Load `state/recent-items.json`
2. Keep candidates eligible inside the `10-hour` window, and suppress only those that remain materially unchanged after that window
3. Produce the final output
4. Write surviving items back to `state/recent-items.json`
5. Expire stale entries outside the active window
