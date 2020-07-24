import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./list.css";
import "antd/dist/antd.css";
import { Row, Col } from "antd";
import { Button } from "antd";
import { Input } from "antd";

const List = (props) => {
  const { Search } = Input;
  const [contacts, setcontacts] = useState([]);

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

        setcontacts(res.data.contacts);
        setLoading(false);
      })
      .catch((err) => {
        alert("Some Error Occured Or network Issue");
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

  //   Sorting by Lowest Price
  const SortAscending = () => {
    var sortedcontactsAsc;
    sortedcontactsAsc = [...contacts].sort((a, b) => {
      console.log(a);
      return a.name.localeCompare(b.name);
    });
    console.log(sortedcontactsAsc);
    return setcontacts(sortedcontactsAsc);
  };
  //   Sorting by Highest Price
  const SortDesscending = (event) => {
    var sortedcontactsDsc;
    sortedcontactsDsc = [...contacts].sort((a, b) => {
      return b.name.localeCompare(a.name);
    });
    console.log(sortedcontactsDsc);
    return setcontacts(sortedcontactsDsc);
  };
  const [searchterm, setSearch] = useState("");
  // Filtering contacts by search terms and maping into array and returning in ui
  let result = contacts
    .filter((contact) => {
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
    })
    .map((contact) => {
      return (
        <Col className="paper zoom" xs={24} sm={12} md={6} lg={4}>
          <h3 className="h3">Name:{contact.name}</h3>
          <p style={{ textAlign: "center" }}>Contact</p>
          <p className="p">{contact.mobilenumber}</p>
          <div className="priceContainer">
            <Button type="primary" size="small">
              <Link
                style={{ color: "#fff", textDecoration: "none" }}
                to={`/edit/${contact._id}`}
              >
                Edit
              </Link>
            </Button>
            <Button
              onClick={() => Delete(contact._id)}
              type="danger"
              size="small"
            >
              Delete
            </Button>
          </div>
        </Col>
      );
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
          <Row className="resultContainer">{result}</Row>
        )}
      </div>
    </div>
  );
};

export default List;
