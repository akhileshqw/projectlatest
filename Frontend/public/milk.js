let bm=document.getElementById("bm")
let buff=document.getElementById("buff")
let cow=document.getElementById("cow")
let cnt=0
buff.setAttribute("style","visibility:hidden")
bm.onclick=function(){
    cow.setAttribute("style","visibility:hidden")
    cm.style.border="";
    t=0
    if (cnt%2==0){
        bm.style.border="2px solid blue";
    buff.setAttribute("style","visibility:visible")
    }else{
        bm.style.border="";
    buff.setAttribute("style","visibility:hidden")

    }
    cnt=cnt+1
}

let cm=document.getElementById("cm")
let t=0
cow.setAttribute("style","visibility:hidden")

cm.onclick=function(){
    buff.setAttribute("style","visibility:hidden")
    bm.style.border="";
    cnt=0
    if (t%2==0){
        cm.style.border="2px solid blue";
        cow.setAttribute("style","visibility:visible")
        }else{
            cm.style.border="";
        cow.setAttribute("style","visibility:hidden")
    
        }
        t=t+1
}