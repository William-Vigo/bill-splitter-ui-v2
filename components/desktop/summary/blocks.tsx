"use client"
import { SvgIconComponent } from "@mui/icons-material"
import { Avatar, Box, Typography } from "@mui/material"

export type props = {
    icon: SvgIconComponent
    iconColor: string
    backgroundColor: string
    title: string
    value: string
}

export function Blocks(p: props) {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
            }}
        >
            <Avatar
                sx={{
                    bgcolor: p.backgroundColor,
                }}
            >
                <p.icon
                    sx={{
                        color: p.iconColor,
                    }}
                />
            </Avatar>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Typography variant="body1">{p.title}</Typography>
                <Typography
                    sx={{
                        color: p.iconColor,
                    }}
                >
                    {p.value}
                </Typography>
            </Box>
        </Box>
    )
}

/*
🔵 Items Total
Icon color: strong blue (≈ #2563EB)
Background: very light blue (≈ #E8F1FF)
🟢 Tax (10%)
Icon color: green (≈ #22C55E / #16A34A)
Background: very light green (≈ #EAF7EE)
🟣 Tip (15%)
Icon color: purple (≈ #8B5CF6)
Background: very light purple (≈ #F3E8FF)
⚫ Grand Total
Icon color: dark gray (≈ #6B7280)
Background: light gray (≈ #F3F4F6)
*/
