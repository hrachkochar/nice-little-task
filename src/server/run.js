const initializer = require('./initialize')
initializer.on('initialization successful', async () => {
    require('./app')
})
