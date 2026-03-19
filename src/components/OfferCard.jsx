import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, ChevronLeft, ChevronRight, ThumbsUp, ThumbsDown, Share2, Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function OfferCard({ offer, onViewDetails }) {
  const { lang, t } = useLanguage();
  const nameField = `restaurantName_${lang}`;
  const descField = `description_${lang}`;
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [likes, setLikes] = useState(offer.likes || 0);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);
  
  const images = offer.imageUrls || [offer.offerImageUrl]; // Support both old and new data structures

  useEffect(() => {
    if (images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [images.length]);

  const handleLike = (e) => {
    e.stopPropagation();
    if (hasLiked) {
      setLikes(prev => prev - 1);
      setHasLiked(false);
    } else {
      setLikes(prev => prev + 1);
      setHasLiked(true);
      if (hasDisliked) setHasDisliked(false);
    }
  };

  const handleDislike = (e) => {
    e.stopPropagation();
    if (hasDisliked) {
      setHasDisliked(false);
    } else {
      setHasDisliked(true);
      if (hasLiked) {
        setLikes(prev => prev - 1);
        setHasLiked(false);
      }
    }
  };

  const handleShare = (e) => {
    e.stopPropagation();
    const url = window.location.href; // Mock URL
    navigator.clipboard.writeText(url);
    alert(t('link_copied'));
  };

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
          alt={offer[nameField] || 'Offer'} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.5s ease-in-out' }}
        />
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button 
              onClick={(e) => { e.stopPropagation(); setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length); }}
              style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.3)', borderRadius: '50%', color: 'white', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.2s' }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(0,0,0,0.5)'}
              onMouseLeave={(e) => e.target.style.background = 'rgba(0,0,0,0.3)'}
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); setCurrentImageIndex((prev) => (prev + 1) % images.length); }}
              style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.3)', borderRadius: '50%', color: 'white', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.2s' }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(0,0,0,0.5)'}
              onMouseLeave={(e) => e.target.style.background = 'rgba(0,0,0,0.3)'}
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
        
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

        {offer.reports > 3 && (
          <div className="flex-center" style={{ gap: '0.5rem', padding: '0.6rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', marginBottom: '1rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            <Info size={14} color="#ef4444" />
            <span style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: 600 }}>{t('report_warning')}</span>
          </div>
        )}
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              onClick={handleLike}
              className="flex-center"
              style={{ padding: '0.5rem 0.8rem', borderRadius: '8px', background: hasLiked ? 'rgba(255, 71, 87, 0.1)' : 'var(--color-bg-surface)', border: '1px solid var(--color-glass-border)', gap: '0.4rem', transition: '0.2s', color: hasLiked ? 'var(--color-primary)' : 'var(--color-text-secondary)' }}
            >
              <ThumbsUp size={16} fill={hasLiked ? 'currentColor' : 'none'} />
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{likes}</span>
            </button>
            <button 
              onClick={handleDislike}
              className="flex-center"
              style={{ padding: '0.5rem 0.8rem', borderRadius: '8px', background: hasDisliked ? 'rgba(0, 0, 0, 0.1)' : 'var(--color-bg-surface)', border: '1px solid var(--color-glass-border)', transition: '0.2s', color: hasDisliked ? 'var(--color-text-primary)' : 'var(--color-text-secondary)' }}
            >
              <ThumbsDown size={16} fill={hasDisliked ? 'currentColor' : 'none'} />
            </button>
          </div>
          <button 
            onClick={handleShare}
            className="flex-center"
            style={{ padding: '0.5rem', borderRadius: '8px', background: 'var(--color-bg-surface)', border: '1px solid var(--color-glass-border)', color: 'var(--color-text-secondary)', transition: '0.2s' }}
            title={t('share')}
          >
            <Share2 size={18} />
          </button>
        </div>
        
        <button 
          style={{ 
            width: '100%', 
            padding: '0.85rem', 
            borderRadius: '12px', 
            background: 'var(--color-primary)', 
            color: 'white',
            border: 'none',
            fontWeight: 700,
            fontSize: '0.95rem',
            transition: '0.3s',
            marginTop: 'auto',
            boxShadow: '0 4px 15px rgba(255, 71, 87, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'var(--color-primary-hover)';
            e.target.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'var(--color-primary)';
            e.target.style.transform = 'scale(1)';
          }}
        >
          {t('view_details')}
        </button>
      </div>
    </div>
  );
}
