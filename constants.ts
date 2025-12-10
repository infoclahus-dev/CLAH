
import { ServiceEntity, ServiceItem, CompanyServiceGroup, ResourceItem, RegionGroup } from './types';

export const CLAH_ENTITIES: ServiceEntity[] = [
  {
    id: 'custom-home',
    name: 'Custom Home',
    description: {
      vn: 'Xây dựng tổ ấm trong mơ của bạn tại San Jose.',
      en: 'Build your dream home in San Jose.'
    },
    longDescription: {
      vn: 'Chuyên cung cấp dịch vụ xây dựng nhà ở cao cấp (Custom Home Building) với quy trình trọn gói từ xin giấy phép đến hoàn thiện chìa khóa trao tay.',
      en: 'Specializing in high-end custom home building services with a turnkey process from permitting to key handover.'
    },
    iconName: 'Hammer',
    imageUrl: 'https://picsum.photos/800/600?random=1',
    ctaText: {
      vn: 'Tư vấn Xây dựng',
      en: 'Construction Consult'
    },
    features: {
      vn: ['Giấy phép xây dựng', 'Thi công trọn gói', 'Bảo hành dài hạn'],
      en: ['Building Permits', 'Turnkey Construction', 'Long-term Warranty']
    },
    websiteUrl: 'https://www.customhome.us/'
  },
  {
    id: 'nca-designs',
    name: 'NCA Designs',
    description: {
      vn: 'Thiết kế nội thất tinh tế và hiện đại.',
      en: 'Sophisticated and modern interior design.'
    },
    longDescription: {
      vn: 'NCA Designs mang đến giải pháp thiết kế nội thất tối ưu hóa không gian sống, kết hợp giữa thẩm mỹ hiện đại và công năng sử dụng.',
      en: 'NCA Designs provides interior design solutions that optimize living space, combining modern aesthetics with functionality.'
    },
    iconName: 'PenTool',
    imageUrl: 'https://picsum.photos/800/600?random=2',
    ctaText: {
      vn: 'Xem Portfolio',
      en: 'View Portfolio'
    },
    features: {
      vn: ['Thiết kế 3D', 'Tư vấn phong cách', 'Giám sát thi công'],
      en: ['3D Design', 'Style Consultation', 'Construction Supervision']
    },
    websiteUrl: 'https://www.ncadesigns.com/'
  },
  {
    id: 'design-your-rooms',
    name: 'Design Your Rooms',
    description: {
      vn: 'Nội thất Custom & Decor theo yêu cầu.',
      en: 'Custom Furniture & Decor on demand.'
    },
    longDescription: {
      vn: 'Dịch vụ cung cấp nội thất may đo (Custom Furniture) độc bản, giúp bạn tự do sáng tạo không gian riêng của mình với các vật liệu cao cấp.',
      en: 'Bespoke furniture services (Custom Furniture) helping you freely create your own unique space with premium materials.'
    },
    iconName: 'Armchair',
    imageUrl: 'https://picsum.photos/800/600?random=3',
    ctaText: {
      vn: 'Đặt hàng Custom',
      en: 'Order Custom'
    },
    features: {
      vn: ['Sofa & Bàn ghế', 'Tủ bếp & Wardrobe', 'Decor độc bản'],
      en: ['Sofas & Tables', 'Kitchen & Wardrobe', 'Unique Decor']
    },
    websiteUrl: 'https://designyourrooms.com/'
  },
  {
    id: 'ncm-cafe',
    name: 'NCM Cafe',
    description: {
      vn: 'Real Estate & Startups Hub.',
      en: 'Real Estate & Startups Hub.'
    },
    longDescription: {
      vn: 'Không gian cà phê kết nối (Networking Hub) dành cho cộng đồng Bất động sản và Startup công nghệ tại thung lũng Silicon.',
      en: 'Networking Hub for the Real Estate and Tech Startup community in Silicon Valley.'
    },
    iconName: 'Coffee',
    imageUrl: 'https://picsum.photos/800/600?random=4',
    ctaText: {
      vn: 'Đặt bàn / Sự kiện',
      en: 'Book Table / Events'
    },
    features: {
      vn: ['Co-working Space', 'Networking Events', 'Specialty Coffee'],
      en: ['Co-working Space', 'Networking Events', 'Specialty Coffee']
    },
    websiteUrl: 'https://www.ncmcafe.com/'
  }
];

