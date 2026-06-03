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
    <Box sx={{ height: "100vh", overflow: "hidden", p: 2 }}>
      <Box
        sx={{
          height: "100%",
          minHeight: 0,
          display: "grid",
          gridTemplateAreas: `
            "people bill"
            "settings bill"
            "summary summary"
          `,
          gridTemplateColumns: "minmax(0, 420px) minmax(0, 1fr)",
          gridTemplateRows: "minmax(0, 1fr) auto auto",
          gap: 2,
        }}
      >
        <Box sx={{ gridArea: "people", minHeight: 0, overflow: "hidden" }}>
          <People />
        </Box>

        <Box sx={{ gridArea: "settings" }}>
          <BillSetting />
        </Box>

        <Box sx={{ gridArea: "bill", minHeight: 0, overflow: "hidden" }}>
          <BillItemsTable />
        </Box>

        <Box sx={{ gridArea: "summary" }}>
          <Summary />
        </Box>
      </Box>
    </Box>
  </ThemeProvider>
)
}
