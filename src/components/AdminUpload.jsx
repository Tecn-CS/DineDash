import React, { useState } from 'react';
import { Upload, X, CheckCircle, Loader2, FileImage, Image as ImageIcon } from 'lucide-react';

import { useLanguage } from '../context/LanguageContext';

export default function AdminUpload({ onClose, onOfferAdded }) {
  const { t, lang } = useLanguage();
  const [step, setStep] = useState(0); // 0: Form, 1: Processing, 2: Success
  const [selectedImages, setSelectedImages] = useState([]);
  
  const [formData, setFormData] = useState({
    restaurantName_en: '',
    restaurantName_ar: '',
    description_en: '',
    description_ar: '',
    city: '',
    googleMapsLink: '',
    workingHours: '10:00 AM - 10:00 PM',
    expiryDate: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString(), // Default to 1 week from now, as string
    category: 'New'
  });

  const workflowSteps = [
    { id: 'vision', label: lang === 'en' ? 'Vision Agent: Extracting Text...' : 'وكيل الرؤية: استخراج النص...' },
    { id: 'location', label: lang === 'en' ? 'Location Agent: Validating Address...' : 'وكيل الموقع: التحقق من العنوان...' },
    { id: 'content', label: lang === 'en' ? 'Content Optimizer: Formatting Tags...' : 'مُحسّن المحتوى: تنسيق العلامات...' },
    { id: 'db', label: lang === 'en' ? 'Database Manager: Saving Record...' : 'مدير قواعد البيانات: حفظ السجل...' }
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (selectedImages.length === 0) return;
    
    setStep(1);
    
    // Simulate AI workflow
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep >= workflowSteps.length) {
        clearInterval(interval);
        setTimeout(() => {
          setStep(2);
          
          // Add to state via callback 
          const newOffer = {
            id: `off-${Date.now()}`,
            restaurantName_en: formData.restaurantName_en,
            restaurantName_ar: formData.restaurantName_ar,
            description_en: formData.description_en,
            description_ar: formData.description_ar,
            imageUrls: selectedImages,
            workingHours: formData.workingHours,
            expiryDate: new Date(new Date(formData.expiryDate).setHours(23, 59, 59, 999)).toISOString(),
            category: formData.category,
            status: 'Newest',
            googleMapsLink: formData.googleMapsLink,
            city: formData.city,
            // Fallback mock coordinates since we don't have a real geocoder attached yet
            coordinates: {
              lat: 21.5433 + (Math.random() - 0.5) * 0.05, 
              lng: 39.1728 + (Math.random() - 0.5) * 0.05
            }
          };
          
          if (onOfferAdded) {
            onOfferAdded(newOffer);
          }
        }, 500);
      }
    }, 1000);
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      setSelectedImages(prev => [...prev, ...filesArray]);
    }
  };

  const removeImage = (index) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(8px)',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        animation: 'fadeIn 0.2s ease-out'
      }}
    >
      <div 
        className="glass"
        style={{
          width: '100%',
          maxWidth: '600px',
          maxHeight: '90vh',
          borderRadius: 'var(--border-radius-lg)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          animation: 'slideUp 0.3s ease-out'
        }}
      >
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '1.5rem', right: lang === 'en' ? '1.5rem' : 'auto', left: lang === 'ar' ? '1.5rem' : 'auto', zIndex: 10, opacity: 0.7 }}
        >
          <X size={24} />
        </button>

        <div style={{ padding: '2rem', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '2rem' }}>
            {step === 0 ? t('add_offer_title') : step === 1 ? t('ai_processing') : t('published')}
          </h2>

          {step === 0 && (
            <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <label 
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '2rem',
                  border: '2px dashed var(--color-border)',
                  borderRadius: 'var(--border-radius-md)',
                  cursor: 'pointer',
                  background: selectedImages.length > 0 ? 'var(--color-bg-surface-hover)' : 'var(--color-bg-surface)',
                  transition: '0.2s'
                }}
              >
                <input type="file" style={{ display: 'none' }} onChange={handleFileChange} accept="image/*" multiple />
                {selectedImages.length > 0 ? (
                  <div style={{ width: '100%' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '0.5rem', marginBottom: '1rem' }}>
                      {selectedImages.map((img, idx) => (
                        <div key={idx} style={{ position: 'relative', height: '80px', borderRadius: '8px', overflow: 'hidden' }}>
                          <img src={img} alt={`Preview ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          <button 
                            type="button"
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); removeImage(idx); }}
                            style={{ position: 'absolute', top: '2px', right: '2px', background: 'rgba(0,0,0,0.5)', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex-center" style={{ gap: '0.5rem', color: 'var(--color-primary)', fontWeight: 600 }}>
                      <Upload size={16} />
                      <span>{t('add_more_images') || (lang === 'en' ? 'Add more images' : 'إضافة المزيد من الصور')}</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <ImageIcon size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                    <span style={{ fontWeight: 600, marginBottom: '0.5rem' }}>{t('click_to_browse')}</span>
                  </>
                )}
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>Restaurant Name (EN)</label>
                  <input required name="restaurantName_en" value={formData.restaurantName_en} onChange={handleInputChange} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg-base)', color: 'white' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>اسم المطعم (AR)</label>
                  <input required name="restaurantName_ar" value={formData.restaurantName_ar} onChange={handleInputChange} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg-base)', color: 'white', direction: 'rtl' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>Description (EN)</label>
                  <textarea required name="description_en" value={formData.description_en} onChange={handleInputChange} rows={2} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg-base)', color: 'white', fontFamily: 'inherit' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>الوصف (AR)</label>
                  <textarea required name="description_ar" value={formData.description_ar} onChange={handleInputChange} rows={2} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg-base)', color: 'white', fontFamily: 'inherit', direction: 'rtl' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>Google Maps Link / رابط جوجل ماب</label>
                  <input required type="url" name="googleMapsLink" placeholder="https://maps.google.com/..." value={formData.googleMapsLink} onChange={handleInputChange} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg-base)', color: 'white', direction: 'ltr' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>City / المدينة</label>
                  <input required name="city" placeholder="e.g. Jeddah / جدة" value={formData.city} onChange={handleInputChange} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg-base)', color: 'white', direction: lang === 'ar' ? 'rtl' : 'ltr' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>Expiry Date / تاريخ الصلاحية</label>
                  <input 
                    required 
                    type="date" 
                    name="expiryDate" 
                    value={formData.expiryDate.split('T')[0]} 
                    onChange={(e) => setFormData({ ...formData, expiryDate: new Date(e.target.value).toISOString() })} 
                    min={new Date().toISOString().split('T')[0]}
                    style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg-base)', color: 'white' }} 
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>Working Hours / أوقات العمل</label>
                  <input required type="text" name="workingHours" placeholder="e.g. 10:00 AM - 10:00 PM" value={formData.workingHours} onChange={handleInputChange} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg-base)', color: 'white', direction: 'ltr' }} />
                </div>
              </div>

              <button 
                type="submit"
                style={{ 
                  marginTop: '1rem',
                  width: '100%', 
                  padding: '1rem', 
                  borderRadius: 'var(--border-radius-sm)', 
                  background: 'var(--color-primary)', 
                  color: 'white',
                  fontWeight: 600,
                  transition: '0.2s'
                }}
              >
                {t('start_workflow')}
              </button>
            </form>
          )}

          {step === 1 && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              {workflowSteps.map((ws, i) => (
                <div 
                  key={ws.id} 
                  className="flex-center" 
                  style={{ 
                    justifyContent: 'flex-start', 
                    gap: '1rem', 
                    marginBottom: '1rem',
                    padding: '1rem',
                    background: 'var(--color-bg-surface)',
                    borderRadius: 'var(--border-radius-sm)',
                    animation: `slideUp 0.3s ease-out forwards`,
                    animationDelay: `${i * 1.5}s`,
                    opacity: 0
                  }}
                >
                  <Loader2 size={20} className="pulse" color="var(--color-primary)" style={{ animationDuration: '1s' }} />
                  <span>{ws.label}</span>
                </div>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="flex-center" style={{ flexDirection: 'column', gap: '1rem', padding: '2rem 0', textAlign: 'center', flex: 1 }}>
              <CheckCircle size={64} color="var(--color-success)" style={{ marginBottom: '1rem', animation: 'pulse 2s infinite' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{t('offer_added_success')}</h3>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>{t('success_desc')}</p>
              <button 
                onClick={onClose}
                style={{ 
                  width: '100%', 
                  padding: '1rem', 
                  borderRadius: 'var(--border-radius-sm)', 
                  background: 'var(--color-bg-surface)', 
                  fontWeight: 600
                }}
              >
                {t('return_dashboard')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
