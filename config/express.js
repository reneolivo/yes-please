var express = require('express');
var lessMiddleware = require('less-middleware');

module.exports = function(app, config) {
  app.configure(function () {
    app.use(express.compress());
    app.set('port', config.port);
    app.set('views', config.root + '/app/views');
    app.set('view engine', 'jade');
    app.use('view options', { pretty: true });
    //app.use(express.favicon(config.root + '/public/img/favicon.ico'));
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    //app.use('')

    app.use(lessMiddleware({
        src         : config.root + '/public/less/',
        dest        : config.root + '/public/css/',
        prefix      : '/css',
        paths       : [ config.root + '/components/bootstrap/less/bootstrap.less' ],
        compress    : false,
        debug       : false
    }));

    app.use(express.static(config.root + '/public'));

    app.use(function(req, res) {
      res.status(404).render('404', { title: '404' });
    });
  });
};
