import angular from 'angular';
import app from './app';
import routes from './routes';
import './scss/main.scss';
import 'angular-material/angular-material.css';

app.config(routes);
app.value('apiUrl', process.env.API_URL || '/api');

angular.bootstrap(document, [app.name]);
