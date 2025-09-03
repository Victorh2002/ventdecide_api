/*
  Warnings:

  - A unique constraint covering the columns `[authorId,caseName]` on the table `CaseStudy` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `patientIdentifier` to the `CaseStudy` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."CaseStudy" ADD COLUMN     "patientIdentifier" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CaseStudy_authorId_caseName_key" ON "public"."CaseStudy"("authorId", "caseName");
