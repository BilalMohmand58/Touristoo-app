const Campground = require('./models/campground');
const ExpressError = require('./utilities/ExpressError');
const Review = require('./models/review');

const {campgroundSchema} = require('./schema.js');
const {reviewSchema} = require('./schema.js');
const review = require('./models/review');





//login middleware
module.exports.isLoggedin = (req, res, next)=>{
    if (!req.isAuthenticated()) {
        // req.session.returnTo = req.originalUrl ; 
        req.flash('error', 'You must be signed in')
       return res.redirect('/login')
    }
    next(); 
}

// Joi validate Middleware
module.exports.validateCampground = (req, res, next)=>{
    const {error} = campgroundSchema.validate(req.body); 
    if(error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    }else {
        next() ; 
    }
}
 // Campground Author middleware
module.exports.isAuthor = async(req, res, next)=>{
    const {id} = req.params ; 
    const campground = await Campground.findById(id); 
    if (!campground.author.equals(req.user._id)) {
        req.flash('error', "You Don't Have Permission!");
        return res.redirect(`/campgrounds/${id}`);
    }
    next(); 
}


//Review Author middleware
module.exports.isReviewAuthor = async(req, res, next)=>{
    const {reviewID,id} = req.params ; 
    const review = await Review.findById(reviewID); 
    if (!review.author.equals(req.user._id)) {
        req.flash('error', "You Don't Have Permission!");
        return res.redirect(`/campgrounds/${id}`);
    }
    next(); 
}

// Validate Review Joi Middleware

module.exports.validateReview = (req, res, next )=>{
    const {error} = reviewSchema.validate(req.body); 
    if(error) {
        const msg = error.details.map(el=>el.message).join(',')
        throw new ExpressError(msg, 400)
    }else{
        next(); 
    }
}