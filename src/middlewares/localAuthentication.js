const passport = require('passport');

module.exports = (req, res, next) => {
    passport.authenticate(
        'local',
        { session: false },
)(req, res, next);
};