export const CLAH_DETAILED_SERVICES: CompanyServiceGroup[] = [
  {
    id: 'custom-home',
    name: 'Custom Home',
    services: [
      {
        name: { vn: 'Xây Nhà Mới', en: 'New Construction' },
        description: { vn: 'Xây dựng trọn gói từ móng đến mái.', en: 'Full ground-up construction services.' },
        link: 'https://www.customhome.us/',
        iconName: 'Hammer'
      },
      {
        name: { vn: 'Cải Tạo & Sửa Chữa', en: 'Remodeling & Renovation' },
        description: { vn: 'Nâng cấp không gian sống hiện tại.', en: 'Upgrade your existing living space.' },
        link: 'https://www.customhome.us/',
        iconName: 'PaintBucket'
      },
      {
        name: { vn: 'Xây ADU / Guest House', en: 'ADU & Additions' },
        description: { vn: 'Mở rộng diện tích, tăng giá trị.', en: 'Expand square footage and value.' },
        link: 'https://www.customhome.us/',
        iconName: 'Home'
      },
      {
        name: { vn: 'Xin Giấy Phép', en: 'Permitting Services' },
        description: { vn: 'Xử lý hồ sơ pháp lý xây dựng.', en: 'Handling construction permits & legal.' },
        link: 'https://www.customhome.us/',
        iconName: 'FileText'
      }
    ]
  },
  {
    id: 'nca-designs',
    name: 'NCA Designs',
    services: [
      {
        name: { vn: 'Thiết Kế Kiến Trúc', en: 'Architectural Design' },
        description: { vn: 'Bản vẽ kỹ thuật và quy hoạch.', en: 'Technical drawings and planning.' },
        link: 'https://www.ncadesigns.com/',
        iconName: 'Ruler'
      },
      {
        name: { vn: 'Thiết Kế Nội Thất', en: 'Interior Design' },
        description: { vn: 'Sáng tạo không gian sống thẩm mỹ.', en: 'Creating aesthetic living spaces.' },
        link: 'https://www.ncadesigns.com/',
        iconName: 'LayoutTemplate'
      },
      {
        name: { vn: 'Phối Cảnh 3D', en: '3D Visualization' },
        description: { vn: 'Hình dung ngôi nhà trước khi xây.', en: 'Visualize your home before building.' },
        link: 'https://www.ncadesigns.com/',
        iconName: 'Box'
      },
      {
        name: { vn: 'Tư Vấn Phong Cách', en: 'Style Consultation' },
        description: { vn: 'Định hình phong cách cá nhân.', en: 'Defining your personal style.' },
        link: 'https://www.ncadesigns.com/',
        iconName: 'Palette'
      }
    ]
  },
  {
    id: 'design-your-rooms',
    name: 'Design Your Rooms',
    services: [
      {
        name: { vn: 'Sofa & Bàn Ghế', en: 'Custom Sofa & Seating' },
        description: { vn: 'May đo theo kích thước và chất liệu.', en: 'Tailored to size and material.' },
        link: 'https://designyourrooms.com/',
        iconName: 'Armchair'
      },
      {
        name: { vn: 'Tủ Bếp & Lavabo', en: 'Kitchen & Vanity' },
        description: { vn: 'Hệ thống tủ hiện đại, thông minh.', en: 'Modern, smart cabinetry systems.' },
        link: 'https://designyourrooms.com/',
        iconName: 'Utensils'
      },
      {
        name: { vn: 'Tủ Quần Áo (Closet)', en: 'Walk-in Closets' },
        description: { vn: 'Tối ưu hóa không gian lưu trữ.', en: 'Optimize storage space.' },
        link: 'https://designyourrooms.com/',
        iconName: 'Shirt'
      },
      {
        name: { vn: 'Vật Liệu Cao Cấp', en: 'Premium Materials' },
        description: { vn: 'Đá, gỗ, da nhập khẩu.', en: 'Imported stone, wood, and leather.' },
        link: 'https://designyourrooms.com/',
        iconName: 'Gem'
      }
    ]
  },
  {
    id: 'ncm-cafe',
    name: 'NCM Cafe',
    services: [
      {
        name: { vn: 'Thuê Địa Điểm', en: 'Venue Booking' },
        description: { vn: 'Tổ chức workshop, sự kiện.', en: 'Host workshops and events.' },
        link: 'https://www.ncmcafe.com/',
        iconName: 'MapPin'
      },
      {
        name: { vn: 'Co-working Space', en: 'Co-working Space' },
        description: { vn: 'Chỗ ngồi làm việc linh hoạt.', en: 'Flexible working desks.' },
        link: 'https://www.ncmcafe.com/',
        iconName: 'Laptop'
      },
      {
        name: { vn: 'Cà Phê & Đồ Uống', en: 'Coffee & Drinks' },
        description: { vn: 'Thực đơn đồ uống đặc biệt.', en: 'Specialty drinks menu.' },
        link: 'https://www.ncmcafe.com/',
        iconName: 'Coffee'
      },
      {
        name: { vn: 'Kết Nối Startup', en: 'Startup Networking' },
        description: { vn: 'Gặp gỡ nhà đầu tư và founder.', en: 'Meet investors and founders.' },
        link: 'https://www.ncmcafe.com/',
        iconName: 'Users'
      }
    ]
  }
];

