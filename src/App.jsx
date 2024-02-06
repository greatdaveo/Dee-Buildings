import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SharedLayout from "./components/SharedLayout";
import HomePage from "./pages/HomePage";
import Register from "./pages/RegisterPage";
import LogoutPage from "./pages/LogoutPage";
import AboutPage from "./pages/AboutPage";
import Header from "./components/homepage/Header";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./components/routes/PrivateRoute";
import ProfilePage from "./pages/ProfilePage";
import CreateListingPage from "./pages/CreateListingPage";
import UpdateListingPage from "./pages/UpdateListingPage";

export default function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/about" element={<AboutPage />} />

          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/create-listing" element={<CreateListingPage />} />
            <Route
              path="/update-listing/:listingId"
              element={<UpdateListingPage />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

