-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
