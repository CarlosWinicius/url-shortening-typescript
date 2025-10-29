import prisma from "../database/prisma";
import type { UrlDTO } from "../dtos/UrlDTO";

class UrlRepository {

  private prisma = prisma;
  
  
  async CreateURL(url: string, shortcode: string): Promise<UrlDTO> {

    return await this.prisma.url.create({
      data: {
        url,
        shortcode,
      },
    });
  }

  async FindByShortcode(shortcode: string): Promise<UrlDTO | null> {
    return await this.prisma.url.findUnique({
      where: {
        shortcode,
      },
    });
  }
  async FindByUrl(url: string): Promise<UrlDTO | null> {
    return await this.prisma.url.findUnique({
      where: {
        url,
      },
    });
  }
  async incrementAccessCount(shortCode: string) {
   
    await this.prisma.url.update({
      where: {
        shortcode: shortCode,
      },
      data: {
      
        accessCount: {
          increment: 1,
        },
      },
    });
  }
  async DeleteByShortcode(shortcode: string) {
    return await this.prisma.url.delete({
      where: {
        shortcode,
      },
    });
  }

  async UpdateURL(shortcode: string, newUrl: string): Promise<UrlDTO> {
    return await this.prisma.url.update({
      where: {
        shortcode,
      },
      data: {
        url: newUrl,
      },
    });
  }
   
}

export default new UrlRepository();