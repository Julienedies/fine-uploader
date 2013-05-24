// util-test.js
//
// Tests the various functions found in util.js.

assert = buster.assert;
refute = buster.refute;

// isObject
buster.testCase("isObject", {
    "empty simply object parameter": function () { 
        assert(qq.isObject({}));
    },

    "non-empty simple object parameter": function () { 
        assert(qq.isObject({ foo: 'bar' }));
    },

    "newed up Object": function () { 
        assert(qq.isObject(new Object()));
    },

    "function parameter": function () { 
        refute(qq.isObject(function(){}));
    },

    "null parameter": function () {
        refute(qq.isObject(null));
    },

    "array parameter": function () {
        refute(qq.isObject([]));
    },

    "object subclass parameter": function () {
        refute(qq.isObject(document.getElementsByTagName("body")));
    },

    "undefined parameter": function () {
        refute(qq.isObject(undefined));
    }
});

// isFunction
buster.testCase("isFunction", {
    "empty simple function": function () {
        assert(qq.isFunction(function(){}));
    },

    "object parameter": function () {
        refute(qq.isFunction({}));
    }
});

// isArray
buster.testCase("isArray", {
    "empty simple array": function () {
        assert(qq.isArray([]));
    },

    "a basic array": function () {
        assert(qq.isArray([1, "herp", { foo: "bar" }]));
    },

    "a string is *not* an array": function () {
        refute(qq.isArray("Herp derp"));
    }
});

// isString
buster.testCase("isString", {
    "empty string": function () {
        assert(qq.isString(""));
    },

    "string with characters": function () {
        assert(qq.isString("Herp derp"));
    },
});

// trimStr
buster.testCase("trimStr", {
    "trim around string": function () {
        assert(qq.trimStr(" blah "), "blah");
    },

    "trim after string": function () {
        assert(qq.trimStr("blah "), "blah");
    },

    "trim before string": function () {
        assert(qq.trimStr(" blah") , "blah");
    },

    "trim with nothing to trim": function () {
        assert(qq.trimStr("blah"), "blah");
    },

    "trim a string with many spaces everywhere": function () {
        assert(qq.trimStr("bl a h"), "bl a h");
    },

    "trim the empty string": function () {
        assert.equals(qq.trimStr(""), "");
    }
});

// isFileOrInput
// @TODO: This is going to need some sort of DOM manipulation to work.

// isInput
// @TODO: This is going to need some sort of DOM manipulation to work.

// isBlob
// @TODO: This is going to need some sort of DOM manipulation to work.

// isXhrUploadSupported
// @TODO: This is going to need some sort of DOM manipulation to work.

// isFolderDropSupported
// @TODO: This is going to need some sort of DOM manipulation to work.

// isFileChunkingSupported
// @TODO: This is going to need some sort of DOM manipulation to work.

// extend
// @TODO: scrapping this for now because *I* think extend should return a new object.
// Throwing out mutable objects means less bugs.

buster.testCase("extend", {
    setUp: function () {
        this.testy = 
            {   one: "one", 
                two: "two", 
                three: "three", 
                four: {
                        a: "a",
                        b: "b"
            }};

        this.five = { five: "five" };
        this.four_1 = { four: { c: "c" }};
        this.four_2 = { four: { d: "d" }};
    },

    "// simple extend": function () {
        var testy = qq.extend(this.testy, this.five)
        assert.equals(testy.one, this.testy.one);
        assert.equals(testy.two, this.testy.two);
        assert.equals(testy.three, this.testy.three);
        assert.equals(testy.four, this.testy.four);
        assert.equals(test.five, this.five);
    },

    "// nested extend": function () {
    },

});


// indexOf
buster.testCase("indexOf", {
    setUp: function () {
        this.obj = { foo: "bar" };
        this.arr = ["a", this.obj, 3];
    },

    "string (present)": function () {
        assert.equals(qq.indexOf(this.arr, "a"), 0);
    },

    "object (present)": function () {
        assert.equals(qq.indexOf(this.arr, this.obj), 1);
    },

    "number (present)": function () {
        assert.equals(qq.indexOf(this.arr, 3), 2);
    },

    "object (not present due to strict equals)": function () {
        assert.equals(qq.indexOf(this.arr, { foo: "bar" }), -1);
    },

    "not present at all": function () {
        assert.equals(qq.indexOf(this.arr, 4), -1);
    }

});

