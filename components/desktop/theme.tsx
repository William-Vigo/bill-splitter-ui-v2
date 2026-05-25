"use client"
import { createTheme } from "@mui/material/styles"
import { Inter } from "next/font/google"

const inter = Inter({
    subsets: ["latin"],
})

const theme = createTheme({
    typography: {
        fontFamily: inter.style.fontFamily,
        caption: {
            color: "gray",
        },
        h6: {
            fontWeight: "600",
        },
    },
})

export default theme
