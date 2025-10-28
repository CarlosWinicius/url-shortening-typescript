/*
  Warnings:

  - A unique constraint covering the columns `[shortcode]` on the table `urls` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "urls_shortcode_key" ON "urls"("shortcode");
