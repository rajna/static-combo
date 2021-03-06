// Generated by CoffeeScript 1.9.1
var Express, Tools, _baseAssetsPath, app, bodyParser, combo, compression, config, errorHandler, methodOverride, morgan;

Express = require('express');

bodyParser = require('body-parser');

morgan = require('morgan');

methodOverride = require('method-override');

errorHandler = require('errorhandler');

compression = require('compression');

Tools = require('./tools');

combo = require('./combo');

config = Tools.getJSONSync("config.json");

app = Express();

app.set('port', process.env.PORT || config.port);

app.use(compression());

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({
  'extended': false
}));

app.use(bodyParser.json({}));

app.use(methodOverride());

app.use(Express.query());

app.use(errorHandler());

app.set('baseAssetsPath', config.assetsPath);

if (app.get('env' === 'development')) {
  app.set('port', config.dev.port);
  app.set('baseAssetsPath', config.dev.assetsPath);
}

_baseAssetsPath = app.get('baseAssetsPath');

app.use(Express["static"](app.get('baseAssetsPath'), {
  maxage: Infinity
}));

app.use(combo(app.get('baseAssetsPath')));

app.listen(app.get('port'), function() {
  return console.log("Express Assests Combo Service run at " + app.get('env') + " listening on port" + app.get('port'));
});
