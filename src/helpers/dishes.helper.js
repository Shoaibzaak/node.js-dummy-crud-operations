/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose')

const Dish = mongoose.model('dishes')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createDish: async (data) => {
        console.log("createDish HelperFunction is called");
        const dish = new Dish(data)
        await dish.save()
        return dish
        
    },
    getDishWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getDish Model Function called")

        const dishs = await Dish.find(query.critarion)
       
        .populate('addedby', query.addedby)
        .populate("branch", query.branchFields)
        .populate("dishCategory", query.dishCategoryFields)
        .populate('lastModifiedBy', query.lastModifiedBy)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const dishsize = dishs.length

        return {
            dishs: dishs,
            count: dishsize,
            offset: offset,
            limit: limit
        };
        
    },

    getDishList: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getDish Model Function called")

        const dishs = await Dish.find(query.critarion).select(query.fields/* '_id DishName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const dishsize = dishs.length

        return {
            dishs: dishs,
            count: dishsize,
            offset: offset,
            limit: limit
        };
        
    },

    updateDish: async (data) => {
        console.log("updateDish HelperFunction is called");

        const result = await promise.all([Dish.findOneAndUpdate({_id: data.dishid}, data, {new: true})])
        return result; 
                
    },

    

    removeDish: async (data) => {
        console.log("removeDish HelperFunction is called");

        const dish = await Dish.findById(data.id);
        if(dish == null){
             var error = "Dish does not exists."
             return error
        }
        dish.lastModifiedBy = data.lastModifiedBy
        dish.active = false
        dish.save()
        return dish;
        

    },

    findDishById: async (query) => {
        console.log("findDishById HelperFunction is called");
        
        const dish = await Dish.findOne(query.critarion)
        
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return dish;
        

    },

    

};
