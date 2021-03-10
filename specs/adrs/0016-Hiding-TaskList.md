# [Hiding Task List]

* Status: accepted <!-- optional -->
* Date: [2021-03-10 when the decision was last updated] <!-- optional -->
## Context and Problem Statement

We were deciding whether to hide the task list when the timer is running to make the UI cleaner and be less noisy.


## Decision Drivers <!-- optional -->

* Against:
* Addes more clicks, makes UI golf worse
* Less intuitive for the user, might add stress
* Adds more work for the team, lots of edge cases
* For:
* Hiding the task would make UI cleaner

## Considered Options

* Do not hide the task list.
* Hide the task list automatically
* User hides task list manually

## Decision Outcome

We decided to allow the user to hide the task list manually, as this gives the user the option to declutter their 
own workspace rather than forcing them and possibly adding confusion.
