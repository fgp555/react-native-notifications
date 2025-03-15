import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import Expo, { ExpoPushMessage } from 'expo-server-sdk';

@Injectable()
export class NotificationsService {
  private expo = new Expo({
    // accessToken: process.env.EXPO_ACCESS_TOKEN,
    useFcmV1: true,
  });

  sendPushNotification(toTokens: string[]) {
    const areExpoTokens = toTokens.every(Expo.isExpoPushToken);

    if (!areExpoTokens) {
      throw new BadRequestException('Invalid expo push tokens');
    }

    const messages: ExpoPushMessage[] = toTokens.map((token) => ({
      to: token,
      sound: 'default',
      body: 'This is a test notification form my backend' + Date.now(),
      title: 'Hola título' + Date.now(),
      data: { chatId: Date.now() },
    }));

    const chunks = this.expo.chunkPushNotifications(messages);
    const tickets = [];

    for (const chunk of chunks) {
      try {
        const ticketChunk = this.expo.sendPushNotificationsAsync(chunk);
        tickets.push(ticketChunk);
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException(
          'Error sending push notification chunks',
        );
      }
    }

    return {
      done: true,
    };
  }

  create(createNotificationDto: CreateNotificationDto) {
    return 'This action adds a new notification';
  }

  findAll() {
    return `This action returns all notifications`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return `This action updates a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
