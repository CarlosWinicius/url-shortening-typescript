import type { UrlDTO } from "../dtos/UrlDTO";
import { nanoid } from 'nanoid';
import UrlRepository from "../repositories/UrlRepositories";

export class UrlService {
    private repository = UrlRepository;


    async createURL(url: string): Promise<UrlDTO> {
        const existingUrl = await this.repository.FindByUrl(url);
        if (existingUrl) {
            return existingUrl;
        }


       while (true) {
       
        const shortcode = nanoid(8);

        try {

            const newLink = await this.repository.CreateURL(url, shortcode);
            return newLink;

        } catch (error) {
         console.log("Colisão de Shortcode. Tentando de novo...");
                continue; 
        }
    }
}
    async getURLByShortcode(shortcode: string): Promise<UrlDTO> {
        const url = await this.repository.FindByShortcode(shortcode);
        if (!url) {
            throw new Error('URL não encontrada');
        }
        await this.repository.incrementAccessCount(shortcode);
        return url;
    }

    async deleteURL(shortcode: string): Promise<void> {
        await this.repository.DeleteByShortcode(shortcode);
    }

    async getUrlStatistics(shortcode: string): Promise<UrlDTO> {
        const url = await this.repository.FindByShortcode(shortcode);
        if (!url) {
            throw new Error('URL não encontrada');
        }
        return url;
    }

    async updateURL(shortcode: string, newUrl: string): Promise<UrlDTO> {
        const url = await this.repository.FindByShortcode(shortcode);
        if (!url) {
            throw new Error('URL não encontrada');
        }
        const updatedUrl = await this.repository.UpdateURL(shortcode, newUrl);
        return updatedUrl;
    }
}

export default new UrlService();