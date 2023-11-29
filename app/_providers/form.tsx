import React, { ReactNode, createContext, useState, useContext } from 'react';

type Props = {
    children?: ReactNode;
}

type IFormDetails = {
    name: string;
    email: string;
    age: number;
    phoneNumber: string;
    language: string;
};

type IFormContext = {
    formStep: number;
    formDetails: IFormDetails,
    onStepOneSubmit: ({ name, email }: { name: string; email: string; }) => void;
    onStepTwoBack: ({ age, phoneNumber }: { age: number; phoneNumber: string; }) => void;
    onStepTwoSubmit: ({ age, phoneNumber }: { age: number; phoneNumber: string; }) => void;
    onStepThreeBack: ({ language }: { language: string }) => void;
    onStepThreeSubmit: ({ language }: { language: string }) => Promise<void>;
};

const initialState = {
    formStep: 1,
    formDetails: { name: "", email: "", age: 0, phoneNumber: "", language: "en" },
    onStepOneSubmit: () => {},
    onStepTwoBack: () => {},
    onStepTwoSubmit: () => {},
    onStepThreeBack: () => {},
    onStepThreeSubmit: () => new Promise<any>((resolve) => resolve({ json: () => JSON.stringify({}) })),
}

const FormContext = createContext<IFormContext>(initialState);

export const FormProvider: React.FC<Props> = ({ children }) => {

    const [formStep, setFormStep] = useState<number>(1);
    const [formDetails, setFormDetails] = useState<IFormDetails>({
        name: "",
        email: "",
        age: 0,
        phoneNumber: "",
        language: "en"
    });

    const nextStep = () => setFormStep(formStep + 1);
    const previousStep = () => setFormStep(formStep - 1);

    const onStepOneSubmit = ({ name, email } : { name: string, email: string }) => {
        setFormDetails({ ...formDetails, name, email });
        nextStep();
    };

    const onStepTwoSubmit = ({ age, phoneNumber } : { age: number, phoneNumber: string }) => {
        setFormDetails({ ...formDetails, age, phoneNumber });
        nextStep();
    };

    const onStepTwoBack = ({ age, phoneNumber } : { age: number, phoneNumber: string }) => {
        setFormDetails({ ...formDetails, age, phoneNumber });
        previousStep();
    };

    const onStepThreeBack = ({ language } : { language: string }) => {
        setFormDetails({ ...formDetails, language });
        previousStep();
    };

    const onStepThreeSubmit = ({ language } : { language: string }) => {
        setFormDetails({ ...formDetails, language });
        
        return fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ ...formDetails }),
        })
            .then(() => {
                setFormDetails({ name: "", email: "", age: 0, phoneNumber: "", language: "en" })
                setFormStep(1);
            })
    };

    return (
        <FormContext.Provider value={{
            formStep, formDetails, onStepOneSubmit,
            onStepTwoBack, onStepTwoSubmit,
            onStepThreeBack, onStepThreeSubmit
        }}>
            {children}
        </FormContext.Provider>
    )
};

export const useFormContext = () => useContext(FormContext);