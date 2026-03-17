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

Herbert Yang is a serial entrepreneur and business leader of growth and innovation. He leads DFINITY's Asia operations & Global Community to grow the developer ecosystem for the Internet Computer and incubate disruptive Web3 startups. Before DFINITY, he headed the startup business for AWS Greater China, working with VC investors, PE firms, accelerators, incubators, and communities to build startup ecosystem across China, Hong Kong, and Taiwan. Previously Herbert was CFO of China Mobile's "12580" service and Zhang Yimou's "Impression Series" in Beijing, Deputy-Secretary for Wu Zuoren International Foundation of Fine Arts, CEO of ed-Tech startup Century Innovative Technology in Hong Kong, and founder CEO of fit-tech startup Linkqlo in Palo Alto. He was also an early member and director of PE firm Yunfeng Capital. Prior to startup and investment, Herbert was a finance executive in GE Capital leading digital innovation initiatives and driving turn-around transformation in Singapore, Tokyo, Munich, Florence, and Boston. Herbert earned MS degree (Sloan Fellow) from Graduate School of Business of Stanford University and BBA from National University of Singapore.

## Chinese Bio

Herbert Yang, 中美连续创业者，二十多年来在TMT跨国企业，投资公司和初创公司里有丰富的管理经验。Herbert现在是DFINITY亚太和全球社区的GM，负责构建互联网计算机 (Internet Computer) 的开发者生态系统并孵化Web 3.0区块链公司，加入DFINITY以前，Herbert领导云计算平台AWS大中华区Startup部门，在中港台搭建互联网初创企业生态体系，跟VC/PE，加速器/孵化器合作，发掘助力未来的独角兽。Herbert还曾担任中移动"12580"以及张艺谋"印象系列"的CFO，香港鹰君集团旗下教育动画IP"宝狄"系列的CEO，硅谷服装大数据公司Linkqlo和移动社交网站北京群熠创想的创始人，以及云锋基金的董事。在转向创投圈以前，Herbert在通用电气金融集团（GE Capital）旗下的亚洲，欧洲，美国部门负责数字化创新，财务分析和重建管理。Herbert毕业于新加坡国立大学和斯坦福商学院。

## Contact

Please drop me a DM on:

