const authRouter = require('./auth.route.js');
const dashboardRouter = require('./dashboard.route.js');
const authMiddleware =require('../../middlewares/auth.middleware.js')
module.exports = (app) => {
    app.get('/admin', (req, res) => {
        res.redirect('/admin/dashboard');
    })
    app.use('/admin/dashboard', authMiddleware.requireAuth, dashboardRouter)
    app.use('/admin/auth', authRouter)
}