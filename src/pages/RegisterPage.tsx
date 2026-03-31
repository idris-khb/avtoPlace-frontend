import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";
import { registerUser, loginUser } from "../api";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Заполните все поля");
            return;
        }

        if (!isLogin && password !== confirmPassword) {
            setError("Пароли не совпадают");
            return;
        }

        setLoading(true);

        try {
            let data;

            if (isLogin) {
                // 🔐 LOGIN
                data = await loginUser(email, password);
            } else {
                // 🆕 REGISTER
                data = await registerUser(email, password);
            }

            console.log("Успех:", data);

            if (data?.token) {
                // ✅ сохраняем через context
                login({ email }, data.token);

                // 🚀 редирект
                navigate("/");
            } else {
                setError("Не получен токен");
            }

        } catch (err: any) {
            setError(err.message || "Ошибка сервера");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-page">
            <h1>{isLogin ? "Вход" : "Регистрация"}</h1>

            <form onSubmit={handleSubmit} className="register-form">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {!isLogin && (
                    <input
                        type="password"
                        placeholder="Подтвердите пароль"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                )}

                <button type="submit" disabled={loading}>
                    {loading
                        ? "Загрузка..."
                        : isLogin
                            ? "Войти"
                            : "Зарегистрироваться"}
                </button>
            </form>

            {error && <p className="error">{error}</p>}

            <p className="toggle-login">
                {isLogin ? (
                    <>
                        Нет аккаунта?{" "}
                        <span
                            className="link"
                            onClick={() => setIsLogin(false)}
                        >
                            Зарегистрироваться
                        </span>
                    </>
                ) : (
                    <>
                        Уже есть аккаунт?{" "}
                        <span
                            className="link"
                            onClick={() => setIsLogin(true)}
                        >
                            Войти
                        </span>
                    </>
                )}
            </p>
        </div>
    );
}