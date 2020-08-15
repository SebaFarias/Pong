const INDEX = {
    menu: 0,    
    mainMenu:{
        itself: 1,        
        continue: 2,
        restart:3,
        highscores:4,
        participate:5
    },  
    configMenu:{
        itself: 6,       
        backButton: 7,
        p1: 8,
        p1BotSelector: 9,
        p2: 10,
        p2BotSelector: 11,
        lessBalls: 12,
        balls: 13,
        moreBalls: 14,
        lessPoints: 15,
        winningPoints: 16,
        morePoints: 17,
        startButton: 18  
    }
}
const MENU = [
    document.querySelector("#menu"),
    document.querySelector("#main-menu"),
    document.querySelector('#continue'),
    document.querySelector('#restart'),
    document.querySelector('#highscores'),
    document.querySelector('#participate'),
    document.querySelector("#config-menu"),
    document.querySelector("#back"),
    document.querySelector("#p1"),
    document.querySelector("#player1-selector"),
    document.querySelector("#p2"),
    document.querySelector("#player2-selector"),
    document.querySelector("#lessBalls"),
    document.querySelector("#ballsQuantity"),
    document.querySelector("#moreBalls"),
    document.querySelector("#lessPoints"),
    document.querySelector("#winningPoints"),
    document.querySelector("#morePoints"),
    document.querySelector("#start") 
]


MENU[INDEX.menu].addEventListener('click',(event)=>{handleMenuClicks(event);})

function handleMenuClicks(event){
    let btn = event.target
    switch(btn){
        case MENU[INDEX.mainMenu.continue]:
            continueMatch()
            break
        case MENU[INDEX.mainMenu.restart]:
            configurationMenu()
            break
        case MENU[INDEX.configMenu.backButton]:
            mainMenu()
            break
        case MENU[INDEX.configMenu.lessBalls]:
        case MENU[INDEX.configMenu.moreBalls]:
        case MENU[INDEX.configMenu.lessPoints]:
        case MENU[INDEX.configMenu.morePoints]:
            handleChangeBtn(btn)
            break
        case MENU[INDEX.configMenu.startButton]:
            beginMatch()
            break
    }
}
function mainMenu(){   
    onMenu = true 
    if(initialized)pause = true
    show(MENU[INDEX.configMenu.itself],false)
    show(MENU[INDEX.mainMenu.itself],true)
    show(MENU[INDEX.menu],true)
}
function configurationMenu(){
    onMenu = true 
    show(MENU[INDEX.mainMenu.itself],false)
    show(MENU[INDEX.configMenu.itself],true)
}
function handleChangeBtn(btn){
    let lessBtn,
    moreBtn,
    quantity,
    min,
    max,
    adding
    if(btn == MENU[INDEX.configMenu.lessBalls] || btn == MENU[INDEX.configMenu.moreBalls]){
        lessBtn = MENU[INDEX.configMenu.lessBalls],
        quantity = MENU[INDEX.configMenu.balls],
        moreBtn = MENU[INDEX.configMenu.moreBalls],
        min = 1,
        max= 100
        adding = btn == MENU[INDEX.configMenu.moreBalls]? true : false
    }
    if(btn == MENU[INDEX.configMenu.lessPoints] || btn == MENU[INDEX.configMenu.morePoints]){
        lessBtn = MENU[INDEX.configMenu.lessPoints],
        quantity = MENU[INDEX.configMenu.winningPoints],
        moreBtn = MENU[INDEX.configMenu.morePoints],
        min = 1,
        max= 100
        adding = btn == MENU[INDEX.configMenu.morePoints]? true : false
    }
    modifyValue(adding,lessBtn,moreBtn,quantity,min,max)
}
function modifyValue(adding,lessBtn,moreBtn,quantity,min,max){
    if(adding){
        if(eval(quantity.innerHTML) < max )quantity.innerHTML = (eval(quantity.innerHTML) + 1).toString()
        if(eval(quantity.innerHTML) == max) moreBtn.classList.add("disabled-btn")
        if(eval(quantity.innerHTML) == min + 1) lessBtn.classList.remove("disabled-btn")
    }
    else{
        if(eval(quantity.innerHTML) > min )quantity.innerHTML = (eval(quantity.innerHTML) - 1).toString()
        if(eval(quantity.innerHTML) == min) lessBtn.classList.add("disabled-btn")
        if(eval(quantity.innerHTML) == max - 1) moreBtn.classList.remove("disabled-btn")
    }
}    
function beginMatch(){
    onMenu = false
    pause = false
    ballsNumber = eval(MENU[INDEX.configMenu.balls].innerHTML)
    winningPoints = eval(MENU[INDEX.configMenu.winningPoints].innerHTML)
    MENU[INDEX.menu].style.display = 'none'
    MENU[INDEX.configMenu.itself].style.display = 'none'
    MENU[INDEX.mainMenu.itself].style.display = 'flex'
    MENU[INDEX.mainMenu.continue].classList.remove("disabled-btn")
    MENU[INDEX.mainMenu.restart].innerHTML = "Restart"
    start()
}
function continueMatch(){
    if(!MENU[INDEX.mainMenu.continue].classList.contains("disabled-btn")){
        onMenu = false
        pause = false
        MENU[INDEX.menu].style.display = 'none'
        MENU[INDEX.configMenu.itself].style.display = 'none'
        MENU[INDEX.mainMenu.itself].style.display = 'flex'
    }
}