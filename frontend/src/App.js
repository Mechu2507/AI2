import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import SignUp from "./pages/SignUpPage";
import Login from "./pages/LoginPage";
import Home from "./pages/HomePage";
import Profile from "./pages/ProfilePage";
import ProfileEmployer from "./pages/ProfilePageEmployer";
import Dashboard from "./pages/DashboardPage";
import NotFound from "./pages/Page404";
import LoadingSpinner from "./components/ui/loading-spinner";
import useAuthentication from "./useAuthentication";
import EmployersView from "./pages/EmployersViewPage";
import EmployerDetail from "./pages/EmployerDetailPage";
import EmployerProfile from "./pages/EmployerProfilePage";

function App() {
  const { isLoggedIn, isLoading } = useAuthentication();

  if (isLoading) return <LoadingSpinner />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile />} />
        <Route path="profile_employer" element={<ProfileEmployer />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
        <Route path="employers" element={<EmployersView />} />
        <Route path="employers/:id" element={<EmployerDetail />} />
        <Route path="employer_profile" element={<EmployerProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// {isLoggedIn ? <Home /> : <Login />}
