import React, { useEffect } from "react";
import styles from "./SearchPage.module.css";
import { Header, Footer, FilterArea, ProductList } from "../../components";
import { useParams, useLocation } from "react-router-dom";
import { Spin } from "antd";
import { searchProducts } from "../../redux/searchProducts/slice";
import { useSelector, useAppDispatch } from "../../redux/hooks";

type MatchParams = {
  keywords: string;
}

export const SearchPage: React.FC = () => {
  const { keywords } = useParams<MatchParams>();

  const loading = useSelector(state => state.searchProducts.loading);
  const error = useSelector(state => state.searchProducts.error);
  const pagination = useSelector(state => state.searchProducts.pagination);
  const products = useSelector(state => state.searchProducts.data);

  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(searchProducts({ nextPage: 1, pageSize: 10, keywords: keywords }));
  }, [location]);

  const onPageChange = (nextPage : string | number, pageSize : string | number) => {
    dispatch(searchProducts({ nextPage: nextPage, pageSize: pageSize, keywords: keywords }));
  }

  if (loading) {
    return (
      <Spin
        size="large"
        style={{
          marginTop: 200,
          marginBottom: 200,
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%",
        }}
      />
    );
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <>
      <Header />

      <div className={styles.content}>
        {/* 分类过滤器 */}
        <div className={styles['product-list-container']}>
          <FilterArea />
        </div>

        {/* 产品列表 */}
        <div className={styles['product-list-container']}>
          <ProductList data={products} paging={pagination} onPageChange={onPageChange} />
        </div>
      </div>

      <Footer />
    </>
  );
}
