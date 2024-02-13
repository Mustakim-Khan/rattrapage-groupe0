'use client'
import { Box, Typography } from "@mui/joy"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import UserMenu from "@/app/components/layout/UserMenu"

export default function Header () {
    const router = useRouter()
    const pathname = usePathname()

    return (
        <Box key={`app_header`} 
            component="header" className="Header"
            sx={{
                p: 2,
                bgcolor: 'black',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gridColumn: '1 / -1',
                borderBottom: '1px solid',
                borderColor: 'divider',
                top: 0,
                zIndex: 1100,
                boxShadow: 'sm',
            }}
        >
            <Link href="/">
                <Typography
                    onClick={() => pathname != "/" && router.push("/")}
                    startDecorator={
                        <img
                            src="/appIcon.png"
                            loading="lazy"
                            width="62"
                            height="42"
                            alt=""
                        />
                    }
                    level="h4" 
                    fontWeight="xl"
                    sx={{color: 'white', cursor:'pointer',}}
                >
                </Typography>
            </Link>
            <UserMenu/>
        </Box>
    )
}