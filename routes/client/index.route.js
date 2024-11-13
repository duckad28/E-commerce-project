const homeRouter = require('./home.route');
const productRouter = require('./product.route');
const chatRouter = require('./chat.route');
const authRouter = require('./auth.route');

const middleware = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/auth/login')
    }
}
module.exports = (app) => {
    app.use('/', homeRouter);
    app.use('/product', productRouter);
    app.use('/chat', middleware, chatRouter);
    app.use('/auth', authRouter);
}