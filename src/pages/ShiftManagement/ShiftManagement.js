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

    const [shiftCollumn] = useState([
        { field: 'shiftID', headerName: 'Mã ca làm ', flex: 1 },
        { field: 'name', headerName: 'Ca làm ', flex: 1 },
        { field: 'salary', headerName: 'Lương theo ca', flex: 1 },
        {
            field: 'timeFrom',
            headerName: 'Bắt đầu từ lúc',
            flex: 1,
        },
        {
            field: 'timeTo',
            headerName: 'Kết thúc vào lúc',
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
    ]);
    const handleEdit = (row) => {
        return (e) => {
            e.stopPropagation();
            updateFormik.setValues({
                ...updateFormik.values,
                name: row.name,
                salary: row.salary,
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
            salary: '',
            timeFrom: '',
            timeTo: '',
        },
        validationSchema: object({
            name: string().required('Tên  ca làm  là bắt buộc'),
            salary: string().required(' Lương theo ca là bắt buộc'),
        }),
        onSubmit(value) {
            setUpdateModalOpen(false);
            setSuccessAlert('Chỉnh sửa  ca làm  thành công!');
            setTimeout(() => {
                setSuccessAlert('');
            }, 5000);
        },
    });

    // tao
    const createFormik = useFormik({
        initialValues: {
            name: '',
            salary: '',
            timeFrom: '',
            timeTo: '',
        },
        validationSchema: object({
            name: string().required('Tên  ca làm  là bắt buộc'),
            salary: string().required('Lương theo ca là bắt buộc'),
        }),
        onSubmit(value) {
            setCreateModalOpen(false);
            setSuccessAlert('Thêm ca làm thành công!');
            setTimeout(() => {
                setSuccessAlert('');
            }, 5000);
        },
    });
    //data truyen vao
    const Shiftrows = [
        { id: 1, shiftID: 1, name: 'Hoang', salary: '17', timeFrom: '11/12/2023', timeTo: '11/12/2023' },
        { id: 2, shiftID: 2, name: 'Lê Ngoc Hải', salary: '20', timeFrom: '11/12/2023', timeTo: '11/12/2023' },
        { id: 3, shiftID: 3, name: 'Nguyễn Hồng sơn ', salary: '20', timeFrom: '11/12/2023', timeTo: '11/12/2023' },
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
                    <Typography variant="h6" component="h6" mb={2}>
                        Chỉnh Sửa Ca Làm
                    </Typography>
                    <form onSubmit={updateFormik.handleSubmit}>
                        <Stack spacing={2}>
                            <TextField
                                id="name"
                                name="name"
                                label="Tên ca làm "
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
                                label="Lương theo ca"
                                fullWidth
                                onChange={updateFormik.handleChange}
                                onBlur={updateFormik.handleBlur}
                                value={updateFormik.values.salary}
                                error={updateFormik.touched.salary && Boolean(updateFormik.errors.salary)}
                                helperText={updateFormik.touched.salary && updateFormik.errors.salary}
                            />
                            <TextField
                                id="timeFrom"
                                name="timeFrom"
                                label="Bắt đầu vào lúc"
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
                                label="Kết thúc vào lúc"
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
                    <Typography variant="h6" component="h6" mb={2}>
                        Thêm Ca Làm Mới
                    </Typography>
                    <form onSubmit={createFormik.handleSubmit}>
                        <Stack spacing={2}>
                            <TextField
                                id="name"
                                name="name"
                                label="Tên ca làm"
                                fullWidth
                                onChange={createFormik.handleChange}
                                onBlur={createFormik.handleBlur}
                                value={createFormik.values.name}
                                error={createFormik.touched.name && Boolean(createFormik.errors.name)}
                                helperText={createFormik.touched.name && createFormik.errors.name}
                            />
                            <TextField
                                id="salary"
                                name="salary"
                                label="Lương theo ca"
                                fullWidth
                                onChange={createFormik.handleChange}
                                onBlur={createFormik.handleBlur}
                                value={createFormik.values.salary}
                                error={createFormik.touched.salary && Boolean(createFormik.errors.salary)}
                                helperText={createFormik.touched.salary && createFormik.errors.salary}
                            />
                            <TextField
                                id="timeFrom"
                                name="timeFrom"
                                label="Bắt đàu vào lúc"
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
                                label="Kết thúc vào lúc"
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
                            Thêm ca làm
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
