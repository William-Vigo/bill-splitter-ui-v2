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
import TipIcon from "@mui/icons-material/MonetizationOnOutlined"
import { useBillStore } from "@/utility/store"
import { useState } from "react"

//TODO: validate only number values are inputed into tip and tax fields
export default function BillSetting() {
    const [tip, setTip] = useState<string>("")
    const [tax, setTax] = useState<string>("")
    const addTip = useBillStore((state) => state.addTip)
    const addTax = useBillStore((state) => state.addTax)

    const charges = [
        {
            icon: TipIcon,
            name: "Tip",
            setter: (val: string) => {
                setTip(val)
                addTip(Number(val))
            },
        },
        {
            icon: TaxIcon,
            name: "Tax",
            setter: (val: string) => {
                setTax(val)
                addTax(Number(val))
            },
        },
    ]

    return (
        <Card sx={{ width: "400px" }}>
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
                                <TextField
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
                                    variant="outlined"
                                    onChange={(e) => {
                                        charge.setter(e.target.value)
                                    }}
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
