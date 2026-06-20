import {
    Alert,
    Box,
    Card,
    CardContent,
    Icon,
    InputAdornment,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material"
import MoneySign from "@mui/icons-material/AttachMoneyOutlined"
import TaxIcon from "@mui/icons-material/ReceiptOutlined"
import { NumericFormat } from "react-number-format"
import TipIcon from "@mui/icons-material/MonetizationOnOutlined"
import { useBillStore } from "@/utility/store"
import { useState } from "react"
import { formatMoney } from "@/utility/helpers"

//TODO: validate only number values are inputed into tip and tax fields
export default function AdditionalCharges() {
    const tip = useBillStore((state) => state.tipPaid)
    const tax = useBillStore((state) => state.taxPaid)
    const addTip = useBillStore((state) => state.addTip)
    const addTax = useBillStore((state) => state.addTax)

    const charges = [
        {
            icon: TipIcon,
            name: "Tip",
            value: tip,
            setter: (val: bigint) => {
                addTip(val)
            },
        },
        {
            icon: TaxIcon,
            name: "Tax",
            value: tax,
            setter: (val: bigint) => {
                addTax(val)
            },
        },
    ]

    return (
        <Card
            sx={{
                gridArea: "charges",
            }}
        >
            <CardContent>
                <Stack spacing={2}>
                    <Typography variant="h6">Additional Charges</Typography>
                    <Stack spacing={1}>
                        {charges.map((charge) => (
                            <Box
                                key={charge.name}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                    }}
                                >
                                    <charge.icon />
                                    <Typography variant="body2">
                                        {charge.name}
                                    </Typography>
                                </Box>
                                <NumericFormat
                                    customInput={TextField}
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <MoneySign />
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                    size="small"
                                    placeholder="0.00"
                                    decimalScale={2}
                                    fixedDecimalScale={true}
                                    variant="outlined"
                                    onValueChange={({ value }) => {
                                        const digits = value.replace(/\D/g, "")
                                        charge.setter(BigInt(digits || "0"))
                                    }}
                                    value={formatMoney(charge.value)}
                                />
                            </Box>
                        ))}
                    </Stack>
                    <Alert
                        severity="info"
                        sx={{
                            "& .MuiAlert-message": (theme) =>
                                theme.typography.body2,
                        }}
                    >
                        Tax and tip will be added on top of the items and split
                        among all people.
                    </Alert>
                </Stack>
            </CardContent>
        </Card>
    )
}

/*
Layout:

Card
 └── CardContent
      ├── Typography (title)
      └── Stack
          └── Paper
              └── Stack
                └──Box
                │  ├── Icon
                │  └── Typography
                └── TextField
*/
