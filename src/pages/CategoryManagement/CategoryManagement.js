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
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';

// chuyển Tab nha..
function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

//end chuyên Tab.

function CategoryManagement() {
    // khai báo danh mục sản phẩm
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);

    //end?

    // khai báo danh mục vật liêu
    const [createModalOpens, setCreateModalOpens] = useState(false);
    const [updateModalOpens, setUpdateModalOpens] = useState(false);
    //end?

    const [selectedRows, setSelectedRows] = useState([]);
    const [successAlert, setSuccessAlert] = useState('');
    const columns = [
        { field: 'danhmucID', headerName: 'Danh mục  sản phẩm(ID)', flex: 1 },
        { field: 'name', headerName: 'Tên sản phẩm', flex: 1 },
        { field: 'mieuta', headerName: ' Miêu tả', flex: 1 },

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
    // dnah mục vật liệu
    const columsMaterial = [
        { field: 'materialCategoryID', headerName: 'Danh mục vật liệu(ID)', flex: 1 },
        { field: 'name', headerName: 'Tên vật liệu ', flex: 1 },
        { field: 'mieuta', headerName: 'Miêu Tả', flex: 1 },
        {
            field: 'actions',
            headerName: 'Thao tác',
            flex: 1,
            renderCell: (params) => {
                return (
                    <Box>
                        <Button onClick={handleEdits(params.row)} variant="outlined" color="warning">
                            Chỉnh sửa
                        </Button>
                    </Box>
                );
            },
        },
    ];

    const handleEdits = (row) => {
        return (e) => {
            e.stopPropagation();
            updateFormiks.setValues({
                ...updateFormiks.values,
                name: row.name,
                mieuta: row.mieuta,
            });
            setUpdateModalOpen(true);
        };
    };

    const handleModelChanges = (modelSelected) => {
        setSelectedRows(rowss.filter((row) => modelSelected.includes(row.id)));
    };

    // bắt lôi chỉnh sữa
    const updateFormiks = useFormik({
        initialValues: {
            name: '',
            mieuta: '',
        },
        validationSchema: object({
            name: string().required('Tên vât liệu  không được trống '),
            mieuta: string().required('Miêu tả không đựợc để trống'),
        }),
        onSubmit(value) {
            setUpdateModalOpen(false);
            setSuccessAlert('Chỉnh sửa danh mục vật liệu  thành công!');
            setTimeout(() => {
                setSuccessAlert('');
            }, 5000);
        },
    });

    //  bắt lỗi  nha  thêm danh mục
    const createFormiks = useFormik({
        initialValues: {
            name: '',
            mieuta: '',
        },
        validationSchema: object({
            name: string().required('Tên vật liệu  không được trống '),

            mieuta: string().required('Miêu tả không đựợc để trống'),
        }),

        onSubmit(value) {
            setCreateModalOpen(false);
            setSuccessAlert('Thêm danh mục vật liệu  thành công!');
            setTimeout(() => {
                setSuccessAlert('');
            }, 5000);
        },
    });

    //data truyen vao
    const rowss = [
        { id: 1, danhmucVatlieuID: 1, name: 'Caffe', mieuta: 'Nó là một thức ăn ngon' },
        { id: 2, danhmucVatlieuID: 2, name: 'Chuối', mieuta: 'Nó là một thức ăn không được ngon lém' },
        { id: 3, danhmucVatlieuID: 3, name: 'Bầu', mieuta: 'Nó là một thức ăn ăn được' },
    ];

    //end danh mục vật liêu nha..

    const handleEdit = (row) => {
        return (e) => {
            e.stopPropagation();
            updateFormik.setValues({
                ...updateFormik.values,
                name: row.name,
                mieuta: row.mieuta,
            });
            setUpdateModalOpen(true);
        };
    };

    const handleModelChange = (modelSelected) => {
        setSelectedRows(rows.filter((row) => modelSelected.includes(row.id)));
    };

    // bắt lôi chỉnh sữa
    const updateFormik = useFormik({
        initialValues: {
            name: '',
            mieuta: '',
        },
        validationSchema: object({
            name: string().required('Tên nhân danh muc không được trống '),
            mieuta: string().required('Miêu t không đựợc để trống'),
        }),
        onSubmit(value) {
            setUpdateModalOpen(false);
            setSuccessAlert('Chỉnh sửa danh mục sản phẩm thành công!');
            setTimeout(() => {
                setSuccessAlert('');
            }, 5000);
        },
    });

    //  bắt lỗi  nha  thêm danh mục
    const createFormik = useFormik({
        initialValues: {
            name: '',
            mieuta: '',
        },
        validationSchema: object({
            name: string().required('Tên nhân danh muc không được trống '),

            mieuta: string().required('Miêu ta không đựợc để trống'),
        }),

        onSubmit(value) {
            setCreateModalOpen(false);
            setSuccessAlert('Thêm danh mục sản phẩm thành công!');
            setTimeout(() => {
                setSuccessAlert('');
            }, 5000);
        },
    });

    //data truyen vao
    const rows = [
        { id: 1, danhmucID: 1, name: 'Caffe', mieuta: 'Nó là một thức ăn ngon' },
        { id: 2, danhmucID: 2, name: 'Chuối', mieuta: 'Nó là một thức ăn không được ngon lém' },
        { id: 3, danhmucID: 3, name: 'Bầu', mieuta: 'Nó là một thức ăn ăn được' },
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

    // khai báo chuyển Tab

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // end
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

            {/* Modal của  danh mục nguyên vật liệu nha  */}
            {/* Modal của cập nhật danh mụ vật liệu  */}
            <Modal
                open={updateModalOpens}
                onClose={() => {
                    setUpdateModalOpens(false);
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
                    <form onSubmit={updateFormiks.handleSubmit}>
                        <Stack spacing={2}>
                            <TextField
                                id="name"
                                name="name"
                                label="Tên danh mục vật liệu"
                                fullWidth
                                onChange={updateFormiks.handleChange}
                                onBlur={updateFormiks.handleBlur}
                                value={updateFormiks.values.name}
                                error={updateFormiks.touched.name && Boolean(updateFormiks.errors.name)}
                                helperText={updateFormiks.touched.name && updateFormiks.errors.name}
                            />
                            <TextField
                                id="mieuta"
                                name="mieuta"
                                label="Miêu tả vật liệu "
                                fullWidth
                                onChange={updateFormiks.handleChange}
                                onBlur={updateFormiks.handleBlur}
                                value={updateFormiks.values.mieuta}
                                error={updateFormiks.touched.mieuta && Boolean(updateFormiks.errors.mieuta)}
                                helperText={updateFormiks.touched.mieuta && updateFormiks.errors.mieuta}
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
                open={createModalOpens}
                onClose={() => {
                    setCreateModalOpens(false);
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
                    <form onSubmit={createFormiks.handleSubmit}>
                        <Stack spacing={2}>
                            <TextField
                                id="name"
                                name="name"
                                label="Tên danh mục vật liệu "
                                fullWidth
                                onChange={createFormik.handleChange}
                                onBlur={createFormik.handleBlur}
                                value={createFormik.values.name}
                                error={createFormik.touched.name && Boolean(createFormik.errors.name)}
                                helperText={createFormik.touched.name && createFormik.errors.name}
                            />
                            <TextField
                                id="mieuta"
                                name="mieuta"
                                label="Miêu tả vật liệu"
                                fullWidth
                                onChange={createFormik.handleChange}
                                onBlur={createFormik.handleBlur}
                                value={createFormik.values.mieuta}
                                error={createFormik.touched.mieuta && Boolean(createFormik.errors.mieuta)}
                                helperText={createFormik.touched.mieuta && createFormik.errors.mieuta}
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
            {/*  end  danh mục vật liệu */}

            {/* Modal của cập nhật sản phảm  */}
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
                                label="Tên danh mục sản phẩm"
                                fullWidth
                                onChange={updateFormik.handleChange}
                                onBlur={updateFormik.handleBlur}
                                value={updateFormik.values.name}
                                error={updateFormik.touched.name && Boolean(updateFormik.errors.name)}
                                helperText={updateFormik.touched.name && updateFormik.errors.name}
                            />
                            <TextField
                                id="mieuta"
                                name="mieuta"
                                label="Miêu tả sản phẩm "
                                fullWidth
                                onChange={createFormik.handleChange}
                                onBlur={createFormik.handleBlur}
                                value={createFormik.values.mieuta}
                                error={createFormik.touched.mieuta && Boolean(createFormik.errors.mieuta)}
                                helperText={createFormik.touched.mieuta && createFormik.errors.mieuta}
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
            {/* Modal của thêm sản phẩm  */}
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
                                label="Tên danh mục sản phẩm "
                                fullWidth
                                onChange={createFormik.handleChange}
                                onBlur={createFormik.handleBlur}
                                value={createFormik.values.name}
                                error={createFormik.touched.name && Boolean(createFormik.errors.name)}
                                helperText={createFormik.touched.name && createFormik.errors.name}
                            />
                            <TextField
                                id="mieuta"
                                name="mieuta"
                                label="Miêu tả"
                                fullWidth
                                onChange={createFormik.handleChange}
                                onBlur={createFormik.handleBlur}
                                value={createFormik.values.mieuta}
                                error={createFormik.touched.mieuta && Boolean(createFormik.errors.mieuta)}
                                helperText={createFormik.touched.mieuta && createFormik.errors.mieuta}
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

            <>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Sản Phẩm" {...a11yProps(0)} />
                        <Tab label="Vật liệu" {...a11yProps(1)} />
                    </Tabs>
                </Box>
            </>

            <CustomTabPanel value={value} index={0}>
                <Box sx={{ p: 2 }}>
                    <Box>
                        <Typography variant="h4" component="h4">
                            Danh mục sản phẩm
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
                                Thêm vào danh mục sản phẩm
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
            </CustomTabPanel>

            <CustomTabPanel value={value} index={1}>
                <Box sx={{ p: 2 }}>
                    <Box>
                        <Typography variant="h4" component="h4">
                            Danh mục vật liệu
                        </Typography>
                        <Typography variant="p" component="p" sx={{ fontSize: 14, color: '#555' }}>
                            Không nên thao tác vào các thành phần này, vì nó ảnh hưởng tới bảo mật ứng dụng!
                        </Typography>
                        {!!successAlert && <Alert severity="success">{successAlert}</Alert>}
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    setCreateModalOpens(true);
                                }}
                            >
                                Thêm vào danh mục vật liệu
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
                            // truyển tên cột tên bản vào đây
                            rows={rowss}
                            columns={columsMaterial}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                            }}
                            pageSizeOptions={[5, 10]}
                            checkboxSelection
                            onRowSelectionModelChange={handleModelChanges}
                        />
                    </Box>
                </Box>
            </CustomTabPanel>
        </>
    );
}
export default CategoryManagement;
