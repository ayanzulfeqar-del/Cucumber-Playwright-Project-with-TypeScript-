# Test Plan – QAClickJet Flight Booking (Rahul Shetty Academy)

**URL:** https://rahulshettyacademy.com/dropdownsPractise/
**Tools:** Playwright (TypeScript) + Cucumber (BDD) + Page Object Model
**Browser:** Google Chrome (channel `chrome`)

## 1. Scope
In scope: the flight search form on the home page:
- Country autosuggest
- Trip type (One Way / Round Trip / Multicity)
- FROM / TO city dropdowns
- Depart / Return calendar
- Passengers box
- Currency
- Discount checkboxes
- Search button
- Header tabs

Out of scope: a real flight results page (this is a practice site; search only changes the URL to `#search.aspx?mode=search`), payment, login, Hotels / Holiday tabs, and performance or security testing.

## 2. What I found while exploring the site
| Area | Behaviour |
|---|---|
| Country | Type 3+ letters → jQuery suggestions. "ind" → British Indian Ocean Territory, India, Indonesia. With only 1 result ("pak") the list goes under the logo, so a mouse click fails and the keyboard works |
| Trip type | One Way: return date block is faded (opacity 0.5). Round Trip: opacity 1. Clicking return date while on One Way switches to Round Trip |
| Multicity | Shows a popup, "Ok" closes it, then a 2nd flight row appears |
| FROM / TO | 64 cities (domestic + international). Picking FROM opens TO by itself. TO list hides the selected FROM city. Picking TO opens the calendar |
| Calendar | Fixed at May–June 2019, 2 months shown. In return calendar, days before depart date are disabled. Date saved as DD/MM |
| Passengers | Adult min 1, Child/Infant min 0. Max 9 in total (adult + child + infant) → alert and + button gets disabled. Summary like "3 Adult, 2 Child, 1 Infant" |
| Currency | Select, INR, AED, USD |
| Discounts | 5 visible checkboxes. They act like radio buttons (only one can be ticked). Senior Citizen is hidden for international routes |
| Family & Friends | Search gives an alert if fewer than 4 passengers (infants not counted) and search does not happen |
| Search | Empty form: nothing happens, no error message. Valid form: URL gets `#search.aspx?mode=search` |

## 3. Test Scenarios
| ID | Scenario | Type | Priority |
|---|---|---|---|
| TC01 | Country autosuggest shows matching list and selects India | Positive | High (@smoke) |
| TC02 | Return date disabled for One Way, enabled for Round Trip | Functional | High |
| TC03 | Clicking return date on One Way switches to Round Trip | Functional | Medium |
| TC04 | Multicity popup + 2nd flight row | Functional | Medium |
| TC05 | One way DEL → BOM with date and search | E2E | High (@smoke) |
| TC06-08 | Selected FROM city not shown in TO list (BLR, DEL, GOI) | Data driven | Medium |
| TC09 | Round trip: past days disabled in return calendar, dates saved | Functional | High |
| TC10 | Search with empty form stays on same page | Negative | Medium |
| TC11 | Add adults, children, infants and check summary | Positive | High (@smoke) |
| TC12 | Adult can not go below 1 | Boundary | Medium |
| TC13 | Max 9 passengers alert, + disabled | Boundary / Negative | High |
| TC14 | Remove passengers updates summary | Functional | Low |
| TC15-17 | Currency INR / AED / USD | Data driven | Low |
| TC18 | Only one discount at a time | Functional | Medium |
| TC19 | Senior Citizen hidden for international (BLR → DXB) | Business rule | Medium |
| TC20 | Family & Friends with 1 passenger → alert, no search | Negative | High |
| TC21 | Family & Friends: infants not counted | Boundary | Medium |
| TC22 | Family & Friends with 2 adults + 2 children → search works | Positive | Medium |
| TC23 | Header tabs visible | UI | Low |
| TC24 | Full round trip: country, BLR → DXB, dates, 3A+1C, AED, F&F, search | E2E | High (@smoke @e2e) |

## 4. Bugs / Observations (manual)
1. **1 adult can add 3 infants.** Real airlines allow only 1 infant per adult. No test fails for this; it's noted as an observation.
2. **No validation on empty search.** The user gets no message when FROM / TO are empty.
3. **Autosuggest with 1 result is hidden under the logo.** The mouse can't click it.
4. **Calendar is stuck in 2019.** It shows past dates only and can't be used for real bookings.
5. **Discount checkboxes behave like radio buttons.** The UI shows checkboxes, which confuses the user.

## 5. Entry / Exit criteria
- Entry: site is up, Node 18+ and Chrome are installed.
- Exit: all High priority tests pass, and failures have a screenshot in `screenshots/`.

## 6. Risks
- Practice site can change or go down.
- Some elements overlap (logo, calendar). Handled with keyboard / force click / closing the calendar first.
