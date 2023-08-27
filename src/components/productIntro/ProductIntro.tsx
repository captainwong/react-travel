import { Typography, Carousel, Image, Rate, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React from "react";
import styles from './ProductIntro.module.css';

interface PropsType {
  title: string;
  description: string;
  price: string | number;
  coupons: string;
  points: string;
  discount: string;
  rating: string | number;
  pictures: string[];
}

interface RowType {
  title: string;
  description: string | number | JSX.Element;
  key: number;
}

const columns: ColumnsType<RowType> = [
  {
    title: "title",
    dataIndex: "title",
    key: "title",
    align: "left",
    width: 120,
  },
  {
    title: "description",
    dataIndex: "description",
    key: "description",
    align: "center",
  },
];

export const ProductIntro: React.FC<PropsType> = (props: PropsType) => {
  const tableDataSource: RowType[] = [
    {
      key: 0,
      title: "路线名称",
      description: props.title
    }, {
      key: 1,
      title: "价格",
      description: (
        <>
          ￥{" "}
          <Typography.Text type="danger" strong>{props.price}</Typography.Text>
        </>
      )
    }, {
      key: 2,
      title: "限时抢购折扣",
      description: props.discount ?
        (<>
          ￥<Typography.Text delete>{props.price}</Typography.Text>
          {" "}
          <Typography.Text type="danger" strong>￥{props.discount}</Typography.Text>
        </>)
        : ("暂无折扣")
    }, {
      key: 3,
      title: "领取优惠",
      description: props.coupons ? props.discount : "无优惠券可领"
    }, {
      key: 4, 
      title: "线路评价",
      description: (<>
        <Rate allowHalf defaultValue={+props.rating} />
        <Typography.Text style={{ marginLeft: 10 }}>
          {props.rating} 星
        </Typography.Text>
      </>)
    }
  ]

  return (
    <div className={styles.container}>
      <Typography.Title level={4}>{props.title}</Typography.Title>
      <Typography.Text>{props.description}</Typography.Text>
      <div className={styles.container}>
        <Typography.Text style={{ marginLeft: 20 }}>
          ￥<span className={styles.strong}>{props.price}</span>{" "} /人起
        </Typography.Text>
        <Typography.Text style={{ marginLeft: 50 }}>
          <span className={styles.strong}>{props.rating}</span>{" "} 分
        </Typography.Text>
      </div>
      <Carousel autoplay slidesToShow={3}>
        {props.pictures.map(p => (
          <Image height={150} src={p} />
        ))}
      </Carousel>
      <Table<RowType>
        columns={columns}
        dataSource={tableDataSource}
        size="small"
        bordered={false}
        pagination={false}
        showHeader={false}
      />

    </div>
  );
}