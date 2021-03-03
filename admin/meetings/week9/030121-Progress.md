## Powell Rangers / Group #28

**Type of meeting:** progress check-in

**Which members were present:** Anastasiia Makhniaieva, Anshul Birla, Dan Magaril, Michael Vu, Nick Krolikowski, Kewen Zhao, Kyeling Ong, Ravi Tapia, Ryan Nishimoto

**Members who were not present:** None

**Where/when meeting was held:** zoom, 8:05, Mon 3/1/21


## Agenda of what was discussed:

**Old business:** 
Updates:
- Dan - form input required, try-catch block just in case
- Michael - PR for stop timer
- Ryan - bg color animation
  - 2-second switch or slow gradient as timer ticks down
  - color is only indication rn, sound in v2
- Ravi / Nick - fixed 
- Kyeling - table styling PR, created css variables for colors
  - case for user unchecking box after has been checked - dev team will handle in v2
- Kewen - delete functionality works, deleteAll dummy button
- Anshul - after current 3 PR's, v1 ready to deploy

**New business:** 
table design fixes:
- input boxes - half gray/black, outline when clicked
- scroll bar
- zoom 
  - not handling mobile case

stats
- Dan's idea: stats object w/ methods to do calculations, not storing the data except temp vars
- Anshul's idea: store stats as variables, update with event listeners, e.g. when end day button clicked
- what user would want
  - over vs underestimate
  - total pomos
  - total tasks
  - total time on work, total time on breaks
  - maybe a little productivity top for the user
- local storage -> view past work sessions?
  - json objects
- [miro board](https://miro.com/app/board/o9J_lRv_QwM=/)

**Anything on the agenda that was not discussed:**  None


## Concluding notes:

**Decisions made:** 
- if user minimizes window past 300, it's their problem
- in addition to strikethrough checked off tasks, gray out row
- enable overflow/rollover for underestimated # of pomos
- tooltip to guide user through futures

**When the meeting finished:** 9:02 pm
