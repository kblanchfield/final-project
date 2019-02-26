
const getMidnightCloudCover = json => {
  return json.list.filter(time => /00:00:00/.test(time.dt_txt))
    .map(day => day.clouds.all)
  }

const getWeatherMessage = midnightCloudCover => {
  if (midnightCloudCover[0] < 50) {
    return `Good news! Looks like it will be a clear sky at midnight tonight - perfect for seeing the stars.`
  } else if (midnightCloudCover[1] < 50) {
    return `There's a ${midnightCloudCover[0]}% chance of clouds tonight. It looks like it will be a clearer sky tomorrow night.`
  } else if (midnightCloudCover[2] < 50) {
    return `There's a ${midnightCloudCover[0]}% chance of clouds tonight. It looks like it will be a clearer sky in 2 nights.`
  } else if (midnightCloudCover[3] < 50) {
    return `There's a ${midnightCloudCover[0]}% chance of clouds tonight. It looks like it will be a clearer sky in 3 nights.`
  } else if (midnightCloudCover[4] < 50) {
    return `There's a ${midnightCloudCover[0]}% chance of clouds tonight. It looks like it will be a clearer sky in 4 nights.`
  } else {
    return `Looks like it wll be cloudy for the next 5 nights. Netflix?`
  }
}

export const getWeatherData = async (lat, lng) => {
  const resp = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&APPID=ee4066bbc82305811aecd61e6c30d861`)
  const json = await resp.json()
  const midnightCloudCover = getMidnightCloudCover(json)
  const weatherMessage = getWeatherMessage(midnightCloudCover)
  return { midnightCloudCover, weatherMessage }
}
