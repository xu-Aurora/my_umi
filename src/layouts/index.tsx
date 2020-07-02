import React, { useState } from 'react';
import { history } from 'umi';
import { Layout, Menu, Tabs, Dropdown, Avatar } from 'antd';
import isEmpty from "lodash/isEmpty";
import { FullScreen } from '@alitajs/antd-plus';
import ScrollableBar  from '@alitajs/antd-plus/lib/scrollable-bar/scrollable-bar';  // 轮子，超出指定长度，出现左右点击箭头
import ScrollableBarItem  from '@alitajs/antd-plus/lib/scrollable-bar/item'; // 轮子，超出指定长度，出现左右点击箭头
import { UserOutlined, LaptopOutlined, FullscreenOutlined, UnlockOutlined, FullscreenExitOutlined, LogoutOutlined } from '@ant-design/icons';
import { localStorageSet, localStorageGet } from "@/utils/util";

// 引入antd样式
import 'antd/dist/antd.css';

import styles from "./index.less";
// nprogress样式
import 'nprogress/nprogress.css';  

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;
const { TabPane } = Tabs;


interface PageProps {
  location: {
    pathname: string;
  };
  children: React.ReactNode;
}

interface ImenuData {
  path: string;
  title: string;
}


const getKeys = (key: string) => {
  if (key === '/layouts') {   // 从登陆页面跳转进来
    return ['sub1']
  } else {                   // 页面刷新
    let arr: string[] = [], keyPath: string = key.split('/')[2];
    if (keyPath.split('_').length > 2) {  // 两层级
      arr.push(keyPath.split('_')[0], `${keyPath.split('_')[0]}_${keyPath.split('_')[1]}`)
    } else {      // 一层级
      arr.push(keyPath.split('_')[0])
    }
    return arr
  }
}

const keyPath: {[key: string]: string} = {
  sub1_home: 'home',
  sub1_hero: 'hero',
  sub2_subnav: 'subnav',
  sub2_1_1: 'sub2_1_1',
  sub2_1_2: 'sub2_1_2',
}

const getActiveKey = (key: string) => {
  if (key === '/layouts') {   // 从登陆页面跳转进来
    return 'home'
  } else {                    // 页面刷新
    const k = key.split('/')[2]

    return keyPath[k]
  }
}

const getMenuData = () => {
  if (isEmpty(localStorageGet('menuData'))) {  // 从登陆页面跳转进来
    return [{
      path: '../layouts/sub1_home',
      title: 'home',
    }]
  } else {            // 页面刷新
    // 因为在ts中，JSON.parse()需要接受个string类型，所以这里要判断下
    const menuData = localStorageGet('menuData')
    if (typeof menuData === 'string') {
      return JSON.parse(menuData)
    }
  }
}

