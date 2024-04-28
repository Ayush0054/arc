/*
  Warnings:

  - Added the required column `Reminder` to the `ArcTodos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isReminder` to the `ArcTodos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ArcTodos" ADD COLUMN     "Reminder" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "isReminder" BOOLEAN NOT NULL;
