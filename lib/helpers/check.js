export class Check {
	constructor(object, type) {
		this.object = object
		this.type = type
		if (typeof type === 'string') {
			this.checkBasicTypes()
		} else if (typeof type === 'object') {
		}
	}

	checkBasicTypes() {
		if (typeof this.object !== this.type) {
			throw new Error('Object does not match type ' + this.type)
		}
	}
}
