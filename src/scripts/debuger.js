import debug from 'debug'

// DEBUGER
if(ENV !== 'production') {
	debug.enable('*')
}
else 
	debug.disable()
//

export const log = debug('app:log')