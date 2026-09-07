-- AlterTable
ALTER TABLE "User" DROP COLUMN "rate",
ADD COLUMN     "rate" INTEGER NOT NULL,
ALTER COLUMN "payFrequency" SET DATA TYPE "PayFrequencies" USING "payFrequency"[1];

ALTER TABLE "User" ALTER COLUMN "payFrequency" SET NOT NULL;
