export interface Company {
  name: string;
  website: string;
  industry: string;
  country: string;
  description: string;
}

export const companies: Company[] = [
  // ── Technology – United States ──
  {
    name: "Apple",
    website: "https://apple.com",
    industry: "Technology",
    country: "United States",
    description:
      "Designs and sells consumer electronics, software, and services including iPhone, Mac, iPad, and the App Store ecosystem.",
  },
  {
    name: "Google",
    website: "https://google.com",
    industry: "Technology",
    country: "United States",
    description:
      "World's largest search engine and digital advertising platform, also developing cloud computing, AI, and hardware products.",
  },
  {
    name: "Microsoft",
    website: "https://microsoft.com",
    industry: "Technology",
    country: "United States",
    description:
      "Global leader in software, cloud services (Azure), productivity tools (Office 365), and enterprise solutions.",
  },
  {
    name: "Amazon",
    website: "https://amazon.com",
    industry: "Technology",
    country: "United States",
    description:
      "E-commerce giant and cloud computing leader through AWS, also operating in streaming, logistics, and smart devices.",
  },
  {
    name: "Meta",
    website: "https://meta.com",
    industry: "Technology",
    country: "United States",
    description:
      "Owns Facebook, Instagram, and WhatsApp; pioneering virtual and augmented reality through its metaverse initiatives.",
  },
  {
    name: "Tesla",
    website: "https://tesla.com",
    industry: "Automotive",
    country: "United States",
    description:
      "Leading electric vehicle manufacturer and clean energy company, also developing autonomous driving and energy storage.",
  },
  {
    name: "Netflix",
    website: "https://netflix.com",
    industry: "Media",
    country: "United States",
    description:
      "World's largest streaming platform with over 230 million subscribers, producing and distributing films and TV shows globally.",
  },
  {
    name: "Spotify",
    website: "https://spotify.com",
    industry: "Media",
    country: "Sweden",
    description:
      "World's largest music streaming service with over 600 million users, offering podcasts and audio content.",
  },
  {
    name: "Salesforce",
    website: "https://salesforce.com",
    industry: "Technology",
    country: "United States",
    description:
      "Leading cloud-based CRM platform enabling businesses to manage customer relationships, sales, and marketing.",
  },
  {
    name: "Oracle",
    website: "https://oracle.com",
    industry: "Technology",
    country: "United States",
    description:
      "Enterprise software and cloud solutions provider specializing in databases, ERP, and business applications.",
  },
  {
    name: "IBM",
    website: "https://ibm.com",
    industry: "Technology",
    country: "United States",
    description:
      "Technology and consulting firm focused on hybrid cloud, AI (Watson), quantum computing, and enterprise IT services.",
  },
  {
    name: "Intel",
    website: "https://intel.com",
    industry: "Technology",
    country: "United States",
    description:
      "World's largest semiconductor chip maker, manufacturing processors for PCs, servers, and data centers.",
  },
  {
    name: "NVIDIA",
    website: "https://nvidia.com",
    industry: "Technology",
    country: "United States",
    description:
      "Leading GPU manufacturer powering AI, data centers, gaming, and autonomous vehicles with cutting-edge chip technology.",
  },
  {
    name: "Qualcomm",
    website: "https://qualcomm.com",
    industry: "Technology",
    country: "United States",
    description:
      "Semiconductor and wireless technology company, designing Snapdragon chips for smartphones and connected devices.",
  },
  {
    name: "Adobe",
    website: "https://adobe.com",
    industry: "Technology",
    country: "United States",
    description:
      "Creative software leader offering Photoshop, Premiere, Illustrator, and cloud-based document and digital experience tools.",
  },
  {
    name: "Airbnb",
    website: "https://airbnb.com",
    industry: "Technology",
    country: "United States",
    description:
      "Online marketplace for short-term home rentals and experiences, connecting hosts with travelers in 220+ countries.",
  },
  {
    name: "Uber",
    website: "https://uber.com",
    industry: "Technology",
    country: "United States",
    description:
      "Ride-hailing and delivery platform operating in 70+ countries, also offering freight and autonomous vehicle R&D.",
  },
  {
    name: "Lyft",
    website: "https://lyft.com",
    industry: "Technology",
    country: "United States",
    description:
      "US-based ride-sharing platform offering car rides, bikes, and scooters across North American cities.",
  },
  {
    name: "Twitter/X",
    website: "https://x.com",
    industry: "Technology",
    country: "United States",
    description:
      "Social media and microblogging platform rebranded as X, serving as a real-time news and communication network.",
  },
  {
    name: "Snap",
    website: "https://snap.com",
    industry: "Technology",
    country: "United States",
    description:
      "Creator of Snapchat, a camera and messaging app focused on augmented reality and ephemeral content.",
  },
  {
    name: "Pinterest",
    website: "https://pinterest.com",
    industry: "Technology",
    country: "United States",
    description:
      "Visual discovery platform helping users find inspiration for projects, fashion, home decor, and recipes.",
  },
  {
    name: "Zoom",
    website: "https://zoom.us",
    industry: "Technology",
    country: "United States",
    description:
      "Video communications platform widely adopted for remote work, education, and virtual collaboration.",
  },
  {
    name: "Slack",
    website: "https://slack.com",
    industry: "Technology",
    country: "United States",
    description:
      "Business messaging and collaboration platform owned by Salesforce, enabling team communication and workflow integration.",
  },
  {
    name: "Dropbox",
    website: "https://dropbox.com",
    industry: "Technology",
    country: "United States",
    description:
      "Cloud storage and file-sharing service for individuals and teams, offering document collaboration tools.",
  },
  {
    name: "Stripe",
    website: "https://stripe.com",
    industry: "Finance",
    country: "United States",
    description:
      "Online payment processing infrastructure for internet businesses, providing APIs for accepting and managing payments.",
  },
  {
    name: "Square",
    website: "https://squareup.com",
    industry: "Finance",
    country: "United States",
    description:
      "Financial services company (Block) offering point-of-sale hardware, payment processing, and small business tools.",
  },
  {
    name: "PayPal",
    website: "https://paypal.com",
    industry: "Finance",
    country: "United States",
    description:
      "Global online payments system enabling secure money transfers, online purchases, and digital wallets.",
  },
  {
    name: "Coinbase",
    website: "https://coinbase.com",
    industry: "Finance",
    country: "United States",
    description:
      "Leading US cryptocurrency exchange platform for buying, selling, and storing digital currencies.",
  },
  {
    name: "Palantir",
    website: "https://palantir.com",
    industry: "Technology",
    country: "United States",
    description:
      "Big data analytics and intelligence platform serving government agencies and enterprise clients worldwide.",
  },
  {
    name: "ServiceNow",
    website: "https://servicenow.com",
    industry: "Technology",
    country: "United States",
    description:
      "Cloud-based platform for IT service management, automating enterprise workflows and digital business operations.",
  },
  {
    name: "Workday",
    website: "https://workday.com",
    industry: "Technology",
    country: "United States",
    description:
      "Cloud-based enterprise HR, finance, and planning software for large organizations and government entities.",
  },
  {
    name: "Snowflake",
    website: "https://snowflake.com",
    industry: "Technology",
    country: "United States",
    description:
      "Cloud data platform enabling data warehousing, data lakes, and secure data sharing across organizations.",
  },
  {
    name: "Databricks",
    website: "https://databricks.com",
    industry: "Technology",
    country: "United States",
    description:
      "Data and AI company providing a unified analytics platform built on Apache Spark for machine learning and analytics.",
  },
  {
    name: "Cloudflare",
    website: "https://cloudflare.com",
    industry: "Technology",
    country: "United States",
    description:
      "Cloud network platform offering content delivery, cybersecurity, and internet performance optimization services.",
  },
  {
    name: "Twilio",
    website: "https://twilio.com",
    industry: "Technology",
    country: "United States",
    description:
      "Cloud communications platform providing APIs for SMS, voice, video, and email integration in applications.",
  },
  {
    name: "HubSpot",
    website: "https://hubspot.com",
    industry: "Technology",
    country: "United States",
    description:
      "Inbound marketing and CRM platform with tools for marketing, sales, content management, and customer service.",
  },
  {
    name: "Atlassian",
    website: "https://atlassian.com",
    industry: "Technology",
    country: "Australia",
    description:
      "Team collaboration software company behind Jira, Confluence, Trello, and Bitbucket for software development teams.",
  },
  {
    name: "GitHub",
    website: "https://github.com",
    industry: "Technology",
    country: "United States",
    description:
      "World's largest code hosting platform owned by Microsoft, enabling software version control and developer collaboration.",
  },
  {
    name: "HashiCorp",
    website: "https://hashicorp.com",
    industry: "Technology",
    country: "United States",
    description:
      "Infrastructure automation company known for Terraform, Vault, Consul, and Nomad for cloud and DevOps workflows.",
  },
  {
    name: "Datadog",
    website: "https://datadoghq.com",
    industry: "Technology",
    country: "United States",
    description:
      "Cloud monitoring and observability platform for infrastructure, applications, and security analytics.",
  },
  {
    name: "Splunk",
    website: "https://splunk.com",
    industry: "Technology",
    country: "United States",
    description:
      "Data platform for security information, IT operations, and business analytics powered by machine data.",
  },
  {
    name: "Palo Alto Networks",
    website: "https://paloaltonetworks.com",
    industry: "Technology",
    country: "United States",
    description:
      "Cybersecurity leader providing network, cloud, and endpoint protection through AI-powered security platforms.",
  },
  {
    name: "CrowdStrike",
    website: "https://crowdstrike.com",
    industry: "Technology",
    country: "United States",
    description:
      "Cloud-delivered endpoint protection and cybersecurity company using AI to detect and prevent cyber threats.",
  },
  {
    name: "Okta",
    website: "https://okta.com",
    industry: "Technology",
    country: "United States",
    description:
      "Identity and access management platform providing single sign-on, multi-factor authentication, and lifecycle management.",
  },
  {
    name: "Veeva Systems",
    website: "https://veeva.com",
    industry: "Technology",
    country: "United States",
    description:
      "Cloud software for the life sciences industry covering CRM, content management, and regulatory compliance.",
  },
  {
    name: "Intuit",
    website: "https://intuit.com",
    industry: "Technology",
    country: "United States",
    description:
      "Financial software company behind QuickBooks, TurboTax, and Mint for small businesses and individual tax filers.",
  },
  {
    name: "Autodesk",
    website: "https://autodesk.com",
    industry: "Technology",
    country: "United States",
    description:
      "Design and engineering software for architecture, construction, manufacturing, and entertainment industries.",
  },
  {
    name: "Cadence Design Systems",
    website: "https://cadence.com",
    industry: "Technology",
    country: "United States",
    description:
      "EDA software and hardware for semiconductor and electronics design, verification, and manufacturing.",
  },
  {
    name: "Synopsys",
    website: "https://synopsys.com",
    industry: "Technology",
    country: "United States",
    description:
      "Electronic design automation tools and semiconductor IP for chip design and software security testing.",
  },
  {
    name: "Fortinet",
    website: "https://fortinet.com",
    industry: "Technology",
    country: "United States",
    description:
      "Cybersecurity company offering integrated security solutions including firewalls, VPNs, and endpoint protection.",
  },
  {
    name: "Zscaler",
    website: "https://zscaler.com",
    industry: "Technology",
    country: "United States",
    description:
      "Cloud-native security platform delivering zero-trust network access and secure internet connectivity.",
  },
  {
    name: "MongoDB",
    website: "https://mongodb.com",
    industry: "Technology",
    country: "United States",
    description:
      "NoSQL document database platform for modern applications, offering managed cloud service through MongoDB Atlas.",
  },
  {
    name: "Redis",
    website: "https://redis.io",
    industry: "Technology",
    country: "United States",
    description:
      "In-memory data structure store used as a database, cache, and message broker for high-performance applications.",
  },
  {
    name: "Elastic",
    website: "https://elastic.co",
    industry: "Technology",
    country: "United States",
    description:
      "Search and observability company offering Elasticsearch for log analytics, security, and enterprise search.",
  },
  {
    name: "Confluent",
    website: "https://confluent.io",
    industry: "Technology",
    country: "United States",
    description:
      "Data streaming platform built on Apache Kafka for real-time data pipelines and event-driven architectures.",
  },
  {
    name: "Robinhood",
    website: "https://robinhood.com",
    industry: "Finance",
    country: "United States",
    description:
      "Commission-free investing app enabling retail investors to trade stocks, ETFs, options, and cryptocurrencies.",
  },
  {
    name: "Affirm",
    website: "https://affirm.com",
    industry: "Finance",
    country: "United States",
    description:
      "Buy now, pay later fintech platform offering flexible installment payment plans for online and in-store purchases.",
  },
  {
    name: "Plaid",
    website: "https://plaid.com",
    industry: "Finance",
    country: "United States",
    description:
      "Financial data network connecting consumer bank accounts to fintech apps and financial services.",
  },
  {
    name: "Brex",
    website: "https://brex.com",
    industry: "Finance",
    country: "United States",
    description:
      "Corporate cards and spend management platform designed for startups and high-growth businesses.",
  },

  // ── Technology – Asia ──
  {
    name: "Samsung",
    website: "https://samsung.com",
    industry: "Technology",
    country: "South Korea",
    description:
      "World's largest smartphone and semiconductor manufacturer, producing displays, appliances, and memory chips.",
  },
  {
    name: "Sony",
    website: "https://sony.com",
    industry: "Technology",
    country: "Japan",
    description:
      "Multinational conglomerate in electronics, gaming (PlayStation), music, film, and financial services.",
  },
  {
    name: "Panasonic",
    website: "https://panasonic.net",
    industry: "Technology",
    country: "Japan",
    description:
      "Japanese electronics manufacturer producing batteries, home appliances, automotive systems, and B2B solutions.",
  },
  {
    name: "Nintendo",
    website: "https://nintendo.com",
    industry: "Technology",
    country: "Japan",
    description:
      "Video game company behind iconic franchises (Mario, Zelda, Pokemon) and the Nintendo Switch gaming console.",
  },
  {
    name: "Alibaba",
    website: "https://alibaba.com",
    industry: "Technology",
    country: "China",
    description:
      "China's largest e-commerce and cloud computing company, operating Taobao, Tmall, and Alibaba Cloud.",
  },
  {
    name: "Tencent",
    website: "https://tencent.com",
    industry: "Technology",
    country: "China",
    description:
      "Chinese tech giant behind WeChat, QQ, and major investments in gaming, fintech, and social media.",
  },
  {
    name: "Baidu",
    website: "https://baidu.com",
    industry: "Technology",
    country: "China",
    description:
      "China's dominant search engine and AI company, also developing autonomous driving and cloud services.",
  },
  {
    name: "Huawei",
    website: "https://huawei.com",
    industry: "Technology",
    country: "China",
    description:
      "Global telecom equipment and smartphone manufacturer, leading in 5G infrastructure and enterprise networking.",
  },
  {
    name: "Xiaomi",
    website: "https://xiaomi.com",
    industry: "Technology",
    country: "China",
    description:
      "Consumer electronics company offering smartphones, smart home devices, and IoT products at competitive prices.",
  },
  {
    name: "ByteDance",
    website: "https://bytedance.com",
    industry: "Technology",
    country: "China",
    description:
      "Internet technology company behind TikTok and Douyin, with AI-driven content recommendation at its core.",
  },
  {
    name: "JD.com",
    website: "https://jd.com",
    industry: "Retail",
    country: "China",
    description:
      "China's second-largest e-commerce platform with a focus on electronics, logistics, and healthcare.",
  },
  {
    name: "Meituan",
    website: "https://meituan.com",
    industry: "Technology",
    country: "China",
    description:
      "Chinese on-demand services platform for food delivery, hotel booking, and local consumer services.",
  },
  {
    name: "NetEase",
    website: "https://netease.com",
    industry: "Technology",
    country: "China",
    description:
      "Chinese internet company in gaming, education, music streaming, and cloud email services.",
  },
  {
    name: "DJI",
    website: "https://dji.com",
    industry: "Technology",
    country: "China",
    description:
      "World's largest drone manufacturer supplying consumer, professional, and agricultural unmanned aerial vehicles.",
  },
  {
    name: "Infosys",
    website: "https://infosys.com",
    industry: "Technology",
    country: "India",
    description:
      "Global IT services and consulting firm providing digital transformation, cloud, and outsourcing solutions.",
  },
  {
    name: "Wipro",
    website: "https://wipro.com",
    industry: "Technology",
    country: "India",
    description:
      "IT services, consulting, and business process outsourcing company serving clients in 66+ countries.",
  },
  {
    name: "Tata Consultancy Services",
    website: "https://tcs.com",
    industry: "Technology",
    country: "India",
    description:
      "India's largest IT services company providing consulting, digital, cloud, and enterprise solutions globally.",
  },
  {
    name: "HCL Technologies",
    website: "https://hcltech.com",
    industry: "Technology",
    country: "India",
    description:
      "Global technology company offering IT and business process services including cloud, security, and engineering.",
  },
  {
    name: "Fujitsu",
    website: "https://fujitsu.com",
    industry: "Technology",
    country: "Japan",
    description:
      "Japanese IT services and solutions company specializing in computing, networking, and digital transformation.",
  },
  {
    name: "Hitachi",
    website: "https://hitachi.com",
    industry: "Technology",
    country: "Japan",
    description:
      "Diversified technology corporation spanning IT, infrastructure, construction machinery, and social innovation.",
  },
  {
    name: "NEC",
    website: "https://nec.com",
    industry: "Technology",
    country: "Japan",
    description:
      "Japanese IT and electronics firm known for biometric authentication, AI, and telecommunications infrastructure.",
  },
  {
    name: "Naver",
    website: "https://naver.com",
    industry: "Technology",
    country: "South Korea",
    description:
      "South Korea's largest search engine and internet company, operating LINE messaging and cloud services.",
  },
  {
    name: "Kakao",
    website: "https://kakao.com",
    industry: "Technology",
    country: "South Korea",
    description:
      "South Korean tech company behind KakaoTalk, the country's dominant messaging platform, plus fintech and mobility.",
  },
  {
    name: "MediaTek",
    website: "https://mediatek.com",
    industry: "Technology",
    country: "Taiwan",
    description:
      "Taiwanese fabless semiconductor company designing chips for smartphones, smart TVs, and IoT devices.",
  },
  {
    name: "TSMC",
    website: "https://tsmc.com",
    industry: "Technology",
    country: "Taiwan",
    description:
      "World's largest contract semiconductor manufacturer, producing chips for Apple, NVIDIA, AMD, and hundreds of others.",
  },
  {
    name: "ASUSTeK",
    website: "https://asus.com",
    industry: "Technology",
    country: "Taiwan",
    description:
      "Taiwanese multinational producing laptops, motherboards, smartphones, and networking equipment.",
  },
  {
    name: "Grab",
    website: "https://grab.com",
    industry: "Technology",
    country: "Singapore",
    description:
      "Southeast Asia's leading superapp offering ride-hailing, food delivery, digital payments, and financial services.",
  },
  {
    name: "Sea Limited",
    website: "https://sea.com",
    industry: "Technology",
    country: "Singapore",
    description:
      "Southeast Asian digital economy company behind Garena games, Shopee e-commerce, and SeaMoney fintech.",
  },
  {
    name: "Grab Holdings",
    website: "https://grab.com",
    industry: "Technology",
    country: "Singapore",
    description:
      "Multinational tech company headquartered in Singapore offering mobility, delivery, and fintech services across SEA.",
  },

  // ── Technology – Europe ──
  {
    name: "SAP",
    website: "https://sap.com",
    industry: "Technology",
    country: "Germany",
    description:
      "Europe's largest software company providing ERP, CRM, and business analytics solutions to enterprises worldwide.",
  },
  {
    name: "ASML",
    website: "https://asml.com",
    industry: "Technology",
    country: "Netherlands",
    description:
      "World's sole supplier of extreme ultraviolet lithography machines, critical for advanced semiconductor manufacturing.",
  },
  {
    name: "Arm Holdings",
    website: "https://arm.com",
    industry: "Technology",
    country: "United Kingdom",
    description:
      "Semiconductor IP company whose processor architectures power 95%+ of smartphones and billions of IoT devices.",
  },
  {
    name: "Ericsson",
    website: "https://ericsson.com",
    industry: "Technology",
    country: "Sweden",
    description:
      "Global leader in telecommunications technology providing 5G networks, radio systems, and OSS/BSS software.",
  },
  {
    name: "Nokia",
    website: "https://nokia.com",
    industry: "Technology",
    country: "Finland",
    description:
      "Telecommunications equipment and software company providing network infrastructure and enterprise connectivity.",
  },
  {
    name: "Philips",
    website: "https://philips.com",
    industry: "Technology",
    country: "Netherlands",
    description:
      "Health technology company focused on diagnostic imaging, ultrasound, patient monitoring, and connected care.",
  },
  {
    name: "ADYEN",
    website: "https://adyen.com",
    industry: "Finance",
    country: "Netherlands",
    description:
      "Global payments platform processing transactions for Airbnb, Uber, Netflix, and thousands of major retailers.",
  },
  {
    name: "Booking Holdings",
    website: "https://bookingholdings.com",
    industry: "Technology",
    country: "United States",
    description:
      "Online travel company operating Booking.com, Priceline, Kayak, and Agoda for hotel and travel reservations.",
  },
  {
    name: "Dassault Systèmes",
    website: "https://3ds.com",
    industry: "Technology",
    country: "France",
    description:
      "French software company providing 3D design, simulation, and product lifecycle management tools for industry.",
  },
  {
    name: "Capgemini",
    website: "https://capgemini.com",
    industry: "Technology",
    country: "France",
    description:
      "French multinational IT services company specializing in consulting, technology, and digital transformation.",
  },
  {
    name: "Atos",
    website: "https://atos.net",
    industry: "Technology",
    country: "France",
    description:
      "French IT services company providing cloud, cybersecurity, and digital transformation services globally.",
  },
  {
    name: "AVEVA",
    website: "https://aveva.com",
    industry: "Technology",
    country: "United Kingdom",
    description:
      "Industrial software company for engineering, design, and operations in energy, utilities, and process industries.",
  },
  {
    name: "IFS",
    website: "https://ifs.com",
    industry: "Technology",
    country: "Sweden",
    description:
      "Enterprise software for asset-intensive industries including aerospace, defense, energy, and manufacturing.",
  },
  {
    name: "Wolters Kluwer",
    website: "https://wolterskluwer.com",
    industry: "Technology",
    country: "Netherlands",
    description:
      "Professional information and software solutions for legal, tax, health, and finance sectors.",
  },

  // ── Finance / Banking ──
  {
    name: "JPMorgan Chase",
    website: "https://jpmorganchase.com",
    industry: "Finance",
    country: "United States",
    description:
      "America's largest bank offering investment banking, commercial banking, financial services, and asset management.",
  },
  {
    name: "Goldman Sachs",
    website: "https://goldmansachs.com",
    industry: "Finance",
    country: "United States",
    description:
      "Global investment bank providing financial advisory, securities, and asset management services.",
  },
  {
    name: "Morgan Stanley",
    website: "https://morganstanley.com",
    industry: "Finance",
    country: "United States",
    description:
      "Financial services company specializing in wealth management, investment banking, and institutional securities.",
  },
  {
    name: "Bank of America",
    website: "https://bankofamerica.com",
    industry: "Finance",
    country: "United States",
    description:
      "One of the world's largest financial institutions serving individuals, businesses, and governments globally.",
  },
  {
    name: "Citigroup",
    website: "https://citigroup.com",
    industry: "Finance",
    country: "United States",
    description:
      "Global bank operating in 160+ countries, offering consumer banking, credit cards, and institutional services.",
  },
  {
    name: "Wells Fargo",
    website: "https://wellsfargo.com",
    industry: "Finance",
    country: "United States",
    description:
      "American multinational bank providing diversified financial and mortgage services to consumers and businesses.",
  },
  {
    name: "HSBC",
    website: "https://hsbc.com",
    industry: "Finance",
    country: "United Kingdom",
    description:
      "One of the world's largest banking and financial services organizations, operating in 64 countries.",
  },
  {
    name: "Barclays",
    website: "https://barclays.com",
    industry: "Finance",
    country: "United Kingdom",
    description:
      "British multinational bank providing retail, wholesale, and investment banking services worldwide.",
  },
  {
    name: "Deutsche Bank",
    website: "https://db.com",
    industry: "Finance",
    country: "Germany",
    description:
      "Germany's largest bank offering investment banking, corporate banking, and asset management services.",
  },
  {
    name: "BNP Paribas",
    website: "https://bnpparibas.com",
    industry: "Finance",
    country: "France",
    description:
      "Europe's largest bank by assets, offering retail, corporate, and investment banking in 65 countries.",
  },
  {
    name: "UBS",
    website: "https://ubs.com",
    industry: "Finance",
    country: "Switzerland",
    description:
      "Global wealth management and investment bank headquartered in Zurich, serving ultra-high-net-worth clients.",
  },
  {
    name: "Credit Suisse",
    website: "https://credit-suisse.com",
    industry: "Finance",
    country: "Switzerland",
    description:
      "Swiss investment bank and financial services company acquired by UBS in 2023 after liquidity crisis.",
  },
  {
    name: "Visa",
    website: "https://visa.com",
    industry: "Finance",
    country: "United States",
    description:
      "Global payments technology company processing trillions of dollars in transactions through its network.",
  },
  {
    name: "Mastercard",
    website: "https://mastercard.com",
    industry: "Finance",
    country: "United States",
    description:
      "Payment technology company connecting consumers, merchants, and financial institutions worldwide.",
  },
  {
    name: "American Express",
    website: "https://americanexpress.com",
    industry: "Finance",
    country: "United States",
    description:
      "Global financial services company known for charge cards, credit cards, and travel and expense management.",
  },
  {
    name: "BlackRock",
    website: "https://blackrock.com",
    industry: "Finance",
    country: "United States",
    description:
      "World's largest asset manager with over $10 trillion in assets, offering investment management and risk analytics.",
  },
  {
    name: "Vanguard",
    website: "https://vanguard.com",
    industry: "Finance",
    country: "United States",
    description:
      "World's largest mutual fund company and second-largest ETF manager, known for low-cost index fund investing.",
  },
  {
    name: "Fidelity Investments",
    website: "https://fidelity.com",
    industry: "Finance",
    country: "United States",
    description:
      "Financial services corporation offering investment management, retirement, brokerage, and wealth management.",
  },
  {
    name: "Charles Schwab",
    website: "https://schwab.com",
    industry: "Finance",
    country: "United States",
    description:
      "American discount broker offering brokerage, banking, and financial advisory services to retail investors.",
  },
  {
    name: "Allianz",
    website: "https://allianz.com",
    industry: "Insurance",
    country: "Germany",
    description:
      "World's largest insurance company and asset manager providing life, property, casualty, and health insurance.",
  },
  {
    name: "AXA",
    website: "https://axa.com",
    industry: "Insurance",
    country: "France",
    description:
      "Global insurance and asset management group offering life, health, property, and liability insurance.",
  },
  {
    name: "Zurich Insurance",
    website: "https://zurich.com",
    industry: "Insurance",
    country: "Switzerland",
    description:
      "Multi-line insurance company offering commercial and personal lines insurance in over 210 countries.",
  },
  {
    name: "Prudential",
    website: "https://prudential.com",
    industry: "Insurance",
    country: "United States",
    description:
      "Financial services leader in life insurance, annuities, mutual funds, and pension and retirement-related services.",
  },
  {
    name: "MetLife",
    website: "https://metlife.com",
    industry: "Insurance",
    country: "United States",
    description:
      "Global insurance company offering life, dental, disability, vision, and accident and health insurance.",
  },
  {
    name: "DBS Bank",
    website: "https://dbs.com",
    industry: "Finance",
    country: "Singapore",
    description:
      "Singapore's largest bank with over $600 billion in assets, operating across Asia, digital banking.",
  },
  {
    name: "ICBC",
    website: "https://icbc.com.cn",
    industry: "Finance",
    country: "China",
    description:
      "World's largest bank by assets, providing banking, investment, and financial services primarily in China.",
  },
  {
    name: "China Construction Bank",
    website: "https://ccb.com",
    industry: "Finance",
    country: "China",
    description:
      "One of China's 'Big Four' banks providing corporate banking, personal finance, and treasury business.",
  },
  {
    name: "Ant Group",
    website: "https://antgroup.com",
    industry: "Finance",
    country: "China",
    description:
      "Chinese fintech conglomerate operating Alipay, the world's largest mobile payment platform with 1 billion users.",
  },
  {
    name: "Mizuho Financial",
    website: "https://mizuho-fg.com",
    industry: "Finance",
    country: "Japan",
    description:
      "Japanese banking group offering corporate, retail, and investment banking with a strong Asia-Pacific presence.",
  },
  {
    name: "Mitsubishi UFJ Financial",
    website: "https://mufg.jp",
    industry: "Finance",
    country: "Japan",
    description:
      "Japan's largest bank by assets, providing retail, corporate, and global banking and asset management services.",
  },
  {
    name: "ING Group",
    website: "https://ing.com",
    industry: "Finance",
    country: "Netherlands",
    description:
      "Dutch multinational banking and financial services corporation offering retail and commercial banking globally.",
  },
  {
    name: "Société Générale",
    website: "https://societegenerale.com",
    industry: "Finance",
    country: "France",
    description:
      "French multinational investment bank and financial services company operating across 66 countries.",
  },
  {
    name: "Lloyds Banking Group",
    website: "https://lloydsbankinggroup.com",
    industry: "Finance",
    country: "United Kingdom",
    description:
      "UK's largest retail bank with over 30 million customers, offering mortgages, insurance, and business banking.",
  },
  {
    name: "Royal Bank of Canada",
    website: "https://rbc.com",
    industry: "Finance",
    country: "Canada",
    description:
      "Canada's largest bank by market cap, providing personal, commercial, corporate, and investment banking.",
  },
  {
    name: "TD Bank",
    website: "https://td.com",
    industry: "Finance",
    country: "Canada",
    description:
      "One of North America's largest banks providing retail, commercial, and wholesale banking services.",
  },
  {
    name: "Commonwealth Bank",
    website: "https://commbank.com.au",
    industry: "Finance",
    country: "Australia",
    description:
      "Australia's largest bank offering retail, business, institutional, and agricultural banking services.",
  },
  {
    name: "ANZ Bank",
    website: "https://anz.com",
    industry: "Finance",
    country: "Australia",
    description:
      "Major Australian bank with strong Asia-Pacific presence offering retail, commercial, and institutional banking.",
  },
  {
    name: "HDFC Bank",
    website: "https://hdfcbank.com",
    industry: "Finance",
    country: "India",
    description:
      "India's largest private sector bank providing commercial, retail, and investment banking services.",
  },
  {
    name: "State Bank of India",
    website: "https://sbi.co.in",
    industry: "Finance",
    country: "India",
    description:
      "India's largest public sector bank with over 500 million customers and 22,000+ branches.",
  },
  {
    name: "Banco Santander",
    website: "https://santander.com",
    industry: "Finance",
    country: "Spain",
    description:
      "Spanish multinational bank operating in 10 core markets globally with over 150 million customers.",
  },
  {
    name: "BBVA",
    website: "https://bbva.com",
    industry: "Finance",
    country: "Spain",
    description:
      "Global financial group offering digital banking, mortgages, and investment services across Europe and the Americas.",
  },
  {
    name: "Standard Chartered",
    website: "https://sc.com",
    industry: "Finance",
    country: "United Kingdom",
    description:
      "British multinational banking and financial services company focused on Asia, Africa, and Middle East.",
  },
  {
    name: "Itaú Unibanco",
    website: "https://itau.com.br",
    industry: "Finance",
    country: "Brazil",
    description:
      "Brazil's largest private bank, providing retail, wholesale, and insurance services across Latin America.",
  },
  {
    name: "Nubank",
    website: "https://nubank.com.br",
    industry: "Finance",
    country: "Brazil",
    description:
      "World's largest digital bank by customer count, offering credit cards, accounts, and financial services in LatAm.",
  },

  // ── Healthcare / Pharma ──
  {
    name: "Pfizer",
    website: "https://pfizer.com",
    industry: "Healthcare",
    country: "United States",
    description:
      "Global pharmaceutical giant known for COVID-19 vaccines, oncology, and a broad portfolio of prescription medicines.",
  },
  {
    name: "Johnson & Johnson",
    website: "https://jnj.com",
    industry: "Healthcare",
    country: "United States",
    description:
      "Multinational healthcare company producing pharmaceuticals, medical devices, and consumer health products.",
  },
  {
    name: "Merck",
    website: "https://merck.com",
    industry: "Healthcare",
    country: "United States",
    description:
      "Pharmaceutical company known for Keytruda cancer immunotherapy and vaccines for cervical cancer and pneumonia.",
  },
  {
    name: "AbbVie",
    website: "https://abbvie.com",
    industry: "Healthcare",
    country: "United States",
    description:
      "Biopharmaceutical company behind Humira, the world's best-selling drug, and Skyrizi for autoimmune diseases.",
  },
  {
    name: "Bristol-Myers Squibb",
    website: "https://bms.com",
    industry: "Healthcare",
    country: "United States",
    description:
      "Biopharmaceutical company developing innovative treatments for cancer, cardiovascular, and immune diseases.",
  },
  {
    name: "AstraZeneca",
    website: "https://astrazeneca.com",
    industry: "Healthcare",
    country: "United Kingdom",
    description:
      "Global biopharmaceutical company focused on oncology, cardiovascular, renal, metabolic, and respiratory diseases.",
  },
  {
    name: "Novartis",
    website: "https://novartis.com",
    industry: "Healthcare",
    country: "Switzerland",
    description:
      "Swiss pharmaceutical company offering innovative medicines in oncology, immunology, and neurological disorders.",
  },
  {
    name: "Roche",
    website: "https://roche.com",
    industry: "Healthcare",
    country: "Switzerland",
    description:
      "Global healthcare company leading in diagnostics and pharmaceuticals, particularly oncology and personalized medicine.",
  },
  {
    name: "Sanofi",
    website: "https://sanofi.com",
    industry: "Healthcare",
    country: "France",
    description:
      "French multinational pharmaceutical company specializing in vaccines, immunology, and rare diseases.",
  },
  {
    name: "Bayer",
    website: "https://bayer.com",
    industry: "Healthcare",
    country: "Germany",
    description:
      "Life sciences company in pharmaceuticals, consumer health, and crop science with a focus on cardiovascular health.",
  },
  {
    name: "Medtronic",
    website: "https://medtronic.com",
    industry: "Healthcare",
    country: "United States",
    description:
      "World's largest medical device company producing cardiac devices, insulin pumps, and surgical instruments.",
  },
  {
    name: "UnitedHealth Group",
    website: "https://unitedhealthgroup.com",
    industry: "Healthcare",
    country: "United States",
    description:
      "America's largest health insurance company operating United Healthcare and Optum health services.",
  },
  {
    name: "Eli Lilly",
    website: "https://lilly.com",
    industry: "Healthcare",
    country: "United States",
    description:
      "Pharmaceutical company known for insulin, Mounjaro (diabetes/obesity), and leading Alzheimer's treatments.",
  },
  {
    name: "Moderna",
    website: "https://modernatx.com",
    industry: "Healthcare",
    country: "United States",
    description:
      "mRNA technology pioneer behind the COVID-19 vaccine and a pipeline of vaccines and therapeutics.",
  },
  {
    name: "Gilead Sciences",
    website: "https://gilead.com",
    industry: "Healthcare",
    country: "United States",
    description:
      "Biopharmaceutical company focused on HIV, hepatitis C, cancer, and inflammatory and respiratory diseases.",
  },
  {
    name: "Amgen",
    website: "https://amgen.com",
    industry: "Healthcare",
    country: "United States",
    description:
      "Leading biotechnology company developing treatments for oncology, cardiovascular disease, and bone health.",
  },
  {
    name: "Stryker",
    website: "https://stryker.com",
    industry: "Healthcare",
    country: "United States",
    description:
      "Medical technology company offering orthopedic implants, surgical equipment, and neurotechnology products.",
  },
  {
    name: "Boston Scientific",
    website: "https://bostonscientific.com",
    industry: "Healthcare",
    country: "United States",
    description:
      "Medical device company for cardiology, endoscopy, urology, and neuromodulation treatments.",
  },
  {
    name: "Abbott Laboratories",
    website: "https://abbott.com",
    industry: "Healthcare",
    country: "United States",
    description:
      "Global healthcare company in medical devices, diagnostics, nutrition, and branded generic pharmaceuticals.",
  },
  {
    name: "Siemens Healthineers",
    website: "https://siemens-healthineers.com",
    industry: "Healthcare",
    country: "Germany",
    description:
      "Medical technology company offering imaging, laboratory diagnostics, and digital health solutions.",
  },
  {
    name: "Fresenius",
    website: "https://fresenius.com",
    industry: "Healthcare",
    country: "Germany",
    description:
      "International healthcare group specializing in dialysis, clinical nutrition, hospital management, and IV drugs.",
  },
  {
    name: "Takeda Pharmaceutical",
    website: "https://takeda.com",
    industry: "Healthcare",
    country: "Japan",
    description:
      "Japanese pharmaceutical giant with global leadership in gastrointestinal, rare diseases, and plasma therapies.",
  },
  {
    name: "Sun Pharmaceutical",
    website: "https://sunpharma.com",
    industry: "Healthcare",
    country: "India",
    description:
      "India's largest pharma company and top-5 global specialty generics manufacturer serving 100+ countries.",
  },
  {
    name: "GSK",
    website: "https://gsk.com",
    industry: "Healthcare",
    country: "United Kingdom",
    description:
      "British pharmaceutical company developing medicines and vaccines for infectious diseases, oncology, and HIV.",
  },
  {
    name: "Novo Nordisk",
    website: "https://novonordisk.com",
    industry: "Healthcare",
    country: "Denmark",
    description:
      "Danish pharma company leading the global diabetes and obesity market with Ozempic and Wegovy.",
  },
  {
    name: "UCB",
    website: "https://ucb.com",
    industry: "Healthcare",
    country: "Belgium",
    description:
      "Biopharmaceutical company specializing in central nervous system and immunology treatments.",
  },
  {
    name: "Genentech",
    website: "https://gene.com",
    industry: "Healthcare",
    country: "United States",
    description:
      "Roche subsidiary and pioneer in biotechnology, developing medicines for cancer and serious diseases.",
  },

  // ── Retail / E-commerce ──
  {
    name: "Walmart",
    website: "https://walmart.com",
    industry: "Retail",
    country: "United States",
    description:
      "World's largest retailer operating 10,500+ stores globally, with a growing e-commerce and delivery business.",
  },
  {
    name: "Amazon Retail",
    website: "https://amazon.com",
    industry: "Retail",
    country: "United States",
    description:
      "World's largest online retailer offering millions of products with Prime membership and same-day delivery.",
  },
  {
    name: "IKEA",
    website: "https://ikea.com",
    industry: "Retail",
    country: "Sweden",
    description:
      "Global furniture and home goods retailer known for flat-pack designs, sustainable sourcing, and affordable prices.",
  },
  {
    name: "H&M",
    website: "https://hm.com",
    industry: "Retail",
    country: "Sweden",
    description:
      "Swedish fast-fashion retailer operating 5,000+ stores globally with affordable clothing and sustainability goals.",
  },
  {
    name: "Zara",
    website: "https://zara.com",
    industry: "Retail",
    country: "Spain",
    description:
      "Fast-fashion brand by Inditex known for rapid production cycles and trend-responsive clothing collections.",
  },
  {
    name: "Target",
    website: "https://target.com",
    industry: "Retail",
    country: "United States",
    description:
      "American retail chain offering apparel, electronics, groceries, and home goods through 1,900+ stores and online.",
  },
  {
    name: "Costco",
    website: "https://costco.com",
    industry: "Retail",
    country: "United States",
    description:
      "Membership-based warehouse club selling bulk goods including groceries, electronics, and appliances.",
  },
  {
    name: "The Home Depot",
    website: "https://homedepot.com",
    industry: "Retail",
    country: "United States",
    description:
      "America's largest home improvement retailer selling tools, building materials, and lawn and garden products.",
  },
  {
    name: "Nike",
    website: "https://nike.com",
    industry: "Retail",
    country: "United States",
    description:
      "World's largest athletic footwear and apparel brand, known for Air Jordan, running shoes, and sports gear.",
  },
  {
    name: "Adidas",
    website: "https://adidas.com",
    industry: "Retail",
    country: "Germany",
    description:
      "Global sportswear company known for footwear, athletic apparel, and partnerships in sports and fashion.",
  },
  {
    name: "Uniqlo",
    website: "https://uniqlo.com",
    industry: "Retail",
    country: "Japan",
    description:
      "Japanese casual fashion retailer by Fast Retailing, known for minimalist basics and HeatTech technology.",
  },
  {
    name: "Carrefour",
    website: "https://carrefour.com",
    industry: "Retail",
    country: "France",
    description:
      "French multinational retail corporation operating hypermarkets, supermarkets, and convenience stores in 30+ countries.",
  },
  {
    name: "Lidl",
    website: "https://lidl.com",
    industry: "Retail",
    country: "Germany",
    description:
      "German discount supermarket chain operating 12,000+ stores in 30+ European countries and the United States.",
  },
  {
    name: "Aldi",
    website: "https://aldi.com",
    industry: "Retail",
    country: "Germany",
    description:
      "International discount supermarket chain known for private-label products and no-frills low-cost grocery shopping.",
  },
  {
    name: "Shopify",
    website: "https://shopify.com",
    industry: "Retail",
    country: "Canada",
    description:
      "E-commerce platform enabling businesses to build online stores, manage inventory, and process payments.",
  },
  {
    name: "Flipkart",
    website: "https://flipkart.com",
    industry: "Retail",
    country: "India",
    description:
      "India's largest e-commerce marketplace owned by Walmart, selling electronics, fashion, and lifestyle products.",
  },
  {
    name: "Lazada",
    website: "https://lazada.com",
    industry: "Retail",
    country: "Singapore",
    description:
      "Southeast Asia's leading e-commerce platform backed by Alibaba, operating in six countries.",
  },
  {
    name: "Zalando",
    website: "https://zalando.com",
    industry: "Retail",
    country: "Germany",
    description:
      "Europe's largest online fashion platform selling 4,500+ brands with a focus on sustainability.",
  },
  {
    name: "ASOS",
    website: "https://asos.com",
    industry: "Retail",
    country: "United Kingdom",
    description:
      "Online fashion retailer selling 850+ brands alongside own-label clothing to 20-something shoppers worldwide.",
  },
  {
    name: "Lululemon",
    website: "https://lululemon.com",
    industry: "Retail",
    country: "Canada",
    description:
      "Athletic apparel company known for premium yoga pants and activewear with a loyal community focus.",
  },
  {
    name: "Prada",
    website: "https://prada.com",
    industry: "Retail",
    country: "Italy",
    description:
      "Italian luxury fashion house known for leather goods, ready-to-wear, footwear, and niche fragrances.",
  },
  {
    name: "Gucci",
    website: "https://gucci.com",
    industry: "Retail",
    country: "Italy",
    description:
      "Italian luxury brand under Kering, famous for iconic monogram handbags, shoes, and fashion collections.",
  },
  {
    name: "Hermes",
    website: "https://hermes.com",
    industry: "Retail",
    country: "France",
    description:
      "French ultra-luxury house known for Birkin and Kelly bags, silk scarves, and fine leather craftsmanship.",
  },
  {
    name: "Louis Vuitton",
    website: "https://louisvuitton.com",
    industry: "Retail",
    country: "France",
    description:
      "World's most valuable luxury brand under LVMH, known for leather goods, fashion, watches, and perfumes.",
  },

  // ── Automotive ──
  {
    name: "Toyota",
    website: "https://toyota.com",
    industry: "Automotive",
    country: "Japan",
    description:
      "World's largest automaker by volume, pioneering hybrid vehicles with the Prius and investing in hydrogen fuel cells.",
  },
  {
    name: "Volkswagen",
    website: "https://volkswagen.com",
    industry: "Automotive",
    country: "Germany",
    description:
      "German auto group owning VW, Audi, Porsche, Lamborghini, Bentley, and SEAT, leading EV transition in Europe.",
  },
  {
    name: "BMW",
    website: "https://bmw.com",
    industry: "Automotive",
    country: "Germany",
    description:
      "German luxury automaker known for performance sedans, SUVs, electric vehicles, and the MINI and Rolls-Royce brands.",
  },
  {
    name: "Mercedes-Benz",
    website: "https://mercedes-benz.com",
    industry: "Automotive",
    country: "Germany",
    description:
      "German luxury vehicle manufacturer with a wide portfolio of cars, vans, and electric EQ-series vehicles.",
  },
  {
    name: "Honda",
    website: "https://honda.com",
    industry: "Automotive",
    country: "Japan",
    description:
      "Japanese automaker producing cars, motorcycles, and power equipment, known for fuel efficiency and reliability.",
  },
  {
    name: "Ford",
    website: "https://ford.com",
    industry: "Automotive",
    country: "United States",
    description:
      "Iconic American automaker with a strong pickup truck franchise (F-150) and growing EV lineup (Mustang Mach-E).",
  },
  {
    name: "General Motors",
    website: "https://gm.com",
    industry: "Automotive",
    country: "United States",
    description:
      "American automaker producing Chevrolet, GMC, Cadillac, and Buick, with Ultium EV platform for future mobility.",
  },
  {
    name: "Stellantis",
    website: "https://stellantis.com",
    industry: "Automotive",
    country: "Netherlands",
    description:
      "Multinational auto group owning Jeep, Ram, Dodge, Fiat, Peugeot, and Chrysler brands.",
  },
  {
    name: "Hyundai",
    website: "https://hyundai.com",
    industry: "Automotive",
    country: "South Korea",
    description:
      "South Korean automaker producing affordable to luxury vehicles, accelerating EV deployment globally.",
  },
  {
    name: "Porsche",
    website: "https://porsche.com",
    industry: "Automotive",
    country: "Germany",
    description:
      "German sports car manufacturer known for 911, Cayenne, Taycan EV, and iconic motorsport heritage.",
  },
  {
    name: "Ferrari",
    website: "https://ferrari.com",
    industry: "Automotive",
    country: "Italy",
    description:
      "Italian luxury sports car manufacturer renowned for performance, exclusivity, and Formula 1 racing heritage.",
  },
  {
    name: "Rivian",
    website: "https://rivian.com",
    industry: "Automotive",
    country: "United States",
    description:
      "Electric adventure vehicle startup producing the R1T pickup and R1S SUV with backing from Amazon.",
  },
  {
    name: "Lucid Motors",
    website: "https://lucidmotors.com",
    industry: "Automotive",
    country: "United States",
    description:
      "Luxury electric vehicle manufacturer with industry-leading range, backed by Saudi Arabia's PIF.",
  },
  {
    name: "Kia",
    website: "https://kia.com",
    industry: "Automotive",
    country: "South Korea",
    description:
      "South Korean automaker known for value, design awards, and a growing EV portfolio including the EV6.",
  },
  {
    name: "Nissan",
    website: "https://nissan.com",
    industry: "Automotive",
    country: "Japan",
    description:
      "Japanese automaker and pioneer of mass-market EVs with the Leaf, plus the GT-R sports car heritage.",
  },
  {
    name: "Renault",
    website: "https://renault.com",
    industry: "Automotive",
    country: "France",
    description:
      "French automaker making affordable cars and leading Europe's EV adoption with the Renault 5.",
  },
  {
    name: "Volvo Cars",
    website: "https://volvocars.com",
    industry: "Automotive",
    country: "Sweden",
    description:
      "Swedish automaker owned by Geely, known for safety leadership and ambitious all-electric transition.",
  },
  {
    name: "Subaru",
    website: "https://subaru.com",
    industry: "Automotive",
    country: "Japan",
    description:
      "Japanese automaker known for symmetrical all-wheel drive, Outback SUVs, and WRX performance vehicles.",
  },

  // ── Energy / Oil & Gas / Renewables ──
  {
    name: "Shell",
    website: "https://shell.com",
    industry: "Energy",
    country: "Netherlands",
    description:
      "Global energy company producing oil, gas, and chemicals while transitioning to low-carbon energy solutions.",
  },
  {
    name: "ExxonMobil",
    website: "https://exxonmobil.com",
    industry: "Energy",
    country: "United States",
    description:
      "One of the world's largest publicly traded energy companies exploring and producing oil and natural gas globally.",
  },
  {
    name: "BP",
    website: "https://bp.com",
    industry: "Energy",
    country: "United Kingdom",
    description:
      "British oil and gas company transitioning to renewables with major wind, solar, and bioenergy investments.",
  },
  {
    name: "Chevron",
    website: "https://chevron.com",
    industry: "Energy",
    country: "United States",
    description:
      "American multinational energy corporation with upstream, downstream, and chemicals operations worldwide.",
  },
  {
    name: "TotalEnergies",
    website: "https://totalenergies.com",
    industry: "Energy",
    country: "France",
    description:
      "French multinational energy company in oil, gas, and renewable energy including solar and wind.",
  },
  {
    name: "Equinor",
    website: "https://equinor.com",
    industry: "Energy",
    country: "Norway",
    description:
      "Norwegian energy company operating offshore oil and gas fields and developing offshore wind globally.",
  },
  {
    name: "NextEra Energy",
    website: "https://nexteraenergy.com",
    industry: "Energy",
    country: "United States",
    description:
      "World's largest producer of wind and solar energy, also operating Florida Power & Light utility.",
  },
  {
    name: "Orsted",
    website: "https://orsted.com",
    industry: "Energy",
    country: "Denmark",
    description:
      "Danish renewable energy company and global leader in offshore wind farm development and operation.",
  },
  {
    name: "Engie",
    website: "https://engie.com",
    industry: "Energy",
    country: "France",
    description:
      "French multinational utility company in electricity generation, natural gas, renewables, and energy services.",
  },
  {
    name: "Iberdrola",
    website: "https://iberdrola.com",
    industry: "Energy",
    country: "Spain",
    description:
      "Spanish multinational utility and world's largest producer of wind energy with 30+ GW of renewable capacity.",
  },
  {
    name: "Enel",
    website: "https://enel.com",
    industry: "Energy",
    country: "Italy",
    description:
      "Italian multinational energy company and one of the world's largest utilities with strong renewables presence.",
  },
  {
    name: "Saudi Aramco",
    website: "https://aramco.com",
    industry: "Energy",
    country: "Saudi Arabia",
    description:
      "World's largest oil company by revenue, producing over 10 million barrels per day.",
  },
  {
    name: "Gazprom",
    website: "https://gazprom.com",
    industry: "Energy",
    country: "Russia",
    description:
      "Russia's state-owned natural gas monopoly and the world's largest natural gas producer.",
  },
  {
    name: "Petrobras",
    website: "https://petrobras.com.br",
    industry: "Energy",
    country: "Brazil",
    description:
      "Brazilian multinational petroleum corporation, dominant in deepwater oil exploration and production.",
  },
  {
    name: "Vestas",
    website: "https://vestas.com",
    industry: "Energy",
    country: "Denmark",
    description:
      "World's leading manufacturer and installer of wind turbines with installations in 80+ countries.",
  },
  {
    name: "Siemens Energy",
    website: "https://siemens-energy.com",
    industry: "Energy",
    country: "Germany",
    description:
      "Energy technology company providing power generation, transmission, and industrial decarbonization solutions.",
  },
  {
    name: "Duke Energy",
    website: "https://duke-energy.com",
    industry: "Energy",
    country: "United States",
    description:
      "One of the largest US electric power holding companies serving 8 million customers in the Southeast and Midwest.",
  },
  {
    name: "Schlumberger (SLB)",
    website: "https://slb.com",
    industry: "Energy",
    country: "United States",
    description:
      "World's largest oilfield services company providing drilling, data, and completion services globally.",
  },

  // ── Aerospace & Defense ──
  {
    name: "Boeing",
    website: "https://boeing.com",
    industry: "Aerospace",
    country: "United States",
    description:
      "World's largest aerospace company producing commercial jets (737, 787), defense aircraft, and space systems.",
  },
  {
    name: "Airbus",
    website: "https://airbus.com",
    industry: "Aerospace",
    country: "France",
    description:
      "European aerospace corporation producing commercial aircraft (A320, A350), helicopters, and defense systems.",
  },
  {
    name: "Lockheed Martin",
    website: "https://lockheedmartin.com",
    industry: "Aerospace",
    country: "United States",
    description:
      "World's largest defense contractor producing F-35 jets, missile defense systems, and space exploration vehicles.",
  },
  {
    name: "Raytheon Technologies",
    website: "https://rtx.com",
    industry: "Aerospace",
    country: "United States",
    description:
      "Defense and aerospace systems contractor known for Patriot missiles, radar, and jet engine manufacturing.",
  },
  {
    name: "SpaceX",
    website: "https://spacex.com",
    industry: "Aerospace",
    country: "United States",
    description:
      "Private space exploration company developing reusable rockets, Starlink satellites, and human spaceflight.",
  },
  {
    name: "Rolls-Royce",
    website: "https://rolls-royce.com",
    industry: "Aerospace",
    country: "United Kingdom",
    description:
      "British engineering company manufacturing aircraft engines for civil and defense aerospace, and power systems.",
  },
  {
    name: "Northrop Grumman",
    website: "https://northropgrumman.com",
    industry: "Aerospace",
    country: "United States",
    description:
      "American aerospace and defense technology company known for the B-2 Spirit bomber and missile defense.",
  },
  {
    name: "General Dynamics",
    website: "https://gd.com",
    industry: "Aerospace",
    country: "United States",
    description:
      "Defense contractor producing Gulfstream jets, submarines, combat vehicles, and IT systems for government.",
  },
  {
    name: "L3Harris Technologies",
    website: "https://l3harris.com",
    industry: "Aerospace",
    country: "United States",
    description:
      "Defense company providing communication systems, electronic warfare, and ISR technologies for military.",
  },
  {
    name: "BAE Systems",
    website: "https://baesystems.com",
    industry: "Aerospace",
    country: "United Kingdom",
    description:
      "British defense, security, and aerospace company manufacturing aircraft, ships, and combat vehicles.",
  },
  {
    name: "Thales",
    website: "https://thalesgroup.com",
    industry: "Aerospace",
    country: "France",
    description:
      "French multinational defense electronics company providing avionics, cybersecurity, and space systems.",
  },
  {
    name: "Leonardo",
    website: "https://leonardo.com",
    industry: "Aerospace",
    country: "Italy",
    description:
      "Italian aerospace and defense company producing helicopters, aircraft, electronics, and space systems.",
  },
  {
    name: "Safran",
    website: "https://safran-group.com",
    industry: "Aerospace",
    country: "France",
    description:
      "French aerospace supplier of aircraft engines (with GE), landing gear, nacelles, and avionics systems.",
  },

  // ── Manufacturing ──
  {
    name: "Siemens",
    website: "https://siemens.com",
    industry: "Manufacturing",
    country: "Germany",
    description:
      "German industrial manufacturing conglomerate in automation, electrification, digitalization, and smart infrastructure.",
  },
  {
    name: "ABB",
    website: "https://abb.com",
    industry: "Manufacturing",
    country: "Switzerland",
    description:
      "Swedish-Swiss industrial technology company in robotics, automation, electrical grids, and power systems.",
  },
  {
    name: "General Electric",
    website: "https://ge.com",
    industry: "Manufacturing",
    country: "United States",
    description:
      "American industrial conglomerate in aviation, renewable energy (GE Vernova), and healthcare imaging.",
  },
  {
    name: "3M",
    website: "https://3m.com",
    industry: "Manufacturing",
    country: "United States",
    description:
      "Diversified technology company producing 55,000+ products including Post-it notes, medical tapes, and industrial abrasives.",
  },
  {
    name: "Honeywell",
    website: "https://honeywell.com",
    industry: "Manufacturing",
    country: "United States",
    description:
      "Industrial conglomerate in aerospace technologies, building automation, performance materials, and safety products.",
  },
  {
    name: "Caterpillar",
    website: "https://cat.com",
    industry: "Manufacturing",
    country: "United States",
    description:
      "World's largest construction equipment manufacturer producing excavators, bulldozers, mining trucks, and engines.",
  },
  {
    name: "John Deere",
    website: "https://deere.com",
    industry: "Manufacturing",
    country: "United States",
    description:
      "Leading manufacturer of agricultural machinery, construction equipment, and precision farming technology.",
  },
  {
    name: "Bosch",
    website: "https://bosch.com",
    industry: "Manufacturing",
    country: "Germany",
    description:
      "German multinational engineering corporation in mobility, industrial technology, consumer goods, and energy.",
  },
  {
    name: "Emerson Electric",
    website: "https://emerson.com",
    industry: "Manufacturing",
    country: "United States",
    description:
      "American manufacturing company providing automation technology and software for industrial processes.",
  },
  {
    name: "Parker Hannifin",
    website: "https://parker.com",
    industry: "Manufacturing",
    country: "United States",
    description:
      "Motion and control technologies company for mobile, industrial, and aerospace applications.",
  },
  {
    name: "Illinois Tool Works",
    website: "https://itw.com",
    industry: "Manufacturing",
    country: "United States",
    description:
      "Diversified manufacturer of industrial products including welding equipment, food equipment, and polymers.",
  },
  {
    name: "Eaton",
    website: "https://eaton.com",
    industry: "Manufacturing",
    country: "Ireland",
    description:
      "Power management company providing electrical components, hydraulics, and vehicle drivetrain systems.",
  },
  {
    name: "Schneider Electric",
    website: "https://se.com",
    industry: "Manufacturing",
    country: "France",
    description:
      "Digital transformation of energy management and automation in homes, buildings, data centers, and industries.",
  },
  {
    name: "Rockwell Automation",
    website: "https://rockwellautomation.com",
    industry: "Manufacturing",
    country: "United States",
    description:
      "Industrial automation and information technology company connecting manufacturers to smarter production.",
  },
  {
    name: "Komatsu",
    website: "https://komatsu.com",
    industry: "Manufacturing",
    country: "Japan",
    description:
      "Japanese manufacturer of construction, mining, forestry, and military equipment with smart automation.",
  },
  {
    name: "Mitsubishi Heavy Industries",
    website: "https://mhi.com",
    industry: "Manufacturing",
    country: "Japan",
    description:
      "Diversified heavy industry company in energy, aerospace, machinery, and defense systems.",
  },
  {
    name: "FANUC",
    website: "https://fanuc.com",
    industry: "Manufacturing",
    country: "Japan",
    description:
      "World's leading manufacturer of CNC systems, industrial robots, and factory automation equipment.",
  },
  {
    name: "Yaskawa Electric",
    website: "https://yaskawa.com",
    industry: "Manufacturing",
    country: "Japan",
    description:
      "Japanese company in motion control, industrial robots, and AC drives for manufacturing automation.",
  },

  // ── Consulting ──
  {
    name: "McKinsey & Company",
    website: "https://mckinsey.com",
    industry: "Consulting",
    country: "United States",
    description:
      "World's most prestigious management consulting firm advising leading organizations on strategy and operations.",
  },
  {
    name: "Accenture",
    website: "https://accenture.com",
    industry: "Consulting",
    country: "Ireland",
    description:
      "Global professional services company in strategy, consulting, digital, technology, and operations.",
  },
  {
    name: "Deloitte",
    website: "https://deloitte.com",
    industry: "Consulting",
    country: "United Kingdom",
    description:
      "World's largest professional services firm offering audit, consulting, financial advisory, and tax services.",
  },
  {
    name: "PwC",
    website: "https://pwc.com",
    industry: "Consulting",
    country: "United Kingdom",
    description:
      "Global network of professional services firms providing audit, tax, and advisory services to major companies.",
  },
  {
    name: "KPMG",
    website: "https://kpmg.com",
    industry: "Consulting",
    country: "Netherlands",
    description:
      "Multinational professional services firm offering audit, tax, and advisory services in 143 countries.",
  },
  {
    name: "Ernst & Young",
    website: "https://ey.com",
    industry: "Consulting",
    country: "United Kingdom",
    description:
      "Global professional services firm specializing in assurance, consulting, strategy, tax, and transactions.",
  },
  {
    name: "Boston Consulting Group",
    website: "https://bcg.com",
    industry: "Consulting",
    country: "United States",
    description:
      "Top-tier management consulting firm known for portfolio analysis frameworks and digital transformation.",
  },
  {
    name: "Bain & Company",
    website: "https://bain.com",
    industry: "Consulting",
    country: "United States",
    description:
      "Global management consulting firm known for private equity expertise and NPS (Net Promoter Score) methodology.",
  },
  {
    name: "Oliver Wyman",
    website: "https://oliverwyman.com",
    industry: "Consulting",
    country: "United States",
    description:
      "Global management consulting firm specializing in finance, transportation, energy, and health sectors.",
  },
  {
    name: "Roland Berger",
    website: "https://rolandberger.com",
    industry: "Consulting",
    country: "Germany",
    description:
      "European management consulting firm advising on strategy, operations, and transformation globally.",
  },
  {
    name: "A.T. Kearney",
    website: "https://kearney.com",
    industry: "Consulting",
    country: "United States",
    description:
      "Global management consulting firm focused on strategic and operational issues facing major corporations.",
  },
  {
    name: "Gartner",
    website: "https://gartner.com",
    industry: "Consulting",
    country: "United States",
    description:
      "Research and advisory firm known for Magic Quadrant reports, Hype Cycle, and IT market analysis.",
  },

  // ── Media / Entertainment ──
  {
    name: "Disney",
    website: "https://disney.com",
    industry: "Media",
    country: "United States",
    description:
      "Global entertainment conglomerate operating theme parks, film studios (Marvel, Pixar), and Disney+ streaming.",
  },
  {
    name: "Warner Bros. Discovery",
    website: "https://wbd.com",
    industry: "Media",
    country: "United States",
    description:
      "Global media company operating HBO, CNN, Warner Bros. films, and Max streaming platform.",
  },
  {
    name: "Comcast",
    website: "https://comcast.com",
    industry: "Media",
    country: "United States",
    description:
      "Largest US cable provider and owner of NBCUniversal, Sky, and Peacock streaming service.",
  },
  {
    name: "News Corp",
    website: "https://newscorp.com",
    industry: "Media",
    country: "United States",
    description:
      "Global media and information services company operating The Wall Street Journal and News UK.",
  },
  {
    name: "Bertelsmann",
    website: "https://bertelsmann.com",
    industry: "Media",
    country: "Germany",
    description:
      "International media, services, and education company behind RTL Group, Penguin Random House, and BMG.",
  },
  {
    name: "Vivendi",
    website: "https://vivendi.com",
    industry: "Media",
    country: "France",
    description:
      "French media conglomerate owning Universal Music Group, Canal+, and Havas advertising agency.",
  },
  {
    name: "Universal Music Group",
    website: "https://universalmusic.com",
    industry: "Media",
    country: "Netherlands",
    description:
      "World's largest music company representing Taylor Swift, Drake, and thousands of major artists globally.",
  },
  {
    name: "Paramount Global",
    website: "https://paramount.com",
    industry: "Media",
    country: "United States",
    description:
      "Global media company behind CBS, MTV, Nickelodeon, BET, and Paramount+ streaming service.",
  },
  {
    name: "NBCUniversal",
    website: "https://nbcuniversal.com",
    industry: "Media",
    country: "United States",
    description:
      "US media conglomerate owned by Comcast with NBC, MSNBC, Universal Pictures, and Peacock.",
  },
  {
    name: "Electronic Arts",
    website: "https://ea.com",
    industry: "Media",
    country: "United States",
    description:
      "Major video game company behind FIFA/EA Sports FC, Battlefield, The Sims, and Apex Legends.",
  },
  {
    name: "Activision Blizzard",
    website: "https://activisionblizzard.com",
    industry: "Media",
    country: "United States",
    description:
      "Video game company behind Call of Duty, World of Warcraft, and Candy Crush, acquired by Microsoft.",
  },
  {
    name: "Take-Two Interactive",
    website: "https://take2games.com",
    industry: "Media",
    country: "United States",
    description:
      "Video game company behind Grand Theft Auto, NBA 2K, and Red Dead Redemption franchises.",
  },
  {
    name: "Ubisoft",
    website: "https://ubisoft.com",
    industry: "Media",
    country: "France",
    description:
      "French video game developer and publisher known for Assassin's Creed, Far Cry, and Rainbow Six series.",
  },
  {
    name: "Spotify",
    website: "https://spotify.com",
    industry: "Media",
    country: "Sweden",
    description:
      "World's largest music streaming service with over 600 million monthly users and a leading podcast platform.",
  },
  {
    name: "YouTube",
    website: "https://youtube.com",
    industry: "Media",
    country: "United States",
    description:
      "Google-owned video sharing platform with 2.7 billion monthly users and a $30 billion advertising business.",
  },

  // ── Telecommunications ──
  {
    name: "AT&T",
    website: "https://att.com",
    industry: "Telecommunications",
    country: "United States",
    description:
      "American telecommunications giant providing wireless, broadband, and enterprise connectivity services.",
  },
  {
    name: "Verizon",
    website: "https://verizon.com",
    industry: "Telecommunications",
    country: "United States",
    description:
      "US wireless carrier with the largest 4G/5G network, providing consumer, enterprise, and media services.",
  },
  {
    name: "T-Mobile",
    website: "https://t-mobile.com",
    industry: "Telecommunications",
    country: "United States",
    description:
      "US 5G leader with the largest nationwide 5G network, known for disruptive Un-carrier strategy.",
  },
  {
    name: "Vodafone",
    website: "https://vodafone.com",
    industry: "Telecommunications",
    country: "United Kingdom",
    description:
      "British multinational telecom with mobile, broadband, and IoT services across Europe and Africa.",
  },
  {
    name: "Deutsche Telekom",
    website: "https://telekom.com",
    industry: "Telecommunications",
    country: "Germany",
    description:
      "Germany's largest telecom company operating T-Mobile US and European fixed and mobile networks.",
  },
  {
    name: "SoftBank",
    website: "https://softbank.jp",
    industry: "Telecommunications",
    country: "Japan",
    description:
      "Japanese telecom and investment giant managing the $100B Vision Fund and telecom services in Japan.",
  },
  {
    name: "NTT",
    website: "https://ntt.com",
    industry: "Telecommunications",
    country: "Japan",
    description:
      "Japan's largest telecom company providing internet, telephone, cloud, and data center services globally.",
  },
  {
    name: "SK Telecom",
    website: "https://sktelecom.com",
    industry: "Telecommunications",
    country: "South Korea",
    description:
      "South Korea's leading mobile carrier, a pioneer in 5G commercialization, and AI services provider.",
  },
  {
    name: "KT Corporation",
    website: "https://kt.com",
    industry: "Telecommunications",
    country: "South Korea",
    description:
      "South Korean telecom company providing wired, wireless, and internet services plus AI and B2B solutions.",
  },
  {
    name: "China Mobile",
    website: "https://chinamobileltd.com",
    industry: "Telecommunications",
    country: "China",
    description:
      "World's largest mobile network operator by subscribers with over 950 million mobile customers.",
  },
  {
    name: "China Unicom",
    website: "https://chinaunicom.com.hk",
    industry: "Telecommunications",
    country: "China",
    description:
      "Chinese state-owned telecom providing mobile, broadband, and cloud services across mainland China.",
  },
  {
    name: "Bharti Airtel",
    website: "https://airtel.in",
    industry: "Telecommunications",
    country: "India",
    description:
      "India's largest private telecom company with mobile, broadband, and enterprise solutions across 18 countries.",
  },
  {
    name: "Reliance Jio",
    website: "https://jio.com",
    industry: "Telecommunications",
    country: "India",
    description:
      "India's largest telecom by subscribers, disrupting the market with affordable 4G/5G data plans.",
  },
  {
    name: "Orange",
    website: "https://orange.com",
    industry: "Telecommunications",
    country: "France",
    description:
      "French multinational telecom operating mobile and broadband networks in 26 countries in Europe and Africa.",
  },
  {
    name: "Telefónica",
    website: "https://telefonica.com",
    industry: "Telecommunications",
    country: "Spain",
    description:
      "Spanish multinational telecom operating in Europe and Latin America under Movistar and O2 brands.",
  },
  {
    name: "Telstra",
    website: "https://telstra.com.au",
    industry: "Telecommunications",
    country: "Australia",
    description:
      "Australia's largest telecom company providing 5G networks, internet, and digital services.",
  },

  // ── Logistics ──
  {
    name: "FedEx",
    website: "https://fedex.com",
    industry: "Logistics",
    country: "United States",
    description:
      "Global courier delivery services company known for overnight shipping, freight, and supply chain solutions.",
  },
  {
    name: "UPS",
    website: "https://ups.com",
    industry: "Logistics",
    country: "United States",
    description:
      "World's largest package delivery company delivering 24 million packages per day in 220+ countries.",
  },
  {
    name: "DHL",
    website: "https://dhl.com",
    industry: "Logistics",
    country: "Germany",
    description:
      "World's leading international express courier and logistics company operating in 220+ countries.",
  },
  {
    name: "Maersk",
    website: "https://maersk.com",
    industry: "Logistics",
    country: "Denmark",
    description:
      "World's largest container shipping company transporting 20% of global seaborne trade.",
  },
  {
    name: "XPO Logistics",
    website: "https://xpo.com",
    industry: "Logistics",
    country: "United States",
    description:
      "Global transportation and logistics company specializing in less-than-truckload freight services.",
  },
  {
    name: "Kuehne + Nagel",
    website: "https://kuehne-nagel.com",
    industry: "Logistics",
    country: "Switzerland",
    description:
      "Swiss logistics company providing air, sea, road freight, and contract logistics globally.",
  },
  {
    name: "DB Schenker",
    website: "https://dbschenker.com",
    industry: "Logistics",
    country: "Germany",
    description:
      "One of the world's leading logistics providers in land, air, and ocean freight and contract logistics.",
  },
  {
    name: "Nippon Express",
    website: "https://nipponexpress.com",
    industry: "Logistics",
    country: "Japan",
    description:
      "Japanese logistics company providing freight forwarding, warehousing, and global supply chain services.",
  },
  {
    name: "Ceva Logistics",
    website: "https://cevalogistics.com",
    industry: "Logistics",
    country: "Netherlands",
    description:
      "Global third-party logistics provider offering contract logistics and freight management services.",
  },
  {
    name: "Bolloré Logistics",
    website: "https://bollore-logistics.com",
    industry: "Logistics",
    country: "France",
    description:
      "International freight and logistics company specializing in supply chain management across Africa and Asia.",
  },
  {
    name: "Expeditors",
    website: "https://expeditors.com",
    industry: "Logistics",
    country: "United States",
    description:
      "Global logistics company specializing in customs brokerage, freight consolidation, and supply chain management.",
  },
  {
    name: "J.B. Hunt Transport",
    website: "https://jbhunt.com",
    industry: "Logistics",
    country: "United States",
    description:
      "American trucking and freight transportation company with intermodal, truckload, and final-mile services.",
  },

  // ── Food & Beverage ──
  {
    name: "Nestle",
    website: "https://nestle.com",
    industry: "Food & Beverage",
    country: "Switzerland",
    description:
      "World's largest food and beverage company with 2,000+ brands including Nescafé, KitKat, and Purina.",
  },
  {
    name: "Unilever",
    website: "https://unilever.com",
    industry: "Consumer Goods",
    country: "United Kingdom",
    description:
      "Global consumer goods company with 400+ brands in food, beverages, cleaning agents, and personal care.",
  },
  {
    name: "Coca-Cola",
    website: "https://coca-colacompany.com",
    industry: "Food & Beverage",
    country: "United States",
    description:
      "World's largest beverage company with over 200 brands and 500+ sparkling and still beverages.",
  },
  {
    name: "PepsiCo",
    website: "https://pepsico.com",
    industry: "Food & Beverage",
    country: "United States",
    description:
      "Global food and beverage giant owning Pepsi, Lay's, Quaker Oats, Gatorade, and Tropicana.",
  },
  {
    name: "AB InBev",
    website: "https://ab-inbev.com",
    industry: "Food & Beverage",
    country: "Belgium",
    description:
      "World's largest brewer producing Budweiser, Stella Artois, Corona, and 500+ beer brands globally.",
  },
  {
    name: "Heineken",
    website: "https://heineken.com",
    industry: "Food & Beverage",
    country: "Netherlands",
    description:
      "Dutch brewing company producing Heineken, Desperados, Sol, and 300+ beers in 190+ countries.",
  },
  {
    name: "Diageo",
    website: "https://diageo.com",
    industry: "Food & Beverage",
    country: "United Kingdom",
    description:
      "Global leader in premium spirits producing Johnnie Walker, Guinness, Baileys, and Smirnoff.",
  },
  {
    name: "McDonald's",
    website: "https://mcdonalds.com",
    industry: "Food & Beverage",
    country: "United States",
    description:
      "World's largest fast-food chain with 40,000+ restaurants in 100+ countries serving 70 million daily.",
  },
  {
    name: "Starbucks",
    website: "https://starbucks.com",
    industry: "Food & Beverage",
    country: "United States",
    description:
      "American premium coffee chain with 35,000+ stores globally, known for customized beverages and rewards app.",
  },
  {
    name: "Yum! Brands",
    website: "https://yum.com",
    industry: "Food & Beverage",
    country: "United States",
    description:
      "Restaurant company operating KFC, Pizza Hut, and Taco Bell with 55,000+ locations worldwide.",
  },
  {
    name: "Restaurant Brands International",
    website: "https://rbi.com",
    industry: "Food & Beverage",
    country: "Canada",
    description:
      "Fast food holding company owning Burger King, Tim Hortons, Popeyes, and Firehouse Subs.",
  },
  {
    name: "Danone",
    website: "https://danone.com",
    industry: "Food & Beverage",
    country: "France",
    description:
      "French multinational food company in dairy (Activia, Evian), plant-based, and specialized nutrition.",
  },
  {
    name: "Kerry Group",
    website: "https://kerrygroup.com",
    industry: "Food & Beverage",
    country: "Ireland",
    description:
      "Taste and nutrition company providing ingredients and solutions for the global food and beverage industry.",
  },
  {
    name: "Kraft Heinz",
    website: "https://kraftheinzcompany.com",
    industry: "Food & Beverage",
    country: "United States",
    description:
      "Food and beverage company behind Heinz ketchup, Kraft cheese, Oscar Mayer, and Philadelphia cream cheese.",
  },
  {
    name: "General Mills",
    website: "https://generalmills.com",
    industry: "Food & Beverage",
    country: "United States",
    description:
      "Consumer food company behind Cheerios, Häagen-Dazs, Betty Crocker, and Nature Valley brands.",
  },
  {
    name: "Mondelez",
    website: "https://mondelezinternational.com",
    industry: "Food & Beverage",
    country: "United States",
    description:
      "Global snacking company behind Oreo, Cadbury, Milka, Ritz crackers, and Toblerone chocolate.",
  },

  // ── Consumer Goods ──
  {
    name: "Procter & Gamble",
    website: "https://pg.com",
    industry: "Consumer Goods",
    country: "United States",
    description:
      "Consumer goods corporation with iconic brands like Tide, Pampers, Gillette, Oral-B, and Pantene.",
  },
  {
    name: "L'Oreal",
    website: "https://loreal.com",
    industry: "Consumer Goods",
    country: "France",
    description:
      "World's largest cosmetics company offering skincare, haircare, makeup, and fragrance across all market segments.",
  },
  {
    name: "LVMH",
    website: "https://lvmh.com",
    industry: "Consumer Goods",
    country: "France",
    description:
      "World's largest luxury goods conglomerate owning Louis Vuitton, Dior, Bulgari, Tiffany, and Moët Hennessy.",
  },
  {
    name: "Kering",
    website: "https://kering.com",
    industry: "Consumer Goods",
    country: "France",
    description:
      "French luxury group owning Gucci, Saint Laurent, Balenciaga, Bottega Veneta, and Alexander McQueen.",
  },
  {
    name: "Henkel",
    website: "https://henkel.com",
    industry: "Consumer Goods",
    country: "Germany",
    description:
      "German consumer goods company behind Persil, Schwarzkopf hair care, Loctite adhesives, and Fa body care.",
  },
  {
    name: "Colgate-Palmolive",
    website: "https://colgatepalmolive.com",
    industry: "Consumer Goods",
    country: "United States",
    description:
      "Consumer products company focused on oral care, personal care, home care, and pet nutrition globally.",
  },
  {
    name: "Kimberly-Clark",
    website: "https://kimberly-clark.com",
    industry: "Consumer Goods",
    country: "United States",
    description:
      "Personal care company behind Huggies, Kleenex, Scott, and Kotex sold in 175+ countries.",
  },
  {
    name: "Reckitt",
    website: "https://reckitt.com",
    industry: "Consumer Goods",
    country: "United Kingdom",
    description:
      "Consumer goods company behind Dettol, Nurofen, Durex, and Lysol healthcare and hygiene products.",
  },
  {
    name: "Estee Lauder",
    website: "https://elcompanies.com",
    industry: "Consumer Goods",
    country: "United States",
    description:
      "American luxury cosmetics company owning MAC, Clinique, La Mer, Bobbi Brown, and Jo Malone brands.",
  },
  {
    name: "Church & Dwight",
    website: "https://churchdwight.com",
    industry: "Consumer Goods",
    country: "United States",
    description:
      "Consumer products company behind Arm & Hammer, OxiClean, Trojan, and Vitafusion vitamins.",
  },

  // ── Real Estate ──
  {
    name: "CBRE Group",
    website: "https://cbre.com",
    industry: "Real Estate",
    country: "United States",
    description:
      "World's largest commercial real estate services company with advisory, property management, and investment services.",
  },
  {
    name: "Jones Lang LaSalle",
    website: "https://jll.com",
    industry: "Real Estate",
    country: "United States",
    description:
      "Global commercial real estate firm providing leasing, property management, and capital markets services.",
  },
  {
    name: "Brookfield Asset Management",
    website: "https://brookfield.com",
    industry: "Real Estate",
    country: "Canada",
    description:
      "Global alternative asset manager with $850+ billion in AUM across real estate, infrastructure, and renewables.",
  },
  {
    name: "Prologis",
    website: "https://prologis.com",
    industry: "Real Estate",
    country: "United States",
    description:
      "World's largest industrial REIT owning logistics and distribution facilities in 19 countries.",
  },
  {
    name: "Simon Property Group",
    website: "https://simon.com",
    industry: "Real Estate",
    country: "United States",
    description:
      "America's largest mall REIT operating premium outlets, malls, and mixed-use properties.",
  },
  {
    name: "American Tower",
    website: "https://americantower.com",
    industry: "Real Estate",
    country: "United States",
    description:
      "Largest cell tower REIT with 220,000+ communication sites in 25 countries for wireless carriers.",
  },
  {
    name: "Vonovia",
    website: "https://vonovia.de",
    industry: "Real Estate",
    country: "Germany",
    description:
      "Germany's largest residential real estate company managing 490,000+ apartments across Europe.",
  },
  {
    name: "Unibail-Rodamco-Westfield",
    website: "https://urw.com",
    industry: "Real Estate",
    country: "France",
    description:
      "Europe's largest listed commercial real estate company specializing in flagship shopping centers.",
  },

  // ── Education ──
  {
    name: "Coursera",
    website: "https://coursera.org",
    industry: "Education",
    country: "United States",
    description:
      "Online learning platform partnering with 300+ universities offering degrees, certificates, and professional courses.",
  },
  {
    name: "Udemy",
    website: "https://udemy.com",
    industry: "Education",
    country: "United States",
    description:
      "Online learning marketplace with 200,000+ courses in technology, business, arts, and personal development.",
  },
  {
    name: "Duolingo",
    website: "https://duolingo.com",
    industry: "Education",
    country: "United States",
    description:
      "World's most popular language learning app with 500+ million users learning 40+ languages.",
  },
  {
    name: "Chegg",
    website: "https://chegg.com",
    industry: "Education",
    country: "United States",
    description:
      "Student-first connected learning platform providing textbook rentals, tutoring, and course help.",
  },
  {
    name: "Byju's",
    website: "https://byjus.com",
    industry: "Education",
    country: "India",
    description:
      "Indian edtech startup offering personalized K-12 learning app and test prep to 150 million students.",
  },
  {
    name: "2U",
    website: "https://2u.com",
    industry: "Education",
    country: "United States",
    description:
      "EdTech company partnering with top universities to deliver online degrees and bootcamp programs.",
  },

  // ── Agriculture ──
  {
    name: "Bunge",
    website: "https://bunge.com",
    industry: "Agriculture",
    country: "United States",
    description:
      "Global agribusiness and food company operating in oilseed processing, grain trading, and food production.",
  },
  {
    name: "Cargill",
    website: "https://cargill.com",
    industry: "Agriculture",
    country: "United States",
    description:
      "World's largest privately held company in agricultural commodities, food, and financial and industrial products.",
  },
  {
    name: "ADM",
    website: "https://adm.com",
    industry: "Agriculture",
    country: "United States",
    description:
      "Global agricultural origination and processing company transforming crops into food and feed ingredients.",
  },
  {
    name: "Syngenta",
    website: "https://syngenta.com",
    industry: "Agriculture",
    country: "Switzerland",
    description:
      "Global agribusiness company owned by ChemChina, specializing in seeds, crop protection, and digital farming.",
  },
  {
    name: "Corteva Agriscience",
    website: "https://corteva.com",
    industry: "Agriculture",
    country: "United States",
    description:
      "Agriculture company developing Pioneer seeds, Brevant brands, and Encirca precision farming services.",
  },
  {
    name: "Nutrien",
    website: "https://nutrien.com",
    industry: "Agriculture",
    country: "Canada",
    description:
      "World's largest provider of crop nutrients (potash, nitrogen, phosphate) and agricultural retail services.",
  },
  {
    name: "CF Industries",
    website: "https://cfindustries.com",
    industry: "Agriculture",
    country: "United States",
    description:
      "Leading manufacturer and distributor of nitrogen fertilizers and other agricultural chemicals globally.",
  },

  // ── Chemicals ──
  {
    name: "BASF",
    website: "https://basf.com",
    industry: "Chemicals",
    country: "Germany",
    description:
      "World's largest chemical company producing chemicals, plastics, performance products, and agricultural solutions.",
  },
  {
    name: "Dow",
    website: "https://dow.com",
    industry: "Chemicals",
    country: "United States",
    description:
      "American chemical corporation producing plastics, industrial intermediates, coatings, and silicones.",
  },
  {
    name: "DuPont",
    website: "https://dupont.com",
    industry: "Chemicals",
    country: "United States",
    description:
      "Specialty chemical company known for Kevlar, Teflon, and materials for electronics, water, and construction.",
  },
  {
    name: "LyondellBasell",
    website: "https://lyondellbasell.com",
    industry: "Chemicals",
    country: "Netherlands",
    description:
      "World's largest producer of polypropylene and polyethylene compounds for packaging and automotive.",
  },
  {
    name: "Covestro",
    website: "https://covestro.com",
    industry: "Chemicals",
    country: "Germany",
    description:
      "German specialty chemicals company producing polyurethanes and polycarbonates for automotive and construction.",
  },
  {
    name: "Eastman Chemical",
    website: "https://eastman.com",
    industry: "Chemicals",
    country: "United States",
    description:
      "Specialty chemical company making materials, additives, and functional products for consumer and industrial uses.",
  },
  {
    name: "Air Liquide",
    website: "https://airliquide.com",
    industry: "Chemicals",
    country: "France",
    description:
      "World's largest industrial gas company supplying oxygen, nitrogen, hydrogen, and rare gases globally.",
  },
  {
    name: "Linde",
    website: "https://linde.com",
    industry: "Chemicals",
    country: "Ireland",
    description:
      "World's largest industrial gas company by revenue, serving healthcare, manufacturing, and energy industries.",
  },

  // ── Mining ──
  {
    name: "BHP",
    website: "https://bhp.com",
    industry: "Mining",
    country: "Australia",
    description:
      "World's largest mining company extracting iron ore, copper, coal, and nickel across 90+ locations.",
  },
  {
    name: "Rio Tinto",
    website: "https://riotinto.com",
    industry: "Mining",
    country: "Australia",
    description:
      "Global mining group producing iron ore, copper, diamonds, aluminum, and minerals critical for clean energy.",
  },
  {
    name: "Vale",
    website: "https://vale.com",
    industry: "Mining",
    country: "Brazil",
    description:
      "World's largest iron ore and nickel producer, supplying raw materials for steel and battery manufacturing.",
  },
  {
    name: "Glencore",
    website: "https://glencore.com",
    industry: "Mining",
    country: "Switzerland",
    description:
      "Global mining and trading company in coal, copper, cobalt, zinc, and nickel with integrated trading operations.",
  },
  {
    name: "Anglo American",
    website: "https://angloamerican.com",
    industry: "Mining",
    country: "United Kingdom",
    description:
      "Diversified miner producing diamonds (De Beers), platinum, copper, iron ore, and coal.",
  },
  {
    name: "Freeport-McMoRan",
    website: "https://fcx.com",
    industry: "Mining",
    country: "United States",
    description:
      "World's largest publicly traded copper producer with operations in Americas, Africa, and Indonesia.",
  },
  {
    name: "Newmont",
    website: "https://newmont.com",
    industry: "Mining",
    country: "United States",
    description:
      "World's largest gold mining company with operations in Americas, Africa, Australia, and Papua New Guinea.",
  },
  {
    name: "Barrick Gold",
    website: "https://barrick.com",
    industry: "Mining",
    country: "Canada",
    description:
      "World's second-largest gold mining company with mines in 13 countries across five continents.",
  },
  {
    name: "Norilsk Nickel",
    website: "https://nornickel.com",
    industry: "Mining",
    country: "Russia",
    description:
      "World's largest producer of nickel and palladium, also producing copper, cobalt, and platinum.",
  },

  // ── Additional Technology Companies ──
  {
    name: "Broadcom",
    website: "https://broadcom.com",
    industry: "Technology",
    country: "United States",
    description:
      "Semiconductor and infrastructure software company making chips for data centers, networking, and storage.",
  },
  {
    name: "Texas Instruments",
    website: "https://ti.com",
    industry: "Technology",
    country: "United States",
    description:
      "Semiconductor company designing analog chips, embedded processors, and calculators for industrial and automotive.",
  },
  {
    name: "Micron Technology",
    website: "https://micron.com",
    industry: "Technology",
    country: "United States",
    description:
      "US semiconductor company manufacturing DRAM, NAND flash memory, and solid-state drives.",
  },
  {
    name: "Western Digital",
    website: "https://westerndigital.com",
    industry: "Technology",
    country: "United States",
    description:
      "Data storage company producing hard drives, solid-state drives, and flash storage for consumers and enterprises.",
  },
  {
    name: "Seagate",
    website: "https://seagate.com",
    industry: "Technology",
    country: "United States",
    description:
      "Data storage company specializing in hard disk drives and solid-state drives for enterprise and cloud.",
  },
  {
    name: "Pure Storage",
    website: "https://purestorage.com",
    industry: "Technology",
    country: "United States",
    description:
      "All-flash storage company offering data infrastructure for cloud, AI, and enterprise applications.",
  },
  {
    name: "NetApp",
    website: "https://netapp.com",
    industry: "Technology",
    country: "United States",
    description:
      "Hybrid cloud data services and storage solutions company for enterprise IT environments.",
  },
  {
    name: "VMware",
    website: "https://vmware.com",
    industry: "Technology",
    country: "United States",
    description:
      "Cloud computing and virtualization technology company, acquired by Broadcom in 2023.",
  },
  {
    name: "Cisco",
    website: "https://cisco.com",
    industry: "Technology",
    country: "United States",
    description:
      "Global networking giant providing routers, switches, cybersecurity, and collaboration software.",
  },
  {
    name: "Juniper Networks",
    website: "https://juniper.net",
    industry: "Technology",
    country: "United States",
    description:
      "Networking equipment company providing AI-driven enterprise and data center networking solutions.",
  },
  {
    name: "F5",
    website: "https://f5.com",
    industry: "Technology",
    country: "United States",
    description:
      "Multi-cloud application security and delivery company protecting apps across hybrid environments.",
  },
  {
    name: "Akamai",
    website: "https://akamai.com",
    industry: "Technology",
    country: "United States",
    description:
      "Edge cloud platform providing CDN, cybersecurity, and cloud computing services globally.",
  },
  {
    name: "Fastly",
    website: "https://fastly.com",
    industry: "Technology",
    country: "United States",
    description:
      "Edge cloud platform delivering fast, secure, and scalable content delivery and security services.",
  },
  {
    name: "Rackspace",
    website: "https://rackspace.com",
    industry: "Technology",
    country: "United States",
    description:
      "Managed cloud services company helping businesses navigate multi-cloud environments.",
  },
  {
    name: "DigitalOcean",
    website: "https://digitalocean.com",
    industry: "Technology",
    country: "United States",
    description:
      "Cloud infrastructure provider focused on developers and small-to-medium businesses.",
  },
  {
    name: "Linode (Akamai)",
    website: "https://linode.com",
    industry: "Technology",
    country: "United States",
    description:
      "Developer-focused cloud hosting platform acquired by Akamai, offering affordable Linux virtual machines.",
  },
  {
    name: "Box",
    website: "https://box.com",
    industry: "Technology",
    country: "United States",
    description:
      "Cloud content management and file sharing service for enterprises with compliance and workflow tools.",
  },
  {
    name: "Zendesk",
    website: "https://zendesk.com",
    industry: "Technology",
    country: "United States",
    description:
      "Customer service software company offering ticketing, live chat, and help center platforms.",
  },
  {
    name: "Freshworks",
    website: "https://freshworks.com",
    industry: "Technology",
    country: "India",
    description:
      "SaaS company offering customer engagement software including CRM, helpdesk, and ITSM tools.",
  },
  {
    name: "Zoho",
    website: "https://zoho.com",
    industry: "Technology",
    country: "India",
    description:
      "Indian software company offering a comprehensive suite of 45+ business applications for global SMBs.",
  },
  {
    name: "Razorpay",
    website: "https://razorpay.com",
    industry: "Finance",
    country: "India",
    description:
      "India's leading payment gateway enabling businesses to accept, process, and disburse payments online.",
  },
  {
    name: "Paytm",
    website: "https://paytm.com",
    industry: "Finance",
    country: "India",
    description:
      "Indian digital payments and financial services platform with 350 million registered users.",
  },
  {
    name: "PhonePe",
    website: "https://phonepe.com",
    industry: "Finance",
    country: "India",
    description:
      "India's largest UPI-based digital payments platform backed by Walmart with 500 million users.",
  },
  {
    name: "Klarna",
    website: "https://klarna.com",
    industry: "Finance",
    country: "Sweden",
    description:
      "Swedish fintech providing buy now, pay later services to 150 million consumers in 45 countries.",
  },
  {
    name: "Wise",
    website: "https://wise.com",
    industry: "Finance",
    country: "United Kingdom",
    description:
      "International money transfer service offering low-cost currency exchange for individuals and businesses.",
  },
  {
    name: "Revolut",
    website: "https://revolut.com",
    industry: "Finance",
    country: "United Kingdom",
    description:
      "British neobank with 35+ million customers offering multi-currency accounts, crypto, and stock trading.",
  },
  {
    name: "N26",
    website: "https://n26.com",
    industry: "Finance",
    country: "Germany",
    description:
      "German digital bank offering mobile banking, investments, and insurance across Europe and the US.",
  },
  {
    name: "Monzo",
    website: "https://monzo.com",
    industry: "Finance",
    country: "United Kingdom",
    description:
      "UK digital challenger bank with 7 million customers known for instant spending notifications and no-fee travel.",
  },
  {
    name: "Starling Bank",
    website: "https://starlingbank.com",
    industry: "Finance",
    country: "United Kingdom",
    description:
      "British digital bank founded by Anne Boden, offering personal and business accounts with no monthly fees.",
  },
  {
    name: "Chime",
    website: "https://chime.com",
    industry: "Finance",
    country: "United States",
    description:
      "US neobank offering fee-free checking, savings, and credit-builder accounts to underbanked Americans.",
  },
  {
    name: "SoFi",
    website: "https://sofi.com",
    industry: "Finance",
    country: "United States",
    description:
      "Personal finance company offering student loan refinancing, mortgages, investing, and banking products.",
  },
  {
    name: "Blend Labs",
    website: "https://blend.com",
    industry: "Finance",
    country: "United States",
    description:
      "Cloud banking platform helping financial institutions streamline mortgage, auto, and consumer lending.",
  },

  // ── Reliance Industries and Asian Conglomerates ──
  {
    name: "Reliance Industries",
    website: "https://ril.com",
    industry: "Conglomerate",
    country: "India",
    description:
      "India's largest company by revenue in oil refining, petrochemicals, telecom (Jio), and retail (Reliance Retail).",
  },
  {
    name: "Tata Group",
    website: "https://tata.com",
    industry: "Conglomerate",
    country: "India",
    description:
      "Indian multinational conglomerate in steel, automotive, IT services, hotels, and consumer products.",
  },
  {
    name: "Samsung Group",
    website: "https://samsung.com",
    industry: "Conglomerate",
    country: "South Korea",
    description:
      "South Korean chaebol encompassing electronics, construction, insurance, and heavy industries.",
  },
  {
    name: "LG Electronics",
    website: "https://lg.com",
    industry: "Technology",
    country: "South Korea",
    description:
      "South Korean electronics giant producing OLED TVs, appliances, mobile devices, and EV components.",
  },
  {
    name: "SK Hynix",
    website: "https://skhynix.com",
    industry: "Technology",
    country: "South Korea",
    description:
      "South Korean semiconductor company and world's second-largest DRAM and NAND flash memory manufacturer.",
  },
  {
    name: "SoftBank Group",
    website: "https://softbank.jp",
    industry: "Conglomerate",
    country: "Japan",
    description:
      "Japanese telecom and investment conglomerate managing the $100B Vision Fund portfolio.",
  },
  {
    name: "Mitsubishi Corporation",
    website: "https://mitsubishicorp.com",
    industry: "Conglomerate",
    country: "Japan",
    description:
      "Japanese trading company with diversified businesses in energy, metals, machinery, chemicals, and food.",
  },
  {
    name: "Mitsui & Co",
    website: "https://mitsui.com",
    industry: "Conglomerate",
    country: "Japan",
    description:
      "Japanese sogo shosha trading company engaged in metals, machinery, infrastructure, and chemicals.",
  },
  {
    name: "Ping An Insurance",
    website: "https://pingan.com",
    industry: "Insurance",
    country: "China",
    description:
      "China's largest insurance company by premium income with fintech subsidiaries including Ping An Good Doctor.",
  },
  {
    name: "China Life Insurance",
    website: "https://chinalife.com.cn",
    industry: "Insurance",
    country: "China",
    description:
      "Largest life insurer in China providing individual and group life, health, and accident insurance.",
  },
  {
    name: "Manulife",
    website: "https://manulife.com",
    industry: "Insurance",
    country: "Canada",
    description:
      "Canadian multinational insurance and financial services company with strong Asia-Pacific operations.",
  },
  {
    name: "Sun Life Financial",
    website: "https://sunlife.com",
    industry: "Insurance",
    country: "Canada",
    description:
      "International financial services company providing insurance, wealth, and asset management globally.",
  },
  {
    name: "Bombardier",
    website: "https://bombardier.com",
    industry: "Aerospace",
    country: "Canada",
    description:
      "Canadian manufacturer of business jets (Learjet, Global, Challenger) and rail transportation equipment.",
  },
  {
    name: "Singapore Airlines",
    website: "https://singaporeair.com",
    industry: "Logistics",
    country: "Singapore",
    description:
      "World-class airline known for premium service, operating routes across 35 countries globally.",
  },
  // ── Additional Global Companies ──
  {
    name: "Palantir",
    website: "https://palantir.com",
    industry: "Artificial Intelligence",
    country: "United States",
    description:
      "Big data analytics platform for government and enterprise clients.",
  },
  {
    name: "UiPath",
    website: "https://uipath.com",
    industry: "Technology",
    country: "United States",
    description:
      "Robotic process automation platform for enterprise workflows.",
  },
  {
    name: "Automation Anywhere",
    website: "https://automationanywhere.com",
    industry: "Technology",
    country: "United States",
    description: "Intelligent automation platform using RPA and AI.",
  },
  {
    name: "Blue Prism",
    website: "https://blueprism.com",
    industry: "Technology",
    country: "United Kingdom",
    description: "Robotic process automation software for enterprise.",
  },
  {
    name: "WorkFusion",
    website: "https://workfusion.com",
    industry: "Technology",
    country: "United States",
    description: "Intelligent automation for banking and financial services.",
  },
  {
    name: "Appian",
    website: "https://appian.com",
    industry: "Technology",
    country: "United States",
    description: "Low-code platform for building enterprise applications.",
  },
  {
    name: "OutSystems",
    website: "https://outsystems.com",
    industry: "Technology",
    country: "Portugal",
    description:
      "High-performance low-code platform for enterprise applications.",
  },
  {
    name: "Mendix",
    website: "https://mendix.com",
    industry: "Technology",
    country: "Netherlands",
    description: "Low-code platform for building apps faster and at scale.",
  },
  {
    name: "Betty Blocks",
    website: "https://bettyblocks.com",
    industry: "Technology",
    country: "Netherlands",
    description: "No-code platform for citizen developers.",
  },
  {
    name: "Zoho",
    website: "https://zoho.com",
    industry: "Technology",
    country: "India",
    description: "Cloud-based business software suite for all business needs.",
  },
  {
    name: "Freshdesk",
    website: "https://freshdesk.com",
    industry: "Technology",
    country: "India",
    description: "Cloud-based customer support software platform.",
  },
  {
    name: "Intercom",
    website: "https://intercom.com",
    industry: "Technology",
    country: "Ireland",
    description:
      "Customer messaging platform for sales, marketing, and support.",
  },
  {
    name: "Drift",
    website: "https://drift.com",
    industry: "Technology",
    country: "United States",
    description: "Conversational marketing and sales platform.",
  },
  {
    name: "Qualified",
    website: "https://qualified.com",
    industry: "Technology",
    country: "United States",
    description: "Conversational marketing platform for B2B companies.",
  },
  {
    name: "Gong",
    website: "https://gong.io",
    industry: "Technology",
    country: "United States",
    description: "Revenue intelligence platform for sales teams.",
  },
  {
    name: "Chorus.ai",
    website: "https://chorus.ai",
    industry: "Technology",
    country: "United States",
    description: "Conversation intelligence platform for sales teams.",
  },
  {
    name: "Clari",
    website: "https://clari.com",
    industry: "Technology",
    country: "United States",
    description: "Revenue operations platform powered by AI.",
  },
  {
    name: "Outreach",
    website: "https://outreach.io",
    industry: "Technology",
    country: "United States",
    description: "Sales execution platform for engagement and forecasting.",
  },
  {
    name: "Salesloft",
    website: "https://salesloft.com",
    industry: "Technology",
    country: "United States",
    description: "Revenue orchestration platform for modern sales teams.",
  },
  {
    name: "Apollo.io",
    website: "https://apollo.io",
    industry: "Technology",
    country: "United States",
    description: "Sales intelligence and engagement platform.",
  },
  {
    name: "ZoomInfo",
    website: "https://zoominfo.com",
    industry: "Technology",
    country: "United States",
    description: "Go-to-market intelligence platform for B2B companies.",
  },
  {
    name: "Lusha",
    website: "https://lusha.com",
    industry: "Technology",
    country: "Israel",
    description: "B2B contact data and sales intelligence platform.",
  },
  {
    name: "Clearbit",
    website: "https://clearbit.com",
    industry: "Technology",
    country: "United States",
    description: "Data enrichment platform for B2B marketing and sales.",
  },
  {
    name: "6sense",
    website: "https://6sense.com",
    industry: "Technology",
    country: "United States",
    description: "Account engagement platform for B2B revenue teams.",
  },
  {
    name: "Demandbase",
    website: "https://demandbase.com",
    industry: "Technology",
    country: "United States",
    description: "Account-based marketing and sales platform.",
  },
  {
    name: "Terminus",
    website: "https://terminus.com",
    industry: "Technology",
    country: "United States",
    description: "Account-based marketing platform for B2B companies.",
  },
  {
    name: "RollWorks",
    website: "https://rollworks.com",
    industry: "Technology",
    country: "United States",
    description: "Account-based marketing platform for B2B growth.",
  },
  {
    name: "Metadata.io",
    website: "https://metadata.io",
    industry: "Technology",
    country: "United States",
    description: "Demand generation platform for B2B marketers.",
  },
  {
    name: "Integrate",
    website: "https://integrate.com",
    industry: "Technology",
    country: "United States",
    description: "Demand acceleration platform for precision demand marketing.",
  },
  {
    name: "Bombora",
    website: "https://bombora.com",
    industry: "Technology",
    country: "United States",
    description: "B2B intent data and marketing solutions.",
  },
  {
    name: "TechTarget",
    website: "https://techtarget.com",
    industry: "Technology",
    country: "United States",
    description:
      "Purchase intent data and content for B2B technology marketing.",
  },
  {
    name: "G2",
    website: "https://g2.com",
    industry: "Technology",
    country: "United States",
    description: "Software peer reviews and market research platform.",
  },
  {
    name: "Capterra",
    website: "https://capterra.com",
    industry: "Technology",
    country: "United States",
    description: "Software discovery and reviews platform for businesses.",
  },
  {
    name: "Trustpilot",
    website: "https://trustpilot.com",
    industry: "Technology",
    country: "Denmark",
    description: "Online review community connecting businesses and consumers.",
  },
  {
    name: "Bazaarvoice",
    website: "https://bazaarvoice.com",
    industry: "Technology",
    country: "United States",
    description: "Network for product reviews and user-generated content.",
  },
  {
    name: "Yotpo",
    website: "https://yotpo.com",
    industry: "Technology",
    country: "United States",
    description: "eCommerce marketing platform for reviews and loyalty.",
  },
  {
    name: "Okendo",
    website: "https://okendo.io",
    industry: "Technology",
    country: "Australia",
    description: "Customer marketing platform for Shopify brands.",
  },
  {
    name: "Stamped.io",
    website: "https://stamped.io",
    industry: "Technology",
    country: "United States",
    description: "Ratings and reviews platform for e-commerce.",
  },
  {
    name: "Judge.me",
    website: "https://judge.me",
    industry: "Technology",
    country: "United Kingdom",
    description: "Product reviews platform for Shopify stores.",
  },
  // ── Gaming ──
  {
    name: "Roblox",
    website: "https://roblox.com",
    industry: "Gaming",
    country: "United States",
    description: "Online game platform and game creation system.",
  },
  {
    name: "Epic Games",
    website: "https://epicgames.com",
    industry: "Gaming",
    country: "United States",
    description: "Video game developer and digital distribution platform.",
  },
  {
    name: "Unity Technologies",
    website: "https://unity.com",
    industry: "Gaming",
    country: "United States",
    description: "Real-time 3D development platform for games and simulations.",
  },
  {
    name: "Valve",
    website: "https://valvesoftware.com",
    industry: "Gaming",
    country: "United States",
    description: "Game developer and Steam digital distribution platform.",
  },
  {
    name: "Blizzard Entertainment",
    website: "https://blizzard.com",
    industry: "Gaming",
    country: "United States",
    description: "Video game developer of World of Warcraft, Diablo, and more.",
  },
  {
    name: "Riot Games",
    website: "https://riotgames.com",
    industry: "Gaming",
    country: "United States",
    description: "Video game developer of League of Legends and Valorant.",
  },
  {
    name: "Electronic Arts",
    website: "https://ea.com",
    industry: "Gaming",
    country: "United States",
    description: "Global video game company behind FIFA, Madden, and more.",
  },
  {
    name: "Take-Two Interactive",
    website: "https://take2games.com",
    industry: "Gaming",
    country: "United States",
    description: "Video game holding company with Rockstar and 2K Studios.",
  },
  {
    name: "Square Enix",
    website: "https://square-enix-games.com",
    industry: "Gaming",
    country: "Japan",
    description:
      "Japanese video game developer of Final Fantasy and Dragon Quest.",
  },
  {
    name: "Capcom",
    website: "https://capcom.com",
    industry: "Gaming",
    country: "Japan",
    description:
      "Japanese video game developer of Resident Evil and Street Fighter.",
  },
  {
    name: "Bandai Namco",
    website: "https://bandainamcoent.com",
    industry: "Gaming",
    country: "Japan",
    description: "Japanese video game and entertainment company.",
  },
  {
    name: "Konami",
    website: "https://konami.com",
    industry: "Gaming",
    country: "Japan",
    description: "Japanese video game, arcade, and entertainment company.",
  },
  {
    name: "Sega",
    website: "https://sega.com",
    industry: "Gaming",
    country: "Japan",
    description: "Japanese video game developer and publisher.",
  },
  {
    name: "CD Projekt",
    website: "https://cdprojekt.com",
    industry: "Gaming",
    country: "Poland",
    description:
      "Polish video game developer of The Witcher and Cyberpunk 2077.",
  },
  {
    name: "Ubisoft",
    website: "https://ubisoft.com",
    industry: "Gaming",
    country: "France",
    description: "French video game developer of Assassin's Creed and Far Cry.",
  },
  {
    name: "Supercell",
    website: "https://supercell.com",
    industry: "Gaming",
    country: "Finland",
    description: "Mobile game developer of Clash of Clans and Brawl Stars.",
  },
  {
    name: "King",
    website: "https://king.com",
    industry: "Gaming",
    country: "United Kingdom",
    description: "Mobile game developer behind Candy Crush Saga.",
  },
  {
    name: "Zynga",
    website: "https://zynga.com",
    industry: "Gaming",
    country: "United States",
    description: "Mobile game company acquired by Take-Two Interactive.",
  },
  {
    name: "Niantic",
    website: "https://nianticlabs.com",
    industry: "Gaming",
    country: "United States",
    description: "Developer of Pokémon Go and augmented reality games.",
  },
  {
    name: "Kabam",
    website: "https://kabam.com",
    industry: "Gaming",
    country: "United States",
    description: "Mobile game developer known for Marvel Contest of Champions.",
  },
  {
    name: "Com2uS",
    website: "https://com2us.com",
    industry: "Gaming",
    country: "South Korea",
    description: "Korean mobile game developer and publisher.",
  },
  {
    name: "Nexon",
    website: "https://nexon.com",
    industry: "Gaming",
    country: "South Korea",
    description: "Korean online game developer and publisher.",
  },
  {
    name: "NCSoft",
    website: "https://ncsoft.com",
    industry: "Gaming",
    country: "South Korea",
    description: "Korean video game developer behind Lineage series.",
  },
  {
    name: "Krafton",
    website: "https://krafton.com",
    industry: "Gaming",
    country: "South Korea",
    description: "Game developer behind PUBG: Battlegrounds.",
  },
  // ── Logistics ──
  {
    name: "FedEx",
    website: "https://fedex.com",
    industry: "Logistics",
    country: "United States",
    description: "Global express delivery and logistics services.",
  },
  {
    name: "UPS",
    website: "https://ups.com",
    industry: "Logistics",
    country: "United States",
    description: "Package delivery and supply chain management company.",
  },
  {
    name: "DHL",
    website: "https://dhl.com",
    industry: "Logistics",
    country: "Germany",
    description: "International express and logistics services.",
  },
  {
    name: "XPO Logistics",
    website: "https://xpo.com",
    industry: "Logistics",
    country: "United States",
    description: "Technology-driven freight and logistics solutions.",
  },
  {
    name: "C.H. Robinson",
    website: "https://chrobinson.com",
    industry: "Logistics",
    country: "United States",
    description: "Third-party logistics and supply chain management.",
  },
  {
    name: "J.B. Hunt",
    website: "https://jbhunt.com",
    industry: "Logistics",
    country: "United States",
    description: "Intermodal transportation and logistics company.",
  },
  {
    name: "Werner Enterprises",
    website: "https://werner.com",
    industry: "Logistics",
    country: "United States",
    description: "Transportation and logistics services company.",
  },
  {
    name: "Old Dominion Freight Line",
    website: "https://odfl.com",
    industry: "Logistics",
    country: "United States",
    description: "Less-than-truckload transportation services.",
  },
  {
    name: "Saia Inc",
    website: "https://saia.com",
    industry: "Logistics",
    country: "United States",
    description:
      "Freight carrier offering LTL and other transportation services.",
  },
  {
    name: "Echo Global Logistics",
    website: "https://echo.com",
    industry: "Logistics",
    country: "United States",
    description: "Technology-enabled transportation management.",
  },
  {
    name: "GlobalTranz",
    website: "https://globaltranz.com",
    industry: "Logistics",
    country: "United States",
    description: "Technology-enabled freight brokerage and logistics.",
  },
  {
    name: "Coyote Logistics",
    website: "https://coyotelogistics.com",
    industry: "Logistics",
    country: "United States",
    description: "Technology-driven freight brokerage services.",
  },
  {
    name: "Transplace",
    website: "https://transplace.com",
    industry: "Logistics",
    country: "United States",
    description: "Transportation management and logistics solutions.",
  },
  {
    name: "Convoy",
    website: "https://convoy.com",
    industry: "Logistics",
    country: "United States",
    description: "Digital freight network for trucking and logistics.",
  },
  {
    name: "Uber Freight",
    website: "https://uberfreight.com",
    industry: "Logistics",
    country: "United States",
    description: "Freight logistics platform connecting shippers and carriers.",
  },
  {
    name: "Loadsmart",
    website: "https://loadsmart.com",
    industry: "Logistics",
    country: "United States",
    description: "Freight intelligence and automation platform.",
  },
  {
    name: "Freightos",
    website: "https://freightos.com",
    industry: "Logistics",
    country: "Israel",
    description: "Global online freight marketplace and management platform.",
  },
  {
    name: "Maersk",
    website: "https://maersk.com",
    industry: "Logistics",
    country: "Denmark",
    description: "Global container shipping and logistics company.",
  },
  {
    name: "MSC Mediterranean Shipping",
    website: "https://msc.com",
    industry: "Logistics",
    country: "Switzerland",
    description: "World's largest container shipping company.",
  },
  {
    name: "CMA CGM",
    website: "https://cmacgm-group.com",
    industry: "Logistics",
    country: "France",
    description: "French container shipping and logistics company.",
  },
  {
    name: "Kuehne+Nagel",
    website: "https://kuehne-nagel.com",
    industry: "Logistics",
    country: "Switzerland",
    description:
      "International logistics company for sea, air, and road transport.",
  },
  {
    name: "DB Schenker",
    website: "https://dbschenker.com",
    industry: "Logistics",
    country: "Germany",
    description: "Global logistics and supply chain management services.",
  },
  {
    name: "Panalpina",
    website: "https://dsv.com",
    industry: "Logistics",
    country: "Denmark",
    description: "Global transport and logistics solutions by DSV.",
  },
  {
    name: "Bolloré Logistics",
    website: "https://bollore-logistics.com",
    industry: "Logistics",
    country: "France",
    description: "Global supply chain operator and logistics services.",
  },
  // ── Space Tech ──
  {
    name: "SpaceX",
    website: "https://spacex.com",
    industry: "Aerospace",
    country: "United States",
    description:
      "Space exploration technologies manufacturer and launch provider.",
  },
  {
    name: "Blue Origin",
    website: "https://blueorigin.com",
    industry: "Aerospace",
    country: "United States",
    description:
      "Private space company developing orbital and suborbital rockets.",
  },
  {
    name: "Virgin Galactic",
    website: "https://virgingalactic.com",
    industry: "Aerospace",
    country: "United States",
    description: "Commercial spaceflight company for space tourism.",
  },
  {
    name: "Rocket Lab",
    website: "https://rocketlabusa.com",
    industry: "Aerospace",
    country: "United States",
    description:
      "Small launch vehicle provider and space systems manufacturer.",
  },
  {
    name: "Relativity Space",
    website: "https://relativityspace.com",
    industry: "Aerospace",
    country: "United States",
    description: "3D-printed rocket manufacturer for small satellites.",
  },
  {
    name: "Astra",
    website: "https://astra.com",
    industry: "Aerospace",
    country: "United States",
    description: "Commercial launch vehicle company for small satellites.",
  },
  {
    name: "Planet Labs",
    website: "https://planet.com",
    industry: "Aerospace",
    country: "United States",
    description:
      "Earth observation satellite company providing daily global imagery.",
  },
  {
    name: "Satellogic",
    website: "https://satellogic.com",
    industry: "Aerospace",
    country: "Argentina",
    description: "High-resolution satellite imagery services.",
  },
  {
    name: "Spire Global",
    website: "https://spire.com",
    industry: "Aerospace",
    country: "United States",
    description:
      "Space-based data, analytics, and services from satellite constellation.",
  },
  {
    name: "HawkEye 360",
    website: "https://he360.com",
    industry: "Aerospace",
    country: "United States",
    description: "Radio frequency data analytics from satellite constellation.",
  },
  {
    name: "Maxar Technologies",
    website: "https://maxar.com",
    industry: "Aerospace",
    country: "United States",
    description: "Space technology and intelligence solutions.",
  },
  {
    name: "Airbus Defence & Space",
    website: "https://airbus.com/en/products-services/space",
    industry: "Aerospace",
    country: "France",
    description: "Satellites, launchers, and exploration systems by Airbus.",
  },
  {
    name: "Thales Alenia Space",
    website: "https://thalesaleniaspace.com",
    industry: "Aerospace",
    country: "France",
    description: "Spacecraft systems, orbital infrastructure, and navigation.",
  },
  {
    name: "OHB SE",
    website: "https://ohb.de",
    industry: "Aerospace",
    country: "Germany",
    description: "European aerospace and technology company.",
  },
  {
    name: "ISRO",
    website: "https://isro.gov.in",
    industry: "Aerospace",
    country: "India",
    description: "Indian space research organization.",
  },
  {
    name: "OneWeb",
    website: "https://oneweb.net",
    industry: "Aerospace",
    country: "United Kingdom",
    description: "Low Earth orbit satellite internet constellation operator.",
  },
  {
    name: "Telesat",
    website: "https://telesat.com",
    industry: "Aerospace",
    country: "Canada",
    description:
      "Satellite operator and Lightspeed LEO constellation developer.",
  },
  {
    name: "Viasat",
    website: "https://viasat.com",
    industry: "Aerospace",
    country: "United States",
    description: "Global communications company with satellite services.",
  },
  {
    name: "Hughes Network Systems",
    website: "https://hughes.com",
    industry: "Aerospace",
    country: "United States",
    description: "Satellite internet service and technology provider.",
  },
  // ── Additional Technology – United States ──
  {
    name: "Palantir Technologies",
    website: "https://palantir.com",
    industry: "Technology",
    country: "United States",
    description:
      "Data analytics platform for government and commercial clients.",
  },
  {
    name: "Snowflake",
    website: "https://snowflake.com",
    industry: "Technology",
    country: "United States",
    description: "Cloud-based data warehousing and analytics platform.",
  },
  {
    name: "Databricks",
    website: "https://databricks.com",
    industry: "Technology",
    country: "United States",
    description: "Unified analytics platform built on Apache Spark.",
  },
  {
    name: "HashiCorp",
    website: "https://hashicorp.com",
    industry: "Technology",
    country: "United States",
    description:
      "Infrastructure automation software for multi-cloud environments.",
  },
  {
    name: "Confluent",
    website: "https://confluent.io",
    industry: "Technology",
    country: "United States",
    description: "Streaming data platform built on Apache Kafka.",
  },
  {
    name: "MongoDB",
    website: "https://mongodb.com",
    industry: "Technology",
    country: "United States",
    description: "Document-oriented NoSQL database platform.",
  },
  {
    name: "Elastic",
    website: "https://elastic.co",
    industry: "Technology",
    country: "United States",
    description: "Search and observability solutions built on Elasticsearch.",
  },
  {
    name: "New Relic",
    website: "https://newrelic.com",
    industry: "Technology",
    country: "United States",
    description:
      "Observability platform for monitoring applications and infrastructure.",
  },
  {
    name: "Dynatrace",
    website: "https://dynatrace.com",
    industry: "Technology",
    country: "United States",
    description:
      "AI-powered observability and application performance management.",
  },
  {
    name: "PagerDuty",
    website: "https://pagerduty.com",
    industry: "Technology",
    country: "United States",
    description:
      "Digital operations management and incident response platform.",
  },
  {
    name: "Zendesk",
    website: "https://zendesk.com",
    industry: "Technology",
    country: "United States",
    description: "Customer service and engagement software platform.",
  },
  {
    name: "Freshworks",
    website: "https://freshworks.com",
    industry: "Technology",
    country: "United States",
    description:
      "Cloud-based business software for customer engagement and IT service.",
  },
  {
    name: "HubSpot",
    website: "https://hubspot.com",
    industry: "Technology",
    country: "United States",
    description: "Inbound marketing, sales, and customer service software.",
  },
  {
    name: "Klaviyo",
    website: "https://klaviyo.com",
    industry: "Technology",
    country: "United States",
    description: "Email and SMS marketing automation platform for e-commerce.",
  },
  {
    name: "Braze",
    website: "https://braze.com",
    industry: "Technology",
    country: "United States",
    description: "Customer engagement platform for cross-channel marketing.",
  },
  {
    name: "Amplitude",
    website: "https://amplitude.com",
    industry: "Technology",
    country: "United States",
    description: "Digital analytics platform for product intelligence.",
  },
  {
    name: "Mixpanel",
    website: "https://mixpanel.com",
    industry: "Technology",
    country: "United States",
    description: "Product analytics platform for tracking user behavior.",
  },
  {
    name: "Segment",
    website: "https://segment.com",
    industry: "Technology",
    country: "United States",
    description:
      "Customer data platform for collecting and managing user data.",
  },
  {
    name: "mParticle",
    website: "https://mparticle.com",
    industry: "Technology",
    country: "United States",
    description: "Customer data platform for mobile and web apps.",
  },
  {
    name: "Heap",
    website: "https://heap.io",
    industry: "Technology",
    country: "United States",
    description: "Digital insights platform with automatic event capture.",
  },
  {
    name: "Hotjar",
    website: "https://hotjar.com",
    industry: "Technology",
    country: "United States",
    description: "Behavioral analytics and user feedback tool.",
  },
  {
    name: "FullStory",
    website: "https://fullstory.com",
    industry: "Technology",
    country: "United States",
    description: "Digital experience analytics platform.",
  },
  {
    name: "Optimizely",
    website: "https://optimizely.com",
    industry: "Technology",
    country: "United States",
    description:
      "Digital experience optimization and experimentation platform.",
  },
  {
    name: "LaunchDarkly",
    website: "https://launchdarkly.com",
    industry: "Technology",
    country: "United States",
    description: "Feature management and experimentation platform.",
  },
  {
    name: "Split.io",
    website: "https://split.io",
    industry: "Technology",
    country: "United States",
    description: "Feature delivery and experimentation platform.",
  },
  {
    name: "Rollout.io",
    website: "https://rollout.io",
    industry: "Technology",
    country: "United States",
    description: "Feature flag management and progressive delivery platform.",
  },
  {
    name: "CircleCI",
    website: "https://circleci.com",
    industry: "Technology",
    country: "United States",
    description: "Continuous integration and delivery platform.",
  },
  {
    name: "Travis CI",
    website: "https://travis-ci.com",
    industry: "Technology",
    country: "United States",
    description: "Hosted continuous integration service for GitHub projects.",
  },
  {
    name: "GitLab",
    website: "https://gitlab.com",
    industry: "Technology",
    country: "United States",
    description: "DevOps platform with source control, CI/CD, and security.",
  },
  {
    name: "Bitbucket",
    website: "https://bitbucket.org",
    industry: "Technology",
    country: "United States",
    description: "Git code hosting and collaboration tool by Atlassian.",
  },
  {
    name: "JFrog",
    website: "https://jfrog.com",
    industry: "Technology",
    country: "United States",
    description: "DevOps platform for continuous software delivery.",
  },
  {
    name: "Sonatype",
    website: "https://sonatype.com",
    industry: "Technology",
    country: "United States",
    description: "Software supply chain management and security platform.",
  },
  {
    name: "Snyk",
    website: "https://snyk.io",
    industry: "Technology",
    country: "United States",
    description:
      "Developer security platform for finding and fixing vulnerabilities.",
  },
  {
    name: "Veracode",
    website: "https://veracode.com",
    industry: "Technology",
    country: "United States",
    description: "Application security testing and risk management platform.",
  },
  {
    name: "Checkmarx",
    website: "https://checkmarx.com",
    industry: "Technology",
    country: "United States",
    description: "Application security testing solutions for DevSecOps.",
  },
  {
    name: "Rapid7",
    website: "https://rapid7.com",
    industry: "Technology",
    country: "United States",
    description: "Cybersecurity analytics and automation solutions.",
  },
  {
    name: "Tenable",
    website: "https://tenable.com",
    industry: "Technology",
    country: "United States",
    description: "Cyber exposure and vulnerability management platform.",
  },
  {
    name: "Qualys",
    website: "https://qualys.com",
    industry: "Technology",
    country: "United States",
    description: "Cloud-based security and compliance solutions.",
  },
  {
    name: "SentinelOne",
    website: "https://sentinelone.com",
    industry: "Technology",
    country: "United States",
    description: "AI-powered cybersecurity platform for endpoint protection.",
  },
  {
    name: "Tanium",
    website: "https://tanium.com",
    industry: "Technology",
    country: "United States",
    description: "Endpoint management and security platform for enterprises.",
  },
  {
    name: "Illumio",
    website: "https://illumio.com",
    industry: "Technology",
    country: "United States",
    description: "Zero trust segmentation for cloud and data center security.",
  },
  {
    name: "Claroty",
    website: "https://claroty.com",
    industry: "Technology",
    country: "United States",
    description:
      "Cybersecurity platform for operational technology environments.",
  },
  {
    name: "Armis",
    website: "https://armis.com",
    industry: "Technology",
    country: "United States",
    description: "Asset intelligence cybersecurity platform.",
  },
  {
    name: "Vectra AI",
    website: "https://vectra.ai",
    industry: "Technology",
    country: "United States",
    description: "AI-driven threat detection and response platform.",
  },
  {
    name: "Exabeam",
    website: "https://exabeam.com",
    industry: "Technology",
    country: "United States",
    description: "Security information and event management platform.",
  },
  {
    name: "Sumo Logic",
    website: "https://sumologic.com",
    industry: "Technology",
    country: "United States",
    description: "Cloud-native machine data analytics platform.",
  },
  {
    name: "Splunk",
    website: "https://splunk.com",
    industry: "Technology",
    country: "United States",
    description:
      "Data platform for security, IT operations, and observability.",
  },
  {
    name: "LogRhythm",
    website: "https://logrhythm.com",
    industry: "Technology",
    country: "United States",
    description: "Security information and event management solutions.",
  },
  {
    name: "Ping Identity",
    website: "https://pingidentity.com",
    industry: "Technology",
    country: "United States",
    description:
      "Intelligent identity solutions for workforce and customer identity.",
  },
  {
    name: "ForgeRock",
    website: "https://forgerock.com",
    industry: "Technology",
    country: "United States",
    description: "Identity and access management platform.",
  },
  {
    name: "SailPoint",
    website: "https://sailpoint.com",
    industry: "Technology",
    country: "United States",
    description: "Identity security platform for enterprise governance.",
  },
  {
    name: "Saviynt",
    website: "https://saviynt.com",
    industry: "Technology",
    country: "United States",
    description:
      "Cloud-native identity governance and administration platform.",
  },
  {
    name: "BeyondTrust",
    website: "https://beyondtrust.com",
    industry: "Technology",
    country: "United States",
    description: "Privileged access management and remote support solutions.",
  },
  {
    name: "CyberArk",
    website: "https://cyberark.com",
    industry: "Technology",
    country: "United States",
    description: "Identity security platform for privileged access management.",
  },
  {
    name: "Delinea",
    website: "https://delinea.com",
    industry: "Technology",
    country: "United States",
    description:
      "Privileged access management solutions for hybrid environments.",
  },
  {
    name: "Appdome",
    website: "https://appdome.com",
    industry: "Technology",
    country: "United States",
    description: "No-code mobile app security and defense platform.",
  },
  {
    name: "Digital.ai",
    website: "https://digital.ai",
    industry: "Technology",
    country: "United States",
    description:
      "AI-powered DevSecOps platform for enterprise software delivery.",
  },
  {
    name: "Sonar",
    website: "https://sonarsource.com",
    industry: "Technology",
    country: "United States",
    description: "Code quality and security analysis tools.",
  },
  {
    name: "Harness",
    website: "https://harness.io",
    industry: "Technology",
    country: "United States",
    description: "Modern software delivery platform with AI capabilities.",
  },
  {
    name: "Cortex",
    website: "https://cortex.io",
    industry: "Technology",
    country: "United States",
    description: "Internal developer portal for engineering excellence.",
  },
  {
    name: "Backstage",
    website: "https://backstage.io",
    industry: "Technology",
    country: "United States",
    description: "Open-source platform for building developer portals.",
  },
  {
    name: "Port",
    website: "https://getport.io",
    industry: "Technology",
    country: "United States",
    description: "Developer portal and platform engineering platform.",
  },
  {
    name: "LinearB",
    website: "https://linearb.io",
    industry: "Technology",
    country: "United States",
    description: "Software delivery intelligence and workflow automation.",
  },
  {
    name: "Jellyfish",
    website: "https://jellyfish.co",
    industry: "Technology",
    country: "United States",
    description:
      "Engineering management platform for visibility and alignment.",
  },
  {
    name: "Pluralsight",
    website: "https://pluralsight.com",
    industry: "Technology",
    country: "United States",
    description: "Technology workforce development platform.",
  },
  {
    name: "A Cloud Guru",
    website: "https://acloudguru.com",
    industry: "Technology",
    country: "United States",
    description: "Cloud computing training and certification platform.",
  },
  {
    name: "Coursera",
    website: "https://coursera.org",
    industry: "Technology",
    country: "United States",
    description:
      "Online learning platform partnering with universities and companies.",
  },
  {
    name: "Udemy",
    website: "https://udemy.com",
    industry: "Technology",
    country: "United States",
    description: "Online learning marketplace with 200,000+ courses.",
  },
  {
    name: "Udacity",
    website: "https://udacity.com",
    industry: "Technology",
    country: "United States",
    description: "Tech skills training with nanodegree programs.",
  },
  {
    name: "edX",
    website: "https://edx.org",
    industry: "Technology",
    country: "United States",
    description: "Online learning platform offering university-level courses.",
  },
  {
    name: "Khan Academy",
    website: "https://khanacademy.org",
    industry: "Technology",
    country: "United States",
    description: "Free online education platform for all ages.",
  },
  {
    name: "Duolingo",
    website: "https://duolingo.com",
    industry: "Technology",
    country: "United States",
    description: "Gamified language learning app with 500M+ users.",
  },
  {
    name: "Chegg",
    website: "https://chegg.com",
    industry: "Technology",
    country: "United States",
    description: "Student-first learning platform for academic help.",
  },
  {
    name: "2U",
    website: "https://2u.com",
    industry: "Technology",
    country: "United States",
    description: "Online higher education enablement company.",
  },
  {
    name: "Guild Education",
    website: "https://guild.com",
    industry: "Technology",
    country: "United States",
    description: "Education and upskilling platform for working adults.",
  },
  {
    name: "Degreed",
    website: "https://degreed.com",
    industry: "Technology",
    country: "United States",
    description:
      "Upskilling platform connecting learning to business outcomes.",
  },
  // ── SaaS / Cloud – United States ──
  {
    name: "Zuora",
    website: "https://zuora.com",
    industry: "Technology",
    country: "United States",
    description: "Subscription management and recurring revenue platform.",
  },
  {
    name: "Chargebee",
    website: "https://chargebee.com",
    industry: "Technology",
    country: "United States",
    description: "Subscription billing and revenue management platform.",
  },
  {
    name: "Recurly",
    website: "https://recurly.com",
    industry: "Technology",
    country: "United States",
    description:
      "Subscription billing platform for recurring revenue businesses.",
  },
  {
    name: "FastSpring",
    website: "https://fastspring.com",
    industry: "Technology",
    country: "United States",
    description: "E-commerce platform for software and SaaS companies.",
  },
  {
    name: "Paddle",
    website: "https://paddle.com",
    industry: "Technology",
    country: "United States",
    description: "Revenue delivery platform for software companies.",
  },
  {
    name: "Stripe",
    website: "https://stripe.com",
    industry: "Finance",
    country: "United States",
    description: "Online payment processing platform for internet businesses.",
  },
  {
    name: "Braintree",
    website: "https://braintreepayments.com",
    industry: "Finance",
    country: "United States",
    description: "Full-stack payment platform owned by PayPal.",
  },
  {
    name: "Adyen",
    website: "https://adyen.com",
    industry: "Finance",
    country: "Netherlands",
    description: "Global payment technology company for omnichannel commerce.",
  },
  {
    name: "Checkout.com",
    website: "https://checkout.com",
    industry: "Finance",
    country: "United Kingdom",
    description: "Global digital payment solutions for businesses.",
  },
  {
    name: "Worldpay",
    website: "https://worldpay.com",
    industry: "Finance",
    country: "United Kingdom",
    description: "Global payment processing and technology solutions.",
  },
  {
    name: "Nuvei",
    website: "https://nuvei.com",
    industry: "Finance",
    country: "Canada",
    description: "Modular payment technology for global commerce.",
  },
  {
    name: "Rapyd",
    website: "https://rapyd.net",
    industry: "Finance",
    country: "United Kingdom",
    description: "Fintech-as-a-service platform for global payments.",
  },
  {
    name: "Wise",
    website: "https://wise.com",
    industry: "Finance",
    country: "United Kingdom",
    description: "International money transfer platform with low fees.",
  },
  {
    name: "Revolut",
    website: "https://revolut.com",
    industry: "Finance",
    country: "United Kingdom",
    description:
      "Global financial super-app for banking, payments, and crypto.",
  },
  {
    name: "Monzo",
    website: "https://monzo.com",
    industry: "Finance",
    country: "United Kingdom",
    description: "Digital bank with smart money management features.",
  },
  {
    name: "Starling Bank",
    website: "https://starlingbank.com",
    industry: "Finance",
    country: "United Kingdom",
    description:
      "Digital challenger bank focused on personal and business accounts.",
  },
  {
    name: "N26",
    website: "https://n26.com",
    industry: "Finance",
    country: "Germany",
    description: "Mobile bank offering flexible accounts across Europe.",
  },
  {
    name: "Bunq",
    website: "https://bunq.com",
    industry: "Finance",
    country: "Netherlands",
    description: "Sustainable mobile bank with real-time account controls.",
  },
  {
    name: "Chime",
    website: "https://chime.com",
    industry: "Finance",
    country: "United States",
    description: "Neobank offering fee-free banking services.",
  },
  {
    name: "Current",
    website: "https://current.com",
    industry: "Finance",
    country: "United States",
    description: "Mobile banking platform for everyday Americans.",
  },
  {
    name: "Dave",
    website: "https://dave.com",
    industry: "Finance",
    country: "United States",
    description: "Neobank with budgeting and cash advance features.",
  },
  {
    name: "Varo Bank",
    website: "https://varomoney.com",
    industry: "Finance",
    country: "United States",
    description: "All-digital bank with no minimum balance requirements.",
  },
  {
    name: "SoFi",
    website: "https://sofi.com",
    industry: "Finance",
    country: "United States",
    description:
      "Digital personal finance company offering loans, banking, and investing.",
  },
  {
    name: "LendingClub",
    website: "https://lendingclub.com",
    industry: "Finance",
    country: "United States",
    description: "Digital marketplace bank for personal loans and savings.",
  },
  {
    name: "Prosper",
    website: "https://prosper.com",
    industry: "Finance",
    country: "United States",
    description: "Peer-to-peer lending marketplace for personal loans.",
  },
  {
    name: "Avant",
    website: "https://avant.com",
    industry: "Finance",
    country: "United States",
    description: "Online lending platform for personal loans and credit cards.",
  },
  {
    name: "Kabbage",
    website: "https://kabbage.com",
    industry: "Finance",
    country: "United States",
    description: "Small business lending platform by American Express.",
  },
  {
    name: "Fundbox",
    website: "https://fundbox.com",
    industry: "Finance",
    country: "United States",
    description: "Business financing platform for small businesses.",
  },
  {
    name: "BlueVine",
    website: "https://bluevine.com",
    industry: "Finance",
    country: "United States",
    description: "Small business banking and lending solutions.",
  },
  {
    name: "Brex",
    website: "https://brex.com",
    industry: "Finance",
    country: "United States",
    description:
      "Financial software and corporate cards for startups and enterprises.",
  },
  {
    name: "Ramp",
    website: "https://ramp.com",
    industry: "Finance",
    country: "United States",
    description: "Finance automation platform with corporate cards.",
  },
  {
    name: "Divvy",
    website: "https://getdivvy.com",
    industry: "Finance",
    country: "United States",
    description: "Spend management and corporate card platform for businesses.",
  },
  {
    name: "Expensify",
    website: "https://expensify.com",
    industry: "Finance",
    country: "United States",
    description: "Expense management and corporate card platform.",
  },
  {
    name: "Coupa Software",
    website: "https://coupa.com",
    industry: "Finance",
    country: "United States",
    description: "Business spend management platform.",
  },
  {
    name: "SAP Concur",
    website: "https://concur.com",
    industry: "Finance",
    country: "United States",
    description: "Travel and expense management software.",
  },
  {
    name: "Tipalti",
    website: "https://tipalti.com",
    industry: "Finance",
    country: "United States",
    description: "Global accounts payable automation platform.",
  },
  {
    name: "Bill.com",
    website: "https://bill.com",
    industry: "Finance",
    country: "United States",
    description:
      "Financial operations platform for small and midsize businesses.",
  },
  {
    name: "Melio",
    website: "https://meliopayments.com",
    industry: "Finance",
    country: "United States",
    description: "B2B payments platform for small businesses.",
  },
  {
    name: "Routable",
    website: "https://routable.com",
    industry: "Finance",
    country: "United States",
    description: "B2B payments automation platform.",
  },
  {
    name: "Airbase",
    website: "https://airbase.com",
    industry: "Finance",
    country: "United States",
    description: "Spend management platform for finance teams.",
  },
  // ── Healthcare ──
  {
    name: "Veeva Systems",
    website: "https://veeva.com",
    industry: "Healthcare",
    country: "United States",
    description: "Cloud software for the global life sciences industry.",
  },
  {
    name: "Epic Systems",
    website: "https://epic.com",
    industry: "Healthcare",
    country: "United States",
    description:
      "Electronic health records software for healthcare organizations.",
  },
  {
    name: "Cerner",
    website: "https://cerner.com",
    industry: "Healthcare",
    country: "United States",
    description: "Health information technology solutions and services.",
  },
  {
    name: "Meditech",
    website: "https://meditech.com",
    industry: "Healthcare",
    country: "United States",
    description: "Electronic health record and healthcare IT solutions.",
  },
  {
    name: "Allscripts",
    website: "https://allscripts.com",
    industry: "Healthcare",
    country: "United States",
    description: "Electronic health records and practice management software.",
  },
  {
    name: "eClinicalWorks",
    website: "https://eclinicalworks.com",
    industry: "Healthcare",
    country: "United States",
    description: "Cloud-based EHR and population health management platform.",
  },
  {
    name: "Athenahealth",
    website: "https://athenahealth.com",
    industry: "Healthcare",
    country: "United States",
    description: "Cloud-based healthcare IT services and EHR platform.",
  },
  {
    name: "Kareo",
    website: "https://kareo.com",
    industry: "Healthcare",
    country: "United States",
    description: "Cloud-based EHR, billing, and practice management software.",
  },
  {
    name: "DrChrono",
    website: "https://drchrono.com",
    industry: "Healthcare",
    country: "United States",
    description: "iPad and iPhone EHR platform for medical practices.",
  },
  {
    name: "Practice Fusion",
    website: "https://practicefusion.com",
    industry: "Healthcare",
    country: "United States",
    description: "Cloud-based EHR platform for ambulatory care physicians.",
  },
  {
    name: "Netsmart Technologies",
    website: "https://ntst.com",
    industry: "Healthcare",
    country: "United States",
    description:
      "Health IT solutions for behavioral health and post-acute care.",
  },
  {
    name: "Inovalon",
    website: "https://inovalon.com",
    industry: "Healthcare",
    country: "United States",
    description: "Cloud-based platforms for data-driven healthcare insights.",
  },
  {
    name: "Availity",
    website: "https://availity.com",
    industry: "Healthcare",
    country: "United States",
    description: "Health information network and payer connectivity solutions.",
  },
  {
    name: "Change Healthcare",
    website: "https://changehealthcare.com",
    industry: "Healthcare",
    country: "United States",
    description: "Healthcare technology and data analytics solutions.",
  },
  {
    name: "Waystar",
    website: "https://waystar.com",
    industry: "Healthcare",
    country: "United States",
    description: "Healthcare payments and revenue cycle management platform.",
  },
  {
    name: "R1 RCM",
    website: "https://r1rcm.com",
    industry: "Healthcare",
    country: "United States",
    description: "Technology-driven revenue cycle management for hospitals.",
  },
  {
    name: "Nuvolo",
    website: "https://nuvolo.com",
    industry: "Healthcare",
    country: "United States",
    description: "Connected workplace management platform for healthcare.",
  },
  {
    name: "Health Catalyst",
    website: "https://healthcatalyst.com",
    industry: "Healthcare",
    country: "United States",
    description: "Data and analytics technology for healthcare improvement.",
  },
  {
    name: "Arcadia",
    website: "https://arcadia.io",
    industry: "Healthcare",
    country: "United States",
    description: "Healthcare analytics platform for value-based care.",
  },
  {
    name: "Privia Health",
    website: "https://priviahealth.com",
    industry: "Healthcare",
    country: "United States",
    description:
      "Technology-driven physician group and population health platform.",
  },
  {
    name: "Teladoc Health",
    website: "https://teladochealth.com",
    industry: "Healthcare",
    country: "United States",
    description: "Virtual care platform for telehealth services worldwide.",
  },
  {
    name: "MDLive",
    website: "https://mdlive.com",
    industry: "Healthcare",
    country: "United States",
    description:
      "Virtual healthcare company for medical, behavioral, and dermatology care.",
  },
  {
    name: "Hims & Hers",
    website: "https://forhims.com",
    industry: "Healthcare",
    country: "United States",
    description: "Telehealth company for personalized health and wellness.",
  },
  {
    name: "Ro",
    website: "https://ro.co",
    industry: "Healthcare",
    country: "United States",
    description: "Direct-to-patient healthcare company for chronic conditions.",
  },
  {
    name: "Noom",
    website: "https://noom.com",
    industry: "Healthcare",
    country: "United States",
    description: "Digital health program for sustainable weight loss.",
  },
  {
    name: "Calibrate",
    website: "https://joincalibrate.com",
    industry: "Healthcare",
    country: "United States",
    description:
      "Metabolic health program combining medication and lifestyle change.",
  },
  {
    name: "Found",
    website: "https://joinfound.com",
    industry: "Healthcare",
    country: "United States",
    description:
      "Personalized weight care program with medical and behavioral support.",
  },
  {
    name: "Brightline",
    website: "https://hellobrightline.com",
    industry: "Healthcare",
    country: "United States",
    description: "Pediatric mental health care platform for families.",
  },
  {
    name: "Lyra Health",
    website: "https://lyrahealth.com",
    industry: "Healthcare",
    country: "United States",
    description: "Mental health benefits platform for employers.",
  },
  {
    name: "Spring Health",
    website: "https://springhealth.com",
    industry: "Healthcare",
    country: "United States",
    description: "Mental healthcare platform with precision treatment.",
  },
  {
    name: "Cerebral",
    website: "https://cerebral.com",
    industry: "Healthcare",
    country: "United States",
    description: "Online mental health service for therapy and medication.",
  },
  {
    name: "Headspace",
    website: "https://headspace.com",
    industry: "Healthcare",
    country: "United States",
    description: "Mindfulness and meditation app for mental wellness.",
  },
  {
    name: "Calm",
    website: "https://calm.com",
    industry: "Healthcare",
    country: "United States",
    description: "App for sleep, meditation, and relaxation.",
  },
  {
    name: "Woebot Health",
    website: "https://woebothealth.com",
    industry: "Healthcare",
    country: "United States",
    description: "AI-powered mental health support platform.",
  },
  {
    name: "Sword Health",
    website: "https://swordhealth.com",
    industry: "Healthcare",
    country: "United States",
    description:
      "Digital musculoskeletal care platform using AI and human therapists.",
  },
  {
    name: "Hinge Health",
    website: "https://hingehealth.com",
    industry: "Healthcare",
    country: "United States",
    description: "Digital clinic for back and joint pain.",
  },
  {
    name: "Omada Health",
    website: "https://omadahealth.com",
    industry: "Healthcare",
    country: "United States",
    description: "Digital care programs for chronic disease prevention.",
  },
  {
    name: "Livongo",
    website: "https://livongo.com",
    industry: "Healthcare",
    country: "United States",
    description: "Digital health platform for chronic conditions management.",
  },
  {
    name: "Dexcom",
    website: "https://dexcom.com",
    industry: "Healthcare",
    country: "United States",
    description:
      "Continuous glucose monitoring systems for diabetes management.",
  },
  {
    name: "Abbott Laboratories",
    website: "https://abbott.com",
    industry: "Healthcare",
    country: "United States",
    description:
      "Global healthcare company in diagnostics, devices, and nutrition.",
  },
  {
    name: "Becton Dickinson",
    website: "https://bd.com",
    industry: "Healthcare",
    country: "United States",
    description:
      "Medical technology company for diagnostics and drug delivery.",
  },
  {
    name: "Boston Scientific",
    website: "https://bostonscientific.com",
    industry: "Healthcare",
    country: "United States",
    description: "Medical devices for minimally invasive interventions.",
  },
  {
    name: "Edwards Lifesciences",
    website: "https://edwards.com",
    industry: "Healthcare",
    country: "United States",
    description: "Heart valve therapies and hemodynamic monitoring solutions.",
  },
  {
    name: "Insulet Corporation",
    website: "https://insulet.com",
    industry: "Healthcare",
    country: "United States",
    description: "Manufacturer of the OmniPod insulin management system.",
  },
  {
    name: "Tandem Diabetes Care",
    website: "https://tandemdiabetes.com",
    industry: "Healthcare",
    country: "United States",
    description: "Insulin delivery systems for people with diabetes.",
  },
  {
    name: "NovaBay Pharmaceuticals",
    website: "https://novabay.com",
    industry: "Healthcare",
    country: "United States",
    description:
      "Specialty pharmaceuticals company focused on anti-infectives.",
  },
  {
    name: "Illumina",
    website: "https://illumina.com",
    industry: "Healthcare",
    country: "United States",
    description: "Genomic sequencing and array-based technologies.",
  },
  {
    name: "Pacific Biosciences",
    website: "https://pacificbiosciences.com",
    industry: "Healthcare",
    country: "United States",
    description: "Long-read DNA sequencing systems and services.",
  },
  {
    name: "Oxford Nanopore",
    website: "https://nanoporetech.com",
    industry: "Healthcare",
    country: "United Kingdom",
    description: "Nanopore-based DNA/RNA sequencing technologies.",
  },
  {
    name: "10x Genomics",
    website: "https://10xgenomics.com",
    industry: "Healthcare",
    country: "United States",
    description: "Instruments and software for single-cell analysis.",
  },
  {
    name: "Twist Bioscience",
    website: "https://twistbioscience.com",
    industry: "Healthcare",
    country: "United States",
    description: "Synthetic biology and DNA synthesis platform.",
  },
  {
    name: "Ginkgo Bioworks",
    website: "https://ginkgobioworks.com",
    industry: "Healthcare",
    country: "United States",
    description:
      "Horizontal platform for cell programming and synthetic biology.",
  },
  {
    name: "Zymergen",
    website: "https://zymergen.com",
    industry: "Healthcare",
    country: "United States",
    description: "Bio-based materials using machine learning and automation.",
  },
  {
    name: "Recursion Pharmaceuticals",
    website: "https://recursion.com",
    industry: "Healthcare",
    country: "United States",
    description: "Techbio company decoding biology for drug discovery.",
  },
  {
    name: "Schrödinger",
    website: "https://schrodinger.com",
    industry: "Healthcare",
    country: "United States",
    description: "Physics-based computational platform for drug discovery.",
  },
  {
    name: "Atomwise",
    website: "https://atomwise.com",
    industry: "Healthcare",
    country: "United States",
    description: "AI-based drug discovery platform using deep learning.",
  },
  // ── E-commerce & Retail ──
  {
    name: "Shopify",
    website: "https://shopify.com",
    industry: "Retail",
    country: "Canada",
    description: "E-commerce platform for businesses of all sizes.",
  },
  {
    name: "BigCommerce",
    website: "https://bigcommerce.com",
    industry: "Retail",
    country: "United States",
    description: "Open SaaS e-commerce platform for growing businesses.",
  },
  {
    name: "WooCommerce",
    website: "https://woocommerce.com",
    industry: "Retail",
    country: "United States",
    description: "Open-source e-commerce plugin for WordPress.",
  },
  {
    name: "Magento",
    website: "https://magento.com",
    industry: "Retail",
    country: "United States",
    description: "Open-source e-commerce platform owned by Adobe.",
  },
  {
    name: "PrestaShop",
    website: "https://prestashop.com",
    industry: "Retail",
    country: "France",
    description: "Open-source e-commerce platform for online stores.",
  },
  {
    name: "OpenCart",
    website: "https://opencart.com",
    industry: "Retail",
    country: "Hong Kong",
    description: "Free open-source e-commerce solution.",
  },
  {
    name: "Volusion",
    website: "https://volusion.com",
    industry: "Retail",
    country: "United States",
    description: "E-commerce software for small businesses.",
  },
  {
    name: "3dcart",
    website: "https://3dcart.com",
    industry: "Retail",
    country: "United States",
    description: "Complete e-commerce solution for online stores.",
  },
  {
    name: "Shift4Shop",
    website: "https://shift4shop.com",
    industry: "Retail",
    country: "United States",
    description: "E-commerce platform by Shift4 Payments.",
  },
  {
    name: "Wix eCommerce",
    website: "https://wix.com",
    industry: "Retail",
    country: "Israel",
    description: "Website builder with built-in e-commerce capabilities.",
  },
  {
    name: "Squarespace",
    website: "https://squarespace.com",
    industry: "Retail",
    country: "United States",
    description: "Website builder and e-commerce platform for creatives.",
  },
  {
    name: "Weebly",
    website: "https://weebly.com",
    industry: "Retail",
    country: "United States",
    description:
      "Website building and e-commerce solutions for small businesses.",
  },
  {
    name: "GoDaddy Online Store",
    website: "https://godaddy.com",
    industry: "Retail",
    country: "United States",
    description: "Website builder with e-commerce features by GoDaddy.",
  },
  {
    name: "Ecwid",
    website: "https://ecwid.com",
    industry: "Retail",
    country: "United States",
    description: "E-commerce platform that integrates with any website.",
  },
  {
    name: "Salsify",
    website: "https://salsify.com",
    industry: "Retail",
    country: "United States",
    description:
      "Product experience management platform for brands and retailers.",
  },
  {
    name: "Akeneo",
    website: "https://akeneo.com",
    industry: "Retail",
    country: "France",
    description: "Product information management platform for e-commerce.",
  },
  {
    name: "Apttus",
    website: "https://conga.com",
    industry: "Retail",
    country: "United States",
    description: "Revenue lifecycle management platform for complex commerce.",
  },
  {
    name: "Avalara",
    website: "https://avalara.com",
    industry: "Retail",
    country: "United States",
    description: "Automated tax compliance software for businesses.",
  },
  {
    name: "TaxJar",
    website: "https://taxjar.com",
    industry: "Retail",
    country: "United States",
    description: "Sales tax automation for e-commerce businesses.",
  },
  {
    name: "Vertex Inc",
    website: "https://vertexinc.com",
    industry: "Retail",
    country: "United States",
    description: "Tax technology solutions for global businesses.",
  },
  {
    name: "Narvar",
    website: "https://narvar.com",
    industry: "Retail",
    country: "United States",
    description: "Post-purchase experience platform for retailers.",
  },
  {
    name: "AfterShip",
    website: "https://aftership.com",
    industry: "Retail",
    country: "Hong Kong",
    description: "Shipment tracking and post-purchase experience platform.",
  },
  {
    name: "Route",
    website: "https://route.com",
    industry: "Retail",
    country: "United States",
    description: "Package protection and tracking platform for e-commerce.",
  },
  {
    name: "Returnly",
    website: "https://returnly.com",
    industry: "Retail",
    country: "United States",
    description: "Returns management platform for e-commerce brands.",
  },
  {
    name: "Loop Returns",
    website: "https://loopreturns.com",
    industry: "Retail",
    country: "United States",
    description:
      "Returns management and exchange platform for Shopify merchants.",
  },
  {
    name: "Shipbob",
    website: "https://shipbob.com",
    industry: "Retail",
    country: "United States",
    description: "Distributed fulfillment network for e-commerce brands.",
  },
  {
    name: "ShipStation",
    website: "https://shipstation.com",
    industry: "Retail",
    country: "United States",
    description: "Web-based shipping software for online retailers.",
  },
  {
    name: "EasyPost",
    website: "https://easypost.com",
    industry: "Retail",
    country: "United States",
    description: "Shipping API for e-commerce and logistics companies.",
  },
  {
    name: "Shippo",
    website: "https://goshippo.com",
    industry: "Retail",
    country: "United States",
    description: "Multi-carrier shipping software for e-commerce.",
  },
  {
    name: "Easyship",
    website: "https://easyship.com",
    industry: "Retail",
    country: "Hong Kong",
    description: "Global shipping and fulfillment platform for e-commerce.",
  },
  {
    name: "Flexport",
    website: "https://flexport.com",
    industry: "Retail",
    country: "United States",
    description:
      "Technology-powered freight forwarding and logistics platform.",
  },
  {
    name: "project44",
    website: "https://project44.com",
    industry: "Retail",
    country: "United States",
    description: "Advanced visibility platform for supply chain.",
  },
  {
    name: "FourKites",
    website: "https://fourkites.com",
    industry: "Retail",
    country: "United States",
    description: "Real-time supply chain visibility and insights platform.",
  },
  {
    name: "Descartes Systems",
    website: "https://descartes.com",
    industry: "Retail",
    country: "Canada",
    description:
      "Logistics technology solutions for global trade and transport.",
  },
  {
    name: "Manhattan Associates",
    website: "https://manh.com",
    industry: "Retail",
    country: "United States",
    description: "Supply chain and omnichannel commerce technology solutions.",
  },
  {
    name: "Blue Yonder",
    website: "https://blueyonder.com",
    industry: "Retail",
    country: "United States",
    description: "AI-driven supply chain and retail planning solutions.",
  },
  {
    name: "o9 Solutions",
    website: "https://o9solutions.com",
    industry: "Retail",
    country: "United States",
    description: "AI-powered integrated business planning platform.",
  },
  {
    name: "Kinaxis",
    website: "https://kinaxis.com",
    industry: "Retail",
    country: "Canada",
    description: "Supply chain management and S&OP planning software.",
  },
  {
    name: "Llamasoft",
    website: "https://llamasoft.com",
    industry: "Retail",
    country: "United States",
    description: "Supply chain design and analytics software.",
  },
  {
    name: "Infor",
    website: "https://infor.com",
    industry: "Retail",
    country: "United States",
    description: "Industry-specific cloud software for enterprises.",
  },
  // ── Media & Entertainment ──
  {
    name: "Spotify",
    website: "https://spotify.com",
    industry: "Media",
    country: "Sweden",
    description: "Global music streaming platform with 600M+ users.",
  },
  {
    name: "SoundCloud",
    website: "https://soundcloud.com",
    industry: "Media",
    country: "Germany",
    description: "Audio distribution platform and music streaming service.",
  },
  {
    name: "Deezer",
    website: "https://deezer.com",
    industry: "Media",
    country: "France",
    description: "Music streaming service with 73M+ tracks.",
  },
  {
    name: "Tidal",
    website: "https://tidal.com",
    industry: "Media",
    country: "Norway",
    description: "High-fidelity music streaming service.",
  },
  {
    name: "Bandcamp",
    website: "https://bandcamp.com",
    industry: "Media",
    country: "United States",
    description:
      "Music platform empowering artists to sell their music directly.",
  },
  {
    name: "Twitch",
    website: "https://twitch.tv",
    industry: "Media",
    country: "United States",
    description: "Live streaming platform for gaming and entertainment.",
  },
  {
    name: "Kick",
    website: "https://kick.com",
    industry: "Media",
    country: "Australia",
    description: "Live streaming platform with creator-friendly monetization.",
  },
  {
    name: "Rumble",
    website: "https://rumble.com",
    industry: "Media",
    country: "United States",
    description: "Video platform and cloud services company.",
  },
  {
    name: "Vimeo",
    website: "https://vimeo.com",
    industry: "Media",
    country: "United States",
    description: "Video hosting and sharing platform for creatives.",
  },
  {
    name: "Dailymotion",
    website: "https://dailymotion.com",
    industry: "Media",
    country: "France",
    description: "Video-sharing platform and content discovery network.",
  },
  {
    name: "Brightcove",
    website: "https://brightcove.com",
    industry: "Media",
    country: "United States",
    description: "Online video platform for media and enterprise.",
  },
  {
    name: "Kaltura",
    website: "https://kaltura.com",
    industry: "Media",
    country: "United States",
    description: "Open-source video technology platform.",
  },
  {
    name: "JW Player",
    website: "https://jwplayer.com",
    industry: "Media",
    country: "United States",
    description: "Video hosting, streaming, and analytics platform.",
  },
  {
    name: "Wistia",
    website: "https://wistia.com",
    industry: "Media",
    country: "United States",
    description: "Video hosting and analytics for businesses.",
  },
  {
    name: "Loom",
    website: "https://loom.com",
    industry: "Media",
    country: "United States",
    description: "Video messaging platform for async work communication.",
  },
  {
    name: "Vidyard",
    website: "https://vidyard.com",
    industry: "Media",
    country: "Canada",
    description: "Video platform for business sales and marketing.",
  },
  {
    name: "Synthesia",
    website: "https://synthesia.io",
    industry: "Media",
    country: "United Kingdom",
    description: "AI video generation platform with digital avatars.",
  },
  {
    name: "HeyGen",
    website: "https://heygen.com",
    industry: "Media",
    country: "United States",
    description: "AI video platform for creating personalized videos at scale.",
  },
  {
    name: "Colossyan",
    website: "https://colossyan.com",
    industry: "Media",
    country: "United Kingdom",
    description: "AI video creator for workplace learning and training.",
  },
  {
    name: "Hour One",
    website: "https://hourone.ai",
    industry: "Media",
    country: "Israel",
    description:
      "AI-powered video generation platform with virtual presenters.",
  },
  {
    name: "D-ID",
    website: "https://d-id.com",
    industry: "Media",
    country: "Israel",
    description: "Generative AI platform for creating digital humans.",
  },
  {
    name: "Runway",
    website: "https://runwayml.com",
    industry: "Media",
    country: "United States",
    description: "AI-powered creative tools for video generation and editing.",
  },
  {
    name: "Pika Labs",
    website: "https://pika.art",
    industry: "Media",
    country: "United States",
    description: "AI video generation platform for creators.",
  },
  {
    name: "Sora",
    website: "https://openai.com/sora",
    industry: "Media",
    country: "United States",
    description: "OpenAI's text-to-video generation model.",
  },
  {
    name: "Adobe Premiere",
    website: "https://adobe.com/premiere",
    industry: "Media",
    country: "United States",
    description: "Professional video editing software by Adobe.",
  },
  {
    name: "DaVinci Resolve",
    website: "https://blackmagicdesign.com",
    industry: "Media",
    country: "Australia",
    description:
      "Professional video editing, color correction, and audio post.",
  },
  {
    name: "Final Cut Pro",
    website: "https://apple.com/final-cut-pro",
    industry: "Media",
    country: "United States",
    description: "Professional video editing software for macOS.",
  },
  {
    name: "Avid Technology",
    website: "https://avid.com",
    industry: "Media",
    country: "United States",
    description: "Media technology solutions for audio and video production.",
  },
  {
    name: "Frame.io",
    website: "https://frame.io",
    industry: "Media",
    country: "United States",
    description: "Cloud-based video collaboration and review platform.",
  },
  {
    name: "Wipster",
    website: "https://wipster.io",
    industry: "Media",
    country: "New Zealand",
    description: "Video review and collaboration platform for creative teams.",
  },
  {
    name: "Celtx",
    website: "https://celtx.com",
    industry: "Media",
    country: "Canada",
    description:
      "Pre-production software for screenwriting and project planning.",
  },
  {
    name: "Final Draft",
    website: "https://finaldraft.com",
    industry: "Media",
    country: "United States",
    description: "Professional screenwriting software.",
  },
  {
    name: "Highland 2",
    website: "https://quoteunquoteapps.com/highland-2",
    industry: "Media",
    country: "United States",
    description: "Distraction-free screenwriting app for macOS.",
  },
  {
    name: "Storybird",
    website: "https://storybird.com",
    industry: "Media",
    country: "United States",
    description: "Creative writing platform for students and educators.",
  },
  {
    name: "Wattpad",
    website: "https://wattpad.com",
    industry: "Media",
    country: "Canada",
    description: "Storytelling platform connecting readers and writers.",
  },
  {
    name: "Medium",
    website: "https://medium.com",
    industry: "Media",
    country: "United States",
    description: "Online publishing platform for writers and readers.",
  },
  {
    name: "Substack",
    website: "https://substack.com",
    industry: "Media",
    country: "United States",
    description: "Newsletter publishing platform for independent writers.",
  },
  {
    name: "Ghost",
    website: "https://ghost.org",
    industry: "Media",
    country: "United Kingdom",
    description: "Independent publishing platform for blogs and newsletters.",
  },
  {
    name: "ConvertKit",
    website: "https://convertkit.com",
    industry: "Media",
    country: "United States",
    description: "Email marketing platform for content creators.",
  },
  {
    name: "Beehiiv",
    website: "https://beehiiv.com",
    industry: "Media",
    country: "United States",
    description: "Newsletter platform built for creators and media companies.",
  },
  // ── Automotive ──
  {
    name: "Rivian",
    website: "https://rivian.com",
    industry: "Automotive",
    country: "United States",
    description: "Electric vehicle manufacturer focused on adventure vehicles.",
  },
  {
    name: "Lucid Motors",
    website: "https://lucidmotors.com",
    industry: "Automotive",
    country: "United States",
    description: "Electric luxury vehicle manufacturer.",
  },
  {
    name: "Fisker",
    website: "https://fiskerinc.com",
    industry: "Automotive",
    country: "United States",
    description: "Electric vehicle company focused on sustainable mobility.",
  },
  {
    name: "Canoo",
    website: "https://canoo.com",
    industry: "Automotive",
    country: "United States",
    description:
      "Electric vehicles with multi-purpose lifestyle and delivery vans.",
  },
  {
    name: "Lordstown Motors",
    website: "https://lordstownmotors.com",
    industry: "Automotive",
    country: "United States",
    description: "Electric vehicle company for commercial fleet.",
  },
  {
    name: "Workhorse Group",
    website: "https://workhorse.com",
    industry: "Automotive",
    country: "United States",
    description: "Technology company focused on electric delivery vehicles.",
  },
  {
    name: "Lightning eMotors",
    website: "https://lightningemotors.com",
    industry: "Automotive",
    country: "United States",
    description: "Electric powertrains for medium and heavy-duty vehicles.",
  },
  {
    name: "Proterra",
    website: "https://proterra.com",
    industry: "Automotive",
    country: "United States",
    description: "Electric transit bus manufacturer and charging solutions.",
  },
  {
    name: "Lion Electric",
    website: "https://thelionelectric.com",
    industry: "Automotive",
    country: "Canada",
    description: "Zero-emission medium and heavy-duty vehicles.",
  },
  {
    name: "Volta Industries",
    website: "https://voltacharging.com",
    industry: "Automotive",
    country: "United States",
    description:
      "EV charging network with advertising-supported free charging.",
  },
  {
    name: "Blink Charging",
    website: "https://blinkcharging.com",
    industry: "Automotive",
    country: "United States",
    description: "Owner and operator of EV charging equipment and network.",
  },
  {
    name: "ChargePoint",
    website: "https://chargepoint.com",
    industry: "Automotive",
    country: "United States",
    description: "Electric vehicle charging network and solutions.",
  },
  {
    name: "EVgo",
    website: "https://evgo.com",
    industry: "Automotive",
    country: "United States",
    description: "Fast charging network for electric vehicles in the US.",
  },
  {
    name: "Electrify America",
    website: "https://electrifyamerica.com",
    industry: "Automotive",
    country: "United States",
    description: "Open electric vehicle charging network in North America.",
  },
  {
    name: "Mobileye",
    website: "https://mobileye.com",
    industry: "Automotive",
    country: "Israel",
    description: "Autonomous driving and advanced driver assistance systems.",
  },
  {
    name: "Aptiv",
    website: "https://aptiv.com",
    industry: "Automotive",
    country: "Ireland",
    description:
      "Advanced electrical architecture and autonomous driving technology.",
  },
  {
    name: "Visteon",
    website: "https://visteon.com",
    industry: "Automotive",
    country: "United States",
    description: "Cockpit electronics supplier for automotive industry.",
  },
  {
    name: "Lear Corporation",
    website: "https://lear.com",
    industry: "Automotive",
    country: "United States",
    description: "Automotive seating and electrical systems manufacturer.",
  },
  {
    name: "BorgWarner",
    website: "https://borgwarner.com",
    industry: "Automotive",
    country: "United States",
    description: "Clean and efficient powertrain solutions for vehicles.",
  },
  {
    name: "Gentex",
    website: "https://gentex.com",
    industry: "Automotive",
    country: "United States",
    description:
      "Electrochromic automatic-dimming mirrors and camera-based systems.",
  },
  {
    name: "Modine Manufacturing",
    website: "https://modine.com",
    industry: "Automotive",
    country: "United States",
    description:
      "Thermal management solutions for vehicles and industrial uses.",
  },
  {
    name: "Dana Incorporated",
    website: "https://dana.com",
    industry: "Automotive",
    country: "United States",
    description: "Drivetrain and sealing solutions for vehicles.",
  },
  {
    name: "Methode Electronics",
    website: "https://methode.com",
    industry: "Automotive",
    country: "United States",
    description: "Electronic components and systems for vehicles.",
  },
  {
    name: "Dorman Products",
    website: "https://dormanproducts.com",
    industry: "Automotive",
    country: "United States",
    description: "Aftermarket auto parts for passenger cars and trucks.",
  },
  {
    name: "AutoNation",
    website: "https://autonation.com",
    industry: "Automotive",
    country: "United States",
    description: "America's largest automotive retailer.",
  },
  {
    name: "CarMax",
    website: "https://carmax.com",
    industry: "Automotive",
    country: "United States",
    description: "Used car retailer with a no-haggle pricing model.",
  },
  {
    name: "Carvana",
    website: "https://carvana.com",
    industry: "Automotive",
    country: "United States",
    description: "Online used car platform with home delivery.",
  },
  {
    name: "Vroom",
    website: "https://vroom.com",
    industry: "Automotive",
    country: "United States",
    description: "E-commerce used vehicle platform for buying and selling.",
  },
  {
    name: "TrueCar",
    website: "https://truecar.com",
    industry: "Automotive",
    country: "United States",
    description:
      "Digital automotive marketplace connecting buyers and dealers.",
  },
  {
    name: "Cars.com",
    website: "https://cars.com",
    industry: "Automotive",
    country: "United States",
    description: "Digital marketplace for automotive shopping and research.",
  },
  // ── Real Estate & PropTech ──
  {
    name: "Zillow",
    website: "https://zillow.com",
    industry: "Real Estate",
    country: "United States",
    description:
      "Online real estate marketplace for buying, selling, and renting.",
  },
  {
    name: "Redfin",
    website: "https://redfin.com",
    industry: "Real Estate",
    country: "United States",
    description: "Technology-powered real estate brokerage.",
  },
  {
    name: "Opendoor",
    website: "https://opendoor.com",
    industry: "Real Estate",
    country: "United States",
    description: "iBuying platform for buying and selling homes online.",
  },
  {
    name: "Offerpad",
    website: "https://offerpad.com",
    industry: "Real Estate",
    country: "United States",
    description: "Technology-enabled residential real estate marketplace.",
  },
  {
    name: "Orchard",
    website: "https://orchard.com",
    industry: "Real Estate",
    country: "United States",
    description: "Buy-before-you-sell home trade-in platform.",
  },
  {
    name: "Knock",
    website: "https://knock.com",
    industry: "Real Estate",
    country: "United States",
    description: "Home trade-in service for buying and selling simultaneously.",
  },
  {
    name: "Ribbon",
    website: "https://ribbonhome.com",
    industry: "Real Estate",
    country: "United States",
    description: "Cash offer platform to make homebuying more competitive.",
  },
  {
    name: "Homeward",
    website: "https://homeward.com",
    industry: "Real Estate",
    country: "United States",
    description: "Buy before you sell service for homeowners.",
  },
  {
    name: "Sundae",
    website: "https://sundae.com",
    industry: "Real Estate",
    country: "United States",
    description: "Residential real estate marketplace for homes needing work.",
  },
  {
    name: "Roofstock",
    website: "https://roofstock.com",
    industry: "Real Estate",
    country: "United States",
    description: "Online marketplace for buying and selling rental homes.",
  },
  {
    name: "Arrived Homes",
    website: "https://arrived.com",
    industry: "Real Estate",
    country: "United States",
    description: "Platform for fractional real estate investment.",
  },
  {
    name: "Fundrise",
    website: "https://fundrise.com",
    industry: "Real Estate",
    country: "United States",
    description: "Real estate investment platform for individual investors.",
  },
  {
    name: "RealPage",
    website: "https://realpage.com",
    industry: "Real Estate",
    country: "United States",
    description: "Real estate software and analytics for property managers.",
  },
  {
    name: "Yardi Systems",
    website: "https://yardi.com",
    industry: "Real Estate",
    country: "United States",
    description: "Property management and accounting software.",
  },
  {
    name: "AppFolio",
    website: "https://appfolio.com",
    industry: "Real Estate",
    country: "United States",
    description:
      "Cloud-based property management software for residential and commercial.",
  },
  {
    name: "Buildium",
    website: "https://buildium.com",
    industry: "Real Estate",
    country: "United States",
    description: "Property management software for residential properties.",
  },
  {
    name: "Rentec Direct",
    website: "https://rentecdirect.com",
    industry: "Real Estate",
    country: "United States",
    description: "Property management software for landlords and managers.",
  },
  {
    name: "TenantCloud",
    website: "https://tenantcloud.com",
    industry: "Real Estate",
    country: "United States",
    description: "Property management and accounting platform.",
  },
  {
    name: "Cozy",
    website: "https://cozy.co",
    industry: "Real Estate",
    country: "United States",
    description: "Online property management tool for landlords.",
  },
  {
    name: "Avail",
    website: "https://avail.co",
    industry: "Real Estate",
    country: "United States",
    description:
      "Landlord software for listing, screening, and managing tenants.",
  },
  {
    name: "Procore",
    website: "https://procore.com",
    industry: "Real Estate",
    country: "United States",
    description: "Construction project management software platform.",
  },
  {
    name: "Autodesk Construction Cloud",
    website: "https://construction.autodesk.com",
    industry: "Real Estate",
    country: "United States",
    description: "Integrated construction management solutions by Autodesk.",
  },
  {
    name: "PlanGrid",
    website: "https://plangrid.com",
    industry: "Real Estate",
    country: "United States",
    description: "Construction productivity software for field teams.",
  },
  {
    name: "Fieldwire",
    website: "https://fieldwire.com",
    industry: "Real Estate",
    country: "United States",
    description: "Construction project management platform for field teams.",
  },
  {
    name: "Buildertrend",
    website: "https://buildertrend.com",
    industry: "Real Estate",
    country: "United States",
    description: "Cloud-based construction project management software.",
  },
  {
    name: "CoConstruct",
    website: "https://coconstruct.com",
    industry: "Real Estate",
    country: "United States",
    description:
      "Project management and client communication for custom builders.",
  },
  {
    name: "Foundation Software",
    website: "https://foundationsoft.com",
    industry: "Real Estate",
    country: "United States",
    description: "Construction accounting and project management software.",
  },
  // ── HR Tech ──
  {
    name: "Workday",
    website: "https://workday.com",
    industry: "Technology",
    country: "United States",
    description:
      "Enterprise cloud applications for finance and human resources.",
  },
  {
    name: "BambooHR",
    website: "https://bamboohr.com",
    industry: "Technology",
    country: "United States",
    description: "HR software for small and medium businesses.",
  },
  {
    name: "Gusto",
    website: "https://gusto.com",
    industry: "Technology",
    country: "United States",
    description: "Payroll, benefits, and HR platform for small businesses.",
  },
  {
    name: "Rippling",
    website: "https://rippling.com",
    industry: "Technology",
    country: "United States",
    description: "Workforce management platform for HR, IT, and Finance.",
  },
  {
    name: "Namely",
    website: "https://namely.com",
    industry: "Technology",
    country: "United States",
    description: "HR platform for mid-market companies.",
  },
  {
    name: "Lattice",
    website: "https://lattice.com",
    industry: "Technology",
    country: "United States",
    description: "People management platform for performance and engagement.",
  },
  {
    name: "Culture Amp",
    website: "https://cultureamp.com",
    industry: "Technology",
    country: "Australia",
    description: "Employee experience platform for engagement and performance.",
  },
  {
    name: "Leapsome",
    website: "https://leapsome.com",
    industry: "Technology",
    country: "Germany",
    description: "People enablement platform for performance and learning.",
  },
  {
    name: "15Five",
    website: "https://15five.com",
    industry: "Technology",
    country: "United States",
    description: "Continuous performance management platform.",
  },
  {
    name: "Betterworks",
    website: "https://betterworks.com",
    industry: "Technology",
    country: "United States",
    description: "Enterprise performance management software.",
  },
  {
    name: "Engagedly",
    website: "https://engagedly.com",
    industry: "Technology",
    country: "United States",
    description: "Employee engagement and performance management platform.",
  },
  {
    name: "Trakstar",
    website: "https://trakstar.com",
    industry: "Technology",
    country: "United States",
    description: "Employee performance management and learning platform.",
  },
  {
    name: "Cornerstone OnDemand",
    website: "https://cornerstoneondemand.com",
    industry: "Technology",
    country: "United States",
    description: "Talent management and learning platform for enterprises.",
  },
  {
    name: "Saba Software",
    website: "https://saba.com",
    industry: "Technology",
    country: "United States",
    description: "Talent management and learning solutions for global teams.",
  },
  {
    name: "Docebo",
    website: "https://docebo.com",
    industry: "Technology",
    country: "Canada",
    description: "AI-powered learning management system for enterprises.",
  },
  {
    name: "TalentLMS",
    website: "https://talentlms.com",
    industry: "Technology",
    country: "Greece",
    description: "Cloud-based learning management system.",
  },
  {
    name: "iSpring",
    website: "https://ispringsolutions.com",
    industry: "Technology",
    country: "Russia",
    description: "eLearning authoring tools and online training platform.",
  },
  {
    name: "Articulate",
    website: "https://articulate.com",
    industry: "Technology",
    country: "United States",
    description: "E-learning authoring tools and online training creation.",
  },
  {
    name: "Lessonly",
    website: "https://lessonly.com",
    industry: "Technology",
    country: "United States",
    description: "Learning management software for teams.",
  },
  {
    name: "Trainual",
    website: "https://trainual.com",
    industry: "Technology",
    country: "United States",
    description: "Business playbook and employee training platform.",
  },
  {
    name: "Greenhouse",
    website: "https://greenhouse.io",
    industry: "Technology",
    country: "United States",
    description: "Applicant tracking and recruiting software platform.",
  },
  {
    name: "Lever",
    website: "https://lever.co",
    industry: "Technology",
    country: "United States",
    description: "Talent acquisition suite combining ATS and CRM.",
  },
  {
    name: "Workable",
    website: "https://workable.com",
    industry: "Technology",
    country: "Greece",
    description: "Recruiting software for companies growing their teams.",
  },
  {
    name: "JazzHR",
    website: "https://jazzhr.com",
    industry: "Technology",
    country: "United States",
    description: "Recruiting software for small and medium businesses.",
  },
  {
    name: "SmartRecruiters",
    website: "https://smartrecruiters.com",
    industry: "Technology",
    country: "United States",
    description: "Talent acquisition platform for enterprises.",
  },
  {
    name: "iCIMS",
    website: "https://icims.com",
    industry: "Technology",
    country: "United States",
    description: "Talent cloud for enterprise recruiting and hiring.",
  },
  {
    name: "Jobvite",
    website: "https://jobvite.com",
    industry: "Technology",
    country: "United States",
    description: "Talent acquisition software for recruiting and onboarding.",
  },
  {
    name: "Taleo",
    website: "https://oracle.com/taleo",
    industry: "Technology",
    country: "United States",
    description: "Talent management cloud by Oracle.",
  },
  {
    name: "Beamery",
    website: "https://beamery.com",
    industry: "Technology",
    country: "United Kingdom",
    description:
      "Talent operating system for candidate relationship management.",
  },
  {
    name: "Eightfold AI",
    website: "https://eightfold.ai",
    industry: "Technology",
    country: "United States",
    description: "AI-powered talent intelligence platform.",
  },
  // ── Energy & CleanTech ──
  {
    name: "Enphase Energy",
    website: "https://enphase.com",
    industry: "Energy",
    country: "United States",
    description: "Solar and battery energy systems for homes and businesses.",
  },
  {
    name: "SolarEdge",
    website: "https://solaredge.com",
    industry: "Energy",
    country: "Israel",
    description: "Smart energy technology for solar power optimization.",
  },
  {
    name: "SunPower",
    website: "https://sunpower.com",
    industry: "Energy",
    country: "United States",
    description: "High-efficiency solar panels and energy solutions.",
  },
  {
    name: "Sunrun",
    website: "https://sunrun.com",
    industry: "Energy",
    country: "United States",
    description: "Residential solar and battery storage solutions.",
  },
  {
    name: "Sunnova",
    website: "https://sunnova.com",
    industry: "Energy",
    country: "United States",
    description: "Solar and energy storage service provider.",
  },
  {
    name: "Vivint Solar",
    website: "https://vivintsolar.com",
    industry: "Energy",
    country: "United States",
    description: "Residential solar energy system installer.",
  },
  {
    name: "SolarCity",
    website: "https://solarcity.com",
    industry: "Energy",
    country: "United States",
    description: "Solar energy services by Tesla.",
  },
  {
    name: "Ormat Technologies",
    website: "https://ormat.com",
    industry: "Energy",
    country: "United States",
    description: "Geothermal power plants and recovered energy generation.",
  },
  {
    name: "Bloom Energy",
    website: "https://bloomenergy.com",
    industry: "Energy",
    country: "United States",
    description: "Clean electricity via solid oxide fuel cell technology.",
  },
  {
    name: "FuelCell Energy",
    website: "https://fuelcellenergy.com",
    industry: "Energy",
    country: "United States",
    description:
      "Fuel cell power plants for clean distributed power generation.",
  },
  {
    name: "Plug Power",
    website: "https://plugpower.com",
    industry: "Energy",
    country: "United States",
    description: "Green hydrogen solutions and fuel cell systems.",
  },
  {
    name: "Ballard Power Systems",
    website: "https://ballard.com",
    industry: "Energy",
    country: "Canada",
    description: "Proton exchange membrane fuel cell products.",
  },
  {
    name: "Ceres Power",
    website: "https://cerespower.com",
    industry: "Energy",
    country: "United Kingdom",
    description: "Steel cell technology for distributed power generation.",
  },
  {
    name: "ITM Power",
    website: "https://itm-power.com",
    industry: "Energy",
    country: "United Kingdom",
    description: "Electrolysis systems for green hydrogen production.",
  },
  {
    name: "Nel Hydrogen",
    website: "https://nelhydrogen.com",
    industry: "Energy",
    country: "Norway",
    description: "Hydrogen production, storage, and distribution equipment.",
  },
  {
    name: "Siemens Energy",
    website: "https://siemens-energy.com",
    industry: "Energy",
    country: "Germany",
    description: "Energy technology for generation, transmission, and storage.",
  },
  {
    name: "Vestas",
    website: "https://vestas.com",
    industry: "Energy",
    country: "Denmark",
    description: "Wind turbine manufacturer and service provider.",
  },
  {
    name: "Ørsted",
    website: "https://orsted.com",
    industry: "Energy",
    country: "Denmark",
    description: "Global leader in offshore wind energy.",
  },
  {
    name: "RWE",
    website: "https://rwe.com",
    industry: "Energy",
    country: "Germany",
    description: "Renewables energy company and power generation.",
  },
  {
    name: "Vattenfall",
    website: "https://vattenfall.com",
    industry: "Energy",
    country: "Sweden",
    description: "European energy company specializing in renewables.",
  },
  {
    name: "EDF Renewables",
    website: "https://edf-re.com",
    industry: "Energy",
    country: "France",
    description: "Renewable energy development and operations.",
  },
  {
    name: "Iberdrola",
    website: "https://iberdrola.com",
    industry: "Energy",
    country: "Spain",
    description: "Integrated electric utility focused on renewable energy.",
  },
  {
    name: "Enel Green Power",
    website: "https://enelgreenpower.com",
    industry: "Energy",
    country: "Italy",
    description: "Renewable energy subsidiary of Enel Group.",
  },
  {
    name: "Lightsource bp",
    website: "https://lightsourcebp.com",
    industry: "Energy",
    country: "United Kingdom",
    description: "Global solar energy developer and operator.",
  },
  {
    name: "Intersect Power",
    website: "https://intersectpower.com",
    industry: "Energy",
    country: "United States",
    description: "Clean energy developer for solar and storage.",
  },
  {
    name: "Invenergy",
    website: "https://invenergy.com",
    industry: "Energy",
    country: "United States",
    description: "Independent developer of renewable energy projects.",
  },
  {
    name: "NextEra Energy Resources",
    website: "https://nexteraenergyresources.com",
    industry: "Energy",
    country: "United States",
    description: "Largest generator of renewable energy from wind and sun.",
  },
  {
    name: "LS Power",
    website: "https://lspower.com",
    industry: "Energy",
    country: "United States",
    description: "Power development, acquisition, and operating company.",
  },
  {
    name: "AES Corporation",
    website: "https://aes.com",
    industry: "Energy",
    country: "United States",
    description:
      "Global power company accelerating the clean energy transition.",
  },
  {
    name: "Clearway Energy",
    website: "https://clearwayenergy.com",
    industry: "Energy",
    country: "United States",
    description: "Renewable energy owner and operator.",
  },
  // ── Travel & Hospitality ──
  {
    name: "Booking Holdings",
    website: "https://bookingholdings.com",
    industry: "Travel",
    country: "United States",
    description: "Online travel and restaurant booking services.",
  },
  {
    name: "Expedia Group",
    website: "https://expediagroup.com",
    industry: "Travel",
    country: "United States",
    description: "Global travel technology company.",
  },
  {
    name: "Airbnb",
    website: "https://airbnb.com",
    industry: "Travel",
    country: "United States",
    description: "Online marketplace for lodging and travel experiences.",
  },
  {
    name: "Vrbo",
    website: "https://vrbo.com",
    industry: "Travel",
    country: "United States",
    description: "Vacation rental marketplace by Expedia Group.",
  },
  {
    name: "TripAdvisor",
    website: "https://tripadvisor.com",
    industry: "Travel",
    country: "United States",
    description: "Travel platform with reviews, bookings, and planning tools.",
  },
  {
    name: "Hopper",
    website: "https://hopper.com",
    industry: "Travel",
    country: "Canada",
    description:
      "Mobile travel app with price prediction for flights and hotels.",
  },
  {
    name: "Skyscanner",
    website: "https://skyscanner.com",
    industry: "Travel",
    country: "United Kingdom",
    description: "Global travel search platform for flights, hotels, and cars.",
  },
  {
    name: "Kayak",
    website: "https://kayak.com",
    industry: "Travel",
    country: "United States",
    description: "Travel search engine owned by Booking Holdings.",
  },
  {
    name: "Google Flights",
    website: "https://google.com/flights",
    industry: "Travel",
    country: "United States",
    description: "Flight search tool integrated into Google Search.",
  },
  {
    name: "Rome2rio",
    website: "https://rome2rio.com",
    industry: "Travel",
    country: "Australia",
    description: "Multimodal trip planning search engine.",
  },
  {
    name: "GetYourGuide",
    website: "https://getyourguide.com",
    industry: "Travel",
    country: "Germany",
    description: "Online marketplace for travel experiences and tours.",
  },
  {
    name: "Viator",
    website: "https://viator.com",
    industry: "Travel",
    country: "United States",
    description:
      "Tours, activities, and experiences marketplace by Tripadvisor.",
  },
  {
    name: "Klook",
    website: "https://klook.com",
    industry: "Travel",
    country: "Hong Kong",
    description: "Online travel activities and attractions booking platform.",
  },
  {
    name: "Musement",
    website: "https://musement.com",
    industry: "Travel",
    country: "Italy",
    description: "Online marketplace for tours and activities worldwide.",
  },
  {
    name: "TourRadar",
    website: "https://tourradar.com",
    industry: "Travel",
    country: "Austria",
    description: "Online marketplace for multi-day tours.",
  },
  {
    name: "Intrepid Travel",
    website: "https://intrepidtravel.com",
    industry: "Travel",
    country: "Australia",
    description: "Sustainable adventure travel company.",
  },
  {
    name: "G Adventures",
    website: "https://gadventures.com",
    industry: "Travel",
    country: "Canada",
    description: "Small group adventure travel company.",
  },
  {
    name: "Lindblad Expeditions",
    website: "https://expeditions.com",
    industry: "Travel",
    country: "United States",
    description: "Expedition travel company for remote destinations.",
  },
  {
    name: "Abercrombie & Kent",
    website: "https://abercrombiekent.com",
    industry: "Travel",
    country: "United Kingdom",
    description: "Luxury travel company for premium experiences.",
  },
  {
    name: "Kiwi.com",
    website: "https://kiwi.com",
    industry: "Travel",
    country: "Czech Republic",
    description:
      "Platform for finding unique and budget-friendly flight routes.",
  },
  {
    name: "Momondo",
    website: "https://momondo.com",
    industry: "Travel",
    country: "Denmark",
    description: "Global flight, hotel, and car search platform.",
  },
  {
    name: "Hostelworld",
    website: "https://hostelworld.com",
    industry: "Travel",
    country: "Ireland",
    description: "Online hostel booking platform for budget travelers.",
  },
  {
    name: "HostelBookers",
    website: "https://hostelbookers.com",
    industry: "Travel",
    country: "United Kingdom",
    description: "Hostel booking website for backpackers and budget travelers.",
  },
  {
    name: "Amadeus",
    website: "https://amadeus.com",
    industry: "Travel",
    country: "Spain",
    description: "Global distribution and travel technology solutions.",
  },
  {
    name: "Sabre Corporation",
    website: "https://sabre.com",
    industry: "Travel",
    country: "United States",
    description:
      "Travel technology solutions for airlines, hotels, and agencies.",
  },
  {
    name: "Travelport",
    website: "https://travelport.com",
    industry: "Travel",
    country: "United Kingdom",
    description: "Travel commerce platform for travel agencies.",
  },
  // ── Cybersecurity ──
  {
    name: "Palo Alto Networks",
    website: "https://paloaltonetworks.com",
    industry: "Cybersecurity",
    country: "United States",
    description: "Cybersecurity platform with AI-powered network security.",
  },
  {
    name: "Fortinet",
    website: "https://fortinet.com",
    industry: "Cybersecurity",
    country: "United States",
    description: "Network security and cybersecurity solutions.",
  },
  {
    name: "Check Point Software",
    website: "https://checkpoint.com",
    industry: "Cybersecurity",
    country: "Israel",
    description: "Cyber security solutions for networks, clouds, and users.",
  },
  {
    name: "Sophos",
    website: "https://sophos.com",
    industry: "Cybersecurity",
    country: "United Kingdom",
    description: "Next-generation cybersecurity for endpoint and network.",
  },
  {
    name: "ESET",
    website: "https://eset.com",
    industry: "Cybersecurity",
    country: "Slovakia",
    description:
      "IT security software and services for consumers and businesses.",
  },
  {
    name: "Kaspersky",
    website: "https://kaspersky.com",
    industry: "Cybersecurity",
    country: "Russia",
    description:
      "Antivirus and cybersecurity products for consumers and businesses.",
  },
  {
    name: "Bitdefender",
    website: "https://bitdefender.com",
    industry: "Cybersecurity",
    country: "Romania",
    description:
      "Cybersecurity company with antivirus and threat intelligence.",
  },
  {
    name: "Malwarebytes",
    website: "https://malwarebytes.com",
    industry: "Cybersecurity",
    country: "United States",
    description: "Anti-malware software for consumer and business endpoints.",
  },
  {
    name: "Webroot",
    website: "https://webroot.com",
    industry: "Cybersecurity",
    country: "United States",
    description: "Cloud-based cybersecurity solutions for endpoints.",
  },
  {
    name: "Avast",
    website: "https://avast.com",
    industry: "Cybersecurity",
    country: "Czech Republic",
    description: "Antivirus and internet security software.",
  },
  {
    name: "AVG Technologies",
    website: "https://avg.com",
    industry: "Cybersecurity",
    country: "Czech Republic",
    description: "Antivirus and security tools for consumers and businesses.",
  },
  {
    name: "Trend Micro",
    website: "https://trendmicro.com",
    industry: "Cybersecurity",
    country: "Japan",
    description: "Global cybersecurity company for cloud and network security.",
  },
  {
    name: "McAfee Enterprise",
    website: "https://mcafee.com",
    industry: "Cybersecurity",
    country: "United States",
    description: "Enterprise cybersecurity solutions for cloud and endpoint.",
  },
  {
    name: "Symantec",
    website: "https://broadcom.com/symantec",
    industry: "Cybersecurity",
    country: "United States",
    description: "Enterprise cybersecurity division of Broadcom.",
  },
  {
    name: "Imperva",
    website: "https://imperva.com",
    industry: "Cybersecurity",
    country: "United States",
    description: "Cyber security solutions for application and data security.",
  },
  {
    name: "Akamai",
    website: "https://akamai.com",
    industry: "Cybersecurity",
    country: "United States",
    description: "CDN, cloud security, and edge computing services.",
  },
  {
    name: "Cloudflare",
    website: "https://cloudflare.com",
    industry: "Cybersecurity",
    country: "United States",
    description: "Web performance and security company.",
  },
  {
    name: "Zscaler",
    website: "https://zscaler.com",
    industry: "Cybersecurity",
    country: "United States",
    description: "Cloud security platform for zero trust network access.",
  },
  {
    name: "Netskope",
    website: "https://netskope.com",
    industry: "Cybersecurity",
    country: "United States",
    description: "Security service edge platform for cloud security.",
  },
  {
    name: "Lookout",
    website: "https://lookout.com",
    industry: "Cybersecurity",
    country: "United States",
    description: "Cloud-delivered security for mobile and endpoint.",
  },
  {
    name: "Forcepoint",
    website: "https://forcepoint.com",
    industry: "Cybersecurity",
    country: "United States",
    description: "Data-first cybersecurity for people-centric security.",
  },
  {
    name: "Digital Guardian",
    website: "https://digitalguardian.com",
    industry: "Cybersecurity",
    country: "United States",
    description: "Data loss prevention and endpoint protection platform.",
  },
  {
    name: "Code42",
    website: "https://code42.com",
    industry: "Cybersecurity",
    country: "United States",
    description: "Insider risk management and data loss protection.",
  },
  {
    name: "ObserveIT",
    website: "https://observeit.com",
    industry: "Cybersecurity",
    country: "United States",
    description: "Insider threat detection and investigation platform.",
  },
  {
    name: "Proofpoint",
    website: "https://proofpoint.com",
    industry: "Cybersecurity",
    country: "United States",
    description: "Email and cloud security solutions for enterprises.",
  },
  {
    name: "Mimecast",
    website: "https://mimecast.com",
    industry: "Cybersecurity",
    country: "United Kingdom",
    description: "Cloud-based email management and security platform.",
  },
  {
    name: "Barracuda Networks",
    website: "https://barracuda.com",
    industry: "Cybersecurity",
    country: "United States",
    description:
      "Cloud-enabled security solutions for email, networks, and data.",
  },
  {
    name: "Abnormal Security",
    website: "https://abnormalsecurity.com",
    industry: "Cybersecurity",
    country: "United States",
    description: "AI-powered email security platform.",
  },
  {
    name: "Agari",
    website: "https://agari.com",
    industry: "Cybersecurity",
    country: "United States",
    description: "Email security platform using machine learning.",
  },
  {
    name: "Area 1 Security",
    website: "https://area1security.com",
    industry: "Cybersecurity",
    country: "United States",
    description: "Cloud-based email security to stop phishing attacks.",
  },
  // ── AI/ML Companies ──
  {
    name: "Anthropic",
    website: "https://anthropic.com",
    industry: "Artificial Intelligence",
    country: "United States",
    description:
      "AI safety company building large language models and Claude AI.",
  },
  {
    name: "Cohere",
    website: "https://cohere.com",
    industry: "Artificial Intelligence",
    country: "Canada",
    description: "NLP platform with large language models for enterprise use.",
  },
  {
    name: "AI21 Labs",
    website: "https://ai21.com",
    industry: "Artificial Intelligence",
    country: "Israel",
    description: "AI research company building advanced language models.",
  },
  {
    name: "Stability AI",
    website: "https://stability.ai",
    industry: "Artificial Intelligence",
    country: "United Kingdom",
    description: "AI company behind Stable Diffusion image generation model.",
  },
  {
    name: "Midjourney",
    website: "https://midjourney.com",
    industry: "Artificial Intelligence",
    country: "United States",
    description: "AI image generation service accessed via Discord.",
  },
  {
    name: "Jasper AI",
    website: "https://jasper.ai",
    industry: "Artificial Intelligence",
    country: "United States",
    description: "AI content creation platform for marketing teams.",
  },
  {
    name: "Copy.ai",
    website: "https://copy.ai",
    industry: "Artificial Intelligence",
    country: "United States",
    description: "AI writing tool for marketing copy and content.",
  },
  {
    name: "Writesonic",
    website: "https://writesonic.com",
    industry: "Artificial Intelligence",
    country: "United States",
    description: "AI writing assistant for blogs, ads, and marketing.",
  },
  {
    name: "Rytr",
    website: "https://rytr.me",
    industry: "Artificial Intelligence",
    country: "India",
    description: "AI writing assistant for creating content quickly.",
  },
  {
    name: "Notion AI",
    website: "https://notion.so",
    industry: "Artificial Intelligence",
    country: "United States",
    description:
      "AI-powered workspace for notes, documents, and collaboration.",
  },
  {
    name: "Character.ai",
    website: "https://character.ai",
    industry: "Artificial Intelligence",
    country: "United States",
    description:
      "AI chatbot platform for creating and talking with characters.",
  },
  {
    name: "Inflection AI",
    website: "https://inflection.ai",
    industry: "Artificial Intelligence",
    country: "United States",
    description: "AI company behind Pi personal intelligence assistant.",
  },
  {
    name: "Adept AI",
    website: "https://adept.ai",
    industry: "Artificial Intelligence",
    country: "United States",
    description: "AI research lab building general intelligence.",
  },
  {
    name: "Imbue",
    website: "https://imbue.com",
    industry: "Artificial Intelligence",
    country: "United States",
    description: "AI research company training agents for complex reasoning.",
  },
  {
    name: "Mistral AI",
    website: "https://mistral.ai",
    industry: "Artificial Intelligence",
    country: "France",
    description: "European AI company building open-source language models.",
  },
  {
    name: "Aleph Alpha",
    website: "https://aleph-alpha.com",
    industry: "Artificial Intelligence",
    country: "Germany",
    description: "European AI company for sovereign and explainable AI.",
  },
  {
    name: "Luminous Labs",
    website: "https://luminous.io",
    industry: "Artificial Intelligence",
    country: "United States",
    description: "AI startup building advanced reasoning systems.",
  },
  {
    name: "Weights & Biases",
    website: "https://wandb.ai",
    industry: "Artificial Intelligence",
    country: "United States",
    description: "MLOps platform for tracking machine learning experiments.",
  },
  {
    name: "Neptune.ai",
    website: "https://neptune.ai",
    industry: "Artificial Intelligence",
    country: "Poland",
    description: "Metadata store for MLOps and model monitoring.",
  },
  {
    name: "Comet ML",
    website: "https://comet.com",
    industry: "Artificial Intelligence",
    country: "United States",
    description: "Machine learning experiment tracking and model monitoring.",
  },
  {
    name: "MLflow",
    website: "https://mlflow.org",
    industry: "Artificial Intelligence",
    country: "United States",
    description: "Open-source platform for managing the ML lifecycle.",
  },
  {
    name: "Kubeflow",
    website: "https://kubeflow.org",
    industry: "Artificial Intelligence",
    country: "United States",
    description: "Machine learning toolkit for Kubernetes.",
  },
  {
    name: "Seldon",
    website: "https://seldon.io",
    industry: "Artificial Intelligence",
    country: "United Kingdom",
    description: "MLOps platform for model deployment and monitoring.",
  },
  {
    name: "BentoML",
    website: "https://bentoml.com",
    industry: "Artificial Intelligence",
    country: "United States",
    description: "Framework for building and deploying ML-powered services.",
  },
  {
    name: "Hugging Face",
    website: "https://huggingface.co",
    industry: "Artificial Intelligence",
    country: "United States",
    description:
      "AI community platform for sharing models, datasets, and apps.",
  },
  {
    name: "LangChain",
    website: "https://langchain.com",
    industry: "Artificial Intelligence",
    country: "United States",
    description:
      "Framework for building applications with large language models.",
  },
  {
    name: "LlamaIndex",
    website: "https://llamaindex.ai",
    industry: "Artificial Intelligence",
    country: "United States",
    description: "Data framework for LLM-based applications.",
  },
  {
    name: "Pinecone",
    website: "https://pinecone.io",
    industry: "Artificial Intelligence",
    country: "United States",
    description: "Vector database for machine learning applications.",
  },
  {
    name: "Weaviate",
    website: "https://weaviate.io",
    industry: "Artificial Intelligence",
    country: "Netherlands",
    description: "Open-source vector database for AI-native applications.",
  },
  {
    name: "Qdrant",
    website: "https://qdrant.tech",
    industry: "Artificial Intelligence",
    country: "Germany",
    description: "Vector similarity search engine for AI applications.",
  },
  {
    name: "Chroma",
    website: "https://trychroma.com",
    industry: "Artificial Intelligence",
    country: "United States",
    description: "AI-native open-source embedding database.",
  },
  {
    name: "Milvus",
    website: "https://milvus.io",
    industry: "Artificial Intelligence",
    country: "United States",
    description: "Open-source vector database for scalable similarity search.",
  },
  // ── Telecommunications ──
  {
    name: "Verizon",
    website: "https://verizon.com",
    industry: "Telecom",
    country: "United States",
    description: "Wireless network operator and telecommunications company.",
  },
  {
    name: "AT&T",
    website: "https://att.com",
    industry: "Telecom",
    country: "United States",
    description: "Multinational telecommunications company.",
  },
  {
    name: "T-Mobile US",
    website: "https://t-mobile.com",
    industry: "Telecom",
    country: "United States",
    description: "Wireless network operator with nationwide 5G coverage.",
  },
  {
    name: "Comcast",
    website: "https://comcast.com",
    industry: "Telecom",
    country: "United States",
    description: "Broadband, cable, and telecommunications services.",
  },
  {
    name: "Charter Communications",
    website: "https://charter.com",
    industry: "Telecom",
    country: "United States",
    description: "Broadband, video, voice, and mobile services.",
  },
  {
    name: "Cox Communications",
    website: "https://cox.com",
    industry: "Telecom",
    country: "United States",
    description: "Digital cable, telecommunications, and internet services.",
  },
  {
    name: "Lumen Technologies",
    website: "https://lumen.com",
    industry: "Telecom",
    country: "United States",
    description: "Fiber network and cloud connectivity solutions.",
  },
  {
    name: "Frontier Communications",
    website: "https://frontier.com",
    industry: "Telecom",
    country: "United States",
    description: "Broadband and telecommunications services provider.",
  },
  {
    name: "Windstream",
    website: "https://windstream.com",
    industry: "Telecom",
    country: "United States",
    description: "Broadband and telecommunications services.",
  },
  {
    name: "Consolidated Communications",
    website: "https://consolidated.com",
    industry: "Telecom",
    country: "United States",
    description: "Regional broadband and telecommunications provider.",
  },
  {
    name: "Vodafone",
    website: "https://vodafone.com",
    industry: "Telecom",
    country: "United Kingdom",
    description: "Global telecommunications and technology services company.",
  },
  {
    name: "BT Group",
    website: "https://bt.com",
    industry: "Telecom",
    country: "United Kingdom",
    description: "British multinational telecommunications holding company.",
  },
  {
    name: "Orange",
    website: "https://orange.com",
    industry: "Telecom",
    country: "France",
    description: "French multinational telecommunications corporation.",
  },
  {
    name: "Deutsche Telekom",
    website: "https://telekom.com",
    industry: "Telecom",
    country: "Germany",
    description: "German telecommunications company and T-Mobile parent.",
  },
  {
    name: "Telefónica",
    website: "https://telefonica.com",
    industry: "Telecom",
    country: "Spain",
    description:
      "Spanish multinational broadband and telecommunications provider.",
  },
  {
    name: "Telecom Italia",
    website: "https://telecomitalia.it",
    industry: "Telecom",
    country: "Italy",
    description:
      "Italian telecommunications company providing services nationwide.",
  },
  {
    name: "Swisscom",
    website: "https://swisscom.ch",
    industry: "Telecom",
    country: "Switzerland",
    description: "Switzerland's leading telecom and ICT company.",
  },
  {
    name: "KPN",
    website: "https://kpn.com",
    industry: "Telecom",
    country: "Netherlands",
    description: "Dutch telecommunications and IT service provider.",
  },
  {
    name: "Proximus",
    website: "https://proximus.com",
    industry: "Telecom",
    country: "Belgium",
    description: "Belgian provider of digital services and communications.",
  },
  {
    name: "Telia Company",
    website: "https://telia.com",
    industry: "Telecom",
    country: "Sweden",
    description: "Nordic and Baltic telecommunications company.",
  },
  {
    name: "Telenor",
    website: "https://telenor.com",
    industry: "Telecom",
    country: "Norway",
    description: "Norwegian multinational telecommunications company.",
  },
  {
    name: "Elisa",
    website: "https://elisa.com",
    industry: "Telecom",
    country: "Finland",
    description: "Finnish telecommunications and ICT company.",
  },
  {
    name: "NTT Docomo",
    website: "https://docomo.ne.jp",
    industry: "Telecom",
    country: "Japan",
    description: "Japan's largest mobile phone operator.",
  },
  {
    name: "SoftBank",
    website: "https://softbank.com",
    industry: "Telecom",
    country: "Japan",
    description: "Japanese telecommunications and technology conglomerate.",
  },
  {
    name: "KDDI",
    website: "https://kddi.com",
    industry: "Telecom",
    country: "Japan",
    description:
      "Japanese telecommunications company providing mobile and broadband.",
  },
  {
    name: "SK Telecom",
    website: "https://sktelecom.com",
    industry: "Telecom",
    country: "South Korea",
    description: "South Korea's largest wireless telecommunications operator.",
  },
  {
    name: "KT Corporation",
    website: "https://kt.com",
    industry: "Telecom",
    country: "South Korea",
    description: "South Korean telecommunications company.",
  },
  {
    name: "China Mobile",
    website: "https://chinamobileltd.com",
    industry: "Telecom",
    country: "China",
    description: "World's largest mobile network operator by subscribers.",
  },
  {
    name: "China Unicom",
    website: "https://chinaunicom.com",
    industry: "Telecom",
    country: "China",
    description: "Chinese state-owned telecommunications company.",
  },
  {
    name: "Reliance Jio",
    website: "https://jio.com",
    industry: "Telecom",
    country: "India",
    description: "India's largest mobile network with 4G/5G services.",
  },
  {
    name: "Airtel",
    website: "https://airtel.in",
    industry: "Telecom",
    country: "India",
    description: "Indian multinational telecommunications services company.",
  },
  {
    name: "MTN Group",
    website: "https://mtn.com",
    industry: "Telecom",
    country: "South Africa",
    description: "Pan-African mobile telecommunications company.",
  },
  {
    name: "Safaricom",
    website: "https://safaricom.co.ke",
    industry: "Telecom",
    country: "Kenya",
    description:
      "Kenya's largest telecommunications provider and M-Pesa creator.",
  },
];
export const industries = [...new Set(companies.map((c) => c.industry))].sort();
export const countries = [...new Set(companies.map((c) => c.country))].sort();
