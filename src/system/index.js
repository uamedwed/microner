import { Database } from '../database'
import { Routes } from '../routes'

export class System {
	constructor(settings) {
		if (settings) {
			this.db = new Database(settings)
			this.api = new Routes(settings)
		}
	}

	createTable(name, structure, indexes) {
		return this.db.createTable(name, structure, indexes)
	}

	createApi(name, model) {
		return this.api.createApi(name, model)
	}

	generateService(name, dbStructure, dbIndexes) {
		const _name = name
		const _model = this.createTable(_name, { ...dbStructure }, dbIndexes)
		const _api = this.createApi(_name, _model)
		return {
			model: _model,
			api: _api,
		}
	}

	createRoute(name, action, controller, rootEndpoint) {
		return this.api.createRoute(name, action, controller, rootEndpoint)
	}
}
