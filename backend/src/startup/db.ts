import { Connection, createConnection } from "typeorm";

let connection: Connection = null;

export async function dbStartUp() {
    if (!connection) {
        connection = await createConnection({
            type: "mysql",
            host: process.env.HOST,
            port: 3306,
            username: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
            entities: [__dirname + "/../entity/*.ts"],
            synchronize: true,
            logging: false,
        });
        console.log("connected successfully to DB....");
    }
}

export default connection;
