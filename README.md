# 餐饮提莫 - 探探路

`restaurant-news-radar` 是一个餐饮资讯雷达 skill，别名：餐饮提莫 - 探探路。

它的目标不是堆新闻，而是用 `严格时效`、`广覆盖信源`、`跨次去重` 和 `简洁输出`，帮用户更快看到值得关注的餐饮行业动态。

## 这是什么

- 扫描过去 `24小时` 的餐饮行业动态
- 优先覆盖监管、平台、专业餐饮媒体、综合商业媒体、商圈渠道、品牌官方源
- 对同一事件做去重
- 对跨次触发结果做 `10小时` 不重复抑制
- 输出简洁中文雷达

## 为什么它不一样

和普通“餐饮新闻摘要”相比，这个 skill 更强调：

- `时效性`
  默认按 `24小时 -> 72小时 -> 7天` 分层扩展，不拿旧闻凑数
- `来源结构`
  不是只搜媒体，而是按来源桶覆盖监管、平台、媒体、商圈、品牌
- `10小时不重复`
  早上看过的内容，晚上再触发时默认不重复展示
- `适合 OpenClaw`
  支持中文关键词触发、安装完成后再按用户确认启用定时任务、用户可随时修改推送时间

## 快速开始

对你的 OpenClaw 说：

```text
帮我安装餐饮提莫 - 探探路：https://raw.githubusercontent.com/TE1233/catering-news-radar/main/docs/install.md
```

Windows 下如果是手动复制、二次保存，或让其他 agent 帮你“重建”文件内容，请注意：

- 所有文本文件要保持为 `UTF-8`
- 不要把 `agents/openai.yaml`、`SKILL.md` 转成 ANSI / GBK
- 最稳的方式是整目录复制原始文件，不要按文档重新敲一遍

安装后建议先做一个最小检查：

```yaml
interface:
  display_name: "餐饮提莫 - 探探路"
```

如果 `agents/openai.yaml` 里这段被截断、丢引号，或中文显示异常，说明安装过程改坏了文件，需要用仓库原始版本覆盖回去。

## 安装握手

这个 skill 默认采用“安装握手式”流程，解决的是“用户不知道装没装完”这个问题。

理想体验是：

1. 开始安装时，agent 先告诉用户“正在安装，完成后我会明确通知你”。
2. 安装过程中，如果用户提前说“启用餐饮资讯定时”，先拦住，不创建 cron。
3. 安装完成后，agent 再明确回复：“已安装完成。如果要开启每日推送，请回复：启用餐饮资讯定时”。

这一流程依赖本地状态文件：

- 文件：`state/install-status.json`
- 开始安装时：`installing: true`
- 安装完成后：`installed: true`

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

### 定时推送（按用户确认启用）

这个 skill 默认不会在安装后自动创建 cron。

只有在安装完成之后，如果你要开启每天 `08:45` 的定时推送，再对 agent 说：

```text
启用餐饮资讯定时
```

理想行为是：

- agent 先检查 `state/install-status.json`
- 如果 `installed !== true`，就告诉你“还在安装中，请等安装完成”
- 如果已经安装完成，再运行 `openclaw cron list` 检查是否已有同名任务
- 如果没有，再创建默认每天 `08:45` 的 `餐饮资讯` cron
- 如果已经存在，就明确告诉你“已启用，无需重复创建”

默认创建命令是：

```bash
openclaw cron add --name "餐饮资讯" --cron "45 8 * * *" --session isolated --message "Use $restaurant-news-radar to scan the past 24 hours of restaurant industry developments in China, cover regulator, platform, trade-media, brand, and property buckets, suppress items already shown in the past 10 hours unless they materially advanced, and produce a concise Chinese radar with dates, sources, and links." --announce --channel last
```

如果你想一开始就指定时间，也可以直接说：

```text
把餐饮资讯定时开到每天 7 点
```

### 修改定时推送时间

安装后可以随时用自然语言修改：

- "把餐饮资讯改到7点"
- "餐饮资讯提前到6:30"
- "把推送时间换成18:00"

### 关闭 / 重新开启

- "关掉餐饮资讯定时"
- "重新开启餐饮资讯"

共存规则：

- 手动触发和定时触发可以并存
- 两者共用同一份最近输出记忆
- 默认按 `10小时` 窗口抑制重复内容

## 10小时不重复

餐饮提莫默认设计成跨次触发不重复展示同一内容。

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
