import { useBillStore } from "@/utility/store"
import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Typography,
} from "@mui/material"
import { props, Blocks } from "./blocks"
import TaxIcon from "@mui/icons-material/ReceiptOutlined"
import TipIcon from "@mui/icons-material/MonetizationOnOutlined"
import GrandTotalIcon from "@mui/icons-material/CreditCardOutlined"
import ItemsTotalIcon from "@mui/icons-material/ShoppingCartOutlined"
import { formatMoney } from "@/utility/helpers"
import { useStepper } from "@/components/stepper"

export default function Summary() {
    const tax = useBillStore((state) => state.taxPaid)
    const tip = useBillStore((state) => state.tipPaid)
    const items = useBillStore((state) => state.items)
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
    const handleClick = () => {
        // TODO: call server and store it in receipt state
        updateStep()
    }
    return (
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
                <Button onClick={handleClick} variant="contained">
                    Calculate Split
                </Button>
            </CardContent>
        </Card>
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