export const CLAH_ABOUT_MENU: ServiceItem[] = [
  {
    id: 'about-us',
    name: { vn: 'Về Chúng Tôi', en: 'About Us' },
    description: { vn: 'Chúng tôi là ai và giá trị cốt lõi.', en: 'Who we are and what we stand for.' },
    link: 'about' // Internal navigation
  },
  {
    id: 'locations',
    name: { vn: 'Địa điểm', en: 'Locations' },
    description: { vn: 'Văn phòng và các chi nhánh.', en: 'Cities and countries we call home.' },
    link: 'locations' // Linked to locations
  },
  {
    id: 'careers',
    name: { vn: 'Tuyển dụng', en: 'Careers' },
    description: { vn: 'Gia nhập đội ngũ kiến tạo tương lai.', en: 'Join us on our mission to drive San Jose forward.' },
    link: 'careers' // Internal navigation
  }
];

export const LOCATIONS_DATA: RegionGroup[] = [
  {
    region: { vn: "Châu Mỹ", en: "Americas" },
    offices: [
      {
        id: "headquarters",
        name: { vn: "Trụ sở chính", en: "Headquarters" },
        address: "2092 Concourse Drive, Ste 9,\nSan Jose, CA 95131, United States",
        phone: "+1 650-999-6797",
        email: "info@clah.us",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
        mapUrl: "https://maps.google.com"
      }
    ]
  },
  {
    region: { vn: "Châu Á", en: "Asia" },
    offices: [
      {
        id: "vietnam-office",
        name: { vn: "Văn phòng Việt Nam", en: "Vietnam Office" },
        address: "161 Ung Văn Khiêm, Phường Thạnh Mỹ Tây,\nBình Thạnh, TP. HCM, Vietnam",
        phone: "+84 28 1234 5678",
        email: "vn.info@clah.us",
        image: "https://images.unsplash.com/photo-1555217851-614f536ad3f8?q=80&w=1974&auto=format&fit=crop",
        mapUrl: "https://maps.google.com"
      }
    ]
  }
];

export const SAMPLE_RESOURCES: ResourceItem[] = [
  {
    id: '1',
    title: { vn: 'Top 5 Xu Hướng Thiết Kế Nội Thất Tại Silicon Valley Năm 2024', en: 'Top 5 Interior Design Trends in Silicon Valley for 2024' },
    category: 'Blog',
    date: 'May 15, 2024',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop',
    link: '#'
  },
  {
    id: '2',
    title: { vn: 'Custom Home Hoàn Thành Dự Án Biệt Thự Triệu Đô Tại San Jose', en: 'Custom Home Completes Multi-Million Dollar Villa Project in San Jose' },
    category: 'Case Study',
    date: 'April 22, 2024',
    image: 'https://images.unsplash.com/photo-1600596542815-27b88e39e140?q=80&w=800&auto=format&fit=crop',
    link: '#'
  },
  {
    id: '3',
    title: { vn: 'NCM Cafe Tổ Chức Sự Kiện Networking Cho Các Startup Công Nghệ', en: 'NCM Cafe Hosts Networking Event for Tech Startups' },
    category: 'News',
    date: 'April 10, 2024',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=800&auto=format&fit=crop',
    link: '#'
  },
  {
    id: '4',
    title: { vn: 'Lợi Ích Của Việc Xây Dựng ADU Tại California', en: 'The Benefits of Building an ADU in California' },
    category: 'Blog',
    date: 'March 28, 2024',
    image: 'https://images.unsplash.com/photo-1590332766627-994f38d38f2b?q=80&w=800&auto=format&fit=crop',
    link: '#'
  },
  {
    id: '5',
    title: { vn: 'Design Your Rooms Ra Mắt Bộ Sưu Tập Nội Thất Mùa Hè', en: 'Design Your Rooms Launches Summer Furniture Collection' },
    category: 'Press Release',
    date: 'March 15, 2024',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop',
    link: '#'
  },
  {
    id: '6',
    title: { vn: 'CLAH Ecosystem: Kết Nối Cộng Đồng Thông Qua Không Gian Sống', en: 'CLAH Ecosystem: Connecting Communities Through Living Spaces' },
    category: 'News',
    date: 'March 01, 2024',
    image: 'https://images.unsplash.com/photo-1555217851-614f536ad3f8?q=80&w=800&auto=format&fit=crop',
    link: '#'
  }
];

