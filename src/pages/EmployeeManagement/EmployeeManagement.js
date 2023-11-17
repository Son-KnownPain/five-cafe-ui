import {
    Box,
    Button,
    Typography,
    Modal,
    Stack,
    TextField,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { useFormik } from 'formik';
import { object, string } from 'yup';

function EmployeeManagement() {
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [successAlert, setSuccessAlert] = useState('');
    const columns = [
        { field: 'employeeID', headerName: 'Mã nhân viên', flex: 1 },
        { field: 'name', headerName: 'Tên nhân viên', flex: 1 },
        { field: 'phone', headerName: ' SDT', flex: 1 },
        {
            field: 'username',
            headerName: 'Username',
            flex: 1,
        },
        {
            field: 'password',
            headerName: 'Mật khẩu',
            flex: 1,
        },
        {
            field: 'actions',
            headerName: 'Thao tác',
            flex: 1,
            renderCell: (params) => {
                return (
                    <Box>
                        <Button onClick={handleEdit(params.row)} variant="outlined" color="warning">
                            Chỉnh sửa
                        </Button>
                    </Box>
                );
            },
        },
    ];
    const handleEdit = (row) => {
        return (e) => {
            e.stopPropagation();
            updateFormik.setValues({
                ...updateFormik.values,
                name: row.name,
                phone: row.phone,
                username: row.username,
                password: row.password,
            });
            setUpdateModalOpen(true);
        };
    };

    const handleModelChange = (modelSelected) => {
        setSelectedRows(rows.filter((row) => modelSelected.includes(row.id)));
    };

    //Chinh sua
    const updateFormik = useFormik({
        initialValues: {
            name: '',
            phone: '',
            username: '',
            password: '',
        },
        validationSchema: object({
            name: string().required('Tên nhân viên là bắt buộc'),
            phone: string().required('Số điện thoại là bắt buộc'),
            username: string()
                .required('Username là bắt buộc')
                .matches(/^[a-z0-9]+$/, 'Username chỉ bao gồm a-z và số'),
            password: string().required('Mật khẩu là bắt buộc'),
        }),
        onSubmit(value) {
            setUpdateModalOpen(false);
            setSuccessAlert('Chỉnh sửa nhân viên thành công!');
            setTimeout(() => {
                setSuccessAlert('');
            }, 5000);
        },
    });

    // tao
    const createFormik = useFormik({
        initialValues: {
            name: '',
            phone: '',
            username: '',
            password: '',
        },
        validationSchema: object({
            name: string().required('Tên nhân viên là bắt buộc'),
            phone: string().required('Số điện thoại là bắt buộc'),
            username: string()
                .required('Username là bắt buộc')
                .matches(/^[a-z0-9]+$/, 'Username chỉ bao gồm a-z và số'),
            password: string().required('Mật khẩu là bắt buộc'),
        }),
        onSubmit(value) {
            setCreateModalOpen(false);
            setSuccessAlert('Thêm nhân viên thành công!');
            setTimeout(() => {
                setSuccessAlert('');
            }, 5000);
        },
    });
    //data truyen vao
    const rows = [{ id: 1, employeeID: 1, name: 'Hoang', phone: '09887765', username: 'Leh1309', password: '1234' }];
    //dialog handle
    const [open, setOpen] = useState(false);

    const handleDelete = () => {
        // Thực hiện logic xóa ở đây
        console.log('Đã xóa');
        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Xác nhận xoá</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">Bạn chắc chắn muốn xoá không?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Hủy
                    </Button>
                    <Button onClick={handleDelete} color="primary" autoFocus>
                        Xoá
                    </Button>
                </DialogActions>
            </Dialog>
            {/* Modal của cập nhật */}
            <Modal
                open={updateModalOpen}
                onClose={() => {
                    setUpdateModalOpen(false);
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 800,
                        maxWidth: '90%',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        borderRadius: 2,
                        p: 3,
                    }}
                >
                    <form onSubmit={updateFormik.handleSubmit}>
                        <Stack spacing={2}>
                            <TextField
                                id="name"
                                name="name"
                                label="Tên nhân viên"
                                fullWidth
                                onChange={updateFormik.handleChange}
                                onBlur={updateFormik.handleBlur}
                                value={updateFormik.values.name}
                                error={updateFormik.touched.name && Boolean(updateFormik.errors.name)}
                                helperText={updateFormik.touched.name && updateFormik.errors.name}
                            />
                            <TextField
                                id="phone"
                                name="phone"
                                label="SDT"
                                fullWidth
                                onChange={updateFormik.handleChange}
                                onBlur={updateFormik.handleBlur}
                                value={updateFormik.values.phone}
                                error={updateFormik.touched.phone && Boolean(updateFormik.errors.phone)}
                                helperText={updateFormik.touched.phone && updateFormik.errors.phone}
                            />
                            <TextField
                                id="username"
                                name="username"
                                label="Username"
                                fullWidth
                                onChange={updateFormik.handleChange}
                                onBlur={updateFormik.handleBlur}
                                value={updateFormik.values.username}
                                error={updateFormik.touched.username && Boolean(updateFormik.errors.username)}
                                helperText={updateFormik.touched.username && updateFormik.errors.username}
                            />
                            <TextField
                                id="password"
                                name="password"
                                label="Mật khẩu"
                                fullWidth
                                onChange={updateFormik.handleChange}
                                onBlur={updateFormik.handleBlur}
                                value={updateFormik.values.password}
                                error={updateFormik.touched.password && Boolean(updateFormik.errors.password)}
                                helperText={updateFormik.touched.password && updateFormik.errors.password}
                            />
                        </Stack>
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                            <Button type="submit" variant="contained">
                                Cập nhật
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
            {/* Modal của thêm */}
            <Modal
                open={createModalOpen}
                onClose={() => {
                    setCreateModalOpen(false);
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 800,
                        maxWidth: '90%',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        borderRadius: 2,
                        p: 3,
                    }}
                >
                    <form onSubmit={createFormik.handleSubmit}>
                        <Stack spacing={2}>
                            <TextField
                                id="name"
                                name="name"
                                label="Tên nhân viên"
                                fullWidth
                                onChange={createFormik.handleChange}
                                onBlur={createFormik.handleBlur}
                                value={createFormik.values.name}
                                error={createFormik.touched.name && Boolean(createFormik.errors.name)}
                                helperText={createFormik.touched.name && createFormik.errors.name}
                            />
                            <TextField
                                id="phone"
                                name="phone"
                                label="SDT"
                                fullWidth
                                onChange={createFormik.handleChange}
                                onBlur={createFormik.handleBlur}
                                value={createFormik.values.phone}
                                error={createFormik.touched.phone && Boolean(createFormik.errors.phone)}
                                helperText={createFormik.touched.phone && createFormik.errors.phone}
                            />
                            <TextField
                                id="username"
                                name="username"
                                label="Username"
                                fullWidth
                                onChange={createFormik.handleChange}
                                onBlur={createFormik.handleBlur}
                                value={createFormik.values.username}
                                error={createFormik.touched.username && Boolean(createFormik.errors.username)}
                                helperText={createFormik.touched.username && createFormik.errors.username}
                            />
                            <TextField
                                id="password"
                                name="password"
                                label="Mật khẩu"
                                fullWidth
                                onChange={createFormik.handleChange}
                                onBlur={createFormik.handleBlur}
                                value={createFormik.values.password}
                                error={createFormik.touched.password && Boolean(createFormik.errors.password)}
                                helperText={createFormik.touched.password && createFormik.errors.password}
                            />
                        </Stack>
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                            <Button type="submit" variant="contained">
                                Tạo
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
            <Box sx={{ p: 2 }}>
                <Box>
                    <Typography variant="h4" component="h4">
                        Danh Sách Nhân Viên
                    </Typography>
                    <Typography variant="p" component="p" sx={{ fontSize: 14, color: '#555' }}>
                        Không nên thao tác vào các thành phần này, vì nó ảnh hưởng tới bảo mật ứng dụng!
                    </Typography>
                    {!!successAlert && <Alert severity="success">{successAlert}</Alert>}
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                            variant="contained"
                            onClick={() => {
                                setCreateModalOpen(true);
                            }}
                        >
                            Thêm nhan vien
                        </Button>
                        {!!selectedRows.length && (
                            <Button
                                onClick={() => {
                                    setOpen(true);
                                }}
                                sx={{ ml: 1 }}
                                variant="contained"
                                color="error"
                            >
                                Xóa
                            </Button>
                        )}
                    </Box>
                </Box>
                <Box sx={{ mt: 2 }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection
                        onRowSelectionModelChange={handleModelChange}
                    />
                </Box>
            </Box>
        </>
    );
}

export default EmployeeManagement;
