import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="min-h-screen bg-gray-50">
        <Header />
        <main>{children}</main>
        <Footer />
    </div>
);

export default Layout;
