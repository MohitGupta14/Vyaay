/*
  Warnings:

  - Added the required column `paidByid` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "paidByid" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_paidByid_fkey" FOREIGN KEY ("paidByid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
