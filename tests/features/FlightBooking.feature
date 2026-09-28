Feature: QAClickJet flight booking - search form

  Background:
    Given the user is on the QAClickJet flight booking page

  # ---------- Country autosuggest ----------
  @smoke
  Scenario: Country autosuggest shows matching countries and selects one
    When the user types "ind" in the country box
    Then the suggestions shown are "British Indian Ocean Territory,India,Indonesia"
    When the user selects "India" from the suggestions
    Then the country box shows "India"

  # ---------- Trip type ----------
  Scenario: Return date is disabled for One Way and enabled for Round Trip
    When the user selects trip type "One Way"
    Then the return date is "disabled"
    When the user selects trip type "Round Trip"
    Then the return date is "enabled"

  Scenario: Clicking the return date on One Way switches trip to Round Trip
    When the user selects trip type "One Way"
    And the user opens the return date calendar
    Then trip type "Round Trip" is selected

  Scenario: Multicity shows a popup and a second flight row
    When the user selects trip type "Multicity"
    And the user clicks OK on the multicity popup
    Then the second flight row is visible

  # ---------- From / To ----------
  @smoke
  Scenario: One way flight search from Delhi to Mumbai
    When the user selects trip type "One Way"
    And the user selects from city "DEL" and to city "BOM"
    Then the cities shown are "DEL" to "BOM"
    And the calendar opens by itself
    When the user picks day "20" in the calendar
    Then the depart date is "20/05"
    When the user clicks on Search
    Then the page url contains "search.aspx?mode=search"

  Scenario Outline: Selected FROM city is not shown in the TO list
    When the user selects from city "<from>"
    Then "<from>" is not in the TO list
    And "<other>" is in the TO list

    Examples:
      | from | other |
      | BLR  | MAA   |
      | DEL  | BOM   |
      | GOI  | DXB   |

  Scenario: Round trip with depart and return dates
    When the user selects trip type "Round Trip"
    And the user selects from city "DEL" and to city "BOM"
    And the user picks day "10" in the calendar
    And the user opens the return date calendar
    Then day "9" is disabled in the calendar
    When the user picks day "15" in the calendar
    Then the depart date is "10/05" and return date is "15/05"

  Scenario: Search with nothing selected stays on the same page
    When the user clicks on Search
    Then the user is still on the search page

  # ---------- Passengers ----------
  @smoke
  Scenario: Add adults, children and infants
    When the user opens the passengers box
    And the user adds 2 "Adult"
    And the user adds 2 "Child"
    And the user adds 1 "Infant"
    Then "Adult" count is 3
    And "Child" count is 2
    And "Infant" count is 1
    When the user clicks Done
    Then the passengers box shows "3 Adult, 2 Child, 1 Infant"

  Scenario: Adult count can not go below 1
    When the user opens the passengers box
    And the user removes 1 "Adult"
    Then "Adult" count is 1

  Scenario: Maximum 9 passengers are allowed in one booking
    When the user opens the passengers box
    And the user adds 8 "Adult"
    Then "Adult" count is 9
    And the plus button for "Adult" is disabled
    When the user tries to add one more "Child"
    Then an alert says "maximum of 9 passengers"
    And "Child" count is 0

  Scenario: Remove passengers updates the summary
    When the user opens the passengers box
    And the user adds 3 "Child"
    And the user removes 2 "Child"
    And the user clicks Done
    Then the passengers box shows "1 Adult, 1 Child"

  # ---------- Currency ----------
  Scenario Outline: Select currency
    Then the currency list has "Select,INR,AED,USD"
    When the user selects currency "<currency>"
    Then currency "<currency>" is selected

    Examples:
      | currency |
      | INR      |
      | AED      |
      | USD      |

  # ---------- Discounts ----------
  Scenario: Only one discount can be selected at a time
    Then there are 5 discount options
    When the user checks the "Senior Citizen" discount
    And the user checks the "Student" discount
    Then the "Student" discount is checked
    And the "Senior Citizen" discount is not checked

  Scenario: Senior Citizen discount is not shown for international flights
    When the user selects from city "BLR" and to city "DXB"
    And the user picks day "12" in the calendar
    Then the "Senior Citizen" discount is not shown
    And there are 4 discount options

  Scenario: Family and Friends discount needs minimum 4 passengers
    When the user selects from city "DEL" and to city "BOM"
    And the user picks day "12" in the calendar
    And the user checks the "Family and Friends" discount
    And the user clicks on Search
    Then the search alert says "minimum of 4 passenger"
    And the user is still on the search page

  Scenario: Infants are not counted for Family and Friends discount
    When the user selects from city "DEL" and to city "BOM"
    And the user picks day "12" in the calendar
    And the user opens the passengers box
    And the user adds 2 "Adult"
    And the user adds 1 "Infant"
    And the user clicks Done
    And the user checks the "Family and Friends" discount
    And the user clicks on Search
    Then the search alert says "excluding infant"

  Scenario: Family and Friends discount works with 2 adults and 2 children
    When the user selects from city "DEL" and to city "BOM"
    And the user picks day "12" in the calendar
    And the user opens the passengers box
    And the user adds 1 "Adult"
    And the user adds 2 "Child"
    And the user clicks Done
    And the user checks the "Family and Friends" discount
    And the user clicks on Search
    Then the page url contains "search.aspx?mode=search"

  # ---------- Header ----------
  Scenario: Top menu tabs are visible
    Then these tabs are visible "Flights,Hotels,Holiday Packages,Flight Status,Check-In,Manage Booking"

  # ---------- Full booking (end to end) ----------
  @smoke @e2e
  Scenario: Full round trip search with passengers, currency and discount
    When the user types "pak" in the country box
    And the user selects "Pakistan" from the suggestions
    And the user selects trip type "Round Trip"
    And the user selects from city "BLR" and to city "DXB"
    And the user picks day "12" in the calendar
    And the user opens the return date calendar
    And the user picks day "25" in the calendar
    And the user opens the passengers box
    And the user adds 2 "Adult"
    And the user adds 1 "Child"
    And the user clicks Done
    And the user selects currency "AED"
    And the user checks the "Family and Friends" discount
    Then the cities shown are "BLR" to "DXB"
    And the depart date is "12/05" and return date is "25/05"
    And the passengers box shows "3 Adult, 1 Child"
    When the user clicks on Search
    Then the page url contains "search.aspx?mode=search"
