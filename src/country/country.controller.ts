import { Controller, Get } from '@nestjs/common';
import { CountryService } from './country.service';

@Controller()
export class CountryController {
    constructor(private countryService : CountryService) {}

    @Get('countries')
    async getCountry(){
        return this.countryService.getCountries();
    }
}
