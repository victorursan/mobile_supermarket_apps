//
//  DetailViewController.swift
//  supermarket_ios
//
//  Created by Victor Ursan on 11/7/16.
//  Copyright © 2016 Victor Ursan. All rights reserved.
//

import UIKit
import RealmSwift
import Charts

class DetailViewController: UIViewController, UITextFieldDelegate, UITextViewDelegate, UIPickerViewDataSource, UIPickerViewDelegate {
  
  var product: RealmProduct?
  
  @IBOutlet weak var identifierTextField: UITextField!
  @IBOutlet weak var nameTextField: UITextField!
  @IBOutlet weak var priceTextField: UITextField!
  @IBOutlet weak var descriptionTextView: UITextView!
  @IBOutlet weak var saveButton: UIButton!
  
  @IBOutlet weak var barChartView: BarChartView!
  
  var barchartElements: Results<RealmProduct>!
  
  var pickerView: UIPickerView = UIPickerView()
  var elements: [String] = []
  
  private var editMode = false
  
  override func viewDidLoad() {
    super.viewDidLoad()
    identifierTextField.isEnabled = false
    pickerView.dataSource = self
    pickerView.delegate = self
    
    elements = (1...1000).map { "\($0)" }
    priceTextField.inputView = pickerView
    
    let realm = try! Realm()
    barchartElements = realm.objects(RealmProduct.self)
    
    setChart(product: product!)
    // Do any additional setup after loading the view.
  }
  
  
  override func viewWillAppear(_ animated: Bool) {
    if let p = product {
      identifierTextField.text = p.identifier
      nameTextField.text = p.name
      priceTextField.text = String(format:"%f", p.price)
      descriptionTextView.text = p.productDescription
    }
    
    updateEditMode(false)
  }
  
  func setChart(product: RealmProduct) {
    var dataEntries: [BarChartDataEntry] = []
    var colors: [UIColor] = []
    var labels: [String] = []
    
    for i in 0..<barchartElements.count {
      let dataEntry = BarChartDataEntry(x: Double(i), y: barchartElements[i].price)
      labels.append(barchartElements[i].name)
    
      dataEntries.append(dataEntry)
      if (product.identifier == barchartElements[i].identifier){
        colors.append(UIColor.red)
      }else {
        colors.append(UIColor.blue);
      }
    }
    
    barChartView.chartDescription?.text = ""
    let chartDataSet = BarChartDataSet(values: dataEntries, label: "")
    chartDataSet.colors = colors
    chartDataSet.stackLabels = labels
    let chartData = BarChartData(dataSet: chartDataSet)
    barChartView.data = chartData
    
    barChartView.xAxis.enabled = false
  
    barChartView.animate(xAxisDuration: 2.0, yAxisDuration: 5.0, easingOption: .easeInBounce)
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
  
  
  override func didReceiveMemoryWarning() {
    super.didReceiveMemoryWarning()
    // Dispose of any resources that can be recreated.
  }
  
  override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
    view.endEditing(true)
    super.touchesBegan(touches, with: event)
  }
  
  private func updateEditMode(_ enabled: Bool) {
    //    identifierTextField.isEnabled = enabled
    nameTextField.isEnabled = enabled
    priceTextField.isEnabled = enabled
    descriptionTextView.isEditable = enabled
    saveButton.isHidden = !enabled
  }
  
  @IBAction func editButtonpressed(_ sender: UIBarButtonItem) {
    editMode = !editMode
    updateEditMode(editMode)
  }
  
  @IBAction func saveButtonPressed(_ sender: UIButton) {
    if let identifier = identifierTextField.text,
      let prodName = nameTextField.text,
      let prodPriceTxt = priceTextField.text,
      let prodPrice = Double(prodPriceTxt),
      let prodDescription = descriptionTextView.text {
      
      let product = RealmProduct(value: ["identifier": identifier, "name": prodName, "price": prodPrice, "productDescription": prodDescription])
      DispatchQueue(label: "addBackground").async {
        let realm = try! Realm()
        try! realm.write { () -> Void in
          realm.add(product, update: true)
        }
      }
      let _ = navigationController?.popViewController(animated: true)
      
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
