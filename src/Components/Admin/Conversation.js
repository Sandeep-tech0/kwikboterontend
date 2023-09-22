import React, { useState, useEffect } from "react";
import Header from "./header";
import { getConversationData } from "../../Services/Admin/userApiCall";
import moment from "moment";

const Coversation = () => {
  const clientId = localStorage.getItem("clientId");
  ///======== conversation data   =========//
  const [conversationData, setConversationData] = useState([]);
  const [visitorConversation, setVisitorConversation] = useState([]);
  const [visitorId, setVisitorId] = useState("");
  const [conversationDate, setConversationDate] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(null);

  useEffect(() => {
    handleConversationData();
  }, []);

  const handleConversationData = async () => {
    try {
      const response = await getConversationData(clientId);
      setConversationData(response.data);

      if (response.data.length > 0) {
        const parsedData = JSON.parse(response.data[0].conversation);
        const messages = parsedData.transcript
          .split(/\s*(user|bot):/)
          .filter(
            (message) =>
              message.replace("user", "").replace("bot", "").trim() !== ""
          )
          .map((message) => message.trim());
        setVisitorConversation(messages);
        setVisitorId(response.data[0].visitorId);
        setSelectedItemId(response.data[0]._id);
        
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

  ////======== conversation throught id   =========//
  const handleShowConversation = async (id, visId, date) => {
    setVisitorId(visId);
    setConversationDate(date);
    setSelectedItemId(id);
    try {
      const response = conversationData.filter((item) => item._id === id);

      if (response.length > 0) {
        const parsedData = JSON.parse(response[0].conversation);
        const messages = parsedData.transcript
          .split(/\s*(user|bot):/)
          .filter(
            (message) =>
              message.replace("user", "").replace("bot", "").trim() !== ""
          )
          .map((message) => message.trim());
        console.log("messagebyid", messages);
        setVisitorConversation(messages);
      } else {
        console.log("No matching conversation found.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header />
      <section class="profile-page pb-5">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-9">
              <div class="heading-profile">
                <h2>Conversation </h2>
              </div>



              <div class="d-flex">
                <div class="first-conversation-list">
                  <div class="coversation-heading">Visitors</div>

                  <div className="chat-scroll">
                    {conversationData.map((item) => (
                      <div
                       key={item._id}
                       className={`padding-namedate d-flex justify-content-between ${
            selectedItemId === item._id ? "highlighted-item" : ""
          }`}
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          handleShowConversation(
                            item._id,
                            item.visitorId,
                            item.createdAt
                          )
                        }
                       
                      >
                        <div className="name-date-conversation" >
                          <h6>{item.visitorId}</h6>
                        </div>
                        <div class="date-conversation">
                          <p>{moment(item.createdAt).format(" D MMM ")}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div class="conversation-chat">
                  <div class="conversation-chat-heading">
                    <h4>{visitorId}</h4>
                  </div>
{
  visitorId ? (
    <div className="chat-scroll">
                    {visitorConversation.map((message, index) => {
                      const isBot = index % 2 === 1;

                      return (
                        <div className="chat-name" key={index}>
                          <div className={isBot ? "ai-chatvisitor" : ""}>
                            {isBot ? (
                              <img src="/images/al-image.png" alt="" />
                            ) : (
                              <h6>Visitor</h6>
                            )}
                          </div>
                          <div className="chat-content-box">
                            <p>{message}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
  ) : (
    <h1
                   className="no-conversation-found"
                  >
                    No Conversation Found
                  </h1>
  )

}

                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Coversation;
