'use client'

import { useFormContext } from "@/app/_providers/form";
import FormFirstStep from "./steps/first-step";
import FormSecondStep from "./steps/second-step";
import FormThirdStep from "./steps/third-step";
import ProgressBar from "../ui/progress";

const UserForm = () => {

    const { formStep } = useFormContext();

    return (
        <>
            <ProgressBar totalSteps={3} currentStep={formStep} />

            <div className="my-6" />

            {formStep === 3 ?
                <FormThirdStep /> :
                formStep === 2 ?
                    <FormSecondStep /> :
                    <FormFirstStep />
            }
        </>
    )
};

export default UserForm;