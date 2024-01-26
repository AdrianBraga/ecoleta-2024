-- CreateTable
CREATE TABLE "PointItem" (
    "id" TEXT NOT NULL,
    "point_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,

    CONSTRAINT "PointItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PointItem" ADD CONSTRAINT "PointItem_point_id_fkey" FOREIGN KEY ("point_id") REFERENCES "points"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PointItem" ADD CONSTRAINT "PointItem_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
