import { useEffect, useState } from "react";
import { Alert, Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useFormik } from "formik";

import useStyles from "~/styles";
import { allRoles, createRole, deleteRoles, updateRole } from "~/services/rolesService";
import { roleSchemeValidation } from "~/validation/roleValidation";

function RoleManagement() {
    const [columns] = useState([
        {
            field: 'roleID',
            headerName: 'Mã vai trò',
            flex: 1,
        },
        {
            field: 'roleName',
            headerName: 'Tên vai trò',
            flex: 1,
        },
        {
            field: 'actions',
            headerName: 'Thao tác',
            flex: 1,
            renderCell: params => {
                return (
                    <Box>
                        <Button onClick={handleEdit(params.row)} variant="outlined" color="warning">Chỉnh sửa</Button>
                    </Box>
                )
            },
        },
    ])
    const [rows, setRows] = useState([])

    const [createModalOpen, setCreateModalOpen] = useState(false)
    const [updateModalOpen, setUpdateModalOpen] = useState(false)
    const [successAlert, setSuccessAlert] = useState('')
    const [warningAlert, setWarningAlert] = useState([])
    const [selectedRows, setSelectedRows] = useState([])

    const classes = useStyles()

    const formik = useFormik({
        initialValues: {
            roleID: '',
            roleName: '',
        },
        validationSchema: roleSchemeValidation,
        onSubmit: (value, { setValues }) => {
            createRole(
                {
                    roleID: value.roleID,
                    roleName: value.roleName,
                }
            )
                .then(res => {
                    if (res.status === 200) {
                        async function fetchData() {
                            const res = await allRoles();
                            if (res.status === 200) {
                                setRows(res.data.map((role, index) => ({
                                    id: index + 1,
                                    roleID: role.roleID,
                                    roleName: role.roleName,
                                })))
                            }
                        }
                        fetchData();
                        setCreateModalOpen(false);
                        setSuccessAlert('Thêm vai trò thành công!')
                        setTimeout(() => {
                            setSuccessAlert('')
                        }, 5000);
                        setWarningAlert([])
                        setValues({
                            roleID: '',
                            roleName: '',
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

    const updateFormik = useFormik({
        initialValues: {
            roleID: '',
            roleName: '',
        },
        validationSchema: roleSchemeValidation,
        onSubmit: (value, { setValues }) => {
            updateRole(
                {
                    roleID: value.roleID,
                    roleName: value.roleName,
                }
            )
                .then(res => {
                    if (res.status === 200) {
                        async function fetchData() {
                            const res = await allRoles();
                            if (res.status === 200) {
                                setRows(res.data.map((role, index) => ({
                                    id: index + 1,
                                    roleID: role.roleID,
                                    roleName: role.roleName,
                                })))
                            }
                        }
                        fetchData();
                        setUpdateModalOpen(false);
                        setSuccessAlert('Chỉnh sửa vai trò thành công!')
                        setTimeout(() => {
                            setSuccessAlert('')
                        }, 5000);
                        setWarningAlert([])
                        setValues({
                            roleID: '',
                            roleName: '',
                        })
                    }
                })
                .catch(err => {
                    if (err.response) {
                        setWarningAlert(err.response.data.errors)
                    }
                })
        },
    })

    const handleEdit = (row) => {
        return e => {
            e.stopPropagation();
            updateFormik.setValues({
                ...formik.values,
                roleID: row.roleID,
                roleName: row.roleName,
            });
            setUpdateModalOpen(true)
        }
    }

    const handleModelChange = (modelSelected) => {
        setSelectedRows(rows.filter(row => modelSelected.includes(row.id)))
    }

    const handleClickDelete = () => {
        deleteRoles(selectedRows.map(item => item.roleID))
            .then(res => {
                if (res.status === 200) {
                    async function fetchData() {
                        const res = await allRoles();
                        if (res.status === 200) {
                            setRows(res.data.map((role, index) => ({
                                id: index + 1,
                                roleID: role.roleID,
                                roleName: role.roleName,
                            })))
                        }
                    }
                    fetchData();
                    setSuccessAlert('Xóa thành công!')
                    setTimeout(() => {
                        setSuccessAlert('')
                    }, 5000);
                }
            })
    }

    useEffect(() => {
        async function fetchData() {
            const res = await allRoles();
            if (res.status === 200) {
                setRows(res.data.map((role, index) => ({
                    id: index + 1,
                    roleID: role.roleID,
                    roleName: role.roleName,
                })))
            }
        }
        fetchData();
    }, [])

    return (
        <>
            {/* Modal thêm */}
            <Modal
                open={createModalOpen}
                onClose={() => { setCreateModalOpen(false) }}
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
                    <form onSubmit={formik.handleSubmit}>
                        <Typography variant="h6" component="h6" mb={2}>Tạo vai trò mới</Typography>
                        {
                            warningAlert.map((item, index) => (
                                <Alert key={index} sx={{ mb: 2 }} severity="warning">{item}</Alert>
                            ))
                        }
                        <Stack spacing={2}>
                            <TextField
                                id="roleID"
                                name="roleID"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.roleID}
                                error={formik.touched.roleID && Boolean(formik.errors.roleID)}
                                helperText={formik.touched.roleID && formik.errors.roleID}
                                label="Mã vai trò"
                                fullWidth
                            />
                            <TextField
                                id="roleName"
                                name="roleName"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.roleName}
                                error={formik.touched.roleName && Boolean(formik.errors.roleName)}
                                helperText={formik.touched.roleName && formik.errors.roleName}
                                label="Tên vai trò"
                                fullWidth
                            />
                        </Stack>
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                            <Button type="submit" variant="contained">Tạo</Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
            {/* Modal chỉnh sửa */}
            <Modal
                open={updateModalOpen}
                onClose={() => { setUpdateModalOpen(false) }}
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
                        <Typography variant="h6" component="h6" mb={2}>Chỉnh sửa vai trò</Typography>
                        {
                            warningAlert.map((item, index) => (
                                <Alert key={index} sx={{ mb: 2 }} severity="warning">{item}</Alert>
                            ))
                        }
                        <TextField
                            id="roleName"
                            name="roleName"
                            onChange={updateFormik.handleChange}
                            onBlur={updateFormik.handleBlur}
                            value={updateFormik.values.roleName}
                            error={updateFormik.touched.roleName && Boolean(updateFormik.errors.roleName)}
                            helperText={updateFormik.touched.roleName && updateFormik.errors.roleName}
                            label="Tên vai trò"
                            fullWidth
                        />
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                            <Button type="submit" variant="contained">Cập nhật</Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
            <Box className={classes.pageSpacing}>
                <Typography variant="h4" component="h4">Quản lí vai trò</Typography>
                <Typography variant="p" component="p" sx={{ fontSize: 14, color: '#555' }}>
                    Không nên thao tác vào các thành phần này, vì nó ảnh hưởng tới bảo mật ứng dụng!
                </Typography>
                {successAlert && <Alert sx={{ mt: 1 }}>{successAlert}</Alert>}
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="contained" onClick={() => { setCreateModalOpen(true) }}>Thêm vai trò</Button>
                    <Button onClick={handleClickDelete} sx={{ ml: 1 }} variant="contained" color="error">Xóa</Button>
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

export default RoleManagement;