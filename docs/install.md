# 餐饮资讯雷达安装说明

如果你在 OpenClaw 中想安装这个 skill，可以直接使用下面这句话：

```text
帮我安装餐饮资讯雷达：https://raw.githubusercontent.com/TE1233/catering-news-radar/main/docs/install.md
```

## 安装执行要求

安装时请严格按下面的约束执行：

- 把整个 skill 仓库内容原样复制到 OpenClaw skill 目录，不要根据文档“重新生成”文件内容。
- 目录名必须保持为 `restaurant-news-radar`。
- 所有文本文件必须保持为 `UTF-8` 编码，不要转成 ANSI、GBK 或其他本地编码。
- 特别是 `agents/openai.yaml` 必须保持为合法 YAML，不能截断，也不能丢失引号。
- 如果目标目录里已经有同名 skill，先完整替换旧目录，再启用或重载。

推荐的安装结果应该是直接复制这些原始文件：

- `SKILL.md`
- `README.md`
- `agents/openai.yaml`
- `hooks/openclaw/HOOK.md`
- `hooks/openclaw/handler.ts`
- `references/*`
- `state/recent-items.json`

## 安装目标

安装这个 skill，并保持：

- 对外展示名：`餐饮提莫 - 探探路`
- skill id / 目录名：`restaurant-news-radar`

安装后，这个 skill 应该具备：

- 手动触发可立即使用（说"餐饮资讯"或"来一份餐饮资讯"）
- 自动创建每日 `08:45` 的定时推送（通过 bootstrap hook）
- 用户可随时修改推送时间（说"把餐饮资讯改到7点"）
- 支持 `10小时` 内跨次运行不重复展示相同内容

## 安装后的默认行为

- 手动触发：可直接运行
- 定时任务：安装后自动创建每日 08:45 推送
- 用户可通过自然语言修改推送时间、关闭或重新开启定时

## 最低自检

安装完成后，至少检查下面两项：

1. `agents/openai.yaml` 仍然是合法 YAML，并且包含：

```yaml
interface:
  display_name: "餐饮提莫 - 探探路"
```

2. `SKILL.md` 顶部 frontmatter 仍然以这三行开头：

```yaml
---
name: restaurant-news-radar
description:
```

## 手动触发示例

以下说法都可以触发：

```text
餐饮资讯
来一份餐饮资讯
餐饮雷达
餐饮动态
今天餐饮有什么新闻
```

或使用标准 skill 引用：

```text
Use $restaurant-news-radar to scan the past 24 hours of restaurant industry developments in China and produce a concise Chinese radar.
```

## 修改推送时间

安装后默认每天 08:45 推送。用户可以随时说：

- "把餐饮资讯改到7点"
- "餐饮资讯提前到6:30"
- "把推送时间换成18:00"

Agent 会自动修改 cron 任务时间。

## 关闭 / 重新开启定时

- 关闭："关掉餐饮资讯定时"
- 重新开启："重新开启餐饮资讯"

## 启用 bootstrap hook（推荐）

启用后，安装时会自动创建定时任务：

```bash
openclaw hooks enable restaurant-radar-setup
```

如果不启用 hook，也可以手动创建定时任务：

```bash
openclaw cron add --name "餐饮资讯" --cron "45 8 * * *" --session isolated --message "Use $restaurant-news-radar to scan the past 24 hours of restaurant industry developments in China, cover regulator, platform, trade-media, brand, and property buckets, suppress items already shown in the past 10 hours unless they materially advanced, and produce a concise Chinese radar with dates, sources, and links." --announce --channel last
```
