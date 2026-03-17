import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function OfferCard({ offer, onViewDetails }) {
  const { lang, t } = useLanguage();
  const nameField = `restaurantName_${lang}`;
  const descField = `description_${lang}`;
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = offer.imageUrls || [offer.offerImageUrl]; // Support both old and new data structures

  useEffect(() => {
    if (images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div 
      className="glass" 
      style={{ 
        borderRadius: 'var(--border-radius-md)', 
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(255, 71, 87, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2)';
      }}
      onClick={() => onViewDetails(offer)}
    >
      <div style={{ position: 'relative', height: '200px', width: '100%' }}>
        <img 
          src={images[currentImageIndex]} 
          alt={offer[nameField]} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.5s ease-in-out' }}
        />
        
        {/* Carousel Indicators */}
        {images.length > 1 && (
          <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '6px' }}>
            {images.map((_, idx) => (
              <div 
                key={idx}
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: idx === currentImageIndex ? 'white' : 'rgba(255,255,255,0.4)',
                  transition: 'background 0.3s ease'
                }}
              />
            ))}
          </div>
        )}
        <div 
          className="glass"
          style={{ 
            position: 'absolute', 
            top: '1rem', 
            right: '1rem', 
            padding: '0.25rem 0.75rem', 
            borderRadius: '100px',
            fontSize: '0.8rem',
            fontWeight: 600,
            color: 'var(--color-primary)'
          }}
        >
          {offer.category}
        </div>
      </div>
      
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 600 }}>{offer[nameField]}</h3>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: '1rem', flex: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {offer[descField]}
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', fontSize: '0.8rem', color: 'var(--color-text-muted)', flexWrap: 'wrap' }}>
          {offer.distance !== undefined && (
            <div className="flex-center" style={{ gap: '0.25rem', color: 'var(--color-primary)' }}>
              <MapPin size={14} />
              <span style={{ fontWeight: 600 }}>{offer.distance.toFixed(1)} {lang === 'ar' ? 'كم' : 'km'}</span>
            </div>
          )}
          <div className="flex-center" style={{ gap: '0.25rem' }}>
            <Calendar size={14} />
            <span>{t('expires_soon')}</span>
          </div>
          <div className="flex-center" style={{ gap: '0.25rem' }}>
            <Clock size={14} />
            <span>{offer.workingHours}</span>
          </div>
        </div>
        
        <button 
          style={{ 
            width: '100%', 
            padding: '0.75rem', 
            borderRadius: 'var(--border-radius-sm)', 
            background: 'var(--color-bg-surface)', 
            border: '1px solid var(--color-glass-border)',
            fontWeight: 600,
            transition: '0.2s',
            marginTop: 'auto'
          }}
          onMouseEnter={(e) => e.target.style.background = 'var(--color-bg-surface-hover)'}
          onMouseLeave={(e) => e.target.style.background = 'var(--color-bg-surface)'}
        >
          {t('view_details')}
        </button>
      </div>
    </div>
  );
}
