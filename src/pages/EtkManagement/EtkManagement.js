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
    MenuItem,
    FormControlLabel,
    Checkbox,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { useFormik } from 'formik';
import { date, object, string } from 'yup';

function EtkManagement() {
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [successAlert, setSuccessAlert] = useState('');

    const columns = [
        { field: 'timekeepingID', headerName: 'Mã chấm công', flex: 1 },
        { field: 'employeeID', headerName: 'Mã nhân viên', flex: 1 },
        { field: 'shiftID', headerName: 'Mã ca làm', flex: 1 },
        { field: 'date', headerName: 'Ngày', flex: 1 },
        { field: 'salary', headerName: 'Lương', flex: 1 },
        { field: 'isPaid', headerName: 'Thanh toán', flex: 1 },
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
                timekeepingID: row.timekeepingID,
                date: row.date,
                salary: row.salary,
                isPaid: row.isPaid,
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
            timekeepingID: null,
            employeeID: null,
            shiftID: null,
            date: '',
            salary: '',
            isPaid: false,
        },
        validationSchema: object({
            timekeepingID: string().required('Mã chấm công là bắt buộc'),
            employeeID: string().required('Mã nhân viên là bắt buộc'),
            shiftID: string().required('Mã ca làm là bắt buộc'),
            date: date().required('Ngày là bắt buộc'),
            salary: string().required('Lương là bắt buộc'),
            isPaid: string().required('bắt buộc'),
        }),
        onSubmit(value) {
            setUpdateModalOpen(false);
            setSuccessAlert('Chỉnh sửa thành công!');
            setTimeout(() => {
                setSuccessAlert('');
            }, 5000);
        },
    });

    // create
    const createFormik = useFormik({
        initialValues: {
            timekeepingID: null,
            employeeID: null,
            shiftID: null,
            date: '',
            salary: '',
            isPaid: false,
        },
        validationSchema: object({
            timekeepingID: string().required('Mã chấm công là bắt buộc'),
            employeeID: string().required('Mã nhân viên là bắt buộc'),
            shiftID: string().required('Mã ca làm là bắt buộc'),
            date: date().required('Ngày là bắt buộc'),
            salary: string().required('Lương là bắt buộc'),
            isPaid: string().required('bắt buộc'),
        }),
        onSubmit(value) {
            setUpdateModalOpen(false);
            setSuccessAlert('Thêm thành công!');
            setTimeout(() => {
                setSuccessAlert('');
            }, 5000);
        },
    });

    //data truyen vao de huen thi DL
    const rows = [
        { id: 1, timekeepingID: 1, employeeID: 1, shiftID: 1, date: '13-09-2002', salary: '100.000', isPaid: 'R' },
    ];
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
            {/* thong bao xoa    */}
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
                                id="date"
                                name="date"
                                label="Ngày làm"
                                fullWidth
                                onChange={updateFormik.handleChange}
                                onBlur={updateFormik.handleBlur}
                                value={updateFormik.values.name}
                                error={updateFormik.touched.name && Boolean(updateFormik.errors.name)}
                                helperText={updateFormik.touched.name && updateFormik.errors.name}
                            />
                            <TextField
                                id="employeeID"
                                name="employeeID"
                                label="Mã nhân viên"
                                fullWidth
                                onChange={updateFormik.handleChange}
                                onBlur={updateFormik.handleBlur}
                                value={updateFormik.values.name}
                                error={updateFormik.touched.name && Boolean(updateFormik.errors.name)}
                                helperText={updateFormik.touched.name && updateFormik.errors.name}
                            />
                            <TextField
                                id="shiftID"
                                name="shiftID"
                                label="Mã ca làm"
                                fullWidth
                                onChange={updateFormik.handleChange}
                                onBlur={updateFormik.handleBlur}
                                value={updateFormik.values.name}
                                error={updateFormik.touched.name && Boolean(updateFormik.errors.name)}
                                helperText={updateFormik.touched.name && updateFormik.errors.name}
                            />
                            <TextField
                                id="salary"
                                name="salary"
                                label="Lương"
                                fullWidth
                                onChange={updateFormik.handleChange}
                                onBlur={updateFormik.handleBlur}
                                value={updateFormik.values.phone}
                                error={updateFormik.touched.phone && Boolean(updateFormik.errors.phone)}
                                helperText={updateFormik.touched.phone && updateFormik.errors.phone}
                            />
                            <FormControlLabel control={<Checkbox />} label="Đã thanh toán" />
                            {/* <TextField
                                id="isPaid"
                                name="isPaid"
                                label="isPaid"
                                fullWidth
                                onChange={updateFormik.handleChange}
                                onBlur={updateFormik.handleBlur}
                                value={updateFormik.values.username}
                                error={updateFormik.touched.username && Boolean(updateFormik.errors.username)}
                                helperText={updateFormik.touched.username && updateFormik.errors.username}
                            /> */}
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
                                id="date"
                                name="date"
                                label="Ngày làm"
                                fullWidth
                                onChange={updateFormik.handleChange}
                                onBlur={updateFormik.handleBlur}
                                value={updateFormik.values.name}
                                error={updateFormik.touched.name && Boolean(updateFormik.errors.name)}
                                helperText={updateFormik.touched.name && updateFormik.errors.name}
                            />
                            <TextField
                                id="employeeID"
                                name="employeeID"
                                label="Mã nhân viên"
                                fullWidth
                                select
                                onChange={updateFormik.handleChange}
                                onBlur={updateFormik.handleBlur}
                                value={updateFormik.values.name}
                                error={updateFormik.touched.name && Boolean(updateFormik.errors.name)}
                                helperText={updateFormik.touched.name && updateFormik.errors.name}
                            >
                                <MenuItem value={1}>1-Minh Hoàng</MenuItem>
                                <MenuItem value={2}>2-Hồng Sơn</MenuItem>
                                <MenuItem value={3}>3-Dương Như</MenuItem>
                                <MenuItem value={4}>4-Thuỳ dương</MenuItem>
                            </TextField>
                            <TextField
                                id="shiftID"
                                name="shiftID"
                                label="Mã ca làm"
                                fullWidth
                                select
                                onChange={updateFormik.handleChange}
                                onBlur={updateFormik.handleBlur}
                                value={updateFormik.values.name}
                                error={updateFormik.touched.name && Boolean(updateFormik.errors.name)}
                                helperText={updateFormik.touched.name && updateFormik.errors.name}
                            >
                                <MenuItem value={1}>Ca sáng</MenuItem>
                                <MenuItem value={2}>Ca trưa</MenuItem>
                                <MenuItem value={3}>Ca tối</MenuItem>
                            </TextField>
                            <TextField
                                id="salary"
                                name="salary"
                                label="Lương"
                                fullWidth
                                onChange={updateFormik.handleChange}
                                onBlur={updateFormik.handleBlur}
                                value={updateFormik.values.phone}
                                error={updateFormik.touched.phone && Boolean(updateFormik.errors.phone)}
                                helperText={updateFormik.touched.phone && updateFormik.errors.phone}
                            />
                            <FormControlLabel control={<Checkbox />} label="Đã thanh toán" />
                            {/* <TextField
                                id="isPaid"
                                name="isPaid"
                                label="isPaid"
                                fullWidth
                                onChange={updateFormik.handleChange}
                                onBlur={updateFormik.handleBlur}
                                value={updateFormik.values.username}
                                error={updateFormik.touched.username && Boolean(updateFormik.errors.username)}
                                helperText={updateFormik.touched.username && updateFormik.errors.username}
                            /> */}
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
                        Danh sách chấm công
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
                            Thêm chấm công
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

export default EtkManagement;
