import sql from "mssql";

export const dbConfig = {
    user: "sa",
    password:"",
    server: "DESKTOP-ETNM96H\SQLEXPRESS",
    database:"DashboardDB",
    options: {
        encrypt: true,
        trustServerCertificate: true,
    }

};

export async function getConnection() {
    return await sql.connect(dbConfig);

}