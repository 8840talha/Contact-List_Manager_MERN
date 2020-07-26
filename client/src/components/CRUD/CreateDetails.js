import React, { useState } from "react";
import { Row, Alert, Col } from "antd";
import { Button } from "antd";
import { Input, Form, InputNumber, Checkbox } from "antd";

import { useHistory } from "react-router-dom";
const { Search } = Input;
const AddDetails = (props) => {
  let history = useHistory();
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  const onFinish = (values) => {
    var newdata = JSON.stringify(values);
    console.log(newdata);
    fetch("http://localhost:8080/api/contact/createContact", {
      method: "post",
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: newdata,
    })
      .then((response) =>
        response.json().then((jsonD) => {
          if (jsonD.success == "false") {
            alert(jsonD.message);
          } else {
            if (jsonD.success) {
              alert("User Added Successfully");
              // <Alert message="working" style={{background }}type="success" />;s
              history.push("/");
            }
          }
        })
      )
      .catch((error) => {
        alert("Some Error Occured ,Try Refreshing");
        console.log(error);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Row>
      <Col xs={0} sm={3} lg={8}></Col>
      <Col xs={12} sm={6} lg={8}>
        <Col style={{ height: "50vh", width: "100%", boxSizing: "border-box" }}>
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
            <Form.Item
              label="Username"
              name="name"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input style={{ borderRadius: "25px" }} />
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
        </Col>
      </Col>
      <Col item item xs={0} sm={3} lg={8}></Col>
    </Row>
  );
};

export default AddDetails;
