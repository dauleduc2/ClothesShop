import { createConnection } from "typeorm";
import { User } from "../entity/User";

export default async function dbStartUp() {
    createConnection({
        type: "mysql",
        host: process.env.HOST,
        port: 3306,
        username: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        entities: [__dirname + "/../entity/*.ts"],
        synchronize: true,
        logging: false,
    }).then((connection) => {
        console.log("check");
        // let user = new User();
        // user.email = "dauleduc2@gmail.com";
        // user.fullName = "dau le duc";
        // user.password = "123456";
        // user.role = 1;
        // user.userStatus = 1;
        // user.username = "rinduc123vn";
    });
}
