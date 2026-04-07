import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    // Check local storage or system preference, default to dark
    const [theme, setTheme] = useState(() => {
        if (typeof window !== "undefined" && localStorage.getItem("theme")) {
            return localStorage.getItem("theme");
        }
        return "dark"; // Default to dark as per user request
    });

    useEffect(() => {
        const root = window.document.documentElement;

        // Remove old class
        root.classList.remove("light", "dark");

        // Add new class
        root.classList.add(theme);

        // Save to local storage
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
