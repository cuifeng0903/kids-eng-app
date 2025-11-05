// Kids English Patterns App
const STATE = {
  jpOn: false,
  step: 0, // 0=home/list, 1=lesson, 2=quiz, 3=reward
  patternIndex: 0,
  sceneIndex: 0,
  stamps: 0,
};

// 20文型 × 各3シーン
const DATA = [
  {"key":"Can I…?","jp":"〜してもいい？","scenes":[
    {"emoji":"🎂","sentence":"Can I eat this cake?","jp":"このケーキ食べてもいい？","hint":"Tap the cake!","action":"jump"},
    {"emoji":"🎠","sentence":"Can I play on the swing?","jp":"ブランコで遊んでもいい？","hint":"Tap the swing!","action":"spin"},
    {"emoji":"🐶","sentence":"Can I pet the dog?","jp":"犬をなでてもいい？","hint":"Tap the dog!","action":"jump"}
  ]},
  {"key":"Thank you for…","jp":"〜してくれてありがとう","scenes":[
    {"emoji":"🎁","sentence":"Thank you for the gift!","jp":"プレゼントをありがとう！","hint":"Tap to give.","action":"jump"},
    {"emoji":"🧱","sentence":"Thank you for helping me!","jp":"手伝ってくれてありがとう！","hint":"Tap blocks.","action":"spin"},
    {"emoji":"🖼️","sentence":"Thank you for the picture!","jp":"絵をありがとう！","hint":"Tap the picture.","action":"jump"}
  ]},
  {"key":"Don’t be…","jp":"〜にならないで","scenes":[
    {"emoji":"😭","sentence":"Don't be sad!","jp":"悲しまないで！","hint":"Tap smile.","action":"jump"},
    {"emoji":"😠","sentence":"Don't be angry!","jp":"怒らないで！","hint":"Drag heart.","action":"spin"},
    {"emoji":"😨","sentence":"Don't be afraid!","jp":"こわがらないで！","hint":"Tap the light.","action":"jump"}
  ]},
  {"key":"Let’s not…","jp":"〜しないでおこう","scenes":[
    {"emoji":"🌧️","sentence":"Let's not go outside!","jp":"外に出るのはやめておこう！","hint":"Tap umbrella.","action":"spin"},
    {"emoji":"📺","sentence":"Let's not watch TV now!","jp":"今はテレビを見ないでおこう！","hint":"Swipe to turn off.","action":"jump"},
    {"emoji":"🍬","sentence":"Let's not eat candy!","jp":"キャンディは食べないでおこう！","hint":"Swipe candy.","action":"spin"}
  ]},
  {"key":"I’m going to…","jp":"〜するつもりです","scenes":[
    {"emoji":"🎒","sentence":"I'm going to school!","jp":"学校へ行くつもりです！","hint":"Tap backpack.","action":"jump"},
    {"emoji":"⚽","sentence":"I'm going to play in the park!","jp":"公園で遊ぶつもりです！","hint":"Tap the ball.","action":"spin"},
    {"emoji":"🖍️","sentence":"I'm going to draw a picture!","jp":"絵を描くつもりです！","hint":"Tap the crayon.","action":"jump"}
  ]},
  {"key":"Where can I…?","jp":"どこで〜できますか？","scenes":[
    {"emoji":"📚","sentence":"Where can I find a book?","jp":"本はどこで見つけられる？","hint":"Tap bookshelf.","action":"spin"},
    {"emoji":"🚻","sentence":"Where can I wash my hands?","jp":"どこで手を洗える？","hint":"Tap sink.","action":"jump"},
    {"emoji":"🎨","sentence":"Where can I paint?","jp":"どこで絵が描ける？","hint":"Tap table.","action":"jump"}
  ]},
  {"key":"I’d like to…","jp":"〜したいです","scenes":[
    {"emoji":"🍨","sentence":"I'd like to eat ice cream!","jp":"アイスを食べたいです！","hint":"Tap ice cream.","action":"jump"},
    {"emoji":"📖","sentence":"I'd like to read a book!","jp":"本を読みたいです！","hint":"Tap book.","action":"spin"},
    {"emoji":"🏰","sentence":"I'd like to build blocks!","jp":"ブロックを組みたいです！","hint":"Tap blocks.","action":"jump"}
  ]},
  {"key":"Did I…?","jp":"〜した？","scenes":[
    {"emoji":"🖍️","sentence":"Did I draw this?","jp":"これ描いたのかな？","hint":"Tap the drawing.","action":"spin"},
    {"emoji":"🧩","sentence":"Did I finish the puzzle?","jp":"パズルを終えた？","hint":"Tap puzzle.","action":"jump"},
    {"emoji":"🧹","sentence":"Did I clean up?","jp":"片付けた？","hint":"Tap broom.","action":"jump"}
  ]},
  {"key":"How was…?","jp":"〜はどうだった？","scenes":[
    {"emoji":"🎡","sentence":"How was the park?","jp":"公園はどうだった？","hint":"Tap ferris wheel.","action":"spin"},
    {"emoji":"🎉","sentence":"How was the party?","jp":"パーティはどうだった？","hint":"Tap balloons.","action":"jump"},
    {"emoji":"🍽️","sentence":"How was dinner?","jp":"夕食はどうだった？","hint":"Tap plate.","action":"jump"}
  ]},
  {"key":"Let me…","jp":"〜させて","scenes":[
    {"emoji":"🚪","sentence":"Let me open the door!","jp":"ドアを開けさせて！","hint":"Swipe door.","action":"spin"},
    {"emoji":"🎁","sentence":"Let me help you!","jp":"手伝わせて！","hint":"Tap gift.","action":"jump"},
    {"emoji":"🧁","sentence":"Let me make a cupcake!","jp":"カップケーキ作らせて！","hint":"Tap cupcake.","action":"jump"}
  ]},
  {"key":"I need to…","jp":"〜する必要がある","scenes":[
    {"emoji":"🪥","sentence":"I need to brush my teeth!","jp":"歯をみがく必要がある！","hint":"Tap toothbrush.","action":"jump"},
    {"emoji":"🧴","sentence":"I need to wash my hands!","jp":"手を洗う必要がある！","hint":"Tap soap.","action":"spin"},
    {"emoji":"🛏️","sentence":"I need to go to bed!","jp":"寝る必要がある！","hint":"Tap bed.","action":"jump"}
  ]},
  {"key":"Is there…?","jp":"〜はありますか？","scenes":[
    {"emoji":"📦","sentence":"Is there a toy inside?","jp":"中におもちゃはある？","hint":"Tap box.","action":"spin"},
    {"emoji":"🐱","sentence":"Is there a cat here?","jp":"ここに猫はいる？","hint":"Tap cat.","action":"jump"},
    {"emoji":"🍎","sentence":"Is there an apple?","jp":"りんごはある？","hint":"Tap apple.","action":"jump"}
  ]},
  {"key":"Are you ready…?","jp":"準備できた？","scenes":[
    {"emoji":"🏁","sentence":"Are you ready to run?","jp":"走る準備できた？","hint":"Tap flag.","action":"jump"},
    {"emoji":"🎤","sentence":"Are you ready to sing?","jp":"歌う準備できた？","hint":"Tap mic.","action":"spin"},
    {"emoji":"🎲","sentence":"Are you ready to play?","jp":"遊ぶ準備できた？","hint":"Tap dice.","action":"jump"}
  ]},
  {"key":"What kind of…?","jp":"どんな〜？","scenes":[
    {"emoji":"🐯","sentence":"What kind of animal is this?","jp":"これはどんな動物？","hint":"Tap animal.","action":"jump"},
    {"emoji":"🍕","sentence":"What kind of food is this?","jp":"これはどんな食べ物？","hint":"Tap food.","action":"spin"},
    {"emoji":"🚗","sentence":"What kind of car is that?","jp":"それはどんな車？","hint":"Tap car.","action":"jump"}
  ]},
  {"key":"When can I…?","jp":"いつ〜できる？","scenes":[
    {"emoji":"🕰️","sentence":"When can I play?","jp":"いつ遊べる？","hint":"Tap clock.","action":"spin"},
    {"emoji":"🍰","sentence":"When can I eat cake?","jp":"いつケーキ食べられる？","hint":"Tap cake.","action":"jump"},
    {"emoji":"🖍️","sentence":"When can I draw?","jp":"いつ絵を描ける？","hint":"Tap crayon.","action":"jump"}
  ]},
  {"key":"How can I…?","jp":"どうやって〜する？","scenes":[
    {"emoji":"📐","sentence":"How can I make a star?","jp":"どうやって星を作る？","hint":"Tap ruler.","action":"spin"},
    {"emoji":"🧦","sentence":"How can I fold this?","jp":"どうやってこれをたたむ？","hint":"Tap cloth.","action":"jump"},
    {"emoji":"🧩","sentence":"How can I finish the puzzle?","jp":"どうやってパズルを終える？","hint":"Tap puzzle.","action":"jump"}
  ]},
  {"key":"I’m sorry for…","jp":"〜してごめんね","scenes":[
    {"emoji":"🌸","sentence":"I'm sorry for breaking the flower.","jp":"花を折ってごめんね。","hint":"Tap flower.","action":"spin"},
    {"emoji":"🧸","sentence":"I'm sorry for dropping the toy.","jp":"おもちゃ落としてごめんね。","hint":"Tap toy.","action":"jump"},
    {"emoji":"🧁","sentence":"I'm sorry for eating your cupcake.","jp":"あなたのカップケーキ食べてごめんね。","hint":"Tap cupcake.","action":"jump"}
  ]},
  {"key":"I don’t know…","jp":"わからない…","scenes":[
    {"emoji":"❓","sentence":"I don't know the answer.","jp":"答えがわからない。","hint":"Tap hint.","action":"jump"},
    {"emoji":"🗺️","sentence":"I don't know the way.","jp":"道がわからない。","hint":"Tap map.","action":"spin"},
    {"emoji":"📦","sentence":"I don't know what's inside.","jp":"中身がわからない。","hint":"Tap box.","action":"jump"}
  ]},
  {"key":"It makes me…","jp":"それは私を〜にする","scenes":[
    {"emoji":"😊","sentence":"It makes me happy!","jp":"それは私を幸せにする！","hint":"Tap smile.","action":"jump"},
    {"emoji":"😲","sentence":"It makes me surprised!","jp":"それは私を驚かせる！","hint":"Tap surprise.","action":"spin"},
    {"emoji":"😴","sentence":"It makes me sleepy.","jp":"それは眠くなる。","hint":"Tap sleep.","action":"jump"}
  ]},
  {"key":"I will not…","jp":"〜しません","scenes":[
    {"emoji":"🍬","sentence":"I will not eat candy.","jp":"キャンディは食べません。","hint":"Swipe away.","action":"spin"},
    {"emoji":"📺","sentence":"I will not watch TV now.","jp":"今はテレビを見ません。","hint":"Tap TV.","action":"jump"},
    {"emoji":"😡","sentence":"I will not be angry.","jp":"怒りません。","hint":"Tap calm.","action":"jump"}
  ]}
];

