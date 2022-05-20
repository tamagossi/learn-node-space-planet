import fs from 'fs';
import { parse } from 'csv-parse';

const result = [];

fs.createReadStream('kepler_data.csv')
	.on('data', (data) => {
		result.push(data);
	})
	.on('error', (err) => {
		console.error(err);
	})
	.on('end', () => {
		console.log(result);
		console.log('DONE');
	});

// parse();
