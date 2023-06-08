/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose')

const DishCategory = mongoose.model('dishCategories')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createDishCategory: async (data) => {
        console.log("createDishCategory HelperFunction is called");
        const dishCategory = new DishCategory(data)
        await dishCategory.save()
        return dishCategory
        
    },
    getDishCategoryWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getDishCategory Model Function called")

        const dishCategorys = await DishCategory.find(query.critarion)
       
        .populate('addedby', query.addedby)
        .populate("branch", query.branchFields)
        .populate('lastModifiedBy', query.lastModifiedBy)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const dishCategorysize = dishCategorys.length

        return {
            dishCategorys: dishCategorys,
            count: dishCategorysize,
            offset: offset,
            limit: limit
        };
        
    },

    getDishCategoryList: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getDishCategory Model Function called")

        const dishCategorys = await DishCategory.find(query.critarion).select(query.fields/* '_id DishCategoryName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const dishCategorysize = dishCategorys.length

        return {
            dishCategorys: dishCategorys,
            count: dishCategorysize,
            offset: offset,
            limit: limit
        };
        
    },

    updateDishCategory: async (data) => {
        console.log("updateDishCategory HelperFunction is called");

        const result = await promise.all([DishCategory.findOneAndUpdate({_id: data.dishCategoryid}, data, {new: true})])
        return result; 
                
    },

    

    removeDishCategory: async (data) => {
        console.log("removeDishCategory HelperFunction is called");

        const dishCategory = await DishCategory.findById(data.id);
        if(dishCategory == null){
             var error = "DishCategory does not exists."
             return error
        }
        dishCategory.lastModifiedBy = data.lastModifiedBy
        dishCategory.active = false
        dishCategory.save()
        return dishCategory;
        

    },

    findDishCategoryById: async (query) => {
        console.log("findDishCategoryById HelperFunction is called");
        
        const dishCategory = await DishCategory.findOne(query.critarion)
        
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return dishCategory;
        

    },

    

};
