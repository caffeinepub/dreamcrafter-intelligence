export interface Company {
  name: string;
  website: string;
  industry: string;
  country: string;
  description: string;
}

export const companies: Company[] = [
  // Technology - USA
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
      "Electric vehicle manufacturer and clean energy company, producing cars, solar panels, and battery storage systems.",
  },
  {
    name: "Netflix",
    website: "https://netflix.com",
    industry: "Media",
    country: "United States",
    description:
      "Subscription-based streaming platform with original and licensed content across TV shows, films, and documentaries.",
  },
  {
    name: "Spotify",
    website: "https://spotify.com",
    industry: "Media",
    country: "Sweden",
    description:
      "Music and podcast streaming service with over 600 million users, offering free and premium subscription tiers.",
  },
  {
    name: "Salesforce",
    website: "https://salesforce.com",
    industry: "Technology",
    country: "United States",
    description:
      "Leading CRM platform providing cloud-based solutions for sales, service, marketing, and analytics.",
  },
  {
    name: "Oracle",
    website: "https://oracle.com",
    industry: "Technology",
    country: "United States",
    description:
      "Enterprise software giant specializing in database management, cloud applications, and business intelligence tools.",
  },
  {
    name: "IBM",
    website: "https://ibm.com",
    industry: "Technology",
    country: "United States",
    description:
      "Technology and consulting company with expertise in AI (Watson), cloud computing, and enterprise IT solutions.",
  },
  {
    name: "Intel",
    website: "https://intel.com",
    industry: "Technology",
    country: "United States",
    description:
      "Semiconductor manufacturer producing processors and chips for PCs, data centers, and IoT devices.",
  },
  {
    name: "NVIDIA",
    website: "https://nvidia.com",
    industry: "Technology",
    country: "United States",
    description:
      "Designs GPUs for gaming, professional visualization, AI/ML workloads, and data center computing.",
  },
  {
    name: "Qualcomm",
    website: "https://qualcomm.com",
    industry: "Technology",
    country: "United States",
    description:
      "Semiconductor company known for wireless technology, mobile chipsets, and 5G infrastructure innovations.",
  },
  {
    name: "Adobe",
    website: "https://adobe.com",
    industry: "Technology",
    country: "United States",
    description:
      "Creative software suite including Photoshop, Illustrator, and Premiere Pro, plus digital marketing solutions.",
  },
  {
    name: "Airbnb",
    website: "https://airbnb.com",
    industry: "Technology",
    country: "United States",
    description:
      "Online marketplace connecting people seeking accommodation with property owners offering short-term rentals worldwide.",
  },
  {
    name: "Uber",
    website: "https://uber.com",
    industry: "Technology",
    country: "United States",
    description:
      "Ride-hailing platform and delivery service operating in 70+ countries, disrupting traditional transportation.",
  },
  {
    name: "Lyft",
    website: "https://lyft.com",
    industry: "Technology",
    country: "United States",
    description:
      "Ride-sharing company offering affordable transportation solutions and bike/scooter rentals across North America.",
  },
  {
    name: "Twitter/X",
    website: "https://x.com",
    industry: "Technology",
    country: "United States",
    description:
      "Social media platform for real-time news, public conversation, and content sharing, rebranded to X.",
  },
  {
    name: "Snap",
    website: "https://snap.com",
    industry: "Technology",
    country: "United States",
    description:
      "Camera and social media company behind Snapchat, focused on augmented reality and visual communication.",
  },
  {
    name: "Pinterest",
    website: "https://pinterest.com",
    industry: "Technology",
    country: "United States",
    description:
      "Visual discovery and bookmarking platform for ideas in fashion, food, design, and lifestyle.",
  },
  {
    name: "Zoom",
    website: "https://zoom.us",
    industry: "Technology",
    country: "United States",
    description:
      "Video communications platform offering virtual meetings, webinars, and cloud phone systems for businesses.",
  },
  {
    name: "Slack",
    website: "https://slack.com",
    industry: "Technology",
    country: "United States",
    description:
      "Business messaging platform enabling team collaboration through channels, direct messages, and app integrations.",
  },
  {
    name: "Dropbox",
    website: "https://dropbox.com",
    industry: "Technology",
    country: "United States",
    description:
      "Cloud storage and file synchronization service for individuals and businesses with collaboration features.",
  },
  {
    name: "Stripe",
    website: "https://stripe.com",
    industry: "Finance",
    country: "United States",
    description:
      "Online payment processing platform for businesses, offering APIs for accepting payments and managing billing.",
  },
  {
    name: "Square",
    website: "https://squareup.com",
    industry: "Finance",
    country: "United States",
    description:
      "Financial services and mobile payment company providing POS systems, online payments, and business tools.",
  },
  {
    name: "PayPal",
    website: "https://paypal.com",
    industry: "Finance",
    country: "United States",
    description:
      "Digital payments platform enabling online money transfers and serving as an electronic alternative to traditional payment methods.",
  },
  {
    name: "Coinbase",
    website: "https://coinbase.com",
    industry: "Finance",
    country: "United States",
    description:
      "Cryptocurrency exchange platform enabling buying, selling, and storing of Bitcoin, Ethereum, and other digital assets.",
  },
  // Technology - Asia
  {
    name: "Samsung",
    website: "https://samsung.com",
    industry: "Technology",
    country: "South Korea",
    description:
      "Global electronics conglomerate producing smartphones, televisions, semiconductors, and home appliances.",
  },
  {
    name: "Sony",
    website: "https://sony.com",
    industry: "Technology",
    country: "Japan",
    description:
      "Diversified technology and entertainment company producing electronics, PlayStation gaming, music, and film content.",
  },
  {
    name: "Panasonic",
    website: "https://panasonic.com",
    industry: "Technology",
    country: "Japan",
    description:
      "Electronics manufacturer known for batteries, consumer electronics, and smart home solutions.",
  },
  {
    name: "Nintendo",
    website: "https://nintendo.com",
    industry: "Technology",
    country: "Japan",
    description:
      "Video game company creating iconic franchises like Mario, Zelda, and Pokémon, and innovative gaming hardware.",
  },
  {
    name: "Alibaba",
    website: "https://alibaba.com",
    industry: "Technology",
    country: "China",
    description:
      "E-commerce, cloud computing, and digital payment conglomerate dominating Asian markets with global expansion.",
  },
  {
    name: "Tencent",
    website: "https://tencent.com",
    industry: "Technology",
    country: "China",
    description:
      "Multinational conglomerate operating WeChat, gaming titles, and digital services across entertainment and finance.",
  },
  {
    name: "Baidu",
    website: "https://baidu.com",
    industry: "Technology",
    country: "China",
    description:
      "China's leading internet search engine and AI company, investing heavily in autonomous driving and cloud services.",
  },
  {
    name: "Huawei",
    website: "https://huawei.com",
    industry: "Technology",
    country: "China",
    description:
      "Global ICT solutions provider offering smartphones, 5G network equipment, and cloud computing services.",
  },
  {
    name: "Xiaomi",
    website: "https://xiaomi.com",
    industry: "Technology",
    country: "China",
    description:
      "Consumer electronics and smart manufacturing company known for affordable smartphones and IoT ecosystem.",
  },
  {
    name: "ByteDance",
    website: "https://bytedance.com",
    industry: "Technology",
    country: "China",
    description:
      "Technology company behind TikTok and Douyin, pioneering AI-driven content recommendation and short-form video.",
  },
  {
    name: "Infosys",
    website: "https://infosys.com",
    industry: "Technology",
    country: "India",
    description:
      "IT services and consulting company providing digital transformation, cloud, and AI solutions to global enterprises.",
  },
  {
    name: "Wipro",
    website: "https://wipro.com",
    industry: "Technology",
    country: "India",
    description:
      "IT services company offering consulting, technology, and business process services across multiple industries.",
  },
  {
    name: "Tata Consultancy Services",
    website: "https://tcs.com",
    industry: "Technology",
    country: "India",
    description:
      "India's largest IT services company delivering consulting, cloud solutions, and enterprise applications globally.",
  },
  {
    name: "HCL Technologies",
    website: "https://hcltech.com",
    industry: "Technology",
    country: "India",
    description:
      "Global technology company offering IT and business services with expertise in digital transformation.",
  },
  // Technology - Europe
  {
    name: "SAP",
    website: "https://sap.com",
    industry: "Technology",
    country: "Germany",
    description:
      "Enterprise software company specializing in ERP systems, business intelligence, and cloud applications.",
  },
  {
    name: "ASML",
    website: "https://asml.com",
    industry: "Technology",
    country: "Netherlands",
    description:
      "Manufacturer of photolithography machines essential for semiconductor chip production worldwide.",
  },
  {
    name: "Arm Holdings",
    website: "https://arm.com",
    industry: "Technology",
    country: "United Kingdom",
    description:
      "Semiconductor and software design company whose chip architectures power billions of mobile and IoT devices.",
  },
  {
    name: "Ericsson",
    website: "https://ericsson.com",
    industry: "Technology",
    country: "Sweden",
    description:
      "Telecommunications company providing 5G networks, telecom software, and managed services globally.",
  },
  {
    name: "Nokia",
    website: "https://nokia.com",
    industry: "Technology",
    country: "Finland",
    description:
      "Network infrastructure and technology company providing 5G equipment, software, and services to operators.",
  },
  // Finance
  {
    name: "JPMorgan Chase",
    website: "https://jpmorganchase.com",
    industry: "Finance",
    country: "United States",
    description:
      "Leading global financial services firm offering investment banking, financial services, and asset management.",
  },
  {
    name: "Goldman Sachs",
    website: "https://goldmansachs.com",
    industry: "Finance",
    country: "United States",
    description:
      "Global investment banking and financial services company offering securities, asset management, and consumer banking.",
  },
  {
    name: "Morgan Stanley",
    website: "https://morganstanley.com",
    industry: "Finance",
    country: "United States",
    description:
      "Financial services company providing investment banking, wealth management, and investment management.",
  },
  {
    name: "Bank of America",
    website: "https://bankofamerica.com",
    industry: "Finance",
    country: "United States",
    description:
      "Multinational investment bank and financial services company serving individuals, businesses, and governments.",
  },
  {
    name: "Citigroup",
    website: "https://citi.com",
    industry: "Finance",
    country: "United States",
    description:
      "Global bank offering financial products and services to consumers, corporations, and institutions in 160+ countries.",
  },
  {
    name: "Wells Fargo",
    website: "https://wellsfargo.com",
    industry: "Finance",
    country: "United States",
    description:
      "Diversified financial services company providing banking, investments, mortgage, and consumer finance products.",
  },
  {
    name: "HSBC",
    website: "https://hsbc.com",
    industry: "Finance",
    country: "United Kingdom",
    description:
      "One of the world's largest banking and financial services organisations with operations in 64 countries.",
  },
  {
    name: "Barclays",
    website: "https://barclays.com",
    industry: "Finance",
    country: "United Kingdom",
    description:
      "British multinational investment bank and financial services company operating in consumer and corporate banking.",
  },
  {
    name: "Deutsche Bank",
    website: "https://db.com",
    industry: "Finance",
    country: "Germany",
    description:
      "Global banking and financial services company with a focus on investment banking, corporate banking, and asset management.",
  },
  {
    name: "BNP Paribas",
    website: "https://bnpparibas.com",
    industry: "Finance",
    country: "France",
    description:
      "European banking leader with strong retail, corporate, and investment banking operations across 65 countries.",
  },
  {
    name: "UBS",
    website: "https://ubs.com",
    industry: "Finance",
    country: "Switzerland",
    description:
      "Swiss multinational investment bank offering wealth management, investment banking, and asset management services.",
  },
  {
    name: "Visa",
    website: "https://visa.com",
    industry: "Finance",
    country: "United States",
    description:
      "Global digital payments network connecting consumers, businesses, banks, and governments in 200+ countries.",
  },
  {
    name: "Mastercard",
    website: "https://mastercard.com",
    industry: "Finance",
    country: "United States",
    description:
      "Technology company in the global payments industry, processing transactions and enabling digital commerce.",
  },
  {
    name: "American Express",
    website: "https://americanexpress.com",
    industry: "Finance",
    country: "United States",
    description:
      "Financial services company offering charge cards, credit cards, traveler's cheques, and banking solutions.",
  },
  {
    name: "BlackRock",
    website: "https://blackrock.com",
    industry: "Finance",
    country: "United States",
    description:
      "World's largest asset management firm managing over $10 trillion in assets for institutions and individuals.",
  },
  {
    name: "Vanguard",
    website: "https://vanguard.com",
    industry: "Finance",
    country: "United States",
    description:
      "Investment management company known for low-cost index funds and ETFs, managing $7+ trillion in assets.",
  },
  // Healthcare
  {
    name: "Pfizer",
    website: "https://pfizer.com",
    industry: "Healthcare",
    country: "United States",
    description:
      "Multinational pharmaceutical corporation discovering, developing, and manufacturing medicines and vaccines.",
  },
  {
    name: "Johnson & Johnson",
    website: "https://jnj.com",
    industry: "Healthcare",
    country: "United States",
    description:
      "Diversified healthcare company producing pharmaceutical drugs, medical devices, and consumer health products.",
  },
  {
    name: "Merck",
    website: "https://merck.com",
    industry: "Healthcare",
    country: "United States",
    description:
      "Global healthcare company delivering innovative health solutions through prescription medicines, vaccines, and biologics.",
  },
  {
    name: "AbbVie",
    website: "https://abbvie.com",
    industry: "Healthcare",
    country: "United States",
    description:
      "Research-based biopharmaceutical company developing therapies for immunology, oncology, and neuroscience.",
  },
  {
    name: "Bristol-Myers Squibb",
    website: "https://bms.com",
    industry: "Healthcare",
    country: "United States",
    description:
      "Biopharmaceutical company focused on developing medicines for cancer, immunology, and cardiovascular disease.",
  },
  {
    name: "AstraZeneca",
    website: "https://astrazeneca.com",
    industry: "Healthcare",
    country: "United Kingdom",
    description:
      "Global biopharmaceutical company developing treatments for oncology, cardiovascular, and respiratory diseases.",
  },
  {
    name: "Novartis",
    website: "https://novartis.com",
    industry: "Healthcare",
    country: "Switzerland",
    description:
      "Global healthcare company reimagining medicine to improve and extend people's lives through innovation.",
  },
  {
    name: "Roche",
    website: "https://roche.com",
    industry: "Healthcare",
    country: "Switzerland",
    description:
      "Pioneer in pharmaceuticals and diagnostics focused on advancing science to improve people's lives.",
  },
  {
    name: "Sanofi",
    website: "https://sanofi.com",
    industry: "Healthcare",
    country: "France",
    description:
      "Global healthcare company developing treatments for diabetes, cardiovascular, rare diseases, and vaccines.",
  },
  {
    name: "Bayer",
    website: "https://bayer.com",
    industry: "Healthcare",
    country: "Germany",
    description:
      "Life science company with core competencies in pharmaceutical and agricultural products innovation.",
  },
  {
    name: "Medtronic",
    website: "https://medtronic.com",
    industry: "Healthcare",
    country: "Ireland",
    description:
      "Medical device company offering therapeutic devices, services, and solutions for chronic disease management.",
  },
  {
    name: "UnitedHealth Group",
    website: "https://unitedhealthgroup.com",
    industry: "Healthcare",
    country: "United States",
    description:
      "Diversified health care company offering health benefits and services to individuals, employers, and Medicare beneficiaries.",
  },
  // Retail
  {
    name: "Walmart",
    website: "https://walmart.com",
    industry: "Retail",
    country: "United States",
    description:
      "World's largest retailer operating hypermarkets, discount department stores, and grocery stores globally.",
  },
  {
    name: "Amazon Retail",
    website: "https://amazon.com",
    industry: "Retail",
    country: "United States",
    description:
      "E-commerce giant offering millions of products with fast delivery through Prime membership and grocery expansion.",
  },
  {
    name: "IKEA",
    website: "https://ikea.com",
    industry: "Retail",
    country: "Sweden",
    description:
      "Swedish multinational retailer selling ready-to-assemble furniture, home appliances, and accessories at affordable prices.",
  },
  {
    name: "H&M",
    website: "https://hm.com",
    industry: "Retail",
    country: "Sweden",
    description:
      "Fashion retailer offering stylish clothing, accessories, and home textiles at affordable prices globally.",
  },
  {
    name: "Zara",
    website: "https://zara.com",
    industry: "Retail",
    country: "Spain",
    description:
      "Fast-fashion brand part of Inditex group, known for quickly bringing runway trends to retail stores worldwide.",
  },
  {
    name: "Target",
    website: "https://target.com",
    industry: "Retail",
    country: "United States",
    description:
      "American retail corporation operating general merchandise and grocery stores with strong owned-brand portfolio.",
  },
  {
    name: "Costco",
    website: "https://costco.com",
    industry: "Retail",
    country: "United States",
    description:
      "Membership-only warehouse club offering a wide selection of merchandise at substantially lower prices.",
  },
  {
    name: "The Home Depot",
    website: "https://homedepot.com",
    industry: "Retail",
    country: "United States",
    description:
      "Home improvement retailer offering tools, construction products, and services for professionals and homeowners.",
  },
  {
    name: "Nike",
    website: "https://nike.com",
    industry: "Retail",
    country: "United States",
    description:
      "World's largest athletic footwear and apparel corporation designing and selling sports equipment globally.",
  },
  {
    name: "Adidas",
    website: "https://adidas.com",
    industry: "Retail",
    country: "Germany",
    description:
      "Multinational sportswear corporation designing athletic and casual footwear, apparel, and accessories.",
  },
  {
    name: "Uniqlo",
    website: "https://uniqlo.com",
    industry: "Retail",
    country: "Japan",
    description:
      "Japanese casual wear designer, manufacturer, and retailer known for high-quality basics at accessible prices.",
  },
  {
    name: "Carrefour",
    website: "https://carrefour.com",
    industry: "Retail",
    country: "France",
    description:
      "One of the world's largest hypermarket chains operating grocery and general merchandise stores globally.",
  },
  {
    name: "Lidl",
    website: "https://lidl.com",
    industry: "Retail",
    country: "Germany",
    description:
      "International discount supermarket chain offering quality products at consistently low prices across Europe and US.",
  },
  {
    name: "Aldi",
    website: "https://aldi.com",
    industry: "Retail",
    country: "Germany",
    description:
      "International discount supermarket chain known for low prices, private-label products, and efficient operations.",
  },
  // Automotive
  {
    name: "Toyota",
    website: "https://toyota.com",
    industry: "Automotive",
    country: "Japan",
    description:
      "World's largest automaker producing cars, trucks, and SUVs including the pioneering Prius hybrid vehicle.",
  },
  {
    name: "Volkswagen",
    website: "https://volkswagen.com",
    industry: "Automotive",
    country: "Germany",
    description:
      "German automotive manufacturer producing vehicles under VW, Audi, Porsche, Lamborghini, and other brands.",
  },
  {
    name: "BMW",
    website: "https://bmw.com",
    industry: "Automotive",
    country: "Germany",
    description:
      "Luxury automobile, motorcycle, and engine manufacturer known for performance, innovation, and premium quality.",
  },
  {
    name: "Mercedes-Benz",
    website: "https://mercedes-benz.com",
    industry: "Automotive",
    country: "Germany",
    description:
      "German luxury automobile manufacturer known for engineering excellence, safety innovations, and prestige.",
  },
  {
    name: "Honda",
    website: "https://honda.com",
    industry: "Automotive",
    country: "Japan",
    description:
      "Japanese multinational conglomerate manufacturer of automobiles, motorcycles, and power equipment.",
  },
  {
    name: "Ford",
    website: "https://ford.com",
    industry: "Automotive",
    country: "United States",
    description:
      "American automaker producing cars, trucks, and SUVs including the iconic F-150 and Mustang models.",
  },
  {
    name: "General Motors",
    website: "https://gm.com",
    industry: "Automotive",
    country: "United States",
    description:
      "American multinational corporation designing, manufacturing vehicles under Chevrolet, GMC, Buick, and Cadillac brands.",
  },
  {
    name: "Stellantis",
    website: "https://stellantis.com",
    industry: "Automotive",
    country: "Netherlands",
    description:
      "Multinational automotive manufacturing corporation formed from the merger of Fiat Chrysler and PSA Group.",
  },
  {
    name: "Hyundai",
    website: "https://hyundai.com",
    industry: "Automotive",
    country: "South Korea",
    description:
      "South Korean multinational automobile manufacturer known for quality, value, and expanding EV lineup.",
  },
  {
    name: "Porsche",
    website: "https://porsche.com",
    industry: "Automotive",
    country: "Germany",
    description:
      "German luxury sports car manufacturer known for iconic 911, Cayenne, and Taycan electric vehicle.",
  },
  {
    name: "Ferrari",
    website: "https://ferrari.com",
    industry: "Automotive",
    country: "Italy",
    description:
      "Italian luxury sports car manufacturer with Formula 1 heritage, known for exclusivity and performance.",
  },
  // Energy
  {
    name: "Shell",
    website: "https://shell.com",
    industry: "Energy",
    country: "Netherlands",
    description:
      "Global group of energy and petrochemical companies operating across exploration, production, and renewable energy.",
  },
  {
    name: "ExxonMobil",
    website: "https://exxonmobil.com",
    industry: "Energy",
    country: "United States",
    description:
      "World's largest publicly traded oil and gas company involved in exploration, production, refining, and chemicals.",
  },
  {
    name: "BP",
    website: "https://bp.com",
    industry: "Energy",
    country: "United Kingdom",
    description:
      "British multinational oil and gas company transitioning to renewable energy through wind, solar, and EV charging.",
  },
  {
    name: "Chevron",
    website: "https://chevron.com",
    industry: "Energy",
    country: "United States",
    description:
      "Multinational energy corporation engaged in oil and gas exploration, production, refining, and petrochemicals.",
  },
  {
    name: "TotalEnergies",
    website: "https://totalenergies.com",
    industry: "Energy",
    country: "France",
    description:
      "French multinational energy company operating across oil, natural gas, solar, wind, and electricity production.",
  },
  {
    name: "Equinor",
    website: "https://equinor.com",
    industry: "Energy",
    country: "Norway",
    description:
      "Norwegian energy company specializing in offshore oil and gas, rapidly expanding into renewable energy.",
  },
  {
    name: "NextEra Energy",
    website: "https://nexteraenergy.com",
    industry: "Energy",
    country: "United States",
    description:
      "World's largest producer of wind and solar energy, operating utility companies across North America.",
  },
  {
    name: "Orsted",
    website: "https://orsted.com",
    industry: "Energy",
    country: "Denmark",
    description:
      "Global leader in offshore wind energy development, committed to creating a sustainable green energy future.",
  },
  // Aerospace & Defense
  {
    name: "Boeing",
    website: "https://boeing.com",
    industry: "Aerospace",
    country: "United States",
    description:
      "World's largest aerospace company designing, manufacturing aircraft, rotorcraft, rockets, satellites, and defense systems.",
  },
  {
    name: "Airbus",
    website: "https://airbus.com",
    industry: "Aerospace",
    country: "France",
    description:
      "European multinational aerospace corporation manufacturing commercial aircraft, helicopters, and defense systems.",
  },
  {
    name: "Lockheed Martin",
    website: "https://lockheedmartin.com",
    industry: "Aerospace",
    country: "United States",
    description:
      "Global security and aerospace company producing advanced technology systems, products, and services for defense.",
  },
  {
    name: "Raytheon Technologies",
    website: "https://rtx.com",
    industry: "Aerospace",
    country: "United States",
    description:
      "Aerospace and defense manufacturer producing missiles, sensors, cybersecurity solutions, and aircraft engines.",
  },
  {
    name: "SpaceX",
    website: "https://spacex.com",
    industry: "Aerospace",
    country: "United States",
    description:
      "Private aerospace manufacturer developing rockets, spacecraft, and Starlink satellite internet constellation.",
  },
  {
    name: "Rolls-Royce",
    website: "https://rolls-royce.com",
    industry: "Aerospace",
    country: "United Kingdom",
    description:
      "Power systems manufacturer producing world-class aero engines, defense solutions, and power generation systems.",
  },
  // Consulting
  {
    name: "McKinsey & Company",
    website: "https://mckinsey.com",
    industry: "Consulting",
    country: "United States",
    description:
      "Global management consulting firm advising leading organizations on strategy, operations, and transformation.",
  },
  {
    name: "Accenture",
    website: "https://accenture.com",
    industry: "Consulting",
    country: "Ireland",
    description:
      "Global professional services company providing strategy, consulting, technology, and operations services.",
  },
  {
    name: "Deloitte",
    website: "https://deloitte.com",
    industry: "Consulting",
    country: "United States",
    description:
      "World's largest professional services firm offering audit, consulting, financial advisory, and tax services.",
  },
  {
    name: "PwC",
    website: "https://pwc.com",
    industry: "Consulting",
    country: "United Kingdom",
    description:
      "Multinational professional services brand offering assurance, advisory, and tax services globally.",
  },
  {
    name: "KPMG",
    website: "https://kpmg.com",
    industry: "Consulting",
    country: "Netherlands",
    description:
      "Global network of professional firms providing audit, tax, and advisory services to businesses worldwide.",
  },
  {
    name: "Ernst & Young",
    website: "https://ey.com",
    industry: "Consulting",
    country: "United Kingdom",
    description:
      "Multinational professional services partnership offering assurance, consulting, strategy, and tax services.",
  },
  {
    name: "Boston Consulting Group",
    website: "https://bcg.com",
    industry: "Consulting",
    country: "United States",
    description:
      "Global management consulting firm and world's leading advisor on business strategy, innovation, and transformation.",
  },
  {
    name: "Bain & Company",
    website: "https://bain.com",
    industry: "Consulting",
    country: "United States",
    description:
      "Management consulting firm helping organizations achieve and sustain impressive results through transformation.",
  },
  // Manufacturing
  {
    name: "Siemens",
    website: "https://siemens.com",
    industry: "Manufacturing",
    country: "Germany",
    description:
      "Global industrial manufacturing company producing automation equipment, smart infrastructure, and digital industries.",
  },
  {
    name: "ABB",
    website: "https://abb.com",
    industry: "Manufacturing",
    country: "Switzerland",
    description:
      "Technology leader in electrification and automation, enabling smarter and more sustainable industries.",
  },
  {
    name: "Philips",
    website: "https://philips.com",
    industry: "Manufacturing",
    country: "Netherlands",
    description:
      "Health technology company focused on diagnostic imaging, patient monitoring, and personal health products.",
  },
  {
    name: "General Electric",
    website: "https://ge.com",
    industry: "Manufacturing",
    country: "United States",
    description:
      "Industrial conglomerate operating in aviation, power, renewable energy, and healthcare equipment manufacturing.",
  },
  {
    name: "3M",
    website: "https://3m.com",
    industry: "Manufacturing",
    country: "United States",
    description:
      "Diversified technology company producing industrial, safety, healthcare, and consumer products globally.",
  },
  {
    name: "Honeywell",
    website: "https://honeywell.com",
    industry: "Manufacturing",
    country: "United States",
    description:
      "Industrial conglomerate providing aerospace products, building technologies, and performance materials.",
  },
  {
    name: "Caterpillar",
    website: "https://cat.com",
    industry: "Manufacturing",
    country: "United States",
    description:
      "World's leading manufacturer of construction and mining equipment, diesel engines, and industrial turbines.",
  },
  {
    name: "John Deere",
    website: "https://deere.com",
    industry: "Manufacturing",
    country: "United States",
    description:
      "Manufacturer of agricultural, construction, and forestry equipment with smart farming technology integration.",
  },
  {
    name: "Bosch",
    website: "https://bosch.com",
    industry: "Manufacturing",
    country: "Germany",
    description:
      "German multinational engineering and technology company producing automotive parts, power tools, and home appliances.",
  },
  // Consumer Goods
  {
    name: "Nestle",
    website: "https://nestle.com",
    industry: "Consumer Goods",
    country: "Switzerland",
    description:
      "World's largest food and beverage company with brands like Nescafé, KitKat, Maggi, and Purina.",
  },
  {
    name: "Unilever",
    website: "https://unilever.com",
    industry: "Consumer Goods",
    country: "United Kingdom",
    description:
      "Multinational consumer goods company producing food, beverages, cleaning agents, and personal care products.",
  },
  {
    name: "Procter & Gamble",
    website: "https://pg.com",
    industry: "Consumer Goods",
    country: "United States",
    description:
      "Consumer goods corporation producing household brands including Tide, Gillette, Pampers, and Oral-B.",
  },
  {
    name: "Coca-Cola",
    website: "https://coca-cola.com",
    industry: "Consumer Goods",
    country: "United States",
    description:
      "World's largest beverage company manufacturing soft drinks, juices, water, and enhanced water products.",
  },
  {
    name: "PepsiCo",
    website: "https://pepsico.com",
    industry: "Consumer Goods",
    country: "United States",
    description:
      "Multinational food and beverage corporation producing Pepsi, Lay's, Gatorade, Tropicana, and Quaker brands.",
  },
  {
    name: "L'Oreal",
    website: "https://loreal.com",
    industry: "Consumer Goods",
    country: "France",
    description:
      "World's largest cosmetics company offering beauty and personal care products across hair, skin, and makeup.",
  },
  {
    name: "LVMH",
    website: "https://lvmh.com",
    industry: "Consumer Goods",
    country: "France",
    description:
      "World's largest luxury goods conglomerate owning Louis Vuitton, Moët & Chandon, Hennessy, and Dior.",
  },
  {
    name: "Kering",
    website: "https://kering.com",
    industry: "Consumer Goods",
    country: "France",
    description:
      "French luxury group managing Gucci, Saint Laurent, Balenciaga, Bottega Veneta, and other prestigious brands.",
  },
  {
    name: "Henkel",
    website: "https://henkel.com",
    industry: "Consumer Goods",
    country: "Germany",
    description:
      "Consumer goods and adhesives company known for Loctite, Persil, Schwarzkopf, and other global brands.",
  },
  // Media & Entertainment
  {
    name: "Disney",
    website: "https://disney.com",
    industry: "Media",
    country: "United States",
    description:
      "Multinational entertainment company owning theme parks, movie studios, Disney+, ABC, ESPN, and Marvel.",
  },
  {
    name: "Warner Bros. Discovery",
    website: "https://wbd.com",
    industry: "Media",
    country: "United States",
    description:
      "Global media and entertainment company owning CNN, HBO, Warner Bros. film studio, and Max streaming service.",
  },
  {
    name: "Comcast",
    website: "https://comcast.com",
    industry: "Media",
    country: "United States",
    description:
      "Mass media and technology conglomerate operating NBCUniversal, Sky, Xfinity cable, and broadband services.",
  },
  {
    name: "News Corp",
    website: "https://newscorp.com",
    industry: "Media",
    country: "United States",
    description:
      "Global media company operating newspapers, book publishing (HarperCollins), and digital real estate services.",
  },
  {
    name: "Bertelsmann",
    website: "https://bertelsmann.com",
    industry: "Media",
    country: "Germany",
    description:
      "Multinational media corporation owning RTL Group, Penguin Random House, BMG Rights Management.",
  },
  {
    name: "Vivendi",
    website: "https://vivendi.com",
    industry: "Media",
    country: "France",
    description:
      "French media conglomerate owning Universal Music Group, Canal+, and Havas advertising agency.",
  },
  // Telecommunications
  {
    name: "AT&T",
    website: "https://att.com",
    industry: "Telecommunications",
    country: "United States",
    description:
      "American multinational telecommunications conglomerate offering mobile, broadband, and entertainment services.",
  },
  {
    name: "Verizon",
    website: "https://verizon.com",
    industry: "Telecommunications",
    country: "United States",
    description:
      "American multinational telecommunications company offering wireless services, broadband, and enterprise solutions.",
  },
  {
    name: "T-Mobile",
    website: "https://t-mobile.com",
    industry: "Telecommunications",
    country: "United States",
    description:
      "Un-carrier wireless network operator known for disrupting industry norms and expanding 5G coverage.",
  },
  {
    name: "Vodafone",
    website: "https://vodafone.com",
    industry: "Telecommunications",
    country: "United Kingdom",
    description:
      "British multinational telecommunications company operating mobile networks and broadband in 25+ countries.",
  },
  {
    name: "Deutsche Telekom",
    website: "https://telekom.com",
    industry: "Telecommunications",
    country: "Germany",
    description:
      "German telecommunications company and Europe's largest, operating T-Mobile US and fixed-line networks.",
  },
  {
    name: "SoftBank",
    website: "https://softbank.jp",
    industry: "Telecommunications",
    country: "Japan",
    description:
      "Japanese multinational telecommunications and technology group investing in global tech companies via Vision Fund.",
  },
  // Transportation & Logistics
  {
    name: "FedEx",
    website: "https://fedex.com",
    industry: "Logistics",
    country: "United States",
    description:
      "Multinational delivery services company offering overnight courier, ground shipping, and freight services.",
  },
  {
    name: "UPS",
    website: "https://ups.com",
    industry: "Logistics",
    country: "United States",
    description:
      "Package delivery company and supply chain management solutions provider serving 220+ countries globally.",
  },
  {
    name: "DHL",
    website: "https://dhl.com",
    industry: "Logistics",
    country: "Germany",
    description:
      "World's leading logistics company offering international shipping, freight, and supply chain management.",
  },
  {
    name: "Maersk",
    website: "https://maersk.com",
    industry: "Logistics",
    country: "Denmark",
    description:
      "World's largest container shipping company connecting businesses through integrated logistics and trade.",
  },
  {
    name: "Catai Tours",
    website: "https://catai.es",
    industry: "Logistics",
    country: "Spain",
    description:
      "Tourism company specializing in long-haul travel, tailor-made trips, and group travel services.",
  },
  // Real Estate
  {
    name: "CBRE Group",
    website: "https://cbre.com",
    industry: "Real Estate",
    country: "United States",
    description:
      "World's largest commercial real estate services and investment firm with offices in 100+ countries.",
  },
  {
    name: "Jones Lang LaSalle",
    website: "https://jll.com",
    industry: "Real Estate",
    country: "United States",
    description:
      "Professional services firm specializing in real estate and investment management for corporations and investors.",
  },
  {
    name: "Brookfield Asset Management",
    website: "https://brookfield.com",
    industry: "Real Estate",
    country: "Canada",
    description:
      "Alternative asset manager with $800+ billion AUM across real estate, infrastructure, and private equity.",
  },
  // Food & Beverage
  {
    name: "McDonald's",
    website: "https://mcdonalds.com",
    industry: "Food & Beverage",
    country: "United States",
    description:
      "World's largest fast food restaurant chain serving 69+ million customers daily in 100+ countries.",
  },
  {
    name: "Starbucks",
    website: "https://starbucks.com",
    industry: "Food & Beverage",
    country: "United States",
    description:
      "Multinational coffeehouse chain known for specialty coffees, teas, and food items in 35,000+ locations.",
  },
  {
    name: "Yum! Brands",
    website: "https://yum.com",
    industry: "Food & Beverage",
    country: "United States",
    description:
      "Restaurant company owning KFC, Pizza Hut, and Taco Bell with 55,000+ locations in 155 countries.",
  },
  {
    name: "Restaurant Brands International",
    website: "https://rbi.com",
    industry: "Food & Beverage",
    country: "Canada",
    description:
      "Quick service restaurant company owning Burger King, Tim Hortons, and Popeyes Louisiana Kitchen brands.",
  },
  {
    name: "AB InBev",
    website: "https://ab-inbev.com",
    industry: "Food & Beverage",
    country: "Belgium",
    description:
      "World's largest beer company producing Budweiser, Stella Artois, Corona, and 500+ other beer brands.",
  },
  {
    name: "Heineken",
    website: "https://heineken.com",
    industry: "Food & Beverage",
    country: "Netherlands",
    description:
      "Dutch brewing company with global presence, producing Heineken, Amstel, Tiger, and other premium beers.",
  },
  // Singapore
  {
    name: "DBS Bank",
    website: "https://dbs.com",
    industry: "Finance",
    country: "Singapore",
    description:
      "Leading financial services group in Asia with award-winning digital banking platform and strong regional presence.",
  },
  {
    name: "Singapore Airlines",
    website: "https://singaporeair.com",
    industry: "Aviation",
    country: "Singapore",
    description:
      "Flag carrier airline known for exceptional service, innovative in-flight experience, and global connectivity.",
  },
  {
    name: "Grab",
    website: "https://grab.com",
    industry: "Technology",
    country: "Singapore",
    description:
      "Southeast Asia's leading superapp offering ride-hailing, food delivery, payments, and financial services.",
  },
  {
    name: "Sea Limited",
    website: "https://sea.com",
    industry: "Technology",
    country: "Singapore",
    description:
      "Consumer internet company operating Garena gaming, Shopee e-commerce, and SeaMoney financial services.",
  },
  // Australia
  {
    name: "Commonwealth Bank",
    website: "https://commbank.com.au",
    industry: "Finance",
    country: "Australia",
    description:
      "Australia's leading bank providing retail, business, institutional, and wealth management services.",
  },
  {
    name: "BHP",
    website: "https://bhp.com",
    industry: "Mining",
    country: "Australia",
    description:
      "World's largest mining company extracting iron ore, copper, coal, and petroleum resources globally.",
  },
  {
    name: "Rio Tinto",
    website: "https://riotinto.com",
    industry: "Mining",
    country: "Australia",
    description:
      "Mining and metals company operating in 35 countries, producing iron ore, copper, aluminium, and diamonds.",
  },
  // Canada
  {
    name: "Shopify",
    website: "https://shopify.com",
    industry: "Technology",
    country: "Canada",
    description:
      "E-commerce platform enabling businesses of all sizes to create online stores and sell across multiple channels.",
  },
  {
    name: "Royal Bank of Canada",
    website: "https://rbc.com",
    industry: "Finance",
    country: "Canada",
    description:
      "Canada's largest bank providing personal and commercial banking, wealth management, and investment banking.",
  },
  {
    name: "Bombardier",
    website: "https://bombardier.com",
    industry: "Manufacturing",
    country: "Canada",
    description:
      "Global leader in business aircraft manufacturing, producing Learjet, Challenger, and Global series jets.",
  },
  // South Korea
  {
    name: "LG Electronics",
    website: "https://lg.com",
    industry: "Technology",
    country: "South Korea",
    description:
      "Global electronics manufacturer known for OLED TVs, home appliances, and mobile communications devices.",
  },
  {
    name: "SK Hynix",
    website: "https://skhynix.com",
    industry: "Technology",
    country: "South Korea",
    description:
      "World's second-largest memory chip manufacturer producing DRAM and NAND flash storage components.",
  },
  // India
  {
    name: "Reliance Industries",
    website: "https://ril.com",
    industry: "Conglomerate",
    country: "India",
    description:
      "India's largest conglomerate operating in energy, petrochemicals, retail, telecommunications (Jio), and media.",
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
    name: "Flipkart",
    website: "https://flipkart.com",
    industry: "Retail",
    country: "India",
    description:
      "India's largest e-commerce marketplace owned by Walmart, selling electronics, fashion, and lifestyle products.",
  },
];

export const industries = [...new Set(companies.map((c) => c.industry))].sort();
export const countries = [...new Set(companies.map((c) => c.country))].sort();
