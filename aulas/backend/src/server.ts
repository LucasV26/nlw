import express from 'express';
import path from 'path';
import cors from 'cors';
import 'express-async-errors';

import './database/connection';
import routes from './routes'; 
import errorHandler from './errors/handler';

const app = express();

app.use(cors()); // Cors faz com que nossa aplicação consiga responder requests de outros domínios
// O front end está em localhost:3000 e o servidor em localhost:3333

app.use(express.json()); // Ativando a funcionalidade do express com Body Params em JSON

app.use(routes); // Todo o código de exemplo abaixo está abstraído em ./routes

// A funcionalidade static do express permite acessarmos os arquivos de imagem na url
// (Estas url's são retornadas do banco e podem ser vistas na view de imagens)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use(errorHandler); // Utilizando um error handler para melhorar a mensagem enviada ao usuário

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