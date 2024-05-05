/*
  Warnings:

  - You are about to drop the column `update` on the `ArcProgress` table. All the data in the column will be lost.
  - Added the required column `progress` to the `ArcProgress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ArcProgress" DROP COLUMN "update",
ADD COLUMN     "IsCheckedTime" TIMESTAMP(3),
ADD COLUMN     "progress" TEXT NOT NULL,
ALTER COLUMN "isChecked" DROP NOT NULL;
