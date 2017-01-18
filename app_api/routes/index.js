var express = require('express');
var router = express.Router();
var ctrlLocations = require('../controllers/locations');
var ctrlReviews = require('../controllers/reviews');
var ctrlValidation=require('../controllers/validation');
var jwt=require('express-jwt');
var auth=jwt({
secret:process.env.JWT_SECRET,
userProperty:'payload'
});

router.get('/locations', ctrlLocations.locationsListByDistance);
router.post('/locations',auth, ctrlLocations.locationsCreate);
router.get('/locations/:locationid', ctrlLocations.locationsReadOne);
router.put('/locations/:locationid', auth,ctrlLocations.locationsUpdateOne);
router.delete('/locations/:locationid', auth,ctrlLocations.locationsDeleteOne);

// reviews
router.post('/locations/:locationid/reviews', ctrlReviews.reviewsCreate);
router.get('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewsReadOne);
router.put('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewsUpdateOne);
router.delete('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewsDeleteOne);

//Validation
router.post('/login',ctrlValidation.login);
router.post('/signUp',ctrlValidation.signup);

module.exports = router;
