'use client'

import { useState } from "react";
import ThemeButton from "../ui/theme-button";
import { usePathname } from "next/navigation";
import { motion, Variants } from "framer-motion";
import LanguageButton from "../ui/language-button";
import { CloudIcon, XMarkIcon } from "@heroicons/react/24/solid";

type IProps = {
    lng: string;
};

const itemVariants: Variants = {
    open: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.5 } }
};

export default function MobileHeader({ lng }: IProps) {
    
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <motion.nav
            initial={false}
            animate={isOpen ? "open" : "closed"}
        >
            <header className='p-4 fixed z-50 w-full top-0 left-0 bg-white dark:bg-neutral-900'>
                <nav className='container flex items-center md:justify-between gap-4 mx-auto h-12'>
                    <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setIsOpen(!isOpen)}
                        className='flex flex-col items-center justify-center gap-1.5 h-8 w-8'
                    >
                        <div className='h-0.5 w-4 bg-slate-400' />
                        <div className='h-0.5 w-4 bg-slate-400' />
                    </motion.button>

                    <div className='flex items-center gap-2 text-emerald-700 dark:text-emerald-200 font-semibold'>
                        <CloudIcon className='w-4 h-4' /> Melissa.
                    </div>
                </nav>
            </header>
            <motion.ul
                variants={{
                open: {
                    clipPath: "inset(0% 0% 0% 0%)",
                    transition: {
                    type: "spring",
                    bounce: 0,
                    duration: 0.7,
                    delayChildren: 0.3,
                    staggerChildren: 0.05
                    }
                },
                closed: {
                    clipPath: "inset(10% 50% 90% 50%)",
                    transition: {
                    type: "spring",
                    bounce: 0,
                    duration: 0.3
                    }
                }
                }}
                style={{ pointerEvents: isOpen ? "auto" : "none" }}
                className="md:hidden fixed top-0 left-0 z-50 bg-neutral-100 dark:bg-neutral-900 h-screen w-screen p-7 px-5"
            >
                <motion.li variants={itemVariants}>
                    <div className="flex items-center gap-5 mb-8">
                        <XMarkIcon className="w-6 h-6 text-slate-400" onClick={toggleMenu} />
                        <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-200 font-semibold">
                            <CloudIcon className="w-4 h-4" /> Melissa.
                        </div>
                    </div>
                </motion.li>

                {/dashboard$/.test(pathname) && (
                    <motion.li variants={itemVariants}>
                        <div className="text-sm mb-3 flex justify-between items-center bg-neutral-200 dark:bg-neutral-800 px-4 py-3 rounded-md">
                            <p>Language</p>
                            <LanguageButton lng={lng} />
                        </div>
                    </motion.li>
                )}
                
                <motion.li variants={itemVariants}>
                    <div className="text-sm flex justify-between items-center bg-neutral-200 dark:bg-neutral-800 px-4 py-3 rounded-md">
                        <p>Theme</p>
                        <ThemeButton />
                    </div>
                </motion.li>
            </motion.ul>
        </motion.nav>
    );
}
