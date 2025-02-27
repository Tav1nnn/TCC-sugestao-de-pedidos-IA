import React from 'react';
import '../styles/LoadingAnimation.css';

function LoadingAnimation() {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Carregando...</p>
    </div>
  );
}

export default LoadingAnimation;