//
//  Product.swift
//  supermarket_ios
//
//  Created by Victor Ursan on 11/7/16.
//  Copyright © 2016 Victor Ursan. All rights reserved.
//

import Foundation

struct Product: Equatable {
  let identifier: String
  let name: String
  let price: Double
  let description: String
  
  init(identifier: String, name: String, price: Double, description: String) {
    self.identifier = identifier
    self.name = name
    self.price = price
    self.description = description
  }
  
}

func ==(lhs: Product, rhs: Product) -> Bool {
  return lhs.identifier == rhs.identifier && lhs.name == rhs.name && lhs.price == rhs.price && lhs.description == rhs.description
}

