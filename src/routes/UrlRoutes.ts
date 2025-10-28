
import { Elysia, t } from 'elysia';

const createUrlDTO = t.Object({
  url: t.String({
    format: 'uri',
    error: 'A URL fornecida não é um formato válido.'
  })
});

const urlParamsDTO = t.Object({
  code: t.String({
    minLength: 8,
    error: 'Código inválido.'
  })
});


export const urlRoutes = new Elysia()
  .post(
    '/shorten', 
    async ({ body, set, urlService }) => {
      const link = await (urlService as UrlService).createURL(body.url);
      set.status = 201; // Created
      return link;
    }, 
    {
      body: createUrlDTO // Validação do Body
    }
  )
