const express = require('express');
var multer = require('multer');
  
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/admin/assets/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
  })
   
  var upload = multer({ storage: storage })

const router = express.Router();
const accountController = require('../../controllers/admin/account.controller');

router.get('/', accountController.index);

router.get('/create', accountController.create);

router.post('/create',upload.single('avatar'), accountController.createPost);

module.exports = router;