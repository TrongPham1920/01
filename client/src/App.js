import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Col, Row, Spin, Button, Form, Input, InputNumber } from "antd";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm(); // Đối tượng form

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/data")
      .then((response) => {
        setData(response.data?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi:", error);
        setLoading(false);
      });
  }, []);

  // Hàm gửi dữ liệu form tới server
  const handleOk = () => {
    form.validateFields().then((values) => {
      axios
        .post("http://localhost:5000/api/data", values)
        .then((response) => {
          setData((prevData) => [...prevData, response.data.data]);
          form.resetFields(); // Reset form
        })
        .catch((error) => {
          console.error("Lỗi:", error);
        });
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dữ liệu từ server:</h1>
      {/* Form thêm sản phẩm */}
      <Form
        form={form}
        layout="vertical"
        name="add_product_form"
        initialValues={{
          name: "",
          description: "",
          price: "",
          img: "",
        }}
        style={{ marginBottom: "20px" }}
      >
        <Form.Item
          label="Tên sản phẩm"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Mô tả sản phẩm"
          name="description"
          rules={[{ required: true, message: "Vui lòng nhập mô tả sản phẩm!" }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="Giá sản phẩm"
          name="price"
          rules={[{ required: true, message: "Vui lòng nhập giá sản phẩm!" }]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Ảnh sản phẩm"
          name="img"
          rules={[{ required: true, message: "Vui lòng nhập đường dẫn ảnh!" }]}
        >
          <Input />
        </Form.Item>
        <button type="primary" onClick={handleOk}>
          Thêm sản phẩm
        </button>
      </Form>

      {loading ? (
        <Spin size="large" />
      ) : (
        <Row gutter={16}>
          {data?.map((item) => (
            <Col span={4} key={item.id}>
              <Card
                hoverable
                cover={
                  <img
                    alt={item.name}
                    src={item.img}
                    style={{
                      width: "90%",
                      height: "300px",
                      objectFit: "contain",
                      padding: 5,
                    }}
                  />
                }
                style={{ width: "250px", height: "450px", margin: 5 }}
              >
                <Card.Meta
                  title={item.name}
                  description={
                    <>
                      <p>{item.description}</p>
                      <p style={{ fontWeight: "bold" }}>
                        Giá: {item.price.toLocaleString()} VNĐ
                      </p>
                    </>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default App;
