import { Box, Button, Container } from "@mui/material";
import { NavLink } from "react-router-dom";
import images from "~/asset/images";
import config from "~/config";

const headerStyle = {
    height: config.layout.headerHeight,
    backgroundColor: '#fff',
    borderBottom: '1px solid #99999966',
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    zIndex: 10,
}

const headerInnerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
};

function Header() {
    return (
        <Container sx={headerStyle} maxWidth="x1">
            <Box sx={headerInnerStyle}>
                <img src={images.layout.logo} alt={'logo'} height="50px" />
                <Box>
                    <NavLink to={'/'}>
                        <Button variant="outlined">Đăng xuất</Button>
                    </NavLink>
                </Box>
            </Box>
        </Container>
    );
}

export default Header;