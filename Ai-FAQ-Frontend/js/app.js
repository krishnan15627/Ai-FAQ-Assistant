const medicines = [
  {id:"paracetamol",name:"Paracetamol",generic:"Acetaminophen",category:"Pain Relief",description:"General information about a commonly used medicine for temporary pain and fever relief."},
  {id:"cetirizine",name:"Cetirizine",generic:"Cetirizine hydrochloride",category:"Allergy",description:"General information about an antihistamine used for common allergy symptoms."},
  {id:"metformin",name:"Metformin",generic:"Metformin hydrochloride",category:"Diabetes",description:"Educational information about a medicine commonly discussed in type 2 diabetes care."},
  {id:"amlodipine",name:"Amlodipine",generic:"Amlodipine besylate",category:"Blood Pressure",description:"General medicine information related to high blood pressure management."},
  {id:"omeprazole",name:"Omeprazole",generic:"Omeprazole",category:"Digestive Health",description:"Educational information about a medicine that reduces stomach acid."},
  {id:"salbutamol",name:"Salbutamol",generic:"Albuterol",category:"Respiratory Health",description:"General information about a medicine used in respiratory care plans."}
];

const faqs = [
  {id:"what-is-fever",question:"What is fever?",category:"General Health",answer:"Fever is a temporary rise in body temperature and is often part of the body’s response to an illness. Rest, fluids, and monitoring may be helpful, but persistent or concerning symptoms should be discussed with a qualified healthcare professional."},
  {id:"blood-pressure",question:"What do blood pressure numbers mean?",category:"Blood Pressure",answer:"A blood pressure reading has two numbers. The top number is systolic pressure, while the bottom number is diastolic pressure. A healthcare professional can interpret readings in the context of your health."},
  {id:"allergy-symptoms",question:"What are common allergy symptoms?",category:"Allergy",answer:"Common symptoms may include sneezing, an itchy or runny nose, watery eyes, or a skin reaction. Severe breathing difficulty or swelling requires urgent medical attention."},
  {id:"dehydration",question:"How can I recognize dehydration?",category:"General Health",answer:"Common signs can include thirst, dry mouth, darker urine, fatigue, or dizziness. Symptoms vary, and severe dehydration requires prompt medical care."},
  {id:"vitamins",question:"Do I need a daily vitamin supplement?",category:"Vitamins",answer:"Nutritional needs vary. A balanced diet is usually the first source of nutrients. Discuss supplements with a qualified professional, especially if you take medicines."}
];

const categories = [
  ["General Health","Everyday health information and wellbeing guidance."],
  ["Fever","Understand fever, monitoring, and general safety signs."],
  ["Pain Relief","Educational information on common pain relief options."],
  ["Diabetes","General information about diabetes and ongoing care."],
  ["Blood Pressure","Learn about readings and heart-health concepts."],
  ["Respiratory Health","Information about breathing and respiratory health."],
  ["Digestive Health","Accessible information about digestive wellbeing."],
  ["Allergy","Common triggers, symptoms, and general information."],
  ["Skin Care","Learn about common skin health topics."],
  ["Medical Tests","Understand common tests and what they measure."],
  ["Vitamins & Supplements","General information about vitamins and supplements."]
];

const $ = (s) => document.querySelector(s);
const app = $("#app");

function toast(message, error=false) {
  const el=$("#toast"); el.textContent=message; el.className=`toast show ${error?"error":""}`;
  setTimeout(()=>el.className="toast",2800);
}

function icon(name){ return ({
  heart:"♥", bot:"✦", search:"⌕", menu:"☰", arrow:"→", back:"←", user:"◉",
  book:"▣", pill:"●", shield:"◇", dashboard:"▦", logout:"↪", check:"✓"
}[name]||"•"); }

function header() {
  const user=getUser();
  return `<header class="topbar">
    <a class="brand" href="#/"><span class="brand-mark">${icon("heart")}</span><span>Health<span class="brand-accent">FAQ</span></span></a>
    <nav class="navlinks">
      <a href="#/medicines">Medicines</a><a href="#/faqs">FAQs</a><a href="#/categories">Categories</a><a href="#/ai-assistant">AI Assistant</a>
    </nav>
    <div class="nav-actions">
      ${user ? `<a class="user-pill" href="#/dashboard">${escapeHtml(user.name||user.email||"Account")}</a><button class="btn ghost small" id="logoutBtn">Logout</button>` : `<a class="btn ghost small" href="#/login">Sign in</a><a class="btn primary small" href="#/register">Create account</a>`}
    </div>
  </header>`;
}
function footer(){return `<footer><div class="container footer-grid"><div><div class="brand"><span class="brand-mark">${icon("heart")}</span>Health<span class="brand-accent">FAQ</span></div><p>Clear, accessible educational health information.</p></div><div><b>Explore</b><a href="#/medicines">Medicines</a><a href="#/faqs">FAQs</a><a href="#/categories">Categories</a></div><div><b>Account</b><a href="#/login">Sign in</a><a href="#/register">Register</a><a href="#/ai-assistant">AI Assistant</a></div></div><div class="container footer-bottom">General information only. Not a substitute for professional care.</div></footer>`}

