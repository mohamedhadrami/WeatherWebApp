const registeredRoutes = [];

function trackRoutes(req, res, next) {
    const originalEnd = res.end;

    res.end = function () {
        const route = req.route ? req.baseUrl + req.route.path : '(unknown)';
        if (!registeredRoutes.includes(route)) {
            registeredRoutes.push(route);
        }

        res.end = originalEnd;
        res.end.apply(this, arguments);
    };

    next();
}

function getRegisteredRoutes() {
    return registeredRoutes;
}

module.exports = {
    trackRoutes,
    getRegisteredRoutes,
};