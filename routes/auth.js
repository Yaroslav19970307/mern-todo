const  express = require('express');
const  {AuthController} = require('../controllers/');
const  router = express.Router();

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.get('/users', AuthController.users);

module.exports = router;