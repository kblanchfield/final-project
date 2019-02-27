const calculateSideRealTime = lng => {
  const LST_hours_GMT = 3
  const LST_mins_GMT = 51
  const LST_decimal_GMT = LST_hours_GMT + (LST_mins_GMT/60)
  let LST_decimal_local = LST_decimal_GMT + (lng/360 * 24)
  if (LST_decimal_local < 0) {
    LST_decimal_local += 24
  } else if (LST_decimal_local > 24) {
    LST_decimal_local -= 24
  }
  const LST_hours = parseInt(LST_decimal_local)
  return LST_hours
}

export const getVisibleConstellations = async (lat, lng) => {
  const LSTHours = calculateSideRealTime(lng)
  const resp = await fetch(`http://localhost:8080/stars?latitude=${lat}&lstHours=${LSTHours}`)
  const json = await resp.json()
  return json
}

export const updateCollectedStars = async body => {
  const resp = await fetch(`http://localhost:8080/constellations`,
    {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    }
  )
  const json = await resp.json()
  return json.collectedStars
}
