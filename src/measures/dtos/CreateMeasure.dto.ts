import { Measure_Type } from "@prisma/client";

export class CreateMeasureDTO {
    readonly image : string;
    readonly customer_code : string;
    readonly measure_datetime : Date;
    readonly measure_type : Measure_Type;
}