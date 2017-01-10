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

// var adminToken = 'ewoJImlkZW50aXR5IjogImFkbWluIiwKCSJhY2Nlc3MiOiBbInVwbG9hZCIsICJkb3dubG9hZCIsICJtYW5hZ2UiXQp9Cg==:jzrjyUFEJXA9xJUiA5XFntLeQNF0+bJDBKp4hW1Hr0cX6FPXFDFVMn60DzUgSnmdJLVKY0k/ZblOB3ymSFp+u8gqY6ui7topjYIiUwZ7lr0bZzB+c5KbHR93e/N+2NO7jFBnG3ZBm9ZPyOwbF0Nd0OoVcLiIgX1blfWb25EEQ8yGvR3o57VJWjwcsNhwZzRMobq/6aGhNu5dbzPL28PI9TBHV3BOxg/VUY451DT/OTmoD4SBp9l1GEJUnuN5d3fGvMk/s0E4/oLQ6FGSAjPJ+FRQcoPWfXAG89xFzEpkSMwTfcmjCJe+SjZj9dv0wfxHSHudXLf1NmL3yZAoEJbYoA=='  
// var adminUser = Realm.Sync.User.adminUser(adminToken);
// export default new Realm({
//   sync: {
//     user: adminUser,
//     url: 'realm://127.0.0.1:9080/~/products12',
//   },
//   schema: [RealmProduct]
// });

export default RealmProduct

// export default new Realm({schema: [RealmProduct]});
