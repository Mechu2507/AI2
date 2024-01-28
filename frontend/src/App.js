import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import SignUp from "./pages/SignUpPage";
import Login from "./pages/LoginPage";
import Home from "./pages/HomePage";
import Rent from "./pages/RentPage";
import Profile from "./pages/ProfilePage";
import Dashboard from "./pages/DashboardPage";
import NotFound from "./pages/Page404";
import LoadingSpinner from "./components/ui/loading-spinner";
import useAuthentication from "./useAuthentication";
import BookCars from "./pages/BookCarsPage";
import EmployersView from "./pages/EmployersViewPage";
import EmployerDetail from "./pages/EmployerDetailPage";
import CompleteEmployer from "./pages/Complete_Employer";
import CompleteEmployee from "./pages/Complete_Employee";
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
        <Route path="cars" element={<BookCars />} />
        <Route path="cars/:id" element={<Rent />} />
        <Route path="profile" element={<Profile />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
        <Route path="employers" element={<EmployersView />} />
        <Route path="employers/:id" element={<EmployerDetail />} />
        <Route path="complete_employer" element={<CompleteEmployer />} />
        <Route path="complete_employee" element={<CompleteEmployee />} />
        <Route path="employer_profile" element={<EmployerProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// {isLoggedIn ? <Home /> : <Login />}
