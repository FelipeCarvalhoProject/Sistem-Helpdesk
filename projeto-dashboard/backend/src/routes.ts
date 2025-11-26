// routes.ts - CORRIGIDO

import { Router, Request, Response } from "express"; 
import { getConnection } from "./database.js";      
import sql from "mssql";                             

const router = Router();

// Rota GET para buscar todos os registros
router.get("/registros", async (req: Request, res: Response) => {
    try {
        const conn = await getConnection();
        const result = await conn.request().query("SELECT * FROM Dados");
        res.json(result.recordset);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar registros." });
    }
});

// Rota POST para inserir um novo registro
router.post("/registros", async (req: Request, res: Response) => {
    // Correção 4: Usando 'name' para consistência com a query SQL
    const { name, valor } = req.body;

    // Validação simples para garantir que os dados foram enviados
    if (!name || valor == null) {
        return res.status(400).json({ message: "Dados incompletos. 'name' e 'valor' são obrigatórios." });
    }

    try {
        const conn = await getConnection();
        await conn
            .request()
            // Define o tipo do dado para segurança (evita SQL Injection)
            .input("name", sql.VarChar, name) 
            .input("valor", sql.Decimal, valor) // Assumindo que 'valor' é um número. Se for texto, use sql.VarChar
            .query("INSERT INTO Dados (name, valor) VALUES (@name, @valor)");
        
        res.status(201).json({ message: "Registro inserido com sucesso" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao inserir registro." });
    }
});

export default router;
