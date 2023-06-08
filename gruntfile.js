module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify-es');
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			task: {
				files: [{
					cwd: 'src/',
					src: '**/*.js',
					dest: 'target/',
					expand: true,
					flatten: false,
					ascii_only: true,
				}]
			}
		},
		copy: {
            files: {
                files: [
                    { 
                    	cwd: 'src/',
						src: '**/*',
						dest: 'target/',
						expand: true,
					}
                ]
            }
    	}
	})
};
