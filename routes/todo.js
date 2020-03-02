const  express = require('express');
const  {TodoController} = require('../controllers/');
const  router = express.Router();
const passport = require('passport');

router.get('/',passport.authenticate('jwt',{session:false}),TodoController.all);
router.post('/',passport.authenticate('jwt',{session:false}),TodoController.create);
router.get('/:id',passport.authenticate('jwt',{session:false}),TodoController.getById);
router.delete('/:id',passport.authenticate('jwt',{session:false}),TodoController.remove);
router.patch('/:id',passport.authenticate('jwt',{session:false}),TodoController.update);
module.exports = router;