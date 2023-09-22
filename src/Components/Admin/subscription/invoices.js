import { useState, useEffect } from "react";
import Header from "../header";
import SubscribptionHeader from "./subscribptionHeader";
import { invoicesdata } from "../../../Services/Admin/subscriptionApiCall";
import moment from "moment";
const Invoices = () => {
  const clientId = localStorage.getItem("clientId");
  const heigth = {
    height: "100vh",
  };
  const [invoicesData, setInvoicesData] = useState([]);
  useEffect(() => {
    handleInvoicesData();
  }, []);
  ///========= =  handle invoice data  ===========================
  const handleInvoicesData = async () => {
    try {
      const response = await invoicesdata(clientId);

      if (response.success) {
        if (response.data.length == 0) {
          setInvoicesData(0);
        } else {
          setInvoicesData(response.data);
        }
      } else {
        console.error("Error fetching invoices data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching invoices data:", error);
    }
  };

  return (
    <div>
      <Header />
      <section class="profile-page" style={heigth}>
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-6">
              <SubscribptionHeader />
            </div>
            <div class="col-lg-9">
              <div class="profile-card p-0 box-border-left">
                <table class="table">
                  <thead>
                    <tr class="light-blue">
                      <th scope="col" class="box-border-left">
                        Product
                      </th>
                      <th scope="col">Reference</th>
                      <th scope="col">Date</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Status</th>
                      <th scope="col" class="box-border-right">
                        Download
                      </th>
                    </tr>
                  </thead>
                  <tbody class="pb-5">
                    {invoicesData ? (
                      <>
                        {invoicesData &&
                          invoicesData.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>{item.title}</td>
                                <td>{item.invoiceNumber}</td>
                                <td>
                                  {moment(item.invoiceDate).format("DD-MM-YY")}
                                </td>
                                <td>{item.amount}</td>
                                <td className="text-center">
                                  {item.paidStatus ? (
                                    <a>
                                      <img
                                        src="/images/done-image.png"
                                        alt="Paid"
                                      />
                                    </a>
                                  ) : (
                                    <a>
                                      <img
                                        src="/images/cancel-image.png"
                                        alt="Not Paid"
                                      />
                                    </a>
                                  )}
                                </td>

                                {/* to download the item.pdfPath */}
                                <td className="text-center">
                                  <a
                                    href={
                                      process.env.REACT_APP_FILE_URL +
                                      item.invoicePdfPath
                                    }
                                    download
                                    target="blank"
                                  >
                                    <img src="/images/download-images.png" />
                                  </a>
                                </td>
                              </tr>
                            );
                          })}
                      </>
                    ) : (
                      <tr>
                        <td colSpan="6">
                          <div className="text-center-invoice">
                            <h4>No Invoices Found</h4>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Invoices;
