import * as React from "react";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

type IProps = {
    id: string;
    label: string;
    position: string;
    children: React.ReactNode;
};

const Dropdown: React.FC<IProps> = ({ id, label, position, children }) => {

    const [show, setShow] = useState(false);
    const wrapperRef = useRef(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const element = event.target as HTMLElement;  
            const outsideClicked = (dropdownRef.current && !dropdownRef.current.contains(element)) && (buttonRef.current && !buttonRef.current.contains(element))
            const ctaClicked = (dropdownRef.current && dropdownRef.current.contains(element)) && (element.tagName === "BUTTON");
            
            if (outsideClicked) {
                setShow(false)
            } else if (ctaClicked) {
                setTimeout(() => setShow(false), 200)
            }
        };
        
        document.addEventListener('click', handleClickOutside);
    
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show, dropdownRef, buttonRef]);

    return (
        <div
            ref={wrapperRef}
            className={`relative text-left select-none inline-block`}
        >
            <button
                onClick={() => setShow(!show)}
                type="button"
                id={id ? id : ""}
                aria-expanded="true"
                aria-haspopup="true"
                ref={buttonRef}
                className="flex items-center text-sm rounded-lg p-2 pl-3 gap-1 transition-colors bg-white dark:bg-zinc-600 relative border"
            >
                {label}
                <span className={`ml-2 ${show ? 'rotate-180' : ''} transition-all`}>
                    <ChevronDownIcon className='h-4 w-4 text-slate-500 dark:text-slate-200' />
                </span>
            </button>
            <AnimatePresence initial={false}>
                {!!show && (
                    <motion.div
                        key="menu"
                        ref={dropdownRef}
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { opacity: 1, height: "auto" },
                            collapsed: { opacity: 0, height: 0 },
                        }}
                        transition={{ duration: 0.1 }}
                        style={{ zIndex: 11 }}
                        className={`origin-top-right absolute ${position ? position : "right-0"} min-w-full mt-2 rounded-sm focus:outline-none overflow-hidden bg-white shadow-md ring-1 ring-black ring-opacity-5`}
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="menu-button"
                        tabIndex={-1}
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Dropdown;