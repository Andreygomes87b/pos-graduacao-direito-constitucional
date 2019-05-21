module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

uglify: {
    build1: {
        src: ["src/js/uncompressed/hammer.min.js", "src/js/uncompressed/video_resp.js", "src/js/uncompressed/jquery-3.4.0.min.js", "src/js/uncompressed/modernizr-custom.js", "src/js/uncompressed/webp.js"],        
        dest: "top_js_uglyfied.js",
    },
    build2: {
        src: ["src/js/uncompressed/index.js","src/js/uncompressed/menu_mobile.js", "src/js/uncompressed/hamburger_transition.js"],
        dest: "bottom_js_uglyfied.js",
    }
},

cssmin: {
  target: {
    files: [{
      expand: true,
      cwd: 'src/css',
      src: ['*.css', '!*.min.css'],
      dest: 'src/css',
      ext: '.min.css'
    }]
  }
},


concat_css: {
    options: {},
    all: {
      src: ["src/css/min/animate.min.css", "src/css/styles.min.css", "src/css/min/materialize.min.css"],
      dest: "stylesf-min.css"
    }},


htmlmin: {
   dist: {
      options: {
         removeComments: true,
         collapseWhitespace: true
      },
      files: [{
         expand: true,         
         src: 'index.html',
         ext: '.php'
      }]
   }
},


watch: {
    options: {
        livereload: true
    },
    js: {
        files: "js/*.js",
        tasks: ["uglify"]
    },
    css: {
        files: "src/css/styles.css",
        tasks: ["cssmin", "concat_css"]       
    },
    html: {
        files: "index.html",
        tasks: ["htmlmin"]
    }
  },
	
connect: {
    server: {
        options: {
            port: 9000,
            base: ".",
            hostname: "localhost",
            livereload: true,
            open: true
        }
    }
}

    });

    // 3. Where we tell Grunt we plan to use this plug-in.    
    grunt.loadNpmTasks('grunt-contrib-uglify');    
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
   grunt.registerTask( 'default', ['uglify','cssmin','concat_css','htmlmin','connect','watch']);

};