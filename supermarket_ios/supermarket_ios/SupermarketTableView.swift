//
//  SupermarketTableView.swift
//  supermarket_ios
//
//  Created by Victor Ursan on 10/31/16.
//  Copyright © 2016 Victor Ursan. All rights reserved.
//

import UIKit
import RealmSwift
import NotificationCenter

class SupermarketTableView: UITableViewController {
  var configuration: Realm.Configuration!
  
  var lists: Results<RealmProduct>!
  var notificationToken: NotificationToken!
  
  override func viewDidLoad() {
    super.viewDidLoad()
    let realm = try! Realm(configuration: self.configuration)
    lists = realm.objects(RealmProduct.self)
    
//    let trigger = UNCalendarNotificationTrigger(dateMatching: newComponents, repeats: false)
    
    
    
    notificationToken = lists.addNotificationBlock { [weak self] (changes: RealmCollectionChange) in
      guard let tableView = self?.tableView else { return }
      switch changes {
      case .initial:
        // Results are now populated and can be accessed without blocking the UI
        tableView.reloadData()
        break
      case .update(_, let deletions, let insertions, let modifications):
        // Query results have changed, so apply them to the UITableView
        tableView.beginUpdates()
        tableView.insertRows(at: insertions.map({ IndexPath(row: $0, section: 0) }), with: .automatic)
        tableView.deleteRows(at: deletions.map({ IndexPath(row: $0, section: 0)}), with: .automatic)
        tableView.reloadRows(at: modifications.map({ IndexPath(row: $0, section: 0) }),with: .automatic)
        tableView.endUpdates()
        break
      case .error(let error):
        // An error occurred while opening the Realm file on the background worker thread
        fatalError("\(error)")
        break
      }
    }
  }
  
  override func didReceiveMemoryWarning() {
    super.didReceiveMemoryWarning()
    // Dispose of any resources that can be recreated.
  }
  
  // MARK: - Table view data source
  
  override func numberOfSections(in tableView: UITableView) -> Int {
    // #warning Incomplete implementation, return the number of sections
    return 1
  }
  
  override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
    // #warning Incomplete implementation, return the number of rows
    return lists.count
  }
  
  override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    let cell = tableView.dequeueReusableCell(withIdentifier: "supermarketCell", for: indexPath)
    let currentProduct = lists[indexPath.row]
    cell.textLabel?.text = "Name: \(currentProduct.name)"
    cell.detailTextLabel?.text = "Price: \(String(format:"%f", currentProduct.price))"
    
    return cell
  }
  
  override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
    if  segue.identifier == "DetailProduct",
      let destination = segue.destination as? DetailViewController,
      let blogIndex = tableView.indexPathForSelectedRow?.row {
      destination.product = lists[blogIndex]
      destination.configuration = self.configuration
    } else if segue.identifier == "AddProduct",
      let destination = segue.destination as? AddViewController {
      destination.configuration = self.configuration
    }
  }
  
  // Override to support editing the table view.
  override func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCellEditingStyle, forRowAt indexPath: IndexPath) {
    if editingStyle == .delete {
      let alertController = UIAlertController(title: "Delete", message: "Are you sure you want to delete the item ?", preferredStyle: .alert)
      let yesAction = UIAlertAction(title: "Yes", style: .default, handler: {(alert: UIAlertAction) in
        DispatchQueue(label: "updateBackground").async {
          let realm = try! Realm(configuration: self.configuration)
          let element = realm.objects(RealmProduct.self)[indexPath.row]
          try! realm.write {
            realm.delete(element)
          }
        }
        } );
      let noAction = UIAlertAction(title: "No", style: .default, handler: nil)
      alertController.addAction(yesAction)
      alertController.addAction(noAction)
      present(alertController, animated: true, completion: nil)
      
    } else if editingStyle == .insert {
      // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view
    }
  }
  
  deinit {
    notificationToken.stop()
  }
  
}
