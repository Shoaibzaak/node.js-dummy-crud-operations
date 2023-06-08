/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose')

const Hotel = mongoose.model('hotels')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createHotel: async (data) => {
        console.log("createHotel HelperFunction is called");
        const hotel = new Hotel(data)
        await hotel.save()
        return hotel
        
    },
    getHotelWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getHotel Model Function called")

        const hotels = await Hotel.find(query.critarion)
       
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const hotelsize = hotels.length

        return {
            hotels: hotels,
            count: hotelsize,
            offset: offset,
            limit: limit
        };
        
    },

    getHotelList: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getHotel Model Function called")

        const hotels = await Hotel.find(query.critarion).select(query.fields/* '_id HotelName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const hotelsize = hotels.length

        return {
            hotels: hotels,
            count: hotelsize,
            offset: offset,
            limit: limit
        };
        
    },

    updateHotel: async (data) => {
        console.log("updateHotel HelperFunction is called");

        const result = await promise.all([Hotel.findOneAndUpdate({_id: data.hotelid}, data, {new: true})])
        return result; 
                
    },

    

    removeHotel: async (data) => {
        console.log("removeHotel HelperFunction is called");

        const hotel = await Hotel.findById(data.id);
        if(hotel == null){
             var error = "Hotel does not exists."
             return error
        }
        hotel.lastModifiedBy = data.lastModifiedBy
        hotel.active = false
        hotel.save()
        return hotel;
        

    },

    findHotelById: async (query) => {
        console.log("findHotelById HelperFunction is called");
        
        const hotel = await Hotel.findOne(query.critarion)
        
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return hotel;
        

    },

    

};
