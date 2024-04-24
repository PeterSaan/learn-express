import express from 'express';
import nunjucks from 'nunjucks';
import bodyParser from 'body-parser';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import db from './models/index.js';
import * as paginate from './pagination.js'

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({ extended: false }));

nunjucks.configure('views', {
	autoescape: true,
	express: app
});

app.get('/', async (req, res) => {
	let [posts, pagination] = await paginate

	res.render('index.njk', { posts, totalPages, pagination });
});

app.get('/answer', (req, res) => {
	res.render('answer.njk', req.query);
});

app.get('/answer', (req, res) => {
	res.render('answer.njk', {...req.body, ...req.query});
})

app.listen(port, () => {
  	console.log(`Example app listening on port http://localhost:${port}`);
});