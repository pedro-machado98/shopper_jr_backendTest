import { GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

type Part = {
    data: string;  // base64 data como string
    mimeType: string;
};

@Injectable()
export class GeminiService {

    private genAI: GoogleGenerativeAI;

    constructor(
        config:ConfigService
    ) {
        this.genAI = new GoogleGenerativeAI(config.get('GEMINI_API_KEY'))
    }


    async getMeasureValueFromImage(measureBase64Image) {

        let model = this.genAI.getGenerativeModel({
            model: "gemini-1.5-flash"
        });

        const prompt = `Read this image. This is a gas/water consumption meter. 
                        Get the integer in the center of the image and return a string with only an interger value.`;
        
        const result = await model.generateContent([prompt, measureBase64Image])
        const text = result.response.text();
        const measure = text.replace(/\D/g, '')
        console.log(measure)
        return measure

    }

}
