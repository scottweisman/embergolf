import startApp from 'embergolf/tests/helpers/start-app';

var App, server;

import Ember from 'ember';

module('Integration - Courses Page', {
  setup: function() {
    App = startApp();

    var courses = [
      { id: 1, name: 'Pebble Beach', review_ids: [1, 2] },
      { id: 2, name: 'Augusta National', review_ids: [3, 4, 5]  },
      { id: 3, name: 'Torry Pines', review_ids: [6, 7] }
    ];

    var reviews = [
      { id: 1, content: "What's up with Docs?", course_id: 1 },
      { id: 2, content: "Of course, you know, this means war.", course_id: 1 },
      { id: 3, content: "Getting the most from the Acme categlog.", course_id: 2 },
      { id: 4, content: "Shaaaad up!", course_id: 2 },
      { id: 5, content: "Ah hates rabbits.", course_id: 2 },
      { id: 6, content: "The Great horni-todes", course_id: 3 },
      { id: 7, content: "The Great horni-todes", course_id: 3 }
    ];

    server = new Pretender(function() {
      this.get('/api/courses', function(request) {
        return [200, {"Content-Type": "application/json"}, JSON.stringify({courses: courses, reviews: reviews})];
      });

      this.get('/api/courses/:id', function(request) {
        var course = courses.find(function(course) {
          if (course.id === parseInt(request.params.id, 10)) {
            return course;
          }
        });

        var courseReviews = reviews.filter(function(review) {
          if (review.course_id === course.id) {
            return true;
          }
        });

        return [200, {"Content-Type": "application/json"}, JSON.stringify({course: course, reviews: reviews})];
      });
    });

  },
  teardown: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});

test('Should allow navigation to the courses page from the landing page', function() {
  visit('/').then(function() {
    click('a:contains("Courses")').then(function() {
      equal(find('h3').text(), 'Courses');
    });
  });
});

test('Should list all courses and number of reviews', function() {
  visit('/courses').then(function() {
    equal(find('a:contains("Pebble Beach (2)")').length, 1);
    equal(find('a:contains("Augusta National (3)")').length, 1);
    equal(find('a:contains("Torry Pines (2)")').length, 1);
  });
});

test('Should be able to navigate to a course page', function() {
  visit('/courses').then(function() {
    click('a:contains("Pebble Beach")').then(function() {
      equal(find('h4').text(), 'Pebble Beach');
    });
  });
});

test('Should be able visit a course page', function() {
  visit('/courses/1').then(function() {
    equal(find('h4').text(), 'Pebble Beach');
  });
});

test('Should list all reviews for a course', function() {
  visit('/Courses/1').then(function() {
    equal(find('li:contains("What\'s up with Docs?")').length, 1);
    equal(find('li:contains("Of course, you know, this means war.")').length, 1);
  });
});