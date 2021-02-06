# [Branch Name Formating]

* Status: accepted <!-- optional -->
* Date: [2021-02-03 when the decision was last updated] <!-- optional -->

## Context and Problem Statement

Branches can get messy and having some way to orginize them would be nice. What is the best way to enforce branch names while still maintaining ease of use? 


## Decision Drivers <!-- optional -->

* Ease of use
* Easy to remember
* Length of Branch Name

## Considered Options

* No Branch Enforcement 
* <issue #>/<admin/feature/bug>/description_of_branch
* <admin/feature/bug>/name_of_person_working_on_branch/description_of_branch 
* <admin/feature/bug>/description_of_branch 

## Decision Outcome

Chose option 4 because it was the most concise while still giving us a way to quickly see what the branch was aiming to do in a broad sesne. We did not want to use issue numbers in the branch because one branch may resolve more than one issues. The 3rd option was not used because the branch name would be too long 