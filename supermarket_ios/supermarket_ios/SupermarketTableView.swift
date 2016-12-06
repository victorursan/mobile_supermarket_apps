//
//  SupermarketTableView.swift
//  supermarket_ios
//
//  Created by Victor Ursan on 10/31/16.
//  Copyright © 2016 Victor Ursan. All rights reserved.
//

import UIKit
import RealmSwift

class SupermarketTableView: UITableViewController {
  
  //  var elements: [Product] = [Product]()
  
  
  var lists: Results<RealmProduct>!
  var notificationToken: NotificationToken!
  
  override func viewDidLoad() {
    super.viewDidLoad()
    print(Realm.Configuration.defaultConfiguration.fileURL!)
    Realm.Configuration.defaultConfiguration.deleteRealmIfMigrationNeeded = true
    let realm = try! Realm()
    lists = realm.objects(RealmProduct.self)
    
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
    
    // Uncomment the following line to preserve selection between presentations
    // self.clearsSelectionOnViewWillAppear = false
    
    // Uncomment the following line to display an Edit button in the navigation bar for this view controller.
    // self.navigationItem.rightBarButtonItem = self.editButtonItem()
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
    }
  }
  
  /*
   // Override to support conditional editing of the table view.
   override func tableView(_ tableView: UITableView, canEditRowAt indexPath: IndexPath) -> Bool {
   // Return false if you do not want the specified item to be editable.
   return true
   }
   */
  
  // Override to support editing the table view.
  override func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCellEditingStyle, forRowAt indexPath: IndexPath) {
    if editingStyle == .delete {
      let alertController = UIAlertController(title: "Delete", message: "Are you sure you want to delete the item ?", preferredStyle: .alert)
      let yesAction = UIAlertAction(title: "Yes", style: .default, handler: {(alert: UIAlertAction) in
        DispatchQueue(label: "updateBackground").async {
          let realm = try! Realm()
          let element = realm.objects(RealmProduct.self)[indexPath.row]
          try! realm.write {
            realm.delete(element)
          }
        }
        } );
      let noAction = UIAlertAction(title: "NO", style: .default, handler: nil)
      alertController.addAction(yesAction)
      alertController.addAction(noAction)
      present(alertController, animated: true, completion: nil)
      
    } else if editingStyle == .insert {
      // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view
    }
  }
  
  /*
   // Override to support rearranging the table view.
   override func tableView(_ tableView: UITableView, moveRowAt fromIndexPath: IndexPath, to: IndexPath) {
   
   }
   */
  
  /*
   // Override to support conditional rearranging of the table view.
   override func tableView(_ tableView: UITableView, canMoveRowAt indexPath: IndexPath) -> Bool {
   // Return false if you do not want the item to be re-orderable.
   return true
   }
   */
  
  /*
   // MARK: - Navigation
   
   // In a storyboard-based application, you will often want to do a little preparation before navigation
   override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
   // Get the new view controller using segue.destinationViewController.
   // Pass the selected object to the new view controller.
   }
   */
  
  deinit {
    notificationToken.stop()
  }
  
}
