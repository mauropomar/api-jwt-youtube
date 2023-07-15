import express from "express";
import mongoose from "mongoose";
import bodyparser from "body-parser";
import 'dotenv/config';

const app = express();

// capturar body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// Conexión a Base de datos
mongoose.connect(process.env.MONGO_DB,
    { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log('Base de datos conectada'))
.catch(e => console.log('error db:', e))

// import routes
import authRoutes from "./routes/auth.routes.js";

// route middlewares

app.use('/api/user', authRoutes);

app.get('/', (req, res) => {
    res.json({
        estado: true,
        mensaje: 'funciona!'
    })
});

// iniciar server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`servidor andando en: ${PORT}`)
})