// getUniqueId
buster.testCase("getUniqueId", { 
    
    "Basic test for collisions:": function () {
        var bucket = [];
        // generate a bucket of 1000 unique ids
        for (var i = 0; i < 1000; i++) {
            bucket[i] = qq.getUniqueId();
        }

        // check for duplicates
        bucket.sort();
        var last = bucket[0];
        for (var i = 1; i < bucket.length; i++) {
            refute.equals(bucket[i], last);
            last = bucket[i];
        }
    }
});


// each
// @TODO: Need to think about how to really test this one
buster.testCase("each", {});

// bind
// @TODO: Need to think about how to really test this one
buster.testCase("bind", {});

// obj2url
buster.testCase("obj2url", {
    setUp: function () {
        this.baseUrl = "http://mydomain.com/upload";
        this.urlWithEncodedPath = "http://mydomain.com/upload%20me";
        this.params1 = { one: "one", two: "two", three: "three" };
        this.params2 = { a: "this is a test" };
        this.params3 = { a : { b: "innerProp" }};
        this.params4 = { a: function () { return "funky"; }};
    },

    "Base URL with basic object as param": function () {
        var varUrl = qq.obj2url(this.params2, this.baseUrl);
        var controlUrl = $.url(varUrl);

        assert.equals(controlUrl.param('a'), "this is a test");
    },

    "Base URL with basic object as params": function () {
        var varUrl = qq.obj2url(this.params1, this.baseUrl);
        var controlUrl = $.url(varUrl);

        assert.equals(controlUrl.param('one'), "one");
        assert.equals(controlUrl.param('two'), "two");
        assert.equals(controlUrl.param('three'), "three");
    },

    "Base URL with embedded object as a param value": function () {
        var varUrl = qq.obj2url(this.params3, this.baseUrl);
        var controlUrl = $.url(varUrl);

        assert.equals(controlUrl.param('a').b, "innerProp");
    },

    "Base URL with a function as a param value": function () {
        var varUrl = qq.obj2url(this.params4, this.baseUrl);
        var controlUrl = $.url(varUrl);

        assert.equals(controlUrl.param('a'), "funky");
    },

    "Empty URL with params": function () {
        var varUrl = qq.obj2url(this.params1, "");
        assert.equals(varUrl, "one=one&two=two&three=three");
    },

    "Encoded paths are left alone": function () {
        var varUrl = qq.obj2url(this.params1, this.urlWithEncodedPath);
        var regex = new RegExp("^" + this.urlWithEncodedPath);
        assert.match(varUrl, regex);
    }
});


// obj2FormData
buster.testCase("obj2FormData", {
    
    setUp: function () {
        
        this.formData = function () {
            var data = {};
            return {
                append: function (k, v) {
                    data[decodeURIComponent(k)] = decodeURIComponent(v);
                },
                get: function (k) {
                    return data[k];
                },
                clear: function() {
                    return (data = []);
                }
            };
        }();

        this.params1 = { one: "one", two: "two", three: "three" };
        this.params2 = { a : { b: "innerProp" }};
        this.params3 = { a: function () { return "funky"; }};
    },

    tearDown: function () {
        this.formData.clear();
    },

    "Base URL with basic object as param": function () {
        assert.equals(
            qq.obj2FormData(this.params1, this.formData).get('one'), 'one');
        assert.equals(
            qq.obj2FormData(this.params1, this.formData).get('two'), 'two');
        assert.equals(
            qq.obj2FormData(this.params1, this.formData).get('three'), 'three');
    },

    "Base URL with embedded object as param": function () {
        assert.equals(qq.obj2FormData(this.params2, this.formData).get('a[b]'), 'innerProp');
    },

    "Base URL with function as param": function () {
        assert.equals(qq.obj2FormData(this.params3, this.formData).get('a'), 'funky');
    }
});

// obj2Inputs
buster.testCase("obj2Inputs", {
   
    setUp: function () {
        this.params1 = { one: "one", two: "two", three: "three" };
        this.params2 = { a : { b: "innerProp" }};
        this.params3 = { a: function () { return "funky"; }};
    },

})