function shell(content){app.innerHTML=header()+`<main>${content}</main>`+footer(); bindGlobal();}

function bindGlobal(){
  $("#logoutBtn")?.addEventListener("click",()=>{logout();toast("Signed out");});
}

function home(){
 shell(`<section class="hero"><div class="container hero-grid"><div><span class="eyebrow">TRUSTED HEALTH INFORMATION</span><h1>Better health information starts with <span>better clarity.</span></h1><p class="lead">Explore clear educational information about medicines, common health questions, and everyday wellbeing.</p><div class="hero-actions"><a class="btn primary" href="#/faqs">Explore FAQs ${icon("arrow")}</a><a class="btn secondary" href="#/ai-assistant">${icon("bot")} Ask AI Assistant</a></div><div class="trust-row"><span>✓ Educational content</span><span>✓ Safety-first guidance</span><span>✓ Simple explanations</span></div></div><div class="hero-card"><div class="orb">${icon("heart")}</div><h3>Health information hub</h3><p>Find answers, browse medicines, or ask the AI assistant for a general educational overview.</p><div class="mini-stat"><b>${medicines.length}</b><span>medicine topics</span></div><div class="mini-stat"><b>${faqs.length}</b><span>common FAQs</span></div></div></div></section>
 <section class="section"><div class="container"><div class="section-head"><div><span class="eyebrow">EXPLORE</span><h2>Find what you need</h2></div></div><div class="feature-grid">
 <a class="feature-card" href="#/medicines"><span class="feature-icon">${icon("pill")}</span><h3>Medicines</h3><p>Browse general educational information about commonly discussed medicines.</p><span>Browse ${icon("arrow")}</span></a>
 <a class="feature-card" href="#/faqs"><span class="feature-icon">${icon("book")}</span><h3>FAQs</h3><p>Read concise answers to common health questions.</p><span>View FAQs ${icon("arrow")}</span></a>
 <a class="feature-card" href="#/ai-assistant"><span class="feature-icon">${icon("bot")}</span><h3>AI Assistant</h3><p>Ask a general health information question and receive a backend-powered answer.</p><span>Ask AI ${icon("arrow")}</span></a>
 </div></div></section>`);
}

function auth(mode){
 const isLogin=mode==="login", isReg=mode==="register";
 shell(`<section class="auth-layout"><div class="auth-brand"><span class="eyebrow light">TRUSTED HEALTH INFORMATION</span><h1>${isLogin?"Welcome back":"Create your account"}</h1><p>${isLogin?"Sign in to continue to your health information hub.":"Start exploring clear medical information."}</p><small>General information only. Not a substitute for professional care.</small></div>
 <div class="auth-panel"><a class="backlink" href="#/">← Back to home</a><form class="card auth-card" id="authForm"><div class="auth-icon">${isLogin?icon("user"):icon("heart")}</div><h2>${isLogin?"Sign in":"Create your account"}</h2><p class="muted">${isLogin?"Use your registered email and password.":"Create an account to access the assistant."}</p>
 ${isReg?`<label>Name<input name="name" required placeholder="Enter your name"></label>`:""}<label>Email address<input name="email" type="email" required placeholder="you@example.com"></label><label>Password<input name="password" type="password" required minlength="6" placeholder="Enter your password"></label>
 ${isReg?`<label>Confirm password<input name="confirm" type="password" required minlength="6" placeholder="Repeat your password"></label>`:""}
 <button class="btn primary full" type="submit">${isLogin?"Sign in":"Create account"} ${icon("arrow")}</button>
 <div id="authError" class="form-error"></div>
 <p class="center">${isLogin?`New here? <a href="#/register">Create an account</a>`:`Already have an account? <a href="#/login">Sign in</a>`}</p>
 </form></div></section>`);
 $("#authForm").addEventListener("submit",async e=>{
  e.preventDefault(); const fd=new FormData(e.currentTarget); const btn=e.currentTarget.querySelector("button"); btn.disabled=true; btn.textContent="Please wait…";
  try{
   const email=fd.get("email"), password=fd.get("password");
   if(isReg && password!==fd.get("confirm")) throw new Error("Passwords do not match");
   if(isReg) await register(fd.get("name"),email,password); else await login(email,password);
   toast(isLogin?"Login successful":"Account created"); location.hash="#/dashboard";
  }catch(err){$("#authError").textContent=err.message; toast(err.message,true); btn.disabled=false; btn.innerHTML=`${isLogin?"Sign in":"Create account"} ${icon("arrow")}`;}
 });
}

