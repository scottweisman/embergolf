import startApp from 'embergolf/tests/helpers/start-app';

var App;

import Ember from 'ember';

module('Integration - Home Page', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('Should welcome me to EmberGolf', function() {
  visit('/').then(function() {
    equal(find('h1#title').text(), 'Welcome to EmberGolf');
  });
});

test('Should allow navigating back to root from another page', function() {
  visit('/about').then(function() {
    click('a:contains("Home")').then(function() {
      notEqual(find('h3').text(), 'About');
    });
  });
});