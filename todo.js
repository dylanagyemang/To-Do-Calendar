const date = new Date();
var dleft = document.createElement('input');
dleft.setAttribute('readonly', true)
dleft.setAttribute('class','days-left')
dleft.value = 0;
var mleft = document.createElement('input');
mleft.setAttribute('readonly', true)
mleft.setAttribute('class','next-days-left');
const renderCalendar = () => {
    date.setDate(1);
const monthDays = document.querySelector('.days');
const lastDay = new Date(date.getFullYear(), date.getMonth()+1,0).getDate(); 
//gives last day of current month by adding one to make it next month and setting the day to 0 which gives the last day of previous month
const prevLastDay = new Date(date.getFullYear(), date.getMonth(),0).getDate();
const firstDayIndex = date.getDay();
const lastDayIndex = new Date(date.getFullYear(),date.getMonth()+1,0).getDay();
const nextDays = 7 - lastDayIndex -1; //give number of days to display form the next month lastDayIndex is 0 base so we must subtract 1
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
/*printing the proper number of days from previous month by counting down from the first day of the month
and subtracting it from the last day of the previous month, I'll need to add one because days are counted in base 0 */
for(let x = firstDayIndex; x>0; x--){
    days += `<div class="prev-date">${prevLastDay - x+1}</div>`;
}
//date was set to the 1st because it's easier to iterate through the days of the month from the beginning
for(let i = 1; i<=lastDay; i++){
    /* to get today's date i needs to be equal to today's date and it must be the current month 
    otherwise all days with the same number will be highlighted in every other month as well */
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
//adding the feature to select specific days of the month
document.querySelectorAll('#calendar .days').forEach(d =>{
    d.addEventListener("click", event =>{
        let classes = [...event.target.classList]
        //had to specify that class must include 'day' otherwise if you click between the days the entire month would be selected
        if (classes.includes('day') || classes.includes('prev-date') || classes.includes('next-date')) {
            event.target.classList.toggle("selected");
            const f = new Date();
            if ((date.getMonth() === f.getMonth()) && (classes.includes('day')) && (event.target.innerHTML>f.getDate())){
                const inn = event.target.innerHTML-f.getDate();
                dleft.value = inn;
            }
            if ((date.getMonth() > f.getMonth()) && (classes.includes('day'))){
                var mind = date.getMonth()- f.getMonth();
                let x=0;
                const inn = event.target.innerHTML-f.getDate();
                do {
                    var g = new Date(f.getFullYear(), f.getMonth()+mind,0).getDate()
                    
                    mleft.value = inn;
                    x=x+g;
                    mind--
                    
                }
                while(mind>0)mleft.value = x+inn;
                console.log(mleft.value)
            }
        } else return
    })
})
    
renderCalendar();

let addToDoButton = document.getElementById('addToDo');
let toDoContainer = document.getElementById('toDoContainer');
let inputField = document.getElementById('inputField');

addToDoButton.addEventListener('click', function(){
    var paragraph = document.createElement('input');
    paragraph.value = "";
    paragraph.setAttribute('readonly', true);
    paragraph.setAttribute('id', 'task');
    paragraph.setAttribute('class', 'outputField');
    var edit = document.createElement('button');
    edit.setAttribute('class', 'btn btn-primary btn-large');
    var deleted = document.createElement('button');
    deleted.setAttribute('class', 'btn btn-dark btn-primary btn-large');
    edit.innerText = "Edit";
    deleted.innerText = "Delete";
    var space = document.createElement('br')
    //space.innerText = ' ';
    var count = document.createElement('input');
    count.setAttribute('readonly', true);
    count.setAttribute('id','count');
    function currentTime() {
        let date = new Date(); 
        let hh = date.getHours();
        let mm = date.getMinutes();
        let ss = date.getSeconds();
        let dd = dleft.value;
        let md = mleft.value;
    let t = setTimeout(function(){ currentTime() }, 1000);
    const indf = dd+md;
    if (md>0){
        dd=0;
        count.value = md+'d '+(24 - hh)+'h '+(60-mm)+'m '+ (60-ss)+'s';
    }
    const dat = (24 - hh)+'h '+(60-mm)+'m '+ (60-ss)+'s';
    const dal = indf+'d '+(24 - hh)+'h '+(60-mm)+'m '+ (60-ss)+'s';
    
    //count.value = dal;
    }
    let date = new Date(); 
        let hh = date.getHours();
        let mm = date.getMinutes();
        let ss = date.getSeconds();
        let dd = dleft.value + mleft.value;
    function timestamp(){
        let sec = 59-ss;
        let minute = 59-mm;
        let hours = 23-hh
        let stamp = dd+'d '+hours+'h '+minute+'m '+sec+'s';
        
        if (sec==0){
            minute--
            sec--
            sec = 59;

        } if(minute == 0){
            hours--
            sec--
            minute=59
        } if(hours==0){
            dd--;
            sec--
            if(dd>0){
                hours=23;
            }
        }
       /* if (mleft.value>0){
            count.value = mleft.value+'d '+hours+'h '+minute+'m '+sec+'s';
        } */else if(sec==0 && minute==0 && hours==0 && dd==0){
            count.value = "Time up!";
        }
        count.value = stamp;
        setTimeout(function(){sec()}, 1000);
        console.log(sec);
    }
    
    timestamp()
    //setInterval(function () { currentTime() },1000);
    paragraph.value = inputField.value;
    toDoContainer.appendChild(count)
    toDoContainer.appendChild(paragraph);
    toDoContainer.appendChild(edit);
    toDoContainer.appendChild(deleted);
    toDoContainer.appendChild(space);
    inputField.value = "";
    paragraph.addEventListener('click', list =>{
        if (list.target.hasAttribute('readonly', true)){
            list.target.classList.toggle("line");
        } else return
    })
    deleted.addEventListener('click', function(){
        toDoContainer.removeChild(count)
        toDoContainer.removeChild(paragraph);
        toDoContainer.removeChild(edit);
        toDoContainer.removeChild(deleted);
        toDoContainer.removeChild(space);  
    })
    /* current issue: having the save button require one click, adding alert function without it repeating
    currently have to clear the alert function after it's used but if alert is required later it will be cleared */
    //fixed by using elif instead of if
    edit.addEventListener('click', function(){
        if (paragraph.getAttribute('readonly') == 'true') {
            paragraph.removeAttribute('readonly');
            edit.innerText = "Save";
            }
           else if (!paragraph.value){
             toDoContainer.removeChild(count)
             toDoContainer.removeChild(paragraph);
             toDoContainer.removeChild(edit);
             toDoContainer.removeChild(deleted);
             toDoContainer.removeChild(space);
         } 
            else if (!paragraph.hasAttribute('readonly')){
                paragraph.setAttribute('readonly','true');
                edit.innerText = "Edit";
        }
    })
   if (!paragraph.value){
    alert("Can't leave task empty.");
    toDoContainer.removeChild(count)
    toDoContainer.removeChild(paragraph);
    toDoContainer.removeChild(edit);
    toDoContainer.removeChild(deleted);
    toDoContainer.removeChild(space);
   }

})