function listPage(type){
 const isMed=type==="medicines", items=isMed?medicines:faqs;
 shell(`<section class="page-hero"><div class="container"><span class="eyebrow">${isMed?"MEDICINE LIBRARY":"COMMON QUESTIONS"}</span><h1>${isMed?"Medicines":"Frequently Asked Questions"}</h1><p>${isMed?"Browse general educational information about commonly discussed medicines.":"Clear answers to common health information questions."}</p></div></section><section class="section"><div class="container"><div class="searchbar"><input id="filter" placeholder="Search ${isMed?"medicines":"questions"}…"><span>${icon("search")}</span></div><div id="items" class="content-grid"></div></div></section>`);
 function render(){
  const q=$("#filter").value.toLowerCase(); const found=items.filter(x=>(isMed?`${x.name} ${x.generic} ${x.category} ${x.description}`:`${x.question} ${x.category} ${x.answer}`).toLowerCase().includes(q));
  $("#items").innerHTML=found.map(x=>isMed?`<a class="card item-card" href="#/medicines/${x.id}"><span class="tag">${x.category}</span><h3>${x.name}</h3><p class="muted">${x.generic}</p><p>${x.description}</p><span class="link">View details ${icon("arrow")}</span></a>`:`<a class="card item-card" href="#/faqs/${x.id}"><span class="tag">${x.category}</span><h3>${x.question}</h3><p>${x.answer}</p><span class="link">Read answer ${icon("arrow")}</span></a>`).join("")||`<div class="empty card">No matching results.</div>`;
 }
 $("#filter").addEventListener("input",render); render();
}

function detail(type,id){
 const x=(type==="medicines"?medicines:faqs).find(v=>v.id===id);
 if(!x){shell(`<section class="section container"><div class="card empty"><h2>Not found</h2><a href="#/">Go home</a></div></section>`);return;}
 shell(`<section class="section"><div class="container narrow"><a class="backlink" href="#/${type}">← Back</a><article class="card detail-card"><span class="tag">${x.category}</span><h1>${type==="medicines"?x.name:x.question}</h1>${type==="medicines"?`<p class="subtitle">${x.generic}</p><h3>Overview</h3><p>${x.description}</p><div class="notice">Educational information only. Medicine decisions should be discussed with a qualified healthcare professional.</div>`:`<p>${x.answer}</p><div class="notice">If symptoms are severe, persistent, or concerning, seek appropriate professional care.</div>`}</article></div></section>`);
}

function categoriesPage(){
 shell(`<section class="page-hero"><div class="container"><span class="eyebrow">TOPICS</span><h1>Health categories</h1><p>Explore information grouped by common health topics.</p></div></section><section class="section"><div class="container content-grid">${categories.map((c,i)=>`<a class="card category-card" href="#/faqs"><div class="feature-icon">${["♥","◉","●","◆"][i%4]}</div><h3>${c[0]}</h3><p>${c[1]}</p><span class="link">Explore ${icon("arrow")}</span></a>`).join("")}</div></section>`);
}

function dashboard(){
 const user=getUser(); if(!user){location.hash="#/login";return;}
 shell(`<section class="section"><div class="container"><div class="dashboard-head"><div><span class="eyebrow">DASHBOARD</span><h1>Welcome, ${escapeHtml(user.name||"there")}</h1><p class="muted">Your health information hub.</p></div><a class="btn primary" href="#/ai-assistant">${icon("bot")} Ask AI</a></div><div class="stats-grid"><div class="stat card"><b>${medicines.length}</b><span>Medicine topics</span></div><div class="stat card"><b>${faqs.length}</b><span>FAQ topics</span></div><div class="stat card"><b>AI</b><span>Assistant available</span></div></div><div class="dashboard-grid"><div class="card"><h2>Quick access</h2><div class="quick-links"><a href="#/medicines">Browse medicines ${icon("arrow")}</a><a href="#/faqs">Read FAQs ${icon("arrow")}</a><a href="#/ai-assistant">Ask the AI assistant ${icon("arrow")}</a></div></div><div class="card"><h2>Account</h2><p><b>${escapeHtml(user.name||"User")}</b><br>${escapeHtml(user.email||"")}</p><button class="btn secondary" id="dashLogout">Sign out</button></div></div></div></section>`);
 $("#dashLogout").onclick=()=>{logout();toast("Signed out")};
}

