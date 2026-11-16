# Tezga: Business (parts 1–4)

> **Status: draft v1, 13 Nov 2026.**
> Lines marked **[VERIFY]** are assumptions or numbers I could not confirm from a primary source. Lines marked **[TODO: interviews]** must be filled in from real conversations before this document counts as done.

---

## 1. The problem

**One sentence:**
Small shops and home sellers in Kosovo and North Macedonia sell through Instagram and WhatsApp DMs. Every evening they lose 1–3 hours answering the same "price? size? delivery?" messages and copying orders into a notebook, and they lose sales when a message gets buried or a customer gives up waiting for a reply.

**When it hurts most:** evenings and weekends (when customers browse), campaign days (Black Friday, Bajram, New Year) and any day a post goes viral and the DMs explode.

**What it costs today:**
- **Time:** a seller answering ~40 DMs a day at ~2 minutes each spends **~80 min/day** just on repeat questions **[VERIFY in interviews]**.
- **Money:** missed or forgotten orders, wrong addresses and refused cash-on-delivery packages that still cost a courier fee (~€2–3 per package) **[VERIFY]**.
- **Stress:** "I'm on my phone until midnight", mixed-up orders, no idea what actually sold this month.

### What real people said [TODO: interviews]

Talk to **at least two** people who sell on Instagram/WhatsApp (a clothing boutique, a cosmetics seller, a phone-accessories shop, a home baker). Ask the questions below and write down their **exact words**, without cleaning them up.

**Questions:**
1. How do customers order from you today, step by step?
2. How many messages do you answer on a normal day? On your busiest day?
3. Tell me about the last time an order went wrong. What happened, and what did it cost you?
4. Have you tried a website or an online shop? Why did you stop, or why not?
5. If something fixed this, what would you pay per month? What would make you say no?

| # | Who (type of business, city; no full names) | Date | What they said (their words) | What I learned |
|---|---|---|---|---|
| 1 | _e.g. clothing boutique, Prishtinë_ | | "…" | |
| 2 | _e.g. cosmetics seller, Tetovë/Shkup_ | | "…" | |
| 3 | _(optional)_ | | "…" | |

> If the interviews contradict this page (for example, nobody minds the DMs), **change the problem**. Don't change the quotes.

---

## 2. The big picture

**Product in one sentence (for a stranger):**
**Tezga gives a small shop its own online store in Albanian, Macedonian and English in one day. Customers order with cash on delivery, and every order arrives on the owner's phone instead of getting lost in DMs.**

| | |
|---|---|
| **Who uses it** | (1) The **shop owner** and staff manage products and orders. (2) The **end customer** browses and orders from their phone, without an account. |
| **Who pays** | Only the **shop owner** (monthly subscription). The end customer never pays Tezga. |
| **Why now** | Instagram/TikTok selling has exploded in both countries, but shoppers still want **cash on delivery** and their **own language**, which global tools handle badly. Couriers now deliver nationwide in 24–48 h, so the missing piece is the ordering, not the delivery. Building a shop has also become cheap: the core already exists (the Nkonlinestore project: catalogue, cart, COD orders, coupons, delivery price per city, Telegram alerts, sq/mk/en). |

### Three different ways to solve the same problem

| Option | How it works | Pros | Cons |
|---|---|---|---|
| **A. Done-for-you service** | I build each shop a custom site and charge once (agency style). | Easy to sell; cash up front. | Doesn't scale. Every shop is custom work, no recurring income, and I'd be selling my hours. |
| **B. Marketplace** | One big site where all small sellers list products (like GjirafaMall). | Customers come to one place. | Chicken-and-egg (needs buyers *and* sellers), heavy logistics and support, and sellers lose their own brand and customer list. Gjirafa already owns this in Kosovo. |
| **C. WhatsApp order bot** | A bot answers price/size questions and takes orders inside WhatsApp. | Lives where customers already are. | WhatsApp Business API costs and approval; showing catalogues and photos in chat is clumsy; easy to break; hard to show a "shop". |
| **D. Self-serve shop platform (chosen)** | Each seller gets `name.tezga.shop`, sets up products themselves (or pays a one-off setup fee for me to do it), and pays monthly. | Recurring revenue; one codebase for every shop; the seller keeps their own brand; I already have working code. | I must win against "it's free to just use DMs". Onboarding has to be extremely simple. |

