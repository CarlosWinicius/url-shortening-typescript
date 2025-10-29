// src/server.ts

import {Elysia} from 'elysia';
import { swagger } from '@elysiajs/swagger';

// 1. Importe suas rotas
import {urlRoutes} from './routes/UrlRoutes';

// 2. Importe a INSTÂNCIA (minúsculo) do serviço
import urlService from './services/UrlService';

new Elysia()
    .use(swagger())
    // 3. Injete a INSTÂNCIA com um nome minúsculo
    .decorate('urlService', urlService)

    // 4. Use as rotas
    .use(urlRoutes)

    .listen(3000, () => {
        console.log('🚀 Servidor rodando em http://localhost:3000');
    });