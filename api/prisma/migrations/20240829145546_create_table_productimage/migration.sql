-- CreateTable
CREATE TABLE "ProductImage" (
    "ProductImage_id" SERIAL NOT NULL,
    "productimage_Name" TEXT NOT NULL,
    "productimage_is_main" BOOLEAN NOT NULL,
    "products_id" INTEGER NOT NULL,
    "products_createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "products_updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductImage_pkey" PRIMARY KEY ("ProductImage_id")
);
