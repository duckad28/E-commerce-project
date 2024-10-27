const authRouter = require('./auth.route.js');
const dashboardRouter = require('./dashboard.route.js');
const productRouter = require('./product.route.js');
const roleRouter = require('./role.route.js');
const categoryRouter = require('./category.route.js');
const accountRouter = require('./account.route.js');
const authMiddleware =require('../../middlewares/auth.middleware.js');
const permissionMiddleware = require('../../middlewares/permission.middleware.js');

module.exports = (app) => {
    app.get('/admin', (req, res) => {
        res.redirect('/admin/dashboard');
    })
    app.use('/admin/dashboard', authMiddleware.requireAuth, dashboardRouter)
    app.use('/admin/product', authMiddleware.requireAuth, permissionMiddleware.product, productRouter)
    app.use('/admin/category', authMiddleware.requireAuth, permissionMiddleware.category, categoryRouter)
    app.use('/admin/role', authMiddleware.requireAuth, permissionMiddleware.role, roleRouter)
    app.use('/admin/account', authMiddleware.requireAuth, permissionMiddleware.account, accountRouter)
    app.use('/admin/auth', authRouter)
}