# 餐饮提莫 - 探探路

`restaurant-news-radar` 是一个餐饮资讯雷达skill，别名：餐饮提莫-探探路。

它的目标不是堆新闻，而是用`严格时效`、`广覆盖信源`、`跨次去重`和`简洁输出`，帮用户更快看到值得关注的餐饮行业动态。


## 这是什么

- 扫描过去 `24小时` 的餐饮行业动态
- 优先覆盖监管、平台、专业餐饮媒体、综合商业媒体、商圈渠道、品牌官方源
- 对同一事件做去重
- 对跨次触发结果做 `10小时` 不重复抑制
- 输出简洁中文雷达

## 为什么它不一样

和普通"餐饮新闻摘要"相比，这个 skill 更强调：

- `时效性`
  默认按 `24小时 -> 72小时 -> 7天` 分层扩展，不拿旧闻凑数
- `来源结构`
  不是只搜媒体，而是按来源桶覆盖监管、平台、媒体、商圈、品牌
- `10小时不重复`
  早上看过的内容，晚上再触发时默认不重复展示
- `适合 OpenClaw`
  支持中文关键词触发、安装后自动创建定时任务、用户可随时修改推送时间

## 快速开始

对你的OpenClaw（小龙虾）说：

```text
帮我安装餐饮提莫 - 探探路：https://raw.githubusercontent.com/TE1233/catering-news-radar/main/docs/install.md
```


## 触发方式

### 中文关键词触发（手动）

直接说以下任意一句即可触发：

- **餐饮资讯**
- **来一份餐饮资讯**
- **餐饮雷达**
- **餐饮动态**
- **今天餐饮有什么新闻**

或使用标准 skill 引用：

```text
Use $restaurant-news-radar to scan the past 24 hours of restaurant industry developments in China and produce a concise Chinese radar.
```

### 定时推送（自动）

安装并启用 bootstrap hook 后，自动创建每日 `08:45` 定时推送：

```bash
openclaw hooks enable restaurant-radar-setup
```

如果不启用 hook，也可以手动创建：

```bash
openclaw cron add --name "餐饮资讯" --cron "45 8 * * *" --session isolated --message "Use $restaurant-news-radar to scan the past 24 hours of restaurant industry developments in China, cover regulator, platform, trade-media, brand, and property buckets, suppress items already shown in the past 10 hours unless they materially advanced, and produce a concise Chinese radar with dates, sources, and links." --announce --channel last
```

### 修改推送时间

安装后可以随时用自然语言修改：

- "把餐饮资讯改到7点"
- "餐饮资讯提前到6:30"
- "把推送时间换成18:00"

### 关闭 / 重新开启

- "关掉餐饮资讯定时"
- "重新开启餐饮资讯"

## 触发规则

手动触发：

- 始终可用
- 不需要先启用 cron
- 默认扫过去 `24小时`

定时触发：

- 启用 bootstrap hook 后自动创建
- 默认每天 `08:45`
- 用户可随时修改时间

共存规则：

- 手动触发和定时触发可以并存
- 两者共用同一份最近输出记忆
- 默认按 `10小时` 窗口抑制重复内容

## 10小时不重复

餐饮提莫-默认设计成跨次触发不重复展示同一内容。

例如：

- 用户早上 `10:00` 手动触发，看到了 10 条
- 晚上 `20:00` 再次触发
- 早上那 10 条默认不再展示
- 只有真正新增的内容，或同一事件出现重大新进展时，才会再次出现


## 核心参考文件

- [SKILL.md](./SKILL.md)
- [references/source-map.md](./references/source-map.md)
- [references/direct-source-watchlist.md](./references/direct-source-watchlist.md)
- [references/brand-official-watchlist.md](./references/brand-official-watchlist.md)
- [references/search-playbook.md](./references/search-playbook.md)
- [references/keyword-templates.md](./references/keyword-templates.md)
- [references/state-and-dedup.md](./references/state-and-dedup.md)
- [references/output-templates.md](./references/output-templates.md)
- [references/openclaw-automation.md](./references/openclaw-automation.md)

由 TE杨清 的 AI 助手「阿三」提供技术支持 🐝
