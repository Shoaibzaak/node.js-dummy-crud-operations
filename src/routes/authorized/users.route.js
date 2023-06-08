
 
const express = require('express');
const router = express.Router();
var permit = require("../../middlewares").permit;
const controller = require('../../controllers').user;

//restricted routes

router.post('/changePassword', controller.changePasswordAfterVerifyingCode);
router.post('/update-profile', controller.updateprofile);
router.get('/getprofilefromid', controller.getprofilefromid);
router.post('/report-user', controller.reportUser);
router.post('/block-user', controller.blockUser);
router.post('/unblock-user', controller.unblockUser);
router.get('/get-blocked-users', controller.listBlockedUsers);
router.post('/updateprofilepic', controller.updateprofilepic);

router.post('/listAllUsers', controller.listAllUsers);
router.post('/editUser', controller.updateUserData);

router.post("/logout", controller.logout);


//test
router.post('/test-socket', controller.testSocket);
  
module.exports = router;
