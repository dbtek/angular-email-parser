module.exports = function (grunt) {
  'use strict';

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Project configuration
  grunt.initConfig({
    // Metadata
    pkg: grunt.file.readJSON('bower.json'),
    banner: '/*!\n' +
      ' * <%= pkg.name %> - v<%= pkg.version %>\n' +
      '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
      ' * (c) <%= grunt.template.today("yyyy") %> <%= pkg.authors.join(", ") %>\n' +
      ' * License: <%= pkg.license %>\n' +
      ' */\n',
      // Task configuration
    concat: {
        options: {
          banner: '<%= banner %>',
          stripBanners: true
        },
        dist: {
        src: 'src/{,*/}*.js',
        dest: 'angular-email-parser.js'
      }
    },
    ngmin: {
      dist: {
        files: [{
          expand: true,
          src: 'angular-email-parser.js',
          dest: '.tmp'
        }]
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '.tmp/*.js',
        dest: 'angular-email-parser.min.js'
      }
    },
    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        'src/{,*/}*.js'
      ],
      test: {
        src: ['test/{,*/}*.js']
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },

    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'nodeunit']
      }
    },
    ngdocs: {
      options: {
        dest: 'docs',
        html5Mode: false,
        title: '<%= pkg.name %> Documentation'
      },
      all: ['src/{,*/}*.js']
    }
  });
  
  // Default task
  grunt.registerTask('default', ['jshint', 'concat', 'ngmin', 'uglify', 'ngdocs']);
};