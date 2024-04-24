export default async (model, page, perPage) => {
    let page = page ? parseInt(req.query.page) : 1;
	let perPage = 20;
	let pageOffset = (page - 1) * perPage;
	let totalPages = Math.ceil(await model.count() / perPage);
	let records = await model.findAll({ limit: perPage, offset: pageOffset });
	let el = [];

	for(let i = 1; i <= 3; i++) {
		el[i] = i;
	}
	if(page > 1) {
		el.push('...');
	}

	for(let i = page-2; i <= page + 2 && i<=totalPages; i++) {
		el[i] = i;
	}
	if(page < totalPages - 2) {
		el.push('...');
	}

	for(let i = totalPages - 2; i <= totalPages; i++) {
		el[i] = i;
	}
	
	el.filter(e => e);

	let pagination = {
		total: totalPages,
		current: page,
		elements: el,
	}

    return [records, pagination];
}