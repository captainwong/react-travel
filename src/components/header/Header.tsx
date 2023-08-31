import React, { useState, useEffect } from "react";
import { Layout, Typography, Input, Dropdown, Menu, Button } from 'antd';
import type { MenuProps } from "antd";
import { GlobalOutlined } from '@ant-design/icons';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  addLanguageActionCreator,
  changeLanguageActionCreator
} from "../../redux/language/languageActions";
import { useSelector, useAppDispatch } from "../../redux/hooks";
import styles from './Header.module.css';
import logo from '../../assets/logo.svg';
import jwtDecode, { JwtPayload as BaseJwtPayload } from "jwt-decode";
import { userSlice } from "../../redux/user/slice";

interface JwtPayload extends BaseJwtPayload {
  email: string;
}

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const language = useSelector((state) => state.language.language);
  const languageList = useSelector((state) => state.language.languageList);
  const jwt = useSelector(s => s.user.token);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (jwt) {
      const token = jwtDecode<JwtPayload>(jwt);
      setEmail(token.email);
    }
  }, [jwt]);

  const onSignOut = () => {
    dispatch(userSlice.actions.signOut());
    navigate('/');
  }

  const langMenuHandler: MenuProps['onClick'] = (e) => {
    if (e.key === 'new') {
      dispatch(addLanguageActionCreator('Clingon', 'clingon'));
    } else {
      dispatch(changeLanguageActionCreator(e.key === 'zh' ? 'zh' : 'en'));
    }
  }

  const langMenuProps = {
    items: [
      ...languageList.map(lang => { return { label: lang.name, key: lang.code } }),
      { label: t("header.add_new_language"), key: 'new' },
    ],
    onClick: langMenuHandler
  };

  const mainMenuItems = [
    { key: "1", label: t("header.home_page") },
    { key: "2", label: t("header.weekend") },
    { key: "3", label: t("header.group") },
    { key: "4", label: t("header.backpack") },
    { key: "5", label: t("header.private") },
    { key: "6", label: t("header.cruise") },
    { key: "7", label: t("header.hotel") },
    { key: "8", label: t("header.local") },
    { key: "9", label: t("header.theme") },
    { key: "10", label: t("header.custom") },
    { key: "11", label: t("header.study") },
    { key: "12", label: t("header.visa") },
    { key: "13", label: t("header.enterprise") },
    { key: "14", label: t("header.high_end") },
    { key: "15", label: t("header.outdoor") },
    { key: "16", label: t("header.insurance") },
  ];

  return (
    <div className={styles['app-header']} >
      {/* top-header */}
      <div className={styles['top-header']}>
        <div className={styles.inner}>
          <Typography.Text>{t("header.slogan")}</Typography.Text>
          <Dropdown.Button className={styles['lang-menu']}
            style={{ marginLeft: 15 }}
            menu={langMenuProps}
            icon={<GlobalOutlined />}
          >
            {language === 'zh' ? '中文' : 'English'}
          </Dropdown.Button>

          {
            jwt ? (
              <Button.Group className={styles['button-group']}>
                <span className={styles.email}>
                  {t("header.welcome")}
                  <Typography.Text strong>{email}</Typography.Text>
                </span>
                <Button onClick={() => { navigate('/shoppingCart') }}>{t("header.shopping_cart")}</Button>
                <Button onClick={onSignOut}>{t("header.sign_out")}</Button>
              </Button.Group>
            ) : (
              <Button.Group className={styles['button-group']}>
                <Button onClick={() => navigate('/signup')}>{t("header.register")}</Button>
                <Button onClick={() => navigate('/signin')}>{t("header.signin")}</Button>
              </Button.Group>
            )
          }

        </div>
      </div>

      {/* header */}
      <Layout.Header className={styles['main-header']}>
        <span onClick={() => navigate('/')} >
          <img src={logo} alt="logo" className={styles['App-logo']} />
          <Typography.Title level={3} className={styles['title']}>{t("header.title")}</Typography.Title>
        </span>

        <Input.Search
          placeholder={t("header.search_placeholder")}
          className={styles['search-input']}
          onSearch={(keyword) => navigate("/search/" + keyword)}
        ></Input.Search>
      </Layout.Header>

      <Menu mode={"horizontal"} className={styles['main-menu']} items={mainMenuItems}></Menu>

    </div >
  );
}