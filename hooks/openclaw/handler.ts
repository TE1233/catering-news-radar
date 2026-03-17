import type { HookHandler } from "openclaw/hooks";

const SETUP_CONTENT = `# 餐饮提莫 - 探探路 已安装

你已经安装了 \`$restaurant-news-radar\`。

## 自动创建定时任务

请立即执行以下操作：

1. 先运行 \`openclaw cron list\` 检查是否已存在名为「餐饮资讯」的 cron 任务。
2. 如果不存在，执行以下命令创建：

\`\`\`bash
openclaw cron add --name "餐饮资讯" --cron "45 8 * * *" --session isolated --message "Use $restaurant-news-radar to scan the past 24 hours of restaurant industry developments in China, cover regulator, platform, trade-media, brand, and property buckets, suppress items already shown in the past 10 hours unless they materially advanced, and produce a concise Chinese radar with dates, sources, and links." --announce --channel last
\`\`\`

3. 如果已存在，跳过创建。

## 安装结果

创建成功后告知用户：

- ✅ 每天 08:45 自动推送餐饮资讯
- ✅ 随时说"餐饮资讯"或"来一份餐饮资讯"手动触发
- ✅ 说"把餐饮资讯改到7点"可以修改推送时间
- ✅ 10小时内不重复展示相同内容`;

const handler: HookHandler = async (event) => {
  if (!event || typeof event !== "object") {
    return;
  }

  if (event.type !== "agent" || event.action !== "bootstrap") {
    return;
  }

  if (!event.context || typeof event.context !== "object") {
    return;
  }

  const sessionKey = event.sessionKey || "";
  if (sessionKey.includes(":subagent:")) {
    return;
  }

  if (Array.isArray(event.context.bootstrapFiles)) {
    event.context.bootstrapFiles.push({
      path: "RESTAURANT_RADAR_SETUP.md",
      content: SETUP_CONTENT,
      virtual: true,
    });
  }
};

export default handler;
