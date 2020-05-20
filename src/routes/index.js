import { ExpressJs } from './expressjs'

export class Routes {
	constructor(settings) {
		this.settings = settings
		if (this.settings.API_DRIVER === 'express') {
			this.app = new ExpressJs(this.settings)
		}
	}

	createApi(name, model) {
		return this.app.initEndpoints(name, model)
	}

	createRoute(name, action, controller, rootEndpoint) {
		return this.app.createEndpoint(name, action, controller, rootEndpoint)
	}
}
