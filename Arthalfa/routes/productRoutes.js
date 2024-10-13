import { Router } from "express";
import { addProduct, deleteProduct, getProduct, getProductList, updateProduct } from "../controllers/productController.js";
import { validateProduct } from "../middlewares/isValidProduct.js";
const router = Router();

/**Requirements
 * POST /products - Add a new product.
 * GET /products - Get a list of all products.
 * GET /products/:id - Get details of a single product by ID.
 * PUT /products/:id - Update an existing product.
 * DELETE /products/:id - Delete a product by ID.
 */

router.post('/products',validateProduct('create'),addProduct);
router.get('/products',getProductList);
router.get('/products/:id',getProduct)
router.put('/products/:id',validateProduct('update'),updateProduct);
router.delete('/products/:id',deleteProduct);

export default router;