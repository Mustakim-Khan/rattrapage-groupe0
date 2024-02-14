import { Box, Typography } from "@mui/joy";
import Image from "next/image";

export default function Home() {
  return (
    <Box sx={{p: "12px", bgcolor: "#fff"}}>
      <Box key="home_title" sx={{mb: "12px"}}>
        <Typography level="title-lg" textTransform="uppercase" sx={{ letterSpacing: '0.2rem', }}>Gestion des stocks</Typography>
      </Box>
      <Box key="home_posts" sx={{ gap: 2,  bgcolor: "white", display: "flex", justifyContent:"space-around", flexDirection:"row", flexWrap: 'wrap'}}>
        ...
      </Box>
    </Box>
  );
}
