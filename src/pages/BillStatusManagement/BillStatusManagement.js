import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { useFormik } from 'formik';
import { object, string } from 'yup';
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

function BillStatusManagement() {
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);

    //end?

    const [selectedRows, setSelectedRows] = useState([]);
    const [successAlert, setSuccessAlert] = useState('');

    const billColumn = [
        { field: 'billID', headerName: 'Hóa đơn(ID)', flex: 1 },
        { field: 'status', headerName: 'Trạng thái hóa đơn', flex: 1 },

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

    // chi tiếc hóa đơn

    //end  chi tiếc hóa đơn..

    // lấy ra chỗ edti hóa đơn
    const handleEdit = (row) => {
        return (e) => {
            e.stopPropagation();
            updateFormik.setValues({
                ...updateFormik.values,
                status: row.status,
            });
            setUpdateModalOpen(true);
        };
    };

    const handleModelChange = (modelSelected) => {
        setSelectedRows(rows.filter((row) => modelSelected.includes(row.id)));
    };

    // bắt lôi chỉnh sữa hóa đơn
    const updateFormik = useFormik({
        initialValues: {
            status: '',
        },
        validationSchema: object({
            status: string().required('Trạng thái hóa  không được trống '),
        }),
        onSubmit(value) {
            setUpdateModalOpen(false);
            setSuccessAlert('Chỉnh sửa hóa đơn  thành công!');
            setTimeout(() => {
                setSuccessAlert('');
            }, 5000);
        },
    });

    //  bắt lỗi  nha  thêm  hóa đơn
    const createFormik = useFormik({
        initialValues: {
            status: '',
        },
        validationSchema: object({
            status: string().required('Trạng thái hóa  không được trống '),
        }),

        onSubmit(value) {
            setCreateModalOpen(false);
            setSuccessAlert('Thêm  hóa đơn  thành công!');
            setTimeout(() => {
                setSuccessAlert('');
            }, 5000);
        },
    });

    //data truyen vao hóa đơn
    const rows = [
        { id: 1, billID: 1, status: 'Đã thanh toán' },
        { id: 2, billID: 2, status: 'Đã thanh toán' },
        { id: 3, billID: 3, status: 'Chưa thanh toán ' },
        { id: 4, billID: 4, status: 'Đã thanh toán' },
        { id: 5, billID: 5, status: 'Chưa thanh toán ' },
    ];

    //dialog handle
    const [open, setOpen] = useState(false);

    const handleDelete = () => {
        //  logic xóa ở đây
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

            {/*  Model  cập nhật hóa đơn  */}
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
                        Chỉnh Sửa Hóa Đơn
                    </Typography>
                    <form onSubmit={updateFormik.handleSubmit}>
                        <Stack spacing={2}>
                            <TextField
                                id="status"
                                name="status"
                                label="Trạng thái hóa đơn "
                                fullWidth
                                onChange={updateFormik.handleChange}
                                onBlur={updateFormik.handleBlur}
                                value={updateFormik.values.status}
                                error={updateFormik.touched.status && Boolean(updateFormik.errors.status)}
                                helperText={updateFormik.touched.status && updateFormik.errors.status}
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

            {/* Modal của thêm vào của hóa đơn  */}
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
                        Thêm Hóa Đơn
                    </Typography>
                    <form onSubmit={createFormik.handleSubmit}>
                        <Stack spacing={2}>
                            <TextField
                                id="status"
                                name="status"
                                label="Trạng thái hóa đơn "
                                fullWidth
                                onChange={createFormik.handleChange}
                                onBlur={createFormik.handleBlur}
                                value={createFormik.values.status}
                                error={createFormik.touched.status && Boolean(createFormik.errors.status)}
                                helperText={createFormik.touched.status && createFormik.errors.status}
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

            {/*  edn Modal của thêm  danh mục nhân viên nha  ban hải */}

            <Box sx={{ p: 2 }}>
                <Box>
                    <Typography variant="h4" component="h4">
                        Hóa đơn
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
                            Thêm hóa đơn
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
                        columns={billColumn}
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

export default BillStatusManagement;
