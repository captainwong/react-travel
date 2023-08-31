import React from "react";
import styles from "./PaymentCard.module.css";
import { Card, Button, Typography, Table, Skeleton } from "antd";
import { DeleteOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";

const { Meta } = Card;
const { Title, Text } = Typography;

interface Item {
  key: number;
  item: string;
  amount: string | number | JSX.Element;
}

const columns: ColumnsType<Item> = [
  {
    title: '项目',
    dataIndex: 'item',
    key: 'item',
  },
  {
    title: '金额',
    dataIndex: 'amount',
    key: 'amount',
  }
];

interface PropsType {
  loading: boolean;
  originalPrice: number;
  price: number;
  onShppingCartClear: () => void;
  onCheckout: () => void;
}

export const PaymentCard: React.FC<PropsType> = (props) => {
  const paymentData: Item[] = [
    {
      key: 1,
      item: '原价',
      amount: <Text delete>￥{props.originalPrice}</Text>
    },
    {
      key: 2,
      item: '现价',
      amount: <Title type="danger" level={2}>￥{props.price}</Title>
    },
  ];

  return (
    <Card
      className={styles.card}
      actions={[
        <Button type="primary" danger onClick={props.onCheckout} loading={props.loading}>
          <CheckCircleOutlined />
          下单支付
        </Button>,
        <Button onClick={props.onShppingCartClear} loading={props.loading}>
          <DeleteOutlined />
          清空
        </Button>
      ]}
    >
      <Skeleton loading={props.loading} active>
        <Meta
          title={<Title level={2}>总计</Title>}
          description={
            <Table<Item>
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
