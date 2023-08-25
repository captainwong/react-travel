import React from "react";
import { Divider, Row, Col, Typography } from "antd";
import styles from './BusinessPartner.module.css';
import microsoft from '../../assets/images/microsoft-80658_640.png';
import youtube from '../../assets/images/icon-720944_640.png';
import facebook from '../../assets/images/facebook-807588_640.png';
import instagram from '../../assets/images/follow-826033_640.png';

export const BusinessPartner: React.FC = () => {
  return (
    <div className={styles.content}>
      <Divider orientation="left">
        <Typography.Title level={3}>Business Partners</Typography.Title>
      </Divider>
      <Row>
        <Col span={6}>
          <img src={microsoft} className={styles.img} alt='business-partner' />
        </Col>
        <Col span={6}>
          <img src={youtube} className={styles.img} alt='business-partner' />
        </Col>
        <Col span={6}>
          <img src={facebook} className={styles.img} alt='business-partner' />
        </Col>
        <Col span={6}>
          <img src={instagram} className={styles.img} alt='business-partner' />
        </Col>

      </Row>
    </div>
  );
}