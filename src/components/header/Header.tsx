import React from "react";
import { Layout, Typography, Input, Dropdown, Menu, Button } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import styles from './Header.module.css';
import logo from '../../assets/logo.svg';

export const Header: React.FC = () => {

  const items = [
    { key: "1", label: "中文" },
    { key: "2", label: 'English' },
  ];

  const mainMenuItems = [
    { key: "1", label: "旅游首页" },
    { key: "2", label: "周末游" },
    { key: "3", label: "跟团游" },
    { key: "4", label: "自由行" },
    { key: "5", label: "私家团" },
    { key: "6", label: "邮轮" },
    { key: "7", label: "酒店+景点" },
    { key: "8", label: "当地玩乐" },
    { key: "9", label: "主题游" },
    { key: "10", label: "定制游" },
    { key: "11", label: "游学" },
    { key: "12", label: "签证" },
    { key: "13", label: "企业游" },
    { key: "14", label: "高端游" },
    { key: "15", label: "爱玩户外" },
    { key: "16", label: "保险" },
  ];

  const navigate = useNavigate();

  return (
    <div className={styles['app-header']} >
      {/* top-header */}
      <div className={styles['top-header']}>
        <div className={styles.inner}>
          <Typography.Text>Make travel happier</Typography.Text>
          <Dropdown.Button className={styles['lang-menu']}
            style={{ marginLeft: 15 }}
            menu={{ items }}
            icon={<GlobalOutlined />}
          >
            Language
          </Dropdown.Button>
          <Button.Group className={styles['button-group']}>
            <Button onClick={() => navigate('/signup')}>Sign Up</Button>
            <Button onClick={() => navigate('/signin')}>Sign In</Button>
          </Button.Group>
        </div>
      </div>

      {/* header */}
      <Layout.Header className={styles['main-header']}>
        <span onClick={() => navigate('/')} >
          <img src={logo} alt="logo" className={styles['App-logo']} />
          <Typography.Title level={3} className={styles['title']}>React Travel</Typography.Title>
        </span>

        <Input.Search placeholder='Please input destination, theme or keyword' className={styles['search-input']}></Input.Search>
      </Layout.Header>

      <Menu mode={"horizontal"} className={styles['main-menu']} items={mainMenuItems}></Menu>

    </div >
  );
}