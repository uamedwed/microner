const mongoose = require('mongoose')
import { configConstants } from '../config'
import { MongoDb } from '../models/mongodb'

export class Database {
	constructor(settings) {
		if (!settings) {
			settings = {
				driver: configConstants.DB_DRIVER,
				user: configConstants.DB_USER,
				password: configConstants.DB_PASSWORD,
				host: configConstants.DB_HOST,
				port: configConstants.DB_PORT,
				databaseName: configConstants.DB_DATABASE_NAME,
			}
		}
		this.settings = settings
		this.driver = settings.DB_DRIVER
		this.databaseUrl = this.connectString(this.settings)
		try {
			this.connect()
		} catch (error) {
			console.log(error)
		}
	}

	connect() {
		if (this.driver === 'mongodb') {
			mongoose.connect(this.databaseUrl, {
				useUnifiedTopology: true,
				useNewUrlParser: true,
				useFindAndModify: false,
				useCreateIndex: true,
			})
		}
	}

	connectString(settings) {
		if (this.driver === 'mongodb') {
			return (
				'mongodb://' +
				settings.DB_USER +
				':' +
				settings.DB_PASSWORD +
				'@' +
				settings.DB_HOST +
				':' +
				settings.DB_PORT +
				'/' +
				settings.DB_DATABASE_NAME
			)
		}
	}

	schema(structure) {
		if (this.driver === 'mongodb') {
			const Schema = new mongoose.Schema(structure)
			return Schema
		}
	}

	createTable(name, structure, indexes) {
		name = name.toLowerCase()
		if (this.driver === 'mongodb') {
			const schema = this.schema(structure)
			if (indexes && indexes.length > 0) {
				indexes.forEach(indexItem => {
					schema.index(indexItem)
				})
			}
			return new MongoDb(mongoose.model(name, schema))
		}
	}
}
