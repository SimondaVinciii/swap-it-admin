import {
  ShopOutlined,
  SwapOutlined,
  WalletOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
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
  return (
    <div className="SideMenu">
      <Menu
        className="SideMenuVertical"
        mode="vertical"
        onClick={(item) => {
          //item.key
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
      ></Menu>
    </div>
  );
}
export default SideMenu;
