import { Avatar, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getTransactions, getOrders } from "../../API";

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
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Orders</Typography.Title>
      <Table
        loading={loading}
        columns={[
          {
            title: "Buyer",
            dataIndex: "buyer_id",
          },
          {
            title: "Owner",
            dataIndex: "seller_id",
          },
          {
            title: "Transaction Date",
            dataIndex: "transaction_date",
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
      ></Table>
    </Space>
  );
}
export default Transactions;
