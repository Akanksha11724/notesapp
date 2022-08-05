//objectCreated= will store all the created elements
//deletedKeys= will store the id of objects in the objectedCreated that get deleted from there
//keepObjects= will store the id of objects that are in objectCreated except the indexes in deletedKeys
//displayObjects= will create divs for all the objects that are in keepObjects will accept id correponding to the objects in objectCreated  

function validate()
{
    if(document.getElementById("title").value==="")
    {
        alert("Title is required To add your note");
        return -1;
    }
    
}

function checkStorage()
{
    if(typeof(Storage)!=="undefined")
    {
        console.log("Storage is available");
        return 1;
    }
    else{
        console.log("Not available");
        return -1;
    }
}
var objectCreated=[];
var deletedKEys=[];
var keepObjects=[];

function store()
{
    
    let validation=validate();
    let locStorage=checkStorage();
    if(validation==(-1)||locStorage==(-1))
    {
        alert("failed");
        return;
    }
    else
    {
        let date=new Date();
        if(localStorage.length==0)
        {
            onbuttons();
            objectCreated[0]=[
            0,
            document.getElementById("title").value,
            document.getElementById("notes").value,
            (date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds())
            ]
            localStorage.setItem("objectCreated",JSON.stringify(objectCreated));
            create(0,1);
        }
        else
        {
           
            objectCreated.push([
            JSON.parse(localStorage.getItem("objectCreated"))[JSON.parse(localStorage.getItem("objectCreated")).length-1][0]+1,
            document.getElementById("title").value,
            document.getElementById("notes").value,
            (date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds())
            ])
            localStorage.setItem("objectCreated",JSON.stringify(objectCreated));
            create(JSON.parse(localStorage.getItem("objectCreated"))[JSON.parse(localStorage.getItem("objectCreated")).length-1][0],1)
        }
        document.getElementById("title").value="";
        document.getElementById("notes").value="";
        document.getElementById("default1").innerHTML=""; 
    }
   
}
function onbuttons()
{
document.getElementById("input").style.visibility="visible";
document.getElementById("goall").style.visibility="visible";
document.getElementById("showall").style.visibility="visible";
document.getElementById("search").style.visibility="visible";
document.getElementById("arch").style.visibility="visible";
document.getElementById("backup").style.visibility="visible";
}
function keep()
{
    let objarr=JSON.parse(localStorage.getItem("objectCreated"));
    let objarrid=[];
    let delarr=[]
    if(JSON.parse(localStorage.getItem("deletedKeys"))!=null)
    {
        let delsize=JSON.parse(localStorage.getItem("deletedKeys")).length;
        for(let i=0;i<delsize;i++)
        {
            delarr.push(parseInt(JSON.parse(localStorage.getItem("deletedKeys"))[i]))
        }
    }
    for(let i=0;i<JSON.parse(localStorage.getItem("objectCreated")).length;i++)
    {
    
        if(delarr.some(e=>e===parseInt(objarr[i][0])))
        {
           
        }
        else{
            objarrid.push(i);
            localStorage.setItem("keepObjects",objarrid);
        }
    }
    
}
function create(i,area)
{
   // alert("in create");
    //alert(i)
    let newdiv=document.createElement("div");
        if(area==1)
        {
            document.getElementById("adding").append(newdiv);
        }
        if(area==2)
        {
            document.getElementById("addarch").append(newdiv);
        }
        newdiv.setAttribute("id",i);
        let arr=JSON.parse(localStorage.getItem("objectCreated"))[i];
       // alert(arr.length);
        newdiv.style.backgroundColor="black";
        newdiv.style.color="white";
        newdiv.style.width="300px";
        newdiv.style.height="150px";
        newdiv.style.marginLeft="100px";
        newdiv.style.marginTop="10px";
        newdiv.style.border="2px solid black";
        newdiv.style.borderRadius="16px";
        newdiv.style.position="relative";            
        newdiv.style.overflow="scroll";
        newdiv.innerHTML=`
        <input type="checkbox"  id="check${i}" style="visibility:hidden; float:right; margin-top:4px; margin-right:3px;">
        <h3 id="tit">${arr[1]}</h3>
        <h4 id="not">${arr[2]}</h4>
        <h6 id="dat">${arr[3]}</h6>
        <button id="edit">Edit</button>
        <button id="archieve">Archieve</button>
        <button id="delete">Delete</button>`;
}
window.onload=function()
{
    localStorage.clear();
}
function handleClick(me,e)
{

    if(e.srcElement.id=="delete")
    {
        
     //   alert("deletekey "+e.target.parentElement.id);
        deletedKeys.push(e.target.parentElement.id);
        e.target.parentElement.remove();
        localStorage.setItem("deletedKeys",JSON.stringify(deletedKeys));
      //  document.getElementById("adding").innerHTML="";
        keep();
        
    }
    if(event.srcElement.id=="edit")
    {
        editbutton(me,e);
    }
    if(event.srcElement.id=="archieve")
    {
        archievebutton();
    }
} 

