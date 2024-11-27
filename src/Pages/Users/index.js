import { Avatar, Space, Table, Typography, Tag } from "antd";
import { useEffect, useState } from "react";
import { getUsers } from "../../API";

function Users() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  // Premium status mapping
  const premiumStatusMap = {
    true: { 
      text: 'Đã kích hoạt', 
      color: 'green' 
    },
    false: { 
      text: 'Chưa kích hoạt', 
      color: 'red' 
    }
  };

  useEffect(() => {
    setLoading(true);
    getUsers().then((res) => {
      setDataSource(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <Space style={{ width: "70vw", padding: '0 20px' }} size={20} direction="vertical">
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
                  objectFit: 'cover', 
                  border: '2px solid #f0f0f0' 
                }} 
              />
            ),
          },
          {
            title: "Tên người dùng",
            dataIndex: "name",
            render: (name) => (
              <Typography.Text strong>{name}</Typography.Text>
            ),
          },
          {
            title: "Địa chỉ email",
            dataIndex: "email",
            render: (email) => (
              <Typography.Text copyable>{email}</Typography.Text>
            ),
          },
          // {
          //   title: "Trạng thái Premium",
          //   dataIndex: "is_premium",
          //   render: (isPremium) => {
          //     const statusInfo = premiumStatusMap[isPremium] || { 
          //       text: 'Không xác định', 
          //       color: 'default' 
          //     };
          //     return (
          //       <Tag color={statusInfo.color}>
          //         {statusInfo.text}
          //       </Tag>
          //     );
          //   },
          //   // Uncomment if you want to restore this column
          //   // hidden: false
          // },
          // {
          //   title: "Ngày hết hạn Premium",
          //   dataIndex: "premium_expiry_date",
          //   render: (date) => date 
          //     ? <Typography.Text>{new Date(date).toLocaleDateString('vi-VN')}</Typography.Text>
          //     : <Typography.Text type="secondary">Chưa có</Typography.Text>,
          //   // Uncomment if you want to restore this column
          //   // hidden: false
          // }
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 20],
          showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} người dùng`
        }}
        scroll={{ x: 'max-content' }}
      />
    </Space>
  );
}

export default Users;