/*global module:false*/
module.exports = function(grunt) {
  //Load in the coffee and css grunt machines!
  grunt.loadNpmTasks('grunt-contrib-coffee'); // https://github.com/gruntjs/grunt-contrib-coffee
  grunt.loadNpmTasks('grunt-contrib-cssmin'); // https://github.com/gruntjs/grunt-contrib-cssmin
  grunt.loadNpmTasks('grunt-contrib-concat'); // https://github.com/gruntjs/grunt-contrib-concat
  grunt.loadNpmTasks('grunt-contrib-uglify'); // https://github.com/gruntjs/grunt-contrib-uglify
  grunt.loadNpmTasks('grunt-contrib-watch'); // https://github.com/gruntjs/grunt-contrib-watch
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    coffee: {
      compileBare: {
        options: {
          bare: true
        },
        files: {
          'build/js/plugins.js': 'src/js/plugins.coffee'
        }
      }
    },
    concat: {
      dist: {
        src: ['src/js/begin.js','build/js/plugins.js','src/js/end.js'],
        dest: 'dist/js/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= pkg.license %> */\n'
      },
      dist: {
        files: {
          'dist/js/<%= pkg.name %>.min.js': '<%= concat.dist.dest %>'
        }
      }
    },
    cssmin: {
      target: {
        files: {
          'dist/css/<%= pkg.name %>.min.css': ['src/css/*.css']
        }
      }
    },
    watch: {
      files: ["src/*/*"],
      tasks: ['coffee', 'concat', 'uglify', 'cssmin']
    }
  });

  // Default task.
  grunt.registerTask('default', 'watch');
  grunt.registerTask('build', ['coffee', 'concat', 'uglify', 'cssmin']);
};
