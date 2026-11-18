
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Doctors from "../pages/Doctors";
import DoctorDetails from "../pages/DoctorDetails";
import AddDoctor from "../pages/AddDoctor";
import EditDoctor from "../pages/EditDoctor";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Favorites from "../pages/Favorites";
import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {
    return (
        <Routes>

            <Route
                path="/"
                element={<Home />}
            />

            <Route
                path="/doctors"
                element={<Doctors />}
            />

            <Route
                path="/doctors/:id"
                element={<DoctorDetails />}
            />

            <Route
                path="/add-doctor"
                element={
                    <ProtectedRoute>
                        <AddDoctor />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/edit-doctor/:id"
                element={<EditDoctor />}
            />

            <Route
                path="/favorites"
                element={<Favorites />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/logout"
                element={<Logout />}
            />

        </Routes>
    );
}

export default AppRoutes;