const screen   = document.getElementById('screen');
const btnJP    = document.getElementById('btnJP');
const btnSpeak = document.getElementById('btnSpeak');
const btnSlow  = document.getElementById('btnSlow');

btnJP.addEventListener('click', ()=>{
  STATE.jpOn = !STATE.jpOn;
  btnJP.textContent = 'JP サポート: ' + (STATE.jpOn ? 'ON' : 'OFF');
  renderCurrent();
});

btnSpeak.addEventListener('click', ()=> speakCurrent(false));
btnSlow .addEventListener('click', ()=> speakCurrent(true));

function speak(text, lang='en', slow=false) {
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang  = (lang==='jp') ? 'ja-JP' : 'en-US';
  utter.rate  = slow ? 0.8 : 1.0;
  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
}

function speakCurrent(slow) {
  if (STATE.step===1) {
    const p = DATA[STATE.patternIndex];
    const s = p.scenes[STATE.sceneIndex];
    speak(s.sentence, 'en', slow);
    if (STATE.jpOn) setTimeout(()=> speak(s.jp, 'jp', slow), 800);
  } else if (STATE.step===0) {
    speak('Choose a pattern', 'en', slow);
    if (STATE.jpOn) setTimeout(()=> speak('文型をえらんでね', 'jp', slow), 600);
  }
}

