var config = module.exports;

var SOURCE_DIR = "client";
var JS_SOURCE_DIR = SOURCE_DIR + "/js/";

var TEST_DIR = "test";
var LIBS_DIR = TEST_DIR + "/libs/";

config["base"] = {
    extensions: [],
    rootPath: "../",
    libs: [
        "test/libs/**/*.js",
    ],
    sources: [
        JS_SOURCE_DIR + "header.js",    
        JS_SOURCE_DIR + "util.js",    
        JS_SOURCE_DIR + "features.js",    
        JS_SOURCE_DIR + "promise.js",    
        JS_SOURCE_DIR + "button.js",    
        JS_SOURCE_DIR + "paste.js",    
        JS_SOURCE_DIR + "uploader.basic.js",    
        JS_SOURCE_DIR + "dnd.js",    
        JS_SOURCE_DIR + "uploader.js",    
        JS_SOURCE_DIR + "ajax.requester.js",    
        JS_SOURCE_DIR + "deletefile.ajax.requester.js",    
        JS_SOURCE_DIR + "handler.base.js",    
        JS_SOURCE_DIR + "handler.form.js",    
        JS_SOURCE_DIR + "handler.xhr.js"    
    ],
};

config["unit tests"] = {
    extends: "base",
    environment: "browser",
    tests: ["test/unit/*-test.js"]
}
