/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
DROP COLUMN "password",
ADD COLUMN     "first_name" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "hash_password" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "image_url" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "last_name" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "middle_name" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "phone" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "refresh_token" TEXT NOT NULL DEFAULT E'';

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
