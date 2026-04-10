import React, { useState, useEffect } from 'react';
import { X, MapPin, Clock, CalendarDays, ExternalLink, ChevronLeft, ChevronRight, ThumbsUp, ThumbsDown, Share2, AlertTriangle, Send, Copy, Check, Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function OfferModal({ offer, onClose }) {
  const { lang, t } = useLanguage();
  const nameField = `restaurantName_${lang}`;
  const descField = `description_${lang}`;
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [likes, setLikes] = useState(offer?.likes || 0);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);
  const [isReporting, setIsReporting] = useState(false);
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  
  const images = offer?.imageUrls || (offer?.offerImageUrl ? [offer.offerImageUrl] : []);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [images?.length]);

  const handleLike = () => {
    if (hasLiked) {
      setLikes(prev => prev - 1);
      setHasLiked(false);
    } else {
      setLikes(prev => prev + 1);
      setHasLiked(true);
      if (hasDisliked) setHasDisliked(false);
    }
  };

  const handleDislike = () => {
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

  const handleReport = () => {
    setIsReporting(true);
  };

  const submitReport = () => {
    setReportSubmitted(true);
    setTimeout(() => {
      setIsReporting(false);
      setReportSubmitted(false);
    }, 3000);
  };

  const copyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const shareWhatsApp = () => {
    const text = `${t('share_with_friend')}: ${offer[nameField]} - ${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareX = () => {
    const text = `${offer[nameField]} - ${t('discover_offers')}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`, '_blank');
  };

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

        <div style={{ height: '300px', width: '100%', flexShrink: 0, position: 'relative', overflow: 'hidden', backgroundColor: 'var(--color-bg-base)' }}>
          {images.length > 0 && (
            <>
              <div 
                style={{
                  position: 'absolute',
                  inset: -20,
                  backgroundImage: `url(${images[currentImageIndex]})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'blur(15px)',
                  opacity: 0.5,
                  zIndex: 0
                }}
              />
              <img 
                src={images[currentImageIndex]} 
                alt={offer[nameField] || 'Offer Image'} 
                style={{ width: '100%', height: '100%', objectFit: 'contain', position: 'relative', zIndex: 1, transition: 'opacity 0.5s ease-in-out' }}
              />
            </>
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
              <a 
                href={offer.googleMapsLink || (offer.coordinates ? `https://www.google.com/maps/search/?api=1&query=${offer.coordinates.lat},${offer.coordinates.lng}` : '#')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-center" 
                style={{ background: 'var(--color-bg-surface)', padding: '1rem', borderRadius: 'var(--border-radius-sm)', justifyContent: 'flex-start', gap: '1rem', textDecoration: 'none', color: 'inherit' }}
              >
                <MapPin color="var(--color-primary)" />
                <div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{lang === 'ar' ? 'الموقع' : 'Location'}</p>
                  <p style={{ fontWeight: 600 }}>
                    {offer.city && <span>{offer.city} </span>}
                    {offer.distance !== undefined && <span style={{ color: 'var(--color-primary)' }}>({offer.distance.toFixed(1)} {lang === 'ar' ? 'كم' : 'km'})</span>}
                  </p>
                </div>
              </a>
            )}
          </div>

          {offer.reports > 3 && (
            <div className="flex-center" style={{ gap: '1rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '12px', marginBottom: '2rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
              <Info size={24} color="#ef4444" />
              <p style={{ fontSize: '0.9rem', color: '#ef4444', fontWeight: 600 }}>{t('report_warning')}</p>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button 
                  onClick={handleLike}
                  className="flex-center"
                  style={{ padding: '0.75rem 1.25rem', borderRadius: '12px', background: hasLiked ? 'rgba(255, 71, 87, 0.1)' : 'var(--color-bg-surface)', border: '1px solid var(--color-glass-border)', gap: '0.5rem', transition: '0.2s', color: hasLiked ? 'var(--color-primary)' : 'var(--color-text-secondary)' }}
                >
                  <ThumbsUp size={20} fill={hasLiked ? 'currentColor' : 'none'} />
                  <span style={{ fontWeight: 700 }}>{likes}</span>
                </button>
                <button 
                  onClick={handleDislike}
                  className="flex-center"
                  style={{ padding: '0.75rem 1.25rem', borderRadius: '12px', background: hasDisliked ? 'rgba(0, 0, 0, 0.1)' : 'var(--color-bg-surface)', border: '1px solid var(--color-glass-border)', transition: '0.2s', color: hasDisliked ? 'var(--color-text-primary)' : 'var(--color-text-secondary)' }}
                >
                  <ThumbsDown size={20} fill={hasDisliked ? 'currentColor' : 'none'} />
                </button>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  onClick={shareWhatsApp}
                  className="flex-center"
                  style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#25D366', color: 'white', border: 'none', transition: '0.2s' }}
                  title="WhatsApp"
                >
                  <Send size={20} />
                </button>
                <button 
                  onClick={shareX}
                  className="flex-center"
                  style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#000', color: 'white', border: 'none', transition: '0.2s' }}
                  title="X (Twitter)"
                >
                  <Share2 size={20} />
                </button>
                <button 
                  onClick={copyLink}
                  className="flex-center"
                  style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--color-bg-surface)', color: 'var(--color-text-primary)', border: '1px solid var(--color-glass-border)', transition: '0.2s' }}
                  title={t('copy_link')}
                >
                  {linkCopied ? <Check size={20} color="var(--color-success)" /> : <Copy size={20} />}
                </button>
              </div>
            </div>

            <button 
              onClick={handleReport}
              className="flex-center"
              style={{ padding: '0.75rem', borderRadius: '12px', background: 'transparent', border: '1px solid var(--color-glass-border)', color: 'var(--color-text-muted)', gap: '0.5rem', fontSize: '0.9rem', transition: '0.2s' }}
            >
              <AlertTriangle size={18} />
              {t('report')}
            </button>
          </div>

          {isReporting && (
            <div className="glass" style={{ padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem', animation: 'fadeIn 0.3s ease-out' }}>
              {!reportSubmitted ? (
                <>
                  <h4 style={{ marginBottom: '0.5rem', fontWeight: 600 }}>{t('report_desc')}</h4>
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button 
                      onClick={submitReport}
                      style={{ padding: '0.5rem 1rem', borderRadius: '8px', background: 'var(--color-primary)', color: 'white', border: 'none', fontWeight: 600 }}
                    >
                      {t('report')}
                    </button>
                    <button 
                      onClick={() => setIsReporting(false)}
                      style={{ padding: '0.5rem 1rem', borderRadius: '8px', background: 'var(--color-bg-surface)', border: '1px solid var(--color-glass-border)', color: 'var(--color-text-primary)' }}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex-center" style={{ gap: '0.5rem', color: 'var(--color-success)' }}>
                  <Check size={20} />
                  <p style={{ fontWeight: 600 }}>{t('report_success')}</p>
                </div>
              )}
            </div>
          )}

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
