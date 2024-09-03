import React from 'react';
import { DefaultLayout } from "../layouts/Default";
import { Row, Col, Card, Typography } from 'antd';

const { Title } = Typography;

const Home = () => {
  return (
    <DefaultLayout>
      <div>
        <Title level={2}>Dashboard</Title>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Card title="Favorite Contacts" bordered={false}>
              {/* Add content for favorite contacts here */}
              <p>Number of favorite contacts: 5</p>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card title="Recently Added Contacts" bordered={false}>
              {/* Add content for recently added contacts here */}
              <p>Number of recently added contacts: 10</p>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card title="Total Contacts" bordered={false}>
              {/* Add content for total contacts here */}
              <p>Total number of contacts: 50</p>
            </Card>
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
          <Col xs={24} sm={12} md={8}>
            <Card title="Contacts with No Tags" bordered={false}>
              {/* Add content for contacts with no tags here */}
              <p>Number of contacts without tags: 8</p>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card title="Contacts with Multiple Phone Numbers" bordered={false}>
              {/* Add content for contacts with multiple phone numbers here */}
              <p>Number of contacts with multiple phone numbers: 12</p>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card title="Unverified Emails" bordered={false}>
              {/* Add content for unverified emails here */}
              <p>Number of contacts with unverified emails: 4</p>
            </Card>
          </Col>
        </Row>
      </div>
    </DefaultLayout>
  );
}

export default Home;
