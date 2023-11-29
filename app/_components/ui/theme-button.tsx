'use client'

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

const ThemeButton = () => {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    const isDarkTheme = resolvedTheme === "dark";

    return (
        <button
            aria-label="Toggle Dark Mode"
            type="button"
            className="flex items-center gap-3 justify-center rounded-lg p-2 px-2 transition-colors bg-white dark:bg-zinc-600 relative border"
            onClick={() => setTheme(isDarkTheme ? "light" : "dark")}
        >
            <div className={`h-7 w-7 absolute rounded-md left-1 z-0 transition-all ${isDarkTheme ? "translate-x-[115%] bg-slate-300" : "bg-orange-100"}`} />
            <SunIcon className={`h-5 w-5 z-10 ${isDarkTheme ? "text-slate-300" : "text-orange-400"}`} />
            <MoonIcon className={`h-5 w-5 z-10 ${isDarkTheme ? "text-slate-500" : "text-slate-300"}`} />
        </button>
    )
}

export default ThemeButton