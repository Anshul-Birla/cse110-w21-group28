## Powell Rangers / Group #28

**Type of meeting:** Manager Meeting

**Which members were present:** Anastasiia Makhniaieva, Anshul Birla, Dan Magaril, Michael Vu, Nick Krolikowski, Kewen Zhao, Kyeling Ong, Ravi Tapia, Ryan Nishimoto, Sim Singh (TA)

**Members who were not present:** None

**Where/when meeting was held:** [zoom](https://ucsd.zoom.us/j/91498354151) at 6:30 pm on Thu 2/11/21


## Agenda of what was discussed:

**Old business:** None

**New business:** questions
+ purpose of Shadow DOM?
  + encapsulation
  + might have three different product items with same id, normally would throw an error in HTML tree
  + will not using the Shadow DOM affect grading when being compared to other groups that did use it?
    + shouldn't be docked points for not using it
    + but should have bare minimum of good software practice
    + could make an ADR to explain decision of not using it
    + [you might not need shadow DOM](https://www.hjorthhansen.dev/you-might-not-need-shadow-dom/)
+ grading based on how fast it is to deploy code through pipeline?
  + as long as you have the automated process built up
  + focus in class has hopefully made everyone implement it
  + 3 lines + yaml file
+ what are the expectations for code quality?
  + making sure people have classes
  + well-documented classes/code
  + avoid things that don't make sense, e.g. product-item knowing about cart
  + sytlistic adherence
  + idea: maybe for the 2 people checking each PR, provide a checklist of things to specifically check for
+ is it possible to check for documentation using Github Actions?
  + will probably have to be done manually
+ is it okay to restrict usability, e.g. not allowing special characters in tasks entered? what degree of security is expected?
  + technically users are only breaking system for themselves and not other users
  + `escape` function
  + `JSON.stringify()` takes a JSON obj and represents it as a string
  + when embedding text into HTML, does it have escape properties? how to make sure something is treated as string and not HTML
  + examples
    + multiline task if \n entered
    + ${ } are HTML variables in JS
    + \t - tab or take the text literally?

**Anything on the agenda that was not discussed:**  None


## Concluding notes:

**Decisions made:** None

**When the meeting finished:** 7:00 pm
