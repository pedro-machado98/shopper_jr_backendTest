import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Query, Req, Res } from '@nestjs/common';
import { MeasuresService } from './measures.service';
import { Response } from 'express';
import { CreateMeasureDTO } from './dtos/CreateMeasure.dto';
import { ConfirmMeasureDTO } from './dtos/confirmMeasure.dto';
import { Utils } from './utils/utils';
import { Measure_Type } from '@prisma/client';


@Controller('measures')
export class MeasuresController {

    constructor(
        private measuresService: MeasuresService,
        private utils: Utils
    ) {}

    @Get(':customerCode/list')
    async getAllMeasuresByUser(
        @Param('customerCode') customerCode: string,
        @Query('measure_type') measureType: Measure_Type,
        @Req() req: Request,
        @Res() res: Response
    ) {

        if((measureType === 'WATER') || (measureType === "GAS") || (!measureType)) {
            let measures = await this.measuresService.getListMeasuresByUser(customerCode, measureType);

            if(measures) {
                res.status(HttpStatus.OK).send(measures);
            } else {
                res.status(HttpStatus.BAD_REQUEST).send({
                    "error_code": "MEASURES_NOT_FOUND",
                    "error_description": "Nenhuma leitura encontrada"
                });
            }


        } else {
            res.status(HttpStatus.NOT_FOUND).send({
                "error_code": "INVALID_TYPE",
                "error_description": "Tipo de medição não permitida"
            })
        }
        
    }

    @Post('/upload')
    async uploadNewMeasure(
        @Req() req: Request,
        @Res() res: Response,
        @Body() createMeasureDTO: CreateMeasureDTO
    ) {
        
        const requiredFields = ["customer_code", "image", "measure_datetime", "measure_type"];
        const missingFields = this.utils.validateDataFromRequests(requiredFields, createMeasureDTO)

        if (missingFields.length > 0) {
            res.status(HttpStatus.BAD_REQUEST).send({
                "error_code": "INVALID_DATA",
                "error_description": `Os campos ${missingFields.join(", ")} estão faltando ou preenchidos de forma incorreta.`
            });
        }

        let createdMeasure = await this.measuresService.createMeasureByImage(createMeasureDTO)

        if(!createdMeasure) {
            res.status(HttpStatus.CONFLICT).send({
                "error_code": "DOUBLE_REPORT",
                "error_description": "Leitura do mês já realizada"
            })
        }

        res.status(HttpStatus.OK).send({
            "image_url": createdMeasure.image_url,
            "measure_value": createdMeasure.measure_value,
            "measure_uuid": createdMeasure.measure_uuid
        })
    }


    @Patch('/confirm')
    async confirmMeasure(
        @Req() req: Request,
        @Res() res: Response,
        @Body() confirmMeasureDTO: ConfirmMeasureDTO
    ) {

        const requiredFields = ["confirmed_value","measure_uuid"];
        const missingFields = this.utils.validateDataFromRequests(requiredFields, confirmMeasureDTO)

        if (missingFields.length > 0) {
            res.status(HttpStatus.BAD_REQUEST).send({
                "error_code": "INVALID_DATA",
                "error_description": `Os campos ${missingFields.join(", ")} estão faltando ou preenchidos de forma incorreta.`
            });
        }


        let measure = await this.measuresService.confirmMeasure(confirmMeasureDTO)

        if(measure === 404) {
            res.status(HttpStatus.NOT_FOUND).send({
                "error_code":"MEASURE_NOT_FOUND",
                "error_description": "Leitura do mês já realizada"
            })
        }

        if(measure === 409) {
            res.status(HttpStatus.CONFLICT).send({
                "error_code": "CONFIRMATION_DUPLICATE",
                "error_description": "Leitura do mês já realizada"
            })

        }

        res.status(HttpStatus.OK).send( {
            "sucess": true
        })

    }

}
