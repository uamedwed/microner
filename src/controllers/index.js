export class Controllers {
	constructor(model) {
		this.model = model
	}

	insert(data) {
		return this.model.add(data)
	}

	list(query) {
		let limit = query.limit && query.limit <= 100 ? parseInt(query.limit) : 10
		let page = 0
		if (query) {
			if (query.page) {
				query.page = parseInt(query.page)
				page = Number.isInteger(query.page) ? query.page : 0
			}
		}
		return this.model.list(limit, page)
	}

	getById(_id) {
		return this.model.findById(_id)
	}

	patchById(_id, data) {
		return this.model.update(_id, data)
	}

	removeById(_id) {
		return this.model.deleteOne(_id)
	}
}
