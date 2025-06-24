import { Request, Response } from "express";
import { AppDataSource } from "../db/data-source";
import { User } from "../models/User";

const userRepo = AppDataSource.getRepository(User);

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const existing = await userRepo.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: "Email já em uso." });

    const newUser = userRepo.create({ name, email, password });
    await userRepo.save(newUser);
    return res.status(201).json({ message: "Usuário cadastrado com sucesso." });
  } catch (err) {
    console.error("Erro no cadastro:", err);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await userRepo.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "Usuário não encontrado." });

    const isValid = await user.comparePassword(password);
    if (!isValid) return res.status(401).json({ message: "Senha incorreta." });

    return res.status(200).json({ message: "Login realizado com sucesso." });
  } catch (err) {
    console.error("Erro no login:", err);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};
