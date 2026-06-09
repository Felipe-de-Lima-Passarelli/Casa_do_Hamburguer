import { type Request, type Response, Router } from "express";
import { prisma } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      response
        .status(400)
        .json({ message: "E-mail e senha são obrigatórios." });
      return;
    }

    const user = await prisma.user.findFirst({
      where: { email: email },
    });

    if (!user) {
      response.status(404).json({ message: "Usuário não encontrado" });
      return;
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      response.status(401).json({ message: "Credenciais inválidas" });
      return;
    }

    const userInfos = {
      id: user.id,
      name: user.name,
      email: user.email,
      cep: user.cep,
      admin: user.admin,
    };

    if (!process.env.JWT_SECRET) {
      return;
    }

    const token = jwt.sign(userInfos, process.env.JWT_SECRET);

    response.cookie("user", token, {
      //      h    m    s     ms
      maxAge: 5 * 60 * 60 * 1000,
    });

    response.status(200).json(userInfos);
  } catch (error) {
    response.status(500).json({ message: "Erro no servidor." });
    return;
  }
};

export const register = async (request: Request, response: Response) => {
  try {
    const { name, email, password, cep } = request.body;

    if (!name || !email || !password || !cep) {
      response
        .status(400)
        .json({ message: "Todas as informações são obrigatórias" });
      return;
    }

    const user = await prisma.user.findFirst({
      where: { email: email },
    });

    if (user?.email) {
      response.status(409).json({ message: "E-mail já cadastrado" });
      return;
    }

    const cryptPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { name: name, email: email, password: cryptPassword, cep: cep },
    });

    response
      .status(201)
      .json({ name: newUser.name, email: newUser.email, cep: newUser.cep });
  } catch (error) {
    response.status(500).json({ message: "Erro no servidor." });
    return;
  }
};

export const auth = async (request: Request, response: Response) => {
  try {
    const { user } = request;

    response.status(200).json(user);
  } catch (error) {
    response.status(500).json({ message: "Erro no servidor" });
    return;
  }
};

export const logout = async (request: Request, response: Response) => {
  const { user } = request.cookies;

  if (user) {
    response.clearCookie("user");
    response.json({ message: "Usuário deslogado" });
  }
};
