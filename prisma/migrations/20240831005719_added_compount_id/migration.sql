/*
  Warnings:

  - A unique constraint covering the columns `[customer_code,measure_type,measure_datetime]` on the table `Measure` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Measure_customer_code_measure_type_measure_datetime_key" ON "Measure"("customer_code", "measure_type", "measure_datetime");
