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
import { Padauk } from "next/font/google"
import { create } from "zustand"

export type Item = {
    itemName: string
    price: bigint
    quantity: bigint
    total: bigint
}
export type Receipt = {
    name: string
    items: Item[]
    sharedItems: Item[]
    itemSum: bigint
    tax: bigint
    tip: bigint
    total: bigint
}

export type ReceiptsState = {
    receipts: Receipt[]
    addReceipt: (receipt: Receipt) => void
    clearReceipt: () => void
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
    clearReceipt: () => {
        set(() => {
            return {
                receipts: [],
            }
        })
    },
}))

export default function ReceiptCard(receipt: Receipt) {
    const fees = [
        {
            Name: "Item Sum",
            Price: BigInt(receipt.itemSum),
        },
        {
            Name: "Tax",
            Price: BigInt(receipt.tax),
        },
        {
            Name: "Tip",
            Price: BigInt(receipt.tip),
        },
        {
            Name: "Total",
            Price: BigInt(receipt.total),
            styles: {
                backgroundColor: "#f2f6fd",
                color: "#1567ed",
                padding: "5px",
                borderRadius: "5px",
            },
        },
    ]
    return (
        <Card
            sx={{
                width: "400px",
            }}
        >
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
                        <Avatar {...stringAvatar(receipt.name)} />
                        <Box>
                            <Typography variant="subtitle1">
                                {receipt.name}
                            </Typography>
                            <Typography variant="caption">
                                Thank you!
                            </Typography>
                        </Box>
                    </Box>
                    <Divider />
                    <Typography variant="subtitle1">Items</Typography>
                    {receipt.items.map((item, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Box>
                                <Typography variant="subtitle2">
                                    {item.itemName}
                                </Typography>
                                <Typography variant="caption">
                                    {item.quantity} x ${formatMoney(item.price)}
                                </Typography>
                            </Box>
                            <Typography variant="subtitle2">
                                ${formatMoney(item.total)}
                            </Typography>
                        </Box>
                    ))}
                    <Divider />
                    <Typography variant="subtitle1">Shared Items</Typography>
                    {receipt.sharedItems.map((item, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Box>
                                <Typography variant="subtitle2">
                                    {item.itemName}
                                </Typography>
                                <Typography variant="caption">
                                    {item.quantity} x ${formatMoney(item.price)}
                                </Typography>
                            </Box>
                            <Typography variant="subtitle2">
                                ${formatMoney(item.total)}
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
                                ...fee?.styles,
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
