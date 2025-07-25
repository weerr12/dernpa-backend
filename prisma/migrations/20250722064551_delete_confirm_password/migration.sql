/*
  Warnings:

  - You are about to drop the column `confirmed_password` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "confirmed_password";
