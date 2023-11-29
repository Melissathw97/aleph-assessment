'use client'

import { useEffect, useState } from "react";
import Button from "../../ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import SelectField from "../../ui/select-field";
import { languages } from "@/app/i18n/settings";
import { useFormContext } from "@/app/_providers/form";

const FormThirdStep = () => {

    const { formDetails, onStepThreeBack, onStepThreeSubmit, resetForm } = useFormContext();

    const router = useRouter();
    const [language, setLanguage] = useState<string>("en");

    useEffect(() => {
        const { language: formLanguage } = formDetails;
        setLanguage(formLanguage);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onBackClick = () => {
        onStepThreeBack({ language });
    };

    const onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onStepThreeSubmit({ language })
            .then(() => {
                router.push(`/${language}/dashboard`);
                setTimeout(() => resetForm(), 1000);
            });
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <p className='text-sm md:text-lg text-zinc-600 dark:text-zinc-400 font-bold text-center'>
                    Last Step!
                </p>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            >
                <h1 className='text-2xl md:text-3xl font-bold text-center mt-3'>
                    Pick a language you prefer.
                </h1>
            </motion.div>
            <div className='mt-10 max-w-lg mx-auto'>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
                >
                    <form onSubmit={onFormSubmit}>
                        <SelectField
                            label="Language"
                            value={language}
                            options={languages.map(language => ({
                                label: language === "en" ? "English" : "Malay",
                                value: language
                            }))}
                            onChange={(e) => setLanguage(e.target.value)}
                            required
                        />

                        <div className='mt-10 flex gap-6 justify-center'>
                            <Button
                                type="button"
                                label="Back"
                                onClick={onBackClick}
                            />

                            <Button
                                type="submit"
                                label="Submit"
                            />
                        </div>
                    </form>
                </motion.div>
            </div>
        </>
    )
};

export default FormThirdStep;