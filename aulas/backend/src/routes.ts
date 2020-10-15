import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import OrphanagesController from './controllers/OrphanagesController';

const routes = Router();
const upload = multer(uploadConfig);

// Padrão de rotas:
// index, show, create, update, delete

// Rotas podem ter endereços iguais
routes.get('/orphanages', OrphanagesController.index); //Index (get)

routes.get('/orphanages/:id', OrphanagesController.show); //Show (get)

routes.post('/orphanages', upload.array('images'), OrphanagesController.create); //Create (post)

export default routes;