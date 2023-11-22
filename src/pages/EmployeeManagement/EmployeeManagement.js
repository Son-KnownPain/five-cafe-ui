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
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { createEmpValidationScheme, updateEmpValidationScheme } from '~/validation/empValidation';
import Loader from '~/components/Loader';
import { allEmps, createEmp, deleteEmps, updateEmp } from '~/services/empService';
import { allRoles } from '~/services/rolesService';
import NoDataMessage from '~/components/NoDataMessage';
import VisuallyHiddenInput from './VisuallyHiddenInput';

function EmployeeManagement() {
    // States
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [successAlert, setSuccessAlert] = useState('');
    const [warningAlert, setWarningAlert] = useState([]);
    const [open, setOpen] = useState(false);
    const [columns] = useState([
        {
            field: 'image',
            headerName: 'Hình ảnh',
            width: 100,
            renderCell: (params) => {
                return (
                    <img width="100px" src={params.row.image} alt="EmpImage" />
                );
            },
        },
        { field: 'name', headerName: 'Tên nhân viên', flex: 1 },
        { field: 'phone', headerName: ' SDT', flex: 1 },
        { field: 'username', headerName: 'Username', flex: 1, },
        { field: 'roleName', headerName: 'Chức vụ', flex: 1, },
        {
            field: 'actions', headerName: 'Thao tác', flex: 1, renderCell: (params) => {
                return (
                    <Box>
                        <Button onClick={handleEdit(params.row)} variant="outlined" color="warning">
                            Chỉnh sửa
                        </Button>
                    </Box>
                );
            },
        },
    ])
    const [rows, setRows] = useState(null);
    const [roles, setRoles] = useState([]);

    //Chinh sua
    const updateFormik = useFormik({
        initialValues: {
            employeeID: null,
            roleID: '',
            name: '',
            phone: '',
            image: null,
            imagePreview: null,
            username: '',
            password: '',
        },
        validationSchema: updateEmpValidationScheme,
        onSubmit(value, { resetForm }) {
            updateEmp({
                employeeID: value.employeeID,
                roleID: value.roleID,
                name: value.name,
                phone: value.phone,
                image: value.image,
                username: value.username,
                password: value.password,
            })
                .then(res => {
                    if (res.status === 200) {
                        async function fetchData() {
                            const res = await allEmps();
                            setRows(res.data.map((item, index) => ({
                                id: index + 1,
                                employeeID: item.employeeID,
                                name: item.name,
                                phone: item.phone,
                                image: item.image,
                                username: item.username,
                                roleID: item.roleID,
                                roleName: item.roleName,
                            })));
                        }
                        fetchData();
                        setUpdateModalOpen(false);
                        setSuccessAlert('Chỉnh sửa hồ sơ nhân viên thành công!')
                        setTimeout(() => {
                            setSuccessAlert('')
                        }, 5000);
                        setWarningAlert([])
                        resetForm({
                            roleID: '',
                            name: '',
                            phone: '',
                            username: '',
                            password: '',
                        })
                    }
                })
                .catch(err => {
                    if (err.response) {
                        setWarningAlert(err.response.data.errors)
                    }
                })
        },
    });

    // tao
    const createFormik = useFormik({
        initialValues: {
            roleID: '',
            name: '',
            phone: '',
            image: null,
            username: '',
            password: '',
        },
        validationSchema: createEmpValidationScheme,
        onSubmit(value, { resetForm }) {
            createEmp({
                roleID: value.roleID,
                name: value.name,
                phone: value.phone,
                image: value.image,
                username: value.username,
                password: value.password,
            })
                .then(res => {
                    if (res.status === 200) {
                        async function fetchData() {
                            const res = await allEmps();
                            setRows(res.data.map((item, index) => ({
                                id: index + 1,
                                employeeID: item.employeeID,
                                name: item.name,
                                phone: item.phone,
                                image: item.image,
                                username: item.username,
                                roleID: item.roleID,
                                roleName: item.roleName,
                            })));
                        }
                        fetchData();
                        setCreateModalOpen(false);
                        setSuccessAlert('Thêm hồ sơ nhân viên thành công!')
                        setTimeout(() => {
                            setSuccessAlert('')
                        }, 5000);
                        setWarningAlert([])
                        resetForm({
                            roleID: '',
                            name: '',
                            phone: '',
                            username: '',
                            password: '',
                        })
                    }
                })
                .catch(err => {
                    if (err.response) {
                        setWarningAlert(err.response.data.errors)
                    }
                })
        },
    });

    //dialog handle
    const handleDelete = () => {
        deleteEmps(selectedRows.map(item => item.employeeID))
            .then(res => {
                if (res.status === 200) {
                    async function fetchData() {
                        const res = await allEmps();
                        setRows(res.data.map((item, index) => ({
                            id: index + 1,
                            employeeID: item.employeeID,
                            name: item.name,
                            phone: item.phone,
                            image: item.image,
                            username: item.username,
                            roleID: item.roleID,
                            roleName: item.roleName,
                        })));
                    }
                    fetchData();
                    setOpen(false)
                    setSuccessAlert('Xóa thành công!')
                    setTimeout(() => {
                        setSuccessAlert('')
                    }, 5000);
                }
            })
        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEdit = (row) => {
        return (e) => {
            e.stopPropagation();
            updateFormik.setValues({
                ...updateFormik.values,
                employeeID: row.employeeID,
                roleID: row.roleID,
                name: row.name,
                imagePreview: row.image,
                phone: row.phone,
                username: row.username,
                password: '',
            });
            setUpdateModalOpen(true);
        };
    };

    const handleModelChange = (modelSelected) => {
        setSelectedRows(rows.filter((row) => modelSelected.includes(row.id)));
    };

    useEffect(() => {
        async function fetchData() {
            const res = await allEmps();
            setRows(res.data.map((item, index) => ({
                id: index + 1,
                employeeID: item.employeeID,
                name: item.name,
                phone: item.phone,
                image: item.image,
                username: item.username,
                roleID: item.roleID,
                roleName: item.roleName,
            })));

            const rolesRes = await allRoles();
            setRoles(rolesRes.data.map(item => ({
                roleID: item.roleID,
                roleName: item.roleName,
            })))
        }
        fetchData();
    }, [])

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
                        maxHeight: '100%',
                        overflowY: 'auto',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        borderRadius: 2,
                        p: 3,
                    }}
                >
                    <Typography variant="h6" component="h6" mb={2}>Cập nhật thông tin nhân viên</Typography>
                    {
                        warningAlert.map((item, index) => (
                            <Alert key={index} sx={{ mb: 2 }} severity="warning">{item}</Alert>
                        ))
                    }
                    <form onSubmit={updateFormik.handleSubmit}>
                        <Stack spacing={2}>
                            {
                                (updateFormik.values.imagePreview !== null || updateFormik.values.image !== null) && (
                                    <img width="100%" src={(updateFormik.values.image !== null && URL.createObjectURL(updateFormik.values.image)) || updateFormik.values.imagePreview} alt={'Img'} />
                                )
                            }
                            <Button component="label" variant="contained">
                                Tải ảnh lên
                                <VisuallyHiddenInput onChange={e => { updateFormik.setFieldValue('image', e.currentTarget.files[0]) }} type="file" id="image" name="image" />
                            </Button>
                            <TextField
                                id="roleID"
                                name="roleID"
                                value={updateFormik.values.roleID}
                                label="Chức vụ"
                                select
                                onChange={updateFormik.handleChange}
                                onBlur={updateFormik.handleBlur}
                                error={updateFormik.touched.roleID && Boolean(updateFormik.errors.roleID)}
                                helperText={updateFormik.touched.roleID && updateFormik.errors.roleID}
                            >
                                {roles.map(role => (
                                    <MenuItem key={role.roleID} value={role.roleID}>{role.roleName}</MenuItem>
                                ))}
                            </TextField>
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
                                type="password"
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
                        maxHeight: '100%',
                        overflowY: 'auto',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        borderRadius: 2,
                        p: 3,
                    }}
                >
                    <Typography variant="h6" component="h6" mb={2}>Tạo mới hồ sơ nhân viên</Typography>
                    {
                        warningAlert.map((item, index) => (
                            <Alert key={index} sx={{ mb: 2 }} severity="warning">{item}</Alert>
                        ))
                    }
                    <form onSubmit={createFormik.handleSubmit}>
                        <Stack spacing={2}>
                            {
                                createFormik.values.image !== null && (
                                    <img width="100%" src={URL.createObjectURL(createFormik.values.image)} alt={'Img'} />
                                )
                            }
                            <Button component="label" variant="contained">
                                Tải ảnh lên
                                <VisuallyHiddenInput onChange={e => { createFormik.setFieldValue('image', e.currentTarget.files[0]) }} type="file" id="image" name="image" />
                            </Button>
                            <TextField
                                id="roleID"
                                name="roleID"
                                value={createFormik.values.roleID}
                                label="Chức vụ"
                                select
                                onChange={createFormik.handleChange}
                                onBlur={createFormik.handleBlur}
                                error={createFormik.touched.roleID && Boolean(createFormik.errors.roleID)}
                                helperText={createFormik.touched.roleID && createFormik.errors.roleID}
                            >
                                {roles.map(role => (
                                    <MenuItem key={role.roleID} value={role.roleID}>{role.roleName}</MenuItem>
                                ))}
                            </TextField>
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
                                type="password"
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
                        Quản lí nhân viên
                    </Typography>
                    <Typography variant="p" component="p" sx={{ fontSize: 14, color: '#555' }}>
                        Dưới đây là danh sách thông tin các nhân viên!
                    </Typography>
                    {!!successAlert && <Alert severity="success" sx={{ mt: 1 }}>{successAlert}</Alert>}
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                            variant="contained"
                            onClick={() => {
                                setCreateModalOpen(true);
                            }}
                        >
                            Thêm nhân viên
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
                <Loader loading={rows !== null}>
                    <Box sx={{ mt: 2 }}>
                        {
                            rows?.length > 0 ?
                                (
                                    <DataGrid
                                        rows={rows}
                                        columns={columns}
                                        initialState={{
                                            pagination: {
                                                paginationModel: { page: 0, pageSize: 20 },
                                            },
                                        }}
                                        pageSizeOptions={[20, 50]}
                                        checkboxSelection
                                        onRowSelectionModelChange={handleModelChange}
                                    />
                                ) : (
                                    <NoDataMessage />
                                )
                        }
                    </Box>
                </Loader>
            </Box>
        </>
    );
}

export default EmployeeManagement;
