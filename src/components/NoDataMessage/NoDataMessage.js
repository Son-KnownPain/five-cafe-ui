import { Box, Typography } from "@mui/material";

const styles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    p: 1,
    mt: 2,
    backgroundColor: '#f5f5f5',
    borderRadius: 2,
}

function NoDataMessage({ message = 'Không có dữ liệu' }) {
    return (
        <Box sx={styles}>
            <Typography component="h6" variant="h6">{message}</Typography>
        </Box>
    );
}

export default NoDataMessage;