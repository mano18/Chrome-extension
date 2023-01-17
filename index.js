

let myLeads=[]
let inputEl=document.getElementById('input-el')
const ulEl=document.getElementById('ul-el')
let inputBtn=document.getElementById('input-btn')
let tabBtn=document.getElementById('tab-btn')
// Get the leads from the localStorage - PS: JSON.parse()
// Store it in a variable, leadsFromLocalStorage
// Log out the variable
const deleteBtn=document.getElementById('delete-btn')
let leadsFromLocalStorage=JSON.parse(localStorage.getItem("myLeads"))

if(leadsFromLocalStorage){
    myLeads=leadsFromLocalStorage
    render(myLeads)
}


tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})


//Listen for double clicks on the delete button
// 3. When clicked, clear localStorage, myLeads, and the DOM

deleteBtn.addEventListener('dblclick',function()
{
    localStorage.clear()
    myLeads=[]
    render(myLeads)
})


inputBtn.addEventListener('click',function(){
    //console.log('Button clicked!')
    myLeads.push(inputEl.value)
    inputEl.value=''
    // Save the myLeads array to localStorage 
    // PS: remember JSON.stringify()
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads)
    //console.log(myLeads)
})


function render(leads){
let listItems=""
for(let i=0;i<leads.length;i++){
     
   // listItems += "<li><a target='_blank' href='" + leads[i] + "'>" + myLeads[i] + "</a></li>"
   
   // template strings which is the other way write the above code with `` & ${}
   listItems += `
   <li>
        <a target='_blank' href='${ leads[i]}'> 
            ${leads[i]} 
        </a>
   </li>
   `
}
 ulEl.innerHTML=listItems
}