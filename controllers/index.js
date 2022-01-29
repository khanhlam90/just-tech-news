// collecting the packaged group of API endpoints and prefixing them with the path /api. 
// Also, note that second use of router.use()
// This is so if we make a request to any endpoint that doesn't exist, 
// we'll receive a 404 error indicating we have requested an incorrect resource, another RESTful API practice.
// collected everything for us and packaged them up for server.js to use.

const router = require('express').Router();

const apiRoutes = require('./api');
// this is for the dashboard 
const dashboardRoutes = require('./dashboard-routes.js');
router.use('/dashboard', dashboardRoutes);

// added for the new home-routes.js
const homeRoutes = require('./home-routes.js');

router.use('/', homeRoutes);
// end of the above

router.use('/api', apiRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;