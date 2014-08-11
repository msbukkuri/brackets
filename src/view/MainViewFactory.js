/*
 * Copyright (c) 2014 Adobe Systems Incorporated. All rights reserved.
 *  
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"), 
 * to deal in the Software without restriction, including without limitation 
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, 
 * and/or sell copies of the Software, and to permit persons to whom the 
 * Software is furnished to do so, subject to the following conditions:
 *  
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *  
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
 * DEALINGS IN THE SOFTWARE.
 * 
 */

/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define, window, $, brackets */

define(function (require, exports, module) {
    "use strict";
    
    /**
     * @typedef {canOpenFile:function(path:string):boolean, openFile:function(path:string, pane:Pane)} Factory
     */
    
    /**
     * The view registration Database
     * @private
     * @type {Array.<Factory>}
     */
    var _factories = [];
    
    /**
     * Registers a view factory
     * @param {!Factory} factory - the view factory to register
     */
    function registerViewFactory(factory) {
        _factories.push(factory);
    }
    
    /**
     * Finds a factory that can open the specified file
     * @param {!string} fullPath - the file to open
     * @return {?Factory} A factory that can create a view for the path or undefined if there isn't one.
     */
    function findSuitableFactoryFor(fullPath) {
        var result;
        _factories.forEach(function (factory) {
            // This could get more complex in the future by searching in this order
            //  1) a factory that can open the file by fullPath
            //  2) a factory that can open the file by name
            //  3) a factory that can open the file by filetype
            if (factory.canOpenFile(fullPath)) {
                result = factory;
                return true;
            }
        });
        return result;
    }
    
    /* 
     * Public API
     */
    exports.registerViewFactory     = registerViewFactory;
    exports.findSuitableFactoryFor  = findSuitableFactoryFor;
});