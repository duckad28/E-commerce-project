module.exports.product = (req, res, next) => {
    if (res.locals.role.permission.includes('product')) {
        next();
    } else {
        res.send('No permission')
    }
}

module.exports.category = (req, res, next) => {
    if (res.locals.role.permission.includes('category')) {
        next();
    } else {
        res.send('No permission')
    }
}

module.exports.role = (req, res, next) => {
    if (res.locals.role.permission.includes('role')) {
        next();
    } else {
        res.send('No permission')
    }
}

module.exports.account = (req, res, next) => {
    if (res.locals.role.permission.includes('account')) {
        next();
    } else {
        res.send('No permission')
    }
}