var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');
var app = express();

app.set('port', (process.env.PORT || 3000));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(sassMiddleware({
  src: path.join(__dirname, 'public/stylesheets/sass'),
  dest: path.join(__dirname, 'public/stylesheets'),
  debug: true,
  indentedSyntax: true,
  outputStyle: 'compressed',
  prefix: '/stylesheets'
}));


app.use('/', express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
