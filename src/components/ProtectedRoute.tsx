// ProtectedRoute.tsx
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: any) {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/" />;
    }

    return children;
}