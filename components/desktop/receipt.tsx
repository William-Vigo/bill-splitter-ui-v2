import { formatMoney, stringAvatar } from "@/utility/helpers"
import { Receipt } from "@mui/icons-material"
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Divider,
    Stack,
    Typography,
} from "@mui/material"
import { create } from "zustand"

export type Item = {
    Name: string
    Price: bigint
}
export type Receipt = {
    Name: string
    Items: Item[]
    SharedItems: Item[]
    ItemSum: bigint
    Tax: bigint
    Tip: bigint
    Total: bigint
}

export type ReceiptsState = {
    receipts: Receipt[]
    addReceipt: (receipt: Receipt) => void
}

export const useReciptsState = create<ReceiptsState>((set) => ({
    receipts: [],
    addReceipt: (receipt) => {
        set((state) => {
            return {
                receipts: [...state.receipts, receipt],
            }
        })
    },
}))

export default function ReceiptCard(receipt: Receipt) {
    const fees = [
        {
            Name: "Item Sum",
            Price: BigInt(receipt.ItemSum),
        },
        {
            Name: "Tax",
            Price: BigInt(receipt.Tax),
        },
        {
            Name: "Tip",
            Price: BigInt(receipt.Tip),
        },
        {
            Name: "Total",
            Price: BigInt(receipt.Total),
        },
    ]
    return (
        <Card>
            <CardContent>
                <Stack
                    sx={{
                        gap: 1,
                    }}
                >
                    <Typography variant="h6">Receipt</Typography>
                    <Box
                        sx={{
                            display: "flex",
                            gap: 2,
                        }}
                    >
                        <Avatar {...stringAvatar(receipt.Name)} />
                        <Box>
                            <Typography variant="subtitle1">
                                {receipt.Name}
                            </Typography>
                            <Typography variant="caption">
                                Thank you!
                            </Typography>
                        </Box>
                    </Box>
                    <Divider />
                    <Typography variant="subtitle1">Items</Typography>
                    {receipt.Items.map((item, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Box>
                                <Typography variant="subtitle2">
                                    {item.Name}
                                </Typography>
                                <Typography variant="caption">
                                    1 x ${formatMoney(item.Price)}
                                </Typography>
                            </Box>
                            <Typography variant="subtitle2">
                                ${formatMoney(item.Price)}
                            </Typography>
                        </Box>
                    ))}
                    <Divider />
                    <Typography variant="subtitle1">Shared Items</Typography>
                    {receipt.SharedItems.map((item, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Box>
                                <Typography variant="subtitle2">
                                    {item.Name}
                                </Typography>
                                <Typography variant="caption">
                                    1 x ${formatMoney(item.Price)}
                                </Typography>
                            </Box>
                            <Typography variant="subtitle2">
                                ${formatMoney(item.Price)}
                            </Typography>
                        </Box>
                    ))}
                    <Divider />
                    {fees.map((fee, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography variant="subtitle2">
                                {fee.Name}
                            </Typography>
                            <Typography variant="subtitle2">
                                ${formatMoney(fee.Price)}
                            </Typography>
                        </Box>
                    ))}
                </Stack>
            </CardContent>
        </Card>
    )
}
