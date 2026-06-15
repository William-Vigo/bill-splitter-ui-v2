import { formatMoney } from "@/utility/helpers"
import { Item } from "@/utility/store"
import { InputAdornment, TextField } from "@mui/material"
import { GridRenderCellParams } from "@mui/x-data-grid"
import MoneySign from "@mui/icons-material/AttachMoneyOutlined"
import { NumericFormat } from "react-number-format"

export default function PriceInput(props: GridRenderCellParams<Item, bigint>) {
    console.log("PriceInput render", props.value)
    return (
        <NumericFormat
            customInput={TextField}
            size="small"
            decimalScale={2}
            fixedDecimalScale={true}
            variant="outlined"
            fullWidth
            autoFocus
            allowNegative={false}
            value={formatMoney(BigInt(props.value ?? BigInt(0)))}
            onValueChange={({ value }) => {
                const digits = value.replace(/\D/g, "")
                props.api.setEditCellValue({
                    id: props.id,
                    field: props.field,
                    value: BigInt(digits),
                })
            }}
            sx={{
                fontSize: "inherit",
                "& .MuiFormControl-root": {
                    height: "100%",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                    display: "none",
                },
            }}
        />
    )
}
