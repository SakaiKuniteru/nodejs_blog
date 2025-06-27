const Course = require('../models/Course');
const { muntipleMongooseToObject } = require('../../util/mongoose')

class MeController {

    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
      let courseQuery = Course.find({});

      if (req.query.hasOwnProperty('_sort')) {
        courseQuery = courseQuery.sort({
          [req.query.column ]: req.query.type
        });
      }

      courseQuery
        .then(courses => res.render('me/stored-courses', {
          courses: muntipleMongooseToObject(courses)
        }))
        .catch(next);
    }
}

module.exports = new MeController();
