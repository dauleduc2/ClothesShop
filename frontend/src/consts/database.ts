let database: string;
if (process.env.NODE_ENV === "development") {
    //development database
    database = "http://localhost:8080";
} else {
    //production database
    database = "http://localhost:8080";
}
export default database;
