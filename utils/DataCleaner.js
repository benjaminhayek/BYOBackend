import * as API from './API.js';
import * as APIKey from './APIKeys.js'

export const fetchStations = async (zipCode) => {
	const url = `https://developer.nrel.gov/api/alt-fuel-stations/v1.json?access=public&status=E&fuel_type=ELEC&zip=${zipCode}&api_key=${APIKey.stationKey}&format=JSON`;
	const stationData = await API.fetchData(url);
	const stationResults = formatStationData(stationData.fuel_stations);
	return stationResults;
}

export const formatStationData = (stations) => {
	const stationPromises = stations.map(station => {
		return {
	    station_name: station.station_name,
	    station_phone: station.station_phone,
	    latitude: station.latitude,
	    longitude: station.longitude,
	    street_address: station.street_address,
	    city: station.city,
	    state: station.state,
	    zip_code: station.zip_code,
	    intersection_directions: station.intersection_directions,
	    access_days_time: station.access_days_time,
	    cafes: fetchCafes(`${station.latitude},${station.longitude}`)
		}
	});
	return stationPromises;
}

export const fetchCafes = (latitudeLongitude) => {
	const url = `https://api.foursquare.com/v2/venues/search?client_id=${APIKey.cafeId}&client_secret=${APIKey.cafeSecret}&v=20180323&limit=50&ll=${latitudeLongitude}&query=coffee'&radius=1609`
	const cafeData = await API.fetchData(url)
	const cafeResults = formatCafeData(cafeData.response.venues)
	return cafeResults
}

export const formatCafeData = (cafes) => {
	const cafePromises = cafes.map(cafe => {
		return {
		  cafe_name: cafe.cafe_name,
      street_address: cafe.street_address,
      city: cafe.city,
      state: cafe.state,
      zip_code: cafe.zip_code,
      cross_street: cafe.cross_street,
      formatted_address: cafe.formatted_address,
      distance_in_meters: cafe.distance_in_meters,
      station_id: 
		}
	})
	return cafePromises
}