import React from 'react';
import { Row, Col, Card, Typography } from 'antd';
import moment from 'moment';

import { useGetNewsQuery } from '../services/newsApi';
import Loader from './Loader';

const { Title, Text } = Typography;

const News = () => {
  const { data: newsData, isFetching } = useGetNewsQuery();

  if (isFetching) return <Loader />;

  if (!newsData) {
    return <div>Unable to fetch news data</div>;
  }

  return (
    <Row gutter={[24, 24]}>
      {newsData.map((article) => (
        <Col xs={24} sm={12} lg={8} key={article.id}>
          <Card hoverable className="news-card">
            <a href={article.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>{article.title}</Title>
                {/* <img src={article.thumbnail} alt={article.title} /> */}
              </div>
              <p>{article.description}</p>
              <div className="provider-container">
                {/* <div>
                  <Avatar src={article.source_info.img} alt={article.source_info.name} />
                  <Text className="provider-name">{article.source_info.name}</Text>
                </div> */}
                <Text>{moment(article.date).format('ddd, DD MMM YYYY [at] h:mm:ss a')}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
