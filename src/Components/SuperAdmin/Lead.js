import React, { useState, useEffect } from "react";
import { Pagination, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import SideBarAdmin from "./side-bar";
import Navbar from "./topNavbar";
import { AllLeadData } from "../../Services/SuperAdmin/apiCall";
import moment from "moment";

const Lead = () => {
  const [isSidebarOpen] = useState(true);
  const [leadData, setLeadData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]); // Filtered data

  useEffect(() => {
    handleGetLeadData();
  }, []);

  const handleGetLeadData = async () => {
    try {
      const response = await AllLeadData();
      setLeadData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const filteredData = leadData.filter((item) => {
      const name = item.name;
      const email = item.email;

      // Check if values are strings and not null

      const emailMatch =
        email &&
        typeof email === "string" &&
        email.toLowerCase().includes(searchInput.toLowerCase());

      const NameMatch =
        name &&
        typeof name === "string" &&
        name.toLowerCase().includes(searchInput.toLowerCase());

      return emailMatch || NameMatch;
    });
    setFilteredData(filteredData); // Update filtered data
  }, [searchInput, leadData]);

  const noLeadFound = filteredData.length === 0;

  const itemPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <Navbar />

      <div className="admin-panel">
        <SideBarAdmin />
        <div
          className={`right-content ${
            isSidebarOpen ? "sidebar-open" : "sidebar-closed"
          }`}
        >
          <Col xs={12} className="content">
            <Row>
              <Col>
                <h2 className="pt-5">Lead </h2>
              </Col>
            </Row>

            <Row>
              <Col xs={4}>
                <Form inline>
                  <div className="position-relative">
                    <FormControl
                      type="text"
                      placeholder="Name/ Email"
                      className="mr-sm-2 px-5 mt-4"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <div className="search-icon-topbar">
                      <i className="fa fa-search"></i>
                    </div>
                  </div>
                </Form>
              </Col>
            </Row>

            <Row>
              <div className="table-res mt-5 table-responsive">
                <table className="table table-bordered table-striped  text-center">
                  <thead>
                    <tr className="d-sm-table-row" >
                      <th>S.No.</th>
                      <th> Name</th>
                      <th>Email ID</th>
                      <th>Phone Number </th>
                      <th>Created At </th>
                    </tr>
                  </thead>
                  <tbody>
                    {noLeadFound ? (
                      <tr>
                        <td colSpan="9">No Lead found.</td>
                      </tr>
                    ) : (
                      <>
                        {currentItems.map((item, index) => (
                          <tr key={index} className="d-sm-table-row" >
                            <td>{index + 1}</td>
                            <td>{item.name} </td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>
                              {moment(item.createdAt).format("DD-MM-YYYY")}
                            </td>
                          </tr>
                        ))}
                      </>
                    )}
                  </tbody>
                </table>
                <div>
                  <div className="pagination-container">
                    <Pagination className="justify-content-center">
                      <Pagination.Prev
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      />
                      {Array.from({ length: totalPages }, (_, index) => (
                        <Pagination.Item
                          key={index + 1}
                          active={index + 1 === currentPage}
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </Pagination.Item>
                      ))}
                      <Pagination.Next
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      />
                    </Pagination>
                  </div>
                </div>
              </div>
            </Row>
          </Col>
        </div>
      </div>
    </div>
  );
};

export default Lead;
