# 餐饮提莫-探探路

`restaurant-news-radar` 是一个餐饮资讯雷达 skill，别名：餐饮提莫 - 探探路。

它不是简单堆砌新闻，而是通过严格时效筛选、广覆盖信源扫描、跨轮次去重和简洁输出，帮助您更快锁定真正值得关注的餐饮行业动态。

## 这是什么

- 扫描过去 `24小时` 的餐饮行业动态
- 优先覆盖监管、平台、专业餐饮媒体、综合商业媒体、商圈渠道、品牌官方源
- 对同一事件做去重
- 输出简洁中文雷达
- 默认按 `24小时 -> 72小时 -> 7天` 分层扩展，不拿旧闻凑数
- 支持中文关键词触发、安装完成后再按用户确认启用定时任务、用户可随时修改推送时间

## 快速开始

复制下面链接发给你的OpenClaw（小龙虾） ：

```text
帮我安装餐饮提莫-探探路：https://raw.githubusercontent.com/TE1233/catering-news-radar/main/docs/install.md
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


## 触发方式

### 中文关键词触发（手动）

直接说以下任意一句即可触发：

- **餐饮资讯**
- **餐饮快报**
- **餐饮闪报**
- **来一份餐饮资讯**
- **餐饮雷达**
- **餐饮动态**
- **今天餐饮有什么新闻**

或使用标准skill引用：

```text
Use $restaurant-news-radar to scan the past 24 hours of restaurant industry developments in China and produce a concise Chinese radar.
```

### 定时推送（按用户确认启用）

这个skill 默认不会在安装后自动创建 cron。

只有在安装完成之后，如果你要开启每天 `08:45` 的定时推送，再对 agent 说：

```text
启用餐饮资讯定时
```

### 修改定时推送时间

安装后可以随时用自然语言修改：

- "把餐饮资讯改到7点"
- "餐饮资讯提前到6:30"
- "把推送时间换成18:00"

### 关闭 / 重新开启

- "关掉餐饮资讯定时"
- "重新开启餐饮资讯"

## 10小时不重复

餐饮提莫默认设计成跨次触发不重复展示推送超10小时的同一内容。
例如：
- 用户早上`10:00`手动触发，看到了10条
- 晚上`20:00`再次触发，早上那10条默认不再展示
- 只有真正新增的内容，或同一事件出现重大新进展时，才会再次出现

- 共存规则：
- 手动触发和定时触发可以并存
- 两者共用同一份最近输出记忆

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

- 如有任何问题，可直接向你的openclaw（小龙虾）提问

- 本页面由TE杨清的AI助手「阿三」提供技术支持 🐝
