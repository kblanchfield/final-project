const mapToDbStar = (star) => {
    return {
        name: star.name,
        ra_hours: star.raHours,
        ra_mins: star.raMins,
        ra_secs: star.raSecs,
        dec_deg: star.decDeg,
        dec_mins: star.decMins,
        dec_secs: star.decSecs,
        constellation: star.constellation,
    }
}

const mapFromDbStar = (star) => {
    return {
        name: star.name,
        raHours: star.ra_hours,
        raMins: star.ra_mins,
        raSecs: star.ra_secs,
        decDeg: star.dec_deg,
        decMins: star.dec_mins,
        decSecs: star.dec_secs,
        constellation: star.constellation,
    }
}

module.exports = {
    mapToDbStar,
    mapFromDbStar
}
