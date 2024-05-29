import express from 'express';
import nunjucks from 'nunjucks';
import bodyParser from 'body-parser';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import db from './models/index.js';
import paginate from './pagination.js'
import postController from './controllers/postController.js';

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({ extended: false }));

nunjucks.configure('views', {
	autoescape: true,
	express: app
});

app.get('/', async (req, res) => {
	let [posts, pagination] = await paginate(db.Post, req.query.page, 20);

	res.render('index.njk', { posts, pagination });
});

app.get('/answer', (req, res) => {
	res.render('answer.njk', req.query);
});

app.post('/answer', (req, res) => {
	res.render('answer.njk', {...req.body, ...req.query});
});

app.use('/posts', postController);

app.listen(port, () => {
  	console.log(`Example app listening on http://localhost:${port}`);
});