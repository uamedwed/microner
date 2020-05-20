export class MongoDb {
	constructor(model) {
		this.model = model
	}

	add(data) {
		return new Promise((resolve, reject) => {
			try {
				resolve(new this.model(data).save())
			} catch (error) {
				reject(error)
			}
		})
	}

	findById(_id) {
		return new Promise((resolve, reject) => {
			this.model
				.findById(_id)
				.then(result => {
					resolve(result)
				})
				.catch(error => {
					reject(error)
				})
		})
	}

	list(perPage, page) {
		return new Promise((resolve, reject) => {
			this.model
				.find()
				.limit(perPage)
				.skip(perPage * page)
				.exec(function(err, users) {
					if (err) {
						reject(err)
					} else {
						resolve(users)
					}
				})
		})
	}

	update(_id, data) {
		return new Promise((resolve, reject) => {
			this.model.findById(_id, function(err, model) {
				if (err) reject(err)
				for (let i in data) {
					model[i] = data[i]
				}
				model.save(function(err, updateModel) {
					if (err) return reject(err)
					resolve(updateModel)
				})
			})
		})
	}

	delete(_id) {
		return new Promise((resolve, reject) => {
			this.model.deleteOne({ _id }, err => {
				if (err) {
					reject(err)
				} else {
					resolve(true)
				}
			})
		})
	}
}
