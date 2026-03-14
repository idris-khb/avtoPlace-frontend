import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";
import { registerUser, loginUser } from "../api";

export default function RegisterPage() {
    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(true); // true — сначала вход
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
                data = await loginUser(email, password);
            } else {
                data = await registerUser(email, password);
                // после регистрации сразу показываем вход
                setIsLogin(true);
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                return;
            }

            console.log("Успешный вход:", data);

            // Сохраняем токен
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify({ id: data.id, email: data.email }));

            // Редирект на главную страницу
            navigate("/");
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
                    {loading ? "Загрузка..." : isLogin ? "Войти" : "Зарегистрироваться"}
                </button>
            </form>

            {error && <p className="error">{error}</p>}

            <p className="toggle-login">
                {isLogin ? (
                    <>
                        Нет аккаунта?{" "}
                        <span className="link" onClick={() => setIsLogin(false)}>
              Зарегистрироваться
            </span>
                    </>
                ) : (
                    <>
                        Уже есть аккаунт?{" "}
                        <span className="link" onClick={() => setIsLogin(true)}>
              Войти
            </span>
                    </>
                )}
            </p>
        </div>
    );
}