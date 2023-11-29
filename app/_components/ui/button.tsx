'use client'

import Link from "next/link";

type IProps = {
    type?: 'button' | 'submit' | 'reset';
    label: string;
    href?: string;
    onClick?: () => void;
}

const Button: React.FC<IProps> = ({ type, label, href, onClick }) => {
    if (href) {
        return (
            <Link href={href}>
                <button
                    type={type}
                    className='text-sm flex items-center gap-3 justify-center rounded-lg p-2 px-4 transition-colors bg-emerald-600 text-white dark:bg-emerald-600 relative'
                >
                    {label}
                </button>
            </Link>
        )
    }

    return (
        <button
            type={type}
            onClick={onClick}
            className='text-sm flex items-center gap-3 justify-center rounded-lg p-2 px-4 transition-colors bg-emerald-600 text-white dark:bg-emerald-600 relative'
        >
            {label}
        </button>
    )
}

export default Button