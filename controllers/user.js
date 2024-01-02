const Review = require('../models/user');

const userRoute = require('../routes/user');

const path = require('path');

exports.getReviewForm = async(req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
}

exports.addReview = async(req, res, next) => {
    try{
        const companyName = req.body.companyName;
        const pros = req.body.pros;
        const cons = req.body.cons;
        const rating = req.body.rating;

        const data = await Review.create({companyName:companyName, pros:pros, cons:cons, rating:rating});

        res.status(201).json({newReviewDetails:data});
    }catch(err){
        res.status(500).json({error:err});
    }
}


exports.getReview = async (req, res, next) => {
    try {
        const reviews = await Review.findAll();
        
        res.json(reviews);
    } catch (err) {
        console.error('Error fetching reviews:', err);
        res.status(500).json({error: err});
    }
}
