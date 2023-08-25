import React from "react";
import { Image, Typography } from "antd";
import { Link } from "react-router-dom";

export interface ProductImageProps {
  id: string | number;
  size: "large" | "small";
  src: string;
  price: number | string;
  title: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({ id, size, src, price, title }) => {
  return (
    <Link to={`details/${id}`}>
      {size === 'large'
        ? (<Image src={src} height={285} width={490} alt="" />)
        : (<Image src={src} height={120} width={240} alt="" />)}
      
      <div>
        <Typography.Text type="secondary">{title.slice(0, 25)}</Typography.Text>
        <Typography.Text type="danger" strong>￥{price}起</Typography.Text>
      </div>
    </Link>
  );
};

//export const ProductImage = withRouter(ProductImageComponent);
