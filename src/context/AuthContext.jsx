import { createContext, useContext, useReducer, useState } from 'react';

const AuthContext = createContext();

//reducer fx
const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            localStorage.setItem("userData", JSON.stringify({ user: action.user, isAuthenticated: true }))
            return { user: action.user, isAuthenticated: true }

        case "LOGOUT":
            localStorage.removeItem("userData");
            return { user: null, isAuthenticated: false }

        default:
            return state;
    }
}

export const AuthProvider = ({ children }) => {
    // check from localstorage first
    const storedAuth = JSON.parse(localStorage.getItem("userData"));

    // reducer for custom state change
    const [state, dispatch] = useReducer(authReducer, { ...storedAuth })

    const login = (user) => {
        dispatch({ type: "LOGIN", user: user })
    }

    const logout = () => {
        dispatch({ type: "LOGOUT" })
    }

    return (
        <AuthContext.Provider value={{ login, logout, ...state }} >
            {children}
        </AuthContext.Provider>
    )
}

// custom hook for direct access
export const useAuth = () => {
    return useContext(AuthContext);
}

