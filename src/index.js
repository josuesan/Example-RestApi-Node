const express = require("express");
const app = express();
const morgan = require("morgan");

//Settings
app.set("port", process.env.PORT || 3000);
app.set("json spaces", 2);
//Middlewares
//Morgan shows info for every request to server.
app.use(morgan("dev"));
//Enable data has get for forms as Inputs, Texarea... (No Images)
app.use(express.urlencoded({extended: false}));
//Enable Json
app.use(express.json());


// Routes
app.use(require("./routes/index"));
app.use("/api/movies",require("./routes/movies"));
app.use("/api/users",require("./routes/users"));

//Start the server
app.listen(app.get("port"), ()=>{
    console.log(`server on port ${app.get("port")}`);
});