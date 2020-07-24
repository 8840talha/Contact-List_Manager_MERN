import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { Row, Col } from "antd";
import { Input } from "antd";
import { Button } from "antd";
const EditDetails = (props) => {
  const { Search } = Input;
  let history = useHistory();
  const { id } = useParams();
  console.log(id);

  const [details, setUser] = useState({
    name: "",
    mobilenumber: null,
  });

  const { name, mobilenumber } = details;
  const onInputChange = (e) => {
    setUser({ ...details, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    load();
  }, []);

  const data = {};
  if (name !== "") {
    data.name = name;
  }
  if (mobilenumber !== null) {
    data.mobilenumber = mobilenumber;
  }
  console.log(data);
  const newdata = JSON.stringify(data);
  console.log(newdata);

  const edit = async (event) => {
    event.preventDefault();
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

  const load = async () => {
    await axios
      .get(`http://localhost:8080/api/contact/${id}`)
      .then((res) => {
        console.log(res.data);
        setUser(res.data.user);
      })
      .catch((err) => alert("Some Error Occured ,Try Refreshing"));
  };
  return (
    <Row container>
      <Col xs={0} sm={8} lg={8}></Col>
      <Col
        xs={24}
        sm={8}
        lg={8}
        style={{ height: "50vh", width: "100%", boxSizing: "border-box" }}
      >
        <label style={{ fontSize: "35px", margin: "20px" }} for="name">
          Name
        </label>
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
        <label style={{ fontSize: "35px", margin: "20px" }} for="Mobile">
          Number
        </label>
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
          onClick={edit}
        >
          Edit Details
        </Button>
      </Col>
      <Col xs={0} sm={8} lg={8}></Col>
    </Row>
  );
};

export default EditDetails;
