//
//  AddViewController.swift
//  supermarket_ios
//
//  Created by Victor Ursan on 11/7/16.
//  Copyright © 2016 Victor Ursan. All rights reserved.
//

import UIKit

class AddViewController: UIViewController, UITextFieldDelegate, UITextViewDelegate {
  
  @IBOutlet weak var identifierTextField: UITextField!
  @IBOutlet weak var nameTextField: UITextField!
  @IBOutlet weak var priceTextField: UITextField!
  @IBOutlet weak var descriptionTextField: UITextView!
  
  override func viewDidLoad() {
    super.viewDidLoad()
    
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
  
  @IBAction func saveButtonWasPressed(_ sender: UIButton) {
    if let identifier = identifierTextField.text,
      let prodName = nameTextField.text,
      let prodPriceTxt = priceTextField.text,
      let prodPrice = Double(prodPriceTxt),
      let prodDescription = descriptionTextField.text {
      if let parent = navigationController?.viewControllers[0] as? SupermarketTableView {
        let product = Product(identifier: identifier, name: prodName, price: prodPrice, description: prodDescription)
        parent.addProduct(product)
        let _ = navigationController?.popViewController(animated: true)
      }
    }
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
