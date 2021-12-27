const express=require('express');
const router=express.Router();

//Brand
const {CreateBrand,updateBrand,GetBrand,GetById}=require('../controllers/brand');
//Product
const{createProduct,getAllProducts,getProductById,updateProduct,deleteProduct, getProductByOutletId}=require('../controllers/product');
//Outlet
const{createOutlet,getOutlet,getOutletById, updateOutlet,deleteOutlet}=require('../controllers/outlet')

router.get('/', (req, res)=> {
    res.send('Hello world') 
    });

//Brand
router.get('/brand',GetBrand);
router.get('/brand/:id',GetById);
router.post('/brand',CreateBrand);
router.put('/brand/:id',updateBrand);

//Product
router.get('/brand/:brandId/outlet/:id/product',getProductByOutletId);
router.get('/product',getAllProducts);
router.get('/brand/:brandId/outlet/:outletId/product/:id',getProductById);
router.post('/brand/:brandId/outlet/:id/product',createProduct);
router.put('/brand/:brandId/outlet/:outletId/product/:id',updateProduct);
router.delete('/product/:id',deleteProduct);

//Outlet
router.get('/brand/:id/outlet',getOutlet);
router.get('/brand/:brandId/outlet/:id',getOutletById);
router.post('/brand/:id/outlet',createOutlet);
router.put('/brand/:brandId/outlet/:id',updateOutlet);
router.delete('/brand/:brandId/outlet/:id',deleteOutlet);



module.exports=router;