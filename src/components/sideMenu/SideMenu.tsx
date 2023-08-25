import React from "react";
import styles from './SideMenu.module.css';
import { Menu } from "antd";
import { GifOutlined } from "@ant-design/icons";
import { sideMenuList } from "./mockup";

export const SideMenu: React.FC = () => {
  return (
    <Menu mode="vertical" className={styles['side-menu']}
      items={sideMenuList.map((i) => {
        return {
          key: i.title,
          label: i.title,
          icon: <GifOutlined />,
          children: i.subMenu.map((ii) => {
            return {
              key: ii.title,
              label: ii.title,
              icon: <GifOutlined />,
              children: ii.subMenu ? ii.subMenu.map((iii) => {
                return {
                  key: iii,
                  label: iii,
                  icon: <GifOutlined />,                  
                }
              }) : []
            }
          })
        }
      })}
    >

    </Menu>
  );
}

