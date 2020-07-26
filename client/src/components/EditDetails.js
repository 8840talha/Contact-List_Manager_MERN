import {
  Form,
  Input,
  Button,
  Checkbox,
  InputNumber,
  Row,
  Col,
  Card,
} from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const EditDetails = () => {
  let history = useHistory();
  const { id } = useParams();

  const [details, setUser] = useState({});
  console.log(details);
  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    await axios
      .get(`http://localhost:8080/api/contact/${id}`)
      .then((res) => {
        console.log(res.data);
        setUser(res.data.user);
      })
      .catch((err) => alert("Some Error Occured ,Try Refreshing"));
  };

  const onFinish = async (values) => {
    console.log("Success:", values);
    const newdata = JSON.stringify(values);
    await axios
      .put(`http://localhost:8080/api/contact/${id}`, newdata, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res.data);
        alert("updated");
        history.push("/");
      })
      .catch((err) => console.log(err));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row container>
      <Col xs={0} sm={8} lg={4}></Col>
      <Col
        xs={24}
        sm={8}
        lg={16}
        style={{ height: "50vh", width: "100%", boxSizing: "border-box" }}
      >
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Card
            title="User Details"
            style={{
              width: 300,
              background: "cyan",
              borderRadius: "25px",
              fontWeight: "25px",
            }}
          >
            <h3>
              <span style={{ marginRight: "10px", fontSize: "25px" }}>
                Name
              </span>
              {details.name}
            </h3>
            <h3>
              <span style={{ marginRight: "10px", fontSize: "25px" }}>
                Contact
              </span>
              {details.mobilenumber}
            </h3>
          </Card>
          <Form
            style={{
              background: "lightgreen",
              padding: "20px",
              alignItems: "center",
              borderRadius: "25px",
            }}
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <h1 style={{ textAlign: "center" }}>Edit Details Here</h1>
            <hr></hr>
            <Form.Item
              label="Username"
              name="name"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                initialValues={details.name}
                style={{ borderRadius: "25px" }}
              />
            </Form.Item>

            <Form.Item
              label="Contact"
              name="mobilenumber"
              rules={[{ required: true, message: "Please Add Contact" }]}
            >
              <InputNumber style={{ width: "100%", borderRadius: "25px" }} />
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%", borderRadius: "25px" }}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
      <Col xs={0} sm={8} lg={4}></Col>
    </Row>
  );
};
export default EditDetails;
