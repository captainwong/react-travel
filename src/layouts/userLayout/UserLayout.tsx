import React from "react";
import styles from "./UserLayout.module.css";
import logo from '../../assets/logo.svg';
import { Link } from "react-router-dom";
import { CaretDownOutlined } from "@ant-design/icons";
import { Layout, Dropdown, Button } from "antd";
import type { MenuProps } from "antd";
import { useSelector } from "../../redux/hooks";
import { useTranslation } from "react-i18next";
import { Footer } from "../../components";

const { Header, Content } = Layout;

interface PropsType {
  children?: React.ReactNode;
}

export const UserLayout: React.FC<PropsType> = (props) => {
  const { t } = useTranslation();
  const languageList = useSelector((state) => state.language.languageList);

  const langMenuHandler: MenuProps['onClick'] = (e) => {
    if (e.key === 'new') {
      //dispatch(addLanguageActionCreator('Clingon', 'clingon'));
    } else {
      //dispatch(changeLanguageActionCreator(e.key === 'zh' ? 'zh' : 'en'));
    }
  }

  const langMenuProps = {
    items: [
      ...languageList.map(lang => { return { label: lang.name, key: lang.code } }),
    ],
    onClick: langMenuHandler
  };

  return (
    <Layout className={styles['container']}>
      <Header className={styles.header}>
        <div className={styles.lang}>
          <Dropdown menu={langMenuProps} >
            <Button>
              {" "} 选择语言 <CaretDownOutlined />
            </Button>
          </Dropdown>
        </div>
      </Header>
      <Content className={styles.content}>
        <div className={styles.top}>
          <div className={styles['content-header']}>
            <Link to='/'>
              <img alt='logo' className={styles.logo} src={logo} />
              <span className={styles.title}>{t("header.title")}</span>
            </Link>
          </div>
          <div className={styles.desc}>
            慕课网 是我朝最具影响力的 线上课程学习网站
          </div>

          {props.children}
        </div>
      </Content>
      <Footer />
    </Layout>
  );
}
