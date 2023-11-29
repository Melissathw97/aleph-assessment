'use client'

import { useEffect, useState } from "react";
import Button from "../../ui/button";
import { motion } from "framer-motion";
import InputField from "../../ui/input-field";
import { useFormContext } from "@/app/_providers/form";

const FormFirstStep = () => {

    const { formDetails, onStepOneSubmit } = useFormContext();

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    useEffect(() => {
        const { name: formName, email: formEmail } = formDetails;
        setName(formName);
        setEmail(formEmail);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onFormSubmit = (e: React.SyntheticEvent)  => {
        e.preventDefault();
        onStepOneSubmit({ name, email });
    }

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <p className="text-sm md:text-lg text-zinc-600 dark:text-zinc-400 font-bold text-center">
                    Welcome! We&apos;re glad you&apos;re here.
                </p>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            >
                <h1 className="text-2xl md:text-3xl font-bold text-center mt-3">
                    Tell us more about you
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
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

                        <div className='my-6' />

                        <InputField
                            type="email"
                            label="E-mail Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <div className='mt-10 flex justify-center'>
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

export default FormFirstStep;