// Screens
function renderHome() {
  STATE.step = 0;
  screen.innerHTML = `
    <div class="card">
      <div class="big">Hello! Let’s learn English!</div>
      <p class="jp">JPサポートをONにすると日本語も表示されます。</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px;">
        <button class="primary" onclick="renderList()">学習スタート</button>
        <button class="ghost"   onclick="renderList()">文型リスト</button>
        <button class="accent"  onclick="renderReward()">ごほうび</button>
      </div>
    </div>
  `;
}

function renderList() {
  STATE.step = 0;
  let html = '<div class="card"><div class="big">文型をえらんでね！</div></div>';
  html += '<div class="card-grid">';
  DATA.forEach((p, idx)=>{
    html += `
    <div class="card">
      <div class="big">${p.key}</div>
      ${STATE.jpOn ? `<div class="jp">${p.jp}</div>` : ''}
      <button class="primary" onclick="startLesson(${idx})">これにする</button>
    </div>`;
  });
  html += '</div>';
  screen.innerHTML = html;
}

function startLesson(i) {
  STATE.patternIndex = i;
  STATE.sceneIndex   = 0;
  renderLesson();
}

function renderLesson() {
  STATE.step = 1;
  const p = DATA[STATE.patternIndex];
  const s = p.scenes[STATE.sceneIndex];
  screen.innerHTML = `
    <div class="card">
      <div class="big">${p.key}</div>
      ${STATE.jpOn ? `<div class="jp">${p.jp}</div>` : ''}
      <div class="jp">例：${STATE.jpOn ? s.jp : ''}</div>
      <div style="margin-top:8px; display:flex; gap:8px;">
        <button class="ghost" onclick="speak('${s.sentence.replace("'","\\'")}', 'en', false)">🔊 発音</button>
        <button class="ghost" onclick="speak('${s.sentence.replace("'","\\'")}', 'en', true)">🐢 ゆっくり</button>
      </div>
    </div>
    <div class="scene">
      <div id="actor" class="actor">${s.emoji}</div>
      <div class="hint">${s.hint}</div>
      <div class="confetti" id="confetti"></div>
    </div>
    <div class="nav">
      <button class="ghost"   onclick="renderList()">◁ もどる</button>
      <div class="progress">${dots(STATE.sceneIndex)}</div>
      <button id="btnNext" class="primary" onclick="toQuiz()" disabled>次へ▷</button>
    </div>
    <div class="recorder" style="margin-top:10px;">
      <button class="accent" onclick="speak('${s.sentence.replace("'","\\'")}', 'en', false)">まねして言おう</button>
      <div class="status">声まねは評価しません（楽しんでね）</div>
    </div>
  `;
  const actor = document.getElementById('actor');
  actor.addEventListener('click', ()=>{
    actor.classList.add(s.action);
    celebrate();
    speak(s.sentence, 'en', false);
    if (STATE.jpOn) setTimeout(()=> speak(s.jp, 'jp', false), 800);
    document.getElementById('btnNext').disabled = false;
    setTimeout(()=> actor.classList.remove(s.action), 900);
  });
}

