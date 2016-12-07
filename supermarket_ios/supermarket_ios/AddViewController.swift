//
//  AddViewController.swift
//  supermarket_ios
//
//  Created by Victor Ursan on 11/7/16.
//  Copyright © 2016 Victor Ursan. All rights reserved.
//

import UIKit
import MessageUI
import RealmSwift

class AddViewController: UIViewController, UITextFieldDelegate, UITextViewDelegate, MFMailComposeViewControllerDelegate, UIPickerViewDataSource, UIPickerViewDelegate {


  
  @IBOutlet weak var identifierTextField: UITextField!
  @IBOutlet weak var nameTextField: UITextField!
  @IBOutlet weak var priceTextField: UITextField!
  @IBOutlet weak var descriptionTextField: UITextView!
  var pickerView: UIPickerView = UIPickerView()
  var elements: [String] = []
  
  override func viewDidLoad() {
    super.viewDidLoad()
    pickerView.dataSource = self
    pickerView.delegate = self
    
    elements = (1...1000).map { "\($0)" }
    priceTextField.inputView = pickerView
    // Do any additional setup after loading the view.
  }
  
  override func didReceiveMemoryWarning() {
    super.didReceiveMemoryWarning()
    // Dispose of any resources that can be recreated.
  }
  
  override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
    view.endEditing(true)
    super.touchesBegan(touches, with: event)
  }
  
  func numberOfComponents(in pickerView: UIPickerView) -> Int {
    return 1;
  }
  
  func pickerView(_ pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int {
    return elements.count;
  }
  
  func pickerView(_ pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String? {
    return elements[row]
  }
  
  func pickerView(_ pickerView: UIPickerView, didSelectRow row: Int, inComponent component: Int) {
    priceTextField.text = elements[row]
  }
  
  @IBAction func saveButtonWasPressed(_ sender: UIButton) {
    if let identifier = identifierTextField.text,
      let prodName = nameTextField.text,
      let prodPriceTxt = priceTextField.text,
      let prodPrice = Double(prodPriceTxt),
      let prodDescription = descriptionTextField.text {
      DispatchQueue(label: "addBackground").async {
        let realm = try! Realm()
        try! realm.write { () -> Void in
          realm.add(RealmProduct(value: ["identifier": identifier, "name": prodName, "price": prodPrice, "productDescription": prodDescription]))
        }
      }
      sendMail(product: RealmProduct(value: ["identifier": identifier, "name": prodName, "price": prodPrice, "productDescription": prodDescription]))
      let _ = navigationController?.popViewController(animated: true)
      
    }
  }
  
  func sendMail(product: RealmProduct) {
    let realm = try! Realm()
    let elements = realm.objects(RealmProduct.self)
    print("Elements:\(elements)\nAdded element:\n\(product)")
    let mailComposeViewController = configuredMailComposeViewController(message: "Elements:\(elements)\nAdded element:\n\(product)")
    if MFMailComposeViewController.canSendMail() {
      self.present(mailComposeViewController, animated: true, completion: nil)
    } else {
      self.showSendMailErrorAlert()
    }
    
  }
  
  func configuredMailComposeViewController(message: String) -> MFMailComposeViewController {
    let mailComposerVC = MFMailComposeViewController()
    mailComposerVC.mailComposeDelegate = self // Extremely important to set the --mailComposeDelegate-- property, NOT the --delegate-- property
    
    mailComposerVC.setToRecipients(["victor.ursan@gmail.com"])
    mailComposerVC.setSubject("ChangesMade")
    mailComposerVC.setMessageBody(message, isHTML: false)
    
    return mailComposerVC
  }
  
  func showSendMailErrorAlert() {
    let alert = UIAlertController(title: "Alert", message: "Could Not Send email", preferredStyle: UIAlertControllerStyle.alert)
    alert.addAction(UIAlertAction(title: "Click", style: UIAlertActionStyle.default, handler: nil))
    self.present(alert, animated: true, completion: nil)
  }
  
  // MARK: MFMailComposeViewControllerDelegate
  
  func mailComposeController(_ controller: MFMailComposeViewController, didFinishWith result: MFMailComposeResult, error: Error?) {
    controller.dismiss(animated: true, completion: nil)
  }
  
  /*
   // MARK: - Navigation
   
   // In a storyboard-based application, you will often want to do a little preparation before navigation
   override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
   // Get the new view controller using segue.destinationViewController.
   // Pass the selected object to the new view controller.
   }
   */
  
}
