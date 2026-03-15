import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { Provider } from "react-redux";
import { persistor, store } from "./Redux/Store/Store";
import { PersistGate } from "redux-persist/integration/react";
import AuthGuard from "./protector/AuthGuard";
import DashboardLayout from "./pages/DashboardLayout";
import ResetPassword from "./pages/ResetPassword";
import ForgetPassword from "@/pages/ForgetPassword";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    window.focus();
  }, []);

  return (
    <Router>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <div className="h-screen flex flex-col overflow-hidden bg-green-5 0">
            <div className="flex-1 overflow-hidden relative">
              <Routes>
                {/* Public Routes */}
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<Login />} />
                <Route path="/Forget-Password" element={<ForgetPassword />} />
                <Route path='/Reset/:Token' element={<ResetPassword />} />

                {/* Setup Routes */}

                {/* Protected Dashboard Routes */}
                <Route path="/Dashboard/" element={<DashboardLayout />} >
                  <Route index element={<Dashboard />} />
                </Route>
              </Routes>
            </div>
          </div>
        </PersistGate>
      </Provider>
    </Router>
  );
};

export default App;
