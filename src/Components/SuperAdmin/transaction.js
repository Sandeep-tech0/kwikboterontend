import React, { useState, useEffect } from "react";
import { Pagination, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import SideBarAdmin from "./side-bar";
import Navbar from "./topNavbar";
import { getAllTransactionData } from "../../Services/SuperAdmin/apiCall";
import moment from "moment";

const Transaction = () => {
  const [isSidebarOpen] = useState(true);
  const [allTransactionData, setAllTransactionData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredData, setFilteredData] = useState([]); // Filtered data
  const [totalAmount, setTotalAmount] = useState(0); // Total amount

  useEffect(() => {
    handleAllTransactionData();
  }, []);

  const handleAllTransactionData = async () => {
    try {
      const response = await getAllTransactionData();
      setAllTransactionData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDateSearch = () => {
    // Ensure that the dates are in ISO format (YYYY-MM-DD) for proper comparison
    const isoStartDate = moment(startDate).format("YYYY-MM-DD");
    const isoEndDate = moment(endDate).format("YYYY-MM-DD");

    // Filter data based on the selected date range
    const filtered = allTransactionData.filter((item) => {
      if (!isoStartDate || !isoEndDate) return true; // No date range selected
      const itemDate = moment(item.paymentDate).format("YYYY-MM-DD");
      return itemDate >= isoStartDate && itemDate <= isoEndDate;
    });
    setFilteredData(filtered);
  };

  useEffect(() => {
    const filteredData = allTransactionData.filter((item) => {
      const paymentId = item.paymentId;
      const email = item.email;
      const fullName = `${item.firstName} ${item.lastName}`;

      // Check if values are strings and not null
      const paymentIdMatch =
        paymentId &&
        typeof paymentId === "string" &&
        paymentId.toLowerCase().includes(searchInput.toLowerCase());

      const emailMatch =
        email &&
        typeof email === "string" &&
        email.toLowerCase().includes(searchInput.toLowerCase());

      const fullNameMatch =
        fullName &&
        typeof fullName === "string" &&
        fullName.toLowerCase().includes(searchInput.toLowerCase());

      return paymentIdMatch || emailMatch || fullNameMatch;
    });
    setFilteredData(filteredData); // Update filtered data
  }, [searchInput, allTransactionData]);

  useEffect(() => {
    const totalAmount = filteredData.reduce((acc, item) => {
      return acc + item.amount;
    }, 0);
    setTotalAmount(totalAmount);
  }, [filteredData]);

  const noTransactionsFound = filteredData.length === 0;

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
                <h2 className="pt-5">Transactions </h2>
              </Col>
            </Row>

            <Row>
              <Col>
                <div className="d-flex justify-content-end align-items-baseline">
                  <p className="me-3">Period From</p>
                  <input
                    type="date"
                    className="date-input me-3"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  <p className="me-3">To</p>
                  <input
                    type="date"
                    className="date-input me-3"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                  <button className="search-button" onClick={handleDateSearch}>
                    Search
                  </button>
                </div>
              </Col>
            </Row>

            <Row>
              <Col xs={4}>
                <Form inline>
                  <div className="position-relative">
                    <FormControl
                      type="text"
                      placeholder="Transaction ID/ Email/ Client Name "
                      className="mr-sm-2 px-5"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <div className="search-icon-topbar">
                      <i className="fa fa-search"></i>
                    </div>
                  </div>
                </Form>
              </Col>

              <Col>
                <div className="text-right d-flex justify-content-end align-items-baseline mt-3">
                  <p className="me-3">Total amount Received </p>
                  <input
                    type="number"
                    className="date-input mr-3 h-100px"
                    placeholder={totalAmount}
                    disabled
                  />
                </div>
              </Col>
            </Row>

            <Row>
              <div className="table-res mt-5 table-responsive">
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr className="d-sm-table-row">
                      <th>S.No.</th>
                      <th>Client Name</th>
                      <th scope="col">Email ID</th>
                      <th scope="col">Organization Name </th>
                      <th scope="col">Amount </th>
                      <th scope="col">Transaction Done By</th>
                      <th scope="col">Transaction ID</th>
                      <th scope="col">Transaction Date/Time</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {noTransactionsFound ? (
                      <tr>
                        <td colSpan="9">No transactions found.</td>
                      </tr>
                    ) : (
                      <>
                        {currentItems.map((item, index) => (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>
                              {item.firstName} {item.lastName}{" "}
                            </td>
                            <td>{item.email}</td>
                            <td>{item.organizationName}</td>
                            <td>
                              <i className="fa fa-dollar"></i>
                              {item.amount}
                            </td>
                            <td>{item.paymentGateway}</td>
                            <td>{item.paymentId}</td>
                            <td>
                              {moment(item.paymentDate).format(
                                "D MMMM YYYY , h:mm a"
                              )}
                            </td>
                            <td>{item.paymentStatus}</td>
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

export default Transaction;
