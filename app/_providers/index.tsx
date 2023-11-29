"use client"

import React, { ReactNode } from "react";
import { FormProvider } from "./form";
import { ThemeProvider } from "next-themes";

type IAppProps = {
    children?: ReactNode;
};

const Providers: React.ComponentType<IAppProps> = ({ children }) => {
    return (
        <FormProvider>
            <ThemeProvider attribute="class">
                {children}
            </ThemeProvider>
        </FormProvider>
    )
};

export default Providers;