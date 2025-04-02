import type { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class WeatherDatum extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare date: string

  @column()
  declare hour: string

  @column()
  declare latitude: number

  @column()
  declare longitude: number

  @column()
  declare temperature_avg: number

  @column()
  declare wind_speed: number

  @column()
  declare wind_direction: number

  @column()
  declare pressure: number

  @column()
  declare precipitation: number

  @column()
  declare precipitation_probability: number

  @column()
  declare uv_index: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
