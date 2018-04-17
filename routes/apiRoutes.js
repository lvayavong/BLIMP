const express = require('express');
const passport = require('passport');
const router = express.Router();
const db = require('../models');
const mustBeLoggedIn = require('../middleware/mustBeLoggedIn');
const articleController = require("../controllers/articleController");
const ibtController = require("../controllers/ibtController");

function getCurrentUser(req, res) {
  // I'm picking only the specific fields its OK for the audience to see publicly
  // never send the whole user object in the response, and only show things it's OK
  // for others to read (like ID, name, email address, etc.)
  const { id, username } = req.user;
  res.json({
    id, username
  });
}

router.route('/auth')
  // GET to /api/auth will return current logged in user info
  .get((req, res) => {
    if (!req.user) {
      return res.status(401).json({
        message: 'You are not currently logged in.'
      })
    }

    getCurrentUser(req, res);
  })
  // POST to /api/auth with username and password will authenticate the user
  .post(passport.authenticate('local'), (req, res) => {
    if (!req.user) {
      return res.status(401).json({
        message: 'Invalid username or password.'
      })
    }

    getCurrentUser(req, res);
  })
  // DELETE to /api/auth will log the user out
  .delete((req, res) => {
    req.logout();
    req.session.destroy();
    res.json({
      message: 'You have been logged out.'
    });
  });

router.route('/users')
  // POST to /api/users will create a new user
  .post((req, res, next) => {
    db.User.create(req.body)
      .then(user => {
        const { id, username } = user;
        res.json({
          id, username
        });
      })
      .catch(err => {
        // if this error code is thrown, that means the username already exists.
        // let's handle that nicely by redirecting them back to the create screen
        // with that flash message
        if (err.code === 11000) {
          res.status(400).json({
            message: 'Username already in use.'
          })
        }

        // otherwise, it's some nasty unexpected error, so we'll just send it off to
        // to the next middleware to handle the error.
        next(err);
      });
  });

// this route returns an array of strings if the user is logged in
// to demonstrate that we can ensure a user must be logged in to use a route
router.route('/stuff')
  .get(mustBeLoggedIn(), (req, res) => {
    // at this point we can assume the user is logged in. if not, the mustBeLoggedIn middleware would have caught it
    res.json([
      'Select an option from the menu above to begin.'
    ]);
  });

router.route('/notfoundpage')
  .get(mustBeLoggedIn(), (req, res) => {
    // at this point we can assume the user is logged in. if not, the mustBeLoggedIn middleware would have caught it
    res.status(404).json(err);
  });


router.route('/budget/:id')
  .get(mustBeLoggedIn(), (req, res) => {
    db.User
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  });

router.route('/budget')
  .post((req, res) => {
    console.log('req.body', req.body);
    db.User
      .findOneAndUpdate({ _id: req.body.id }, req.body.budgetItems)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  });

// router.route('/budget')
//   .get(mustBeLoggedIn(), (req, res) => {
//     // at this point we can assume the user is logged in. if not, the mustBeLoggedIn middleware would have caught it
//     res.json([
//       ' '
//       // 'Eyeballs',
//       // 'Pancreas',
//       // 'Fear The Walking Dead'
//     ]);
//   });

// Matches with "/api/articles"
router.route("/scraper")
  .get(articleController.findAll)
  .post(articleController.create);

// Matches with "/api/articles/:id"
router
  .route("/scraper/:id")
  .get(articleController.findById)
  .put(articleController.update)
  .delete(articleController.remove);

// Matches with "/api/nyt"
router
  .route("/ibt")
  .get(ibtController.findAll);

module.exports = router;

