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
            <Box>
                <Grid container spacing={2}>
                    <Grid size={4}>
                        <Stack sx={{ gap: 2 }}>
                            <People />
                            <BillSetting />
                        </Stack>
                    </Grid>
                    <Grid size={8}>
                        <BillItemsTable />
                    </Grid>
                    <Grid size={12}>
                        <Summary />
                    </Grid>
                </Grid>
            </Box>
        </ThemeProvider>
    )
}
