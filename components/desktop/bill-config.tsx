import { Box } from "@mui/material"
import AdditionalCharges from "./additionalCharges"
import BillItemsTable from "./data-table/table"
import People from "./people"
import Summary from "./summary/summary"

export default function BillConfig() {
    return (
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
                <People />
                <AdditionalCharges />
                <BillItemsTable />
                <Summary />
            </Box>
        </Box>
    )
}
