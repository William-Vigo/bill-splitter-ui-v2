"use client"
import { CheckBox } from "@mui/icons-material"
import {
    DataGrid,
    GridRowsProp,
    GridColDef,
    GridRenderCellParams,
} from "@mui/x-data-grid"
import Delete from "./delete"
import { Item, useBillStore } from "@/utility/store"
import {
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    Chip,
    Stack,
    Typography,
} from "@mui/material"
import Assignment from "./assignment"
import PriceInput from "./priceInput"
import QuantityInput from "./quantityInput"
import { formatMoney, stringToColor } from "@/utility/helpers"

const columns: GridColDef<Item>[] = [
    {
        field: "item",
        headerName: "Item",
        editable: true,
        description: "Name of the item",
        disableColumnMenu: true,
    },
    {
        field: "quantity",
        headerName: "Quantity",
        editable: true,
        renderCell: (params: GridRenderCellParams<Item, bigint>) => {
            return <>x{params.value}</>
        },
        renderEditCell: (props: GridRenderCellParams<Item, bigint>) => {
            return <QuantityInput {...props} />
        },
        description: "Quantity of the item",
        sortable: false,
        disableColumnMenu: true,
    },
    {
        field: "price",
        headerName: "Price",
        editable: true,
        renderCell: (params: GridRenderCellParams<Item, bigint>) => {
            return <>${formatMoney(params.value ?? BigInt(0))}</>
        },
        renderEditCell: (props: GridRenderCellParams<Item, bigint>) => {
            return <PriceInput {...props} />
        },
        description: "Price of the item",
        sortable: false,
        disableColumnMenu: true,
    },
    {
        // TODO: if "person" has been deleted make sure to update other props where that person is referenced
        field: "assignedTo",
        headerName: "Assigned To",
        description:
            "People who have purchased/split the item, if the item is not marked as 'Shared' the number of assigned people needs to be 1 or equal to the quantity of the item",
        sortable: false,
        disableColumnMenu: true,
        renderCell: (props: GridRenderCellParams<Item, string[]>) => {
            const values = Array.isArray(props.value) ? props.value : []
            return (
                <Box
                    sx={{
                        overflow: "auto",
                        display: "flex",
                        height: "100%",
                    }}
                >
                    <Stack
                        sx={{
                            gap: 1,
                            display: "flex",
                            alignItems: "center",
                        }}
                        direction={"row"}
                    >
                        {values?.map((name) => {
                            return (
                                <Chip
                                    key={name}
                                    label={name}
                                    sx={{
                                        background: stringToColor(name),
                                        color: "white",
                                    }}
                                />
                            )
                        })}
                    </Stack>
                </Box>
            )
        },
        renderEditCell: (props: GridRenderCellParams<Item, string[]>) => {
            return <Assignment {...props} />
        },
        editable: true,
        flex: 1,
    },
    {
        field: "isShared",
        headerName: "Shared",
        type: "boolean",
        editable: true,
        disableColumnMenu: true,
    },
    {
        field: "action",
        headerName: "Actions",
        type: "actions",
        sortable: false,
        disableColumnMenu: true,
        renderCell: (props: GridRenderCellParams<Item, unknown>) => {
            return <Delete {...props} />
        },
    },
]

export default function BillItemsTable() {
    const updateItem = useBillStore((state) => state.updateItem)
    const addItem = useBillStore((state) => state.addItem)
    const deleteItem = useBillStore((state) => state.deleteItem)
    const rows = useBillStore((state) => state.items)
    return (
        <Card
            sx={{
                height: "100%",
                minHeight: 0,
                display: "flex",
                flexDirection: "column",
                gridArea: "table",
            }}
        >
            <CardContent
                sx={{
                    flex: 1,
                    minHeight: 0,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Stack
                    spacing={2}
                    sx={{
                        flex: 1,
                        minHeight: 0,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Box sx={{ gap: 2 }}>
                            <Typography variant="h6">Bill Items</Typography>
                            <Typography variant="caption">
                                Add all items in the bill along with their
                                prices.
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                gap: 2,
                            }}
                        >
                            <Button
                                size="medium"
                                variant="outlined"
                                onClick={() => {
                                    rows.map((item) => {
                                        deleteItem(item.id)
                                    })
                                }}
                            >
                                Clear All
                            </Button>
                            <Button
                                size="medium"
                                variant="contained"
                                onClick={() => {
                                    addItem({
                                        id: crypto.randomUUID(),
                                        item: "",
                                        quantity: BigInt(0),
                                        price: BigInt(0),
                                        assignedTo: [],
                                        isShared: false,
                                        _isDraft: true,
                                    })
                                }}
                            >
                                Add item
                            </Button>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            flex: 1,
                            minHeight: 0,
                        }}
                    >
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            processRowUpdate={(updated, original) => {
                                updated._isDraft = false
                                updateItem(updated)
                                return updated
                            }}
                        />
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    )
}
