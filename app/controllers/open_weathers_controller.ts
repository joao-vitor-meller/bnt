import type { HttpContext } from '@adonisjs/core/http'
import axios from 'axios'
import moment from 'moment'
import { DateTime } from 'luxon'
import { dateValidator } from '#validators/date'

import WeatherData from '#models/weather_datum'

interface WeatherDataInput {
  data: {
    parameter: string
    coordinates: {
      lat: number
      lon: number
      dates: {
        date: string
        value: number
      }[]
    }[]
  }[]
}

type WeatherDataEntry = Partial<Omit<WeatherData, 'id' | 'createdAt' | 'updatedAt'>> & {
  date: string
  hour: string
  latitude: number
  longitude: number
}

export default class OpenWeathersController {
  public async downloadData({ request, response }: HttpContext) {
    try {
      const dataRequest = request.all()
      const payload = await dateValidator.validate(dataRequest)

      // coordenadas de Florianópolis
      const lat = process.env.OPEN_WEATHER_LATITUDE || '-27.590471'
      const lng = process.env.OPEN_WEATHER_LONGITUDE || '-48.545129'

      const startDate = payload.dateInit
        ? `${moment(payload.dateInit).startOf('day').format('YYYY-MM-DDTHH:mm:ss')}Z`
        : `${moment().utc().startOf('day').format('YYYY-MM-DDTHH:mm:ss')}Z`

      const endDate = payload.dateEnd
        ? `${moment(payload.dateEnd).endOf('day').format('YYYY-MM-DDTHH:mm:ss')}Z`
        : `${moment().utc().add(1, 'days').endOf('day').format('YYYY-MM-DDTHH:mm:ss')}Z`

      const url = `${process.env.OPEN_WEATHER_URL}/${startDate}--${endDate}:PT1H/t_2m:C,wind_speed_10m:ms,wind_dir_10m:d,msl_pressure:hPa,precip_1h:mm,prob_precip_1h:p,uv:idx/${lat},${lng}/json`

      const cityData = await axios
        .get(url, {
          auth: {
            username: process.env.OPEN_WEATHER_USER || '',
            password: process.env.OPEN_WEATHER_PASSWORD || '',
          },
        })
        .then((dataOpenWeather) => {
          return dataOpenWeather.data
        })
        .catch((error) => {
          console.error(
            'Erro ao buscar os dados:',
            error.response ? error.response.data : error.message
          )
        })

      if (cityData) {
        await this.storeDataOpenWeather(cityData)
      }

      return response.status(201).json({ message: 'Download dos dados feito com sucesso!' })
    } catch (error) {
      return response.status(500).json({ error: error.message })
    }
  }

  async storeDataOpenWeather(data: WeatherDataInput) {
    try {
      const { data: weatherData } = data
      const groupedData: Record<string, WeatherDataEntry> = {}

      for (const item of weatherData) {
        const { parameter, coordinates } = item

        for (const coordinate of coordinates) {
          const { lat, lon, dates } = coordinate

          for (const entry of dates) {
            const dateTime = DateTime.fromISO(entry.date).setZone('UTC')
            const date = dateTime.toFormat('yyyy-MM-dd')
            const hour = dateTime.toFormat('HH:mm:ss')
            const key = `${date}-${hour}-${lat}-${lon}`

            if (!groupedData[key]) {
              groupedData[key] = {
                date,
                hour,
                latitude: lat,
                longitude: lon,
              }
            }

            switch (parameter) {
              case 't_2m:C':
                groupedData[key].temperature_avg = entry.value
                break
              case 'wind_speed_10m:ms':
                groupedData[key].wind_speed = entry.value
                break
              case 'wind_dir_10m:d':
                groupedData[key].wind_direction = entry.value
                break
              case 'msl_pressure:hPa':
                groupedData[key].pressure = entry.value
                break
              case 'precip_1h:mm':
                groupedData[key].precipitation = entry.value
                break
              case 'prob_precip_1h:p':
                groupedData[key].precipitation_probability = entry.value
                break
              case 'uv:idx':
                groupedData[key].uv_index = entry.value
                break
            }
          }
        }
      }

      for (const record of Object.values(groupedData)) {
        const existingRecord = await WeatherData.query()
          .where('date', record.date)
          .where('hour', record.hour)
          .where('latitude', record.latitude)
          .where('longitude', record.longitude)
          .first()

        if (existingRecord) {
          await existingRecord.merge(record).save()
        } else {
          await WeatherData.create(record)
        }
      }

      return true
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getWeatherData({ request, response }: HttpContext) {
    try {
      const dataRequest = request.all()
      const payload = await dateValidator.validate(dataRequest)

      const startDate = payload.dateInit
        ? moment(payload.dateInit).format('YYYY-MM-DD')
        : moment().format('YYYY-MM-DD')

      const endDate = payload.dateEnd
        ? moment(payload.dateEnd).format('YYYY-MM-DD')
        : moment().add(1, 'days').format('YYYY-MM-DD')

      const data = await WeatherData.query()
        .whereBetween('date', [startDate, endDate])
        .orderBy('date', 'asc')
        .orderBy('hour', 'asc')

      const groupedData: Record<
        string,
        {
          latitude: number
          longitude: number
          days: Record<
            string,
            {
              date: string
              data: {
                time: string
                temperature_avg?: number
                wind_speed?: number
                wind_direction?: number
                pressure?: number
                precipitation?: number
                precipitation_probability?: number
                uv_index?: number
              }[]
            }
          >
        }
      > = {}

      for (const entry of data) {
        const formattedDate = entry.date

        const key = `${entry.latitude}-${entry.longitude}`

        if (!groupedData[key]) {
          groupedData[key] = {
            latitude: entry.latitude,
            longitude: entry.longitude,
            days: {},
          }
        }

        if (!groupedData[key].days[formattedDate]) {
          groupedData[key].days[formattedDate] = {
            date: formattedDate,
            data: [],
          }
        }

        groupedData[key].days[formattedDate].data.push({
          time: entry.hour,
          temperature_avg: entry.temperature_avg,
          wind_speed: entry.wind_speed,
          wind_direction: entry.wind_direction,
          pressure: entry.pressure,
          precipitation: entry.precipitation,
          precipitation_probability: entry.precipitation_probability,
          uv_index: entry.uv_index,
        })
      }

      return Object.values(groupedData).map((location) => ({
        latitude: location.latitude,
        longitude: location.longitude,
        days: Object.values(location.days),
      }))
    } catch (error) {
      return response.status(500).json({ error: error })
    }
  }
}
