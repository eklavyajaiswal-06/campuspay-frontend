import React, { useState, useEffect } from 'react';
import './InstallPWA.css';

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showButton,     setShowButton]     = useState(false);
  const [installed,      setInstalled]      = useState(false);
  const [showBanner,     setShowBanner]     = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setInstalled(true);
      return;
    }

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowButton(true);
      // Show banner after 3 seconds
      setTimeout(() => setShowBanner(true), 3000);
    };

    window.addEventListener('beforeinstallprompt', handler);

    window.addEventListener('appinstalled', () => {
      setInstalled(true);
      setShowButton(false);
      setShowBanner(false);
    });

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setInstalled(true);
      setShowButton(false);
      setShowBanner(false);
    }
    setDeferredPrompt(null);
  };

  if (installed || !showButton) return null;

  return (
    <>
      {/* Floating install banner */}
      {showBanner && (
        <div className="pwa-banner">
          <div className="pwa-banner-left">
            <img src="/campuspay_logo.png" alt="CampusPay" className="pwa-banner-logo" />
            <div>
              <p className="pwa-banner-title">Install CampusPay</p>
              <p className="pwa-banner-sub">Add to home screen for quick access</p>
            </div>
          </div>
          <div className="pwa-banner-actions">
            <button className="pwa-banner-dismiss" onClick={() => setShowBanner(false)}>Later</button>
            <button className="pwa-banner-install" onClick={handleInstall}>Install</button>
          </div>
        </div>
      )}
    </>
  );
}

// Also export a standalone install button for navbar/settings
export function InstallButton({ className }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [show,           setShow]           = useState(false);

  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches) return;
    const handler = (e) => { e.preventDefault(); setDeferredPrompt(e); setShow(true); };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  if (!show) return null;

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setShow(false);
  };

  return (
    <button className={`pwa-install-btn ${className || ''}`} onClick={handleInstall}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
      Install App
    </button>
  );
}
