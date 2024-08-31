import { Measure_Type } from "@prisma/client";

export class ConfirmMeasureDTO {
    readonly measure_uuid : string;
    readonly confirmed_value : number;
}