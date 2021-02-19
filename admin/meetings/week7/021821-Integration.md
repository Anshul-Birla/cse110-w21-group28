## Powell Rangers / Group #28

**Type of meeting:** Manager Meeting

**Which members were present:** Anastasiia Makhniaieva, Anshul Birla, Dan Magaril, Michael Vu, Nick Krolikowski, Kewen Zhao, Kyeling Ong, Ravi Tapia, Ryan Nishimoto

**Members who were not present:** None

**Where/when meeting was held:** weekly zoom, 7:00 pm, Thu 2/18/21


## Agenda of what was discussed:

**Old business:** None

**New business:** 
+ updates to design/css
  + styling buttons: start button larger, more rounded
  + sans serif font better for websites
  + made stats and FAQ in line with header
  + dynamic sizing
+ [purecss.io](purecss.io) for buttons
  + more lightweight than bootstrap
  + works on class names
  + for icons, have to bring in SVG yourself
+ FAQ includes html as a pop-up
+ start button in lower left or center?
  + inconsistency in id naming, changed timerStart to 
+ make To Do list scrollable
  + html attribute: scrollable = True
+ goals: merge everything by Monday, assign tasks after we see where we are
+ delete things we don't need from package.json to keep dependencies
+ css library for checkboxes
  + single UI kit SVG
  + add as an issue
+ PR template, list issues it closes
+ update from Kewen: task list element extends TR element instead of just html element
  + solves issue of encompassing one within the other
  + remove delete column
+ table styling - long task/input
  + wrap around or limit character: wrap bc otherwise twitter problem
+ if user doesn't input task, get alert pop-up -> handle this more elegantly later
  + set it as required field in html before hit submit button
  + user might just hit space and then submit -> no alerts?
  + [https://www.w3schools.com/tags/att_input_required.asp](https://www.w3schools.com/tags/att_input_required.asp)

**Anything on the agenda that was not discussed:**  None


## Concluding notes:

**Decisions made:** 
+ use purecss for buttons, Nick will make ADR
+ merge everything by Monday

**When the meeting finished:** 7:39 pm
