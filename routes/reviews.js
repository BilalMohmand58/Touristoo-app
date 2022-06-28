const express = require('express') ; 
const router = express.Router({mergeParams: true}); 
const reviews = require('../controllers/reviews');

const catchAsync = require ('../utilities/catchAsync');
const Campground = require('../models/campground');
const Review = require('../models/review');
const ExpressError = require('../utilities/ExpressError');
const {reviewSchema} = require('../schema.js');
const{validateReview,isLoggedin, isReviewAuthor} = require('../middleware');



//Create Review
router.post('/', isLoggedin, validateReview, catchAsync(reviews.createReview))
    
    //Delete Review 
    router.delete('/:reviewID',isLoggedin, isReviewAuthor, catchAsync(reviews.deleteReview))


    module.exports = router ; 