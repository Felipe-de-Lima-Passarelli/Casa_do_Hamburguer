import type { Request, Response } from "express";
import { prisma } from "../db.js";
import { connect } from "node:http2";

export const getCartItems = async (request: Request, response: Response) => {
  try {
    const { user } = request;

    const cartItems = await prisma.cartItem.findMany({
      where: { userId: user.id },
      include: { product: true, user: true },
    });
    response.status(200).json(cartItems);
  } catch (error) {
    response.status(500).json({ message: "Erro no servidor" });
    return;
  }
};

export const createCartItem = async (request: Request, response: Response) => {
  try {
    const { user } = request;
    const { productId } = request.body;

    if (!productId) {
      response.status(400).json({ message: "ProductId é obrigatório" });
      return;
    }

    const existingItem = await prisma.cartItem.findFirst({
      where: { productId: productId, userId: user.id },
    });

    let cartItem;

    if (existingItem) {
      cartItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: { increment: 1 } },
      });
    } else {
      cartItem = await prisma.cartItem.create({
        data: {
          product: { connect: { id: productId } },
          user: { connect: { id: user.id } },
        },
      });
    }

    const statusCode = cartItem.quantity === 1 ? 201 : 200;

    response.status(statusCode).json(cartItem);
  } catch (error) {
    response
      .status(500)
      .json({ message: "Erro ao adicionar item ao carrinho" });
    return;
  }
};
