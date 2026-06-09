import type { Request, Response } from "express";
import { prisma } from "../db.js";

export const getProducts = async (request: Request, response: Response) => {
  try {
    const products = await prisma.product.findMany();

    if (products.length === 0) {
      response.status(404).json({ message: "Não foram encontrados produtos" });
      return;
    }

    response.status(200).json(products);
  } catch (error) {
    response.status(500).json({ message: "Erro no servidor" });
  }
};

export const deleteProduct = async (request: Request, response: Response) => {
  try {
    const { user } = request;
    const { id } = request.params;

    if (!user.admin) {
      response.status(400).json({ message: "Usuário não autorizado" });
      return;
    }

    if (!id) {
      response.status(400).json({ message: "ID não encontrado" });
      return;
    }

    const deletedProduct = await prisma.product.delete({
      where: { id: id as string },
    });

    if (!deleteProduct) {
      response.status(404).json({ message: "Erro ao deletar o produto" });
      return;
    }

    response.json({ message: "Produto deletado" });
  } catch (error: any) {
    if (error.code === "2") {
      response.json({ message: "Produto não encontrado." });
      return;
    }
    response.status(500).json({ message: "Erro no servidor" });
    return;
  }
};
