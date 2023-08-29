import React from "react";
import styles from "./ProductList.module.css";
import { Link } from 'react-router-dom';
import { List, Rate, Space, Image, Tag, Typography } from "antd";
import { LikeOutlined, StarOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface Product {
  departureCity: string;
  description: string;
  discountPresent: number;
  id: string;
  originalPrice: number;
  price: number;
  rating: number;
  title: string;
  touristRoutePictures: any[];
  travelDays: string;
  tripType: string;
}

interface PropsType {
  data: Product[];
  paging: any;
  onPageChange?: (nextPage: any, pageSize: any) => void;
}

const listData = (productList: Product[]) =>
  productList.map((p) => ({
    id: p.id,
    title: p.title,
    descrption: p.description,
    tags: (
      <>
        {p.departureCity && <Tag color="#f50">{p.departureCity}出发</Tag>}
        {p.travelDays && <Tag color="#108ee9">{p.travelDays}天</Tag>}
        {p.discountPresent && <Tag color="#87d068">{p.discountPresent}超低折扣</Tag>}
        {p.tripType && <Tag color="#2db7f5">{p.tripType}</Tag>}
      </>
    ),
    imgSrc: p.touristRoutePictures[0].url,
    price: p.price,
    originalPrice: p.originalPrice,
    discountPresent: p.discountPresent,
    rating: p.rating,
  }));

const IconText = (props: any) => (
  <Space>
    {React.createElement(props.icon)}
    {props.text}
  </Space>
);


export const ProductList: React.FC<PropsType> = ({ data, paging, onPageChange }) => {
  const products = listData(data);
  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        current: paging.currentPage,
        onChange: (page) => onPageChange && onPageChange(page, paging.pageSize),
        pageSize: paging.pageSize,
        total: paging.totalCount,
      }}
      dataSource={products}
      footer={
        <div>
          搜索总路线：<Text strong>{paging.totalCount}</Text>条
        </div>
      }
      renderItem={(item) => (
        <List.Item
          key={item.title}
          actions={[
            <IconText
              icon={StarOutlined}
              text="156"
              key="list-vertical-star-o"
            />,
            <IconText
              icon={LikeOutlined}
              text="156"
              key="list-vertical-like-o"
            />,
            <div>
              <Rate defaultValue={3} />
              <Text strong className="ant-rate-text">
                {item.rating}
              </Text>
            </div>
          ]}
          extra={
            <Image width={272} height={172} alt="extra" src={item.imgSrc} />
          }
        >
          <List.Item.Meta
            title={
              <>
                {
                  item.discountPresent
                    ? (
                      <>
                        <Text style={{ fontSize: 20, fontWeight: 400 }} delete >
                          ￥{item.originalPrice}
                        </Text>
                        <Text type="danger" style={{ fontSize: 20, fontWeight: 400 }}>
                          {" "}￥{item.price}
                        </Text>
                      </>
                    )
                    : (
                      <>
                        <Text style={{ fontSize: 20, fontWeight: 400 }}>
                          ￥{item.price}
                        </Text>
                      </>
                    )
                }
                <Link to={"/detail/" + item.id}>{item.title}</Link>
              </>
            }
            description={item.tags}
          />
          {item.descrption}
        </List.Item>
      )}
    />
  );
}
