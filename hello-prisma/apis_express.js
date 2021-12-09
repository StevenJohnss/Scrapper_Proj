const express = require("express");
const app =express();

app.use(express.json({limit: "5mb"})) //increase limit of the payload to upload the file one time

app.use("/api/users",require("./routes/users"))
app.use("/api/service",require("./routes/service"))
//app.use("/api/statistics",require("./routes/statistics"))
app.use("/api/get",require("./routes/Scrapping_Service"))


app.listen(5000,()=>console.log("listening on port 5000!"))