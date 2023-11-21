import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
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
import useStyles from '~/styles';
import {
    createMatCateValidationScheme,
    createProCateValidationScheme,
    updateMatCateValidationScheme,
} from '~/validation/categoriesValidation';
import {
    allMatCate,
    allProCate,
    createMatCate,
    createProCate,
    deleteProCates,
    updateMatCate,
    updateProCate,
} from '~/services/categoriesService';
import Loader from '~/components/Loader';

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
            {value === index && <Box>{children}</Box>}
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
    const [updateMatCateModalOpen, setUpdateMatCateModalOpen] = useState(false);

    const [proCateDCDOpen, setProCateDCDOpen] = useState(false);
    //end?

    //data truyen vao
    const [proCateRows, setProCateRows] = useState([]);
    const [selectedProCateRows, setselectedProCateRows] = useState([]);

    const [successAlert, setSuccessAlert] = useState('');

    const [proCateColumns] = useState([
        { field: 'productCategoryID', headerName: 'Mã danh mục sản phẩm', flex: 1 },
        { field: 'name', headerName: 'Tên danh mục sản phẩm', flex: 1 },
        { field: 'description', headerName: ' Mô tả', flex: 1 },

        {
            field: 'actions',
            headerName: 'Thao tác',
            flex: 1,
            renderCell: (params) => {
                return (
                    <Box>
                        <Button onClick={handleEditProCate(params.row)} variant="outlined" color="warning">
                            Chỉnh sửa
                        </Button>
                    </Box>
                );
            },
        },
    ]);
    // dnah mục vật liệu
    const matCateColumns = [
        { field: 'materialCategoryID', headerName: 'Mã danh mục nguyên liệu', flex: 1 },
        { field: 'name', headerName: 'Tên danh mục nguyên liệu ', flex: 1 },
        { field: 'description', headerName: 'Mô Tả', flex: 1 },
        {
            field: 'actions',
            headerName: 'Thao tác',
            flex: 1,
            renderCell: (params) => {
                return (
                    <Box>
                        <Button onClick={handleEditMatCate(params.row)} variant="outlined" color="warning">
                            Chỉnh sửa
                        </Button>
                    </Box>
                );
            },
        },
    ];

    const classes = useStyles();

    const handleEditMatCate = (row) => {
        return (e) => {
            e.stopPropagation();
            updateMatCateFormik.setValues({
                ...updateMatCateFormik.values,
                materialCategoryID: row.materialCategoryID,
                name: row.name,
                description: row.description,
            });
            setUpdateMatCateModalOpen(true);
        };
    };

    const handleModelChanges = (modelSelected) => {
        setselectedProCateRows(proCateRows.filter((row) => modelSelected.includes(row.id)));
    };

    //data truyen vao
    const [matCateRows, setMatCateRows] = useState([
        { id: 1, materialCategoryID: 1, name: 'Caffe', description: 'Nó là một thức ăn ngon' },
        { id: 2, materialCategoryID: 2, name: 'Chuối', description: 'Nó là một thức ăn không được ngon lém' },
        { id: 3, materialCategoryID: 3, name: 'Bầu', description: 'Nó là một thức ăn ăn được' },
    ]);

    //end danh mục vật liêu nha..

    const handleEditProCate = (row) => {
        return (e) => {
            e.stopPropagation();
            updateProCateFormik.setValues({
                ...updateProCateFormik.values,
                productCategoryID: row.productCategoryID,
                name: row.name,
                description: row.description,
            });
            setUpdateModalOpen(true);
        };
    };

    const handleModelChange = (modelSelected) => {
        setselectedProCateRows(proCateRows.filter((row) => modelSelected.includes(row.id)));
    };

    // bắt lôi chỉnh sữa
    const updateProCateFormik = useFormik({
        initialValues: {
            productCategoryID: null,
            name: '',
            description: '',
        },
        validationSchema: createProCateValidationScheme,
        onSubmit(value, { resetForm }) {
            updateProCate({
                productCategoryID: value.productCategoryID,
                name: value.name,
                description: value.description,
            }).then((res) => {
                if (res.status === 200) {
                    setUpdateModalOpen(false);
                    setSuccessAlert('Chỉnh sửa danh mục sản phẩm thành công!');
                    setTimeout(() => {
                        setSuccessAlert('');
                    }, 5000);
                    resetForm({
                        productCategoryID: null,
                        name: '',
                        description: '',
                    });
                    fetchProCateData();
                }
            });
        },
    });

    const updateMatCateFormik = useFormik({
        initialValues: {
            materialCategoryID: null,
            name: '',
            description: '',
        },
        validationSchema: updateMatCateValidationScheme,
        onSubmit(value, { resetForm }) {
            updateMatCate({
                materialCategoryID: value.materialCategoryID,
                name: value.name,
                description: value.description,
            }).then((res) => {
                if (res.status === 200) {
                    setUpdateMatCateModalOpen(false);
                    setSuccessAlert('Chỉnh sửa danh mục nguyên liệu thành công!');
                    setTimeout(() => {
                        setSuccessAlert('');
                    }, 5000);
                    fetchMatCateData();
                    resetForm({
                        name: '',
                        description: '',
                    });
                }
            });
        },
    });

    // bắt lỗi thêm danh mục sp
    const createProCateFormik = useFormik({
        initialValues: {
            name: '',
            description: '',
        },
        validationSchema: createProCateValidationScheme,
        onSubmit(value, { resetForm }) {
            createProCate({
                name: value.name,
                description: value.description,
            }).then((res) => {
                if (res.status === 200) {
                    setCreateModalOpen(false);
                    setSuccessAlert('Thêm danh mục sản phẩm thành công!');
                    setTimeout(() => {
                        setSuccessAlert('');
                    }, 5000);
                    fetchProCateData();
                    resetForm({
                        name: '',
                        description: '',
                    });
                }
            });
        },
    });
    // Formik them nguyen lieu
    const createMatCateFormik = useFormik({
        initialValues: {
            name: '',
            description: '',
        },
        validationSchema: createMatCateValidationScheme,
        onSubmit(value, { resetForm }) {
            createMatCate({
                name: value.name,
                description: value.description,
            }).then((res) => {
                if (res.status === 200) {
                    setCreateModalOpens(false);
                    setSuccessAlert('Thêm danh mục nguyên liệu thành công!');
                    setTimeout(() => {
                        setSuccessAlert('');
                    }, 5000);
                    fetchMatCateData();
                    resetForm({
                        name: '',
                        description: '',
                    });
                }
            });
        },
    });

    const handleDeleteProCate = () => {
        deleteProCates(selectedProCateRows.map((item) => item.productCategoryID)).then((res) => {
            if (res.status === 200) {
                setSuccessAlert('Xóa danh mục sản phẩm thành công!');
                setTimeout(() => {
                    setSuccessAlert('');
                }, 5000);
                fetchProCateData();
            }
        });
    };

    const handleCloseProCateDeleteConfirmation = () => {
        setProCateDCDOpen(false);
    };

    // khai báo chuyển Tab
    const [value, setValue] = useState(0);

    const handleChange = (_event, newValue) => {
        setValue(newValue);
    };
    // end

    useEffect(() => {
        fetchProCateData();
        fetchMatCateData();
    }, []);

    function fetchProCateData() {
        // Call API Pro Cate
        allProCate().then((res) => {
            setProCateRows(
                res.data.map((item, index) => ({
                    id: index + 1,
                    productCategoryID: item.productCategoryID,
                    name: item.name,
                    description: item.description,
                })),
            );
        });
    }

    function fetchMatCateData() {
        allMatCate().then((res) => {
            setMatCateRows(
                res.data.map((item, index) => ({
                    id: index + 1,
                    materialCategoryID: item.materialCategoryID,
                    name: item.name,
                    description: item.description,
                })),
            );
        });
    }

    return (
        <>
            <Dialog
                open={proCateDCDOpen}
                onClose={handleCloseProCateDeleteConfirmation}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Xác nhận xoá</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">Bạn chắc chắn muốn xoá không?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseProCateDeleteConfirmation} color="primary">
                        Hủy
                    </Button>
                    <Button onClick={handleDeleteProCate} color="primary" autoFocus>
                        Xoá
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Modal của cập nhật danh mục vật liệu  */}
            <Modal
                open={updateMatCateModalOpen}
                onClose={() => {
                    setUpdateMatCateModalOpen(false);
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
                    <Typography component="h6" variant="h6" mb={2}>
                        Chỉnh sửa danh mục nguyên liệu
                    </Typography>
                    <form onSubmit={updateMatCateFormik.handleSubmit}>
                        <Stack spacing={2}>
                            <TextField
                                id="name"
                                name="name"
                                label="Tên danh mục nguyên liệu"
                                fullWidth
                                onChange={updateMatCateFormik.handleChange}
                                onBlur={updateMatCateFormik.handleBlur}
                                value={updateMatCateFormik.values.name}
                                error={updateMatCateFormik.touched.name && Boolean(updateMatCateFormik.errors.name)}
                                helperText={updateMatCateFormik.touched.name && updateMatCateFormik.errors.name}
                            />
                            <TextField
                                id="description"
                                name="description"
                                label="Mô tả"
                                fullWidth
                                onChange={updateMatCateFormik.handleChange}
                                onBlur={updateMatCateFormik.handleBlur}
                                value={updateMatCateFormik.values.description}
                                error={
                                    updateMatCateFormik.touched.description &&
                                    Boolean(updateMatCateFormik.errors.description)
                                }
                                helperText={
                                    updateMatCateFormik.touched.description && updateMatCateFormik.errors.description
                                }
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
            {/* Modal của thêm danh mục nguyên liệu */}
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
                    <Typography component="h6" variant="h6" mb={2}>
                        Thêm danh mục nguyên liệu mới
                    </Typography>
                    <form onSubmit={createMatCateFormik.handleSubmit}>
                        <Stack spacing={2}>
                            <TextField
                                id="name"
                                name="name"
                                label="Tên danh mục vật liệu "
                                fullWidth
                                onChange={createMatCateFormik.handleChange}
                                onBlur={createMatCateFormik.handleBlur}
                                value={createMatCateFormik.values.name}
                                error={createMatCateFormik.touched.name && Boolean(createMatCateFormik.errors.name)}
                                helperText={createMatCateFormik.touched.name && createMatCateFormik.errors.name}
                            />
                            <TextField
                                id="description"
                                name="description"
                                label="Miêu tả vật liệu"
                                fullWidth
                                onChange={createMatCateFormik.handleChange}
                                onBlur={createMatCateFormik.handleBlur}
                                value={createMatCateFormik.values.description}
                                error={
                                    createMatCateFormik.touched.description &&
                                    Boolean(createMatCateFormik.errors.description)
                                }
                                helperText={
                                    createMatCateFormik.touched.description && createMatCateFormik.errors.description
                                }
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
                    <Typography component="h6" variant="h6" mb={2}>
                        Cập nhật thông tin danh mục sản phẩm
                    </Typography>
                    <form onSubmit={updateProCateFormik.handleSubmit}>
                        <Stack spacing={2}>
                            <TextField
                                id="name"
                                name="name"
                                label="Tên danh mục sản phẩm"
                                fullWidth
                                onChange={updateProCateFormik.handleChange}
                                onBlur={updateProCateFormik.handleBlur}
                                value={updateProCateFormik.values.name}
                                error={updateProCateFormik.touched.name && Boolean(updateProCateFormik.errors.name)}
                                helperText={updateProCateFormik.touched.name && updateProCateFormik.errors.name}
                            />
                            <TextField
                                id="description"
                                name="description"
                                label="Mô tả "
                                fullWidth
                                onChange={updateProCateFormik.handleChange}
                                onBlur={updateProCateFormik.handleBlur}
                                value={updateProCateFormik.values.description}
                                error={
                                    updateProCateFormik.touched.description &&
                                    Boolean(updateProCateFormik.errors.description)
                                }
                                helperText={
                                    updateProCateFormik.touched.description && updateProCateFormik.errors.description
                                }
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
            {/* Modal của thêm danh mục sản phẩm  */}
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
                    <Typography component="h6" variant="h6" mb={2}>
                        Thêm danh mục sản phẩm mới
                    </Typography>
                    <form onSubmit={createProCateFormik.handleSubmit}>
                        <Stack spacing={2}>
                            <TextField
                                id="name"
                                name="name"
                                label="Tên danh mục sản phẩm "
                                fullWidth
                                onChange={createProCateFormik.handleChange}
                                onBlur={createProCateFormik.handleBlur}
                                value={createProCateFormik.values.name}
                                error={createProCateFormik.touched.name && Boolean(createProCateFormik.errors.name)}
                                helperText={createProCateFormik.touched.name && createProCateFormik.errors.name}
                            />
                            <TextField
                                id="description"
                                name="description"
                                label="Mô tả"
                                fullWidth
                                onChange={createProCateFormik.handleChange}
                                onBlur={createProCateFormik.handleBlur}
                                value={createProCateFormik.values.description}
                                error={
                                    createProCateFormik.touched.description &&
                                    Boolean(createProCateFormik.errors.description)
                                }
                                helperText={
                                    createProCateFormik.touched.description && createProCateFormik.errors.description
                                }
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
                        <Tab label="Sản phẩm" {...a11yProps(0)} />
                        <Tab label="Nguyên liệu" {...a11yProps(1)} />
                    </Tabs>
                </Box>
            </>

            {/* Panel sản phẩm */}
            <CustomTabPanel value={value} index={0}>
                <Box className={classes.pageSpacing}>
                    <Box>
                        <Typography variant="h4" component="h4">
                            Danh mục sản phẩm
                        </Typography>
                        <Typography variant="p" component="p" sx={{ fontSize: 14, color: '#555' }}>
                            Dưới đây là danh sách danh mục sản phẩm!
                        </Typography>
                        {!!successAlert && (
                            <Alert severity="success" sx={{ mt: 1 }}>
                                {successAlert}
                            </Alert>
                        )}
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    setCreateModalOpen(true);
                                }}
                            >
                                Thêm danh mục sản phẩm
                            </Button>
                            {!!selectedProCateRows.length && (
                                <Button
                                    onClick={() => {
                                        setProCateDCDOpen(true);
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
                        {!!proCateRows?.length ? (
                            <DataGrid
                                rows={proCateRows}
                                columns={proCateColumns}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 5 },
                                    },
                                }}
                                pageSizeOptions={[5, 10]}
                                checkboxSelection
                                onRowSelectionModelChange={handleModelChange}
                            />
                        ) : (
                            <Loader />
                        )}
                    </Box>
                </Box>
            </CustomTabPanel>

            {/* Panel nguyên liệu */}
            <CustomTabPanel value={value} index={1}>
                <Box className={classes.pageSpacing}>
                    <Box>
                        <Typography variant="h4" component="h4">
                            Danh mục nguyên liệu
                        </Typography>
                        <Typography variant="p" component="p" sx={{ fontSize: 14, color: '#555' }}>
                            Dưới đây là danh sách danh mục nguyên liệu!
                        </Typography>
                        {!!successAlert && (
                            <Alert severity="success" sx={{ mt: 1 }}>
                                {successAlert}
                            </Alert>
                        )}
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    setCreateModalOpens(true);
                                }}
                            >
                                Thêm danh mục nguyên liệu mới
                            </Button>
                            {!![].length && (
                                <Button
                                    onClick={() => {
                                        setProCateDCDOpen(true);
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
                        {!!matCateRows?.length ? (
                            <DataGrid
                                // truyển tên cột tên bản vào đây
                                rows={matCateRows}
                                columns={matCateColumns}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 5 },
                                    },
                                }}
                                pageSizeOptions={[5, 10]}
                                checkboxSelection
                                onRowSelectionModelChange={handleModelChanges}
                            />
                        ) : (
                            <Loader />
                        )}
                    </Box>
                </Box>
            </CustomTabPanel>
        </>
    );
}
export default CategoryManagement;