var archieve=[];
function archievebutton()
{
   
    document.getElementById("default2").innerHTML="";
    archieve.push(event.target.parentElement.id);
    localStorage.setItem("archieve",JSON.stringify(archieve));
    event.target.parentElement.remove();
    

}
function myArch()
{
    if(JSON.parse(localStorage.getItem("archieve"))==null)
    {
        alert("Nothing there in Archieve");
        return;
    }
    else{
        for(let i=0;i<JSON.parse(localStorage.getItem("archieve")).length;i++)
        {
            create(JSON.parse(localStorage.getItem("archieve"))[i],2);
        }
    }
}

function showall()
{

    document.getElementById("addarch").innerHTML="";
    var bodyarr=[];
    let delarr=[];
    document.getElementById("adding").innerHTML="";
    if(JSON.parse(localStorage.getItem("deletedKeys"))!=null)
    {
        for(let i=0;i<JSON.parse(localStorage.getItem("deletedKeys")).length;i++)
        {
            delarr[i]=parseInt(JSON.parse(localStorage.getItem("deletedKeys"))[i]);
        }
    }
    if(JSON.parse(localStorage.getItem("objectCreated"))!=null)
    {
        for(let i=0;i<JSON.parse(localStorage.getItem("objectCreated")).length;i++)
        {
            bodyarr[i]=parseInt(JSON.parse(localStorage.getItem("objectCreated"))[i][0]);
        }
    }

    for(let i=0;i<JSON.parse(localStorage.getItem("objectCreated")).length;i++)
    {
        if(JSON.parse(localStorage.getItem("deletedKeys"))!=null)
        {
            if(delarr.some(e=>e===parseInt(bodyarr[i])))
            {
           
            }
            else{
                create(i,1);
            }
        }
        else{
            create(i,1)
        }
    }
}


function search()
{
    var flag=false;
    //alert("in search");
    let input=document.getElementById("input").value;
   // alert(input);
    for(let i=0;i<JSON.parse(localStorage.getItem("objectCreated")).length;i++)
    {
        let title=JSON.parse(localStorage.getItem("objectCreated"))[i][1];
        let op=input.localeCompare(title);
      //  alert(op);
        if(op==0)
        {
           // alert(title);]
            flag=true;
            let child=document.getElementById("adding").childNodes;
           // alert(child[i]);
            document.getElementById(i).scrollIntoView();
            document.getElementById(i).style.border="6px solid red"
        }
    }
    if(flag==false)
    {
        alert("not found");
    }
}

