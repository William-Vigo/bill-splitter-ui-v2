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
    Menu,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from "@mui/material"
import PersonIcon from "@mui/icons-material/PersonOutlineOutlined"
import GroupsIcon from "@mui/icons-material/PeopleAltOutlined"
import MoreVertIcon from "@mui/icons-material/MoreVert"

import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import { useBillStore } from "@/utility/store"

function stringAvatar(name: string) {
    const first = name.split(" ")[0]?.[0] ?? ""
    const last = name.split(" ")[1]?.[0] ?? ""
    return {
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
            <Card>
                <CardContent>
                    <Typography variant="h6">People</Typography>
                    <Typography variant="subtitle1">
                        Add the people who are splitting the bill
                    </Typography>
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
                                placeholder="Enter name"
                                variant="outlined"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Button type="submit" variant="contained">
                                Add
                            </Button>
                        </Stack>
                    </form>
                    <List>
                        {party.map((person) => (
                            <ListItem key={person}>
                                <Avatar {...stringAvatar(person)} />
                                <Typography>{person}</Typography>
                                <IconButton
                                    onClick={(e) => handleClick(e, person)}
                                >
                                    <MoreVertIcon />
                                </IconButton>
                            </ListItem>
                        ))}
                    </List>
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
                </CardContent>
            </Card>
            {/* Menu is not like floating and attaches using anchorEl */}
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={handleRemovePerson}>Remove</MenuItem>
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
