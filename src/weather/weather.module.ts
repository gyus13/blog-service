import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [WeatherService],
})
export class WeatherModule {}
