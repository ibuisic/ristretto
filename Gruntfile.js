'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);


  // Define the configuration for all the tasks
  grunt.initConfig({


    // compile LESS files into style.css
    less: {
        development: {
            files: {
                'css/style.css': ['less/style.less']
            }
        }
    },



    //Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 5 version', 'ie 8', 'ie 9'], // @see: https://github.com/ai/autoprefixer#browsers
      },
      dist: {
        files: [{
          expand: true,
          src: './css/style.css',
        }]
      }
    },


    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: './css',
          src: ['*.css', '!*.min.css'],
          dest: './css',
          ext: '.min.css'
        }]
      }
    }





  });

  grunt.registerTask('start', [
    'less',
  ]);

  grunt.registerTask('build', [
    'less',
    'autoprefixer',
    'cssmin',
  ]);

  grunt.registerTask('default', [
    'build'
  ]);


};
