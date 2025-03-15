import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';

export type Device = any; // or define the actual type of Device

@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post('register')
  register(@Body() createDeviceDto: CreateDeviceDto): Device {
    return this.devicesService.register(createDeviceDto);
  }

  @Get()
  findAll(): Device[] {
    return this.devicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Device {
    return this.devicesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDeviceDto: UpdateDeviceDto,
  ): Device {
    return this.devicesService.update(+id, updateDeviceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Device {
    return this.devicesService.remove(+id);
  }
}
