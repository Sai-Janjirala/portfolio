import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors relative overflow-hidden group"
            aria-label="Toggle Theme"
        >
            <div className="relative z-10 text-gray-300 group-hover:text-white transition-colors">
                {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
            </div>

            {/* Glow effect */}
            <motion.div
                layoutId="theme-glow"
                className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity"
            />
        </button>
    );
};

export default ThemeToggle;
