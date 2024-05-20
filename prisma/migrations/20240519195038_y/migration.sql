/*
  Warnings:

  - The `content` column on the `Notes` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Notes" DROP COLUMN "content",
ADD COLUMN     "content" JSON;
