import { nanoid } from 'nanoid'

function getID(): string {
	return nanoid()
}

export { getID }
