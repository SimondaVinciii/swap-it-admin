import { Avatar, Space, Table, Typography, Tag } from "antd";
import { useEffect, useState } from "react";
import { getUsers } from "../../API";
import { useNavigate } from "react-router-dom";

function Users() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  // Premium status mapping
  const premiumStatusMap = {
    true: {
      text: "Đã kích hoạt",
      color: "green",
    },
    false: {
      text: "Chưa kích hoạt",
      color: "red",
    },
  };

  useEffect(() => {
    setLoading(true);
    getUsers().then((res) => {
      setDataSource(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <Space
      style={{ width: "70vw", padding: "0 20px" }}
      size={20}
      direction="vertical"
    >
      <Typography.Title level={4}>Danh sách người dùng</Typography.Title>
      <Table
        loading={loading}
        columns={[
          {
            title: "Ảnh",
            dataIndex: "image_user",
            render: (link) => (
              <Avatar
                src={link}
                size={50}
                style={{
                  objectFit: "cover",
                  border: "2px solid #f0f0f0",
                }}
              />
            ),
          },
          {
            title: "Tên người dùng",
            dataIndex: "name",
            render: (name) => <Typography.Text strong>{name}</Typography.Text>,
            sorter: (a, b) => a.name.localeCompare(b.name),
          },
          {
            title: "Địa chỉ email",
            dataIndex: "email",
            render: (email) => (
              <Typography.Text copyable>{email}</Typography.Text>
            ),
            sorter: (a, b) => a.email.localeCompare(b.email),
          },
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 20],
          showTotal: (total, range) => `${range[0]}-${range[1]}/${total}`,
        }}
        scroll={{ x: "max-content" }}
      />
    </Space>
  );
}

export default Users;
