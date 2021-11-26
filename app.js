class Figure{
    constructor(name,url) {
        this.name = name;
        this.url = url;
        this.opened = false;
    }
}
const entry_main_html = `
<div class="container_entry">
    <div class="logo">
        <object data="./resources/images/logo.svg"></object>
    </div>
    <div class="navigation_buttons">
        <button id="view_high_score">VIEW HIGH SCORE</button>
        <button id="new_game" onclick="generate_new_game()">NEW GAME</button>
    </div>
</div>
`;

const entry_website = () =>
{
    document.getElementsByClassName("attempts")[0].classList.add("hidden");
    document.getElementById("main").innerHTML = entry_main_html;
    
}

const generate_container = () =>
{
    let cards = ``;
    for(let i = 0;i < 16 ; i++)
    {
       cards += `<div class="card background" id="card${i}" onclick="click_item(${i})"></div>`
    }



    return `
                <div class="container_new_game">
                    <div id="cards">
                         ${cards}
                    </div>
                    <div id="buttons">
                        <button id="entry" onclick="entry_website()">MENU</button>
                        <button id="new_game" onclick="generate_new_game()">RESTART</button>
                    </div>
                </div>`;
};

const generate_new_game = () =>
{
    attempts = 0;
    document.getElementsByClassName("attempts")[0].innerHTML = `Total attempts : ${attempts}`;

    document.getElementsByClassName("attempts")[0].classList.remove("hidden");
    let main  = document.getElementById("main");
    main.innerHTML = generate_container();
    array_elements_to_pick = [...getRandomArray(),...getRandomArray()];
    opened = [];
    discovered_elements = [];
}

const containsNot = (number,array)=> 
{ 
    for(let i=0;i<array.length;i++){
        if(array[i]==number)return false;
    }
return true;
}

const getRandomArbitrary =() =>
 {
return parseInt(Math.random() * (8 - 0) + 0); 
}

const getRandomArray = () =>
{
    let array = [];
for(let i=0;i<8;i++){
    let j = getRandomArbitrary();
    while(!containsNot(j,array)){
        j = getRandomArbitrary();
        console.log("s");
    }
    array[i] = j; 
}
return array;
}

function click_item(arg)
{
    if(!containsNot(arg,discovered_elements))
    {   
        return;
    }

    audioCheck.play();

    if(opened.length ==2 )
    {
        document.getElementById(`card${opened[0]}`).classList.add('background');
        document.getElementById(`card${opened[1]}`).classList.add('background');
        document.getElementById(`card${opened[0]}`).classList.remove('showImage');
        document.getElementById(`card${opened[1]}`).classList.remove('showImage');
        document.getElementById(`card${opened[0]}`).style.backgroundImage = backgroundImage;
        document.getElementById(`card${opened[1]}`).style.backgroundImage = backgroundImage;
        opened = [];
    }

    
    if(opened.length == 1)
    {
        attempts++;
        document.getElementsByClassName("attempts")[0].innerHTML = `Total attempts : ${attempts}`;
        document.getElementById(`card${arg}`).classList.remove('background');
        document.getElementById(`card${arg}`).classList.add('showImage');
        document.getElementById(`card${arg}`).style.backgroundImage =figures[array_elements_to_pick[arg]].url;
        opened[1] = arg;
        

        if(array_elements_to_pick[opened[0]] == array_elements_to_pick[opened[1]]){
            audioTrue.play();
            console.log(array_elements_to_pick[opened[0]] +" - "+ array_elements_to_pick[opened[1]])
            discovered_elements[discovered_elements.length] = arg ;
            discovered_elements[discovered_elements.length] = opened[0] ;
            opened = [];
            if(discovered_elements.length==16)
            {
                audioWin.play(); 
                window.alert(`You have won the game with total ${attempts} attempts`);
            }
            return;
        }

        

        
    }

    else if (opened.length == 0)
    {
        opened[0]  = arg;
        document.getElementById(`card${arg}`).classList.remove('background');
        document.getElementById(`card${arg}`).classList.add('showImage');  
        document.getElementById(`card${arg}`).style.backgroundImage = figures[array_elements_to_pick[arg]].url; 
    }

}

entry_website();
attempts=0;
var opened = [];
var array_elements_to_pick = [];
var discovered_elements = [];
const backgroundImage =  "url(./resources/images/brain.png)"; 
var audioWin =  new Audio("./resources/sound/win.mp3");
var audioTrue = new Audio("./resources/sound/true.mp3");
var audioCheck = new Audio("./resources/sound/check1.mp3");
let figures_name = ["bookmark" , "eyeglasses" , "headphone" , "image" , "memory-card" , "phone" , "screen" , "watch"];
let figures = [];
for(let i = 0; i< 8;i++)
{
    figures[i] = new Figure(figures_name[i],`url(./resources/images/${figures_name[i]}.png)`);
}





