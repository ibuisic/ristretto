## Ristretto theme

Version: 1.0.0

### Summary

Ristretto is a starting template for building custom Drupal 7 Bootstrap themes. It uses Bootstrap with all it's wonderful LESS source files and needs Grunt to run it's magical tasks.


### Features

1. Awesome Grunt tasks
2. LESS Compiler and CSS minification
3. JS optimization
4. Cross Browser compatibility
5. Image optimization (Svg and raster)
6. Web (icon)font generator
7. Grunticon


## What's included

In the starter theme you'll find the following directories and files, logically grouping common assets and providing both compiled and minified variations. You'll see something like this:

```
ristretto/
├── css/
│   └── style.css.map
├── dist/
│   ├── style.min.js
│   └── scripts.min.js
├── fonts/
│   └── fonts/
│       ├── glyphs.eot
│       ├── glyphs.ttf
│       └── glyphs.woff
├── images/
│   ├── glyphs/...
│   ├── grunticon/...
│   └── svg/...
├── less/
│   ├── base/...
│   ├── components/...
│   ├── modules/...
│   ├── pages/...
│   ├── regions/...
│   ├── utilities/...
│   ├── overrides.less
│   ├── style.less
│   └── variables.less
├── scripts/
│   ├── plugins/...
│   ├── custom.js
│   └── plugins.min.js
└── templates/
    ├── node/
    ├── view/
    ├── html.tpl.php
    └── page.tpl.php
```

## Getting Started

Before starting development read the [style giude](https://github.com/ibuisic/dev_starter_kit) that contains some basic development principles that are used in building this sub theme and should be followed during development.

The theme requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install all the necessary Grunt plugins with this command:

```shell
npm install
```

Once all the plugins are installed, you can start developing your theme.

```shell
grunt start
```

This command will compile all LESS files and start the ``` watch ``` task which will check certain folders for changes and run appropriate Grunt tasks.


#### LESS

LESS files and folder structure.

```
── less/
   ├── base/...
   ├── components/...
   ├── modules/...
   ├── pages/...
   ├── regions/...
   ├── utilities/...
   ├── overrides.less
   ├── style.less
   └── variables.less
```

You should start by changing variables in the ``` variables.less``` file. All other files should be avoided.  
If needed comment out components and none needed files in the ``` style.less```.
Which is the only file that gets compiled into style.css.

#### JavaScript and optimization

All JavaScript should go in the ``` custom.js``` file and all the newly added plugins are located in the ```plugins``` folder.
These are concatenated in a single filed named  ```plugins.min.js```.

To re-minify and concat the JS files run the following command:

```shell
grunt uglify
```

#### Image optimization

All **raster** images that need to be added to the theme via CSS should go in the ```images``` folder that is located in the theme directory.  

Running the **imagemin** task will optimize them and save precious bytes.

```shell
grunt imagemin
```


#### Grunticon (SVG's)

All vector graphics should go in the ```images/svg``` folder.  

By running:
```shell
grunt vector
```

You will optimize your SVG files with SVGmin, run Grunticon task (generate base64 code **SVG sprite** with png **fallbacks** both as base64 code and png images) and run ImageMin to optimize the png fallbacks.  

You can find more on Grunticon  [here](https://github.com/filamentgroup/grunticon)


#### Generating Icon font

All **SVG's** that are made to use as icon fonts should go in the ```images/glyphs``` folder.  
Icon font generates custom icon webfonts from those files via task:

```shell
grunt font
```

This task will make all you need to use icons on your website.  
* Minify all svg in that folder.
* Create font files in all needed formats.  
* Generate LESS file ```components/glyphs.less``` with usable mixins and classes.  
* Re-compile all LESS files.


#### Building the theme

To run **ALL** tasks in an appropriate order and create minified CSS and JS versions, you should run:

```shell
grunt build
```

### Changelog

#### Version 1.0

* initial version
