////////////////////////////////////////////////////////////////////////////
//
// Copyright 2016 Realm Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
////////////////////////////////////////////////////////////////////////////

'use strict';

import Realm from 'realm';

class RealmProduct extends Realm.Object {}
RealmProduct.schema = {
    name: 'RealmProduct',
    primaryKey: 'identifier',
    properties: {
         identifier: 'string',
         name: 'string',
         price: 'double',
         productDescription: 'string'
    },
};

export default new Realm({schema: [RealmProduct]});

// import Realm from 'realm'

// const RealmProduct = {
//   name: 'Car',
//   properties: {
//     make:  'string',
//     model: 'string',
//     miles: {type: 'int', default: 0},
//   }
// };
// const PersonSchema = {
//   name: 'Person',
//   properties: {
//     name:     'string',
//     birthday: 'date',
//     cars:     {type: 'list', objectType: 'Car'},
//     picture:  {type: 'data', optional: true}, // optional property
//   }
// };

// // Initialize a Realm with Car and Person models
// export default new Realm({schema: [RealmProduct, PersonSchema]});