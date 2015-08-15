/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Dish = require('../api/dish/dish.model');
var Pickup = require('../api/pickup/pickup.model');

Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});


User.find({}).remove(function() {
  User.create({
    provider: 'facebook',
    name: 'Open Graph Test User',
    email: 'open_zqwrohc_user@tfbnw.net',
    facebook: {
      id: 153275765007258
    }
  }, function(err, testUser) {
    Pickup.find({}).remove(function() {
      Dish.create({
        name: 'Poached Heaven',
        description: 'Smashed avo goodness. Poached eggs smothered with herbs and spices atop a buttery french toast. Comes with avocado to share.',
        images: [
          'https://c1.staticflickr.com/5/4028/4390644817_a6c4bbcac9_b.jpg'
        ],
        price: 50,
        user: testUser
      }, function(err, dish) {
        Pickup.create({
          user: testUser,
          dish: dish,
          tags: ['fresh', 'breakfast', 'gluten free']
        }, function() {
          console.log('finished populating pickups');
        });
      })
    });
  });
});

Dish.find({}).remove();
