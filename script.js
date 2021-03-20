const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
const score = document.querySelector('.points');
let isJumping = false;
let position = 0;
let scorePoints = 0;

function handleKeyUp(event) 
{
    if(!isJumping)
    {
        if(event.keyCode === 32)
        {
            jump();
        }
    }
    
}

function jump()
{
    isJumping = true;

    let upInterval = setInterval(() => 
    {
        if(position >= 150)
        {
            clearInterval(upInterval);

            let downInterval = setInterval(() => 
            {
                if(position <= 0 )
                {
                    clearInterval(downInterval);
                    isJumping = false;
                }
                else
                {
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 25)
        }
        else
        {
            position += 20;
            dino.style.bottom = position + 'px';
        }
        
    }, 15)
}

function createCactus()
{
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * (5000 - 1000) + 1000;

    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => 
    {
        
        if(cactusPosition < -60)
        {
            clearInterval(leftInterval);
            background.removeChild(cactus);
        }
        else if(cactusPosition > 0 && cactusPosition < 60 && position < 60)
        {
            clearInterval(leftInterval);
            background.removeChild(cactus);
                
            {

            }
            let quantCactus = background.childNodes.length - 6;
            
            var gameOver = confirm("Game Over! Pontuação : " + scorePoints);

            if(gameOver === true)
            {
                restart(quantCactus);    
            }
            else
            {
                close();
            }  
            
            
                       
        }
        else
        {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20)

    setTimeout(createCactus, randomTime);
}

function scoreUp()
{

    let scoreInterval = setInterval(() => 
    {
        scorePoints += 1;
        score.textContent = scorePoints;  
        
        if (scorePoints === 30)
        {    
            medal1.style.visibility = 'visible';
        }
        if (scorePoints === 60)
        {    
            medal2.style.visibility = 'visible';
        }
        if (scorePoints === 90)
        {    
            medal3.style.visibility = 'visible';
        }

    }, 1000);

}

function restart(quantCactus)
{
    isJumping = false;
    dino.style.bottom = position + 'px';
    scorePoints = 0;

    for(i = 0; i < quantCactus ; i++)
    {
        background.removeChild(background.lastChild);
    }
    medal1.style.visibility = 'hidden';
    medal2.style.visibility = 'hidden';
    medal3.style.visibility = 'hidden';


}


scoreUp();
createCactus();
document.addEventListener('keyup', handleKeyUp);