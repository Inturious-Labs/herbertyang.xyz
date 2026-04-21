---
title: About
description: Bio, contact, blog, news, photo gallery and cookbook
image: '/img/herbert_preview.jpg'
keywords: [Herbert Yang, blog, photography, cookbook, Stanford, Sloan Fellow, Singapore]
---

<style>{`
  .bcard {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    min-height: 80vh;
    padding: 2.5rem 1rem 2rem;
    justify-content: center;
  }
  .bcard-avatar {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 1.2rem;
    border: 3px solid var(--ifm-color-primary);
  }
  .bcard-name {
    font-size: 2rem;
    font-weight: 700;
    margin: 0;
    line-height: 1.2;
  }
  .bcard-name-cn {
    font-size: 1.1rem;
    color: var(--ifm-color-primary-light);
    margin-top: 0.2rem;
  }
  .bcard-title {
    font-size: 1.1rem;
    margin-top: 1.2rem;
    color: var(--ifm-color-primary);
  }
  .bcard-title a {
    color: var(--ifm-color-primary);
    text-decoration: none;
  }
  .bcard-tagline {
    font-size: 0.95rem;
    color: #666;
    margin-top: 0.3rem;
  }
  [data-theme='dark'] .bcard-tagline {
    color: #aaa;
  }
  .bcard-prev {
    margin-top: 1.2rem;
    font-size: 0.85rem;
    color: #888;
    line-height: 1.7;
  }
  [data-theme='dark'] .bcard-prev {
    color: #999;
  }
  .bcard-prev-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 0.2rem;
    color: #aaa;
  }
  .bcard-projects {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    margin-top: 1.4rem;
    font-size: 0.9rem;
    line-height: 1.5;
  }
  .bcard-projects .bcard-project-name {
    font-weight: 600;
    color: var(--ifm-font-color-base);
  }
  .bcard-projects .bcard-project-desc {
    color: #666;
  }
  [data-theme='dark'] .bcard-projects .bcard-project-desc {
    color: #aaa;
  }
  .bcard-projects a {
    color: var(--ifm-color-primary);
    text-decoration: none;
    font-size: 0.85rem;
  }
  .bcard-projects a:hover {
    text-decoration: underline;
  }
  .bcard-social {
    display: flex;
    gap: 1.2rem;
    margin-top: 1.4rem;
    flex-wrap: wrap;
    justify-content: center;
  }
  .bcard-social a {
    color: var(--ifm-color-primary);
    text-decoration: none;
    font-size: 0.9rem;
  }
  .bcard-social a:hover {
    text-decoration: underline;
  }
  .bcard-contact {
    margin-top: 1rem;
    font-size: 0.85rem;
    color: #666;
    line-height: 1.8;
  }
  [data-theme='dark'] .bcard-contact {
    color: #aaa;
  }
  .bcard-contact a {
    color: var(--ifm-color-primary);
    text-decoration: none;
  }
  .bcard-contact a:hover {
    text-decoration: underline;
  }
  .bcard-divider {
    width: 60px;
    border: none;
    border-top: 2px solid var(--ifm-color-primary);
    margin: 6rem auto 1.5rem;
  }
  .bcard-lang-toggle {
    display: flex;
    gap: 0;
    margin-bottom: 1rem;
    border: 1px solid var(--ifm-color-primary);
    border-radius: 6px;
    overflow: hidden;
  }
  .bcard-lang-toggle button {
    padding: 0.3rem 1rem;
    border: none;
    background: transparent;
    color: var(--ifm-color-primary);
    cursor: pointer;
    font-size: 0.8rem;
    font-weight: 600;
  }
  .bcard-lang-toggle button.active {
    background: var(--ifm-color-primary);
    color: #fff;
  }
  .bcard-lang-cn { display: none; }
  .bcard-lang-en { display: block; }
  .markdown h1:first-child {
    display: none;
  }
  @media (max-width: 996px) {
    .navbar {
      display: none;
    }
    .theme-doc-breadcrumbs {
      display: none;
    }
    .theme-doc-toc-mobile {
      display: none;
    }
  }
`}</style>

