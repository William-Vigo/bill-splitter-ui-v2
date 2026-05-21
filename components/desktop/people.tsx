import { Box, Button, InputAdornment, List, Stack, TextField, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/PersonOutlineOutlined';
import GroupsIcon from '@mui/icons-material/PeopleAltOutlined';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


export default function People() {
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
                    />
                    <Button variant="contained">Add</Button>
                </Stack>
                {/* TODO: list items need to be generated based on number of people added */}
                {/*
                <List>
                </List>
                */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                }}> {/* TODO: align items */}
                    <GroupsIcon /> 
                    {/* TODO: generate number of people */}
                    <Typography variant="body2">4 people</Typography>
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