const BasicLayout: React.FC<PageProps> = ({ children, location }) => {

  const { pathname } = location;

  // 实现页面刷新，根据路由地址来默认初始化侧边栏展开和高亮的数据
  const [keys, setKeys] = useState<string[]>(getKeys(pathname));  
  // const [collapsed, setCollapsed] = useState<boolean>(false);
  // 控制是否全屏状态
  const [isFull, setIsFull] = useState<boolean>(false);
  const [activeKey, setActiveKey] = useState<string>(getActiveKey(pathname));
  // 申明一个空数组，用来存放TabPane
  const [menuData, setMenuData] = useState<ImenuData[]>(getMenuData());

  // const trigger = styles._trigger;

  // Tabs点击事件
  const onTabClick =  (title: string) => {
    menuData.forEach((item: ImenuData) => {
      if (item.title === title) {
        // 跳转对应的路由
        history.push(item.path)

        // 展开对应的SubMenu
        setKeys(getKeys(item.path))

      }
    })
  }


  // 移除TabPane
  const onEdit = (targetKey: any, action: any) => {
    let menuArr: ImenuData[] = [...menuData];

    if (menuData.length > 1) {
      if (action === 'remove') {
        menuArr.forEach((ele, index) => {
          if (ele.title === targetKey) {
            menuArr.splice(index, 1)
          }
        })
      }
      setMenuData(menuArr);
      localStorageSet('menuData', menuArr);
    }
  }


  // 点击左边左边栏mune
  const onMenu = (path: string, title: string) => {
    history.push(path)
    setActiveKey(title)

    let menuArr: ImenuData[] = [...menuData];
    // 判断数组中是否有重复TabPane
    const findItem = menuData.find((item: { title: string; }) => {
      if (item.title === title) {
        return true
      }
    })
    if (!findItem) {
      menuArr.push({
        path,
        title,
      })
      setMenuData(menuArr);
      localStorageSet('menuData', menuArr);
    }

  }

  // 实现点击一个SubMenu，关闭上一个SubMenu
  const onSelect = ({ key }: { key: string }) => {
    setKeys(getKeys(key))
  }

  const drodownMenu = (
    <Menu>
      <Menu.Item key="0">
        <UnlockOutlined />
        <span>修改密码</span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1" >
        <LogoutOutlined />
        <span>退出登录</span>
      </Menu.Item>
    </Menu>
  )

  return (
    <Layout style={{ height: '100%' }}>
      
      {/* 左侧侧边栏 */}
      <Sider width={256}>
      {/* <Sider width={256} collapsible trigger={null} collapsed={collapsed}> */}
        <div className={styles.logo} />  
        <Menu
          theme="dark"
          mode="inline"
          openKeys={keys}
          onSelect={onSelect}
          onOpenChange={(openKeys) => setKeys(openKeys)}
          selectedKeys={[pathname]}
          style={{ borderRight: 0 }}
        >
          <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
            <Menu.Item key="/layouts/sub1_home" onClick={() => onMenu('../layouts/sub1_home', 'home')}>
              home
            </Menu.Item>
            <Menu.Item key="/layouts/sub1_hero" onClick={() => onMenu('../layouts/sub1_hero', 'hero')}>
              hero
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
            <Menu.Item key="/layouts/sub2_subnav" onClick={() => onMenu('../layouts/sub2_subnav', 'subnav')}>
              subnav
            </Menu.Item>
            <SubMenu key="sub2_1" icon={<LaptopOutlined />} title="subnav 2_1">
              <Menu.Item key="/layouts/sub2_1_1" onClick={() => onMenu('../layouts/sub2_1_1', 'sub2_1_1')}>sub2_1</Menu.Item>
              <Menu.Item key="/layouts/sub2_1_2" onClick={() => onMenu('../layouts/sub2_1_2', 'sub2_1_2')}>sub2_2</Menu.Item>
            </SubMenu>

          </SubMenu>
        </Menu>
      </Sider>

      {/* 右侧内容栏 */}
      <Layout>

        <Header className={styles.layout_header}>
          {/* {
            React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: trigger,
              onClick: () => setCollapsed(!collapsed),
            })
          } */}
          <div className={styles.layout_header_r}>
            <Dropdown overlay={drodownMenu}>
              <div>
                <Avatar src={''} />
                <span style={{margin: '0px 20px 0px 10px'}}>{'user Edward'}</span>
              </div>
            </Dropdown>

            <FullScreen
              enabled={isFull}
              target={document.documentElement}
              style={{display: 'flex', alignItems: 'center'}}
            >
              { 
                isFull ? 
                <FullscreenExitOutlined style={{fontSize: 22}} onClick={ () => setIsFull(false) } /> : 
                <FullscreenOutlined style={{fontSize: 22}} onClick={ () => setIsFull(true) } />
              }
            </FullScreen>
            
          </div>
        </Header>

        <ScrollableBar className="scrollableBar" style={{ width: '100%' }}>
          <ScrollableBarItem>
            <Tabs 
              onChange={ (activeKey) => setActiveKey(activeKey) }
              onTabClick={onTabClick}
              onEdit={onEdit}    // 新增和删除页签的回调
              activeKey={activeKey}   // 高亮
              hideAdd             // 隐藏加号图标
              type="editable-card"  
            >
              {
                menuData.map((ele: ImenuData) => {
                  return (
                    <TabPane tab={ele.title} key={ele.title}>
                    </TabPane>
                  )
                })
              }
            </Tabs>
          </ScrollableBarItem>
        </ScrollableBar>

        <Content style={{ overflowY: 'auto' }}>
          <div style={{ background: '#fff', minHeight: 280 }}>
            { children }
          </div>
        </Content>
        

      </Layout>

    </Layout>
  )
};

export default BasicLayout;

