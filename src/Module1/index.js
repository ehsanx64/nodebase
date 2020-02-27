var Module1 = function () {
    this.name = "Module1";

    this.load = function (express) {
        var that = this;
        this.app = express;
        this.setRoutes();
    };

    this.setRoutes = function () {
        var that = this;

        this.app.get('/mod1', function (req, res) {
            res.end(that.loadMessage())
        })

        this.app.get('/mod1/hello', function (req, res) {
            res.render('hello', {
                str: that.hello()
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