'use client'

import { useEffect, useState } from "react";
import Button from "../../ui/button";
import { motion } from "framer-motion";
import InputField from "../../ui/input-field";
import { useFormContext } from "@/app/_providers/form";

const FormSecondStep = () => {

    const { formDetails, onStepTwoBack, onStepTwoSubmit } = useFormContext();

    const [age, setAge] = useState<number>(0);
    const [phoneNumber, setPhoneNumber] = useState<string>('');

    useEffect(() => {
        const { age: formAge, phoneNumber: formPhoneNumber } = formDetails;
        setAge(formAge);
        setPhoneNumber(formPhoneNumber);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onBackClick = () => {
        onStepTwoBack({ age, phoneNumber });
    };

    const onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onStepTwoSubmit({ age, phoneNumber });
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <p className='text-sm md:text-lg text-zinc-600 dark:text-zinc-400 font-bold text-center'>
                    It&apos;s nice to meet you, {formDetails.name}.
                </p>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            >
                <h1 className='text-2xl md:text-3xl font-bold text-center mt-3'>
                    Just a few more details before we&apos;re done
                </h1>
            </motion.div>
            <div className='mt-10 max-w-lg mx-auto'>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
                >
                    <form onSubmit={onFormSubmit}>
                        <InputField
                            type="number"
                            label="Age"
                            value={age || ""}
                            onChange={(e) => setAge(parseInt(e.target.value))}
                            required
                        />

                        <div className='my-6' />

                        <InputField
                            label="Phone Number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
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
                                label="Next"
                            />
                        </div>
                    </form>
                </motion.div>
            </div>
        </>
    )
};

export default FormSecondStep;