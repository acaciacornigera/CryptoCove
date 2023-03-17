import React from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import HTMLReactParser from 'html-react-parser';

import { useGetExchangesQuery } from '../services/exchangesApi';

import Loader from './Loader';

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data: exchangesData, isFetching } = useGetExchangesQuery();

  if (isFetching) return <Loader />;

  if (!exchangesData) {
    return <div>Unable to fetch exchanges data</div>;
  }

  return (
    <>
      <Row style={{ textAlign: 'center', fontWeight: 'bold' }}>
        <Col span={6}>Exchanges<br />
          <a href='https://www.coingecko.com/en/methodology' target={'blank'}
            style={{ fontWeight: 'normal' }}>
            (sorted by CoinGecko Trust Score)
          </a>
        </Col>
        <Col span={6}>24h Trade Volume<br /><span style={{ fontWeight: 'normal' }}>(unit in BTC)</span></Col>
        <Col span={6}>Establishment year</Col>
        <Col span={6}>Website<br /><span style={{ fontWeight: 'normal' }}>(click on it)</span></Col>
      </Row>
      <Row style={{ marginTop: '1rem' }}>
        {exchangesData.map((exchange) => (
          <Col span={24}>
            <Collapse>
              <Panel
                key={exchange.name}
                showArrow={false}
                header={(
                  <Row key={exchange.name}>
                    <Col span={6}>
                      <Text><strong>{exchange.trust_score_rank}.</strong></Text>
                      <Avatar className="exchange-image" src={exchange.image} />
                      <Text><strong>{exchange.name}</strong></Text>
                    </Col>
                    <Col span={6} style={{ textAlign: 'center' }}>{millify(exchange.trade_volume_24h_btc)}</Col>

                    <Col span={6} style={{ textAlign: 'center' }}>
                      {exchange.year_established}
                    </Col>

                    <Col span={6} style={{ textAlign: 'center' }}>
                      <a href={exchange.url} target={'blank'}>
                        {exchange.name}
                      </a>
                    </Col>
                  </Row>
                )}
              >
                {HTMLReactParser(exchange.description || 'No description from the provider')}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;
