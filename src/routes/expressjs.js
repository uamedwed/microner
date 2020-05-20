const express = require('express')
const bodyParser = require('body-parser')
import { Constants } from '../config/constants'
import { Controllers } from '../controllers'

export class ExpressJs {
	constructor(settings) {
		this.port = settings.APP_PORT || Constants.APP_PORT
		this.settings = settings
		this.app = express()
		this.app.use((req, res, next) => {
			res.header('Access-Control-Allow-Origin', '*')
			res.header('Access-Control-Allow-Credentials', 'true')
			res.header(
				'Access-Control-Allow-Methods',
				'GET,HEAD,PUT,PATCH,POST,DELETE'
			)
			res.header('Access-Control-Expose-Headers', 'Content-Length')
			res.header(
				'Access-Control-Allow-Headers',
				'Accept, Authorization, Content-Type, X-Requested-With, Range'
			)
			if (req.method === 'OPTIONS') {
				return res.send(200)
			} else {
				return next()
			}
		})
		this.app.use(bodyParser.json())
		this.app.listen(this.port, () => {
			console.log('app listening at port %s', this.port)
		})
	}

	createBasicEndpoint() {
		const root = this.settings.API_ROOT || Constants.API_ROOT
		const version = this.settings.API_VERSION || Constants.API_VERSION
		return '/' + root + '/' + version + '/'
	}

	createEndpoints(name) {
		const basicEndpoint = this.createBasicEndpoint()
		const nameEndpoint = name
		const idEndpoint = ':_id'
		return {
			get: basicEndpoint + nameEndpoint,
			getSingle: basicEndpoint + nameEndpoint + '/' + idEndpoint,
			post: basicEndpoint + nameEndpoint,
			patchSingle: basicEndpoint + nameEndpoint + '/' + idEndpoint,
			delete: basicEndpoint + nameEndpoint + '/' + idEndpoint,
		}
	}

	initEndpoints(name, model) {
		const endpoints = this.createEndpoints(name)

		const controller = new Controllers(model)
		this.app.get(endpoints.get, [
			function(req, res) {
				controller
					.list(req.query)
					.then(result => {
						res.status(200).send(result)
					})
					.catch(error => {
						res.status(500).send(error)
					})
			},
		])
		this.app.get(endpoints.getSingle, [
			function(req, res) {
				controller
					.getById(req.params._id)
					.then(result => {
						res.status(200).send(result)
					})
					.catch(error => {
						res.status(500).send(error)
					})
			},
		])
		this.app.post(endpoints.post, [
			function(req, res) {
				controller
					.insert(req.body)
					.then(result => {
						res.status(201).send(result)
					})
					.catch(error => {
						res.status(500).send(error)
					})
			},
		])
		this.app.patch(endpoints.patchSingle, [
			function(req, res) {
				controller
					.patchById(req.params._id, req.body)
					.then(result => {
						res.status(201).send(result)
					})
					.catch(error => {
						res.status(500).send(error)
					})
			},
		])
		this.app.delete(endpoints.delete, [
			function(req, res) {
				controller
					.removeById(req.params._id)
					.then(result => {
						res.status(201).send(result)
					})
					.catch(error => {
						res.status(500).send(error)
					})
			},
		])
		return controller
	}

	createEndpoint(name, action, controller, rootEndpoint = true) {
		const basicEndpoint = rootEndpoint ? this.createBasicEndpoint() : ''
		this.app[action](basicEndpoint + name, [
			function(req, res) {
				controller(req)
					.then(result => {
						res.status(201).send(result)
					})
					.catch(error => {
						res.status(500).send(error)
					})
			},
		])
	}
}
