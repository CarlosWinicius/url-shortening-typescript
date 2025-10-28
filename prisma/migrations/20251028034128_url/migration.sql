/*
  Warnings:

  - You are about to drop the `flights` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `passengers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reservations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."reservations" DROP CONSTRAINT "reservations_flightId_fkey";

-- DropForeignKey
ALTER TABLE "public"."reservations" DROP CONSTRAINT "reservations_passengerId_fkey";

-- DropTable
DROP TABLE "public"."flights";

-- DropTable
DROP TABLE "public"."passengers";

-- DropTable
DROP TABLE "public"."reservations";

-- CreateTable
CREATE TABLE "urls" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "shortcode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "accessCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "urls_pkey" PRIMARY KEY ("id")
);
