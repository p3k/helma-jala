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
   "testCreatePassword",
   "testDiffObjects",
   "testPatchObject"
];

/**
 * Unit test for #jala.util.createPassword.
 */
var testCreatePassword = function() {
   assertMatch(jala.util.createPassword(),         /^[^\d]{8}$/);
   assertMatch(jala.util.createPassword(100),      /^[^\d]{100}$/);
   assertMatch(jala.util.createPassword(null, 0),  /^[^\d]{8}$/);
   assertMatch(jala.util.createPassword(100, 0),   /^[^\d]{100}$/);
   assertMatch(jala.util.createPassword(null, 1),  /^[\d\w]{8}$/);
   assertMatch(jala.util.createPassword(100, 1),   /^[\d\w]{100}$/);
   assertEqual(jala.util.createPassword(null, 2).length, 8);
   assertEqual(jala.util.createPassword(100, 2).length, 100);
   return;
};

var o1 = {a: 1, b: 2, d: 4};
var o2 = {a: 2, c: 3, d: 4};
var diff = jala.util.diffObjects(o1, o2);

/**
 * Unit test for #jala.util.diffObjects.
 */
var testDiffObjects = function() {
   assertNotNull(diff);
   assertNotUndefined(diff);
   assertEqual(diff.constructor, Object);

   assertNotUndefined(diff.a);
   assertNotUndefined(diff.b);
   assertNotUndefined(diff.c);
   assertUndefined(diff.d);

   assertNotNull(diff.a);
   assertNotNull(diff.b);
   assertNotNull(diff.c);

   assertEqual(diff.a.value, 2);
   assertUndefined(diff.b.value);
   assertEqual(diff.c.value, 3);

   assertEqual(diff.a.status, jala.Utilities.VALUE_MODIFIED);
   assertEqual(diff.b.status, jala.Utilities.VALUE_REMOVED);
   assertEqual(diff.c.status, jala.Utilities.VALUE_ADDED);
   return;
};

/**
 * Unit test for #jala.util.patchObject.
 */
var testPatchObject = function() {
   jala.util.patchObject(o1, diff);
   
   assertNotNull(o1);
   assertNotUndefined(o1);
   assertEqual(o1.constructor, Object);

   assertNotUndefined(o1.a);
   assertUndefined(o1.b);
   assertNotUndefined(o1.c);
   assertNotUndefined(o1.d);

   assertNotNull(o1.a);
   assertNotNull(o1.c);
   assertNotNull(o1.d);

   assertEqual(o1.a, 2);
   assertEqual(o1.c, 3);
   assertEqual(o1.d, 4);
   return;
};
