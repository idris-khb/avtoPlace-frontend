import { useState } from "react";
import "./RegisterPage.css";

export default function RegisterPage() {
    const [isLogin, setIsLogin] = useState(true); // true — вход, false — регистрация
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Пожалуйста, заполните все поля");
            return;
        }

        if (!isLogin && password !== confirmPassword) {
            alert("Пароли не совпадают");
            return;
        }

        if (isLogin) {
            console.log("Вход:", { email, password });
            // TODO: вызов login API
        } else {
            console.log("Регистрация:", { email, password });
            // TODO: вызов register API
        }

        // Очистка полей после отправки
        setEmail("");
        setPassword("");
        setConfirmPassword("");
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
                <button type="submit">{isLogin ? "Войти" : "Зарегистрироваться"}</button>
            </form>

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