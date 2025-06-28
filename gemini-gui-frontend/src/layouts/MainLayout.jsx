import React from 'react';

const MainLayout = ({ children }) => (
  <div className="main-layout" style={{ minHeight: '100vh', width: '100vw', boxSizing: 'border-box', overflowX: 'hidden' }}>
    <main className="main-content" style={{ flex: 1, width: '100%', maxWidth: '100vw', boxSizing: 'border-box', display: 'flex', flexDirection: 'column-reverse', alignItems: 'center', justifyContent: 'flex-end', padding: '2rem 1rem 1rem 1rem' }}>
      {children}
    </main>
    <footer className="footer" style={{ width: '100%' }}>
      <span>© 2025 Gemini GUI</span>
    </footer>
  </div>
);

export default MainLayout;
