const date = new Date();
const renderCalendar = () => {
    date.setDate(1);
const monthDays = document.querySelector('.days');
const lastDay = new Date(date.getFullYear(), date.getMonth()+1,0).getDate();
const prevLastDay = new Date(date.getFullYear(), date.getMonth(),0).getDate();
const firstDayIndex = date.getDay();
const lastDayIndex = new Date(date.getFullYear(),date.getMonth()+1,0).getDay();
const nextDays = 7 - lastDayIndex -1;
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
document.querySelector(".date h1").innerHTML = months[date.getMonth()];

document.querySelector(".date p").innerHTML = new Date().toDateString();

let days = "";
for(let x = firstDayIndex; x>0; x--){
    days += `<div class="prev-date">${prevLastDay - x+1}</div>`;
}
for(let i = 1; i<=lastDay; i++){
    if(i === new Date().getDate() && date.getMonth() === new Date().getMonth()){
        days += `<div class="today">${i}</div>`;
    } else{
    days += `<div class="day">${i}</div>`;
    }
}
for(let j = 1; j<=nextDays; j++){
    days += `<div class="next-date">${j}</div>`;
    monthDays.innerHTML = days;
}

}

document.querySelector('.prev').addEventListener('click', ()=>{
    date.setMonth(date.getMonth()- 1)
    renderCalendar();
});
document.querySelector('.next').addEventListener('click', ()=>{
    date.setMonth(date.getMonth()+ 1)
    renderCalendar();
});

document.querySelectorAll('#calendar .days').forEach(d =>{
    d.addEventListener("click", event =>{
        let classes = [...event.target.classList]
        if (classes.includes('day')) {
            event.target.classList.toggle("selected");
        } else return
    })
})
    
renderCalendar();

let addToDoButton = document.getElementById('addToDo');
let toDoContainer = document.getElementById('toDoContainer');
let inputField = document.getElementById('inputField');
let selected = document.getElementsByClassName('selected')

addToDoButton.addEventListener('click', function(){
    var paragraph = document.createElement('input');
    paragraph.value = "";
    paragraph.setAttribute('readonly', true);
    paragraph.setAttribute('id', 'task');
    var edit = document.createElement('button');
    var deleted = document.createElement('button');
    edit.innerText = "Edit";
    deleted.innerText = "Delete";
    var space = document.createElement('p')
    space.innerText = ' ';
    var count = document.createElement('div');
    const selected = document.getElementsByClassName('selected');
    const se = parseInt(selected.innerText)
    const today = document.getElementsByClassName('today');
    const to = parseInt(today.innerText)
    count.innerText = (se-to);
    console.log(count)
    count.innerText = new Date().getTime();
    paragraph.value = inputField.value;
    //toDoContainer.appendChild(count)
    toDoContainer.appendChild(paragraph);
    toDoContainer.appendChild(edit);
    toDoContainer.appendChild(deleted);
    toDoContainer.appendChild(space);
    inputField.value = "";
    paragraph.addEventListener('click', list =>{
        list.target.classList.toggle("line");
    })
    deleted.addEventListener('click', function(){
        toDoContainer.removeChild(paragraph);
        toDoContainer.removeChild(edit);
        toDoContainer.removeChild(deleted);  // 
    })

    /* edit is the button that removes the read only
    attribute, when you double click on the edit button, 

    */
    edit.addEventListener('click', function(){
        paragraph.removeAttribute('readonly');
        edit.innerText = "Save";
        edit.addEventListener('dblclick', function(){
            if (!paragraph.value ){  // 
                alert("Please enter task or press delete.");
                 alert=function() {};
               } else {
            paragraph.setAttribute('readonly', true);
            edit.innerText = "Edit";
            return 0;
        }
        })
    })
   if (!paragraph.value){
    alert("Betta add some shit, niggaCan't leave text empty");
    toDoContainer.removeChild(paragraph);
    toDoContainer.removeChild(edit);
    toDoContainer.removeChild(deleted);
    toDoContainer.removeChild(space);
   }

})
