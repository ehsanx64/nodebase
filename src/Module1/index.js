var Module1 = function () {
    this.name = "Module1";

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

        this.app.get('/mod1/hi', function (req, res) {
            res.render('Module1/views/hi', {
                title: 'Module1 Hi'
            })
        })
        
        this.app.get('/mod1', function (req, res) {
            res.render('Module1/views/main', {
                title: 'Module1 Main'
            })
        })


        this.app.get('/mod1/goodbye', function (req, res) {
            res.render('Module1/views/goodbye', {
                title: 'Module1 Goodbye'
            })
        })
    }

    this.hello = function () {
        return 'Hello World from ' + this.getName()
    }
    
    this.getName = function () {
        return this.name
    };
    
    this.getInfo = function () {
        return {
            name: getName()
        }
    };

    this.loadMessage = function () {
        return `${this.getName()} loaded!`
    };
}

module.exports = function (i) {
    var obj = new Module1();
    obj.load(i);
    return obj;
}