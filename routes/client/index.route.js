const homeRouter = require('./home.route');
const productRouter = require('./product.route');
const chatRouter = require('./chat.route');
const authRouter = require('./auth.route');

module.exports = (app) => {
    app.use('/', homeRouter);
    app.use('/product', productRouter);
    app.use('/chat', chatRouter);
    app.use('/auth', authRouter);
}