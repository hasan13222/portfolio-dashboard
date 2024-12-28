import { useState } from 'react';
import {
  BookFilled,
  CalendarFilled,
  ContainerFilled,
  CreditCardFilled,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { NavLink, Outlet } from 'react-router-dom';
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: <NavLink to="/">Dashboard</NavLink>,
            },
            {
              key: '2',
              icon: <ContainerFilled />,
              label: <NavLink to="/about">About</NavLink>,
            },
            {
              key: '3',
              icon: <BookFilled />,
              label: <NavLink to="/education">Education</NavLink>,
            },
            {
              key: '4',
              icon: <CreditCardFilled />,
              label: <NavLink to="/experience">Experience</NavLink>,
            },
            {
              key: '5',
              icon: <CalendarFilled />,
              label: <NavLink to="/projects">Projects</NavLink>,
            },
            {
              key: '6',
              icon: <CalendarFilled />,
              label: <NavLink to="/skills">Skills</NavLink>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 'calc(100vh - 115px)',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          
          <Outlet/>

        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;