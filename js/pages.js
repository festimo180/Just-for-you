
const $ = id => document.getElementById(id);
const readList = key => { try { return JSON.parse(localStorage.getItem(key) || "[]"); } catch (_) { return []; } };
const writeList = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch (_) {} };
const appendItems = (node, items, key, removeLabel) => {
  if (!node) return;
  node.replaceChildren();
  if (!items.length) { node.textContent = "Nothing saved here yet."; return; }
  items.forEach((item, i) => {
    const row = document.createElement("div"); row.className = "saved-item";
    const text = document.createElement("span"); text.textContent = item;
    row.appendChild(text);
    const remove = document.createElement("button"); remove.className = "secondary"; remove.textContent = removeLabel || "Remove";
    remove.addEventListener("click", () => { const next = readList(key); next.splice(i,1); writeList(key,next); appendItems(node,readList(key),key,removeLabel); });
    row.appendChild(remove); node.appendChild(row);
  });
};
try {
 const name = sessionStorage.getItem("velvetHeartsVisitor");
 if (name && $("welcomeLine")) $("welcomeLine").textContent = `Welcome back, ${name}. This little world is ready for you. ♡`;
} catch (_) {}
document.querySelectorAll("[data-reveal]").forEach(button => button.addEventListener("click", () => {
 const item = $(button.dataset.reveal); item.hidden = !item.hidden; button.textContent = item.hidden ? "Open again" : "Close message";
}));
if ($("saveMemory")) {
 $("addMemory").addEventListener("click", () => $("memoryInput").focus());
 $("saveMemory").addEventListener("click", () => {
  const value = $("memoryInput").value.trim(); if (!value) return;
  const list = readList("vhMemories"); list.unshift(value); writeList("vhMemories",list); $("memoryInput").value = ""; appendItems($("memoryBoard"),list,"vhMemories");
 });
 appendItems($("memoryBoard"),readList("vhMemories"),"vhMemories");
}
if ($("saveLetter")) $("saveLetter").addEventListener("click", () => {
 const v = $("ownLetter").value.trim(); if (!v) return;
 const list = readList("vhLetters"); list.unshift(v); writeList("vhLetters",list); $("ownLetter").value = ""; $("letterStatus").textContent = "Your letter was saved on this device. ♡";
});
const quotes = [
 ["Love looks not with the eyes, but with the mind.","William Shakespeare — A Midsummer Night's Dream"],
 ["I do love nothing in the world so well as you.","William Shakespeare — Much Ado About Nothing"],
 ["The course of true love never did run smooth.","William Shakespeare — A Midsummer Night's Dream"],
 ["Some people make ordinary moments feel unforgettable.","Original Velvet Hearts quote"],
 ["If I could give you one thing, it would be the chance to see yourself through my eyes.","Original Velvet Hearts quote"],
 ["May we always find reasons to laugh, memories to keep, and kindness to give.","Original Velvet Hearts quote"]
];
let qi = 0;
function showQuote() { if ($("quoteText")) { $("quoteText").textContent=quotes[qi][0]; $("quoteCredit").textContent=quotes[qi][1]; } }
if ($("nextQuote")) $("nextQuote").addEventListener("click",()=>{ qi=(qi+1)%quotes.length; showQuote(); });
if ($("saveQuote")) $("saveQuote").addEventListener("click",()=>{
 const v=quotes[qi][0]+" — "+quotes[qi][1]; const list=readList("vhQuotes"); if(!list.includes(v)) list.unshift(v); writeList("vhQuotes",list); appendItems($("favouriteQuotes"),list,"vhQuotes");
});
if ($("favouriteQuotes")) appendItems($("favouriteQuotes"),readList("vhQuotes"),"vhQuotes");
if ($("openQuestion")) $("openQuestion").addEventListener("click",()=>{ $("questionContent").hidden=false; $("openQuestion").hidden=true; });
if ($("answerYes")) $("answerYes").addEventListener("click",()=>{ $("questionResponse").textContent="A little moment worth remembering. ♡"; });
if ($("answerMaybe")) $("answerMaybe").addEventListener("click",()=>{ $("questionResponse").textContent="That's okay. Take your time — your feelings matter. ♡"; });
document.querySelectorAll("[data-quiz]").forEach(b=>b.addEventListener("click",()=>{
 $("quizFeedback").textContent=b.dataset.quiz==="right" ? "Correct! Trust, kindness, and communication matter. ♡" : "Try again! Think about what helps people feel safe and respected.";
}));
let flipped=[], matched=[];
function setupGame() {
 flipped=[]; matched=[];
 const board=$("heartGame"); if(!board) return;
 const values=["heart","star","star","heart"].sort(()=>Math.random()-.5);
 board.replaceChildren();
 values.forEach((v,i)=>{ const b=document.createElement("button"); b.textContent="?"; b.dataset.value=v; b.dataset.index=i;
 b.addEventListener("click",()=>{ if(flipped.includes(i)||matched.includes(i)||flipped.length===2)return; b.textContent=v==="heart"?"♡":"✧"; flipped.push(i);
 if(flipped.length===2) { const bs=[...board.children]; if(bs[flipped[0]].dataset.value===bs[flipped[1]].dataset.value){ matched.push(...flipped); flipped=[]; $("gameFeedback").textContent=matched.length===4?"You found every pair! ♡":"A match! Find the other pair."; }
 else setTimeout(()=>{ flipped.forEach(n=>bs[n].textContent="?"); flipped=[]; },650); }
 }); board.appendChild(b); });
 if($("gameFeedback")) $("gameFeedback").textContent="";
}
if($("heartGame")) setupGame();
if($("resetGame")) $("resetGame").addEventListener("click",setupGame);
const surprises=["You deserve kindness, always. ♡","Small moments can become beautiful memories.","You don't have to be perfect to be loved.","May something good find you today. ✨"];
if($("surpriseButton")) $("surpriseButton").addEventListener("click",()=>{ $("surpriseMessage").textContent=surprises[Math.floor(Math.random()*surprises.length)]; });
if($("musicToggle")) $("musicToggle").addEventListener("click",()=>{ alert("The music player will be connected as its own feature next."); });
