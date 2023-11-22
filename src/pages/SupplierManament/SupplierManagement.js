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

function SupplierManagement() {
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [successAlert, setSuccessAlert] = useState('');
    const columns = [
        { field: 'supplierID', headerName: 'Mã nhà cung cấp', flex: 1 },
        { field: 'contactname', headerName: 'Tên nàh cung cấp', flex: 1 },
        { field: 'contactnumber', headerName: ' Số liên lạc NCC', flex: 1 },
        { field: 'address', headerName: 'Địa chỉ', flex: 1 },
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
                contactname: row.contactname,
                contactnumber: row.contactnumber,
                address: row.address,
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
            contactname: '',
            contactnumber: '',
            address: '',
        },
        validationSchema: object({
            contactname: string().required('Tên nhà cung cấp là bắt buộc'),
            contactnumber: string().required('Số điện thoại nhà cung cấplà bắt buộc'),
            address: string().required('Địa chỉ là bắt buộc'),
        }),
        onSubmit(value) {
            setUpdateModalOpen(false);
            setSuccessAlert('Chỉnh sửa nhà cung cấp thành công!');
            setTimeout(() => {
                setSuccessAlert('');
            }, 5000);
        },
    });
    // create employee
    const createFormik = useFormik({
        initialValues: {
            contactname: '',
            contactnumber: '',
            address: '',
        },
        validationSchema: object({
            contactname: string().required('Tên nhà cung cấp là bắt buộc'),
            contactnumber: string().required('Số điện thoại nhà cung cấplà bắt buộc'),
            address: string().required('Địa chỉ là bắt buộc'),
        }),
        onSubmit(value) {
            setCreateModalOpen(false);
            setSuccessAlert('Thêm nhà cung cấp thành công!');
            setTimeout(() => {
                setSuccessAlert('');
            }, 5000);
        },
    });
    const rows = [{ id: 1, supplierID: 1, contactname: 'LMH', contactnumber: '09887765', address: 'Bac lieu' }];

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
                                id="contactname"
                                contactname="contactname"
                                label="Tên nhà cung cấp"
                                fullWidth
                                onChange={updateFormik.handleChange}
                                onBlur={updateFormik.handleBlur}
                                value={updateFormik.values.contactname}
                                error={updateFormik.touched.contactname && Boolean(updateFormik.errors.contactname)}
                                helperText={updateFormik.touched.contactname && updateFormik.errors.contactname}
                            />
                            <TextField
                                id="contactnumber"
                                name="contactnumber"
                                label="SDT nhà cung cấp"
                                fullWidth
                                onChange={updateFormik.handleChange}
                                onBlur={updateFormik.handleBlur}
                                value={updateFormik.values.contactnumber}
                                error={updateFormik.touched.contactnumber && Boolean(updateFormik.errors.contactnumber)}
                                helperText={updateFormik.touched.contactnumber && updateFormik.errors.contactnumber}
                            />
                            <TextField
                                id="address"
                                name="address"
                                label="address"
                                fullWidth
                                onChange={updateFormik.handleChange}
                                onBlur={updateFormik.handleBlur}
                                value={updateFormik.values.address}
                                error={updateFormik.touched.address && Boolean(updateFormik.errors.address)}
                                helperText={updateFormik.touched.address && updateFormik.errors.address}
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
                                id="contactname"
                                contactname="contactname"
                                label="Tên nhà cung cấp"
                                fullWidth
                                onChange={updateFormik.handleChange}
                                onBlur={updateFormik.handleBlur}
                                value={updateFormik.values.contactname}
                                error={updateFormik.touched.contactname && Boolean(updateFormik.errors.contactname)}
                                helperText={updateFormik.touched.contactname && updateFormik.errors.contactname}
                            />
                            <TextField
                                id="contactnumber"
                                name="contactnumber"
                                label="SDT nhà cung cấp"
                                fullWidth
                                onChange={updateFormik.handleChange}
                                onBlur={updateFormik.handleBlur}
                                value={updateFormik.values.contactnumber}
                                error={updateFormik.touched.contactnumber && Boolean(updateFormik.errors.contactnumber)}
                                helperText={updateFormik.touched.contactnumber && updateFormik.errors.contactnumber}
                            />
                            <TextField
                                id="address"
                                name="address"
                                label="address"
                                fullWidth
                                onChange={updateFormik.handleChange}
                                onBlur={updateFormik.handleBlur}
                                value={updateFormik.values.address}
                                error={updateFormik.touched.address && Boolean(updateFormik.errors.address)}
                                helperText={updateFormik.touched.address && updateFormik.errors.address}
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
                        Danh Sách Nhà Cung Cấp
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
                            Thêm nhà cung cấp
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

export default SupplierManagement;
