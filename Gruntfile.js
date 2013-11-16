/**
 * This is Activeark JWT's default Gruntfile, feel free to edit to your
 * own taste, but remember to add it to .gitignore if you do.
 */
module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			'options': {
			},
			'minify-custom-scripts': {
				files: {
					'assets/js/min.js': ['assets/js/src/main.js', 'assets/js/src/autoload/**/*.js']
				}
			}
		},
		sass: {
			dist: {
				files: {
				'assets/css/src.css': ['assets/css/src/game.scss']
				}
			}
		},
		cssmin: {
			combine: {
			files: {
				'assets/css/min.css': ['assets/css/src.css']
			}
			}
		},
		watch: {
			css: {
				files: 'assets/css/src/**/*.scss',
				tasks: ['sass', 'cssmin']
			},
			js: {
				files: ['assets/js/src/autoload/**/*.js', 'assets/js/src/main.js'],
				tasks : ['uglify']
			},
			options: {
				livereload: false
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['uglify', 'sass', 'cssmin', 'watch']);
};
