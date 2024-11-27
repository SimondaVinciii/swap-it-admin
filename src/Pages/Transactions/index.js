import { Avatar, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getTransactions } from "../../API";
import { formatDate, formatDate_DD_MM_YYYY, formatDateOnlyDate } from "../../shared/formatDate";

function Transactions() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getTransactions().then((res) => {
      setDataSource(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <Space style={{ width: "70vw", padding: '0 20px' }} size={20} direction="vertical">
      <Typography.Title level={4}>Orders</Typography.Title>
      <Table
        loading={loading}
        columns={[
          {
            title: "Buyer",
            dataIndex: "buyer_item",
            render: (buyer_item) => (
              <Space>
                <Avatar src={buyer_item.image_user} size="large" />
                <Typography.Text>{buyer_item.user_name}</Typography.Text>
              </Space>
            ),
          },
          {
            title: "Buyer's Item",
            dataIndex: "buyer_item",
            render: (buyer_item) => (
              <Space>
                <img src={buyer_item.item_images[0]} alt={buyer_item.item_name} style={{ width: 50, height: 50 }} />
                <Typography.Text strong>{buyer_item.item_name}</Typography.Text>
              </Space>
            ),
          },
          {
            title: "Owner",
            dataIndex: "seller_item",
            render: (seller_item) => (
              <Space>
                <Avatar src={seller_item.image_user} size="large" />
                <Typography.Text>{seller_item.user_name}</Typography.Text>
              </Space>
            ),
          },
          {
            title: "Owner's Item",
            dataIndex: "seller_item",
            render: (seller_item) => (
              <Space>
                <img src={seller_item.item_images[0]} alt={seller_item.item_name} style={{ width: 50, height: 50 }} />
                <Typography.Text strong>{seller_item.item_name}</Typography.Text>
              </Space>
            ),
          },
          {
            title: "Transaction Date",
            dataIndex: "transaction_date",
            render: (value) => <span>{formatDate_DD_MM_YYYY((value).toLocaleString())}</span>,
          },
          {
            title: "Status",
            dataIndex: "transaction_status",
          }
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
      />
    </Space>
  );
}

export default Transactions;