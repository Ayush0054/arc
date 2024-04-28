/*
  Warnings:

  - You are about to drop the column `arcTodo` on the `ArcProgress` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ArcProgress" DROP CONSTRAINT "ArcProgress_arcTodo_fkey";

-- AlterTable
ALTER TABLE "ArcProgress" DROP COLUMN "arcTodo",
ADD COLUMN     "arcTodosId" TEXT;

-- AddForeignKey
ALTER TABLE "ArcProgress" ADD CONSTRAINT "ArcProgress_arcTodosId_fkey" FOREIGN KEY ("arcTodosId") REFERENCES "ArcTodos"("id") ON DELETE SET NULL ON UPDATE CASCADE;
