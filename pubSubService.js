const {PubSub} = require('@google-cloud/pubsub');
const {saveOrderToDatabase} = require('./controllers/mensage');
const path = require('path');


const credentialsPath = path.join(__dirname, './serjava-demo-1aec668e4d8d.json');
const credentials = require(credentialsPath);

async function quickstart(
    projectId = 'serjava-demo',
    subscriptionName = 'indica-filme-sub'
) {
    const pubsub = new PubSub({
        projectId,
        credentials: credentials
    });

    const subscription = pubsub.subscription(subscriptionName);
    subscription.on('message', async message => {
        const data = message.data.toString();
        await saveOrderToDatabase(JSON.parse(data)).then((data) => {
            message.ack();
            data ? console.log('*** Mensagem salva com sucesso ***') : console.log('*** Pedido já existe ***')
        }).catch(err => {
            message.nack();
            console.error('*** Erro ao salvar mensagem:', err);
        });
    });

    return subscription;
}

module.exports = {quickstart};