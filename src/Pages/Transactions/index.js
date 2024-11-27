import { Avatar, Rate, Space, Table, Typography, Tag } from "antd";
import { useEffect, useState } from "react";
import { getTransactions } from "../../API";
import { formatDate_DD_MM_YYYY } from "../../shared/formatDate";
import { useNavigate } from "react-router-dom";

function Transactions() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/transactions");
    } else {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  // Status translation and color mapping
  const statusMap = {
    Pending: {
      text: "Đang chờ",
      color: "orange",
    },
    "Not Completed": {
      text: "Không thành công",
      color: "red",
    },
    Completed: {
      text: "Đã hoàn thành",
      color: "green",
    },
  };

  useEffect(() => {
    setLoading(true);
    getTransactions().then((res) => {
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
      <Typography.Title level={4}>
        Danh sách giao dịch trao đổi
      </Typography.Title>
      <Table
        loading={loading}
        columns={[
          {
            title: "Người tạo yêu cầu",
            dataIndex: "buyer_item",
            render: (buyer_item) => (
              <Space>
                <Avatar src={buyer_item.image_user} size="large" />
                <Typography.Text>{buyer_item.user_name}</Typography.Text>
              </Space>
            ),
            sorter: (a, b) =>
              a.buyer_item.user_name.localeCompare(b.buyer_item.user_name),
          },
          {
            title: "Sản phẩm của người tạo yêu cầu",
            dataIndex: "buyer_item",
            render: (buyer_item) => (
              <Space>
                <img
                  src={buyer_item.item_images[0]}
                  alt={buyer_item.item_name}
                  style={{ width: 50, height: 50 }}
                />
                <Typography.Text strong>{buyer_item.item_name}</Typography.Text>
              </Space>
            ),
            sorter: (a, b) =>
              a.buyer_item.item_name.localeCompare(b.buyer_item.item_name),
          },
          {
            title: "Chủ sở hữu",
            dataIndex: "seller_item",
            render: (seller_item) => (
              <Space>
                <Avatar src={seller_item.image_user} size="large" />
                <Typography.Text>{seller_item.user_name}</Typography.Text>
              </Space>
            ),
            sorter: (a, b) =>
              a.seller_item.user_name.localeCompare(b.seller_item.user_name),
          },
          {
            title: "Sản phẩm của chủ sở hữu",
            dataIndex: "seller_item",
            render: (seller_item) => (
              <Space>
                <img
                  src={seller_item.item_images[0]}
                  alt={seller_item.item_name}
                  style={{ width: 50, height: 50 }}
                />
                <Typography.Text strong>
                  {seller_item.item_name}
                </Typography.Text>
              </Space>
            ),
            sorter: (a, b) =>
              a.seller_item.item_name.localeCompare(b.seller_item.item_name),
          },

          {
            title: "Giao dịch ngày",
            dataIndex: "transaction_date",
            render: (value) => (
              <span>{formatDate_DD_MM_YYYY(value.toLocaleString())}</span>
            ),
            sorter: (a, b) =>
              new Date(a.transaction_date) - new Date(b.transaction_date),
          },
          {
            title: "Trạng thái",
            dataIndex: "transaction_status",
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
            onFilter: (value, record) => record.transaction_status === value,
          },
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 20],
          showTotal: (total, range) => `${range[0]}-${range[1]}/${total}`,
        }}
      />
    </Space>
  );
}

export default Transactions;
