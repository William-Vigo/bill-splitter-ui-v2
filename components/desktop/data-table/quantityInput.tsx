import { Item } from "@/utility/store"
import { TextField } from "@mui/material"
import { GridRenderCellParams } from "@mui/x-data-grid"
import { NumericFormat } from "react-number-format"

export default function QuantityInput(
    props: GridRenderCellParams<Item, bigint>
) {
    return (
        <NumericFormat
            customInput={TextField}
            size="small"
            variant="outlined"
            fullWidth
            allowNegative={false}
            decimalScale={0}
            value={String(props.value)}
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
