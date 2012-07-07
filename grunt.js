/*global module:false*/
module.exports = function(grunt) {
    //Load in the coffee and css grunt machines!
    grunt.loadNpmTasks('grunt-coffee'); // http://github.com/avalade/grunt-coffee
    grunt.loadNpmTasks('grunt-css'); // http://github.com/jzaefferer/grunt-css
    // Project configuration.
    grunt.initConfig({
                         pkg: '<json:package.json>',
                         meta: {
                             banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
                                 '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                                 '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
                                 '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
                                 ' Licensed <%= pkg.license %> */'
                         },
                         coffee:{
                             coffee:{
                                 src: ["src/js/plugins.coffee"],
                                 dest: 'build/js/',
                                 options:{
                                     bare: true
                                 }
                             }
                         },                      
                         concat: {
                             dist: {
                                 src: ['src/js/begin.js','build/js/plugins.js','src/js/end.js'],
                                 dest: 'dist/js/<%= pkg.name %>.js'
                             }
                         },                         
                         min: {
                             dist: {
                                 src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
                                 dest: 'dist/js/<%= pkg.name %>.min.js'
                             }
                         },
                         cssmin:{
                            dist:{
                                src:["src/css/*.css"],
                                dest:"dist/css/<%= pkg.name %>.min.css"
                            }
                         },
                         watch: {
                             files: ["src/*/*"],
                             tasks: 'coffee concat min cssmin'
                         }
                     }
                    );

    // Default task.
    grunt.registerTask('default', 'watch');
    grunt.registerTask('build','coffee concat min cssmin');
};
