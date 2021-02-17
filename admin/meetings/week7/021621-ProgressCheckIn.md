## Powell Rangers / Group #28

**Type of meeting:** check in on action items and progress

**Which members were present:** Anshul Birla, Dan Magaril, Michael Vu, Nick Krolikowski, Kewen Zhao, Kyeling Ong, Ravi Tapia, Ryan Nishimoto

**Members who were not present:** Anastasiia Makhniaieva

**Where/when meeting was held:** [zoom](https://ucsd.zoom.us/j/4864649247) at 8:00 pm on Tue 2/16/21


## Agenda of what was discussed:

**Old business:** None

**New business:** 
+ VSCode extensions
  + LiveShare
  + CodeRunner
  + Bracket Pair Colorizer 2
+ communication between coding and design teams
  + provided list of id names
  + switching task list from ul to table/tr/td
    + styling columns -> design
    + table as root, th/tr as child, td as child
    + `tr of th's` should be a `th of td's`
+ draggable (version 2)
  + [https://htmldom.dev/drag-and-drop-table-row/](https://htmldom.dev/drag-and-drop-table-row/)
  + id-numbers plus internal task order still has to be changed manually
+ food for thought: use third party css
  + look for lightweight libraries where you can just pull specific aspects
  + e.g. buttons styling
+ don't integrate othe branches into basehtml
  + anything on main is set and we're happy with it
  + integrate Michael's distraction box with main instead of basehtml
  + coding team will assign classnames
+ avoiding id and class conflicts?
  + id's in camelCase bc enforcing camelCase in JS
  + css classes in snake case or dashes
+ Ryan - tasks for this week
  + animations for when mode changes
  + statistics
  + help Ravi and Michael?
    + Ravi - can make a PR tonight
    + Michael - done as well, wrote extra html that will need to be added in
  + styling, but we haven't implemented components
    + start styling timer - 2 p tags and button
    + pick background colors - 1 for work + 2 similar colors for breaks
+ structure:
  + table
    + row
      + td checkbox
      + td name
      + td number of pomo sessions
  + use shadow DOM with task item as shadow root, tr encapsulated inside
    + task item custom element so easier to cascade/collapse element
    + tr's can't see each other, can't autospace columns?
      + colgroup is applied to table, not rows
      + otherwise manually add spacing with css


**Anything on the agenda that was not discussed:**  None


## Concluding notes:

**Decisions made:** 
+ have everything integrated by Thursday, Ryan and Kyeling can work on CSS styling then (start with timer styling)
+ task list will be a table, most likely using shadow DOM

**When the meeting finished:** 8:58 pm
