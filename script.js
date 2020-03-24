var correct = new Audio('se/correct.mp3');
var incorrect = new Audio('se/incorrect.mp3');
var decision = new Audio('se/decision.mp3');
var next = new Audio('se/question.mp3');
let quiz=0
let answer=0
let o=[0,0,0,0,0,0,0,0,0]
let x=[0,0,0,0,0,0,0,0,0]
document.onkeydown = function (e){
    if(quiz==0){return}
	if(!e){e = window.event}
    let key_code = e.keyCode;
    if (key_code=="49"){
        answer=1
    }else if(key_code==50){
        answer=2
    }else if(key_code==56){
        answer=3
    }else if(key_code==57){
        answer=4
    }else if(key_code==90){
        answer=5
    }else if(key_code==88){
        answer=6
    }else if(key_code==78){
        answer=7
    }else if(key_code==77){
        answer=8
    }else{
        return;
    }
    quiz=0
    document.getElementById("p"+answer).style.backgroundColor="#ff0000"
    decision.play();
};
function start(){
    if(answer>0){
        return;
    }
    if(document.getElementById("startreset").innerHTML=="start"){
        document.getElementById("startreset").style.display="none"
    }
    for(let i=1;i<9;i++){
        document.getElementById("ox"+i).innerHTML=o[i]+"o"+x[i]+"x"
        document.getElementById("p"+i).style.backgroundColor="#ffffff"
    }
    quiz=1
    next.play()
}
function question(ox){
    if(answer==0){
        return;
    }
    if(ox=='o'){
        correct.play()
        alert(answer+"P:正解")
        o[answer]++
    }else if(ox=='x'){
        incorrect.play()
        alert(answer+"P:不正解")
        x[answer]++
    }else{
        alert(answer+"P:スルー")
    }
    for(let i=1;i<9;i++){
        document.getElementById("ox"+i).innerHTML=o[i]+"o"+x[i]+"x"
        document.getElementById("p"+i).style.backgroundColor="#ffffff"
    }
    answer=0;
    alert("次の問題です")
    quiz=1
    next.play()
}