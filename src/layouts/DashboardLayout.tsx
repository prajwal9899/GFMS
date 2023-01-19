import { Link, Outlet, Router } from "react-router-dom";
import Sidebar from "../pages/Sidebar/Sidebar";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  MenuOutlined,
  UploadOutlined,
  VideoCameraOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
const { Header, Sider, Content } = Layout;
 
const DashboardLayout = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    // window.addEventListener('resize', handleResize);
    // return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Layout>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
        trigger={null}
        collapsible
        collapsed={collapsed}
        collapsedWidth={windowWidth < 768 ? 0 : undefined}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <HomeOutlined />,
              label: "Dashboard",
              onClick: () => {
                navigate("/");
              },
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              onClick: () => navigate("/view-goats"),
              label: "View Goats",
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "Add Goats",
              onClick: () => {
                navigate("/add-goats");
              },
            },
          ]}
        />
      </Sider>
      <Layout
        className="site-layout"
        style={{
          marginLeft: windowWidth < 768 ? (collapsed ? "0px" : "200px") : (collapsed ? "80px" : "200px"),
          transition: "all 0.2s ease-in-out",
        }}
      >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            marginBottom: "20px",
          }}
        >
          {React.createElement(collapsed ? MenuOutlined : MenuOutlined, {
            className: "trigger",
            style: {
              fontSize: "25px",
              marginLeft: "20px",
            },
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        {/* <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
        </Content> */}
        <Outlet />
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
