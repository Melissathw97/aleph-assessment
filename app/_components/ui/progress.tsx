import React from "react";

type IProps = {
    totalSteps: number;
    currentStep: number;
}

const ProgressBar: React.FC<IProps> = ({ totalSteps, currentStep }) => {
    const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

    return (
        <div className="w-full relative flex items-center h-8 max-w-md mx-auto">
            <div className="absolute h-1 bg-zinc-100 dark:bg-zinc-600 w-full rounded-lg" />
            <div
                className="absolute h-1 bg-emerald-600 dark:bg-emerald-200 rounded-lg transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
            />
        </div>
    )
};

export default ProgressBar;