export const UI_TEXT = {
  hero: {
    tagline: { vn: "San Jose Ecosystem", en: "San Jose Ecosystem" },
    title: { vn: "One Ecosystem.", en: "One Ecosystem." },
    subtitle: {
      vn: "Từ xây dựng tổ ấm, thiết kế nội thất đến không gian sáng tạo cho Startup. CLAH kết nối mọi nhu cầu cuộc sống của bạn tại San Jose.",
      en: "From custom home building and interior design to creative spaces for Startups. CLAH connects all your lifestyle needs in San Jose."
    },
    cta: { vn: "Khám phá Hệ sinh thái", en: "Explore Ecosystem" },
    aboutBtn: { vn: "Về Chúng Tôi", en: "About Us" }
  },
  nav: {
    ecosystem: { vn: "Hệ sinh thái", en: "Ecosystem" },
    services: { vn: "Dịch vụ", en: "Services" },
    resources: { vn: "Tài nguyên", en: "Resources" },
    about: { vn: "Về CLAH", en: "About CLAH" },
    contact: { vn: "Liên hệ", en: "Contact" }
  },
  visionSection: {
    title: { vn: "MAKE EVERY\nSPACE\nALIVE", en: "MAKE EVERY\nSPACE\nALIVE" },
    subtitle: { vn: "Kết nối thế giới thực và số.", en: "Connecting physical and digital worlds." }
  },
  about: {
    pageTitle: { vn: "Câu Chuyện Của CLAH", en: "The CLAH Story" },
    vision: { vn: "Tầm nhìn", en: "Our Vision" },
    title: { vn: "Kiến tạo không gian,\nKết nối cộng đồng.", en: "Creating Spaces,\nConnecting Communities." },
    desc1: { 
      vn: "CLAH không chỉ là một công ty, mà là một hệ sinh thái khép kín phục vụ nhu cầu sống và làm việc chất lượng cao tại San Jose.",
      en: "CLAH is not just a company, but a closed-loop ecosystem serving high-quality living and working needs in San Jose."
    },
    desc2: {
      vn: "Chúng tôi tin rằng ngôi nhà không chỉ để ở, mà là nơi nuôi dưỡng tâm hồn. Và quán cà phê không chỉ để uống, mà là nơi khởi nguồn cho những ý tưởng Startup vĩ đại tiếp theo của Thung lũng Silicon.",
      en: "We believe that a home is not just for living, but for nurturing the soul. And a cafe is not just for drinking, but where the next great Silicon Valley startup ideas begin."
    },
    statHomes: { vn: "Custom Homes", en: "Custom Homes" },
    statEvents: { vn: "Sự kiện Startup", en: "Startup Events" },
    storyTitle: { vn: "Hành Trình Kiến Tạo", en: "Our Journey" },
    storyContent: {
      vn: "Được thành lập tại trung tâm Thung lũng Silicon, CLAH ra đời từ sự trăn trở về việc thiếu sự kết nối giữa việc xây dựng phần cứng (nhà ở) và phần mềm (lối sống). Chúng tôi bắt đầu với Custom Home, mở rộng sang thiết kế nội thất với NCA Designs, sản xuất nội thất độc bản với Design Your Rooms và cuối cùng là tạo ra không gian kết nối cộng đồng tại NCM Cafe.",
      en: "Founded in the heart of Silicon Valley, CLAH was born from the realization of a disconnect between building the hardware (housing) and the software (lifestyle). We started with Custom Home, expanded into interior design with NCA Designs, bespoke furniture with Design Your Rooms, and finally created a community hub at NCM Cafe."
    },
    values: {
        title: { vn: "Giá Trị Cốt Lõi", en: "Core Values" },
        cultureTitle: { vn: "Văn Hóa CLAH", en: "CLAH Culture" },
        cultureSlogan: { vn: "WORK HARD, PLAY HARD", en: "WORK HARD, PLAY HARD" },
        items: [
            {
                icon: 'Lightbulb',
                title: { vn: "Đổi Mới & Sáng Tạo", en: "Innovation & Creativity" },
                desc: { vn: "Luôn tiên phong trong ý tưởng và giải pháp mới.", en: "Pioneering new ideas and solutions." }
            },
            {
                icon: 'Award',
                title: { vn: "Chất Lượng", en: "Quality" },
                desc: { vn: "Không thỏa hiệp với sự tầm thường, cam kết xuất sắc.", en: "No compromise on mediocrity, committed to excellence." }
            },
            {
                icon: 'Briefcase',
                title: { vn: "Chuyên Nghiệp", en: "Professionalism" },
                desc: { vn: "Tận tâm, trách nhiệm và kỷ luật trong mọi việc.", en: "Dedication, responsibility, and discipline in everything." }
            },
            {
                icon: 'Shield',
                title: { vn: "Chính Trực", en: "Integrity" },
                desc: { vn: "Minh bạch và trung thực là nền tảng của niềm tin.", en: "Transparency and honesty are the foundation of trust." }
            },
            {
                icon: 'Users',
                title: { vn: "Hợp Tác", en: "Collaboration" },
                desc: { vn: "Sức mạnh đến từ sự gắn kết và làm việc cùng nhau.", en: "Strength comes from unity and working together." }
            },
             {
                icon: 'Heart',
                title: { vn: "Trao Quyền", en: "Empowering People" },
                desc: { vn: "Tạo cơ hội để mỗi cá nhân phát triển và tỏa sáng.", en: "Creating opportunities for everyone to grow and shine." }
            }
        ]
    },
    milestones: {
      title: { vn: "Cột Mốc Của Chúng Tôi", en: "Our Milestones" },
      items: [
        {
          year: "2005",
          lines: [
            { vn: "Custom Home - Builder", en: "Custom Home - Builder" },
            { vn: "Custom Home Investment - Đầu Tư", en: "Custom Home Investment - Investment" }
          ]
        },
        {
          year: "2023",
          lines: [
            { vn: "CLAH - Furniture", en: "CLAH - Furniture" }
          ]
        },
        {
          year: "2025",
          lines: [
            { vn: "NCM Cafe", en: "NCM Cafe" },
            { vn: "NCA Designs", en: "NCA Designs" }
          ]
        }
      ]
    }
  },
  careersPage: {
      hero: {
          title: { vn: "Phát triển cùng CLAH", en: "Grow with CLAH" },
          subtitle: { vn: "Gia nhập đội ngũ kiến tạo tương lai tại Thung lũng Silicon.", en: "Join the team shaping the future in Silicon Valley." },
          cta: { vn: "Xem vị trí tuyển dụng", en: "View Openings" }
      },
      intro: {
          title: { vn: "Tại sao chọn CLAH?", en: "Why CLAH?" },
          content: { vn: "Tại CLAH, chúng tôi không chỉ xây dựng nhà, chúng tôi xây dựng sự nghiệp. Làm việc trong một hệ sinh thái đa dạng từ xây dựng, thiết kế đến công nghệ và F&B mang đến cho bạn cơ hội học hỏi và phát triển không giới hạn.", en: "At CLAH, we don't just build homes, we build careers. Working in a diverse ecosystem ranging from construction and design to technology and F&B gives you unlimited opportunities to learn and grow." }
      },
      benefits: {
          title: { vn: "Phúc lợi", en: "Benefits" },
          items: [
              { title: { vn: "Lương cạnh tranh", en: "Competitive Salary" }, desc: { vn: "Thu nhập hấp dẫn dựa trên năng lực.", en: "Attractive income based on performance." } },
              { title: { vn: "Bảo hiểm sức khỏe", en: "Health Insurance" }, desc: { vn: "Gói bảo hiểm toàn diện cho bạn và gia đình.", en: "Comprehensive insurance package for you and your family." } },
              { title: { vn: "Môi trường sáng tạo", en: "Creative Environment" }, desc: { vn: "Văn phòng làm việc hiện đại, khuyến khích sự đổi mới.", en: "Modern workspace encouraging innovation." } },
              { title: { vn: "Cơ hội thăng tiến", en: "Growth Opportunities" }, desc: { vn: "Lộ trình phát triển sự nghiệp rõ ràng.", en: "Clear career development path." } }
          ]
      },
      offices: {
        title: { vn: "Văn phòng của chúng tôi", en: "Our Offices" },
        hq: {
             name: { vn: "Trụ sở chính", en: "Headquarters" },
             address: "2092 Concourse Drive, Ste 9,\nSan Jose, CA 95131"
        },
        vn: {
             name: { vn: "Văn phòng Việt Nam", en: "Vietnam Office" },
             address: "161 Ung Văn Khiêm, Phường Thạnh Mỹ Tây,\nTP. HCM"
        }
      },
      form: {
        title: { vn: "Nộp Đơn Ứng Tuyển", en: "Submit Application" },
        firstName: { vn: "Tên", en: "First Name" },
        lastName: { vn: "Họ", en: "Last Name" },
        preferredName: { vn: "Tên gọi ưu tiên", en: "Preferred First Name" },
        email: { vn: "Email", en: "Email" },
        country: { vn: "Quốc gia", en: "Country" },
        phone: { vn: "Số điện thoại", en: "Phone" },
        location: { vn: "Địa điểm (Thành phố)", en: "Location (City)" },
        locateMe: { vn: "Định vị tôi", en: "Locate me" },
        resume: { vn: "Hồ sơ / CV", en: "Resume/CV" },
        attach: { vn: "Đính kèm", en: "Attach" },
        dropbox: { vn: "Dropbox", en: "Dropbox" },
        enterManually: { vn: "Nhập thủ công", en: "Enter manually" },
        fileTypes: { vn: "Định dạng hỗ trợ: pdf, doc, docx, txt, rtf", en: "Accepted file types: pdf, doc, docx, txt, rtf" },
        currentSalary: { vn: "Mức lương hiện tại", en: "Current monthly salary" },
        expectedSalary: { vn: "Mức lương mong muốn", en: "Expected monthly salary" },
        linkedin: { vn: "LinkedIn Profile URL", en: "LinkedIn Profile URL" },
        noticePeriod: { vn: "Thời gian thông báo nghỉ việc", en: "Notice Period" },
        position: { vn: "Vị trí ứng tuyển", en: "Position Applied For" },
        submit: { vn: "Gửi Đơn Ứng Tuyển", en: "Submit Application" }
      },
      jobs: {
          title: { vn: "Vị trí đang tuyển", en: "Open Positions" },
          apply: { vn: "Ứng tuyển ngay", en: "Apply Now" },
          viewDetail: { vn: "Xem chi tiết", en: "View Detail" },
          jobDetails: {
              desc: { vn: "Mô tả công việc", en: "Job Description" },
              reqs: { vn: "Yêu cầu", en: "Requirements" },
              benefits: { vn: "Phúc lợi vị trí", en: "Benefits" },
              deadline: { vn: "Hạn nộp hồ sơ", en: "Application Deadline" }
          },
          list: [
              { 
                title: "Senior Architect", 
                dept: "NCA Designs", 
                location: "San Jose, CA", 
                type: "Full-time",
                applicationLink: "https://docs.google.com/forms/d/e/1FAIpQLSe_example_form/viewform?usp=pp_url&entry.123=Senior+Architect",
                details: {
                    description: {
                        vn: "Chịu trách nhiệm dẫn dắt các dự án thiết kế kiến trúc và nội thất. Làm việc trực tiếp với khách hàng để phát triển ý tưởng và quản lý đội ngũ thiết kế.",
                        en: "Lead architectural and interior design projects. Work directly with clients to develop concepts and manage the design team."
                    },
                    requirements: {
                        vn: ["Tốt nghiệp Đại học chuyên ngành Kiến trúc", "Ít nhất 5 năm kinh nghiệm", "Thành thạo AutoCAD, SketchUp, Revit", "Có chứng chỉ hành nghề là lợi thế"],
                        en: ["Bachelor's degree in Architecture", "Minimum 5 years experience", "Proficient in AutoCAD, SketchUp, Revit", "Licensure is a plus"]
                    },
                    benefits: {
                         vn: ["Lương $80k - $120k/năm", "Thưởng dự án", "Cơ hội trở thành Partner"],
                         en: ["Salary $80k - $120k/year", "Project bonuses", "Partnership opportunity"]
                    },
                    deadline: {
                        vn: "30/06/2024",
                        en: "June 30, 2024"
                    }
                }
              },
              { 
                title: "Construction Project Manager", 
                dept: "Custom Home", 
                location: "San Jose, CA", 
                type: "Full-time",
                applicationLink: "https://docs.google.com/forms/d/e/1FAIpQLSe_example_form/viewform?usp=pp_url&entry.123=Construction+Project+Manager",
                details: {
                    description: {
                        vn: "Quản lý toàn bộ vòng đời dự án xây dựng từ lập kế hoạch, dự toán ngân sách đến giám sát thi công và bàn giao.",
                        en: "Manage the full construction project lifecycle from planning and budgeting to site supervision and handover."
                    },
                    requirements: {
                        vn: ["Kinh nghiệm quản lý dự án xây dựng dân dụng 3+ năm", "Hiểu biết về luật xây dựng California", "Kỹ năng giao tiếp và giải quyết vấn đề tốt"],
                        en: ["3+ years in residential construction management", "Knowledge of California building codes", "Strong communication and problem-solving skills"]
                    },
                    benefits: {
                         vn: ["Lương $90k - $130k/năm", "Xe công ty", "Bảo hiểm y tế toàn phần"],
                         en: ["Salary $90k - $130k/year", "Company vehicle", "Full health insurance"]
                    },
                    deadline: {
                        vn: "15/05/2024",
                        en: "May 15, 2024"
                    }
                }
              },
              { 
                title: "Interior Designer", 
                dept: "Design Your Rooms", 
                location: "San Jose, CA", 
                type: "Full-time",
                applicationLink: "https://docs.google.com/forms/d/e/1FAIpQLSe_example_form/viewform?usp=pp_url&entry.123=Interior+Designer",
                details: {
                    description: {
                        vn: "Tư vấn và thiết kế nội thất tùy chỉnh cho khách hàng. Lựa chọn vật liệu, màu sắc và phối hợp với xưởng sản xuất.",
                        en: "Consult and design custom furniture for clients. Select materials, colors, and coordinate with the production workshop."
                    },
                    requirements: {
                        vn: ["Có gu thẩm mỹ tốt", "Kinh nghiệm với phần mềm thiết kế 3D", "Am hiểu về vật liệu nội thất"],
                        en: ["Strong aesthetic sense", "Experience with 3D design software", "Knowledge of interior materials"]
                    },
                    benefits: {
                         vn: ["Lương $60k - $90k/năm", "Hoa hồng bán hàng", "Môi trường làm việc sáng tạo"],
                         en: ["Salary $60k - $90k/year", "Sales commission", "Creative working environment"]
                    },
                    deadline: {
                        vn: "30/05/2024",
                        en: "May 30, 2024"
                    }
                }
              },
              { 
                title: "Community Manager", 
                dept: "NCM Cafe", 
                location: "San Jose, CA", 
                type: "Part-time",
                applicationLink: "https://docs.google.com/forms/d/e/1FAIpQLSe_example_form/viewform?usp=pp_url&entry.123=Community+Manager",
                details: {
                    description: {
                        vn: "Quản lý vận hành hàng ngày tại NCM Cafe. Tổ chức các sự kiện networking và xây dựng cộng đồng startup.",
                        en: "Manage daily operations at NCM Cafe. Organize networking events and build the startup community."
                    },
                    requirements: {
                        vn: ["Yêu thích giao tiếp và kết nối", "Kinh nghiệm trong ngành F&B hoặc tổ chức sự kiện", "Tiếng Anh tốt"],
                        en: ["Love communication and networking", "Experience in F&B or event planning", "Fluent in English"]
                    },
                    benefits: {
                         vn: ["Lương theo giờ + Tips", "Đồ uống miễn phí", "Cơ hội network với các nhà đầu tư"],
                         en: ["Hourly wage + Tips", "Free drinks", "Networking with investors"]
                    },
                    deadline: {
                        vn: "Đang tuyển liên tục",
                        en: "Ongoing Recruitment"
                    }
                }
              },
              { 
                title: "Marketing Specialist", 
                dept: "CLAH HQ", 
                location: "Remote / Hybrid", 
                type: "Full-time",
                applicationLink: "https://docs.google.com/forms/d/e/1FAIpQLSe_example_form/viewform?usp=pp_url&entry.123=Marketing+Specialist",
                details: {
                    description: {
                        vn: "Xây dựng chiến lược marketing cho toàn bộ hệ sinh thái CLAH. Quản lý social media và content marketing.",
                        en: "Develop marketing strategies for the entire CLAH ecosystem. Manage social media and content marketing."
                    },
                    requirements: {
                        vn: ["Kinh nghiệm Digital Marketing 2+ năm", "Kỹ năng viết content tốt", "Biết sử dụng công cụ thiết kế cơ bản"],
                        en: ["2+ years in Digital Marketing", "Strong content writing skills", "Basic design tool knowledge"]
                    },
                    benefits: {
                         vn: ["Lương $50k - $75k/năm", "Làm việc linh hoạt", "Thưởng hiệu quả"],
                         en: ["Salary $50k - $75k/year", "Flexible working", "Performance bonus"]
                    },
                    deadline: {
                        vn: "20/06/2024",
                        en: "June 20, 2024"
                    }
                }
              }
          ]
      }
  },
  locationsPage: {
    hero: {
      title: { vn: "Mạng lưới CLAH", en: "Global Presence" },
      subtitle: { vn: "Kết nối San Jose và Việt Nam thông qua hệ sinh thái CLAH.", en: "Connecting San Jose and Vietnam through the CLAH ecosystem." }
    },
    viewMap: { vn: "Xem bản đồ", en: "View on Map" },
    gallery: { vn: "Không gian làm việc", en: "Office Gallery" },
    mapAccess: { vn: "Bản đồ chỉ dẫn", en: "Map Access" }
  },
  resourcesPage: {
    hero: {
      title: { vn: "Tin Tức & Tài Nguyên", en: "News & Resources" },
      subtitle: { vn: "Cập nhật những xu hướng mới nhất về xây dựng, thiết kế và công nghệ từ CLAH Ecosystem.", en: "Stay updated with the latest trends in construction, design, and technology from CLAH Ecosystem." }
    },
    filters: {
      all: { vn: "Tất cả", en: "All" },
      news: { vn: "Tin Tức", en: "News" },
      caseStudy: { vn: "Dự Án Tiêu Biểu", en: "Case Studies" },
      press: { vn: "Thông Cáo Báo Chí", en: "Press Release" },
      blog: { vn: "Blog", en: "Blog" }
    },
    readMore: { vn: "Đọc thêm", en: "Read more" }
  },
  contact: {
    title: { vn: "Sẵn sàng để bắt đầu?", en: "Ready to get started?" },
    subtitle: { 
      vn: "Liên hệ với chúng tôi để được tư vấn miễn phí về xây dựng, thiết kế hoặc đặt không gian sự kiện.", 
      en: "Contact us for a free consultation on construction, design, or event space booking."
    },
    visit: { vn: "Ghé thăm", en: "Visit Us" },
    call: { vn: "Gọi điện", en: "Call Us" },
    email: { vn: "Gửi Email", en: "Email Us" },
    address: "2092 Concourse Drive, Ste 9,\nSan Jose, CA 95131, United States",
    emailAddr: "info@clah.us",
    phoneNo: "+1 650-999-6797"
  },
  chat: {
    welcome: { 
        vn: 'Xin chào! Tôi là trợ lý ảo của CLAH. Bạn cần tìm hiểu về Xây dựng, Thiết kế hay Cafe startup?',
        en: 'Hello! I am the CLAH virtual assistant. Do you need information about Construction, Design, or the Startup Cafe?'
    },
    placeholder: { vn: "Hỏi về dịch vụ của chúng tôi...", en: "Ask about our services..." },
    thinking: { vn: "CLAH đang suy nghĩ...", en: "CLAH is thinking..." }
  },
  servicesPage: {
    hero: {
      title: { vn: "Giải Pháp Toàn Diện Cho Không Gian Sống", en: "Comprehensive Solutions for Living Spaces" },
      subtitle: { vn: "Kết nối mọi giai đoạn từ ý tưởng đến hiện thực hóa ngôi nhà và văn phòng của bạn.", en: "Connecting every stage from concept to realization of your home and office." }
    },
    challenges: {
      title: { vn: "Những Thách Thức Phổ Biến", en: "Common Challenges" },
      items: [
        { vn: "Quy trình xây dựng phức tạp và tốn thời gian", en: "Complex and time-consuming construction process" },
        { vn: "Thiếu sự đồng bộ giữa thiết kế và thi công", en: "Lack of synchronization between design and construction" },
        { vn: "Khó tìm kiếm đồ nội thất độc bản, chất lượng cao", en: "Difficulty finding unique, high-quality furniture" },
        { vn: "Thiếu không gian kết nối cho cộng đồng Startup", en: "Lack of networking space for the Startup community" }
      ]
    },
    solutions: {
      title: { vn: "Giải Pháp Của CLAH", en: "CLAH Solutions" },
      intro: { vn: "Chúng tôi cung cấp một hệ sinh thái khép kín giúp giải quyết mọi vấn đề của bạn.", en: "We provide a closed-loop ecosystem to solve all your problems." }
    }
  },
  ecosystemModel: {
    header: { vn: "MÔ HÌNH KINH DOANH", en: "OUR BUSINESS" },
    title: { vn: "Hệ Sinh Thái Khép Kín", en: "Closed-Loop Ecosystem" },
    description: { 
      vn: "Sự kết hợp hoàn hảo giữa phần cứng (Xây dựng & Nội thất) và phần mềm (Phong cách sống & Kết nối).", 
      en: "The perfect combination of Hardware (Construction & Furniture) and Software (Lifestyle & Connection)." 
    },
    labels: {
      accumulation: { vn: "Tích Luỹ", en: "Accumulation" },
      analysis: { vn: "Phân Tích", en: "Analysis" },
      matching: { vn: "Kết Nối", en: "Matching" },
      usage: { vn: "Sử Dụng", en: "Usage" },
      hardware: { vn: "Phần Cứng", en: "Hardware" },
      software: { vn: "Phần Mềm", en: "Software" },
      construction: { vn: "Xây Dựng", en: "Construction" },
      lifestyle: { vn: "Lối Sống", en: "Lifestyle" }
    }
  }
};

export const SYSTEM_INSTRUCTION = `
Bạn là Trợ lý Ảo AI của CLAH Ecosystem (CLAH) tại San Jose.
Nhiệm vụ của bạn là tư vấn cho khách hàng về hệ sinh thái dịch vụ của CLAH.

Hệ sinh thái bao gồm:
1. **Custom Home**: Công ty xây dựng nhà ở trọn gói.
2. **NCA Designs**: Công ty thiết kế nội thất chuyên nghiệp.
3. **Design your rooms**: Dịch vụ cung cấp đồ nội thất custom (may đo).
4. **NCM Cafe**: Quán cà phê kết hợp không gian networking cho Real Estate & Startups.

Phong cách trả lời: Chuyên nghiệp, thân thiện, súc tích và hướng khách hàng đến việc sử dụng dịch vụ.
Nếu khách hàng hỏi bằng tiếng Việt, hãy trả lời bằng tiếng Việt. Nếu hỏi bằng tiếng Anh, hãy trả lời bằng tiếng Anh.
`;
