const pool = [
  {name:"Apple", img:"images/apple.jpg"},
  {name:"Ball", img:"images/ball.png"},
  {name:"Cat", img:"images/cat.png"},
  {name:"Dog", img:"images/dog.png"},
  {name:"Elephant", img:"images/elephant.png"},
  {name:"Fish", img:"images/fish.png"},
  {name:"Goat", img:"images/goat.png"},
  {name:"Hat", img:"images/hat.png"},
  {name:"Ice cream", img:"images/icecream.png"},
  {name:"Jug", img:"images/jug.png"},
  {name:"Kite", img:"images/kite.png"},
  {name:"Lion", img:"images/lion.png"},
  {name:"Mango", img:"images/mango.png"},
  {name:"Nest", img:"images/nest.png"},
  {name:"Orange", img:"images/orange.jpg"},
  {name:"Parrot", img:"images/parrot.jpg"},
  {name:"Queen", img:"images/queen.png"},
  {name:"Rabbit", img:"images/rabbit.jpg"},
  {name:"Sun", img:"images/sun.png"},
  {name:"Tiger", img:"images/tiger.png"},
  {name:"Umbrella", img:"images/umbrella.jpg"},
  {name:"Van", img:"images/van.png"},
  {name:"Watch", img:"images/watch.png"},
  {name:"Xylophone", img:"images/xylophone.png"},
  {name:"Yak", img:"images/yak.jpg"},
  {name:"Zebra", img:"images/zebra.png"}
];


let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

let current = 0;
let score = 0;
let wrong = 0;
let time = 25;
let timer;

function shuffle(a){
  for(let i=a.length-1;i>0;i--){
    let j=Math.floor(Math.random()*(i+1));
    [a[i],a[j]]=[a[j],a[i]];
  }
}

function showCelebrate(el){
  let rect = el.getBoundingClientRect();
  let c = document.getElementById("celebrate");

  c.style.left = rect.left + rect.width/2 + "px";
  c.style.top = rect.top + window.scrollY + "px";

  c.style.display = "block";
  setTimeout(()=>c.style.display="none",800);
}

function startTimer(){
  clearInterval(timer);
  time = 25;
  document.getElementById("time").innerText = time;

  timer = setInterval(()=>{
    time--;
    document.getElementById("time").innerText = time;

    if(time <= 0){
      nextQuestion();
    }
  },1000);
}

function gameOver(){
  document.getElementById("game").innerHTML = `
    <h1>💀 Game Over</h1>
    <h2>Final Score: ${score}</h2>
    <button onclick="location.reload()">Play Again</button>
  `;
}

function loadQuestion(){

  if(wrong >= 3){
    gameOver();
    return;
  }

  let letter = letters[current];
  document.getElementById("letter").innerText = letter;

  let correctItem = pool.find(x => x.name[0].toUpperCase() === letter);
  if(!correctItem){
    correctItem = pool[Math.floor(Math.random()*pool.length)];
  }

  let wrongPool = pool.filter(x => x.name !== correctItem.name);
  shuffle(wrongPool);

  let options = [correctItem, wrongPool[0], wrongPool[1]];
  shuffle(options);

  let correctIndex = options.findIndex(o => o.name === correctItem.name);

  document.querySelectorAll(".option").forEach((box,i)=>{
    box.querySelector("img").src = options[i].img;
    box.querySelector("p").innerText = options[i].name;

    box.dataset.correct = (i === correctIndex);
    box.classList.remove("correct","wrong");
  });

  startTimer();
}

function checkAnswer(el){

  if(el.dataset.correct === "true"){
    el.classList.add("correct");
    score++;
    showCelebrate(el);
  }else{
    el.classList.add("wrong");
    wrong++;
  }

  document.getElementById("score").innerText = score;
  document.getElementById("wrong").innerText = wrong;
}

function nextQuestion(){
  current++;

  if(current >= letters.length){
    shuffle(letters);
    current = 0;
  }

  loadQuestion();
}

shuffle(letters);
loadQuestion();