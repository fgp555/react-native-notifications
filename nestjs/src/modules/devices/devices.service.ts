import { Injectable } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';

interface Device {
  id: number;
  userId: string;
  expoPushToken: string;
}

@Injectable()
export class DevicesService {
  private devices: Device[] = []; // Array para almacenar los dispositivos temporalmente

  register(createDeviceDto: any) {
    const newDevice: Device = {
      id: this.devices.length + 1,
      ...createDeviceDto,
    };
    this.devices.push(newDevice);
    return newDevice;
  }

  findAll() {
    return this.devices;
  }

  findOne(id: number) {
    return (
      this.devices.find((device) => device.id === id) ||
      `Device #${id} not found`
    );
  }

  update(id: number, updateDeviceDto: UpdateDeviceDto) {
    const index = this.devices.findIndex((device) => device.id === id);
    if (index === -1) return `Device #${id} not found`;

    this.devices[index] = { ...this.devices[index], ...updateDeviceDto };
    return this.devices[index];
  }

  remove(id: number) {
    const index = this.devices.findIndex((device) => device.id === id);
    if (index === -1) return `Device #${id} not found`;

    const deletedDevice = this.devices.splice(index, 1);
    return deletedDevice[0];
  }
}
