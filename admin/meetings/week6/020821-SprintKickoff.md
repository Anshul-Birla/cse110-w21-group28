## Powell Rangers / Group #28

**Type of meeting:**

**Which members were present:** Anastasiia Makhniaieva, Anshul Birla, Dan Magaril, Michael Vu, Nick Krolikowski, Kewen Zhao, Kyeling Ong, Ravi Tapia, Ryan Nishimoto

**Members who were not present:** None

**Where/when meeting was held:** [zoom](https://ucsd.zoom.us/j/93696118730) at 8:04 on Mon 2/8/21


## Agenda of what was discussed:

**Old business:** None

**New business:** 
+ Overview of how standup is conducted
  + Any issues with Slack thread format? no
  + Keep bot for reminders  
  + process
    + `cp standup_template.md week6/020821-Mon-Standup.md`
    + fill out notes
    + `git add`, `git commit`, `git pull`, `git push origin meeting_notes:meeting_notes`

+ Coding team updates
  + *GitHub logistics*
    + pull from main branch, run `npm install` to make Node modules folder
    + name branch `admin/feature/bug/3-4 word description` otherwise should not be able to commit
  + *Linting / style checking*
    + run `npm run lint-css`
    + if possible, will make fixes automatically, e.g. replaces 'var' with 'let'
    + if an error is annoying/too constraining, ping Anshul on Slack and can turn it off
    + currently don't have linting for html, is an option though
    + rules/support: eslint for js and stylelint for css
  + *Testing*
    + exploratory coding this weekend - basic timer app
    + testing library: jest
    + run `npm test`
    + write tests before starting code
    + unlike HTML, to test JS, run `npm start` first to start up a local server 
  + *Getting stuff to main*
    + only pull requests, disabled push
    + have 2 people review code first
    + squash and merge: commits will get squashed into branch name, one merge into main, and then branch will be deleted
      + cleaner to have merge numbers instead of looking through commit history
      + good practice to delete branches

+ Finalizing design, going through sketches
  + Dan
    + timer in upper left
    + hide timer between start button
    + up next on right is most relevant, tasklisk is everything but less relevant
  + Ryan
    + component-focused
    + circles at the top of current task lisk and change color based on part of pomo cycle
      + instead of changing background
    + stats: completed out of total
    + feature to extend pomo number for a task
  + Kewen
    + have a running circle/visual/proportional component of time
      + easy to implement
    + broken session Y and N buttons and box to submit distraction reason
    + checked off tasks in list - leave, gray out, remove completely?
      + don't want user to have to scroll through 100 tasks
      + automatic scrolling (`window.scrollBy`)
      + starts green (growing) and then turns red as session completes (ripe tomato)
  + Michael
    + report a distraction button 
    + other icons for settings (gear), FAQ (?)
    + less words, maybe hover over button to show what it does
  + Ravi
    + 3 buttons at top right for ?, settings, stats
    + combine task list and "what's next"?
    + morph start button into end session button - simplification
    + task list will include number of pomos per task
  + Anastasiia
    + "scroll bar" under the time to emulate real pomodoro timer
      + drag to 25 min mark and let 
    + be able to hide both tasks and stats
      + sticky note style, hover over icon to show full box
  + Kyeling
    + tomato emojis on tasklist might be distraction
    + what to do with stats and FAQ pages
      + link to other pages?
      + scroll/link to bottom of page + back to top button
      + pop-up window cleaner?
      + sticky note style if hover over
      + second-pass idea: first-time user tutorial, guiding arrows
  + Nick
    + circles to represent total pomos, progress in the day
    + re-emphasis of previous designs

+ Design features consensus:
  + FAQ, scroll down for now
  + End day button
  + to do list
    + check marks and strikethrough
    + indicate current task/next task
    + scroll to keep current task at top
    + fraction to indicate pomos
  + broken sessions button
    + click on one button, then click on classification
  + timer above todo list
  + *For later:*
    + settings
    + stylized timer
    + edit/delete tasks
    + hide todo list
    + hover for stats/FAQ
    + Interactive help
    + progress meters
    
**Anything on the agenda that was not discussed:**  None


## Concluding notes:

**Decisions made:** 

**When the meeting finished:** 9:12 pm
