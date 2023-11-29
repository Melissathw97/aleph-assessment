'use client'

import React, { Fragment } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/app/i18n/client";

type IProps = {
    lng: string;
    user: IUser;
};

type IUser = {
    name: string;
    email: string;
    age: number;
    phoneNumber: string;
    language: 'en' | 'ms';
};

const UserDetails: React.FC<IProps> = ({ lng, user }) => {

    const { t } = useTranslation(lng, "dashboard");

    return (
        <div className="mb-8">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <p className="text-sm md:text-lg text-zinc-600 dark:text-zinc-400 font-bold text-center">
                    {t("user-details-subtitle")}
                </p>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1, ease: "easeOut" }}
            >
                <h1 className="text-2xl md:text-3xl font-bold text-center mt-3">
                    {t("user-details-title")}
                </h1>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1, ease: "easeOut" }}
            >
                <div className="container mx-auto text-center mt-8 bg-emerald-50 dark:bg-zinc-800 rounded-lg p-4 md:grid md:grid-cols-[47%_47%] md:items-center md:text-left md:gap-x-8 md:gap-y-2">
                    {[
                        { label: "name", value: user?.name },
                        { label: "email-address", value: user?.email },
                        { label: "age", value: user?.age },
                        { label: "phone-number", value: user?.phoneNumber },
                        { label: "language", value: user?.language.toUpperCase() }
                    ].map(({ label, value }, index) => (
                        <Fragment key={label}>
                            <p className="text-xs uppercase mb-1 text-emerald-700 dark:text-zinc-400 md:text-right font-semibold">
                                {t(label)}
                            </p>
                            <p className={`${index > 3 ? "" : "mb-5 md:mb-1"}`}>
                                {value}
                            </p>
                        </Fragment>
                    ))}
                </div>
            </motion.div>

        </div>
    )
};

export default UserDetails;