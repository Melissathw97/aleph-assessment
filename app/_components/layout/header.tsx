'use client'

import ThemeButton from "../ui/theme-button";
import { usePathname } from "next/navigation";
import LanguageButton from "../ui/language-button";
import { CloudIcon } from "@heroicons/react/24/solid";

type IProps = {
    lng: string;
}

const Header: React.FC<IProps> = ({ lng }) => {

    const pathname = usePathname();

    return (
        <>
            <header className='p-4 fixed z-50 w-full top-0 left-0 bg-white dark:bg-neutral-900'>
                <nav className='container flex items-center md:justify-between gap-4 mx-auto h-12'>
                    <div className='flex items-center gap-2 text-emerald-700 dark:text-emerald-200 font-semibold'>
                        <CloudIcon className='w-4 h-4' /> Melissa.
                    </div>

                    <div className='hidden md:flex gap-3'>
                        {/dashboard$/.test(pathname) && <LanguageButton lng={lng} />}
                        <ThemeButton />
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Header