import { Box, Typography } from "@mui/material";

export function Settings() {
  return (
    <Box sx={{ width: 300, p: "10px" }}>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Settings
      </Typography>
    </Box>
  );
}
