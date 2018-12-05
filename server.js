const bodyParser = require('body-parser');
const express = require('express');
const environment = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[environment];
const database = require('knex')(config);
const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.set('port', process.env.PORT || 3000);

// Station endpoints

app.get('/api/v1/stations', (request, response) => {
	database('stations').select()
		.then(stations => response.status(200).json(stations))
		.catch(error => response.status(500).json({
			error: error.message
		}));
})

app.post('/api/v1/stations', (request, response) => {
	const station = request.body;

	for(let requiredParam of [
		'station_name',
		'station_phone',
		'street_address',
		'city',
		'state',
		'zip_code',
		'latitude',
		'longitude',
		'intersection_directions',
		'access_days_time'
		]) {
		if (!station[requiredParam]) {
			return response.status(422).json({
				error: `Expected format: { station_name: <String>, station_phone: <String>, street_address: <String>, city: <Strin longitude: <Float>, intersection_directions: <String>, access_days_time: <String> }. You're missing the ${requiredParam} property.`
			})
		}
	}

	database('stations').insert(station, 'id')
		.then(stationIds => response.status(201).json({
			id: stationIds[0],
			message: `Project "${station.station_name}" successfully created!`
		}))
		.catch(error => response.status(500).json({
			error: error.message
		}))
})

app.get('/api/v1/stations/:station_id', (request, response) => {
	const { station_id } = request.params

	database('stations').where('id', station_id).select()
		.then(stations => response.status(200).json(stations))
		.catch(error => response.status(500).json({
			error: `Error fetching station: Station with id of ${station_id} does not exist.`
		}));
})

app.put('/api/v1/stations/:station_id', async (request, response) => {
	const newName = request.body.station_name;
	const { station_id } = request.params
	const station = await database('stations').where('id', station_id).select()
	const oldName = station[0].station_name

	if(!station) return response.status(404).json({ error: `station with id of ${station_id} was not found.`});
	else if (!newName) return response.status(422).json({ error: 'No station name provided' });

	database('stations').where('station_name', oldName).update('station_name', newName)
		.then(() => response.status(202).json({
			message: `Edit successful. Station with id of ${station_id} name changed from ${oldName} to ${newName}.`
		}))
})

app.delete('/api/v1/stations/:station_id', (request, response) => {
	const { station_id } = request.params
	database('stations').where('id', station_id).delete()
		.then(station => response.status(200).json({
			station,
			message: `Station ${station_id} has been deleted.`
		}))
		.catch(error => response.status(500).json({
			error: `Error deleting station: ${error.message}`
		}))
});

// Cafe endpoints

app.get('/api/v1/stations/:station_id/cafes', (request, response) => {
	const { station_id } = request.params

	database('cafes').where('station_id', station_id).select()
		.then(cafes => response.status(200).json(cafes))
		.catch(error => response.status(500).json({
			error: error.message
		}));
})

app.post('/api/v1/stations/:station_id/cafes', (request, response) => {
	const cafe = request.body;

	for(let requiredParam of [
		'station_id',
		'cafe_name',
		'street_address',
		'city',
		'state',
		'zip_code',
		'formatted_address',
		'cross_street',
		'distance_in_meters'
		]) {
		if(!cafe[requiredParam]) {
			return response.status(422).json({
				error: `Expected format: {station_id: <Integer>, cafe_name: <String>, street_address: <String>, city: <String>, state: <String>, zip_code: <String>, formatted_address: <String>, cross_street: <String>, distance_in_meters: <Integer> }. You're missing the ${requiredParam} property.`
			})
		}
	}

	database('cafes').insert(cafe, 'id')
		.then(cafeIds => response.status(201).json({
			id: cafeIds[0],
			message: `Cafe "${cafe.cafe_name}" successfully created!`
		}))
		.catch(error => response.status(500).json({
			error: error.message
		}))
})

app.get('/api/v1/stations/:station_id/cafes/:cafe_id', (request, response) => {
	const { cafe_id, station_id } = request.params
	database('cafes').where({
		'id': cafe_id,
		station_id
	}).select()
		.then(cafes => response.status(200).json(cafes))
		.catch(error => response.status(500).json({
			error: error.message
		}));
})

app.put('/api/v1/stations/:station_id/cafes/:cafe_id', async (request, response) => {
	const newName = request.body.cafe_name;
	const { cafe_id, station_id } = request.params
	const cafe = await database('cafes').where({
		'id': cafe_id,
		station_id
	}).select()
	const oldName = cafe[0].cafe_name

	if(!cafe) return response.status(404).json({ error: `cafe with id of ${id} was not found.`});
	else if (!newName) return response.status(422).json({ error: 'No cafe name provided' });

	database('cafes').where('cafe_name', oldName).update('cafe_name', newName)
		.then(cafe => response.status(202).json({
			cafe,
			message: `Edit successful.  Cafe with id of ${cafe_id} name changed from  ${oldName} to ${newName}.`}))
})

app.delete('/api/v1/cafes/:cafe_id', (request, response) => {
	const { cafe_id } = request.params
	database('cafes').where('id', cafe_id).delete()
		.then(() => response.status(200).json({
				message: `Cafe ${cafe_id} has been deleted.`
		}))
		.catch(error => response.status(500).json({
				error: `Error deleting cafe: ${error.message}`
		}))
})

app.delete('/api/v1/stations/:station_id/cafes/:cafe_id', (request, response) => {
	const { cafe_id, station_id } = request.params
	database('cafes').where({
		'id': cafe_id,
		station_id
	}).delete()
		.then(cafe => response.status(200).json({
				cafe,
				message: `Cafe ${cafe_id} for station ${station_id} has been deleted.`
		}))
		.catch(error => response.status(500).json({
				error: `Error deleting cafe: ${error.message}`
		}))
})

app.use((request, response, next) => {
	response.status(404).send('Sorry, the path you entered does not exist.')
})

app.listen(app.get('port'), () => {
	console.log(`app is running on ${app.get('port')}`)
})

module.exports = app