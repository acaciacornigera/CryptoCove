import React, { lazy, Suspense } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';

import { Navbar } from './components';
import './App.css';

const Homepage = lazy(() => import('./components/Homepage'));
const Cryptocurrencies = lazy(() => import('./components/Cryptocurrencies'));
const CryptoDetails = lazy(() => import('./components/CryptoDetails'));
const Exchanges = lazy(() => import('./components/Exchanges'));
const News = lazy(() => import('./components/News'));

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by error boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong.</div>;
    }

    return this.props.children;
  }
}

const App = () => (
  <div className="app">
    <div className="navbar">
      <Navbar />
    </div>
    <div className="main">
      <Layout>
        <div className="routes">
          <Suspense fallback={<div>Loading...</div>}>
            <ErrorBoundary>
              <Routes>
                <Route exact path="/" element={<Homepage />} />
                <Route exact path="/cryptocurrencies" element={<Cryptocurrencies />} />
                <Route exact path="/crypto/:coinId" element={<CryptoDetails />} />
                <Route exact path="/exchanges" element={<Exchanges />} />
                <Route exact path="/news" element={<News />} />
              </Routes>
            </ErrorBoundary>
          </Suspense>
        </div>
      </Layout>
      <div className="footer">
        <Typography.Title level={5}
          style={{ color: 'white', textAlign: 'center' }}
        >©2023
          <Link to="/"> CryptoFeeder</Link> - All Rights Reserved
          <br />
          Stats and News powered by Coinranking, CoinGecko and crypto-news.com APIs, integrated via rapidapi.com
        </Typography.Title>
      </div>
    </div>
  </div>
);

export default App;
