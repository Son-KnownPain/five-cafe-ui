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

function ShiftManagement() {
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [successAlert, setSuccessAlert] = useState('');

    const shiftCollumn = [
        { field: 'shiftID', headerName: 'Mã ca làm ', flex: 1 },
        { field: 'name', headerName: 'Tên nhân viên', flex: 1 },
        { field: 'salaryPH', headerName: 'Lương theo giờ', flex: 1 },
        {
            field: 'timeFrom',
            headerName: 'Thời gian From',
            flex: 1,
        },
        {
            field: 'timeTo',
            headerName: 'Thời Gian To',
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
                salaryPH: row.salaryPH,
                timeFrom: row.timeFrom,
                timeTo: row.timeTo,
            });
            setUpdateModalOpen(true);
        };
    };

    const handleModelChange = (modelSelected) => {
        setSelectedRows(Shiftrows.filter((row) => modelSelected.includes(row.id)));
    };

    //Chinh sua
    const updateFormik = useFormik({
        initialValues: {
            name: '',
            salaryPH: '',
            timeFrom: '',
            timeTo: '',
        },
        validationSchema: object({
            name: string().required('Tên nhân viên là bắt buộc'),
            salaryPH: string().required('Số điện thoại là bắt buộc'),
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
            salaryPH: '',
            timeFrom: '',
            timeTo: '',
        },
        validationSchema: object({
            name: string().required('Tên nhân viên là bắt buộc'),
            salaryPH: string().required('Lương theo giờ nhân viên  là bắt buộc'),
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
    const Shiftrows = [
        { id: 1, shiftID: 1, name: 'Hoang', salaryPH: '17', timeFrom: '11/12/2023', timeTo: '11/12/2023' },
        { id: 2, shiftID: 2, name: 'Lê Ngoc Hải', salaryPH: '20', timeFrom: '11/12/2023', timeTo: '11/12/2023' },
        { id: 3, shiftID: 3, name: 'Nguyễn Hồng sơn ', salaryPH: '20', timeFrom: '11/12/2023', timeTo: '11/12/2023' },
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
                    <Typography variant="h4" component="h4">
                        Quản lý ca làm nhân viên
                    </Typography>
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
                                id="salaryPH"
                                name="salaryPH"
                                label="Lương theo giờ"
                                fullWidth
                                onChange={updateFormik.handleChange}
                                onBlur={updateFormik.handleBlur}
                                value={updateFormik.values.salaryPH}
                                error={updateFormik.touched.salaryPH && Boolean(updateFormik.errors.salaryPH)}
                                helperText={updateFormik.touched.salaryPH && updateFormik.errors.salaryPH}
                            />
                            <TextField
                                id="timeFrom"
                                name="timeFrom"
                                label="TimeFrom"
                                fullWidth
                                onChange={updateFormik.handleChange}
                                onBlur={updateFormik.handleBlur}
                                value={updateFormik.values.timeFrom}
                                error={updateFormik.touched.timeFrom && Boolean(updateFormik.errors.timeFrom)}
                                helperText={updateFormik.touched.timeFrom && updateFormik.errors.timeFrom}
                            />
                            <TextField
                                id="timeTo"
                                name="timeTo"
                                label="TimeTo"
                                fullWidth
                                onChange={updateFormik.handleChange}
                                onBlur={updateFormik.handleBlur}
                                value={updateFormik.values.timeTo}
                                error={updateFormik.touched.timeTo && Boolean(updateFormik.errors.timeTo)}
                                helperText={updateFormik.touched.timeTo && updateFormik.errors.timeTo}
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
                    <Typography variant="h4" component="h4">
                        Quản lý ca làm nhân viên
                    </Typography>
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
                                label="Lương theo giờ"
                                fullWidth
                                onChange={createFormik.handleChange}
                                onBlur={createFormik.handleBlur}
                                value={createFormik.values.phone}
                                error={createFormik.touched.phone && Boolean(createFormik.errors.phone)}
                                helperText={createFormik.touched.phone && createFormik.errors.phone}
                            />
                            <TextField
                                id="timeFrom"
                                name="timeFrom"
                                label="TimeFrom"
                                fullWidth
                                onChange={createFormik.handleChange}
                                onBlur={createFormik.handleBlur}
                                value={createFormik.values.timeFrom}
                                error={createFormik.touched.timeFrom && Boolean(createFormik.errors.timeFrom)}
                                helperText={createFormik.touched.timeFrom && createFormik.errors.timeFrom}
                            />
                            <TextField
                                id="timeTo"
                                name="timeTo"
                                label="timeTo"
                                fullWidth
                                onChange={createFormik.handleChange}
                                onBlur={createFormik.handleBlur}
                                value={createFormik.values.timeTo}
                                error={createFormik.touched.timeTo && Boolean(createFormik.errors.timeTo)}
                                helperText={createFormik.touched.timeTo && createFormik.errors.timeTo}
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
                        Danh Sách Ca Làm Nhân Viên
                    </Typography>
                    <Typography variant="p" component="p" sx={{ fontSize: 14, color: '#555' }}>
                        Không nên đụng nó vào bất cứ cái gì , vì ông sơn ổng bị khùng!!!
                    </Typography>
                    {!!successAlert && <Alert severity="success">{successAlert}</Alert>}
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                            variant="contained"
                            onClick={() => {
                                setCreateModalOpen(true);
                            }}
                        >
                            Thêm ca làm nhân viên
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
                        rows={Shiftrows}
                        columns={shiftCollumn}
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

export default ShiftManagement;
