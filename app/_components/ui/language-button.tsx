'use client'

import Link from "next/link";
import Dropdown from "./dropdown";
import { useEffect, useState } from "react";
import { languages } from "@/app/i18n/settings";

type IProps = {
    lng: string;
};

const LanguageButton: React.FC<IProps> = ({ lng }) => {

    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])

    if (!mounted) return null;

    return (
        <Dropdown id="language-toggle" position="right" label={lng.toUpperCase()}>
            {languages.map((language) => (
                <Link
                    key={language}
                    href={`/${language}/dashboard`}
                >
                    <button className="w-full text-sm text-black uppercase py-2 hover:bg-emerald-100">
                        {language}
                    </button>
                </Link>
            ))}
        </Dropdown>
        
    )
}

export default LanguageButton