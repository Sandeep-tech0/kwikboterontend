import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./Components/Admin/loginPage";
import ProfileAdmin from "./Components/Admin/profileadmin";
import BillingInformation from "./Components/Admin/subscription/billing-information";
import CancelRenewal from "./Components/Admin/subscription/cancel-renewal";
import ChangePassword from "./Components/Admin/change-password";
import Confirm from "./Components/Admin/subscription/confirm";
import Content from "./Components/Admin/content/content";
import ContentHistory from "./Components/Admin/content/content-history";
import Coversation from "./Components/Admin/Conversation";

import FirstTimeSubscription from "./Components/Admin/subscription/FirstTimeSubscription";
import Invoices from "./Components/Admin/subscription/invoices";
import MySubscription from "./Components/Admin/subscription/my-subscribption";
import PaymentInfo from "./Components/Admin/subscription/payment-info";
import PaymentMethod from "./Components/Admin/subscription/PaymentMethod";

import KwikbotAdminPanel from "./Components/SuperAdmin/SuperAdminusers";
import CustomerConversation from "./Components/SuperAdmin/customer-conversation";
import Transaction from "./Components/SuperAdmin/transaction";
import SuperAdminLogin from "./Components/SuperAdmin/superAdminloginPage";
import ForgetPassword from "./Components/Admin/forgotPassword/ForgetPassword";
import ResetPassword from "./Components/Admin/forgotPassword/ResetPassword";
import { RoutesProtected } from "./Components/Admin/ProtectedRotes";
import PayPalButton from "./Components/Admin/subscription/PayPal";
import DayCare from "./Components/PublicPages/daycare";
import Home from "./Components/PublicPages/home";
import PrivacyPolicy from "./Components/PublicPages/privacy-policy";
import FitNess from "./Components/PublicPages/fitness";
import Ecomerce from "./Components/PublicPages/ecomerce";
import Travelling from "./Components/PublicPages/travelling";
import TermsOfUse from "./Components/PublicPages/terms-of-use";
import BookAdemo from "./Components/PublicPages/book-a-demo";




function App() {
  const isUserLoggedIn = !!localStorage.getItem("token");

  return (
    <div>
      <BrowserRouter>
        <Routes>
       
          <Route
            path="/admin/login"
            element={
              isUserLoggedIn ? (
                <Navigate to="/admin/coversation" replace />
              ) : (
                <LoginPage />
              )
            }
          />
          <Route path="/admin/forgotpassword" element={<ForgetPassword />} />
          <Route path="/admin/resetpassword" element={<ResetPassword />} />

          {/* Protected Routes */}

          <>
            <Route
              path="/admin/profile"
              element={<RoutesProtected cmp={ProfileAdmin} />}
            />
            <Route
              path="/admin/billinginformation"
              element={<RoutesProtected cmp={BillingInformation} />}
            />
            <Route
              path="/admin/paymentmethod"
              element={<RoutesProtected cmp={PaymentMethod} />}
            />
            <Route
              path="/admin/cancelrenewal"
              element={<RoutesProtected cmp={CancelRenewal} />}
            />
            <Route
              path="/admin/changepassword"
              element={<RoutesProtected cmp={ChangePassword} />}
            />
            <Route
              path="/admin/confirm"
              element={<RoutesProtected cmp={Confirm} />}
            />
            <Route
              path="/admin/addcontent"
              element={<RoutesProtected cmp={Content} />}
            />
            <Route
              path="/admin/contenthistory"
              element={<RoutesProtected cmp={ContentHistory} />}
            />
            <Route
              path="/admin/coversation"
              element={<RoutesProtected cmp={Coversation} />}
            />

            <Route
              path="/admin/firsttimesubscription"
              element={<RoutesProtected cmp={FirstTimeSubscription} />}
            />
            <Route
              path="/admin/invoices"
              element={<RoutesProtected cmp={Invoices} />}
            />
            <Route
              path="/admin/mysubscribption"
              element={<RoutesProtected cmp={MySubscription} />}
            />
            <Route
              path="/admin/paymentinfo"
              element={<RoutesProtected cmp={PaymentInfo} />}
            />

            <Route
              path="/admin/pay-pal"
              element={
                <RoutesProtected  cmp={PayPalButton} />
              }
            />
           
          </>

          <Route
            path="/superadmin/login"
            element={
              isUserLoggedIn ? (
                <Navigate to="/superadmin/users" replace />
              ) : (
                <SuperAdminLogin />
              )
            }
          />

          <Route
            path="/superadmin/users"
            element={<RoutesProtected cmp={KwikbotAdminPanel} />}
          />
          <Route
            path="/superadmin/transactions"
            element={<RoutesProtected cmp={Transaction} />}
          />
          <Route
            path="/superadmin/customerconversation"
            element={<RoutesProtected cmp={CustomerConversation} />}
          />
          <Route path="/daycare" element={<DayCare />} />
          <Route path="/" element={<Home />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/fitness" element={<FitNess />} />
          <Route path="/ecomerce" element={<Ecomerce />} />
          <Route path="/travelling" element={<Travelling />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/book-a-demo" element={<BookAdemo />} />
        

        </Routes>
        
      </BrowserRouter>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default App;
