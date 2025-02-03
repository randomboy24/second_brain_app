/*
  Warnings:

  - Added the required column `link` to the `Content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Content` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "linkType" AS ENUM ('youtube', 'twitter', 'webUrl', 'github');

-- AlterTable
ALTER TABLE "Content" ADD COLUMN     "link" "linkType" NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
