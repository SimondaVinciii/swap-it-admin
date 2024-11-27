import { Avatar, Space, Table, Typography, Tag } from "antd";
import { useEffect, useState } from "react";
import { getItems } from "../../API";

function Items() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  // Status translation and color mapping
  const statusMap = {
    Available: {
      text: "Sẵn sàng",
      color: "green",
    },
    Pending: {
      text: "Đang chờ",
      color: "orange",
    },
    Sold: {
      text: "Đã giao dịch",
      color: "red",
    },
  };

  useEffect(() => {
    setLoading(true);
    getItems().then((res) => {
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
      <Typography.Title level={4}>Danh sách sản phẩm</Typography.Title>
      <Table
        loading={loading}
        columns={[
          {
            title: "Ảnh",
            dataIndex: "item_images",
            render: (text, record) => (
              <img
                src={record.item_images[0]}
                alt={record.item_name}
                style={{
                  width: 50,
                  height: 50,
                  objectFit: "cover",
                  borderRadius: "4px",
                }}
              />
            ),
          },
          {
            title: "Tên sản phẩm",
            dataIndex: "item_name",
            render: (name) => <Typography.Text strong>{name}</Typography.Text>,
            sorter: (a, b) => a.item_name.localeCompare(b.item_name),
          },
          {
            title: "Giá",
            dataIndex: "price",
            render: (value) => (
              <Typography.Text type="success">{value} SW</Typography.Text>
            ),
            sorter: (a, b) => a.price - b.price,
          },
          {
            title: "Số lượng",
            dataIndex: "quantity",
            render: (quantity) => <Typography.Text>{quantity}</Typography.Text>,
            sorter: (a, b) => a.quantity - b.quantity,
          },
          {
            title: "Địa chỉ",
            dataIndex: "address",
            ellipsis: true,
            sorter: (a, b) => a.address.localeCompare(b.address),
          },
          {
            title: "Trạng thái",
            dataIndex: "item_status",
            render: (status) => {
              const statusInfo = statusMap[status] || {
                text: status,
                color: "default",
              };
              return <Tag color={statusInfo.color}>{statusInfo.text}</Tag>;
            },
            filters: Object.entries(statusMap).map(([key, value]) => ({
              text: value.text,
              value: key,
            })),
            onFilter: (value, record) => record.item_status === value,
          },
          {
            title: "Chủ sở hữu",
            dataIndex: "user_name",
            render: (userName) => <Typography.Text>{userName}</Typography.Text>,
            sorter: (a, b) => a.user_name.localeCompare(b.user_name),
          },
          {
            title: "Danh mục",
            dataIndex: "category_name",
            render: (categoryName) => (
              <Typography.Text>{categoryName}</Typography.Text>
            ),
            sorter: (a, b) => a.category_name.localeCompare(b.category_name),
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

export default Items;
