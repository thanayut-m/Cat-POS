-- CreateTable
CREATE TABLE "Products" (
    "products_id" SERIAL NOT NULL,
    "products_barcode" TEXT NOT NULL,
    "products_name" TEXT NOT NULL,
    "products_cost" INTEGER NOT NULL,
    "products_price" INTEGER NOT NULL,
    "products_detail" TEXT NOT NULL,
    "products_createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "products_updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("products_id")
);
