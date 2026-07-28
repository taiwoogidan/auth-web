import { ProtectedRoute } from "./components/ProtectedRoute";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/Profile";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/profile" element={<ProtectedRoute>
          <Profile />
        </ProtectedRoute>} />
      </Routes>
    </>
  );
}
