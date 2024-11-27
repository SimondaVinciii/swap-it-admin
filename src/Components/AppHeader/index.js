import React, { useEffect, useState } from 'react';
import { Badge, Drawer, Image, List, Space, Typography } from 'antd';
import { BellFilled, MailOutlined } from '@ant-design/icons';
import { getComments, getOrders } from '../../API';
import Logo from "../../assets/img/logo.png";

function AppHeader() {
  const [comments, setComments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  useEffect(() => {
    getComments().then((res) => {
      setComments(res.comments);
    });
    getOrders().then((res) => {
      setOrders(res.products);
    });
  }, []);

  return (
    <div className="AppHeader">
      
<img src={Logo} style={{width: '40px', margin: '0 20px'}} alt="Flowbite Logo" />

      <h3>SwapIt's Dashboard</h3>
    </div>
  );
}

export default AppHeader;