const width = 28
const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score');
const ghostCharacter = document.querySelectorAll('.ghost_character');
const pacmanMouth = document.querySelector('.pacman__mouth');
const restartButton = document.getElementById('restart');

let squares = [];
let score = 0;

// 0 - pac-dots
  // 1 - wall
  // 2 - ghost-lair
  // 3 - power-pellet
  // 4 - empty
const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1 
]


// create board function 

function createBoard() {
    for(let i = 0; i < layout.length; i++){
        // create square
        const square = document.createElement('div');
        // put square into grid
        grid.appendChild(square);
        // push into squares
        squares.push(square);

        if(layout[i] === 0) {
            squares[i].classList.add('pac-dot');
        } else if (layout[i] === 1) {
            squares[i].classList.add('wall');
        } else if (layout[i] === 2) {
            squares[i].classList.add('ghost-lair');
        } else if (layout[i] === 3) {
            squares[i].classList.add('power-pellet');
        } 
    }
    
}

createBoard()


// starting position of pacman

let pacmanCurrentIndex = 490;

squares[pacmanCurrentIndex].classList.add('pacman');

function control(e) {
    e.preventDefault();

    squares[pacmanCurrentIndex].classList.remove('pacman');

    switch (e.keyCode) {
        case 40:
            
            if ( !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair') && !squares[pacmanCurrentIndex + width].classList.contains('wall') && pacmanCurrentIndex + width < width * width) 
            pacmanCurrentIndex += width;
            break;
        case 38:
            if ( !squares[pacmanCurrentIndex - width].classList.contains('wall') && 
            pacmanCurrentIndex - width >= 0) 
            pacmanCurrentIndex -= width;
            
            break;
        case 37:
            if ( !squares[pacmanCurrentIndex -1].classList.contains('wall') && 
            pacmanCurrentIndex % width !== 0) 
            pacmanCurrentIndex -= 1
            if (pacmanCurrentIndex === 364) {
                pacmanCurrentIndex = 391;
            }
           
            break;
        case 39:
            if ( !squares[pacmanCurrentIndex +1].classList.contains('wall') && pacmanCurrentIndex % width < width -1) pacmanCurrentIndex += 1
            if (pacmanCurrentIndex === 391) {
                pacmanCurrentIndex = 364;
            }
            break;
        default:
            console.log('This Key will not move Pacman');

    }

    squares[pacmanCurrentIndex].classList.add('pacman');
    pacDotEaten();
    powerPelletEaten();
    checkForGameOver();
    checkForWin();
}

document.addEventListener('keyup', control);
restartButton.addEventListener('click', restartGame);

function pacDotEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('pac-dot')){
        squares[pacmanCurrentIndex].classList.remove('pac-dot');
        score++
        // display score
        scoreDisplay.innerHTML = score;
        
    }
}

function powerPelletEaten(){
    // if square pacman is in contain a power pellet
    if(squares[pacmanCurrentIndex].classList.contains('power-pellet')){
        // Remove power pellet
        squares[pacmanCurrentIndex].classList.remove('power-pellet')
        // add a score of 10
        score += 10
        // change each of the foru ghosts to isScared
        ghosts.forEach(ghost => {
            ghost.isScared = true
        })
        // use setTimeout to unscare ghosts after 10 seconds
        setTimeout(unScareGhosts, 10000)

    }


}

function unScareGhosts() {
    ghosts.forEach(ghost => {
        ghost.isScared = false
    })
}

class Ghost {
    constructor(className, startIndex, speed) {

        this.className = className
        this.startIndex = startIndex
        this.speed = speed
        this.currentIndex = startIndex
        this.isScared = false
        this.timerId = NaN
    }
}

const ghosts = [

    new Ghost('blinky', 348, 250),
    new Ghost('pinky', 376, 400),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 379, 500)

]

// draw ghost to grid

ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className)
    squares[ghost.currentIndex].classList.add('ghost')
})

// move the ghosts 
ghosts.forEach(ghost => moveGhost(ghost))

function moveGhost(ghost) {
    const directions = [-1,+1, -width, +width]

    let direction = directions[Math.floor(Math.random() * directions.length)]

    console.log(direction)

    ghost.timerId = setInterval(function(){

        // all our code
        // if next sqaure does not contain ad wall and ghost 
        if(!squares[ghost.currentIndex + direction].classList.contains('ghost') && !squares[ghost.currentIndex + direction].classList.contains('wall') ){

            // remove ghost class
        squares[ghost.currentIndex].classList.remove(ghost.className)
        squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
        pacmanMouth.classList.remove('pacman_mouth_animation')
        ghostCharacter.forEach(scaredGhost => scaredGhost.classList.remove('ghost_animation'));
        // add direction to current Index
        ghost.currentIndex += direction
        // add ghost class
        squares[ghost.currentIndex].classList.add(ghost.className)
        squares[ghost.currentIndex].classList.add('ghost')


        } else direction = directions[Math.floor(Math.random() * directions.length)]

        if(ghost.isScared) {
            squares[ghost.currentIndex].classList.add('scared-ghost')
            pacmanMouth.classList.add('pacman_mouth_animation')
            ghostCharacter.forEach(scaredGhost => scaredGhost.classList.add('ghost_animation'));
            

        }

        // if the ghost is current scared and pacman is on it
        if(ghost.isScared && squares[ghost.currentIndex].classList.contains('pacman')){
            // remove classnames - 
            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
            
        // change ghosts currentindex back to startindex
            ghost.currentIndex = ghost.startIndex
        // add a scroe of 100
            score += 100
        //re-ad classnames of ghost.className and 'ghost to the ghosts new position
            squares[ghost.currentIndex].classList.add(ghost.className,'ghost')
        }
        checkForGameOver();
        
    }, ghost.speed)

}


// check for game over 

function checkForGameOver(){
    // if the square pacman is in contains a ghost and the square does not cotain a scared ghost
    if(squares[pacmanCurrentIndex].classList.contains('ghost') && !squares[pacmanCurrentIndex].classList.contains('scared-ghost')){
        // for each ghost - we need to stop it moving
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
    // remove eventlistener from our control function
        document.removeEventListener('keyup', control);
    // display restart button
    restartButton.style.visibility = 'visible';
    // tell user the game is over
    scoreDisplay.innerHTML = 'You LOSE'
    }
    

}

//check for win

function checkForWin(){
    if(score === 274){
        //stop each ghost
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        // remove the event listener
        document.removeEventListener('keyup', control);

        // display restart button
    restartButton.style.visibility = 'visible';

        // tell our user we have won
        scoreDisplay.innerHTML = `You Won!`
    }
}

// Restart Game 

function restartGame() {
    window.location.reload();
    
  

}