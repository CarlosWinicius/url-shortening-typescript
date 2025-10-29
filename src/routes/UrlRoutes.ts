
import { Elysia, t } from 'elysia';
import UrlService from '../services/UrlService';

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
    async ({ body, set }) => {
      try {
      const link = await UrlService.createURL(body.url);
      set.status = 201;
      return {
        id: link.id,
        linkurl: link.url,
        shortcode: link.shortcode,
        createdAt: link.createdAt,
        updatedAt: link.updatedAt
      };
    } catch (error) {
      set.status = 400; 
      return {
        error: 'Bad Request.'
      };
    }
  },
  {
    body: createUrlDTO // ValidaçãFi58UIjto do Body
  }
)
.get(
  '/shorten/:shortcode', 
  async ({ params, set }) => {
    const { shortcode } = params;
    try {
      const link = await UrlService.getURLByShortcode(shortcode);
      if (link) {
        set.status = 200;
        return {
          id: link.id,
          linkurl: link.url,
          shortcode: link.shortcode,
          createdAt: link.createdAt,
          updatedAt: link.updatedAt,
        };
      };
    } catch {
      set.status = 404;
      return {
        error: 'Not Found.'
      };
    }
  }
)

  .delete(
    '/shorten/:shortcode',
    async ({ params, set }) => {
      const { shortcode } = params;
      try {
        await UrlService.deleteURL(shortcode);
        set.status = 204;
        return;
      } catch {
        set.status = 404;
        return {
          error: 'Not Found.'
        };
      }
    }

    
  )
  .get(
    '/shorten/:shortcode/stats',
    async ({ params, set }) => {
      const { shortcode } = params;
      try {
        const link = await UrlService.getUrlStatistics(shortcode);
        set.status = 200;
        return {
          id: link.id,
          linkurl: link.url,
          shortcode: link.shortcode,
          createdAt: link.createdAt,
          updatedAt: link.updatedAt,
          accessCount: link.accessCount
        };
      } catch {
        set.status = 404;
        return {
          error: 'Not Found.'
        };
      }
    }
  )
  .put(
    '/shorten/:shortcode',
    async ({ params, body, set }) => {
      const { shortcode } = params;
      try {
        const updatedLink = await UrlService.updateURL(shortcode, body.url);
        set.status = 200;
        return {
          id: updatedLink.id,
          linkurl: updatedLink.url,
          shortcode: updatedLink.shortcode,
          createdAt: updatedLink.createdAt,
          updatedAt: updatedLink.updatedAt,
        };
      } catch {
        set.status = 404;
        return {
          error: 'Not Found.'
        };
      }
    },
    {
      body: createUrlDTO // Validação do Body
    }
  );
