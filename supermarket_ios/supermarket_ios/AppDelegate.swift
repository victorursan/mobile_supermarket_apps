//
//  AppDelegate.swift
//  supermarket_ios
//
//  Created by Victor Ursan on 10/24/16.
//  Copyright © 2016 Victor Ursan. All rights reserved.
//

import UIKit
import UserNotifications

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

  var window: UIWindow?


  func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
    // Override point for customization after application launch.
    
    UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .sound]) {(accepted, error) in
      if !accepted {
        print("Notification access denied.")
      }
    }
    
    let action = UNNotificationAction(identifier: "remindLater", title: "Remind me later", options: [])
    let category = UNNotificationCategory(identifier: "myCategory", actions: [action], intentIdentifiers: [], options: [])
    UNUserNotificationCenter.current().setNotificationCategories([category])
    
    return true
  }

  func applicationWillResignActive(_ application: UIApplication) {
    // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
    // Use this method to pause ongoing tasks, disable timers, and invalidate graphics rendering callbacks. Games should use this method to pause the game.
  }

  func applicationDidEnterBackground(_ application: UIApplication) {
    // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
    // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
  }

  func applicationWillEnterForeground(_ application: UIApplication) {
    // Called as part of the transition from the background to the active state; here you can undo many of the changes made on entering the background.
  }

  func applicationDidBecomeActive(_ application: UIApplication) {
    // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
  }

  func applicationWillTerminate(_ application: UIApplication) {
    // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
  }

  func scheduleNotification(at date: Date) {
    let calendar = Calendar(identifier: .gregorian)
    let components = calendar.dateComponents(in: .current, from: date)
    let newComponents = DateComponents(calendar: calendar, timeZone: .current, month: components.month, day: components.day, hour: components.hour, minute: components.minute)
    
    let trigger = UNCalendarNotificationTrigger(dateMatching: newComponents, repeats: false)
    
    let content = UNMutableNotificationContent()
    content.title = "Tutorial Reminder"
    content.body = "Just a reminder to read your tutorial over at appcoda.com!"
    content.sound = UNNotificationSound.default()
    content.categoryIdentifier = "myCategory"
    
    if let path = Bundle.main.path(forResource: "logo", ofType: "png") {
      let url = URL(fileURLWithPath: path)
      
      do {
        let attachment = try UNNotificationAttachment(identifier: "logo", url: url, options: nil)
        content.attachments = [attachment]
      } catch {
        print("The attachment was not loaded.")
      }
    }
    
    let request = UNNotificationRequest(identifier: "textNotification", content: content, trigger: trigger)
    
    UNUserNotificationCenter.current().delegate = self
    UNUserNotificationCenter.current().removeAllPendingNotificationRequests()
    UNUserNotificationCenter.current().add(request) {(error) in
      if let error = error {
        print("Uh oh! We had an error: \(error)")
      }
    }
  }
}

extension AppDelegate: UNUserNotificationCenterDelegate {
  func userNotificationCenter(_ center: UNUserNotificationCenter, didReceive response: UNNotificationResponse, withCompletionHandler completionHandler: @escaping () -> Void) {
    
    if response.actionIdentifier == "remindLater" {
      let newDate = Date(timeInterval: 1, since: Date())
      scheduleNotification(at: newDate)
    }
  }
}

