const pool = [
  {name:"apple", img:"images/apple.jpg"},
  {name:"ball", img:"images/ball.png"},
  {name:"cat", img:"images/cat.png"},
  {name:"dog", img:"images/dog.png"},
  {name:"elephant", img:"images/elephant.png"},
  {name:"fish", img:"images/fish.png"},
  {name:"goat", img:"images/goat.png"},
  {name:"hat", img:"images/hat.png"},
  {name:"ice cream", img:"images/icecream.png"},
  {name:"jug", img:"images/jug.png"},
  {name:"kite", img:"images/kite.png"},
  {name:"lion", img:"images/lion.png"},
  {name:"mango", img:"images/mango.png"},
  {name:"nest", img:"images/nest.png"},
  {name:"orange", img:"images/orange.jpg"},
  {name:"parrot", img:"images/parrot.jpg"},
  {name:"queen", img:"images/queen.png"},
  {name:"rabbit", img:"images/rabbit.jpg"},
  {name:"sun", img:"images/sun.png"},
  {name:"tiger", img:"images/tiger.png"},
  {name:"umbrella", img:"images/umbrella.jpg"},
  {name:"van", img:"images/van.png"},
  {name:"watch", img:"images/watch.png"},
  {name:"xylophone", img:"images/xylophone.png"},
  {name:"yak", img:"images/yak.jpg"},
  {name:"zebra", img:"images/zebra.png"}
];

let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
let current = 0;

let score = 0;
let wrong = 0;
let time = 25;
let timer;

let correctItem = null;

/* =======================
   UNLOCK SPEECH (MOBILE FIX)
======================= */
document.body.addEventListener("click", () => {
  let u = new SpeechSynthesisUtterance("ready");
  speechSynthesis.speak(u);
  speechSynthesis.cancel();
}, { once: true });

/* =======================
   LETTER SOUND
======================= */
function playLetterSound(letter){
  try{
    let audio = new Audio(`sounds/${letter.toUpperCase()}.mp3`);
    audio.currentTime = 0;
    audio.play();
  }catch(e){
    console.log(e);
  }
}

/* =======================
   SPEAK A FOR APPLE (FIXED)
======================= */
function speakAFor(word){
  speechSynthesis.cancel(); // ⭐ IMPORTANT FIX

  let letter = word[0].toUpperCase();
  let text = `${letter} for ${word}`;

  let speech = new SpeechSynthesisUtterance(text);
  speech.lang = "en-US";
  speech.rate = 0.9;
  speech.pitch = 1;

  setTimeout(()=>{
    speechSynthesis.speak(speech);
  }, 150);
}

/* =======================
   CELEBRATION
======================= */
function showCelebrate(el){
  let rect = el.getBoundingClientRect();
  let c = document.getElementById("celebrate");

  c.style.left = rect.left + rect.width/2 + "px";
  c.style.top = rect.top + window.scrollY + "px";

  c.style.display = "block";
  setTimeout(()=>c.style.display="none",800);
}

/* =======================
   TIMER
======================= */
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

/* =======================
   GAME OVER
======================= */
function gameOver(){
  document.getElementById("game").innerHTML = `
    <h1>💀 Game Over</h1>
    <h2>Final Score: ${score}</h2>
    <button onclick="location.reload()">Play Again</button>
  `;
}

/* =======================
   LOAD QUESTION
======================= */
function loadQuestion(){

  if(wrong >= 3){
    gameOver();
    return;
  }

  let letter = letters[current];
  document.getElementById("letter").innerText = letter;

  playLetterSound(letter);

  let sameLetterItems = pool.filter(
    x => x.name[0].toUpperCase() === letter
  );

  correctItem = sameLetterItems.length
    ? sameLetterItems[Math.floor(Math.random()*sameLetterItems.length)]
    : pool[Math.floor(Math.random()*pool.length)];

  let wrongPool = pool.filter(x => x.name !== correctItem.name);

  let options = [
    correctItem,
    wrongPool[Math.floor(Math.random()*wrongPool.length)],
    wrongPool[Math.floor(Math.random()*wrongPool.length)]
  ];

  // shuffle
  for(let i=options.length-1;i>0;i--){
    let j=Math.floor(Math.random()*(i+1));
    [options[i],options[j]]=[options[j],options[i]];
  }

  let correctIndex = options.findIndex(o => o.name === correctItem.name);

  document.querySelectorAll(".option").forEach((box,i)=>{
    box.querySelector("img").src = options[i].img;
    box.querySelector("p").innerText = options[i].name;

    box.dataset.correct = (i === correctIndex);
    box.classList.remove("correct","wrong");
  });

  startTimer();
}

/* =======================
   CHECK ANSWER
======================= */
function checkAnswer(el){

  if(el.dataset.correct === "true"){
    el.classList.add("correct");
    score++;
    showCelebrate(el);

    // ONLY ONE SOUND (FIXED)
    speakAFor(correctItem.name);

  }else{
    el.classList.add("wrong");
    wrong++;
  }

  document.getElementById("score").innerText = score;
  document.getElementById("wrong").innerText = wrong;
}

/* =======================
   NEXT QUESTION
======================= */
function nextQuestion(){
  current++;

  if(current >= letters.length){
    current = 0;
  }

  loadQuestion();
}

/* =======================
   START GAME
======================= */
loadQuestion();