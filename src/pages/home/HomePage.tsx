import React from "react";
import { Row, Col, Typography, Spin } from 'antd';
import styles from './HomePage.module.css';
import { Header, Footer, SideMenu, Carousel, ProductCollection, BusinessPartner } from '../../components';
import sideImage1 from '../../assets/images/sider_2019_12-09.png';
import sideImage2 from '../../assets/images/sider_2019_02-04.png';
import sideImage3 from '../../assets/images/sider_2019_02-04-2.png';
import { withTranslation, WithTranslation } from "react-i18next";
import axios from 'axios';
import {
  RecommendProductsActionTypes,
  fetchRecommendProductsActionStartCreator,
  fetchRecommendProductsSuccessActionCreator,
  fetchRecommendProductsFailActionCreator,
} from "../../redux/recommendProducts/recommendProductsActions";
import { connect } from "react-redux";
import { RootState } from "../../redux/store";
import { Dispatch } from "redux";



const mapStateToProps = (state: RootState) => {
  return {
    loading: state.recommendProducts.loading,
    error: state.recommendProducts.error,
    producList: state.recommendProducts.productList,
  };
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    fetchStart: () => {
      dispatch(fetchRecommendProductsActionStartCreator());
    },
    fetchSuccess: (data: any) => {
      dispatch(fetchRecommendProductsSuccessActionCreator(data));
    },
    fetchFail: (error: any) => {
      dispatch(fetchRecommendProductsFailActionCreator(error));
    }
  }
}

type PropsType = WithTranslation
  & ReturnType<typeof mapStateToProps>
  & ReturnType<typeof mapDispatchToProps>
  ;

class HomePageComponent extends React.Component<PropsType> {
  async componentDidMount() {
    this.props.fetchStart();
    try {
      const { data } = await axios.get('http://192.168.50.162:3001/api/productCollections');
      console.log(data);
      this.props.fetchSuccess(data);
    } catch (e) {
      console.log(e);
      if (e instanceof Error) {
        this.props.fetchFail(e.message);
      }
    }
  }

  render() {
    const { t, producList, loading, error } = this.props;

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
        <div className={styles['page-content']}>
          <Row style={{ marginTop: 20 }}>
            <Col span={6}>
              {/* <div style={{ background: "red" }}>multi-menu</div> */}
              <SideMenu />
            </Col>
            <Col span={18}>
              <Carousel />
            </Col>
          </Row>

          <ProductCollection title={
            <Typography.Title level={3} type="warning">
              {t("home_page.hot_recommended")}
            </Typography.Title>
          }
            sideImage={sideImage1}
            products={producList[0].touristRoutes}
          />

          <ProductCollection title={
            <Typography.Title level={3} type="danger">
              {t("home_page.new_arrival")}
            </Typography.Title>
          }
            sideImage={sideImage2}
            products={producList[1].touristRoutes}
          />

          <ProductCollection title={
            <Typography.Title level={3} type="success">
              {t("home_page.domestic_travel")}
            </Typography.Title>
          }
            sideImage={sideImage3}
            products={producList[2].touristRoutes}
          />

        </div>
      
        <BusinessPartner />
        <Footer />

      </>
    );
  }
}

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(
  withTranslation()(HomePageComponent)
);
