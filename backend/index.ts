import app from "./app";
//listen
console.log("check-----------------------------");
console.log(process.env.PORT);
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`listen on port ${port}...`));
