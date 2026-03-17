import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Store, Flame, MapPin, Upload, ChevronRight, Sparkles, Globe, Map as MapIcon, Grid } from 'lucide-react';
import './App.css';

import { mockOffers } from './data/mockOffers';
import OfferCard from './components/OfferCard';
import OfferModal from './components/OfferModal';
import AdminUpload from './components/AdminUpload';
import OffersMap from './components/OffersMap';
import { useLanguage } from './context/LanguageContext';

// Haversine formula to calculate distance between two coordinates in kilometers
function calculateDistance(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return Infinity;
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
  return R * c;
}

function App() {
  const { lang, toggleLanguage, t } = useLanguage();
  const [offers, setOffers] = useState(mockOffers);
  const [activeTab, setActiveTab] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'map'
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    }
  }, []);

  const handleAddOffer = (newOffer) => {
    setOffers([newOffer, ...offers]);
  };

  const baseFilteredOffers = activeTab === 'All' 
    ? offers 
    : offers.filter(offer => offer.status === activeTab);

  const filteredOffers = React.useMemo(() => {
    if (!userLocation) return baseFilteredOffers;
    
    return baseFilteredOffers.map(offer => {
      const distance = calculateDistance(userLocation.lat, userLocation.lng, offer.coordinates?.lat, offer.coordinates?.lng);
      return { ...offer, distance };
    }).sort((a, b) => a.distance - b.distance);
  }, [baseFilteredOffers, userLocation]);

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="glass" style={{ width: '280px', padding: '2rem', borderLeft: 'none', borderTop: 'none', borderBottom: 'none', borderRadius: '0', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div className="flex-center" style={{ justifyContent: 'space-between' }}>
          <div className="flex-center" style={{ gap: '1rem' }}>
            <div className="flex-center pulse" style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--color-primary)', boxShadow: '0 4px 15px rgba(255, 71, 87, 0.4)' }}>
              <Store size={24} color="white" />
            </div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>DineDash</h1>
          </div>
          <button onClick={toggleLanguage} style={{ padding: '0.5rem', background: 'var(--color-bg-surface)', borderRadius: '8px', color: 'var(--color-text-secondary)', transition: '0.2s', display: 'flex', alignItems: 'center', gap: '0.5rem' }} title="Toggle Language">
            <Globe size={16} />
            <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{lang === 'en' ? 'عربي' : 'EN'}</span>
          </button>
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {[
            { id: 'All', icon: <LayoutDashboard size={20} />, label: t('dashboard') },
            { id: 'Newest', icon: <Sparkles size={20} color={activeTab === 'Newest' ? 'white' : 'var(--color-text-secondary)'} />, label: t('newest') },
            { id: 'Nearby', icon: <MapPin size={20} color={activeTab === 'Nearby' ? 'white' : 'var(--color-text-secondary)'} />, label: t('nearby_offers') },
            { id: 'Ending Soon', icon: <Flame size={20} color={activeTab === 'Ending Soon' ? 'var(--color-warning)' : 'var(--color-text-secondary)'} />, label: t('ending_soon') }
          ].map(item => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="flex-center" 
              style={{ 
                justifyContent: 'space-between', 
                padding: '1rem', 
                borderRadius: '12px', 
                background: activeTab === item.id ? 'var(--color-bg-surface-hover)' : 'transparent',
                color: activeTab === item.id ? 'white' : 'var(--color-text-secondary)',
                fontWeight: activeTab === item.id ? 600 : 500,
                transition: '0.2s',
                width: '100%'
              }}
            >
              <div className="flex-center" style={{ gap: '1rem' }}>
                {item.icon}
                <span className={item.id === 'All' && activeTab === 'All' ? 'text-gradient' : ''}>{item.label}</span>
              </div>
              {activeTab === item.id && <ChevronRight size={16} style={{ transform: lang === 'ar' ? 'rotate(180deg)' : 'none' }} />}
            </button>
          ))}
        </nav>
        
        <div style={{ marginTop: 'auto' }}>
          <button 
            onClick={() => setIsUploadOpen(true)}
            className="flex-center glass" 
            style={{ 
              width: '100%', 
              gap: '0.5rem', 
              padding: '1rem', 
              borderRadius: '12px', 
              border: '1px solid var(--color-primary)', 
              color: 'var(--color-primary)', 
              fontWeight: 600, 
              transition: '0.2s', 
              boxShadow: '0 4px 15px rgba(255, 71, 87, 0.1)',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(255, 71, 87, 0.1)'}
            onMouseLeave={(e) => e.target.style.background = 'transparent'}
          >
            <Upload size={20} />
            {t('upload_flyer')}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <header className="dashboard-header" style={{ marginBottom: '1rem' }}>
          <div>
            <h2 className="dashboard-title">{t('discover_offers')} <span className="text-gradient">{t('offers_highlight')}</span></h2>
            <p className="dashboard-subtitle">{t('subtitle')}</p>
          </div>
          <div className="flex-center" style={{ gap: '1rem' }}>
            <div className="glass flex-center" style={{ padding: '0.4rem', borderRadius: '100px', display: 'flex', gap: '0.25rem' }}>
              <button 
                onClick={() => setViewMode('grid')}
                style={{ padding: '0.4rem 1rem', borderRadius: '100px', background: viewMode === 'grid' ? 'var(--color-primary)' : 'transparent', color: viewMode === 'grid' ? 'white' : 'var(--color-text-secondary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', transition: '0.2s' }}
              >
                <Grid size={16} />
                <span style={{ fontSize: '0.8rem' }}>Grid</span>
              </button>
              <button 
                onClick={() => setViewMode('map')}
                style={{ padding: '0.4rem 1rem', borderRadius: '100px', background: viewMode === 'map' ? 'var(--color-primary)' : 'transparent', color: viewMode === 'map' ? 'white' : 'var(--color-text-secondary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', transition: '0.2s' }}
              >
                <MapIcon size={16} />
                <span style={{ fontSize: '0.8rem' }}>Map</span>
              </button>
            </div>
            
            <div className="glass flex-center" style={{ padding: '0.5rem 1.5rem', borderRadius: '100px', gap: '0.5rem', height: 'fit-content' }}>
              <div className="pulse" style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-success)', boxShadow: '0 0 10px var(--color-success)' }}></div>
              <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>{t('agent_online')}</span>
            </div>
          </div>
        </header>

        {filteredOffers.length === 0 ? (
          <div className="flex-center glass" style={{ padding: '4rem', borderRadius: '16px', flexDirection: 'column', color: 'var(--color-text-muted)', marginTop: '2rem' }}>
            <MapPin size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{t('no_offers')} "{t(activeTab.toLowerCase().replace(' ', '_')) || activeTab}"</h3>
            <p>{t('try_exploring')}</p>
          </div>
        ) : (
          <div style={{ flex: 1, minHeight: 0, marginTop: '1rem', display: 'flex', flexDirection: 'column' }}>
            {viewMode === 'grid' ? (
              <div 
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
                  gap: '2rem',
                  animation: 'fadeIn 0.5s ease-out forwards'
                }}
              >
                {filteredOffers.map((offer, index) => (
                  <div key={offer.id} style={{ animation: `slideUp 0.4s ease-out forwards`, animationDelay: `${index * 0.1}s`, opacity: 0 }}>
                    <OfferCard offer={offer} onViewDetails={setSelectedOffer} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="glass" style={{ flex: 1, minHeight: '600px', display: 'flex', flexDirection: 'column', borderRadius: '16px', overflow: 'hidden', animation: 'fadeIn 0.5s ease-out forwards' }}>
                <OffersMap offers={filteredOffers} onMarkerClick={setSelectedOffer} userLocation={userLocation} />
              </div>
            )}
          </div>
        )}
      </main>

      <OfferModal offer={selectedOffer} onClose={() => setSelectedOffer(null)} />
      {isUploadOpen && <AdminUpload onClose={() => setIsUploadOpen(false)} onOfferAdded={handleAddOffer} />}
    </div>
  );
}

export default App;
