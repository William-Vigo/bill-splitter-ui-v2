"use client";
import { use, useState } from 'react';
import { Avatar, Box, Button, IconButton, InputAdornment, List, ListItem, Menu, MenuItem, Stack, TextField, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/PersonOutlineOutlined';
import GroupsIcon from '@mui/icons-material/PeopleAltOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useBillStore } from '@/utility/store';

function stringAvatar(name: string) {
    const first = name.split(' ')[0]?.[0] ?? "";
    const last = name.split(' ')[1]?.[0] ?? "";
    return {
        children: `${first}${last}`,
    }
}

export default function People() {
    const [name, setName] = useState<string>("");
    const addPerson = useBillStore((state) => state.addPerson);
    const party = useBillStore((state) => state.party);
    const peopleCount = useBillStore((state) => Object.keys(state.party).length);
    const handleAddPerson = () => {
        addPerson(name);
        setName("");
    }
    return (
        <Card>
            <CardContent >
                {/* TODO: Add styling*/} 
                <Typography variant="h6">People</Typography>
                <Typography variant="subtitle1">Add the people who are splitting the bill</Typography>
                <Stack direction={"row"} spacing={2}>
                    <TextField slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonIcon />
                                </InputAdornment>
                            )
                        }
                    }}
                    placeholder="Enter name"
                    variant='outlined'
                    onChange={(e) => setName(e.target.value)}
                    />
                    <Button variant="contained" onClick={handleAddPerson}>Add</Button>
                </Stack>
                {/* TODO: list items need to be generated based on number of people added */}
                <List>
                {party.map((person) => (
                    <ListItem key={person}>
                        <Avatar {...stringAvatar(person)} />
                        <Typography>{person}</Typography>
                        <IconButton>
                            <MoreVertIcon />
                        </IconButton>
                    </ListItem>
                ))}
                </List>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                }}> 
                    <GroupsIcon /> 
                    <Typography variant="body2">{peopleCount} people</Typography>
                </Box>
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