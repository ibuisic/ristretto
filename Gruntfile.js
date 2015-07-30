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

      // Watches files for changes and runs tasks based on the changed files
      watch: {
        styles: {
          files: ['less/{,*/}*.less'],
          tasks: ['less'],
          options: {
            spawn: false
          }
        },
        icons: {
          files: ['./images/glyphs/*.svg'],
          tasks: ['font']
        }
    },

    // compile LESS files into style.css
    less: {
        options: {
          sourceMap: true
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
                'images/grunticon/grunticon.loader.js',
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
    },

    // Webfont icons
    webfont: {
      icons: {
          src: 'images/glyphs/*.svg',
          dest: 'fonts/glyphs',
          destCss: 'less/components/',
          options: {
            stylesheet: 'less',
            font: 'glyphs',
            relativeFontPath: '../fonts/glyphs',
            htmlDemo: false,
            templateOptions: {
                baseClass: 'glyph',
                classPrefix: 'glyph-',
                mixinPrefix: 'glyph-mix-'
            }
          }
      }
  },

    // minify svg files
    svgmin: {
    options: {
        plugins: [
                {
                    removeViewBox: false
                }, {
                    removeUselessStrokeAndFill: false
                }
            ]
        },
        glyphs: {
            files: [{
                expand: true,
                cwd: './images/glyphs',
                src: ['*.svg'],
                dest: './images/glyphs'
            }]
        },
        grunticons: {
            files: [{
                expand: true,
                cwd: './images/svg',
                src: ['*.svg'],
                dest: './images/svg'
            }]
        }
    },

    // Grunticon
    grunticon: {
        icons: {
            files: [{
                expand: true,
                cwd: './images/svg',
                src: ['*.svg', '*.png'],
                dest: 'images/grunticon'
            }],
            options: {
                enhanceSVG: true
            }
        }
    },

    // Image minification
    imagemin: {
      pngfallbacks:{
        files: [{
            expand: true,
            cwd: './images/grunticon',
            src: '{,*/}*.{png,jpg,jpeg,gif}',
            dest: './images/grunticon'
         }]
       },
     rasters:{
       files: [{
           expand: true,
           cwd: './images/',
           src: '{,*/}*.{png,jpg,jpeg,gif}',
           dest: './images/'
        }]
       }
    }

  });

  grunt.registerTask('start', [
    'less',
    'watch',
    'autoprefixer'
  ]);

  grunt.registerTask('build', [
    'less',
    'autoprefixer',
    'cssmin',
    'uglify',
    'svgmin',
    'webfont',
    'grunticon',
    'imagemin'
  ]);

  grunt.registerTask('font', [
    'svgmin:glyphs',
    'webfont',
    'less'
  ]);

  grunt.registerTask('vector', [
    'svgmin:grunticons',
    'grunticon',
    'imagemin:pngfallbacks'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);


};
