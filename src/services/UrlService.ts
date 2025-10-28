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
        // 4. Gera um código
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

}

export default new UrlService();