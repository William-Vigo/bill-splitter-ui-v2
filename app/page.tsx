"use client"
import People from "@/components/desktop/people"
import BillItemsTable from "@/components/desktop/data-table/table"
import AdditionalCharges from "@/components/desktop/additionalCharges"
import theme from "@/components/desktop/theme"
import { Box, CssBaseline, Grid, Stack, ThemeProvider } from "@mui/material"
import Summary from "@/components/desktop/summary/summary"
import BillConfig from "@/components/desktop/bill-config"

export default function Page() {
    return (
        <ThemeProvider theme={theme}>
            <BillConfig />
        </ThemeProvider>
    )
}
