import { Avatar, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getUsers, getInventory } from "../../API";

function Users() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getUsers().then((res) => {
      setDataSource(res.data);
      setLoading(false);
    });
  
  }, []);

  return (
    <Space style={{ width: "70vw", padding: '0 20px' }} size={20} direction="vertical">
      <Typography.Title level={4}>Users</Typography.Title>
      <Table
        loading={loading}
        columns={[
          {
            title: "Photo",
            dataIndex: "image_user",
            render: (link) => {
              return <Avatar src={link} size={50} />;
            },
          },
          
          {
            title: "Name",
            dataIndex: "name",
          },
          
          {
            title: "Email",
            dataIndex: "email",
          },
          // {
          //   title: "Is_premium",
          //   dataIndex: "is_premium",
          // },
          // {
          //   title: "Premium Expiry Date",
          //   dataIndex: "premium_expiry_date",
          // },
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
      ></Table>
    </Space>
  );
}
export default Users;
