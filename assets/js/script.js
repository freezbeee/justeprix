//var declaration, const then let
const gifts = ['Une corde', 'Une autruche', 'Un pediluve', 'Un balai', 'Un aller simple en corée du nord', '1.000.000 €', 'un paquet de bonbon vide']
const maxTry = 7;
const proposedPrice = document.querySelector('#proposedPrice');
const checkBtn = document.querySelector('#checkBtn');
const resultDiv = document.querySelector('#resultDiv');
const restartBtn = document.querySelector('#restartBtn');
const tryLeftDiv = document.querySelector('#tryLeftDiv');

let priceToFind, nickName, randomGift, tryCount, hasWin, hasLoose;

//functions
const init = () => {
    priceToFind = Math.round(Math.random() * 100);
    randomGift = gifts[Math.round(Math.random() * (gifts.length - 1))]; //random gift selection
    tryCount = 0;
    hasWin = false;
    hasLoose = false;
    proposedPrice.focus();
    restartBtn.classList.add('hide');
    resultDiv.textContent = '';
    tryLeftDiv.textContent = '';
    getTryLeft(tryCount);
    nickName = prompt('Quel est votre nom?');
}

const getTryLeft = (tryCount) => {
    const tryLeft = maxTry - tryCount;
    let tryLeftTxt = tryLeft + ' essais restants'
    if (tryLeft <= maxTry - 1) {
        tryLeftTxt = tryLeft + ' essai restant'
    }
    tryLeftDiv.textContent = tryLeftTxt;
}

function check(value) {
    // has win or loose?
    if (hasWin || hasLoose) {
        return false;
    }
    //checking the proposed price 
    tryCount++; //new turn
    let rst = '';

    if (value === priceToFind) {
        rst = 'BRAVO ' + nickName + '! Vous avez de la chance! Vous remportez "' + randomGift + '"';
        hasWin = true;
        restartBtn.classList.remove('hide');
    } else {
        if (tryCount === maxTry) {
            rst = 'DOMMAGE ' + nickName + '! Vous avez perdu :( ';
            hasLoose = true;
            restartBtn.classList.remove('hide');
        } else {
            if (value > priceToFind) {
                rst = 'Plus petit!';
            } else {
                rst = 'Plus grand!';
            }
        }
    }
    resultDiv.textContent = rst;
    getTryLeft(tryCount);
    proposedPrice.value = '';
    proposedPrice.focus();
}

//Events Handling
proposedPrice.addEventListener('keyup', (e) => {
    console.log(e);
    if (e.key === 'Enter') check(parseInt(proposedPrice.value));
});

checkBtn.addEventListener('click', () => {
    check(parseInt(proposedPrice.value));
})

restartBtn.addEventListener('click', () => {
    init();
})

//go!
init();