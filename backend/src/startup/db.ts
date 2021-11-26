import { Connection, createConnection } from "typeorm";

let connection: Connection = null;

export async function dbStartUp() {
    if (!connection) {
        connection = await createConnection({
            type: "mysql",
            host: process.env.HOST,
            port: (process.env.DB_PORT as unknown as number) || 3306,
            username: process.env.USER,
            password: process.env.ROOT_PASSWORD,
            database: "clothesshop",
            synchronize: process.env.NODE_ENV !== "production",
            logging: false,
            migrationsRun: true,
            entities: ["./src/entity/**/*.ts"],
            migrations: ["src/migration/**/*.ts"],
            subscribers: ["src/subscriber/**/*.ts"],
            cli: {
                entitiesDir: "src/entity",
                migrationsDir: "src/migration",
                subscribersDir: "src/subscriber",
            },
        });
        console.log("connected successfully to DB....");
    }
}

export default connection;
