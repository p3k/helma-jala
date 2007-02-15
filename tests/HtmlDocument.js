//
// Jala Project [http://opensvn.csie.org/traccgi/jala]
//
// Copyright 2004 ORF Online und Teletext GmbH
//
// Licensed under the Apache License, Version 2.0 (the ``License'');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an ``AS IS'' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// $Revision$
// $LastChangedBy$
// $LastChangedDate$
// $HeadURL$
//


/**
 * Declare which test methods should be run in which order
 * @type Array
 * @final
 */
var tests = [
   "testGetAll",
   "testGetLinks",
   "testToObject"
];

var source = '<html><title>Test</title><body>' +
             '<h1>Hello, World!</h1>' +
             '<a href="http://localhost/1">foo</a>' +
             '<div><a href="http://localhost/2">bar</a></div>' +
             '</body></html>';

/**
 * Simple test of the HtmlDocument.getLinks method.
 * An instance of HtmlDocument is created from a very 
 * simple HTML source. The result of getLinks is then
 * evaluated and tested.
 */
var testGetLinks = function() {
   var html = new jala.HtmlDocument(source);
   var links = html.getLinks();
   assertEqual(links.constructor, Array);
   assertEqual(links.length, 2);
   assertEqual(links[0].constructor, Object);
   for (var i in links) {
     assertNotUndefined(links[i].url);
     assertNotUndefined(links[i].text);
   }
   assertEqual(links[0].url, "http://localhost/1");
   assertEqual(links[0].text, "foo");
   assertEqual(links[1].url, "http://localhost/2");
   assertEqual(links[1].text, "bar");
   return;
};

/**
 * Simple test of the HtmlDocument.geAll method.
 * An instance of HtmlDocument is created from a very 
 * simple HTML source. The result of getAll is then
 * evaluated and tested.
 */
var testGetAll = function() {
   var names = ["html", "head", "body", "title", "h1", "a", "div", "a"];
   var html = new jala.HtmlDocument(source);
   var list = html.getAll("*");
   for (var i in list) {
     assertNotUndefined(list[i].name);
     assertEqual(list[i].name, names[i]);
   }
   assertEqual(list[3].value, "Test");
   assertEqual(list[4].value, "Hello, World!");
   assertEqual(list[5].value, "foo");
   assertEqual(list[7].value, "bar");
   assertEqual(html.getAll("h1")[0].value, "Hello, World!");
   return;
};

/**
 * Simple test of the HtmlDocument.toObject method.
 * The source HTML code is converted to a JavaScript
 * object using jala.HtmlDocument.toObject.
 * The result is then evaluated and tested.
 */
var testToObject = function() {
   var target = {html:{body:{a:{href:"http://localhost/2", value:"bar"}, 
                 h1:{value:"Hello, World!"}}, title:{value:"Test"}}};
   var dom = getHtmlDocument(source);
   var obj = jala.HtmlDocument.toObject(dom);
   throw ("<em>testToObject()</em> Method flawed: the supported object structure can only represent some HTML documents. \ " +
          "As soon as there is more than one element on the same level, any duplicate will be missing.");
   return;
};
