const scoreCard = JSON.parse(localStorage.getItem('scorecard')) || {
    win: 0,
    loss: 0,
    tie: 0
};

updateScore();

function gameLogic(){
    let move;
    const computerMove = Math.random();

    if(computerMove >= 0 && computerMove < 1/3)
        move = 'rock';
    else if(computerMove >= 1/3 && computerMove < 2/3)
        move = 'paper';
    else if(computerMove >= 2/3 && computerMove < 1)
        move = 'scissor';

    return move;
}

function gameResult(choice){
    let moveComputer = gameLogic();
    let gameResult = '';

    if(choice === 'rock'){
        if(moveComputer === 'rock')
            gameResult = 'tie';
        else if(moveComputer === 'paper')
            gameResult = 'loss';
        else if(moveComputer === 'scissor')
            gameResult = 'win';
    }
    else if(choice === 'paper'){
        if(moveComputer === 'rock')
            gameResult = 'win';
        else if(moveComputer === 'paper')
            gameResult = 'tie';
        else if(moveComputer === 'scissor')
            gameResult = 'loss';
    }
    else if(choice === 'scissor'){
        if(moveComputer === 'rock')
            gameResult = 'loss';
        else if(moveComputer === 'paper')
            gameResult = 'win';
        else if(moveComputer === 'scissor')
            gameResult = 'tie';
    }

    if(gameResult === 'win')
        scoreCard.win++;
    else if(gameResult === 'loss')
        scoreCard.loss++;
    else if(gameResult === 'tie')
        scoreCard.tie++;


    localStorage.setItem('scorecard', JSON.stringify(scoreCard));
    
    updateScore();
    
    result(gameResult);
    
    output(moveComputer, choice);
}

function resetScore(){
    scoreCard.win = 0;
    scoreCard.loss = 0;
    scoreCard.tie = 0;

    localStorage.removeItem('scorecard');
    updateScore(); 

    location.reload();
}

let isAutoPlaying = false;
let intervalID;

function autoPlay(){
    if(!isAutoPlaying){
        intervalID = setInterval(() => {
            gameResult(gameLogic());
        }, 1000);

        isAutoPlaying = true;
        document.querySelector('.js-auto-play').innerHTML = 'Stop Play';
    }
    else{
        isAutoPlaying = false;
        clearInterval(intervalID);
        document.querySelector('.js-auto-play').innerHTML = 'Auto Play';
    }
}

document.querySelector('.js-rock').addEventListener('click', () =>{
    gameResult('rock');
});

document.querySelector('.js-paper').addEventListener('click', () =>{
    gameResult('paper');
});

document.querySelector('.js-scissor').addEventListener('click', () =>{
    gameResult('scissor');
});

document.querySelector('.js-reset').addEventListener('click', () =>{
    resetScore();
});

document.querySelector('.js-autoPlay').addEventListener('click', () =>{
    autoPlay();
});

document.body.addEventListener('keydown', (event) =>{
    if(event.key === 'r')
        gameResult('rock');
    else if(event.key === 'p')
        gameResult('paper');
    else if(event.key === 's')
        gameResult('scissor');
});

function updateScore(){
    document.querySelector('.js-score').innerHTML = `Wins: ${scoreCard.win}, Losses: ${scoreCard.loss}, Ties: ${scoreCard.tie}`;
}

function result(gameResult){
    document.querySelector('.js-result').innerHTML = `You ${gameResult}.`;
}

function output(moveComputer, choice){
    document.querySelector('.js-output').innerHTML = `You <img src="Photo/${choice}-emoji.png" class="move-icon"> <img src="Photo/${moveComputer}-emoji.png" class="move-icon"> Computer`;
}
