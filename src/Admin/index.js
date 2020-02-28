var Admin = function () {
    this.name = "Admin";

    /*
    ** Load the module.
    ** Each module should have this (load) method; it does the initialization
    */
    this.load = function (express) {
        var that = this;
        this.app = express;
        this.setMiddlewares();
        this.setRoutes();
    };

    /*
    ** Define routes which this module works/handles with.
    */
    this.setRoutes = function () {
        // this is not available in closures, so 'that' is a work-around
        var that = this;

        this.app.get('/admin', function (req, res) {
            res.send('/admin route!!!');
        })
    }

    this.setMiddlewares = function () {
        var that = this;

        this.app.all('/admin', function (req, res, next) {
            // res.send('/admin middlware!!!')
            next();
        })
    }

    this.loadMessage = function () {
        return `${this.getName()} loaded!`
    };
}

module.exports = function (i) {
    var obj = new Admin();
    obj.load(i);
    return obj;
}