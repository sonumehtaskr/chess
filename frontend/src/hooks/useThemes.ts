import { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";
import type { THEME_CONTEXT } from "@/context/themeContext";

export function useThemeContext() {
    const data = useContext(ThemeContext) as THEME_CONTEXT;
    return data;
}