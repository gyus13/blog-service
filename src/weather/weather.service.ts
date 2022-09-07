import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WeatherService {
  constructor(private readonly httpService: HttpService) {}

  async getWeather(): Promise<string> {
    const resData = await firstValueFrom(
      this.httpService.get(
        `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q='37.5666805,126.9784147'&lang=ko`,
      ),
    );

    const { condition } = await resData.data.current;

    return condition.text;
  }
}