function dots(i) {
  const arr = [0,1,2];
  return arr.map((d)=> `<div class="dot ${d<=i? 'on':''}"></div>`).join('');
}

function celebrate() {
  const cf = document.getElementById('confetti');
  if (!cf) return;
  cf.innerHTML = '';
  for (let i=0;i<20;i++) {
    const sp = document.createElement('span');
    sp.style.left = Math.random()*90 + '%';
    sp.style.background = ['#FFB703','#4C9EEB','#2ec4b6','#ef476f'][Math.floor(Math.random()*4)];
    cf.appendChild(sp);
  }
  setTimeout(()=> cf.innerHTML='', 1200);
}

function toQuiz() {
  STATE.step = 2;
  const p = DATA[STATE.patternIndex];
  const s = p.scenes[STATE.sceneIndex];
  const wrong = s.sentence
    .replace("Can I ",       "I can ")
    .replace("Let's not ",   "Let's ")
    .replace("I'm going to ","I go to ")
    .replace("Is there ",    "There is ")
    .replace("Are you ready ","You are ready ")
    .replace("What kind of ","What ")
    .replace("When can I ",  "I can ")
    .replace("How can I ",   "I can ")
    .replace("I'm sorry for ","I am sorry ")
    .replace("I don't know ","I know ")
    .replace("It makes me ", "It is ")
    .replace("I will not ",  "I will ");
  screen.innerHTML = `
    <div class="card">
      <div class="big">クイズ</div>
      <div class="jp">正しい英語をえらぼう</div>
    </div>
    <div class="card">
      <div style="font-size:1.2rem; margin-bottom:8px;">場面：${s.emoji} ${STATE.jpOn ? '（'+s.jp+'）' : ''}</div>
      <div style="display:flex; flex-direction:column; gap:8px;">
        <button class="ghost" onclick="answer(true)">${s.sentence}</button>
        <button class="ghost" onclick="answer(false)">${wrong}</button>
      </div>
    </div>
    <div class="nav">
      <button class="ghost" onclick="renderLesson()">◁ レッスンへ</button>
      <div></div><div></div>
    </div>
  `;
}

