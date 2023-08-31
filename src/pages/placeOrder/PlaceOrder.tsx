import React from "react";
import styles from "./PlaceOrder.module.css";
import { PaymentForm, CheckoutCard } from "../../components";
import { MainLayout } from "../../layouts";
import { Row, Col } from "antd";
import { useSelector, useAppDispatch } from "../../redux/hooks";


export const PlaceOrderPage : React.FC = () => {
  return (
    <MainLayout>
      <Row>
        <Col span={12}>
          <PaymentForm />
        </Col>
        <Col span={12}>
          
        </Col>
      </Row>
    </MainLayout>
  );
}
