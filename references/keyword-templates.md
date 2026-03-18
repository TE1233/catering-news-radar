# Keyword Templates

Use this file to keep searches fast, fresh, and complete enough for a daily radar.

The goal is not to run every possible query. The goal is to cover each important source bucket with a small number of high-yield searches, then expand only if a bucket is thin.

## Query Design

Build queries from four parts:

- time term
- topic term
- source term
- action term

Example pattern:

- `today + restaurant + regulator + notice`
- `past 24 hours + delivery platform + merchant rules + update`
- `today + chain brand + opening + mall`

## Time Terms

Use these by layer:

### T0

- `today`
- `yesterday`
- exact date such as `2026-03-16`

### T1

- `past 3 days`
- `this week`
- date range terms

For China-facing Chinese runs, naturally translate the time idea into Chinese search phrasing such as `今天`, `昨日`, `近24小时`, `近3天`, or exact dates.

## Core Buckets

For broad daily scans, cover these buckets before stopping:

1. regulator and policy
2. platform and merchant rules
3. trade media
4. brand and company moves
5. property, channel, and traffic

Use these as optional expansion buckets:

1. supply chain
2. category-specific
3. financing and capital markets
4. social early-warning

## Fast Mode

Use this for scheduled morning pushes and time-sensitive manual scans.

Run one or two queries per core bucket.

### Regulator and policy

- `餐饮 市场监管 通报 今天`
- `餐饮 商务局 通知 今天`

### Platform and merchant rules

- `美团 商家 公告 今天`
- `抖音 生活服务 商家 规则 今天`

### Trade media

- `餐饮 行业 资讯 今天`
- `茶饮 咖啡 餐饮 快讯 今天`

### Brand and company moves

- `餐饮品牌 开店 联名 融资 今天`
- `咖啡 茶饮 品牌 动态 今天`

### Property, channel, and traffic

- `赢商 餐饮 品牌 入驻 今天`
- `购物中心 餐饮 开业 今天`

## Balanced Mode

Use this for normal manual scans where you want better coverage.

Run the Fast Mode set, then add one more query in any bucket that came back thin.

Suggested adds:

### Regulator and policy

- `食品安全 餐饮 处罚 今天`

### Platform and merchant rules

- `外卖 平台 治理 公告 今天`

### Trade media

- `红餐 餐饮 资讯`
- `餐饮 媒体 快讯 今日`

### Brand and company moves

- `餐饮品牌 上新 调价 今天`
- `连锁餐饮 加盟 扩张 今天`

### Property, channel, and traffic

- `商场 餐饮 品牌 调整 今天`
- `餐饮 客流 消费 券 今天`

## Deep Mode

Use this only for category watches, weekly reports, or special investigations.

### Supply chain

- `咖啡豆 涨价 今天`
- `乳制品 茶饮 原料 今天`
- `冷链 包装 食品 供应链 今天`

### Financing and capital markets

- `餐饮 融资 今天`
- `餐饮 上市 公司 公告 今天`
- `消费 餐饮 并购 今天`

### Category-specific

- `茶饮 开店 联名 今天`
- `咖啡 连锁 扩张 今天`
- `烘焙 快餐 火锅 动态 今天`

### Social early-warning

- `餐饮 爆品 门店 风波 今天`
- `外卖 商家 争议 今天`

Only elevate social signals after verification from a stronger source.

## Bucket Routing Rules

- If the user asks for `latest restaurant news`, run all core buckets.
- If the user asks for `delivery platform updates`, start with platform and regulator buckets, then add trade media.
- If the user asks for `tea or coffee`, start with brand, trade media, supply chain, and property buckets.
- If the user asks for `food safety`, start with regulator, local reporting, brand response, and platform response.

## Coverage Rules

- Do not stop only because one query already produced enough items.
- Stop only after all relevant buckets have been checked for the active layer.
- Keep one to three strong candidates per bucket before deduplication.
- If a bucket is empty in T0, try it once more in T1 before giving up.

## Freshness Safeguards

- Reject listicles and evergreen explainers unless they contain a new dated fact.
- Reject stories with no clear publish date when the task is latest-news oriented.
- Prefer exact day-level timestamps over vague wording such as `recently`.
- If a newly published article points back to an older event, classify it as background rather than fresh news.
