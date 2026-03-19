export const mockOffers = [
  {
    id: "off-001",
    restaurantName_en: "Burger Haven",
    restaurantName_ar: "ملاذ البرجر",
    imageUrls: [
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    description_en: "Buy 1 Get 1 Free on all Classic Cheeseburgers. Valid for dine-in only.",
    description_ar: "اشتري 1 واحصل على 1 مجاناً على جميع أنواع تشيز برجر الكلاسيكية. للطلبات الداخلية فقط.",
    city: "Jeddah",
    coordinates: { lat: 21.5433, lng: 39.1728 }, // Jeddah
    workingHours: "10:00 AM - 11:00 PM",
    expiryDate: "2026-03-20T23:59:59Z",
    category: "Fast Food",
    status: "Ending Soon",
    likes: 124,
    dislikes: 5,
    reports: 0,
    views: 1200
  },
  {
    id: "off-002",
    restaurantName_en: "Sushi Sakura",
    restaurantName_ar: "سوشي ساكورا",
    imageUrls: [
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1611143669185-af224c5e3252?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    description_en: "50% off Premium Omakase set. Excludes drinks and desserts.",
    description_ar: "خصم 50% على مجموعة أوماكاسي الفاخرة. لا يشمل المشروبات والحلويات.",
    city: "Jeddah",
    coordinates: { lat: 21.5833, lng: 39.1628 }, // Jeddah
    workingHours: "12:00 PM - 10:00 PM",
    expiryDate: "2026-03-25T23:59:59Z",
    category: "Fine Dining",
    status: "Newest",
    likes: 85,
    dislikes: 2,
    reports: 0,
    views: 450
  },
  {
    id: "off-003",
    restaurantName_en: "Morning Brew",
    restaurantName_ar: "مورنينج برو",
    imageUrls: [
      "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1541167760496-1628856ab772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    description_en: "Free pastry with any large coffee purchase before 10 AM.",
    description_ar: "معجنات مجانية مع أي شراء قهوة كبيرة قبل 10 صباحاً.",
    city: "Jeddah",
    coordinates: { lat: 21.4933, lng: 39.1828 }, // Jeddah
    workingHours: "6:30 AM - 4:00 PM",
    expiryDate: "2026-03-18T23:59:59Z",
    category: "Breakfast",
    status: "Nearby",
    likes: 42,
    dislikes: 1,
    reports: 4, // This one will trigger the warning
    views: 150
  },
  {
    id: "off-004",
    restaurantName_en: "Taco Fiesta",
    restaurantName_ar: "تاكو فييستا",
    imageUrls: [
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    description_en: "$2 Tacos all day on Taco Tuesdays. Includes chicken and beef.",
    description_ar: "تاكو بـ 2$ طوال يوم الثلاثاء. يشمل الدجاج واللحم.",
    city: "Jeddah",
    coordinates: { lat: 21.5733, lng: 39.1328 }, // Jeddah
    workingHours: "11:00 AM - 10:00 PM",
    expiryDate: "2026-03-24T23:59:59Z",
    category: "Fast Food",
    status: "Newest",
    likes: 210,
    dislikes: 8,
    reports: 1,
    views: 890
  },
  {
    id: "off-005",
    restaurantName_en: "Pasta Paradiso",
    restaurantName_ar: "باستا باراديسو",
    imageUrls: [
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    description_en: "Complimentary house wine bottle for tables of 4 or more.",
    description_ar: "زجاجة مجانية للطاولات المكونة من 4 أشخاص أو أكثر.",
    city: "Jeddah",
    coordinates: { lat: 21.5633, lng: 39.1558 }, // Jeddah
    workingHours: "5:00 PM - 11:30 PM",
    expiryDate: "2026-03-17T23:59:59Z",
    category: "Fine Dining",
    status: "Ending Soon",
    likes: 56,
    dislikes: 12,
    reports: 0,
    views: 320
  },
  {
    id: "off-006",
    restaurantName_en: "The Vegan Spot",
    restaurantName_ar: "الوجهة النباتية",
    imageUrls: [
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    description_en: "20% off all salads and smoothie bowls this weekend.",
    description_ar: "خصم 20% على جميع السلطات وأوعية السموذي نهاية هذا الأسبوع.",
    city: "Jeddah",
    coordinates: { lat: 21.5233, lng: 39.1428 }, // Jeddah
    workingHours: "8:00 AM - 8:00 PM",
    expiryDate: "2026-03-30T23:59:59Z",
    category: "Breakfast",
    status: "Nearby",
    likes: 38,
    dislikes: 0,
    reports: 2,
    views: 280
  }
];
