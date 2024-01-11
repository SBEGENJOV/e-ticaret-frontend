import { Layout, Menu } from "antd";
import PropTypes from "prop-types";
import {
  UserOutlined,
  LaptopOutlined,
  RollbackOutlined,
  BarcodeOutlined,
  DashboardOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
  StarOutlined,
  BookOutlined,
  ContactsOutlined,
  FileImageOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const { Sider, Header, Content } = Layout;

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (window.location.pathname.startsWith("/")) {
      navigate("/alfa");
    }
  }, [navigate]);

  const menuItems = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      path: "/alfa",
      onClick: () => {
        navigate(`/alfa`);
      },
    },
    {
      key: "2",
      icon: <AppstoreOutlined />,
      label: "Kategoriler",
      path: "/",
      children: [
        {
          key: "3",
          label: "Kategori Listesi",
          path: "/alfa/categories",
          onClick: () => {
            navigate(`/alfa/categories`);
          },
        },
        {
          key: "4",
          label: "Yeni Kategori Oluştur",
          path: "/alfa/categories/create",
          onClick: () => {
            navigate("/alfa/categories/create");
          },
        },
      ],
    },
    {
      key: "5",
      icon: <LaptopOutlined />,
      label: "Ürünler",
      path: "/",
      children: [
        {
          key: "6",
          label: "Ürün Listesi",
          path: "/alfa/products",
          onClick: () => {
            navigate(`/alfa/products`);
          },
        },
        {
          key: "7",
          label: "Yeni Ürün Oluştur",
          path: "/alfa/products/create",
          onClick: () => {
            navigate("/alfa/products/create");
          },
        },
      ],
    },
    {
      key: "8",
      icon: <BarcodeOutlined />,
      label: "Kuponlar",
      path: "/alfa/coupons",
      children: [
        {
          key: "9",
          label: "Kupon Listesi",
          path: "/alfa/coupons",
          onClick: () => {
            navigate(`/alfa/coupons`);
          },
        },
        {
          key: "10",
          label: "Yeni Kupon Oluştur",
          path: "/alfa/coupons/create",
          onClick: () => {
            navigate("/alfa/coupons/create");
          },
        },
      ],
    },

    {
      key: "11",
      icon: <BookOutlined />,
      label: "Blog",
      path: "/blog",
      children: [
        {
          key: "12",
          label: "Blog Listesi",
          path: "/alfa/blog",
          onClick: () => {
            navigate(`/alfa/blog`);
          },
        },
        {
          key: "13",
          label: "Yeni Blog Oluştur",
          path: "/alfa/blog/create",
          onClick: () => {
            navigate("/alfa/blog/create");
          },
        },
      ],
    },
    {
      key: "14",
      icon: <FileImageOutlined />,
      label: "Slider",
      path: "/slider",
      children: [
        {
          key: "15",
          label: "Slider Listesi",
          path: "/alfa/slider",
          onClick: () => {
            navigate(`/alfa/slider`);
          },
        },
        {
          key: "16",
          label: "Yeni Slider Oluştur",
          path: "/alfa/slider/create",
          onClick: () => {
            navigate("/alfa/slider/create");
          },
        },
      ],
    },
    {
      key: "17",
      icon: <StarOutlined />,
      label: "Logo",
      path: "/logo",
      onClick: () => {
        navigate("/alfa/logo");
      },
    },
    {
      key: "18",
      icon: <UserOutlined />,
      label: "Kullanıcı Listesi",
      path: "/alfa/users",
      onClick: () => {
        navigate(`/alfa/users`);
      },
    },
    {
      key: "19",
      icon: <ShoppingCartOutlined />,
      label: "Siparişler",
      path: "/alfa/orders",
      onClick: () => {
        navigate(`/alfa/orders`);
      },
    },
    {
      key: "20",
      icon: <ContactsOutlined />,
      label: "Sorular",
      onClick: () => {
        navigate("/alfa/contact");
      },
    },
    {
      key: "21",
      icon: <RollbackOutlined />,
      label: "Ana Sayfaya Git",
      onClick: () => {
        window.location.href = "/";
      },
    },
  ];

  const getActiveKey = () => {
    for (const item of menuItems) {
      if (item.children) {
        for (const child of item.children) {
          if (child.path === window.location.pathname) {
            return child.key;
          }
        }
      } else {
        if (item.path === window.location.pathname) {
          return item.key;
        }
      }
    }
  };
  const getActiveLabel = () => {
    for (const item of menuItems) {
      if (item.children) {
        for (const child of item.children) {
          if (child.path === window.location.pathname) {
            return child.label;
          }
        }
      } else {
        if (item.path === window.location.pathname) {
          return item.label;
        }
      }
    }
  };
  return (
    <div className="admin-layout">
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider width={200} theme="dark">
          <Menu
            mode="vertical"
            style={{
              height: "100%",
            }}
            items={menuItems}
            defaultSelectedKeys={[getActiveKey()]}
          />
        </Sider>
        <Layout>
          <Header>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "white",
              }}
            >
              <h2>{[getActiveLabel()]}</h2>
              <h2>Admin Paneli</h2>
            </div>
          </Header>
          <Content>
            <div
              className="site-layout-background"
              style={{
                padding: "24px 50px",
                minHeight: 360,
              }}
            >
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default AdminLayout;

AdminLayout.propTypes = {
  children: PropTypes.node,
};
