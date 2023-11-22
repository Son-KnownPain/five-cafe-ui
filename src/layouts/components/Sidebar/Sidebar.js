import { Box, Button, Stack } from '@mui/material';
import { NavLink } from 'react-router-dom';
import config from '~/config';

const sidebarStyle = {
    width: config.layout.sidebarWidth,
    height: `calc(100vh - ${config.layout.headerHeight}px)`,
    p: 2,
    borderRight: '1px solid #99999966',
    overflowY: 'auto',
    position: 'fixed',
    left: 0,
    right: 0,
    top: config.layout.headerHeight,
    zIndex: 10,
    backgroundColor: '#fff',
};

const menu = [
    {
        label: 'Thống kê doanh thu',
    },
    {
        label: 'Phục vụ',
    },
    {
        label: 'Quầy',
    },
    {
        label: 'Quản lí nhân viên',
        path: config.routes.employeeManagement,
    },
    {
        label: 'Quản lí ca làm',
        path: config.routes.shiftManagement,
    },
    {
        label: 'Quản lí lương',
    },
    {
        label: 'Quản lí danh mục',
        path: config.routes.categoryManagement,
    },
    {
        label: 'Quản lí nguyên liệu',
    },
    {
        label: 'Quản lí sản phẩm',
    },
    {
        label: 'Quản lí hóa đơn',
        path: config.routes.billStatusManagement,
    },
    {
        label: 'Quản lí nhập hàng',
    },
    {
        label: 'Quản lí chấm công',
    },
    {
        label: 'Quản lí trạng thái',
    },
    {
        label: 'Quản lí vai trò',
        path: config.routes.roleManagement,
    },
    {
        label: 'Quản lí nhà cung cấp',
    },
];

function Sidebar() {
    return (
        <Box sx={sidebarStyle}>
            <Stack spacing={0}>
                {menu.map((item, index) => (
                    <NavLink key={index} to={item.path || '/'}>
                        <Button
                            variant="text"
                            sx={{
                                color: '#333',
                                width: '100%',
                                textTransform: 'none',
                                justifyContent: 'flex-start',
                            }}
                        >
                            {item.label}
                        </Button>
                    </NavLink>
                ))}
            </Stack>
        </Box>
    );
}

export default Sidebar;
