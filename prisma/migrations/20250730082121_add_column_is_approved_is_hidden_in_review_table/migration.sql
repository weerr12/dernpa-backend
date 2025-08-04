-- AlterTable
ALTER TABLE "reviews" ADD COLUMN     "is_approved" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_hidden" BOOLEAN NOT NULL DEFAULT false;
