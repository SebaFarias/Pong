const menu = {
    itself: document.querySelector("#menu"),    
    mainMenu:{
        itself: document.querySelector("#main-menu"),        
        continue: document.querySelector('#continue'),
        restart:document.querySelector('#restart'),
        highscores:document.querySelector('#highscores'),
        participate:document.querySelector('#participate')
    },  
    configMenu:{
        itself: document.querySelector("#config-menu"),       
        backButton: document.querySelector("#back"),
        p1: document.querySelector("#p1"),
        p1BotSelector: document.querySelector("#player1-selector"),
        p2: document.querySelector("#p2"),
        p2BotSelector: document.querySelector("#player2-selector"),
        lessBalls: document.querySelector("#lessBalls"),
        balls: document.querySelector("#ballsQuantity"),
        moreBalls: document.querySelector("#moreBalls"),
        lessPoints: document.querySelector("#lessPoints"),
        winningPoints: document.querySelector("#winningPoints"),
        morePoints: document.querySelector("#morePoints"),
        startButton: document.querySelector("#start")  
    }
}
const configurationMenu = () => {
    onMenu = true 
    menu.mainMenu.itself.style.display = 'none'
    menu.configMenu.itself.style.display = 'grid'

}
const modifyValue = (event)=>{
    switch(event.target){
    case menu.configMenu.lessBalls :
        if(eval(menu.configMenu.balls.innerHTML)>1)menu.configMenu.balls.innerHTML = (eval(menu.configMenu.balls.innerHTML-1)).toString()
        if(eval(menu.configMenu.balls.innerHTML) == 1 ) menu.configMenu.lessBalls.setAttribute("data-enabled",0)
        if(eval(menu.configMenu.balls.innerHTML) == 99 ) menu.configMenu.moreBalls.setAttribute("data-enabled",1)
        break
    case menu.configMenu.moreBalls :
        if(eval(menu.configMenu.balls.innerHTML)<100)menu.configMenu.balls.innerHTML = (eval(menu.configMenu.balls.innerHTML) + 1).toString()
        if(eval(menu.configMenu.balls.innerHTML) == 100 ) menu.configMenu.moreBalls.setAttribute("data-enabled",0)
        if(eval(menu.configMenu.balls.innerHTML) == 2 ) menu.configMenu.lessBalls.setAttribute("data-enabled",1)
        break
    case menu.configMenu.lessPoints :
        if(eval(menu.configMenu.winningPoints.innerHTML)>1)menu.configMenu.winningPoints.innerHTML = (eval(menu.configMenu.winningPoints.innerHTML) - 1).toString()
        if(eval(menu.configMenu.winningPoints.innerHTML) == 1 ) menu.configMenu.lessPoints.setAttribute("data-enabled",0)
        if(eval(menu.configMenu.winningPoints.innerHTML) == 99 ) menu.configMenu.morePoints.setAttribute("data-enabled",1)
        break
    case menu.configMenu.morePoints :
        if(eval(menu.configMenu.winningPoints.innerHTML)<100)menu.configMenu.winningPoints.innerHTML = (eval(menu.configMenu.winningPoints.innerHTML) + 1).toString()
        if(eval(menu.configMenu.winningPoints.innerHTML) == 100 ) menu.configMenu.morePoints.setAttribute("data-enabled",0)
        if(eval(menu.configMenu.winningPoints.innerHTML) == 2 ) menu.configMenu.lessPoints.setAttribute("data-enabled",1)
        break
    }
}
const mainMenu = () => {   
    onMenu = true 
    if(initialized)pause = true
    menu.configMenu.itself.style.display = 'none'
    menu.mainMenu.itself.style.display = 'flex'
    menu.itself.style.display = 'flex'
}
const beginMatch = () => {
    onMenu = false
    pause = false
    ballsNumber = eval(menu.configMenu.balls.innerHTML)
    winningPoints = eval(menu.configMenu.winningPoints.innerHTML)
    menu.itself.style.display = 'none'
    menu.configMenu.itself.style.display = 'none'
    menu.mainMenu.itself.style.display = 'flex'
    menu.mainMenu.continue.setAttribute("data-enabled","1")
    menu.mainMenu.restart.innerHTML = "Restart"
    start()
}
const continueMatch = () => {
    if(menu.mainMenu.continue.getAttribute("data-enabled") == "1"){
        onMenu = false
        pause = false
        menu.itself.style.display = 'none'
        menu.configMenu.itself.style.display = 'none'
        menu.mainMenu.itself.style.display = 'flex'
    }
}