import LangToggle from '@site/src/components/LangToggle';

<div className="bcard">
  <LangToggle />

  <img src="/img/herbert_avatar.jpg" alt="Herbert Yang" className="bcard-avatar" />
  <div className="bcard-lang-en"><div className="bcard-name">Herbert Yang</div></div>
  <div className="bcard-lang-cn"><div className="bcard-name">杨昆</div></div>

  <div className="bcard-lang-en">
    <div className="bcard-title">Founder, <a href="https://inturious.com?utm_source=businesscard&utm_medium=social&utm_campaign=hyx_about">Inturious Labs</a></div>
    <div className="bcard-tagline">Writer, Developer, Investor in AI + Web3</div>

    <div className="bcard-prev">
      <div className="bcard-prev-label">Previously</div>
      GM of Asia, <a href="https://dfinity.org">DFINITY Foundation</a><br/>
      Head of Startup/VC, <a href="https://aws.amazon.com">AWS</a> Greater China<br/>
      <a href="https://www.gsb.stanford.edu/">Stanford University, Graduate School of Business</a>
    </div>

    <div className="bcard-projects">
      <div className="bcard-prev-label">Newsletters</div>
      <div>
        <span className="bcard-project-name">The Sunday Blender</span><br/>
        <a href="https://weekly.sundayblender.com?utm_source=businesscard&utm_medium=social&utm_campaign=hyx_about"><span className="bcard-project-desc">The best weekly news for curious kids</span></a>
      </div>
      <div>
        <span className="bcard-project-name">Digital Sovereignty Chronicle</span><br/>
        <a href="https://digitalsovereignty.herbertyang.xyz/?utm_source=businesscard&utm_medium=social&utm_campaign=hyx_about"><span className="bcard-project-desc">Practical insights on AI, web3, and data sovereignty</span></a>
      </div>
      <div>
        <span className="bcard-project-name">Remnants of Globalization</span><br/>
        <a href="https://remnants.herbertyang.xyz?utm_source=businesscard&utm_medium=social&utm_campaign=hyx_about"><span className="bcard-project-desc">Anthology of humans of globalization</span></a>
      </div>
    </div>
  </div>

  <div className="bcard-lang-cn">
    <div className="bcard-title">创始人, <a href="https://inturious.com?utm_source=businesscard&utm_medium=social&utm_campaign=hyx_about">Inturious Labs</a></div>
    <div className="bcard-tagline">作者，开发者，投资人，AI + Web3</div>

    <div className="bcard-prev">
      <div className="bcard-prev-label">此前</div>
      亚太区总经理, <a href="https://dfinity.org">DFINITY 基金会</a><br/>
      初创企业/风险投资生态事业部总经理, <a href="https://aws.amazon.com">亚马逊云服务</a><br/>
      <a href="https://www.gsb.stanford.edu/">斯坦福大学商学院</a>
    </div>

    <div className="bcard-projects">
      <div className="bcard-prev-label">自媒体</div>
      <div>
        <span className="bcard-project-name">The Sunday Blender</span><br/>
        <a href="https://weekly.sundayblender.com?utm_source=businesscard&utm_medium=social&utm_campaign=hyx_about"><span className="bcard-project-desc">青少年学习英文，了解时事的最佳新闻周刊</span></a>
      </div>
      <div>
        <span className="bcard-project-name">Digital Sovereignty Chronicle</span><br/>
        <a href="https://digitalsovereignty.herbertyang.xyz/?utm_source=businesscard&utm_medium=social&utm_campaign=hyx_about"><span className="bcard-project-desc">AI, Web3与数字主权的实践洞察和前沿分享</span></a>
      </div>
      <div>
        <span className="bcard-project-name">Remnants of Globalization</span><br/>
        <a href="https://remnants.herbertyang.xyz?utm_source=businesscard&utm_medium=social&utm_campaign=hyx_about"><span className="bcard-project-desc">全球化潮起潮落中的人物故事</span></a>
      </div>
    </div>
  </div>

  <div className="bcard-social">
    <a href="https://x.com/herbertyang">X</a>
    <a href="https://github.com/zire">GitHub</a>
    <a href="https://www.linkedin.com/in/herbertyang/">LinkedIn</a>
    <a href="https://t.me/yangherbert">Telegram</a>
    <a href="https://herbertyang.xyz?utm_source=businesscard&utm_medium=social&utm_campaign=hyx_about">Blog</a>
  </div>

  <div className="bcard-contact">
    <a href="mailto:hello@herbertyang.xyz">hello@herbertyang.xyz</a><br/>
    <a href="https://inturious.com?utm_source=businesscard&utm_medium=social&utm_campaign=hyx_about">https://inturious.com</a>
  </div>
