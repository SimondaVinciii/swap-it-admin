import { Avatar, Rate, Space, Table, Typography, Tag } from "antd";
import { useEffect, useState } from "react";
import { getPayments } from "../../API";
import { formatDate_DD_MM_YYYY } from "../../shared/formatDate";
import { render } from "@testing-library/react";

function Payments() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getPayments().then((res) => {
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
            title: "Tên",
            dataIndex: "user",
            render: (user) => (
              <Space>
                <Avatar src={user[0].image_user} size="large" />
                <Typography.Text>{user[0].name}</Typography.Text>
              </Space>
            ),
            sorter: (a, b) => a.user[0].name.localeCompare(b.user[0].name),
          },
          {
            title: "Email",
            dataIndex: "email",
            sorter: (a, b) => a.email.localeCompare(b.email),
          },
          {
            title: "Số tiền",
            dataIndex: "amount",
            render: (amount) => (
              <Typography.Text strong>
                {amount.endsWith(".00") ? amount.replace(/\.00$/, "") : amount}{" "}
                VND
              </Typography.Text>
            ),
            sorter: (a, b) => parseFloat(a.amount) - parseFloat(b.amount),
          },
          {
            title: "Phương thức giao dịch",
            dataIndex: "payment_method",
            filters: [
              { text: "PayOs", value: "PayOs" },
              { text: "Momo", value: "Momo" },
            ],
            onFilter: (value, record) => record.payment_method === value,
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

export default Payments;
