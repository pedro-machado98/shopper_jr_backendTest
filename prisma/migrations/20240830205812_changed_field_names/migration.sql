/*
  Warnings:

  - You are about to drop the column `measureType` on the `Measure` table. All the data in the column will be lost.
  - You are about to drop the column `measureValue` on the `Measure` table. All the data in the column will be lost.
  - You are about to drop the column `user` on the `Measure` table. All the data in the column will be lost.
  - Added the required column `customer_code` to the `Measure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `has_confirmed` to the `Measure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_url` to the `Measure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `measure_type` to the `Measure` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Measure" DROP COLUMN "measureType",
DROP COLUMN "measureValue",
DROP COLUMN "user",
ADD COLUMN     "customer_code" TEXT NOT NULL,
ADD COLUMN     "has_confirmed" BOOLEAN NOT NULL,
ADD COLUMN     "image_url" TEXT NOT NULL,
ADD COLUMN     "measure_type" "Measure_Type" NOT NULL;
