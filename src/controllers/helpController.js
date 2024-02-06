const middleware = require('../middleware');

const welcomeFunc =  (req, res) => {
    const data = {
        status: 'Welcome to the Weather App API',
    };
    res.json(data);
}

const helperFunc =  (req, res) => {
    console.log(middleware.getRegisteredRoutes());
    const data = {
        status: 'OK',
        endpoints: middleware.getRegisteredRoutes(),
    };
    res.json(data);
}

module.exports = {
    welcomeFunc,
    helperFunc,
};