function deleteAll()
{
   document.getElementById("gosome").style.visibility="visible";
   
   let child=document.getElementById("adding").childNodes;
//  alert(child.length)
 //checkboxes
    for(let i=0;i<child.length-1;i++)
    {
        let str=document.getElementById(i).innerHTML;
        let newstr=str.replace(/hidden/,'visible');
      //  alert(newstr);
        document.getElementById(i).innerHTML=newstr;
    }

}
var deletedKeys=[]
function deleteSome()
{
    var flag=false;
    let confirmation=confirm("Do you Want to delete all the notes")
    if(confirmation)
    {
        var arr=[];
       let child=document.getElementById("adding").childNodes;
        for(let i=0;i<child.length-1;i++)
        {
       //     alert("i "+i+" "+child[i].firstChild.checked);
           if(document.getElementById("check"+i).checked)
            {
                flag=true;
                arr.push(i);
                deletedKeys.push(i);
                localStorage.setItem("deletedKeys",JSON.stringify(deletedKeys));
                //child[i-n].remove();
               // n++;
            }
        }
    }
    if(flag==false)
    {
        alert("You havent selected any notes")
    }
    if(flag==true)
    {
        let objarr=JSON.parse(localStorage.getItem("objectCreated"));
        let objarrid=[];
        let delarr=[]
        let delsize=JSON.parse(localStorage.getItem("deletedKeys")).length;
        for(let i=0;i<delsize;i++)
        {
            delarr.push(parseInt(JSON.parse(localStorage.getItem("deletedKeys"))[i]))
        }
           
        for(let i=0;i<JSON.parse(localStorage.getItem("objectCreated")).length;i++)
        {
            if(delarr.some(e=>e===parseInt(objarr[i][0])))
            {
           
            }
            else{
                objarrid.push(i);
                localStorage.setItem("keepObjects",JSON.stringify(objarrid));
            }
        }
        document.getElementById("adding").innerHTML="";
        for(let i=0;i<JSON.parse(localStorage.getItem("keepObjects")).length;i++)
        {
           // alert(parseInt(JSON.parse(localStorage.getItem("keepObjects"))[i]));
            create(parseInt(JSON.parse(localStorage.getItem("keepObjects"))[i]),1);
        }
       
    }
   
    
}

function backup()
{
    var combArr=[];
    document.getElementById("adding").innerHTML="";
    for(let i=0;i<JSON.parse(localStorage.getItem("keepObjects")).length;i++)
    {
        combArr.push(parseInt(JSON.parse(localStorage.getItem("keepObjects"))[i]));
    }
    for(let i=0;i<JSON.parse(localStorage.getItem("deletedKeys")).length;i++)
    {
        combArr.push(parseInt(JSON.parse(localStorage.getItem("deletedKeys"))[i]));
    }
    combArr.sort(function(a, b){return a- b});
   // alert(combArr);
   
    for(let i=0;i<combArr.length;i++)
    {
        create(combArr[i],1);
    }
}
var imp;
function editbutton(me,e)
{
    document.getElementById("save").style.visibility="visible";
    document.getElementById("save").style.backgroundColor="red";

    document.getElementById("title").value=JSON.parse(localStorage.getItem("objectCreated"))[e.target.parentElement.id][1];
    document.getElementById("notes").value=JSON.parse(localStorage.getItem("objectCreated"))[e.target.parentElement.id][2];
    imp=e.target.parentElement.id;
}
function savechanges()
{
    let str=document.getElementById(imp).innerHTML;
    let olddate=JSON.parse(localStorage.getItem("objectCreated"))[imp][3];
    let date=new Date();
 //   alert(str);
    let newstr=`
    <input type="checkbox"  id="check${imp}" style="visibility:hidden; float:right; margin-top:4px; margin-right:3px;">
    <h3 id="tit">${document.getElementById("title").value}</h3>
    <h4 id="not">${document.getElementById("notes").value}</h4>
    <h6 id="dat">${olddate}</h6>
    <h6 id="newDate">${date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()}</h6>
    <button id="edit">Edit</button>
    <button id="archieve">Archieve</button>
    <button id="delete">Delete</button>`;
    document.getElementById(imp).innerHTML=newstr;

    var existing=JSON.parse(localStorage.getItem("objectCreated"))[imp];
  //  existing=existing?JSON.parse(existing):{};
    var existARR=Array.from(existing);
    existARR[4]=(date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds());
    localStorage.setItem("objectCreated",JSON.stringify(existARR));
}