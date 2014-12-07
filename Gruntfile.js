'use strict';

var request = require('request');

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    var reloadPort = 35729, files;

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        develop: {
            server: {
                file: 'server.js'
            }
        },
        watch: {
            options: {
                nospawn: true,
                livereload: reloadPort
            },
            server: {
                files: [
                    'server.js',
                    'routes/*.js'
                ],
                tasks: ['develop', 'delayed-livereload']
            },
            js: {
                files: ['public/js/*.js'],
                options: {
                    livereload: reloadPort
                }
            },
            css: {
                files: ['public/css/*.css'],
                options: {
                    livereload: reloadPort
                }
            },
            hbs: {
                files: ['**/*.hbs'],
                options: {
                    livereload: reloadPort
                }
            }
        },
        autoprefixer : {
            options: {
                browsers: ['Chrome > 0.5%', 'Firefox > 0.5%', 'Opera > 0.5%','Safari > 5', 'ie >= 7']
            },
            default: {
                src: 'public/css/viewRegistryList.css',
               dest: 'public/css/build.css'
            }
        }
    });

    grunt.config.requires('watch.server.files');
    files = grunt.config('watch.server.files');
    files = grunt.file.expand(files);

    grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function () {
        var done = this.async();
        setTimeout(function () {
            request.get('http://localhost:' + reloadPort + '/changed?files=' + files.join(','), function (err, res) {
                var reloaded = !err && res.statusCode === 200;
                if (reloaded) {
                    grunt.log.ok('Delayed live reload successful.');
                } else {
                    grunt.log.error('Unable to make a delayed live reload.');
                }
                done(reloaded);
            });
        }, 500);
    });

    grunt.registerTask('default',
        [
            'build',
            'run'
        ]);
    grunt.registerTask('build', ['autoprefixer']);
    grunt.registerTask('run',['develop','watch']);
};