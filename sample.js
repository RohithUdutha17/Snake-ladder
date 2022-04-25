
var snakes={17:9,54:34,62:19,64:60,87:24,93:73,95:75,99:78};
var ladder={4:14,9:31,20:38,28:84,40:59,51:67,63:81,71:91};
var curr = [0,0,0,0]
var colors = []
var n,x;
var player = 0;

window.onload = () => {
    var table = document.getElementById("tab");
    var count=100;
    for (var i = 0; i < 10; i++){
        var tr = document.createElement('tr'); 
        if(i%2){
            count-=9;
        }  
        else if(i!=0){
            count-=11;
        }
        for(let j=0;j<10;j++){
            var td = document.createElement('td');
            td.setAttribute("id",String(count));
            var text = document.createTextNode(count);
            if(i%2){
                count++;
            }
            else{
                count--;
            }
            td.appendChild(text);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    for(var i in snakes)    //Snakes marking
    {
        document.getElementById(i).style.backgroundColor="#ff6347";
    }
    for(var i in ladder)    //ladders marking
    {
        document.getElementById(i).style.backgroundColor="lightgreen";
    }
    for(let i in ladder){   //display ladder's start and end
        document.getElementById("ladders").innerHTML += `${i} -> ${ladder[i]} <br>`
    }
    for(let i in snakes){   //display snakes's head and tail
        document.getElementById("snakes").innerHTML += `${i} -> ${snakes[i]} <br>`
    }
    colors  =  JSON.parse(localStorage.getItem("colors"));
    n = colors.length;
}

function start(){
    for(let i=0;i<n;i++){
        if(curr[i]!=0){
        let m=document.getElementById(curr[i]);
        m.style.backgroundColor="white";
        }
    }
    curr=[0,0,0,0];
    player = 0;
    document.getElementById('body1').style.backgroundImage = "";
    document.getElementById("dice").disabled = false;
    document.getElementById("rand").innerHTML = "Dice not rolled yet";
    document.getElementById("player").innerHTML = "1 player turn";
    document.getElementById("res").innerHTML = "Game not started yet";
    document.getElementById("winner").innerHTML="";
}

function findEqual(index){
    for(let i=0;i<n-1;i++){
        for(let j=i+1;j<n;j++){
            if(curr[i]==curr[j] && curr[j]!=0){
                if(index.indexOf(i)==-1){
                    index.push(i)
                }
                if(index.indexOf(j)==-1){
                    index.push(j)
                }
            }
        }
    }
    return index;
}

function applycolor(){
    let count=1;
    let index = findEqual([])
    for(let i=0;i<index.length;i++){
        if(player==index[i]){
            count++;
            break;
        }
    }
    let y=document.getElementById(curr[player]);
    console.log(y,curr[player]);
    if(count==1){
        y.style.background = colors[player];
    }
    else if(index.length==2){
        y.style.background = `linear-gradient(to right,${colors[index[0]]} 0%,${colors[index[0]]} 50%,${colors[index[1]]} 50%,${colors[index[1]]} 100%)`
    }
    else if(index.length==3){
       y.style.background = `linear-gradient(to right,${colors[index[0]]} 0%,${colors[index[0]]} 33%,${colors[index[1]]} 33%,${colors[index[1]]} 66%,${colors[index[2]]} 66%,${colors[index[2]]} 100%)`
    }
    else{
        y.style.background = `linear-gradient(to right,${colors[index[0]]} 0%,${colors[index[0]]} 25%,${colors[index[1]]} 25%,${colors[index[1]]} 50%,${colors[index[2]]} 50%,${colors[index[2]]} 75%,${colors[index[3]]} 75%,${colors[index[3]]} 100%)`
    }
}

function modifycolor(n,player){
    let count=1;
    let index =findEqual([])
    for(let i=0;i<index.length;i++){
        if(index[i]==player){
            count--;
            index = index.filter(e=>e!=player);
            break;
        }
    }
    let y=document.getElementById(curr[player]);
    if(count==1){
        y.style.background = "white";
    }
    else if(index.length==1){
        y.style.background = `${colors[index[0]]}`
    }
    else if(index.length==2){
       y.style.background = `linear-gradient(to right,${colors[index[0]]} 0%,${colors[index[0]]} 50%,${colors[index[1]]} 50%,${colors[index[1]]} 100%)`
    }
    else{
        y.style.background = `linear-gradient(to right,${colors[index[0]]} 0%,${colors[index[0]]} 33%,${colors[index[1]]} 33%,${colors[index[1]]} 66%,${colors[index[2]]} 66%,${colors[index[2]]} 100%)`
    }
}

function random()
{
    document.getElementById("dice").disabled = "true";
    document.getElementById('audio').play();
    document.getElementById("res").innerHTML="";        
    if(curr[player]!=0)
    {
        modifycolor(n,player);   
    }
    document.getElementById("audio").currentTime = 0;
    document.getElementById('rand').style.animation = "spindice 1s";
    
    setTimeout(()=>{
         x=Math.floor(Math.random()*6)+1;           
        if(x==1){
            document.getElementById("rand").src = "./1.jpg";
        }
        else if(x==2){
            document.getElementById("rand").src = "./2.jpg";
        }
        else if(x==3){
            document.getElementById("rand").src = "./3.jpg";
        }
        else if(x==4){
            document.getElementById("rand").src = "./4.jpg";
        }
        else if(x==5){
            document.getElementById("rand").src = "./5.jpg";
        }
        else{
            document.getElementById("rand").src = "./6.jpg";
        }

    },50)


    setTimeout(()=>{
        document.getElementById('rand').style.animation = "none";
    },100)

    setTimeout(()=>{
        if(curr[player]+x<100)
        {
            curr[player]+=x;

            for(let i in snakes)
            {
                if(curr[player]==i){
                    curr[player]=snakes[i];
                    document.getElementById("res").innerHTML=`${colors[player]} Caught by snake,`;        
                    break;
                }
            }
            for(let i in ladder)
            {
                if(curr[player]==i){
                    curr[player]=ladder[i];
                    document.getElementById("res").innerHTML=`${colors[player]} Climbed the ladder,`;
                    break;
                }
            }
            let y=document.getElementById(curr[player]);     
            applycolor(n,player)
            document.getElementById("dice").disabled = false;
        }

        else if(curr[player]+x==100)
        {
            curr[player]+=x;
            let y=document.getElementById(curr[player]);
            y.style.backgroundColor=colors[player];
            document.getElementById("res").innerHTML=`${colors[player]} Won The Game`;
            document.getElementById('body1').style.backgroundImage = "url(pop.gif)";
            document.getElementById('winner').innerHTML = `${colors[player]} won the game`;
            document.getElementById('winner').style.color = `${colors[player]}`
            let r = document.getElementById("dialog");
            r.style.backgroundColor = `${colors[player]}`
            r.innerHTML = `${colors[player]} won the game`;
            r.show()
            setTimeout(()=>{
                r.close();
            },5000)         
        }    
        else
        {
            if(curr[player]!=100){
            document.getElementById("res").innerHTML=`${colors[player]} is exceeding the range`;
            applycolor(n,player)
            }
            document.getElementById("dice").disabled = false;
        }
        if(x!=6){
            player = (player+1)%n;
            }
            document.getElementById("player").innerHTML = `${player+1} player turn`;      
            
    },200)
   
 }
