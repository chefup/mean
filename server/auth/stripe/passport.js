var passport = require('passport');
var _ = require('lodash');
var StripeStrategy = require('passport-stripe').Strategy;

exports.setup = function (User, config) {
  passport.use(new StripeStrategy({
      clientID: config.stripe.clientID,
      clientSecret: config.stripe.clientSecret,
      callbackURL: config.stripe.callbackURL,
      passReqToCallback: true
    },
    function(req, accessToken, refreshToken, stripe_properties, done) {
      req.user.stripe = _.extend(stripe_properties, {
        accessToken: accessToken,
        refreshToken: refreshToken
      });
      req.user.save(function(err) {
        if (err) return done(err);
        done(null, req.user);
      });
    }
  ));
};
