import { Controller, Get, Param } from '@nestjs/common';
import { ToolsService } from './tools.service';


@Controller('api/tools')
export class ToolsController {
    constructor(private readonly toolsService: ToolsService) {}

    @Get()
    async getTools(){
        return this.toolsService.getTools();
    }

    @Get(':title')
    async getToolsByTitle(@Param('title') title: string){
        return this.toolsService.getToolsByTitle(title);
    }
}
