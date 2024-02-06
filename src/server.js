const express = require('express');
const db = require('./db');
const middleware = require('./middleware.js');
const router = require('./routes/router.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON data
app.use(express.json());

// Serve static files from the public directory
app.use(express.static('public'));

// Middleware to handle CORS (Cross-Origin Resource Sharing)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Use the trackRoutes middleware to collect registered routes
app.use(middleware.trackRoutes);

// Use weatherRoutes for handling requests to the /api/weather endpoint
app.use('/', router);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Test database connection
db.execute('SELECT 1')
    .then(() => console.log('Database connection successful!'))
    .catch(err => console.error('Error connecting to database: ', err));
