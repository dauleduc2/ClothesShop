import { Connection } from "mysql";
import * as mysql from "mysql";

export default function dbStartUp() {
  const connection: Connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    insecureAuth: true,
  });
  connection.connect(() => {
    console.log("connected to db....");
  });
}