**Why D:** it is the only option that gives **recurring income without selling my hours**, it reuses code I have already built and tested, and it keeps sellers in control of their brand. A paid **setup service (A) is kept as an add-on**, because many first customers will want someone to do it for them.

---

## 3. The market

### Competitors

> Prices checked 13 Nov 2026 from public sources. Re-check on each vendor's pricing page before presenting.

| Competitor | Price | What it does well | Where it fails for our customer | Link |
|---|---|---|---|---|
| **Shopify** | Basic **$39/mo** (monthly) or $29/mo yearly; EU ≈ €36/mo **[VERIFY regional price]** | Best-in-class store builder, huge app ecosystem | Expensive for a small shop here. No native Albanian storefront without apps or translation work; built for card payments, not COD-first; English admin | https://www.shopify.com/pricing |
| **Ecwid (Lightspeed)** | Starter ~$5/mo (10 products); Venture **$35/mo** monthly, $29/mo yearly (prices raised Mar 2026); free plan discontinued | Can be embedded into an existing site or Facebook page; simple | Same price problem as Shopify; English-first support; no local delivery-price-per-city logic | https://www.ecwid.com/pricing |
| **GjirafaMall** (Kosovo marketplace) | Commission per sale, **rate not public [VERIFY by contacting sellers' team]** | Big audience in Kosovo, handles trust and delivery | The seller becomes one product among 140,000+. No own brand, no own customer list, price competition. Weak in North Macedonia | https://gjirafamall.com |
| **Local web agency / freelancer** | One-off, roughly **€300–1,000** plus hosting **[VERIFY: ask 2 agencies for a quote]** | Custom design, personal contact | Slow (weeks), expensive up front, and the seller usually can't update products or prices without calling the developer | Local; e.g. search "web dizajn Prishtinë" / "изработка веб страна Скопје" |
| **"Do nothing": Instagram/WhatsApp DMs + notebook/Excel** | **€0** | Free, familiar, customers already there | Hours of repeat answers, lost orders, no stock tracking, no history, depends on the owner being online | n/a |

**Competitors I may have missed (to check with Claude Research):** Wix eCommerce, WooCommerce (self-hosted WordPress), Facebook/Instagram Shops (Meta), local classifieds such as **Pazar3.mk** (North Macedonia), and any regional startup doing "shop in a link" for the Balkans.

### How many possible customers? (Kosovo + North Macedonia)

| Step | Kosovo | North Macedonia | Source / assumption |
|---|---|---|---|
| Registered SMEs / business entities | **~53,080** | **~72,922** | KS: OECD *SME Policy Index 2026*, Kosovo profile (reference year not confirmed) **[VERIFY]**. MK: State Statistical Office, 2021 count, reported by MIA |
| × share in retail/consumer trade | × 30% | × 30% | **[ASSUMPTION]**: wholesale & retail is typically the largest sector in both economies |
| × share that already sells via Instagram/WhatsApp | × 20% | × 20% | **[ASSUMPTION]**: to test in interviews and by counting local Instagram shops |
| **= Serviceable market (registered)** | **≈ 3,200 shops** | **≈ 4,400 shops** | |
| **Total** | | | **≈ 7,600 shops** |

**Not counted (upside):** unregistered home sellers (cakes, handmade goods, resellers), probably thousands more, and the diaspora-facing shops.

**Value:** 7,600 × €15/month × 12 ≈ **€1.37 M per year** if everyone used Tezga. **Realistic year-1 goal:** **50 paying shops (< 1%) ≈ €750 MRR.**

### Why a customer would choose Tezga

**Tezga is the only shop builder made for how people here actually buy: Albanian and Macedonian, cash on delivery, delivery price per city, orders straight to your phone, for less than half the price of Shopify and running the same day.**

---

## 4. Business model and price

### Lean Canvas (one page)

| **Problem** | **Solution** | **Unique value proposition** | **Unfair advantage** | **Customer segments** |
|---|---|---|---|---|
| 1. Hours lost answering repeat DMs<br>2. Lost / mixed-up orders<br>3. Real online shops are too expensive or too complex<br>**Existing alternatives:** DMs + notebook, Shopify, agencies, GjirafaMall | 1. Ready shop in sq/mk/en in one day<br>2. COD order form + delivery price per city<br>3. Every order pinged to the owner's phone (Telegram, later WhatsApp) + simple order list | **"Your shop online, today. In your language, with cash on delivery."** <br><br>**High-level concept:** "Shopify for Instagram sellers in Kosovo & North Macedonia" | Founder speaks Albanian & Macedonian and knows local buying habits (COD, cities, couriers); working product already built (Nkonlinestore) | **Early adopters:** Instagram clothing & cosmetics boutiques with 2k–50k followers in Prishtinë, Prizren, Tetovë, Shkup, Gostivar<br>Later: phone accessories, home bakers, handmade |
| **Key metrics** | | **Channels** | | |
| Shops activated (≥5 products + 1st order)<br>Orders per shop per week<br>Trial → paid conversion<br>Monthly churn | | Instagram DMs to sellers, local FB groups, referrals, setup service, short demo videos (sq + mk) | | |
| **Cost structure** | | | **Revenue streams** | |
| Hosting ~€10–20, domain ~€3, email €0–10, AI €0–5 (later), Telegram €0, my time | | | €15/month subscription (or €150/year)<br>€49 one-off "we set it up for you"<br>Founding price €9/month for first 10 shops | |

### Price and why

| Plan | Price | Why |
|---|---|---|
| **Tezga Shop** | **€15/month**, or **€150/year** (2 months free) | Monthly, because sellers earn monthly and fear big up-front costs. €15 is the price of **one or two saved orders** a month, and less than half of Shopify Basic ($39) or Ecwid Venture ($35). |
| **Founding shops** (first 10) | **€9/month, locked for 12 months** | Buys feedback and testimonials while the product is young |
| **Setup service** (optional) | **€49 one-off** | I add their first 30 products, logo and delivery prices. Removes the #1 excuse ("I have no time to set it up") |
| **Free trial** | 14 days, no card | Lets the seller get a first real order before paying |

**No commission per order.** Sellers here hate giving a % of every sale, and with cash on delivery it is also hard to collect.

### Monthly costs (v1, up to ~50 shops)

| Item | Choice | €/month |
|---|---|---|
| Hosting (Node + SQLite/Postgres) | Railway or a small VPS | 10–20 |
| Domain `tezga.shop` + wildcard subdomains | Registrar (.shop: cheap year 1, more on renewal **[VERIFY]**) | ~3 (amortised) |
| Transactional email (order confirmations, password reset) | Resend / Brevo free tier | 0–10 |
| SMS | **Not in v1.** Telegram alerts are free | 0 |
| AI (product-description helper, later) | Claude API, small usage | 0–5 |
| Backups / storage for photos | Object storage | 1–5 |
| **Total** | | **≈ €15–45 / month** |

**Break-even:** 3–5 paying shops.

### How the first 10 customers will find Tezga

| # | Channel | Exactly what I do | Target |
|---|---|---|---|
| 1 | **Instagram DMs** | Make a list of 100 local boutiques with "porosit në DM" / "нарачки во DM" in their bio. Send a personal message with a **ready demo shop filled with *their* products** (from their public posts). | 4 shops |
| 2 | **Personal network** | Friends, family and classmates who sell, or know someone who does (Prishtinë, Tetovë, Shkup). | 3 shops |
| 3 | **Facebook groups** | Local small-business and "shitje/blerje" groups: a short demo video in sq + mk (the existing Nkonlinestore videos are a start). | 2 shops |
| 4 | **Referral** | Each shop that brings another gets 1 month free. | 1+ shops |

---

### Sources
- Shopify pricing summaries 2026: https://www.nerdwallet.com/article/small-business/shopify-pricing · https://www.websitebuilderexpert.com/shopify-pricing
- Ecwid price change March 2026: https://support.ecwid.com/hc/en-us/articles/25122701806108 · https://eesel.ai/blog/ecwid-pricing
- GjirafaMall / Gjirafa e-commerce: https://about.gjirafa.com/what-we-do/e-commerce · https://www.trendingtopics.eu/everything-started-from-a-university-dorm-how-kosovo-startup-gjirafa-became-the-western-balkans-amazon/
- Kosovo SMEs (OECD SME Policy Index 2026): https://www.oecd.org/en/publications/sme-policy-index-for-western-balkans-and-turkiye-2026-economy-profile-for-kosovo_5737889a-en/full-report/kosovo-sme-sector-overview_9d53e176.html
- North Macedonia business entities (SSO via MIA): https://mia.mk/en/story/sso-72922-businesses-in-north-macedonia-in-2021-82-with-1%E2%80%939-workers-on-their-payroll
