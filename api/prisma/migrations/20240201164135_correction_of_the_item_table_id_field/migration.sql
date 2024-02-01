/*
  Warnings:

  - The primary key for the `items` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `items` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `item_id` on the `PointItem` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "PointItem" DROP CONSTRAINT "PointItem_item_id_fkey";

-- AlterTable
ALTER TABLE "PointItem" DROP COLUMN "item_id",
ADD COLUMN     "item_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "items" DROP CONSTRAINT "items_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "items_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "PointItem" ADD CONSTRAINT "PointItem_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
