import React from "react";
import { Layout, Typography, Input, Dropdown, Menu, Button } from 'antd';
import type { MenuProps } from "antd";
import { GlobalOutlined } from '@ant-design/icons';
import { withRouter, RouteComponentProps } from "../../helpers/withRouter";
import styles from './Header.module.css';
import logo from '../../assets/logo.svg';
import store from "../../redux/store";
import { LanguageState } from "../../redux/languageReducer";

interface HeaderState extends LanguageState {

}

class HeaderComponent extends React.Component<RouteComponentProps, HeaderState> {
  constructor(props : RouteComponentProps) {
    super(props);
    const storeState = store.getState();
    this.state = {
      language: storeState.language,
      languageList: storeState.languageList,
    };
    store.subscribe(this.langChangedHandler);
  }

  langChangedHandler = () => {
    const storeState = store.getState();
    this.setState({
      language: storeState.language,
      languageList: storeState.languageList,
    });
  }

  langMenuHandler: MenuProps['onClick'] = (e) => {
    if (e.key === 'new') {
      const action = {
        type: "new_language",
        payload: {code: "new_lang", name:"克林贡语"},
      };
      store.dispatch(action);
    } else {
      const action = {
        type: "change_language",
        payload: e.key,
      };
      store.dispatch(action);
    }
  }

  render() {
    const langItems = [
      ...this.state.languageList.map((lang) => { return { label: lang.name, key: lang.code, } }),
      { label: '添加新语言', key: 'new' },
    ];
    const langMenuProps = { items: langItems, onClick: this.langMenuHandler };

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

    //const navigate = useNavigate();
    const { navigate } = this.props;

    return (
      <div className={styles['app-header']} >
        {/* top-header */}
        <div className={styles['top-header']}>
          <div className={styles.inner}>
            <Typography.Text>Make travel happier</Typography.Text>
            <Dropdown.Button className={styles['lang-menu']}
              style={{ marginLeft: 15 }}
              menu={langMenuProps}
              icon={<GlobalOutlined />}
            >
              {this.state.language === 'zh' ? '中文' : 'English'}
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

}

export const Header = withRouter(HeaderComponent);
