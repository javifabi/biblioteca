require("dotenv").config();

const sequelize = require("./config/database");
require("./models");

const app = require("./app");

const PORT = process.env.PORT || 3000;

sequelize.authenticate()
    .then(() => {
        console.log("Conexión a MySQL exitosa");

       return sequelize.sync({ alter: true });
    })
    .then(() => {
        console.log("Base de datos sincronizada");

        app.listen(PORT, () => {
            console.log(`Servidor iniciado en puerto ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error al iniciar aplicación:", error);
    });