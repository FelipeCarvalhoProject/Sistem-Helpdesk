import sql from "mssql";

export const dbConfig = {
    user: "adm",
    password:"felipeqwe123",
    server: "DESKTOP-ETNM96H\SQLEXPRESS",
    database:"DashboardDB",
    options: {
        encrypt: true,
        trustServerCertificate: true,
    }

};


export async function getConnection() {
    try {
        const poll = await sql.connect(dbConfig);
        return poll;
    } catch (error) {
        console.error("Falha ao conectar no banco de dados: ", error);
        throw error;
    }   
    
}