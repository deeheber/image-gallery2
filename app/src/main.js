import angular from 'angular';
import app from './app';
import routes from './routes';
import './scss/main.scss';
import 'angular-material/angular-material.css';
import http from './http';
import auth from './auth';

app.config(http);
app.config(routes);
app.run(auth);
app.value('apiUrl', process.env.API_URL || '/api');

angular.bootstrap(document, [app.name]);
