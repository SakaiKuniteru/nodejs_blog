const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose')
const slugify = require('slugify');
const shortid = require('shortid');

class CourseController {

    // [GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
        .then(course => {
            res.render('courses/show', { 
                course : mongooseToObject(course)
            });
        })
        .catch(next);
    }

    // [GET] /courses/create
    create(req, res, next) {
        res.render("courses/create");
    }

    // [POST] /courses/store
    async store(req, res, next) { 
    try {
        const formData = req.body;
        formData.image = `https://img.youtube.com/vi/${req.body.videoID}/sddefault.jpg`;
        formData.slug = `${slugify(formData.name, { lower: true, strict: true })}-${shortid.generate()}`; // Slug duy nhất
        const course = new Course(formData);
        await course.save();
        res.redirect('/');
        } catch (err) {
        next(err);
        }
    }

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
        .then(course => res.render("courses/edit", {
            course: mongooseToObject(course)
        }))
        .catch(next);
    }

    // [PUT] /courses/:id
    update(req, res, next){
        Course.updateOne({ _id: req.params.id }, req.body)
        .then(() => res.redirect('/me/stored/courses'))
        .catch(next);
    }

    // [DELETE] /courses/:id
    delete(req, res, next) {
        Course.deleteOne({ _id:req.params.id})
        .then(() =>res.redirect('back'))
        .catch(next);

    }

    // [POST] /courses/handle-form-actions
    handleFormActions(req, res, next) {
        switch(req.body.action) {
            case 'delete':
                Course.deleteMany({ _id: {$in: req.body.courseIDs}})
                .then(() => res.redirect('back'))
                .catch(next);
                break;
            default:
                res.json({ message: 'Action is invalid!!!'});
        }
    }
}

module.exports = new CourseController();
