import Store from "./store";

export default class ApiService {
    _apiBase = 'http://localhost:5000/api/';

    async postLogin(email, password) {
        const res = await fetch(`${this._apiBase}auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })

        if (!res.ok) {
            throw new Error(res.status);
        }

        return await res.json();
    }

    async postRegister(email, password) {
        const res = await fetch(`${this._apiBase}auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })

        if (!res.ok) {
            throw new Error(res.status);
        }

        return await res.json();
    }

    
    async getTodos (token) {
        const res = await fetch("http://localhost:5000/api/todos", {
            method: "GET",
            headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
        })

        if (!res.ok) {
            throw new Error(res.status);
        }

        return await res.json();
    }
}
