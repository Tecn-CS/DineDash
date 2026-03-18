import React, { useState, useEffect } from 'react';
import { X, MapPin, Clock, CalendarDays, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function OfferModal({ offer, onClose }) {
  const { lang, t } = useLanguage();
  const nameField = `restaurantName_${lang}`;
  const descField = `description_${lang}`;
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = offer?.imageUrls || (offer?.offerImageUrl ? [offer.offerImageUrl] : []);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [images?.length]);

  if (!offer) return null;

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
      onClick={onClose}
    >
      <div 
        className="glass"
        style={{
          width: '100%',
          maxWidth: '800px',
          maxHeight: '90vh',
          borderRadius: 'var(--border-radius-lg)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          animation: 'slideUp 0.3s ease-out'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'var(--color-bg-surface-solid)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            border: '1px solid var(--color-glass-border)',
            transition: 'background 0.2s',
            boxShadow: 'var(--shadow-base)'
          }}
          className="hover:bg-opacity-80"
        >
          <X size={20} color="var(--color-text-primary)" />
        </button>

        <div style={{ height: '300px', width: '100%', flexShrink: 0, position: 'relative' }}>
          {images.length > 0 && (
            <img 
              src={images[currentImageIndex]} 
              alt={offer[nameField] || 'Offer Image'} 
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.5s ease-in-out' }}
            />
          )}
          
          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button 
                onClick={(e) => { e.stopPropagation(); setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length); }}
                style={{ position: 'absolute', top: '50%', left: '15px', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.3)', borderRadius: '50%', width: '40px', height: '40px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.2s', zIndex: 5 }}
                onMouseEnter={(e) => e.target.style.background = 'rgba(0,0,0,0.5)'}
                onMouseLeave={(e) => e.target.style.background = 'rgba(0,0,0,0.3)'}
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); setCurrentImageIndex((prev) => (prev + 1) % images.length); }}
                style={{ position: 'absolute', top: '50%', right: '15px', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.3)', borderRadius: '50%', width: '40px', height: '40px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.2s', zIndex: 5 }}
                onMouseEnter={(e) => e.target.style.background = 'rgba(0,0,0,0.5)'}
                onMouseLeave={(e) => e.target.style.background = 'rgba(0,0,0,0.3)'}
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
          
          {/* Carousel Indicators */}
          {images.length > 1 && (
            <div style={{ position: 'absolute', bottom: '15px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px' }}>
              {images.map((_, idx) => (
                <div 
                  key={idx}
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: idx === currentImageIndex ? 'white' : 'rgba(255,255,255,0.4)',
                    transition: 'background 0.3s ease',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <div style={{ padding: '2rem', overflowY: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
            <div>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem', background: 'var(--color-primary)', borderRadius: '100px', fontWeight: 600 }}>
                  {offer.category}
                </span>
                <span style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem', background: 'var(--color-bg-surface)', border: '1px solid var(--color-glass-border)', borderRadius: '100px', fontWeight: 600 }}>
                  {offer.status} {/* Might want to translate status too if requested, treating it simply for now */}
                </span>
              </div>
              <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>{offer[nameField]}</h2>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>{offer[descField]}</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            <div className="flex-center" style={{ background: 'var(--color-bg-surface)', padding: '1rem', borderRadius: 'var(--border-radius-sm)', justifyContent: 'flex-start', gap: '1rem' }}>
              <CalendarDays color="var(--color-primary)" />
              <div>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{t('valid_until')}</p>
                <p style={{ fontWeight: 600 }}>{new Date(offer.expiryDate).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex-center" style={{ background: 'var(--color-bg-surface)', padding: '1rem', borderRadius: 'var(--border-radius-sm)', justifyContent: 'flex-start', gap: '1rem' }}>
              <Clock color="var(--color-warning)" />
              <div>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{t('working_hours')}</p>
                <p style={{ fontWeight: 600 }}>{offer.workingHours}</p>
              </div>
            </div>
            {(offer.city || offer.distance !== undefined) && (
              <div className="flex-center" style={{ background: 'var(--color-bg-surface)', padding: '1rem', borderRadius: 'var(--border-radius-sm)', justifyContent: 'flex-start', gap: '1rem' }}>
                <MapPin color="var(--color-primary)" />
                <div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{lang === 'ar' ? 'الموقع' : 'Location'}</p>
                  <p style={{ fontWeight: 600 }}>
                    {offer.city && <span>{offer.city} </span>}
                    {offer.distance !== undefined && <span style={{ color: 'var(--color-primary)' }}>({offer.distance.toFixed(1)} {lang === 'ar' ? 'كم' : 'km'})</span>}
                  </p>
                </div>
              </div>
            )}
          </div>

          <a 
            href={offer.googleMapsLink || (offer.coordinates ? `https://www.google.com/maps/search/?api=1&query=${offer.coordinates.lat},${offer.coordinates.lng}` : '#')}
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              width: '100%', 
              padding: '1rem', 
              borderRadius: 'var(--border-radius-sm)', 
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-hover))', 
              color: 'white',
              fontWeight: 600,
              fontSize: '1.1rem',
              transition: '0.2s',
              boxShadow: '0 4px 15px rgba(255, 71, 87, 0.4)'
            }}
            className="flex-center"
          >
            <MapPin size={20} />
            {t('open_in_maps')}
            <ExternalLink size={16} style={{ marginLeft: lang === 'en' ? '0.25rem' : '0', marginRight: lang === 'ar' ? '0.25rem' : '0' }} />
          </a>
        </div>
      </div>
    </div>
  );
}
