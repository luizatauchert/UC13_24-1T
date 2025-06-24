import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/RoutesUser";
import { AppDataSource } from "./db/data-source";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api", userRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Conectado ao banco");
    app.listen(PORT, () => console.log(`🚀 Server rodando em http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error("❌ Falha ao conectar no banco:", err);
  });
