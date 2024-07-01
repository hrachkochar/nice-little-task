const express = require('express')
const useragent = require('express-useragent')
const http = require('http')
const routes = require('./routes')
const eventScheduler = require("../schedulers/eventManager");

// Configuration
const port = process.env.APP_PORT || '3005'
const app = express()
app.use(express.json()) // Parse JSON bodies
app.use(useragent.express()) // Parse user-agent
app.use(express.urlencoded({ extended: false })) // Parse URL-encoded bodies

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: `${process.uptime()} seconds`
    })
})

app.get('/ready', async (req, res) => {
    try {
        res.status(200).json({
            status: 'OK',
            timestamp: new Date().toISOString()
        })
    } catch (e) {
        console.error(e)
        res.status(500).json({
            status: 'Not OK',
            message: 'The service is currently unavailable. Please try again later.',
            timestamp: new Date().toISOString()
        })
    }
})

// API routes
app.use('/api/v1', routes)



// Catch-all for unhandled routes
app.use((req, res) => {
    res.status(404).json({ route: req.route, message: 'Route not found' })
})
// Set port and create HTTP server
app.set('port', port)
const server = http.createServer(app)

// Server listening
server.listen(parseInt(port, 10), () => {
    console.log(`Server listening on port ${port}`)
})

module.exports.server = app
