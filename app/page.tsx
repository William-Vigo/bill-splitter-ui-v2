"use client"
import People from "@/components/desktop/people"
import BillItemsTable from "@/components/desktop/data-table/table"
import BillSetting from "@/components/desktop/additionalCharges"
import theme from "@/components/desktop/theme"
import { Box, CssBaseline, Grid, Stack, ThemeProvider } from "@mui/material"
import Summary from "@/components/desktop/summary/summary"

export default function Page() {
    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    height: "100vh",
                    overflow: "hidden",
                }}
            >
                <Box
                    sx={{
                        maxHeight: "100%",
                        minHeight: 0,
                        display: "grid",
                        gridTemplateAreas: `
                          "people table"
                          "charges table"
                          "summary summary"
                        `,
                        gridTemplateColumns: "1fr 2fr",
                        gridTemplateRows: "1fr auto auto",
                        gap: 2,
                    }}
                >
                    <Box
                        sx={{
                            gridArea: "people",
                            overflow: "auto",
                        }}
                    >
                        <People />
                    </Box>
                    <Box
                        sx={{
                            gridArea: "charges",
                        }}
                    >
                        <BillSetting />
                    </Box>
                    <Box
                        sx={{
                            gridArea: "table",
                        }}
                    >
                        <BillItemsTable />
                    </Box>
                    <Box
                        sx={{
                            gridArea: "summary",
                        }}
                    >
                        <Summary />
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    )
}
