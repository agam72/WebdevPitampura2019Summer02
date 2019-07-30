let numcadspulled=0
let playercounter=0
let dealercounter=0
 let player={
     cards:[],
     money: 100,
     score: 0
 }
let dealer={
     cards:[],
     score:0
 }
document.getElementById('player-money').innerHTML="Your money " + player.money
document.getElementById('hit-button').disabled=true
document.getElementById('stand-button').disabled=true

function getcardsbyvalue(a){
    let cardarray=[]
    sum=0
    i=0
    acecount=0
    cardarray=a 
    for(i ; i<cardarray.length; i++ ){
    if(cardarray[i].rank=='J'||cardarray[i].rank=='Q'||cardarray[i].rank=='K')
    {
        sum+=10
    }
    else if(cardarray[i].rank=='A')
    {
        sum+=11
        acecount+=1
    }
    else{
        sum+=cardarray[i].rank
    }

    while (acecount>0&& sum>21){
        sum-=10
        acecount-=1
    }
    

    }
    return sum
}

let deck= {
    deckarray: [],
    intialize: function()
    {
     let suitarray,rankarray,s,r 
        suitarray=["S","H","C","D"]
        rankarray=[2,3,4,5,6,7,8,9,10,"J","Q","K","A"]
        for(s=0;s<suitarray.length;s++)
        {
            for(r=0;r<rankarray.length;r++)
                {
                    this.deckarray[s*13+r]={
                        name: rankarray[r]+suitarray[s],
                        rank:rankarray[r],
                        suit:suitarray[s]
                        


                    }
                }
        
        }
    },
    shuffle: function(){
        let temp,i,rnd
        for(i=0;i<this.deckarray.length;i++)
        {
            rnd=Math.floor(Math.random()*this.deckarray.length)
            temp=this.deckarray[i]
            this.deckarray[i]=this.deckarray[rnd]
            this.deckarray[rnd]=temp
        }
    }
 

}
deck.intialize()
deck.shuffle()

function bet(outcome)
{ let playerbet=parseInt( document.getElementById("bet").value)
    if(outcome=="win"){
        player.money+=playerbet
    }
    if (outcome=="lose"){
        player.money-=playerbet
    }
}
function resetgame()
{
    numcadspulled=0
    playercounter=0
    dealercounter=0
    player.cards=[]
    dealer.cards=[]
    player.score=0
    dealer.score=0
    deck.intialize()
    deck.shuffle()
    // document.getElementById("player-card").innerHTML=""
    // document.getElementById("dealer-cards").innerHTML=""
    document.getElementById('hit-button').disabled=true
    document.getElementById('stand-button').disabled=true
    document.getElementById('newgame-button').disabled=false
}
function endgame(){
    if (player.score===21)
    {
        document.getElementById('message-board').innerHTML="You win, you got blackjack" + "<br>" + "Click on newgame for another round"
        bet("win")
        document.getElementById('player-money').innerHTML= "Your money: "+ player.money
        resetgame()
    }
    if (player.score>21){
        document.getElementById('message-board').innerHTML="You got burst, house wins" + "<br>" + "Click on newgame for another round"
        bet("lose")
        document.getElementById('player-money').innerHTML= "Your money: "+ player.money
        resetgame()
    }
    if (dealer.score === 21) {
        document.getElementById("message-board").innerHTML = "You lost. Dealer got blackjack" + "<br>" + "click New Game to play again";
        bet("lose");
        document.getElementById("player-money").innerHTML = "Your money: $" + player.money;
        resetgame();
    }

    if (dealer.score > 21) {
        document.getElementById("message-board").innerHTML = "Dealer went over 21! You win!" + "<br>" + "click New Game to play again";
        bet("win");
        document.getElementById("player-money").innerHTML = "Your money: $" + player.money;
        resetgame();
    }
    if (dealer.score >= 17 && player.score > dealer.score && player.score < 21) {
        document.getElementById("message-board").innerHTML = "You win! You beat the dealer." + "<br>" + "click New Game to play again";
        bet("win");
        document.getElementById("player-money").innerHTML = "Your money: $" + player.money;
        resetgame();
    }
    if (dealer.score >= 17 && player.score < dealer.score && dealer.score < 21) {
        document.getElementById("message-board").innerHTML = "You lost. Dealer had the higher score." + "<br>" + "click New Game to play again";
        bet("lose");
        document.getElementById("player-money").innerHTML = "Your money: $" + player.money;
        resetgame();
    }
    if (dealer.score >= 17 && player.score === dealer.score && dealer.score < 21) {
        document.getElementById("message-board").innerHTML = "You tied! " + "<br>" + "click New Game to play again";
        resetgame();
    }
    if (player.money === 0) {
        document.getElementById("new-game-button").disabled = true;
        document.getElementById("hit-button").disabled = true;
        document.getElementById("stand-button").disabled = true;
        document.getElementById("message-board").innerHTML = "You lost!" + "<br>" + "You are out of money";
    }



}
function dealerdraw(){

        dealer.cards.push(deck.deckarray[numcadspulled])
    dealer.score=getcardsbyvalue(dealer.cards)
    let temp='<img class="img-thumbnail" height="40px" width="40px" src="JPEG\\' + dealer.cards[dealercounter].name+    '.jpg">'
    dealercounter++
    document.getElementById("dealer-cards").innerHTML+= temp
    document.getElementById("dealer-score").innerHTML = "Dealer Score: " + dealer.score
    numcadspulled++
}
function newgame(){
    document.getElementById('hit-button').disabled=false
   
    document.getElementById('stand-button').disabled=false
    document.getElementById('newgame-button').disabled=true
    document.getElementById("message-board").innerHTML = ""
    document.getElementById("player-card").innerHTML=""
    document.getElementById("dealer-cards").innerHTML=""
    hit()
    dealerdraw()
    hit()
    endgame()
}



function hit(){
   
    player.cards.push(deck.deckarray[numcadspulled])
  
   
        player.score=getcardsbyvalue(player.cards)
   let temp='<img class="img-thumbnail" height="40px" width="40px" src="JPEG\\' + player.cards[playercounter].name+    '.jpg">'
    playercounter++
    document.getElementById("player-card").innerHTML+=temp
    document.getElementById("player-score").innerHTML = "Player Score: " + player.score;
    numcadspulled += 1;
    if (numcadspulled > 2) {
        endgame();
    }
}
function stand(){

    while(dealer.score<17)
{
    dealerdraw()
}
endgame()}


