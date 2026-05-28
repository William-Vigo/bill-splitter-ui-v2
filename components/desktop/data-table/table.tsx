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
    Stack,
    Typography,
} from "@mui/material"
import Assignment from "./assignment"

const columns: GridColDef<Item>[] = [
    { field: "item", headerName: "Item", editable: true },
    {
        field: "quantity",
        headerName: "Quantity",
        type: "number",
        editable: true,
    },
    { field: "price", headerName: "Price", type: "number", editable: true },
    {
        field: "assignedTo",
        headerName: "Assigned To",
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
    },
    {
        field: "action",
        headerName: "Actions",
        type: "actions",
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
        <>
            <Card>
                <CardContent>
                    <Stack spacing={2}>
                        <Box>
                            <Typography variant="h6">Bill Items</Typography>
                            <Typography variant="caption">
                                Add all items in the bill along with their
                                prices.
                            </Typography>
                            <Button
                                onClick={() => {
                                    rows.map((item) => {
                                        deleteItem(item.id)
                                    })
                                }}
                            >
                                Clear All
                            </Button>
                            <Button
                                onClick={() => {
                                    addItem({
                                        id: crypto.randomUUID(),
                                        item: "",
                                        quantity: 0,
                                        price: 0,
                                        assignedTo: [],
                                        isShared: false,
                                        _isDraft: true,
                                    })
                                }}
                            >
                                Add item
                            </Button>
                        </Box>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            processRowUpdate={(updated, original) => {
                                updated._isDraft = false
                                console.log(updated)
                                updateItem(updated)
                                return updated
                            }}
                        />
                    </Stack>
                </CardContent>
            </Card>
        </>
    )
}
