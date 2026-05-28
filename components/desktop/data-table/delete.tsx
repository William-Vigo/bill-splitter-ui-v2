import { Item, useBillStore } from "@/utility/store"
import TrashCanIcon from "@mui/icons-material/DeleteOutlined"
import {
    GridActionsCell,
    GridActionsCellItem,
    GridRenderCellParams,
} from "@mui/x-data-grid"

export default function Delete(props: GridRenderCellParams<Item, unknown>) {
    const deleteItem = useBillStore((state) => state.deleteItem)
    return (
        <GridActionsCell {...props}>
            <GridActionsCellItem
                label="Delete"
                icon={<TrashCanIcon />}
                onClick={() => deleteItem(props.row.id)}
            />
        </GridActionsCell>
    )
}
