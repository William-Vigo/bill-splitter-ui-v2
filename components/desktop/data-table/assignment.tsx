import { stringToColor } from "@/utility/helpers"
import { Item, useBillStore } from "@/utility/store"
import { Autocomplete, Chip, TextField } from "@mui/material"
import {
    GridActionsCell,
    GridActionsCellItem,
    GridRenderCellParams,
} from "@mui/x-data-grid"

export default function Assignment(
    props: GridRenderCellParams<Item, string[]>
) {
    const party = useBillStore((state) => state.party)
    return (
        <Autocomplete
            fullWidth
            multiple
            options={party}
            value={props.value}
            onChange={(_, newValue) => {
                props.api.setEditCellValue({
                    id: props.id,
                    field: props.field,
                    value: newValue,
                })
            }}
            renderValue={(value: readonly string[], getItemProps) =>
                value.map((option: string, index: number) => {
                    const { key, ...itemProps } = getItemProps({ index })
                    return (
                        <Chip
                            label={option}
                            key={key}
                            sx={{
                                color: "white",
                                background: stringToColor(option),
                            }}
                            {...itemProps}
                        />
                    )
                })
            }
            renderInput={(params) => (
                <TextField
                    {...params}
                    placeholder="People"
                    slotProps={{
                        ...params.slotProps,
                        input: {
                            ...params.slotProps.input,
                            autoFocus: true,
                        },
                    }}
                />
            )}
            sx={{
                overflow: "auto",
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
