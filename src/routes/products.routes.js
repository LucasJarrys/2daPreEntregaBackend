import { Router } from "express";
import productManager from "../productManager.js";
import { checkProductData } from "../middlewares/checkPorductData.middleware.js";

const router = Router();


router.get("/", async (req, res) => {
    try {
        const {limit} = req.query;
        const productos = await productManager.getProductos(limit);

        res.status(200).json({status: "success", productos})
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "Error", msg: "Error interno del servidor"});
    }
});

router.get("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        const producto = await productManager.getProductoById(Number(pid));
        if (!producto) return res.status(404).json({ status: "Error", msg: "Producto no encontrado" });

        res.status(200).json({status: "success", producto})
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "Error", msg: "Error interno del servidor"});
    }
});


router.post("/", checkProductData, async (req, res) => {
    try {
        const body = req.body;
        const producto = await productManager.addProducto(body);


        res.status(201).json({status: "success", producto})
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "Error", msg: "Error interno del servidor"});
    }
});

router.put("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        const body = req.body
        const producto = await productManager.updateProducto(Number(pid), body);
        if (!producto) return res.status(404).json({ status: "Error", msg: "Producto no encontrado" });

        res.status(200).json({status: "success", producto})
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "Error", msg: "Error interno del servidor"});
    }
});

router.delete("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        const producto = await productManager.deleteProducto(Number(pid));
        if (!producto) return res.status(404).json({ status: "Error", msg: "Producto no encontrado" });

        res.status(200).json({status: "success", msg: `El producto con el id ${pid} fue eliminado`});
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "Error", msg: "Error interno del servidor"});
    }
});


export default router;

