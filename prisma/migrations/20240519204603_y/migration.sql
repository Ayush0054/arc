/*
  Warnings:

  - You are about to drop the `ArcProgress` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ArcProgress" DROP CONSTRAINT "ArcProgress_arcId_fkey";

-- DropForeignKey
ALTER TABLE "ArcProgress" DROP CONSTRAINT "ArcProgress_arcTodosId_fkey";

-- DropTable
DROP TABLE "ArcProgress";
