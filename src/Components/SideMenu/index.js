import {
  ShopOutlined,
  SwapOutlined,
  WalletOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Menu, Avatar, Space, Typography, Button } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SideMenu() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");
  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
    window.location.reload();
    console.log("logout");
  };

  return (
    <div className="SideMenu">
      <div
        className="admin-profile"
        style={{
          padding: "16px",
          textAlign: "center",
          borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
          marginBottom: "8px",
        }}
      >
        <Space direction="vertical" align="center">
          <Avatar
            size={64}
            src={
              "https://img.freepik.com/free-vector/young-prince-vector-illustration_1308-174367.jpg?t=st=1732730755~exp=1732734355~hmac=163d57374b52ab9f79d57352f3b71f23ebe6d621c840f00248379b0d6766d367&w=100"
            }
          />
          <Typography.Text strong>Admin</Typography.Text>
        </Space>
      </div>
      <Menu
        className="SideMenuVertical"
        mode="vertical"
        onClick={(item) => {
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
        items={[
          {
            label: "Danh sách người dùng",
            key: "/",
            icon: <UserOutlined />,
          },
          {
            label: "Danh sách sản phẩm",
            key: "/items",
            icon: <ShopOutlined />,
          },
          {
            label: "Danh sách giao dịch trao đổi",
            key: "/transactions",
            icon: <SwapOutlined />,
          },
          {
            label: "Danh sách giao dịch thanh toán",
            key: "/payments",
            icon: <WalletOutlined />,
          },
        ]}
      />
      <Button
        type="text"
        icon={<LogoutOutlined />}
        onClick={handleLogout}
        style={{
          width: "100%",
          textAlign: "left",
          paddingLeft: "24px",
          marginTop: "16px",
        }}
      >
        Đăng xuất
      </Button>
    </div>
  );
}
export default SideMenu;
