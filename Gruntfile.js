module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        html2js: {
            dist: {
                options: {
                    base: '.',
                    module: 'template-<%= pkg.name %>-<%= pkg.version %>.html'
                },
                files: [{
                    expand: false,
                    src: ['templates/**/*.html'],
                    dest: 'build/<%= pkg.name %>.html.js'
                }]
            }
        },

        uglify: {
            options: {
                banner: '/*! Javascript: <%= pkg.name %> - <%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'js/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },

        concat: {
            options: {
                banner: '/*! HTML-template: <%= pkg.name %> - <%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                process: function (src, filepath) {
                    if (filepath === 'build/' + grunt.config.get('pkg.name') + '.min.js') {
                        var newStr = 'template-' + grunt.config.get('pkg.name') + '-' + grunt.config.get('pkg.version') + '.html';
                        return src.replace('angular.module("vsscrollbar",[])', 'angular.module("vsscrollbar",["' + newStr + '"])');
                    }
                    return src;
                }
            },
            dist: {
                src: ['build/**/*.html.js', 'build/**/*.min.js'],
                dest: 'dist/min/<%= pkg.name %>-<%= pkg.version %>.min.js'
            }
        },

        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'css',
                    src: '*.css',
                    dest: 'build',
                    ext: '.min.css'
                }]
            }
        },

        copy: {
            main: {
                options: {
                    process: function (src, filepath) {
                        if (filepath === 'js/' + grunt.config.get('pkg.name') + '.js') {
                            return src.replace('templates/' + grunt.config.get('pkg.name') + '.html',
                                'templates/' + grunt.config.get('pkg.name') + '-' + grunt.config.get('pkg.version') + '.html');
                        }
                        return src;
                    }
                },
                files: [{
                    src: 'build/<%= pkg.name %>.min.css',
                    dest: 'dist/min/<%= pkg.name %>-<%= pkg.version %>.min.css'
                },
                {
                    src: 'css/<%= pkg.name %>.css',
                    dest: 'dist/debug/css/<%= pkg.name %>-<%= pkg.version %>.css'
                },
                {
                    src: 'js/<%= pkg.name %>.js',
                    dest: 'dist/debug/js/<%= pkg.name %>-<%= pkg.version %>.js'
                },
                {
                    src: 'templates/<%= pkg.name %>.html',
                    dest: 'dist/debug/templates/<%= pkg.name %>-<%= pkg.version %>.html'
                }]
            }
        },

        clean: {
            all: {
                src: ['build', 'dist']
            },
            build: {
                src: ['build']
            },
            dist: {
                src: ['dist']
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['clean:all', 'html2js', 'uglify', 'concat', 'cssmin', 'copy', 'clean:build']);
};