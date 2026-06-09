//Express
import { Router } from "express";

//Functions
import { login, register, auth, logout } from "./controller/user-controller.js";
import { deleteProduct, getProducts } from "./controller/product-controller.js";
import {
  createCartItem,
  getCartItems,
} from "./controller/cartItem-controller.js";

//Middlewares
import { authMiddleware } from "./middlewares/auth.js";

export const router = Router();

//Rotas de usuário
router.post("/login", login);
router.post("/cadastro", register);
router.get("/me", authMiddleware, auth);
router.post("/logout", authMiddleware, logout);

//Rotas de produto
router.get("/products", getProducts);
router.delete("/delete-product/:id", authMiddleware, deleteProduct);

//Rotas do carrinho
router.get("/getitems", authMiddleware, getCartItems);
router.post("/create-cart-items", authMiddleware, createCartItem);
