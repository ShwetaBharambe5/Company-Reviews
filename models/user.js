const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Review = sequelize.define('review', {
    id: {
        type: Sequelize.INTEGER,      
        autoIncrement: true,          
        allowNull: false,             
        primaryKey: true              
    },
    
    companyName: Sequelize.STRING,      

    pros: Sequelize.STRING,      

    cons: Sequelize.STRING,
       
    rating: Sequelize.STRING
});

module.exports = Review;