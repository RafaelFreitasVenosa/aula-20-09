const express = require ('express');
const {v4: uuidv4} = require('uuid')
const app = express();
app.use(express.json());

const observacoesPorLembreteId = {}

app.post ('/lembretes/:id/observacoes', (req, res) => {
    const id0bs = uuidv4()
    const { texto } = req.body
    const observacoesDoLembrete = observacoesPorLembreteId[req.params.id] || []
    observacoesDoLembrete.push({id: id0bs, texto: texto})
    observacoesPorLembreteId[req.params.id] = observacoesDoLembrete
    req.statusCode(201).send(observacoesDoLembrete)
});

app.get ('/lembretes/:id/observacoes', (req, res) => {
    res.send(observacoesPorLembreteId[req.params.id] || [])
});

app.listen(5000, () => console.log('Observacoes. Porta 5000.'))
