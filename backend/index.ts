import app from "./app";
//listen
const port = process.env.PORT || 27017;
app.listen(port, () => console.log(`listen on port ${port}...`));
