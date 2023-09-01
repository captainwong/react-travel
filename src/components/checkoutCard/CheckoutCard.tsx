import React from "react";
import styles from "./CheckoutCard.module.css";
import { Skeleton, Card, Button, Typography, Table } from "antd";
import { CheckCircleOutlined, HomeOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;
const { Title, Text } = Typography;

interface OrderItem {
  key: number;
  item: string;
  price: string | number | JSX.Element;
}

const columns: ColumnsType<OrderItem> = [
  {
    title: "产品",
    dataIndex: "item",
    key: "item",
  },
  {
    title: "价格",
    dataIndex: "price",
    key: "price",
  },
];

interface PropsType {
  loading: boolean;
  order: any;
  onCheckout: () => void;
}

export const CheckoutCard: React.FC<PropsType> = (props) => {
  const navigate = useNavigate();

  const paymentData: OrderItem[] = props.order
    ? props.order.orderItems.map((i: any, index: any) => ({
      key: index,
      item: i.touristRoute.title,
      price: (
        <>
          <Text delete>￥{i.touristRoute.originalPrice}</Text> {" "}
          <Text type="danger" strong>
            ￥{i.touristRoute.originalPrice * i.touristRoute.discountPersent}
          </Text>
        </>
      )
    }))
    : [];


  return (
    <Card
      className={styles.card}
      actions={[
        props.order && props.order.state === 'Completed' 
          ? (
            <Button type="primary" onClick={() => { navigate('/'); }} loading={props.loading}>
              <HomeOutlined />
              回到首页
            </Button>
          )
          : (
            <Button type="primary" danger onClick={props.onCheckout} loading={props.loading}>
              <CheckCircleOutlined />
              支付
            </Button>
        )
      ]}
    >
      <Skeleton loading={props.loading} active>
        <Meta
          title={
            <Title level={2}>
              {props.order && props.order.state === 'Completed' ? '支付成功' : '总计'}
            </Title>
          }
          description={
            <Table<OrderItem>
              columns={columns}
              dataSource={paymentData}
              showHeader={false}
              size="small"
              bordered={false}
              pagination={false}
            />
          }
        />
      </Skeleton>
    </Card>
  );
}
