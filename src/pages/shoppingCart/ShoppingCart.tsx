import React from "react";
import styles from "./ShoppingCart.module.css";
import { MainLayout } from "../../layouts";
import { Row, Col, Affix } from "antd";
import { ProductList, PaymentCard } from "../../components";
import { useSelector, useAppDispatch } from "../../redux/hooks";
import { removeShoppingCartItems } from "../../redux/shoppingCart/slice";

export const ShoppingCartPage: React.FC = () => {
  const loading = useSelector(s => s.shoppingCart.loading);
  const jwt = useSelector(s => s.user.token) as string;
  const shoppingCartItems = useSelector(s => s.shoppingCart.items);
  const dispatch = useAppDispatch();

  return (
    <MainLayout>
      <Row>
        {/* 购物车 */}
        <Col span={16}>
          <div className={styles.container}>
            <ProductList data={shoppingCartItems.map(item=>item.touristRoute)}/>
          </div>
        </Col>

        {/* 支付卡 */}
        <Col span={8}>
          <Affix>
            <div className={styles.payment}>
              <PaymentCard
                loading={loading}
                originalPrice={
                  shoppingCartItems.map(item => item.originalPrice).reduce((a, b) => { return a + b; }, 0)
                }
                price={
                  shoppingCartItems.map(item => item.price * (item.discountPresent ? item.discountPresent : 1)).reduce((a, b) => { return a + b; }, 0)
                }
                onCheckout={() => {
                  
                }}
                onShppingCartClear={() => {
                  dispatch(removeShoppingCartItems({token: jwt, ids: shoppingCartItems.map(item=>item.id)}));
                }}
              />
            </div>
          </Affix>
        </Col>

      </Row>
    </MainLayout>
  );
}