function answer(correct) {
  if (correct) {
    celebrate();
    speak('Great job!', 'en', false);
    if (STATE.jpOn) setTimeout(()=> speak('すごい！', 'jp', false), 500);
    STATE.stamps++;
    setTimeout(()=> nextScene(), 1000);
  } else {
    speak('Try again', 'en', false);
    if (STATE.jpOn) setTimeout(()=> speak('もういちど', 'jp', false), 500);
  }
}

function nextScene() {
  const p = DATA[STATE.patternIndex];
  if (STATE.sceneIndex < p.scenes.length - 1) {
    STATE.sceneIndex++;
    renderLesson();
  } else {
    renderReward();
  }
}

function renderReward() {
  STATE.step = 3;
  screen.innerHTML = `
    <div class="card">
      <div class="big">ごほうび</div>
      <div class="jp">スタンプをえらぼう（いま：${STATE.stamps}コ）</div>
      <div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:8px;">
        ${['⭐','🐶','🎈','🌈','🍀','🍎','🚀','🎵'].map(e=>`<div style="font-size:2.2rem">${e}</div>`).join('')}
      </div>
      <div style="margin-top:12px; display:flex; gap:8px;">
        <button class="primary" onclick="renderList()">つづける</button>
        <button class="ghost"   onclick="renderHome()">ホームへ</button>
      </div>
    </div>
  `;
}

function renderCurrent() {
  if (STATE.step===1) renderLesson();
  else if (STATE.step===2) toQuiz();
  else if (STATE.step===3) renderReward();
  else renderHome();
}

// Service Worker登録（相対パスで同階層）
if ('serviceWorker' in navigator) {
  window.addEventListener('load', ()=>{
    navigator.serviceWorker.register('./sw.js');
  });
}

// Init
renderHome();
