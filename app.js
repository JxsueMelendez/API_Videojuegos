const express = require("express")
const router = require("./routes/games.routes")

const app = express()
app.use(express.json())
app.use('/', router);

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`App Corriendo en puerto ${PORT}`)
})