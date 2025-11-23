import {Router} from "express";
import{getConnection}from"./database.js";


const router = Router();
router.get("/registros", async (req, res) => {
    const conn = await getConnection();
    const result = await conn.request().query("SELECT * FROM Dados");
    res.json(result.recordset);

});

router.post("/registros", async (req, res) => {
    const {nome, valor} = req.body;
    const conn = await getConnection();
    await conn
        .request()
        .input("nome", nome)
        .input("valor", valor)
        .query("INSERT INTO Dados (name, valor) VALUES (@name, @valor)");
    res.json({message: "Registro inserido com sucesso"});

});
export default router;
