let database: string;
if (process.env.NODE_ENV === "development") {
    //development database
    database = "http://localhost:27017";
} else {
    //production database
    database = "http://localhost:27017";
}
export default database;
