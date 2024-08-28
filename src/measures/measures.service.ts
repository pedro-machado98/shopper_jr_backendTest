import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MeasuresService {

    constructor(
        private prismaService: PrismaService
    ){}

    async getListMeasuresByUser(customerCode: string, measureType: string) {
        
        let measures;

        if(!measureType) {
            measures = await this.prismaService.measure.findMany({
                where: {
                    user:customerCode
                }
            })

        }
        measures = await this.prismaService.measure.findMany({
            where: {
                user:customerCode
            }
        })

        return measures

    }

}
