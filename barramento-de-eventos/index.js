const express = require('express');
const bodyParser = require('body-parser');
//para enviar eventos para os demais microsserviços
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/eventos', (req, res) => {
    const evento = req.body;
//envia o evento para o microsserviço de lembretes
    axios.post('http://localhost:4000/eventos', evento);
//envia o evento para o microsserviço de observações
    axios.post('http://localhost:5000/eventos', evento);
    res.status(200).send({ msg: "ok" });
});

/*app.put("/lembretes", async (req, res) => {
    contador++;
    const { texto } = req.body;
    lembretes[contador] = {contador,texto,};
    await axios.post("http://localhost:10000/eventos", {
        tipo: "LembreteCriado",
        dados: {contador,texto,},
    });
    res.status(201).send(lembretes[contador]);
});*/

app.listen(10000, () => {
    console.log('Barramento de eventos. Porta 10000.')
})

