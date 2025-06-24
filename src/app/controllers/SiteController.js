const Course = require('../models/Course');

class SiteController {
    // [GET] /
    async index(req, res) {
    try {
      const courses = await Course.find({}); // Lấy tất cả courses
      res.json({ courses }); // Render template với dữ liệu courses
    } catch (err) {
      console.error(err); // Log lỗi để debug
      res.status(400).json('ERROR!!!');
    }
        // Course.find({}, function (err, courses) {
        //     if (!err) res.json(courses);
        //     res.status(400).json({ error: "ERROR!!!"});
        // });
        // res.render('home');
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
