'use client'

import React from "react";
import Button from "../ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";

type IProps = {
    lng: string;
    users: IUser[];
};

type IUser = {
    name: string;
    email: string;
    age: number;
    phoneNumber: string;
    language: 'en' | 'ms';
};

const UserTable: React.FC<IProps> = ({ lng, users }) => {

    const router = useRouter();
    const { t } = useTranslation(lng, "dashboard");

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <div className="container overflow-x-auto mx-auto">
                    <table className="text-sm border-separate border-spacing-1 border rounded-lg text-center mx-auto w-full">
                        <thead>
                            <tr>
                                <th className="bg-emerald-50 dark:bg-zinc-700 text-emerald-700 dark:text-zinc-400 py-2 px-4 rounded-tl-md">
                                    {t("name")}
                                </th>
                                <th className="bg-emerald-50 dark:bg-zinc-700 text-emerald-700 dark:text-zinc-400 py-2 px-4">
                                    {t("email-address")}
                                </th>
                                <th className="bg-emerald-50 dark:bg-zinc-700 text-emerald-700 dark:text-zinc-400 py-2 px-4">
                                    {t("age")}
                                </th>
                                <th className="bg-emerald-50 dark:bg-zinc-700 text-emerald-700 dark:text-zinc-400 py-2 px-4">
                                    {t("phone-number")}
                                </th>
                                <th className="bg-emerald-50 dark:bg-zinc-700 text-emerald-700 dark:text-zinc-400 py-2 px-4 rounded-tr-md">
                                    {t("language")}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(({ name, email, age, phoneNumber, language }, index) => (
                                <tr key={`${name}-${index}`}>
                                    <td className="py-2 px-4">{name}</td>
                                    <td className="py-2 px-4">{email}</td>
                                    <td className="py-2 px-4">{age}</td>
                                    <td className="py-2 px-4">{phoneNumber}</td>
                                    <td className="py-2 px-4 uppercase">{language}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                variants={{
                    visible: { opacity: 1, scale: 1 },
                    hidden: { opacity: 0, scale: 0 }
                }}
            >
                <div className="container flex flex-col items-center mx-auto mt-8">
                    <p className="text-sm mb-4">
                        {t("back-to-form-message")}
                    </p>
                    <Button label={t("create-a-user")} onClick={() => router.push("/en")} />
                </div>
            </motion.div>
        </>
    )
};

export default UserTable;