function aiPage(){
 const user=getUser();
 shell(`<section class="section ai-section"><div class="container ai-wrap"><div class="ai-intro"><span class="eyebrow">AI ASSISTANT</span><h1>Ask a health information question.</h1><p>Get a general educational answer from your Node/Express backend. This assistant does not diagnose or prescribe.</p>${!user?`<div class="notice">Please <a href="#/login">sign in</a> first. The backend AI endpoint requires authentication.</div>`:""}</div><div class="card chat-card"><div id="chat" class="chat"><div class="message ai"><div class="avatar">✦</div><div><b>AI Assistant</b><p>Hello! I can help with general medical information. What would you like to learn about?</p></div></div></div><div class="suggestions"><button>What is fever?</button><button>How can I recognize dehydration?</button><button>What are common allergy symptoms?</button></div><form id="aiForm" class="chat-form"><input id="question" required placeholder="Ask a general health question…"><button class="btn primary" ${user?"":"disabled"}>Send ${icon("arrow")}</button></form><p class="disclaimer">Educational information only. Not a diagnosis or prescription.</p></div></div></section>`);
 const chat=$("#chat"), input=$("#question");
 document.querySelectorAll(".suggestions button").forEach(b=>b.onclick=()=>{input.value=b.textContent;input.focus()});
 $("#aiForm").addEventListener("submit",async e=>{
  e.preventDefault(); if(!user)return; const q=input.value.trim(); if(!q)return;
  chat.insertAdjacentHTML("beforeend",`<div class="message user"><div class="avatar">●</div><div><b>You</b><p>${escapeHtml(q)}</p></div></div>`);
  input.value=""; const send=e.currentTarget.querySelector("button"); send.disabled=true; send.textContent="Thinking…";
  const loading=document.createElement("div"); loading.className="message ai"; loading.innerHTML=`<div class="avatar">✦</div><div><b>AI Assistant</b><p>Thinking…</p></div>`;chat.appendChild(loading);chat.scrollTop=chat.scrollHeight;
  try{
   const result=await askAI(q);
   const answer=result?.data?.answer || result?.answer || result?.data?.text || result?.text || "The backend returned no answer text.";
   loading.querySelector("p").textContent=answer;
  }catch(err){loading.querySelector("p").textContent=err.message;toast(err.message,true);}
  send.disabled=false;send.textContent=`Send ${icon("arrow")}`;chat.scrollTop=chat.scrollHeight;
 });
}

function profile(){
 const u=getUser(); if(!u){location.hash="#/login";return;}
 shell(`<section class="section"><div class="container narrow"><span class="eyebrow">PROFILE</span><h1>My profile</h1><div class="card profile-card"><div class="avatar big">●</div><h2>${escapeHtml(u.name||"User")}</h2><p>${escapeHtml(u.email||"")}</p><div class="profile-actions"><a class="btn primary" href="#/dashboard">Dashboard</a><button class="btn secondary" id="profileLogout">Sign out</button></div></div></div></section>`);
 $("#profileLogout").onclick=()=>{logout();toast("Signed out")};
}

function adminPage(path){
 const u=getUser(); if(!u){location.hash="#/login";return;}
 shell(`<section class="section"><div class="container"><span class="eyebrow">MANAGEMENT</span><h1>${path.includes("reviewer")?"Reviewer":"Admin"} area</h1><p class="lead">This frontend is connected to the existing authentication system. Management actions can be connected to the corresponding backend routes when those routes are available.</p><div class="notice">Current backend routes verified for this frontend: authentication and AI assistant. This page intentionally does not invent API endpoints that are not present in the backend.</div><div class="stats-grid"><div class="stat card"><b>Auth</b><span>Connected</span></div><div class="stat card"><b>AI</b><span>Connected</span></div><div class="stat card"><b>FAQ</b><span>Public demo data</span></div></div></div></section>`);
}

function escapeHtml(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));}

function route(){
 const raw=location.hash.slice(1)||"/"; const parts=raw.split("/").filter(Boolean);
 if(raw==="/") home();
 else if(raw==="/login") auth("login");
 else if(raw==="/register") auth("register");
 else if(raw==="/forgot-password") auth("forgot");
 else if(raw==="/medicines") listPage("medicines");
 else if(parts[0]==="medicines"&&parts[1]) detail("medicines",parts[1]);
 else if(raw==="/faqs") listPage("faqs");
 else if(parts[0]==="faqs"&&parts[1]) detail("faqs",parts[1]);
 else if(raw==="/categories") categoriesPage();
 else if(raw==="/dashboard") dashboard();
 else if(raw==="/ai-assistant") aiPage();
 else if(raw==="/my-profile") profile();
 else if(raw.startsWith("/reviewer/")||raw.startsWith("/admin/")) adminPage(raw);
 else home();
}
window.addEventListener("hashchange",route);
window.addEventListener("load",route);
