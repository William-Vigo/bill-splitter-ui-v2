import { Box } from "@mui/material"
import ReceiptCard, { Receipt, useReciptsState } from "./receipt"

export default function ReceiptOverview() {
    const receipts = useReciptsState((state) => state.receipts)
    return (
        <Box
            sx={{
                overflow: "auto",
                gap: 2,
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
            }}
        >
            {receipts.map((receipt, index) => (
                <ReceiptCard key={index} {...receipt} />
            ))}
        </Box>
    )
}
