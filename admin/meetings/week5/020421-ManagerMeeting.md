## Powell Rangers / Group #28

**Type of meeting:** Manager Meeting

**Which members were present:** Anastasiia Makhniaieva, Anshul Birla, Dan Magaril, Michael Vu, Nick Krolikowski, Kyeling Ong, Ravi Tapia, Ryan Nishimoto

**Members who were not present:** Kewen Zhao

**Where/when meeting was held:** [zoom](https://ucsd.zoom.us/j/91498354151) at 6:01 pm on 2/4/21


## Agenda of what was discussed:

**Old business:** None

**New business:**    
Project Pitch expectations
+ Turn in Sunday
+ Present before next Wednesday
    + Weekends free, Mondays as well
    + Send in 3-4 potential meeting times
    + Short 15 minute meeting to present slide deck, plans, expected risks
+ Will be sent out soon

Project pipeline (due Tuesday)
+ Jest vs Cypress
  + Recommend Jest for unit testing
  + Jest - functions manipulating data
  + Cypress - HTML, clicking goes to the right place
  + MochaChai work together

Addressing code quality
+ Linting for stylistic properties
+ Not expected to set up code quality tools
+ Set up code quality via human review
+ Documentation - group effort
  + JSDoc - everyone needs to be aware of how comments are written
  + @param, @return format

Deliverables for next Tuesday
+ Draw.io diagram
+ 2-page status? what works/what doesn't?
  + What you've set up, what goals you haven't completed
+ Video, no longer than 2 minutes
  + Pushing code, section on GitHub Actions

Update Sim on our repo
+ main and meeting_notes branch
+ Dealing with merge conflicts - JSDoc causes a lot bc it spits out a lot of HTML
  + Don't want that in main branch bc everyone will have to keep pushing/pulling/update
  + Generate JSDocs as artifacts instead of stuff inside repository

Run system diagram past Sim
+ Explanation
  + specs/system diagrams/system_diagrams.pdf (meeting_notes branch)
  + Pass functions, event listeners
  + Blue arrows edit data, black arrows move things around
+ Sim's commentary
  + Right track, break down responsibilities
  + Blue arrows hard to follow (overlapping, arrowheads hidden behind other arrowheads)
  + Number at "User enters his tasks for the day" is a mistake
  + Other than that, good as a high-level system diagram (maps out entire application)
    + Later, when implementing things, might end up with more classes
    + Create the diagrams as you see fit/as they help
  + *Main critique/focus:* HTML aspects
    + Is timer making changes to the HTML, etc? Not clear on visual model - how is this changing visually?
    + More data model focused, data and visual models can be separated
    + Same as user flow diagram? How user interaction affects the state of the system at a high level
      + System diagrams might be more specific, like separate class to handle HTML
      + Add in more about how the view/display is changing
      + *Look into basic model view/controller diagram*

How do classes in JS work
+ Simplest approach: separate files, everything global, scripts ordered correctly

Figma prototype
+ Good as a high-fidelity render
+ For wireframes, try out a lot of different designs on paper
  + Document design decisions on whether to only have one page or include navigation & separate pages to avoid clutter
+ Ask friends for feedback on whether the interface is intuitive
+ Red is a scary color

**Anything on the agenda that was not discussed:**  None


## Concluding notes:

**Decisions made:** None

**When the meeting finished:** 7:02 pm
