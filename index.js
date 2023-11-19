const express = require('express');
const cors = require('cors');
const app = express();
const carController = require("./app/controllers/carController");
const userController = require("./app/controllers/userController")
const authMiddleware= require("./app/middlewares/auth");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./openapi.json');




const PORT = 8000;

// Car.init(sequelize, sequelize);

// Middleware untuk mengizinkan body JSON


app.use(cors());

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.get('/api-docs', swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
    res.status(200).send({message : 'ping successfully'});
});

// GET /cars: Mendapatkan daftar mobil
app.get("/cars", authMiddleware.authorize,carController.list);

// GET /cars/:id Mendapatkan detail mobil
app.get("/cars/:id", authMiddleware.authorize,carController.findAndSetById, carController.detail);

// POST /cars/ membuat data mobil baru
app.post("/cars", authMiddleware.authorize,authMiddleware.isSuperOrAdmin,carController.create);

// DELETE /cars/:id menghapus data detail mobil
app.delete("/cars/:id",authMiddleware.authorize, authMiddleware.isSuperOrAdmin,carController.findAndSetById, carController.destroy);

// PUT /cars/:id mengubah data detail mobil
app.put("/cars/:id", authMiddleware.authorize,authMiddleware.isSuperOrAdmin,carController.findAndSetById, carController.update);





app.post("/register", userController.create );

app.post("/admin/register",authMiddleware.authorize,authMiddleware.isSuperAdmin,userController.createAdmin );

app.post("/login", userController.login );

app.listen(PORT, () => {
    console.log(`Server sudah berjalan, silakan buka http://127.0.0.1:${PORT}`);
});


