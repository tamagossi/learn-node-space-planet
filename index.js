import fs from 'fs';
import { parse } from 'csv-parse';

const habitablePlanet = [];

const isHabitablePlanet = (planet) => planet['koi_disposition'] === 'CONFIRMED';

fs.createReadStream('kepler_data.csv')
	.pipe(
		parse({
			comment: '#',
			columns: true,
		})
	)
	.on('data', (data) => {
		if (isHabitablePlanet(data)) {
			habitablePlanet.push(data);
		}
	})
	.on('error', (err) => {
		console.error(err);
	})
	.on('end', () => {
		console.log(habitablePlanet);
		console.log('DONE');
	});
