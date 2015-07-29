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
        options: {
          sourceMap: true,
          sourceMapURL: '/css/style.css.source-map.json' // the complete url and filename put in the compiled css file
      },
        development: {
            files: {
                'css/style.css': ['less/style.less']
            }
        }
    },



    //Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 5 version', 'ie 8', 'ie 9'] // @see: https://github.com/ai/autoprefixer#browsers
      },
      dist: {
        files: [{
          expand: true,
          src: './css/style.css'
        }]
      }
    },


    // Minify all CSS for production
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: './css',
          src: ['*.css', '!*.min.css'],
          dest: './dist',
          ext: '.min.css'
        }]
      }
  },

    // Minify ALL js in a single file and use sourcemaps to debug
    uglify: {
        plugins: {
          files: {
            'scripts/plugins.min.js': [
                'scripts/plugins/affix.js',
                'scripts/plugins/alert.js',
                'scripts/plugins/button.js',
                'scripts/plugins/carousel.js',
                'scripts/plugins/collapse.js',
                'scripts/plugins/dropdown.js',
                'scripts/plugins/modal.js',
                'scripts/plugins/tooltip.js',
                'scripts/plugins/popover.js',
                'scripts/plugins/scrollspy.js',
                'scripts/plugins/tab.js',
                'scripts/plugins/transition.js'
            ]
        },
        options: {
          mangle: false
        }
      },
        dist: {
          files: {
            'dist/scripts.min.js': ['scripts/plugins.min.js', 'scripts/custom.js']
          },
          options: {
            sourceMap: true,
            mangle: false
          }
        }
    }

  });

  grunt.registerTask('start', [
    'less'
  ]);

  grunt.registerTask('build', [
    'less',
    'autoprefixer',
    'cssmin',
    'uglify'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);


};