</div>

<hr className="bcard-divider" />

## Profile

Founder, Inturious Labs

- Linkedin: https://www.linkedin.com/in/herbertyang/
- Twitter: https://twitter.com/herbertyang
- Telegram: `@yangherbert`

## English Bio

Herbert Yang is a classically trained finance executive who also ships production code. He operates at the intersection of institutional finance, enterprise technology, and digital assets, with 25+ years of cross-border experience across the US, China, Singapore, Japan, and Europe. He is currently the founder of Inturious Labs, an AI-native development studio. Previously he was General Manager of Asia at DFINITY Foundation (creator of the Internet Computer Protocol, a layer-one blockchain), and before that Head of Startup & VC at AWS Greater China. Earlier in his career he served as CFO and CEO across Chinese TMT ventures (China Mobile's 12580 service, Zhang Yimou's Impression Series, Century Innovative Technology), was an early director at PE firm [Yunfeng Capital](https://www.yfc.cn), and was a finance executive and Corporate Auditor at GE.

## Chinese Bio

Herbert Yang，从传统金融一路走到AI与区块链前沿，既懂资本也写代码。25+年横跨中美的职业生涯覆盖机构金融、企业科技、数字资产三大领域。Herbert目前是AI开发工作室 Inturious Labs 的创始人。此前任 DFINITY 亚太和全球社区的总经理，负责构建互联网计算机 (Internet Computer) 的开发者生态系统并孵化Web3.0 区块链公司，加入 DFINITY 以前，Herbert领导云计算平台 AWS 大中华区 Startup 部门，在中港台搭建互联网初创企业生态体系，跟 VC/PE，加速器/孵化器合作，发掘助力未来的独角兽。Herbert 还曾担任中移动 "12580" 以及张艺谋"印象系列"的 CFO，香港鹰君集团旗下教育动画 IP "宝狄"系列的 CEO，硅谷服装大数据公司 Linkqlo 和移动社交网站北京群熠创想的创始人，以及云锋基金的董事。在转向创投圈以前，Herbert 在通用电气金融集团（GE Capital）旗下的亚洲，欧洲，美国部门负责数字化创新，财务分析和重建管理。Herbert 毕业于新加坡国立大学和斯坦福商学院。

## Professional Summary

Classically trained finance executive who also ships production code. Senior leader with 25+ years of cross-border experience across the US, China, Singapore, Japan, and Europe, spanning institutional finance (GE Capital, [Yunfeng Capital](https://www.yfc.cn)), enterprise technology (AWS Greater China), and digital assets (DFINITY).

**Executive track record:** GM of Asia at DFINITY Foundation (creator of the Internet Computer, a layer-one blockchain); Head of BD for Startup & VC at AWS Greater China; CEO of the ed-Tech subsidiary of HK-listed Great Eagle Holdings; Director at [Yunfeng Capital](https://www.yfc.cn) and CFO of a Yunfeng portfolio company; VP of Finance at a GE Capital healthcare financing business; Corporate Auditor at General Electric.

**Founder and investor experience:** 3x founder in TMT startups; 2x CFO of venture-backed startups; LP in Zhen Fund IV (representing an art foundation); alumnus of GGV Capital's OMEGA Accelerator.

MSx, Stanford University, Graduate School of Business. BBA, National University of Singapore. US passport holder with Chinese permanent residency.

## Core Competencies

- AI + Blockchain Infrastructure & Digital Asset Strategy
- Budgeting, Fund-Raising & Financial Oversight
- Keynote Speaking & Panel Moderation
- Venture Capital, Startup Ecosystem & Strategic Partnership Development

## Professional Experience

### [Inturious Labs](https://inturious.com?utm_source=resume&utm_medium=web&utm_campaign=hy_about) | Founder

An AI-native development studio building applications for content creators and financial investors

- Dec 2025 – Present | Shanghai, China
- Publish two newsletters: [*The Sunday Blender*](https://weekly.sundayblender.com?utm_source=resume&utm_medium=web&utm_campaign=hy_about), an AI-enabled English weekly news aggregator for teenage readers, and [*Digital Sovereignty Chronicle*](https://digitalsovereignty.herbertyang.xyz/?utm_source=resume&utm_medium=web&utm_campaign=hy_about), sharing front-row insight on AI, crypto & Web3
- Lead a stealth crypto fund as general partner, incubating early-stage startups of on-chain DeFi protocols
- Build the frontend of a stealth on-chain investment tool for managing and rebalancing digital assets
- Advise CMAA (The Chinese Modern Art Archive) on monetization of its digital archive database

### [DFINITY Foundation](https://dfinity.org) | General Manager of Asia

A Switzerland-based developer lab that develops the [Internet Computer Protocol (ICP)](https://internetcomputer.org), a top-10 layer-one blockchain

- Jul 2021 – Nov 2025 | Shanghai, China
- Deployed developer grants to 200+ early-stage crypto projects in Asia across DeFi, BTC, social, gaming, AI, and tooling that contributed 40% of global decentralized apps in the ICP ecosystem
- Delivered 100+ keynotes and panel sessions at industry events across Asia/US/Europe, in both English and Chinese, to audiences of developers, media, investors, enterprises, and government officials
- Trained and certified 500+ ICP developers through online coursework, offline workshops, and hackathons via partnerships with leading Chinese crypto developer communities across Asia
- Established ICP as a top-10 layer-one blockchain in Asia through strategic partnerships with major Ethereum investors (Wanxiang, Hashkey & Fenbushi) and crypto exchanges (Huobi & LBank)
- Engaged government agencies and officials across Mainland China, Hong Kong, Singapore, Thailand, and Japan on building crypto infrastructure and exploring integration with traditional fintech

### [Amazon Web Services (AWS)](https://aws.amazon.com) | Head of BD for Startup/VC, Greater China

AWS is the largest cloud computing service provider in the world, with $130B annual revenue

- Jun 2018 – Jun 2021 | Shanghai, China
- Onboarded 2,000+ high-potential Pre-A/Series-A teams into AWS's startup ecosystem annually, deploying a $50M budget of activation/migration credits and connecting founders with technical resources, investors, global GTM channels, and the broader pan-Amazon network
- Drove AWS's penetration rate among Tier-1 VC firms in their startup portfolios from 10% to 35% by embedding AWS's services into their post-investment marketing and technical support
- Spearheaded week-long bootcamp initiatives to discover startups in AI, autonomous driving, healthcare, and smart manufacturing through partnerships with prominent VCs and leading enterprises
- Championed crypto as a new hot segment among all AWS global BU leaders by sponsoring Wanxiang Blockchain Group's 2018 Shanghai Blockchain Summit and Scaling Bitcoin 2018 in Tokyo
- Localized global HQ's startup strategy in Mainland China, Hong Kong, and Taiwan by helping Y Combinator to land in China and integrating China's unique startup ecosystem into the global playbook

### Century Innovative Technology | CEO

An ed-Tech startup that developed top-rated English learning apps and popular TV series for preschool kids

- 2017 – 2018 | Hong Kong, China
- Refocused the company from entertainment to online education by eliminating 3 non-core divisions, cutting product offerings from 14 to 3, and slashing base cost by 75%
- Launched Hello Bodhi, a preschool English learning app spanning 24 modules, 100 lessons, and 160 mini-games, featured on China's 360 Store
- Led the KFC x Bodhi marketing campaign, distributing 2 million Bodhi picture books through +4,000 KFC stores in China

### Impression Wonders | Director & CFO

A leading live performance company backed by [Yunfeng Capital](https://www.yfc.cn), with top-rated shows in popular tourism destinations

- 2010 – 2012 | Beijing
- Led the capital restructuring from an offshore red-chip vehicle to a domestic Chinese listing, unwinding the US-listing pathway and rebuilding a mirroring onshore shareholding to preserve investor positions
- Built disciplined cash flow management processes that supported growth to 4.5 million annual visitors and RMB 1.4 billion ticket sales
- Optimized capital structure through a US$10 million share repurchase program, driving a 3x increase in return on assets

### Beijing UMessage Technology | CFO

Then China's largest lifestyle mobile service provider, operating China Mobile's nationwide "12580" service

- 2008 – 2009 | Beijing
- Closed the Series B round, securing RMB 250 million from CDH, Northern Light, and CBC Fund
- Built the financial infrastructure that supported explosive growth from zero to 100+ million users across 334 cities and RMB 500 million in revenue
- Designed and rolled out a performance-appraisal system with sales incentives and KPI allocation across 1,500 employees in 12 departments
- Designed and executed the Employee Share Ownership Program (ESOP) for 50+ key employees, aligning long-term incentives with shareholder interests

### Startup Experiences

- 2010 – 2017 | Palo Alto, CA & Beijing, China
- **Linkqlo Inc** (Palo Alto, 2014-2017) – Founder and CEO of a fit-tech startup using body-size data to match users with better-fitting clothes; raised US$1M angel funding, launched two apps on the App Store; and built a 10-person team across product, engineering, and marketing
- **Beijing Galaxy Idea Technology** (Beijing, 2010-2012) – Co-founder and angel investor in one of China's earliest mobile app development studios, producing location-based lifestyle apps, backed by Xu Xiaoping of Zhen Fund and acquired by Renren Inc (NYSE: RENN)
- **Dragon Dreams Animation Studio** (Palo Alto, 2012-2013) – Co-founder and COO of a Chinese animation film studio producing family-friendly, Pixar-styled films, negotiated distribution channels for 4 feature projects

### GE Capital | VP of Finance, HPSC, GE Commercial Finance

GE Capital, a subsidiary of General Electric, was then one of the largest financial conglomerates in the world

- 2004 - 2007 | Boston, MA
- Established GE-standard financial planning and analysis processes, embedding disciplined forecasting, clear accountability, and transparent performance review
- Partnered with the sales team to launch a new refinance product, lifting new-business margin by 12% and adding US$2 million in net income
- Implemented segmentation-based pricing that raised income by US$2 million and reduced customer acquisition cost by 20%
- Led a cost-reduction initiative across 15 department heads, cutting operating costs by 5-15% and delivering US$1 million in annual savings

### General Electric ("GE") | Senior Associate => Corporate Auditor

GE, before its 2024 restructuring, was one of the largest industrial and financial conglomerates in the world and a Fortune 10 company

- 2002 - 2004 | Singapore, Tokyo, Munich, Shanghai, Florence, Chicago, Connecticut
- Completed 10 rotations across finance and operations in the US, Europe, and Asia through the Financial Management Program and Corporate Audit Staff – GE's two flagship finance leadership programs
- Identified US$16 million in net income recovery through financial audits of 14 GE divisions across 11 industries and 8 countries
- Led development of GE Asia's online letters-of-credit system, later scaled into GE's global portal, processing US$10 billion in applications annually
- Built the financial model and pricing plan for an internal task force that launched one of the first online insurance marketplaces, securing US$2 million in funding from GE Capital

## Education

- **[Stanford University, Graduate School of Business](https://www.gsb.stanford.edu/programs/msx)**, Master of Science (MSx), 2012–2013
- **[National University of Singapore](https://nus.edu.sg)**, Bachelor of Business Administration, 1995–1999

## Additional

- **Citizenship & Residency:** US passport holder with Chinese permanent residency
- **Languages:** English (fluent), Mandarin Chinese (native)
- **Technical Fluency:** Hands-on across AI-native software development, smart contracts, and DeFi
- **Interests:** cycling, badminton
