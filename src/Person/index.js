var Person = function () {
    this.name = "Person";
    this.key = "person";

    /*
    ** Load the module.
    ** Each module should have this (load) method; it does the initialization
    */
    this.load = function (express) {
        var that = this;
        this.app = express;
        this.setRoutes();
    };

    /*
    ** Define routes which this module works/handles with.
    */
    this.setRoutes = function () {
        // this is not available in closures, so 'that' is a work-around
        var that = this;

        this.app.get('/person', function (req, res) {
            var Person = require('./models/Person');

            Person.find().exec((err, persons) => {
                res.status(200).render('Person/views/list', {
                    title: 'Person List',
                    message: 'Everything is fine.',
                    data: persons
                });
            })
        })

        this.app.post('/person', function (req, res) {
            var Person = require('./models/Person');

            var george = new Person({
                name: 'George',
                age: 67
            });

            george.save()
                .then(() => console.log('George saved'))
                .catch(err => console.log(err));

            res.status(200).json({
                headers: {
                    request: req.get('Content-Type'),
                    name: req.get('name')
                },
                db: {
                    type: typeof Person,
                    schema: Person
                },
                body: req.body
            })
        })

        this.app.put('/person', function (req, res) {
            var Person = require('./models/Person');
            var request = {
                name: req.name,
                body: {
                    name: req.body.name,
                    age: req.body.age
                }
            };

            var newPerson = new Person(req.body);
            newPerson.save()
                .then(() => {
                    res.status(200).json({
                        result: true,
                        message: "Inserted new person",
                        request: request
                    });
                })
                .catch((err) => console.log(err));
        })

        this.app.get('/person/static', function (req, res) {
            var data = require('./data/StaticPersonData');

            res.status(200).render('Person/views/list', {
                title: 'Person List',
                message: 'These are static person data.',
                data: data
            });
        })
    }

    this.getName = function () {
        return this.name
    };
}

module.exports = function (i) {
    var obj = new Person();
    obj.load(i);
    return obj;
}