- [Twitter](https://twitter.com/herbertyang), `@herbertyang`
- [Telegram](https://telegram.org/), `@yangherbert`
- [Linkedin](https://www.linkedin.com/in/herbertyang/), `@herbertyang`
- [OpenChat](https://oc.app/), `@herbert`, or join via this [invite code](https://oc.app/?ref=inda5-hyaaa-aaaaf-aaioq-cai)
- [DSCVR](https://dscvr.one/u/herbertyang), `@herbertyang`
- [distrikt](https://distrikt.app/), `@herbert.yang`

## Full Resume

### DFINITY

#### GM of Asia

- Jul 2021 - Present, Shanghai, China

### Amazon Web Services

#### Head of Business Development for VC/Startup, Greater China

- Jun 2018 - Jun 2021, Shanghai, China
- Built startup ecosystem for AWS in China/Hong Kong/Taiwan and accelerate growth for future unicorns, partnering with VCs, accelerators, incubators, startup organizations, and working with startup founders and entrepreneurs to find, acquire, and enable early-stage startups through programs and connecting to pan-AWS/Amazon network and resources.

### Wu Zuoren International Foundation of Fine Arts ("WIFA")

#### Deputy Secretary General

- Jan 2010 - May 2018
- (WIFA) China's largest and most influential private art foundation that advances contemporary art development, art education, and art exchange between China and the world
- 吴作人国际美术基金会是中国最有影响力的私人艺术基金会，致力于推动当代艺术的发展，艺术教育和中西方艺术交流
- Negotiated a lucrative licensing partnership with China Minsheng Bank and Shanghai Government to convert French Pavilion of 2010 Shanghai Expo into an art museum
- Organized "2010 Beijing Global Forum of Art Foundations" which received 50+ representatives from leading international art foundations and 300+ art practitioners

### Century Innovative Technology Limited (香港世纪创意)

#### CEO

- Jul 2017 - Jan 2018, Hong Kong, China
- A preschool edutainment startup that develops top-rated Hello Bodhi English learning app, premium English learning content and popular Bodhi & Friends TV series on CCTV
- 深圳世纪创意是一家以"智慧成就梦想"为宗旨的动漫制作和发行公司。公司成立于2012年，团队拥有广阔的国际化视野和丰富的渠道推广和品牌运营经验，创立了制作精良，广受好评的"宝狄与好友"3D动漫品牌, 在央视和五大卡通卫视已播出四季156集1700多分钟，是跨国品牌美泰（Mattel）和学乐（Scholastic）在亚太区的独家动漫合作伙伴。
- Reset strategic focus from entertainment to online education by eliminating 3 non-core divisions, cutting products from 14 to 3 and slashing base cost by 75%
- Launched Hello Bodhi (会英语的宝狄), a preschool English education app of more than 24 modules, 100 lessons and 160 mini-games that was featured on 360 Store
- Oversaw the successful marketing campaign of KFC x Bodhi in Dec 2017 where 2 million Bodhi picture books were sold through +4,000 KFC stores across China

### Linkqlo Inc

#### Founder CEO

- Jan 2014 - Jun 2017, Palo Alto, CA, USA
- Linkqlo is a fashion retail big data startup that develops innovative Body Match Score ("BMS") algorithm to collect consumer body size data to find better fitting clothes
- Raised US$1 million from angel investors, built and managed a global engineering team of 10 developers from 3 countries and a local marketing team in California of 3
- Developed an innovative Body Match Score algorithm ("BMS") with the most complete body dataset of 14 measurements to match users of different body sizes
- Launched Linkqlo app (social network) and Mirror Mirror app (game) with image-based AI neural network to collect consumer body size data and style preferences
- Coded 12,000 lines for Mirror Mirror's iOS client using JavaScript-based React Native framework and managed end-to-end app shipping process in Xcode

### Yunfeng Capital ("云锋基金")

#### Director & Portfolio CFO

- YunFeng Capital (云锋基金) is one of the largest PE firms in China that was founded by Jack Ma and David Yu in 2010. It led the Series B investment of Impression Wonders Arts Development Company that produced 张艺谋"印象"系列 - China's most successful art performance company, founded by Zhang Yimou with RMB 1.4 billion ticket sales from 6 top-rated shows that was later sold to Sanxiang (SZ: 000863)
- 中国最成功的实景演出艺术制作公司，由著名导演张艺谋，王潮歌，樊跃创立，由马云和虞锋创立的云锋基金和熊晓鸽的IDG基金投资的"印象系列"，制作了印象刘三姐，印象雪山，印象西湖，印象海南岛，印象大红袍，印象普陀。
- CFO of Yunfeng Capital's first lead investment portfolio company Impression Wonders
- Formulated A-share IPO strategy with a two-year time table and roadmap, and removed barrier to domestic listing by dismantling the legacy offshore VIE structure
- Installed disciplined and robust cash flow management processes that supported rapid growth to 4.5 million annual visitors and RMB 1.4 billion ticket sales
- Optimized capital structure by devising and executing a successful US$10 million share repurchase program that led to 3-fold increase of return on assets
- Formed JV partnership with Zhoushan government to secure total investment of RMB 200 million for "Impression Putuo" that became a top attraction on Putuo Island

### Beijing Galaxy Idea Technology Limited (北京群熠创想)

#### Cofounder & Angel Investor

- 2010 - 2012, Beijing, China
- One of China's earliest app development studios developing location-based life style apps that was backed by Xu Xiaoping and later sold to Renren Inc (NYSE: RENN)
- 由徐小平个人投资的北京群熠创想，是中国最早开发移动app的团队之一，基于LBS等技术，发布了"这里"、app汇、左小祖咒等多个app，曾打入过苹果应用商店中国区生活服务前15名，后被人人网（NYSE: RENN）收购。

### Beijing UMessage Information Technologies (北京无限讯奇/中移动"12580")

#### CFO

- Jan 2008 - Nov 2009, Beijing, China
- China's then largest life style mobile service provider that operated China Mobile's nation-wide "12580" service with RMB 500 million revenue and later sold to Goldtech Investment
- 北京无限讯奇曾经是中国最大的本地生活信息移动服务商，负责承运中国移动覆盖全国的"12580"业务，涵盖334个地级市，拥有过亿用户和多项本地生活信息服务
- Managed the successful Series B funding that brought in three top VC firms: CDH, Northern Light and CBC Fund with RMB 250 million investment
- Built a sustainable and agile financial infrastructure that supported explosive business growth from zero to 100+ million users in 334 cities and RMB 500 million revenue
- Designed and launched a comprehensive performance-appraisal system with sales incentive scheme and KPI allocation for 1,500 employees in 12 departments
- Devised Employee Share Ownership Program (ESOP) and executed it with 50+ key employees to kick start the effort of building a highly motivated team with shared goal

### GE Capital

#### Vice President of Finance of HPSC, GE Commercial Finance

- Mar 2004 - Aug 2007, Boston, MA, USA
- GE CAPITAL, HEALTHCARE FINANCIAL SERVICES, HPSC
- HPSC was a newly acquired high-growth healthcare equipment financing provider with US$1.5 billion in assets and 15% return on equity
- VP of Finance (2005 - 2007), Finance Manager for Planning and Analysis (2004 - 2005)
- Instilled GE's result-oriented culture by establishing world-class financial processes in planning and analysis to promote unyielding integrity, accountability and inclusiveness
- Collaborated with sales team to launch a new refinance product that Increased new business margin by 12% and led to additional US$2 million net income
- Adopted segmentation-based pricing strategy to achieve additional US$2 million income and lower user acquisition cost by 20%
- Spearheaded a cost-cutting initiative and convinced 15 department heads to reduce their operating costs by 5~15%, resulting in US$1 million savings

### General Electric ("GE")

#### Senior Associate, Corporate Audit Staff ("CAS")

- Jan 2002 - Feb 2004, US, Europe
- Corporate Audit Staff ("CAS") is GE's global leadership program with 350 corporate auditors from 50+ countries
- Identified and corrected operational issues totaling US$16 million net income by performing financial reviews on 14 GE divisions in 11 industries and 8 countries

#### Financial Analyst, Financial Management Program ("FMP")

- Jul 1999 - Dec 2001, Singapore, Tokyo
- Financial Management Program ("FMP") is GE's two-year finance management trainee program with 100+ years of history
- Led the development of an online system to issue letter of credit for GE Asia, which later became GE's global portal processing applications of US $10 billion per year
- Developed financial model and pricing plan in a taskforce team that created one of the first online marketplaces to sell insurance and received US$2 million funding from HQ

### Education

#### Stanford University Graduate School of Business

- Master of Science ("Sloan Fellow") in Business Management, 2012 - 2013
- Produced and directed the most successful flash mob (Gangnam Style) in Stanford history on Oct 12, 2012 with coverage by CNN. Orchestrated the marketing campaign to promote the dance video that became a viral hit and went on to gather half a million hits on Youtube and other sites.
- Led the unprecedented half-time show performance by GSB Sloan students during Stanford Men's NCAA Basketball Game in Maples Pavilion on Nov 12, 2012
- Co-founded a rock band for Sloan Class of 2013 - The Spillovers and managed its multiple public performances
- Emceed the Chinese New Year Gala for Sloan Class of 2013, which broke the attendance record of Sloan's social events with 180 attendees.

#### National University of Singapore

- Bachelor of Business Administration ("BBA"), Finance, 1995 - 1999
- Awarded full merit-based undergraduate scholarship by Singapore's Ministry of Education
- Led the publicity efforts for APXLDS (Asia Pacific Exchange cum Leadership Development Seminar) '97 that received 350 participants from 17 countries, for AIESEC
