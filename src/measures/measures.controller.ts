import { Controller, Get, HttpStatus, Param, Patch, Post, Query, Req, Res } from '@nestjs/common';
import { MeasuresService } from './measures.service';
import { Response } from 'express';


@Controller('measures')
export class MeasuresController {

    constructor(private measuresService: MeasuresService) {}

    @Get(':customerCode/list')
    getAllMeasuresByUser(
        @Param('customerCode') customerCode: string, // Captura o valor de :customerCode
        @Query('measure_type') measureType: string,
        @Req() req: Request,
        @Res() res: Response
    ): string {
        console.log('Customer Code:', customerCode); // Você pode usar o valor aqui
        this.measuresService.getListMeasuresByUser(customerCode, measureType);
        res.status(HttpStatus.ACCEPTED).send('pong');
        return 'ping';
    }

    @Post('/upload')
    uploadNewMeasure(
        @Req() req: Request,
        @Res() res: Response
    ) {
        return
    }

    @Patch('/confirm')
    confirmMeasure(
        @Req() req: Request,
        @Res() res: Response
    ) {
        return
    }

}
