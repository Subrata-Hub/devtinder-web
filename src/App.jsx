import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Request from "./components/Request";
import ContactUs from "./components/ContactUs";
import CancellationAndRefund from "./components/CancellationAndRefund";
import PrivacyPolicy from "./components/PrivacyPolicy";
import ShippingAndDelivery from "./components/ShippingAndDelivery";
import TermsAndConditions from "./components/TermsAndConditions";
import Premium from "./components/Premium";
import OrderConformation from "./components/OrderConformation";
// import OrderConformation from "./components/OrderConformation";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/connections/request" element={<Request />} />
              <Route path="/premium" element={<Premium />} />
              <Route
                path="/payment/complete-order/:orderId"
                element={<OrderConformation />}
              />
              <Route path="/payment/cancel-order" element={<Premium />} />

              <Route path="/contactus" element={<ContactUs />} />
              <Route
                path="/concellationsandrefund"
                element={<CancellationAndRefund />}
              />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route
                path="/shippinganddelivery"
                element={<ShippingAndDelivery />}
              />
              <Route
                path="/termsandcondition"
                element={<TermsAndConditions />}
              />
            </Route>
            {/* <Route path="/profile" element={<div>Profile Page</div>} />
          <Route path="/connections" element={<div>Connection Page</div>} /> */}
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
