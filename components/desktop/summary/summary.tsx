import { BillState, isItemValid, Item, useBillStore } from "@/utility/store"
import {
    Alert,
    AlertTitle,
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Snackbar,
    SnackbarCloseReason,
    Typography,
} from "@mui/material"
import { props, Blocks } from "./blocks"
import TaxIcon from "@mui/icons-material/ReceiptOutlined"
import TipIcon from "@mui/icons-material/MonetizationOnOutlined"
import GrandTotalIcon from "@mui/icons-material/CreditCardOutlined"
import ItemsTotalIcon from "@mui/icons-material/ShoppingCartOutlined"
import { formatMoney } from "@/utility/helpers"
import { useStepper } from "@/components/stepper"
import { Receipt, useReciptsState } from "../receipt"
import { GetSplit } from "@/utility/processSplit"
import { getPayloadFromBillStore } from "./helper"
import React from "react"

export default function Summary() {
    const [open, setOpen] = React.useState<boolean>(false)
    const handleClick = () => {
        setOpen(true)
    }
    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason
    ) => {
        if (reason === "clickaway") {
            return
        }
        setOpen(false)
    }
    const store = useBillStore()
    const tax = useBillStore((state) => state.taxPaid)
    const tip = useBillStore((state) => state.tipPaid)
    const items = useBillStore((state) => state.items)
    const updateItem = useBillStore((state) => state.updateItem)
    let itemTotal: bigint = BigInt(0)
    items.forEach((item) => {
        itemTotal += item.quantity * item.price
    })
    const total = tax + tip + itemTotal
    const blocks: props[] = [
        {
            icon: ItemsTotalIcon,
            iconColor: "#2563EB",
            backgroundColor: "#E8F1FF",
            title: "Items Total",
            value: formatMoney(itemTotal),
        },
        {
            icon: TaxIcon,
            iconColor: "#22C55E",
            backgroundColor: "#EAF7EE",
            title: "Tax",
            value: formatMoney(tax),
        },
        {
            icon: TipIcon,
            iconColor: "#8B5CF6",
            backgroundColor: "#F3E8FF",
            title: "Tip",
            value: formatMoney(tip),
        },
    ]
    const updateStep = useStepper((state) => state.incrementStep)
    const addReceipt = useReciptsState((state) => state.addReceipt)
    const handleSplit = async () => {
        let shouldProcess = true
        if (items.length === 0) {
            setOpen(true)
            return
        }
        items.forEach((item) => {
            if (!isItemValid(item)) {
                item._isValid = false
                updateItem(item)
                shouldProcess = false
            }
        })
        if (!shouldProcess) {
            setOpen(true)
            return
        }
        const data = getPayloadFromBillStore(store)
        const receipts = await GetSplit(data)
        if (BigInt(receipts.billTotal) !== total) {
            console.log("UI 'total' does not match server calculated 'total'")
            console.log("ui total: ", total)
            console.log("server Total: ", receipts.billTotal)
            console.log("data: ", receipts)
            return
        }
        receipts.people.forEach((receipt) => {
            addReceipt(receipt)
        })
        updateStep()
    }
    return (
        <>
            <Card
                sx={{
                    gridArea: "summary",
                }}
            >
                <CardContent
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="h6">Summary</Typography>
                    {blocks.map((block) => (
                        <Blocks
                            key={block.title}
                            icon={block.icon}
                            iconColor={block.iconColor}
                            backgroundColor={block.backgroundColor}
                            title={block.title}
                            value={"$" + String(block.value)}
                        />
                    ))}
                    <Divider orientation="vertical" flexItem />
                    <Blocks
                        icon={GrandTotalIcon}
                        iconColor="#6B7280"
                        backgroundColor="#F3F4F6"
                        title="Grand Total"
                        value={"$" + formatMoney(total)}
                    />
                    <Button
                        variant="contained"
                        onClick={() => {
                            handleSplit()
                        }}
                    >
                        Calculate Split
                    </Button>
                </CardContent>
            </Card>
            <Snackbar
                open={open}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="standard"
                    sx={{ width: "100%" }}
                >
                    <AlertTitle>Invalid Items Setup</AlertTitle>
                    <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
                        <li>At least 1 item needs to be defined</li>
                        <li>
                            Every item needs a name, a quantity, and at least
                            one person assigned to it
                        </li>
                        <li>
                            If an item isn&apos;t shared, assign it to exactly
                            one person, or to as many people as the quantity
                            (e.g. 3 sodas → 3 people, one each)
                        </li>
                    </ul>
                </Alert>
            </Snackbar>
        </>
    )
}

/*
Layout:

Card
 └── CardContent
      ├── Typography (title)
      ├── Typography (subtitle)
      ├── Stack
      │    ├── TextField
      │    └── Button
      ├── List
      │    ├── ListItem
      │    │    ├── Avatar
      │    │    ├── Typography
      │    │    └── IconButton
      │    └── ...
      └── Box
           ├── GroupsIcon
           └── Typography
*/
