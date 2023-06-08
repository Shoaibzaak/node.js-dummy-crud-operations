
module.exports = {
	selectUsersData: {
		user_name: 1,
		email: 1,
		profile_picture_url: 1,
		online: 1
	},
	platforms: [ 'facebook', 'google', 'email', 'apple'],
	roles: [ 'user', 'superadmin',  /* 'client', 'facilitymanager',  */'operative', /* 'representative' */],
	allRolesPermitted: ['_a', '_usr', /* '_clt', '_fclmng',  */'_opt', /* '_rep' */]
};
