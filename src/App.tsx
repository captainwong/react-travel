import React from 'react';
import logo from './logo.svg';
import styles from './App.module.css';
import { Layout, Typography, Input, Dropdown, Menu, Button } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';

function App() {
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

  return (
    <div className={styles.App}>

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
            <Button>Sign Up</Button>
            <Button>Sign In</Button>
          </Button.Group>
        </div>
      </div>

      {/* header */}
      <div className={styles['app-header']}>
        <Layout.Header className={styles['main-header']}>
          <img src={logo} alt="logo" className={styles['App-logo']} />
          <Typography.Title level={3} className={styles['title']}>React Travel</Typography.Title>
          <Input.Search placeholder='Please input destination, theme or keyword' className={styles['search-input']}></Input.Search>
        </Layout.Header>
        <Menu mode={"horizontal"} className={styles['main-menu']} items={mainMenuItems}></Menu>
      </div>

      {/* footer */}
      <Layout.Footer>
        <Typography.Title level={3} style={{ textAlign: 'center' }}>
          Copyright @ React Travel
        </Typography.Title>
      </Layout.Footer>


    </div>
  );
}

export default App;
