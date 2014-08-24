import Ember from 'ember';

var Router = Ember.Router.extend({
  location: EmbergolfENV.locationType
});

Router.map(function() {
	this.route('about');
	this.resource('courses', function() {
		this.route('show', {path: ':course_id'});
	});
});

export default Router;
