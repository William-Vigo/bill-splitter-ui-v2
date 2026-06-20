"use client"
import BillConfig from "@/components/desktop/billConfig"
import theme from "@/components/desktop/theme"
import BillSteps from "@/components/stepper"
import { ThemeProvider } from "@mui/material"

export default function Page() {
    return (
        <ThemeProvider theme={theme}>
            <BillSteps />
        </ThemeProvider>
    )
}
