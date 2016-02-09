# SmartVendingMachine-Manager
Q:What is smart vending machine?
  A:SmartVendingMachine just like its name, mock up a vending machine.

Q:What is the funcation of SmartVendingMachine-Manager?
  A:This is a manager web site of smart vending machine,which can be used to offer some information about machine and item
  u can watch the sell detail and modify the item or machine in this system.

Q:What kinds of technology you used?
  A:Node.js + Express.js +  html + css + jquery + bootstrap + ejs template + mysql



Smart Cals Vending Machine--
Web Monitor Subsystem


Project scope, requirements, assumptions and limitations

Let’s briefly review the requirements in this project. Customers can select and buy items include smart cal cards. They can pay by two different ways, coins and cards. So we have to keep tracking the balance in cards. Also, query information and get suggestions based on customers’ requirements. And manager can monitor the status of vending machines. Also, manage items and nutrition information.

After analyzing those requirements, we decide to make our project as a real-life scenario as possible. We didn’t just set our scope as a on-campus vending machines management simulation application. We try to built our system to make it work for a multistate vending machine corporation. 

Customers on each vending machine have the following options: browse item, get nutrition information about each item, search item with a range of calories and/or sugar values, buy SmartCal card, check card balance, pay by coins and pay by card.

Employees work on each vending machine to register the machine, add or delete item to or from machine and refill machine when needed.

Each vending machine itself has a background process going on periodically to synchronize the local database with the central database.

Monitoring station is able to get all the statistics, including items, machine and sales info, of the whole system and modify item if necessary.
