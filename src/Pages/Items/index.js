import { Avatar, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getItems } from "../../API";

function Items() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getItems().then((res) => {
      setDataSource(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Item</Typography.Title>
      <Table
        loading={loading}
        columns={[
          
          {
            title: "Name",
            dataIndex: "item_name",
          },
          {
            title: "Price",
            dataIndex: "price",
            render: (value) => <span>{value} VND</span>,
          },
        
          {
            title: "Quantity",
            dataIndex: "quantity",
          },

          {
            title: "Address",
            dataIndex: "address",
          },
          {
            title: "Status",
            dataIndex: "item_status",
          },
          {
            title: "Owner",
            dataIndex: "user_name",
          },
          {
            title: "Category",
            dataIndex: "category_name",
          },
          {
            title: "Photo",
            dataIndex: "item_images",
           
            render: (text, record) => <img src={record.item_images} alt={record.name} style={{ width: 50, height: 50 }} />,
          },
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
      ></Table>
    </Space>
  );
}
export default Items;
