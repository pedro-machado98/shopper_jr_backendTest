import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMeasureDTO } from './dtos/CreateMeasure.dto';
import { ConfirmMeasureDTO } from './dtos/confirmMeasure.dto';
import { GeminiService } from 'src/gemini/gemini.service';
import { Measure_Type } from '@prisma/client';

@Injectable()
export class MeasuresService {

    constructor(
        private prismaService: PrismaService,
        private geminiService: GeminiService
    ){}

    async confirmMeasure(confirmMeasureDTO: ConfirmMeasureDTO) {

        let measure = await this.prismaService.measure.findUnique({
            where: {
                measure_uuid: confirmMeasureDTO.measure_uuid
            }
        })

        if(!measure) {
            return 404
        }

        if(measure.has_confirmed) {
            return 409
        }

        let updatedMeasure = await this.prismaService.measure.update({
            where: {
                measure_uuid: confirmMeasureDTO.measure_uuid
            },
            data: {
                measure_value: confirmMeasureDTO.confirmed_value.toString(),
                has_confirmed: true
            }
        })

        return 200;
    }

    async createMeasureByImage(createMeasureDTO: CreateMeasureDTO) {


        const date = new Date(createMeasureDTO.measure_datetime);

        // Converte para o formato ISO-8601
        const isoString = date.toISOString();
    

        let previousMeasure = await this.prismaService.measure.findMany({
            where: {
                customer_code: createMeasureDTO.customer_code,
                measure_type: createMeasureDTO.measure_type,
                measure_datetime: isoString,
            }
        })

        if(previousMeasure.length > 0) {
            return null
        } else {

            let measure_value = await this.geminiService.getMeasureValueFromImage(createMeasureDTO.image)

            let newMeasure = await this.prismaService.measure.create({
                data: {
                    customer_code : createMeasureDTO.customer_code,
                    measure_type : createMeasureDTO.measure_type,
                    measure_datetime: isoString,
                    has_confirmed : false,
                    image_url : "www.imageurl.com.br",
                    measure_value : measure_value
                },
            })
            return newMeasure;
        }

    }

    async getListMeasuresByUser(customerCode: string, measureType: Measure_Type) {
        
        let measures;
        let measuresByUser;


        if(!measureType) {
            measures = await this.prismaService.measure.findMany({
                where: {
                    customer_code:customerCode,

                }
            })

        }
        measures = await this.prismaService.measure.findMany({
            where: {
                customer_code:customerCode,
                measure_type: measureType
            },
            select: {
                measure_uuid:true,
                measure_datetime:true,
                measure_type:true,
                has_confirmed:true,
                image_url:true
            }
        })


        if(measures.length > 0) {
            measuresByUser = {
                customer_code: customerCode,
                measures: measures
            }
        }

        return measuresByUser

    }

}
