/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const openWeatherController = () => import('#controllers/open_weathers_controller')

router
  .group(() => {
    router.get('/download', [openWeatherController, 'downloadData'])
    router.get('/', [openWeatherController, 'getWeatherData'])
  })
  .prefix('/open-weather-data')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})
