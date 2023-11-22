import { Box, CircularProgress } from "@mui/material";

const styles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
}

function Loader({ children, loading = false }) {
    return (
        <>
            {
                loading ?
                    (
                        children
                    )
                    : (
                        <Box sx={styles}>
                            <CircularProgress />
                        </Box >
                    )
            }
        </>
    );
}

export default Loader;