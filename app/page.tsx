"use client"
import People from "@/components/desktop/people"
import BillItemsTable from "@/components/desktop/data-table/table"
import BillSetting from "@/components/desktop/additionalCharges"
import theme from "@/components/desktop/theme"
import { Box, CssBaseline, ThemeProvider } from "@mui/material"
import Summary from "@/components/desktop/summary/summary"

export default function Page() {
    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                }}
            >
                <People />
                <BillSetting />
                <BillItemsTable />
                <Summary />
            </Box>
        </ThemeProvider>
    )
}
