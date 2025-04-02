import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'weather_data'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') // ID único
      table.date('date').notNullable() // Data da previsão
      table.time('hour').notNullable() // Data da previsão
      table.float('latitude').notNullable()
      table.float('longitude').notNullable()
      table.float('temperature_avg') // Temperatura média (t_2m:C)
      table.float('wind_speed') // Velocidade do vento (wind_speed_10m:ms)
      table.float('wind_direction') // Direção do vento (wind_dir_10m:d)
      table.float('pressure') // Pressão atmosférica (msl_pressure:hPa)
      table.float('precipitation') // Precipitação (precip_1h:mm)
      table.float('precipitation_probability') // Probabilidade de precipitação (prob_precip_1h:p)
      table.float('uv_index') // Índice UV (uv:idx)
      table.timestamp('created_at').defaultTo(this.now()) // Timestamp de criação
      table.timestamp('updated_at').defaultTo(this.now()) // Timestamp de atualização
      table.unique(['date', 'hour', 'latitude', 'longitude'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
