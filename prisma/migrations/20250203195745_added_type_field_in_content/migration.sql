/*
  Warnings:

  - Added the required column `type` to the `Content` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `link` on the `Content` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "type" AS ENUM ('youtube', 'twitter', 'webUrl', 'github');

-- AlterTable
ALTER TABLE "Content" ADD COLUMN     "type" "type" NOT NULL,
DROP COLUMN "link",
ADD COLUMN     "link" TEXT NOT NULL;

-- DropEnum
DROP TYPE "linkType";
