import {
  AppstoreOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
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
            label: "Users",
            key: "/",
            icon: <UserOutlined />,
          },
          {
            label: "Item",
            key: "/items",
            icon: <ShopOutlined />,
          },
          {
            label: "Transaction",
            key: "/transactions",
            icon: <ShoppingCartOutlined />,
          },
       
        ]}
      ></Menu>
    </div>
  );
}
export default SideMenu;