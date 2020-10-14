import express from 'express';
import { getRepository } from 'typeorm';

import Orphanage from './models/Orphanage';
import './database/connection';

const app = express();

app.use(express.json()); // Ativando a funcionalidade do express com Body Params em JSON

app.post('/orphanages', async (request, response) => {
    const {
        name,
        latitude,
        longitude,
        about,
        instructions,
        opening_hours,
        open_on_weekends
    } = request.body;

    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = orphanagesRepository.create({
        name,
        latitude,
        longitude,
        about,
        instructions,
        opening_hours,
        open_on_weekends
    });

    await orphanagesRepository.save(orphanage);

    return response.json({ message: "Deu" });
})

app.listen(3333);

// Exemplo de resposta do servidor a partir da rota '/app'
/*app.get('/app', () => {
    console.log("Pois é, não deu");
});*/

// Exemplo de resposta do servidor utilizando o parâmetro response
/*app.get('/app', (request, response) => {
    return response.send("Salve Rapeize");
})*/

// Por estar trabalhando com uma API Rest, o ideal é devolver o conteúdo em JSON, logo
// Utilizando /:id para receber Route Params (Esses parametros não possuem declaração direta na URL, então precisam ser declarados no servidor)
/*app.post('/app/:id', (request, response) => {
    console.log(request.query); //Query Params
    console.log(request.params); //Route Params
    console.log(request.body); //Body Params

    return response.json({ message: `Salve Rapeize` }); //response.json() em vez de response.send()
})*/