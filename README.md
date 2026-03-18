# 餐饮提莫-探探路

`restaurant-news-radar` 是一个面向 OpenClaw 的餐饮行业资讯雷达 skill。

它不是简单堆砌新闻，而是通过严格时效筛选、广覆盖信源扫描、跨轮次去重和简洁输出，帮助用户更快锁定真正值得关注的餐饮行业动态。

当前默认展示样式：

- 顶部标题使用 `**餐饮提莫-探探路 🍜**`
- 标题下方只显示当前触发时间
- 事件按 `P1 -> P2 -> P3` 严格排序
- 同档位连续编号，例如 `P1.1 / P1.2 / P2.1`
- 优先级标签和标题一起加粗
- 默认不显示链接，只显示 `来源 + 日期`

## 这个 skill 做什么

- 默认扫描过去 `24 小时` 的餐饮行业动态
- 内容不足时最多放宽到 `72 小时`
- 默认不收录底层事件时间超过 `72 小时` 的旧闻
- 同时覆盖监管、平台、品牌、餐饮专业媒体、商业消费媒体、商场渠道等多类信源
- 手动触发和定时推送都必须同时使用 `直连页抓取 + 搜索引擎检索`
- 手动与定时共用最近输出记忆，按 `10 小时` 窗口做跨次去重

## 为什么它不一样

- 严格时效
  默认 `24 小时`，最多 `72 小时`，不再扩到 7 天
- 广覆盖信源
  不是只扫媒体页，而是按来源桶覆盖监管、平台、品牌、餐饮媒体、商场渠道等
- 跨次去重
  `10 小时内可以重复`，`10 小时外` 才压掉无新进展的重复内容
- 适配 OpenClaw
  支持手动触发、安装握手、定时启用、修改时间、关闭和重新开启

## 快速开始

把下面这句发给你的 OpenClaw：

```text
帮我安装餐饮提莫 - 探探路：https://raw.githubusercontent.com/TE1233/catering-news-radar/main/docs/install.md
```

如果你在 Windows 下手动复制、二次保存，或让其他 agent 重新生成文件内容，请注意：

- 所有文本文件保持 `UTF-8`
- 不要把 [openai.yaml](D:/Backup/openclaw-backup/catering-news-radar-main/agents/openai.yaml) 和 [SKILL.md](D:/Backup/openclaw-backup/catering-news-radar-main/SKILL.md) 转成 ANSI / GBK
- 最稳的方式是整目录复制原始文件，不要手动重敲内容

安装后建议先做一个最小检查：

```yaml
interface:
  display_name: "餐饮提莫 - 探探路"
```

如果 [openai.yaml](D:/Backup/openclaw-backup/catering-news-radar-main/agents/openai.yaml) 里这一段被截断、缺引号或中文显示异常，说明安装过程把文件写坏了，需要用仓库原始版本覆盖回去。

## 安装握手

这个 skill 默认采用“安装握手式”流程，解决的是“用户不知道装没装完”的问题。

理想流程：

1. 安装开始时，agent 先告诉用户“正在安装，完成后我会明确通知你”。
2. 安装过程中，如果用户提前说“启用餐饮资讯定时”，先拦住，不创建 cron。
3. 安装完成后，agent 再明确回复：“已安装完成。如果要开启每日推送，请回复：启用餐饮资讯定时。”

这套流程依赖 [install-status.json](D:/Backup/openclaw-backup/catering-news-radar-main/state/install-status.json)：

- 开始安装时写 `installing: true`
- 安装完成后写 `installed: true`

## 触发方式

### 手动触发

下面这些说法都可以直接触发：

- `餐饮资讯`
- `餐饮快报`
- `餐饮闪报`
- `来一份餐饮资讯`
- `餐饮雷达`
- `餐饮动态`
- `今天餐饮有什么新闻`

也可以直接引用 skill：

```text
Use $restaurant-news-radar to scan the past 24 hours of restaurant industry developments in China and produce a concise Chinese radar.
```

### 定时推送

这个 skill 不会在安装后自动创建 cron。

只有在安装完成后，如果你明确要求开启每日推送，再对 agent 说：

```text
启用餐饮资讯定时
```

默认定时是每天 `08:45`。如果你启用时已经指定时间，就按你给的时间创建。

理想行为：

- 先检查 [install-status.json](D:/Backup/openclaw-backup/catering-news-radar-main/state/install-status.json)
- 未安装完成时，不创建任务
- 安装完成后，优先把当前会话的显式投递路由固化到 cron
- 如果没有明确投递目标，就先询问用户，或创建 `--no-deliver` 版本
- 已存在同名 cron 时，不重复创建

默认创建命令示例：

```bash
openclaw cron add --name "餐饮资讯" --cron "45 8 * * *" --session isolated --message "Use $restaurant-news-radar to scan the past 24 hours of restaurant industry developments in China, cover regulator, platform, trade-media, brand, and property buckets, allow repeats during the first 10 hours, suppress only items that remain materially unchanged after 10 hours, and produce a concise Chinese radar with dates and sources." --announce --channel "<current-channel>" --to "<current-target>" --account "<current-account-id>"
```

如果当前会话没有明确的投递目标，更稳的是：

- 先让用户确认要推到哪里
- 或先创建 `--no-deliver` 的内部定时任务

### 修改时间 / 关闭 / 重新开启

这些自然语言都应该被识别：

- `把餐饮资讯改到 7 点`
- `餐饮资讯提前到 6:30`
- `把推送时间换成 8:00`
- `关掉餐饮资讯定时`
- `重新开启餐饮资讯`

## 信源与搜索规则

默认广义扫描至少覆盖这些桶：

- 监管 / 政策
- 平台 / 商家规则
- 餐饮专业媒体
- 品牌 / 公司动作
- 商场 / 渠道 / 客流

并且每次 broad run 都必须同时包含：

- 直连页抓取
- 搜索引擎检索

不能只靠几个固定页面完成一次扫描。

## 10 小时重复规则

当前规则是：

- `10 小时内可以重复`
- `10 小时外`，如果同一条内容没有实质性新进展，就压掉
- 如果同一事件出现了明显新进展，即使在窗口外也可以再次进入结果

## 核心参考文件

- [SKILL.md](D:/Backup/openclaw-backup/catering-news-radar-main/SKILL.md)
- [source-map.md](D:/Backup/openclaw-backup/catering-news-radar-main/references/source-map.md)
- [direct-source-watchlist.md](D:/Backup/openclaw-backup/catering-news-radar-main/references/direct-source-watchlist.md)
- [brand-official-watchlist.md](D:/Backup/openclaw-backup/catering-news-radar-main/references/brand-official-watchlist.md)
- [search-playbook.md](D:/Backup/openclaw-backup/catering-news-radar-main/references/search-playbook.md)
- [keyword-templates.md](D:/Backup/openclaw-backup/catering-news-radar-main/references/keyword-templates.md)
- [state-and-dedup.md](D:/Backup/openclaw-backup/catering-news-radar-main/references/state-and-dedup.md)
- [output-templates.md](D:/Backup/openclaw-backup/catering-news-radar-main/references/output-templates.md)
- [openclaw-automation.md](D:/Backup/openclaw-backup/catering-news-radar-main/references/openclaw-automation.md)
