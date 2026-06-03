"use client"
import { use, useState } from "react"
import * as React from "react"
import {
    Avatar,
    Box,
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    List,
    ListItem,
    ListItemIcon,
    Menu,
    MenuItem,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material"
import PersonIcon from "@mui/icons-material/PersonOutlineOutlined"
import GroupsIcon from "@mui/icons-material/PeopleAltOutlined"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import TrashCanIcon from "@mui/icons-material/DeleteForeverOutlined"

import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import { useBillStore } from "@/utility/store"

const colorCache = new Map<string, string>()

function stringToColor(name: string) {
    let hash = 0
    if (colorCache.has(name)) {
        return colorCache.get(name)
    }
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }

    const hue = Math.abs(hash) % 360
    const color = `hsl(${hue}, 60%, 35%)`
    colorCache.set(name, color)
    return color
}

function stringAvatar(name: string) {
    const first = name.split(" ")[0]?.[0].toUpperCase() ?? ""
    const last = name.split(" ")[1]?.[0].toUpperCase() ?? ""
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${first}${last}`,
    }
}

export default function People() {
    const [selectedPerson, setSelectedPerson] = useState<string | null>(null)

    // menu logic
    // required for menu component
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl) //required for menu component

    // determins where to open the menu and what person is selected for the menu
    const handleClick = (
        event: React.MouseEvent<HTMLElement>,
        person: string
    ) => {
        setAnchorEl(event.currentTarget)
        setSelectedPerson(person)
    }

    // handleClose handles logic for closing the menu, not the actual handling the menu selected items
    const handleClose = () => {
        setAnchorEl(null)
        setSelectedPerson(null)
    }

    const handleRemovePerson = () => {
        if (selectedPerson) {
            useBillStore.getState().removePerson(selectedPerson)
        }
        handleClose()
    }

    const [name, setName] = useState<string>("")
    const addPerson = useBillStore((state) => state.addPerson)
    const party = useBillStore((state) => state.party)
    const peopleCount = useBillStore((state) => state.party.length)
    const handleAddPerson = () => {
        addPerson(name)
        setName("")
    }
    return (
        <>
            <Card sx={{ height: "100%", minHeight: 0 }}>
                <CardContent
                    sx={{
                        height: "100%",
                        minHeight: 0,
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Stack sx={{ gap: 1, flex: 1, minHeight: 0 }}>
                        <Stack>
                            <Typography variant="h6">People</Typography>
                            <Typography variant="caption">
                                Add the people who are splitting the bill
                            </Typography>
                        </Stack>
                        <Stack sx={{ minHeight: 0 }}>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    handleAddPerson()
                                }}
                            >
                                <Stack direction={"row"} spacing={2}>
                                    <TextField
                                        slotProps={{
                                            input: {
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <PersonIcon />
                                                    </InputAdornment>
                                                ),
                                            },
                                        }}
                                        size="small"
                                        placeholder="Enter name"
                                        variant="outlined"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                    />
                                    <Button type="submit" variant="contained">
                                        Add
                                    </Button>
                                </Stack>
                            </form>
                        </Stack>
                        <Stack
                            sx={{
                            flex: 1,
                            minHeight: 0,
                            overflowY: "auto",
                            gap: 1,
                            }}
                        >
                            {party.map((person) => (
                                <Paper
                                    key={person}
                                    variant="outlined"
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        px: 2,
                                        py: 1.5,
                                        borderRadius: 2,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 2,
                                        }}
                                    >
                                        <Avatar {...stringAvatar(person)} />
                                        <Typography variant="body2">
                                            {person}
                                        </Typography>
                                    </Box>
                                    <IconButton
                                        onClick={(e) => handleClick(e, person)}
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
                                </Paper>
                            ))}
                        </Stack>
                        <Stack>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                }}
                            >
                                <GroupsIcon />
                                <Typography variant="body2">
                                    {peopleCount} people
                                </Typography>
                            </Box>
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
            {/* Menu is floating and attaches using anchorEl */}
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={handleRemovePerson}>
                    <ListItemIcon>
                        <TrashCanIcon />
                    </ListItemIcon>
                    <Typography variant="inherit">Remove</Typography>
                </MenuItem>
            </Menu>
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
