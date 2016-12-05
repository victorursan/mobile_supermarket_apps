//
//  ProductRealm.swift
//  supermarket_ios
//
//  Created by Victor Ursan on 12/11/16.
//  Copyright © 2016 Victor Ursan. All rights reserved.
//

import RealmSwift

class RealmProduct: Object {
  dynamic var identifier: String = ""
  dynamic var name: String = ""
  dynamic var price: Double = 0.0
  dynamic var productDescription: String = ""
  
  override static func primaryKey() -> String? {
    return "identifier"
  }
}
