import React from "react";
import { Layout, Typography, Input, Dropdown, Menu, Button } from 'antd';
import type { MenuProps } from "antd";
import { GlobalOutlined } from '@ant-design/icons';
import { withRouter, RouteComponentProps } from "../../helpers/withRouter";
import styles from './Header.module.css';
import logo from '../../assets/logo.svg';
import store from "../../redux/store";
import { LanguageState } from "../../redux/languageReducer";
import { withTranslation, WithTranslation } from "react-i18next";

interface HeaderState extends LanguageState {

}

class HeaderComponent extends React.Component<RouteComponentProps & WithTranslation, HeaderState> {
  constructor(props : RouteComponentProps & WithTranslation) {
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
    //const navigate = useNavigate();
    const { navigate, t } = this.props;

    const langItems = [
      ...this.state.languageList.map((lang) => { return { label: lang.name, key: lang.code, } }),
      { label: t("header.add_new_language"), key: 'new' },
    ];
    const langMenuProps = { items: langItems, onClick: this.langMenuHandler };

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
              {this.state.language === 'zh' ? '中文' : 'English'}
            </Dropdown.Button>
            <Button.Group className={styles['button-group']}>
              <Button onClick={() => navigate('/signup')}>{ t("header.register") }</Button>
              <Button onClick={() => navigate('/signin')}>{ t("header.signin") }</Button>
            </Button.Group>
          </div>
        </div>

        {/* header */}
        <Layout.Header className={styles['main-header']}>
          <span onClick={() => navigate('/')} >
            <img src={logo} alt="logo" className={styles['App-logo']} />
            <Typography.Title level={3} className={styles['title']}>{ t("header.title") }</Typography.Title>
          </span>

          <Input.Search placeholder='Please input destination, theme or keyword' className={styles['search-input']}></Input.Search>
        </Layout.Header>

        <Menu mode={"horizontal"} className={styles['main-menu']} items={mainMenuItems}></Menu>

      </div >
    );
  }

}

export const Header = withTranslation()(withRouter(HeaderComponent));
