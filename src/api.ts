export const API_BASE = "http://localhost:8080"; // API Gateway

// src/api.ts
export const registerUser = async (email: string, password: string) => {
    const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Ошибка регистрации");
    }

    return res.json(); // обычно возвращает объект пользователя или токен
};

export const loginUser = async (email: string, password: string) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Ошибка входа");
    }

    return res.json(); // обычно возвращает объект пользователя или токен
};