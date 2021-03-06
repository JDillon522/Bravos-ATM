# Bank of Bravos ATM Project
App Scope:

The ATM should initially be stocked with 10 of each of the following denominations: $100, $50, $20, $10, $5, $1.
Users should be able to withdraw cash and the ATM should be able to track bills remaining.The ATM should tell the user
if it was able/unable to dispense the requested amount.The ATM needs to keep track of the current quantities of each of
its denominations.The ATM needs to keep track of each transaction that happens.

## Current Test Coverage
```
=============================== Coverage summary ===============================
Statements   : 91.1% ( 133/146 )
Branches     : 93.75% ( 15/16 )
Functions    : 76.09% ( 35/46 )
Lines        : 90.37% ( 122/135 )
================================================================================
```

## Application Pages
### Withdraw Page
- DONE - Users should be able to enter a dollar amount and press a withdraw button when desired dollar amount has been entered.
- DONE - Withdraw button should remain disabled until the user enters an amount.
- PARTIAL - Once with withdrawn button is pressed, display message whether or not transaction was successful (“Dispensed $<amount>” or failure “Insufficient Funds”).
    - I currently validate against withdrawing more than on hand. Can be changed

### Restock Page
- DONE - User should be able to enter quantities for each of the following denominations: $100, $50, $20, $10, $5, $1.
- DONE - Once the restock button is pressed, the total quantity of each denomination should be updated.
- DONE - Once the restock button is pressed, display a successful message to the user.


### ATM Overview Page
- DONE - Display the quantities of each denomination currently in the ATM.
- DONE - Display a transaction history of withdraw messages (“Dispensed $<amount>” or failure “Insufficient Funds”).
    - I changed this to a table of basic transaction records because I think it makes more sense.
