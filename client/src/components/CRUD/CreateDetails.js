import React, { useState } from "react";
import { Row, Col } from "antd";
import { Button } from "antd";
import { Input } from "antd";

import { useHistory } from "react-router-dom";
const { Search } = Input;
const AddDetails = (props) => {
  let history = useHistory();
  const [details, setUser] = useState({
    name: "",
    mobilenumber: null,
  });

  const { name, mobilenumber } = details;
  const onInputChange = (e) => {
    setUser({ ...details, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    var data = {
      ...details,
    };
    var newdata = JSON.stringify(data);
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
              alert(jsonD.message);
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

  return (
    <Row>
      <Col xs={0} sm={3} lg={8}></Col>
      <Col xs={12} sm={6} lg={8}>
        <Col style={{ height: "50vh", width: "100%", boxSizing: "border-box" }}>
          <Search
            style={{
              borderRadius: "25px",
              width: "100%",
              margin: "20px",
              height: "35px",
            }}
            type="text"
            value={name}
            placeholder="name"
            name="name"
            onChange={onInputChange}
          />
          <Search
            style={{
              borderRadius: "25px",
              width: "100%",
              margin: "20px",
              height: "35px",
            }}
            type="number"
            value={mobilenumber}
            placeholder="number"
            name="mobilenumber"
            onChange={onInputChange}
          />
          <Button
            style={{
              fontSize: "17px",
              width: "100%",
              margin: "20px",
              backgroundColor: "#000",
              color: "#fff",
              border: "none",
              height: "35px",
            }}
            onClick={onSubmit}
          >
            Add Details
          </Button>
        </Col>
      </Col>
      <Col item item xs={0} sm={3} lg={8}></Col>
    </Row>
  );
};

export default AddDetails;
