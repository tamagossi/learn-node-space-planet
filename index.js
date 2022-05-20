import fs from 'fs';
import { parse } from 'csv-parse';

const habitablePlanet = [];

const isHabitablePlanet = (planet) =>
	planet['koi_disposition'] === 'CONFIRMED' &&
	planet['koi_insol'] > 0.36 &&
	planet['koi_insol'] < 1.11 &&
	planet['koi_prad'] < 1.6;

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
		console.log('-- Searching habitatble planet done --');
		console.log(
			`Habitable planet found: ${habitablePlanet.length}. Which are ${habitablePlanet
				.map((planet) => planet['kepler_name'])
				.join(', ')} `
		);
	});
