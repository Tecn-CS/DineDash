import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    dashboard: 'Dashboard',
    newest: 'Newest',
    nearby_offers: 'Nearby Offers',
    ending_soon: 'Ending Soon',
    upload_flyer: 'Share Offers',
    discover_offers: 'Discover',
    offers_highlight: 'Offers',
    subtitle: 'The best restaurant deals.',
    agent_online: 'Agent Manager: Online',
    no_offers: 'No offers found for',
    try_exploring: 'Try exploring another category or check back later.',
    category: 'Category',
    valid_until: 'Valid Until',
    working_hours: 'Working Hours',
    open_in_maps: 'Open in Google Maps',
    view_details: 'View Details',
    expires_soon: 'Expires soon',
    add_offer_title: 'Share Offers',
    ai_processing: 'Processing',
    published: 'Successfully Published',
    start_workflow: 'Share Offer',
    image_selected: 'Image Selected',
    click_to_browse: 'Click to Browse',
    return_dashboard: 'Return to Dashboard',
    offer_added_success: 'Offer Added Successfully',
    success_desc: 'The Agent Manager has successfully processed and optimized the flyer data.',
    // Form fields
    restaurant_name: 'Restaurant Name',
    description: 'Description',
    expiry_date: 'Expiry Date',
    location: 'Location (Lat, Lng)'
  },
  ar: {
    dashboard: 'لوحة التحكم',
    newest: 'أحدث العروض',
    nearby_offers: 'العروض القريبة',
    ending_soon: 'تنتهي قريباً',
    upload_flyer: 'شاركنا عروض المطاعم',
    discover_offers: 'استكشف',
    offers_highlight: 'العروض',
    subtitle: 'أفضل عروض المطاعم لك.',
    agent_online: 'مدير الوكلاء: متصل',
    no_offers: 'لا توجد عروض لـ',
    try_exploring: 'جرب تصفح فئة أخرى أو عد لاحقاً.',
    category: 'الفئة',
    valid_until: 'صالح حتى',
    working_hours: 'أوقات العمل',
    open_in_maps: 'افتح في خرائط جوجل',
    view_details: 'عرض التفاصيل',
    expires_soon: 'ينتهي قريباً',
    add_offer_title: 'شاركنا عروض المطاعم',
    ai_processing: 'جاري المعالجة',
    published: 'تم النشر بنجاح',
    start_workflow: 'شارك الاعلان',
    image_selected: 'تم اختيار صورة',
    click_to_browse: 'انقر للتصفح',
    return_dashboard: 'العودة للوحة القيادة',
    offer_added_success: 'تم إضافة العرض بنجاح',
    success_desc: 'قام مدير الوكلاء بمعالجة بيانات العرض وتحسينها بنجاح.',
    // Form fields
    restaurant_name: 'اسم المطعم',
    description: 'الوصف',
    expiry_date: 'تاريخ الانتهاء',
    location: 'الموقع (خط العرض، خط الطول)'
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLanguage = () => {
    setLang(prev => (prev === 'en' ? 'ar' : 'en'));
  };

  const t = (key) => {
    return translations[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
