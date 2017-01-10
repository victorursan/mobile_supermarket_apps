//
//  ViewController.swift
//  supermarket_ios
//
//  Created by Victor Ursan on 10/24/16.
//  Copyright © 2016 Victor Ursan. All rights reserved.
//

import UIKit
import RealmSwift

class ViewController: UIViewController {
  var configuration: Realm.Configuration!
  
  @IBOutlet weak var usernameTF: UITextField!
  @IBOutlet weak var passwordTF: UITextField!
  
  override func viewDidLoad() {
    super.viewDidLoad()
    let delegate = UIApplication.shared.delegate as? AppDelegate
    delegate?.scheduleNotification(at: Date(timeIntervalSinceNow: 10))
    // Do any additional setup after loading the view, typically from a nib.
  }
  
  func setupRealm(_ username: String, password: String) {
    // Log in existing user with username and password
//    let username = "victor.ursan@gmail.com"  // <--- Update this
//    let password = "papple"  // <--- Update this
//    
    SyncUser.logIn(with: .usernamePassword(username: username, password: password, register: false), server: URL(string: "http://127.0.0.1:9080")!) { user, error in
      guard let user = user else {
        fatalError(String(describing: error))
      }
      
      DispatchQueue(label: "addBackground").async {
        // Open Realm
        self.configuration = Realm.Configuration(
          syncConfiguration: SyncConfiguration(user: user, realmURL: URL(string: "realm://127.0.0.1:9080/a/products")!)
        )
        _ = try! Realm(configuration: self.configuration)
      }
    }
    
  }
  
  @IBAction func loginButtonPressed(_ sender: UIButton) {
    self.setupRealm(usernameTF.text!, password: passwordTF.text! )
  }
  
  override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
    
    if segue.identifier == "toNavigate",
      let destinationNav = segue.destination as? UINavigationController,
      let destination = destinationNav.childViewControllers[0] as? SupermarketTableView {
      while true {
        
        if (self.configuration) != nil {
          destination.configuration = configuration
          break
        }
      }
    }
  }
  
  override func didReceiveMemoryWarning() {
    super.didReceiveMemoryWarning()
    // Dispose of any resources that can be recreated.
  }
  
  
}

