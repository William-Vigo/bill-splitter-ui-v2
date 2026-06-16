"use client"
import BillConfig from "@/components/desktop/billConfig"
import theme from "@/components/desktop/theme"
import { ThemeProvider } from "@mui/material"

export default function Page() {
    return (
        <ThemeProvider theme={theme}>
            <BillConfig />
        </ThemeProvider>
    )
}
