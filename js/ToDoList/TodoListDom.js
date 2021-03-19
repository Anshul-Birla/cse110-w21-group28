import{ToDoList}from"./ToDoList.js";import{HTMLAttributes,TaskStorage}from"./TodoListDomVariables.js";class TodoListDom{constructor(t,s,e,a,o){this.todoList=new ToDoList,this.form=s,this.submitBtn=e,this.deleteAllBtn=a,this.table=t,this.currentTask=null,this.currentTaskDiv=o,this.setupEventListeners(),this.renderLocalStorage()}renderLocalStorage(){window.localData=[];const t=[];if(null!==localStorage.getItem("tasks")){window.localData=JSON.parse(localStorage.getItem("tasks"));for(let t=0;t<window.localData.length;t+=1)window.localData[t][0]=String(t);localStorage.setItem("tasks",JSON.stringify(window.localData))}for(let s=0;s<window.localData.length;s+=1){const e=window.localData[s][TaskStorage.checkedIndex];if(e)t.push(s);else{const t=window.localData[s][TaskStorage.nameIndex],a=window.localData[s][TaskStorage.totalSessionIndex],o=window.localData[s][TaskStorage.currentSessionIndex],n=this.todoList.addTask(t,a,o,e,!0);this.displayTask(n)}}for(let s=0;s<t.length;s+=1){const e=t[s],a=window.localData[e][TaskStorage.nameIndex],o=window.localData[e][TaskStorage.totalSessionIndex],n=window.localData[e][TaskStorage.currentSessionIndex],i=window.localData[e][TaskStorage.checkedIndex],l=this.todoList.addTask(a,o,n,i,!0);l.addEventListener("task-checked-off",(()=>{const t=new CustomEvent("task-checked-off",{});this.todoList.dispatchEvent(t)})),l.addEventListener("task-unchecked",(()=>{const t=new CustomEvent("task-unchecked",{});this.todoList.dispatchEvent(t)})),this.displayTask(l)}this.updateCurrentTask()}setupEventListeners(){this.form.addEventListener("submit",(t=>{t.preventDefault();const s=new FormData(this.form),e=s.get(HTMLAttributes.taskNameId),a=parseInt(s.get(HTMLAttributes.taskPomoSessions),10);try{const t=this.todoList.addTask(e,a);this.updateCurrentTask();const s=this.getFirstCompletedTaskIndex();this.displayTask(t,s),this.form.reset()}catch(t){alert("Invalid input. Please try again"),console.log(t)}})),this.deleteAllBtn.addEventListener("click",(()=>{const t=this.todoList.taskList;for(;void 0!==t[0];)t[0].deleteButton.click()}))}displayTask(t,s=-1){-1===s?this.table.appendChild(t):this.table.insertBefore(t,this.table.childNodes[s])}onSessionComplete(){const t=this.todoList.getCurrentTask();null!=t&&t.incrementSession(),this.currentTask=t}onCompletedTask(){const t=this.currentTask;t.onDelete(),this.displayTask(t),this.todoList.addTaskToEnd(t)}getFirstCompletedTaskIndex(){let t=-1;for(let s=2;s<this.table.childNodes.length&&-1===t;s+=1)!0===this.table.childNodes[s].checked&&(t=s);return t}onUncheckedTask(t){const s=this.todoList.getTaskById(t),e=this.getFirstCompletedTaskIndex();s.onDelete(),this.todoList.addTaskToEnd(s),this.displayTask(s,e)}updateCurrentTask(){const t=this.todoList.getCurrentTask();null===this.currentTask||this.currentTask.checked||(this.currentTask.children[3].children[0].children[1].children[1].style.display="inline-block"),null!==t&&(t.children[3].children[0].children[1].children[1].style.display="none"),null===this.currentTask&&null===t?this.currentTaskDiv.textContent="No current task":null===this.currentTask&&null!==t?this.currentTaskDiv.textContent=`Working on: ${t.name}`:null!==this.currentTask&&null===t?this.currentTaskDiv.textContent="No current task":this.currentTask!==t&&(this.currentTaskDiv.textContent=`Working on: ${t.name}`),this.currentTask=t,null!=this.currentTask&&(this.currentTask.checkBox.disabled=!1)}onFocusTask(t){const s=this.table.childNodes;let e=-1;for(let t=2;t<s.length;t+=1)!1===s[t].checked&&-1===e&&(e=t);const a=this.todoList.getTaskById(t);a.onDelete(),this.currentTask.checkBox.disabled=!0,this.displayTask(a,e),this.todoList.addTaskToTop(a)}}export{TodoListDom};
