import React from 'react';
import millify from 'millify';
import numeral from 'numeral';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';

import { useGetCryptosQuery } from '../services/cryptoApi';
import Cryptocurrencies from './Cryptocurrencies';
import News from './News';
import Loader from './Loader';

const { Title } = Typography;

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  const { xs } = useBreakpoint();

  if (isFetching) return <Loader />;

  return (
    <>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row gutter={[32, 32]}>
        <Col span={12}>
          <Statistic
            title="Total number of Cryptocurrencies"
            value={globalStats?.total}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total number of Exchanges"
            value={millify(globalStats?.totalExchanges)}
          />
        </Col>

        {/* Show on large screens */}
        {!xs && (
        <Col span={12}>
          <Statistic
            title="Total Current Market Cap"
            value={`${numeral((globalStats?.totalMarketCap)).format('$0,0')} ($${millify(globalStats?.totalMarketCap)})`}
          />
        </Col>
        )}
        {!xs && (
        <Col span={12}>
          <Statistic
            title="Total 24h Volume"
            value={`${numeral((globalStats?.total24hVolume)).format('$0,0')} ($${millify(globalStats?.total24hVolume)})`}
          />
        </Col>
        )}
        
        {/* Show on small screens */}
        {xs && (
          <Col span={12}>
            <Statistic
              title="Total Market Cap"
              value={`$${millify(globalStats?.totalMarketCap)}`}
            />
          </Col>
          )}
          {xs && (
          <Col span={12}>
            <Statistic
              title="Total 24h Volume"
              value={`$${millify(globalStats?.total24hVolume)}`}
            />
          </Col>
          )}

        {/* <Col span={12}>
          <Statistic
            title="Total Markets"
            value={millify(globalStats?.totalMarkets)}
           />
        </Col> */}
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top Cryptos in the World
        </Title>
        <Title level={3} className="show-more">
          <Link to="/cryptocurrencies">Show More</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Crypto News
        </Title>
        <Title level={3} className="show-more">
          <Link to="/news">Show More</Link>
        </Title>
      </div>
      <News simplified />
    </>
  );
};

export default Homepage;
