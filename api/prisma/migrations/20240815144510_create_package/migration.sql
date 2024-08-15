-- CreateTable
CREATE TABLE "Package" (
    "id" SERIAL NOT NULL,
    "package_name" TEXT NOT NULL,
    "bill_amount" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Package_pkey" PRIMARY KEY ("id")
);
