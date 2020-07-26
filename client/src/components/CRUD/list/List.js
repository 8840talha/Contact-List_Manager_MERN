import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./list.css";
import "antd/dist/antd.css";
import { Row, Col, Drawer } from "antd";
import { Button } from "antd";
import { Input, Space, Alert, Table, Popover } from "antd";
import Drawers from "../../Drawer";

const List = (props) => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
    // window.location.reload(false)
  };
  const [currentUserId, setId] = useState(null);
  const handleUserId = (id) => {
    setId(id);
  };
  // Content For popoveer
  const content = (
    <div>
      <Button type="primary">
        <Link
          style={{ color: "#fff", textDecoration: "none" }}
          to={`/edit/${currentUserId}`}
        >
          Edit Simple
        </Link>
      </Button>
      <Button type="primary" onClick={showDrawer}>
        Edit In Drawer
      </Button>
    </div>
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Contact",
      dataIndex: "mobilenumber",
      key: "mobilenumber",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => {
        console.log(record);
        console.log(text);
        return (
          <Space size="middle">
            <Popover
              content={content}
              title="Choose Edit Option"
              trigger="click"
            >
              <Button type="primary" onClick={() => handleUserId(record._id)}>
                Edit
              </Button>
            </Popover>

            <Button onClick={() => Delete(record._id)} type="danger">
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];

  const { Search } = Input;
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    load();
  }, []);
  const load = async () => {
    setLoading(true);
    await axios
      .get("http://localhost:8080/api/contact/getContact")
      .then((res) => {
        console.log(res.data);

        setdata(res.data.contacts);
        setLoading(false);
      })
      .catch((err) => {
        <Alert message="Some Error Occured." type="error" />;
      });
  };

  const Delete = async (id) => {
    await axios
      .delete(`http://localhost:8080/api/contact/${id}`)
      .then((res) => {
        console.log(res.data);
        alert("Deleted Successfully");
        load();
      })
      .catch((err) => alert("Some Error Occured Or network Issue"));
  };

  //   Sorting by Name from ascend
  const SortAscending = () => {
    var sorteddataAsc;
    sorteddataAsc = [...data].sort((a, b) => {
      console.log(a);
      return a.name.localeCompare(b.name);
    });
    console.log(sorteddataAsc);
    return setdata(sorteddataAsc);
  };
  //   Sorting by name from descend
  const SortDesscending = (event) => {
    var sorteddataDsc;
    sorteddataDsc = [...data].sort((a, b) => {
      return b.name.localeCompare(a.name);
    });
    console.log(sorteddataDsc);
    return setdata(sorteddataDsc);
  };
  const [searchterm, setSearch] = useState("");
  // Filtering data by search terms and maping into array and returning in ui

  let result = data.filter((contact) => {
    if (searchterm == null) {
      return contact;
    } else if (
      contact.name.toLowerCase().includes(searchterm.toLowerCase()) ||
      contact.mobilenumber
        .toString()
        .toLowerCase()
        .includes(searchterm.toString().toLowerCase())
    ) {
      return contact;
    }
  });

  return (
    <div>
      <div>
        <Row>
          <Col lg={8}>
            View In:
            <Button
              size="large"
              onClick={() => {
                SortAscending();
              }}
            >
              Ascending Order
            </Button>
            <Button
              size="large"
              onClick={() => {
                SortDesscending();
              }}
            >
              Descending Order
            </Button>
          </Col>

          <Col xs={4} sm={4} lg={8}>
            <Search
              placeholder="Search By Name Or Number"
              onChange={(e) => setSearch(e.target.value)}
              enterButton
            />
          </Col>
        </Row>

        {loading ? (
          <p>Loading...</p>
        ) : (
          // <Row className="resultContainer">{result}</Row>
          <Row>
            <Col lg={4}></Col>
            <Col lg={16}>
              <Table
                style={{ border: "1px solid lightgray" }}
                columns={columns}
                dataSource={result}
              />
            </Col>
            <Col lg={4}></Col>
          </Row>
        )}
      </div>
      {currentUserId ? (
        <Drawers
          id={currentUserId}
          onClose={onClose}
          showDrawer={showDrawer}
          visible={visible}
        />
      ) : null}
    </div>
  );
};

export default List;
