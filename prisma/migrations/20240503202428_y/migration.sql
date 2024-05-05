-- DropForeignKey
ALTER TABLE "ArcProgress" DROP CONSTRAINT "ArcProgress_arcTodosId_fkey";

-- AddForeignKey
ALTER TABLE "ArcProgress" ADD CONSTRAINT "ArcProgress_arcTodosId_fkey" FOREIGN KEY ("arcTodosId") REFERENCES "ArcTodos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
