import { useState, useEffect } from "react";
import SideBarAdmin from "./side-bar";
import Navbar from "./topNavbar";
import { useLocation, useNavigate } from "react-router-dom";
import { getConversationData } from "../../Services/Admin/userApiCall";
import {
  TabContainer,
  ListGroup,
  Tab,
  Row,
  Col,

} from "react-bootstrap";
import moment from "moment";

const CustomerConversation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const stateData = location.state || {};
  const { userId, organizationName } = stateData;
  const [searchTerm, setSearchTerm] = useState("");
  ///============= conversation data   =========//
  const [conversationData, setConversationData] = useState([]);
  const [visitorConversation, setVisitorConversation] = useState([]);
  const [visitorId, setVisitorId] = useState("");
  const [conversationDate, setConversationDate] = useState("");
  const[downloadData,setDownloadData]=useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);

  useEffect(() => {
    handleConversationData();
  }, []);

  const handleConversationData = async () => {
    try {
      const response = await getConversationData(userId);
      setConversationData(response.data);

      if (response.data.length > 0) {
        const parsedData = JSON.parse(response.data[0].conversation);
        setDownloadData(parsedData)
        const messages = parsedData.transcript
          .split(/\s*(user|bot):/)
          .filter(
            (message) =>
              message.replace("user", "").replace("bot", "").trim() !== ""
          )
          .map((message) => message.trim());
        setVisitorConversation(messages);
        setVisitorId(response.data[0].visitorId);
        setSelectedConversation(response.data[0]._id);
        setConversationDate(response.data[0].createdAt);
      } else if (response.data.length === 0) {
        setVisitorConversation([]);
        setVisitorId("");
        setConversationDate("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  ////============= conversation throught id   =========//
  
  const handleShowConversation = async (id, visId, date) => {
    setVisitorId(visId);
    setConversationDate(date);
    setSelectedConversation(id);
    try {
      const response = conversationData.filter((item) => item._id === id);

      if (response.length > 0) {
        const parsedData = JSON.parse(response[0].conversation);
        setDownloadData(parsedData)
        const messages = parsedData.transcript
          .split(/\s*(user|bot):/)
          .filter(
            (message) =>
              message.replace("user", "").replace("bot", "").trim() !== ""
          )
          .map((message) => message.trim());
        setVisitorConversation(messages);
      } else {
        console.log("No matching conversation found.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //////========= search by id  =========/////
  const filteredData = conversationData.filter((item) => {
    return item.visitorId.toLowerCase().includes(searchTerm.toLowerCase());
  });

  /// ========= search by date =========/////

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleSearch = () => {
    const filteredData = conversationData.filter((item) => {
      return (
        moment(item.createdAt).format("YYYY-MM-DD") >= startDate &&
        moment(item.createdAt).format("YYYY-MM-DD") <= endDate
      );
    });
    setConversationData(filteredData);
  };

  ///----------------- download conversation ------------------///
  
  function downloadObjectAsJson(jsonData, filename) {
    const json = JSON.stringify(jsonData, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
  }

  const handleConversationDownload = () => {
    try {
      
      downloadObjectAsJson(downloadData, "coonversation.json");
    } catch (error) {
      console.log("error", error);
    }
  };


  return (
    <div>
      <section className="">
        <Navbar />

        <div fluid className="admin-panel">
          <SideBarAdmin />

          <div className="p-5" style={{width:"100%"}}>
            <div>
              <h2>
                <i
                  class="fa-solid fa-angle-left "
                  onClick={() => navigate(-1)}
                ></i>{" "}
                {""}
                {organizationName} - Customer Conversation
              </h2>
            </div>

           <Col xs={12}>
           <Row>
              <Col xs={6} className="pt-5">
                <div className="search-bar-container">
                  <input
                    type="text"
                    className="search-input"
                    placeholder="search Conversation by conversation ID"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                
                </div>
              </Col>
              <Col xs={6} className="pt-5">
                <div className="d-flex justify-content-end align-items-baseline">
                  <p className="me-3">Period From</p>
                  <input
                    type="date"
                    className="date-input me-3"
                    value={startDate}
                    onChange={handleStartDateChange}
                  />
                  <p className="me-3">To</p>
                  <input
                    type="date"
                    className="date-input me-3"
                    value={endDate}
                    onChange={handleEndDateChange}
                  />
                  <button className="search-button" onClick={handleSearch}>
                    Search
                  </button>
                </div>
              
                
              </Col>
            </Row>
            <Row>
              <Col xs={12} className="pt-5">
                {visitorId ? (
                  <div className="border-container">
                    <TabContainer
                      id="left-tabs-example"
                      defaultActiveKey="home"
                    >
                      <Row>
                        <Col sm={3}>
                          <ListGroup className="custom-list">
                            <ListGroup.Item disabled >Conversation ID</ListGroup.Item>

                            {filteredData.map((item) => (
                              <ListGroup.Item
                                action
                                onClick={() =>
                                  handleShowConversation(
                                    item._id,
                                    item.visitorId,
                                    item.createdAt
                                  )
                                }
                                key={item._id}
                                className={item._id === selectedConversation ? "active" : ""}
                                
                              >
                                {item.visitorId}
                              </ListGroup.Item>
                            ))}
                          </ListGroup>
                        </Col>
                        <Col sm={9}>
                          <Tab.Content>
                          <table className="custom-table table table-bordered table-responsive">
                          <thead>
                                  <tr>
                                    <th scope="col"></th>
                                    <td style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                                        <p> <span>  Conversation ID {visitorId}{" "}</span>
                                      <span className="">
                                        {moment(conversationDate).format(
                                          "DD-MM-YYYY"
                                        )}
                                        ,{" "}
                                        {moment(conversationDate).format(
                                          "h:mm A"
                                        )}
                                      </span></p>
                                      <div  style={{
                     
                      color:"#3B42C4",
                      fontSize:"30px"
                }}>
                <i class="fa fa-download" onClick={handleConversationDownload}></i></div>
                                    </td>
                                  </tr>
                                </thead>
                          </table>
                            <Tab.Pane eventKey="home" className="chat-scroll">
                              <table className="custom-table table table-bordered table-responsive">
                              
                                <tbody>
                                  {visitorConversation.map((message, index) => {
                                    const isBot = index % 2 === 1;
                                    return (
                                      <tr
                                        key={index}
                                        className={
                                          isBot
                                            ? "bot-message"
                                            : "visitor-message"
                                        }
                                      >
                                        <th scope="row">
                                          {isBot ? "Alex" : "Visitor"}
                                        </th>
                                        <td>
                                          {isBot ? (
                                            <span className="circle-dummy">
                                              <i className="fa-solid fa-robot"></i>
                                            </span>
                                          ) : (
                                            <span className="circle-dummy">
                                              <i className="fa-solid fa-a"></i>
                                            </span>
                                          )}
                                          {message}
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </Tab.Pane>
                          </Tab.Content>
                        </Col>
                      </Row>
                    </TabContainer>
                  </div>
                ) : (
                  <h1
                    style={{
                      color: "red",
                      textAlign: "center",
                      marginTop: "100px",
                      fontSize: "30px",
                      fontWeight: "bold",
                    }}
                  >
                    No Conversation Found
                  </h1>
                )}
              </Col>
            </Row>

           </Col>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CustomerConversation;
