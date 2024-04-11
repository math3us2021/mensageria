const express = require('express');
const { sequelize } = require('./db');
const routes = require('./routes');
const { quickstart } = require('./pubSubService');
const {saveOrderToDatabase} = require("./controllers/mensage");


const app = express();
app.use(express.json());
const PORT = 3000;


try {
    const connection = sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}


app.get('/', (req, res) => {
    res.send('Servidor Express rodando. Aguardando mensagens do Pub/Sub...');
});

app.use(routes);

quickstart().then(subscription => {
    console.log('Listening for messages...');
}).catch(err => {
    console.error('Error starting Pub/Sub:', err);
});


app.listen(PORT, () => {
    console.log(`Servidor Express rodando na porta ${PORT}`);
});

