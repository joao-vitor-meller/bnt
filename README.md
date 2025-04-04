# gntest

Api com AdonisJS configurado para buscar e apresentar os dados da API do [OpenWeather](https://www.meteomatics.com/en/api/getting-started/).

## Tecnologias Utilizadas

- [AdonisJS 6](https://adonisjs.com/)
- Node.js +v22.0.0 (v22.5.1)
- PostgreSQL
- ORM: [Lucid](https://lucid.adonisjs.com/docs/introduction)
- Docker

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/joao-vitor-meller/bnt
   cd bnt

   Instale as dependências:
    npm install
   Configure o ambiente:
    Copie o arquivo .env.example e renomeie-o para .env.
    Atualize as variáveis de ambiente, banco de dados, openweather conforme necessário.
   Execute as migrations para criar o banco de dados:
    node ace migration:run
   Inicie o servidor:
    node ace serve --watch
   ```

   <video src="resources\Gravando 2025-04-04 193041.mp4" controls></video>

## Postman Collection

Arquivo do Postman para simular as rotas: [Postman](resources\GnTest.postman_collection.json)

<video src="resources\Gravando 2025-04-04 192716.mp4" controls></video>

## Docker

Comando para rodar a migration dentro da imagem docker:

```
docker exec -it nome_do_container node ace migration:run
```

![Docker](resources\Captura2025-04-04.png)

## Rotas

**GET /open-weather-data/download**: Buscar dados de previsão meteorológica na API do OpenWeather para um municipio e salvar os dados no banco de dados.

- dateInit DATE (YYYY-MM-DD)
- dateEnd DATE (YYYY-MM-DD)

**Request:**

```json
{
  "dateInit": "2025-04-04",
  "dateEnd": "2025-04-05"
}
```

**Response:**

```json
{
  "message": "Download dos dados feito com sucesso!"
}
```

---

**GET /open-weather-data**: Buscar dados de previsão meteorológica no banco de dados.

- dateInit DATE (YYYY-MM-DD)
- dateEnd DATE (YYYY-MM-DD)

**Request:**

```json
{
  "dateInit": "2025-04-04",
  "dateEnd": "2025-04-05"
}
```

**Response:**

```json
[
  {
    "latitude": -27.590471,
    "longitude": -48.545128,
    "days": [
      {
        "date": "2025-04-04T00:00:00.000Z",
        "data": [
          {
            "time": "00:00:00",
            "temperature_avg": 23.4,
            "wind_speed": 2,
            "wind_direction": 169,
            "pressure": 1014,
            "precipitation": 0,
            "precipitation_probability": 1,
            "uv_index": 0
          },
          {
            "time": "01:00:00",
            "temperature_avg": 23.2,
            "wind_speed": 2,
            "wind_direction": 189.9,
            "pressure": 1015,
            "precipitation": 0,
            "precipitation_probability": 1,
            "uv_index": 0
          },
          {
            "time": "02:00:00",
            "temperature_avg": 23,
            "wind_speed": 1.1,
            "wind_direction": 237.2,
            "pressure": 1015,
            "precipitation": 0,
            "precipitation_probability": 1,
            "uv_index": 0
          },
          {
            "time": "03:00:00",
            "temperature_avg": 22.9,
            "wind_speed": 1.1,
            "wind_direction": 266.5,
            "pressure": 1015,
            "precipitation": 0,
            "precipitation_probability": 1,
            "uv_index": 0
          },
          {
            "time": "04:00:00",
            "temperature_avg": 22.2,
            "wind_speed": 1,
            "wind_direction": 277.2,
            "pressure": 1015,
            "precipitation": 0,
            "precipitation_probability": 1,
            "uv_index": 0
          },
          {
            "time": "05:00:00",
            "temperature_avg": 22.4,
            "wind_speed": 0.9,
            "wind_direction": 264.7,
            "pressure": 1014,
            "precipitation": 0,
            "precipitation_probability": 1,
            "uv_index": 0
          },
          {
            "time": "06:00:00",
            "temperature_avg": 22.2,
            "wind_speed": 1.1,
            "wind_direction": 202.8,
            "pressure": 1014,
            "precipitation": 0,
            "precipitation_probability": 1,
            "uv_index": 0
          },
          {
            "time": "07:00:00",
            "temperature_avg": 21.9,
            "wind_speed": 1.7,
            "wind_direction": 199.6,
            "pressure": 1014,
            "precipitation": 0,
            "precipitation_probability": 1,
            "uv_index": 0
          },
          {
            "time": "08:00:00",
            "temperature_avg": 21.8,
            "wind_speed": 1.7,
            "wind_direction": 212.1,
            "pressure": 1014,
            "precipitation": 0,
            "precipitation_probability": 1,
            "uv_index": 0
          },
          {
            "time": "09:00:00",
            "temperature_avg": 22,
            "wind_speed": 2.1,
            "wind_direction": 189.2,
            "pressure": 1015,
            "precipitation": 0,
            "precipitation_probability": 1,
            "uv_index": 0
          },
          {
            "time": "10:00:00",
            "temperature_avg": 22,
            "wind_speed": 3.8,
            "wind_direction": 172.1,
            "pressure": 1016,
            "precipitation": 0,
            "precipitation_probability": 1,
            "uv_index": 0
          },
          {
            "time": "11:00:00",
            "temperature_avg": 22.3,
            "wind_speed": 4.8,
            "wind_direction": 181.1,
            "pressure": 1017,
            "precipitation": 0,
            "precipitation_probability": 1,
            "uv_index": 1
          },
          {
            "time": "12:00:00",
            "temperature_avg": 22.8,
            "wind_speed": 4.6,
            "wind_direction": 182,
            "pressure": 1018,
            "precipitation": 0,
            "precipitation_probability": 1,
            "uv_index": 2
          },
          {
            "time": "13:00:00",
            "temperature_avg": 23.6,
            "wind_speed": 6.4,
            "wind_direction": 185.1,
            "pressure": 1019,
            "precipitation": 0,
            "precipitation_probability": 1,
            "uv_index": 5
          },
          {
            "time": "14:00:00",
            "temperature_avg": 24.1,
            "wind_speed": 7.4,
            "wind_direction": 187.4,
            "pressure": 1019,
            "precipitation": 0,
            "precipitation_probability": 1,
            "uv_index": 6
          },
          {
            "time": "15:00:00",
            "temperature_avg": 23.8,
            "wind_speed": 7.4,
            "wind_direction": 179.7,
            "pressure": 1020,
            "precipitation": 0,
            "precipitation_probability": 1,
            "uv_index": 7
          },
          {
            "time": "16:00:00",
            "temperature_avg": 23.2,
            "wind_speed": 8.1,
            "wind_direction": 177.6,
            "pressure": 1020,
            "precipitation": 0,
            "precipitation_probability": 1,
            "uv_index": 6
          },
          {
            "time": "17:00:00",
            "temperature_avg": 22.6,
            "wind_speed": 8.1,
            "wind_direction": 179,
            "pressure": 1020,
            "precipitation": 0,
            "precipitation_probability": 1,
            "uv_index": 4
          },
          {
            "time": "18:00:00",
            "temperature_avg": 22.1,
            "wind_speed": 8.4,
            "wind_direction": 178.2,
            "pressure": 1020,
            "precipitation": 0,
            "precipitation_probability": 1,
            "uv_index": 3
          },
          {
            "time": "19:00:00",
            "temperature_avg": 21.6,
            "wind_speed": 8.8,
            "wind_direction": 180.4,
            "pressure": 1020,
            "precipitation": 0,
            "precipitation_probability": 1,
            "uv_index": 1
          },
          {
            "time": "20:00:00",
            "temperature_avg": 21,
            "wind_speed": 8.9,
            "wind_direction": 183.5,
            "pressure": 1021,
            "precipitation": 0,
            "precipitation_probability": 1,
            "uv_index": 0
          },
          {
            "time": "21:00:00",
            "temperature_avg": 20.1,
            "wind_speed": 8.7,
            "wind_direction": 185.9,
            "pressure": 1021,
            "precipitation": 0,
            "precipitation_probability": 1,
            "uv_index": 0
          },
          {
            "time": "22:00:00",
            "temperature_avg": 19.1,
            "wind_speed": 7.5,
            "wind_direction": 187.8,
            "pressure": 1022,
            "precipitation": 0,
            "precipitation_probability": 1,
            "uv_index": 0
          },
          {
            "time": "23:00:00",
            "temperature_avg": 18.7,
            "wind_speed": 6.2,
            "wind_direction": 190.3,
            "pressure": 1023,
            "precipitation": 0,
            "precipitation_probability": 1,
            "uv_index": 0
          }
        ]
      },
      {
        "date": "2025-04-05T00:00:00.000Z",
        "data": [
          {
            "time": "00:00:00",
            "temperature_avg": 18.6,
            "wind_speed": 5.7,
            "wind_direction": 192.4,
            "pressure": 1024,
            "precipitation": 0,
            "precipitation_probability": 1,
            "uv_index": 0
          },
          {
            "time": "01:00:00",
            "temperature_avg": 18.2,
            "wind_speed": 4.8,
            "wind_direction": 193,
            "pressure": 1025,
            "precipitation": 0,
            "precipitation_probability": 1,
            "uv_index": 0
          },
          {
            "time": "02:00:00",
            "temperature_avg": 17.8,
            "wind_speed": 4.3,
            "wind_direction": 190.3,
            "pressure": 1025,
            "precipitation": 0,
            "precipitation_probability": 1,
            "uv_index": 0
          },
          {
            "time": "03:00:00",
            "temperature_avg": 17.4,
            "wind_speed": 4.2,
            "wind_direction": 194.7,
            "pressure": 1025,
            "precipitation": 0,
            "precipitation_probability": 1,
            "uv_index": 0
          },
          {
            "time": "04:00:00",
            "temperature_avg": 17.1,
            "wind_speed": 3.8,
            "wind_direction": 201.9,
            "pressure": 1025,
            "precipitation": 0,
            "precipitation_probability": 1,
            "uv_index": 0
          },
          {
            "time": "05:00:00",
            "temperature_avg": 17.1,
            "wind_speed": 3.5,
            "wind_direction": 211.5,
            "pressure": 1025,
            "precipitation": 0,
            "precipitation_probability": 1,
            "uv_index": 0
          },
          {
            "time": "06:00:00",
            "temperature_avg": 17,
            "wind_speed": 3.6,
            "wind_direction": 207.4,
            "pressure": 1025,
            "precipitation": 0,
            "precipitation_probability": 1,
            "uv_index": 0
          },
          {
            "time": "07:00:00",
            "temperature_avg": 16.9,
            "wind_speed": 3.5,
            "wind_direction": 210.3,
            "pressure": 1024,
            "precipitation": 0,
            "precipitation_probability": 1,
            "uv_index": 0
          },
          {
            "time": "08:00:00",
            "temperature_avg": 16.9,
            "wind_speed": 3.1,
            "wind_direction": 209.1,
            "pressure": 1025,
            "precipitation": 0,
            "precipitation_probability": 1,
            "uv_index": 0
          },
          {
            "time": "09:00:00",
            "temperature_avg": 16.9,
            "wind_speed": 2.9,
            "wind_direction": 212.8,
            "pressure": 1026,
            "precipitation": 0,
            "precipitation_probability": 1,
            "uv_index": 0
          },
          {
            "time": "10:00:00",
            "temperature_avg": 17.5,
            "wind_speed": 2.8,
            "wind_direction": 213.7,
            "pressure": 1026,
            "precipitation": 0,
            "precipitation_probability": 1,
            "uv_index": 0
          },
          {
            "time": "11:00:00",
            "temperature_avg": 19.3,
            "wind_speed": 2.8,
            "wind_direction": 204.6,
            "pressure": 1027,
            "precipitation": 0,
            "precipitation_probability": 1,
            "uv_index": 1
          },
          {
            "time": "12:00:00",
            "temperature_avg": 21,
            "wind_speed": 4.3,
            "wind_direction": 183.2,
            "pressure": 1028,
            "precipitation": 0,
            "precipitation_probability": 1,
            "uv_index": 3
          },
          {
            "time": "13:00:00",
            "temperature_avg": 22,
            "wind_speed": 5.2,
            "wind_direction": 173,
            "pressure": 1028,
            "precipitation": 0,
            "precipitation_probability": 1,
            "uv_index": 5
          },
          {
            "time": "14:00:00",
            "temperature_avg": 22.7,
            "wind_speed": 5.2,
            "wind_direction": 169.8,
            "pressure": 1028,
            "precipitation": 0,
            "precipitation_probability": 1,
            "uv_index": 7
          },
          {
            "time": "15:00:00",
            "temperature_avg": 23.2,
            "wind_speed": 5.2,
            "wind_direction": 164,
            "pressure": 1028,
            "precipitation": 0,
            "precipitation_probability": 1,
            "uv_index": 8
          },
          {
            "time": "16:00:00",
            "temperature_avg": 23.1,
            "wind_speed": 5.2,
            "wind_direction": 162.6,
            "pressure": 1028,
            "precipitation": 0,
            "precipitation_probability": 1,
            "uv_index": 7
          },
          {
            "time": "17:00:00",
            "temperature_avg": 23.2,
            "wind_speed": 4.8,
            "wind_direction": 162.1,
            "pressure": 1027,
            "precipitation": 0,
            "precipitation_probability": 1,
            "uv_index": 5
          },
          {
            "time": "18:00:00",
            "temperature_avg": 23.1,
            "wind_speed": 4.6,
            "wind_direction": 162.6,
            "pressure": 1027,
            "precipitation": 0,
            "precipitation_probability": 1,
            "uv_index": 3
          },
          {
            "time": "19:00:00",
            "temperature_avg": 23,
            "wind_speed": 4.5,
            "wind_direction": 162,
            "pressure": 1027,
            "precipitation": 0,
            "precipitation_probability": 1,
            "uv_index": 1
          },
          {
            "time": "20:00:00",
            "temperature_avg": 22.5,
            "wind_speed": 4.3,
            "wind_direction": 157.9,
            "pressure": 1027,
            "precipitation": 0,
            "precipitation_probability": 1,
            "uv_index": 0
          },
          {
            "time": "21:00:00",
            "temperature_avg": 21.4,
            "wind_speed": 4,
            "wind_direction": 152.9,
            "pressure": 1027,
            "precipitation": 0,
            "precipitation_probability": 1,
            "uv_index": 0
          },
          {
            "time": "22:00:00",
            "temperature_avg": 20.4,
            "wind_speed": 2.9,
            "wind_direction": 155.8,
            "pressure": 1027,
            "precipitation": 0,
            "precipitation_probability": 1,
            "uv_index": 0
          },
          {
            "time": "23:00:00",
            "temperature_avg": 20,
            "wind_speed": 2.3,
            "wind_direction": 158.9,
            "pressure": 1028,
            "precipitation": 0,
            "precipitation_probability": 1,
            "uv_index": 0
          }
        ]
      }
    ]
  }
]
```
