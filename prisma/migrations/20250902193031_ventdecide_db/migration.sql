/*
  Warnings:

  - You are about to drop the column `temperature` on the `CaseStudy` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `CaseStudy` table. All the data in the column will be lost.
  - Added the required column `caseName` to the `CaseStudy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `institution` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `professionalId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."CaseStudy" DROP COLUMN "temperature",
DROP COLUMN "weight",
ADD COLUMN     "acidBaseStatus" TEXT,
ADD COLUMN     "anionGap" DOUBLE PRECISION,
ADD COLUMN     "be" DOUBLE PRECISION,
ADD COLUMN     "birthDate" TIMESTAMP(3),
ADD COLUMN     "caseName" TEXT NOT NULL,
ADD COLUMN     "cl" DOUBLE PRECISION,
ADD COLUMN     "fio2_gasometry" DOUBLE PRECISION,
ADD COLUMN     "fio2_ventilation" DOUBLE PRECISION,
ADD COLUMN     "flow_vcv" DOUBLE PRECISION,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "hco3" DOUBLE PRECISION,
ADD COLUMN     "intubationReasons" TEXT[],
ADD COLUMN     "na" DOUBLE PRECISION,
ADD COLUMN     "paco2" DOUBLE PRECISION,
ADD COLUMN     "pao2" DOUBLE PRECISION,
ADD COLUMN     "pao2Fio2Ratio" DOUBLE PRECISION,
ADD COLUMN     "peep" DOUBLE PRECISION,
ADD COLUMN     "peep_psv" DOUBLE PRECISION,
ADD COLUMN     "ph" DOUBLE PRECISION,
ADD COLUMN     "pip_pcv" DOUBLE PRECISION,
ADD COLUMN     "previousConditions" TEXT[],
ADD COLUMN     "principalDiagnosis" TEXT,
ADD COLUMN     "ps_psv" DOUBLE PRECISION,
ADD COLUMN     "rr" DOUBLE PRECISION,
ADD COLUMN     "sao2" DOUBLE PRECISION,
ADD COLUMN     "sedationBlocker" BOOLEAN,
ADD COLUMN     "ti_pcv" DOUBLE PRECISION,
ADD COLUMN     "ti_vcv" DOUBLE PRECISION,
ADD COLUMN     "trigger" TEXT,
ADD COLUMN     "ventilationMode" TEXT,
ADD COLUMN     "vt_vcv" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "gender" TEXT,
ADD COLUMN     "institution" TEXT NOT NULL,
ADD COLUMN     "professionalId" TEXT NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL,
ALTER COLUMN "name" SET NOT NULL;
