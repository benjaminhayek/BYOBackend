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
	    access_days_time: station.access_days_time
		}
	});
	return stationPromises;
}