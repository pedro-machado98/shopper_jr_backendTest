export class Utils {
    validateDataFromRequests(requiredFields : Array<string>, dto: any) {

        return requiredFields.filter(field => !dto[field]);

    }
}