/* Smooth scroll */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    e.preventDefault();
    const el=document.querySelector(a.getAttribute('href'));
    if(el) el.scrollIntoView({behavior:'smooth'});
  });
});

/* Theme with persistence */
const themeBtn=document.getElementById('theme-toggle');
const savedTheme=localStorage.getItem('theme');
if(savedTheme==='dark'){ document.body.classList.add('dark'); themeBtn.textContent='☀️'; }
themeBtn.addEventListener('click',()=>{
  document.body.classList.toggle('dark');
  const isDark=document.body.classList.contains('dark');
  themeBtn.textContent=isDark?'☀️':'🌙';
  localStorage.setItem('theme',isDark?'dark':'light');
});

/* Name preference (state) */
const greetName=document.getElementById('greet-name');
const nameInput=document.getElementById('name-input');
const saveName=document.getElementById('save-name');
const clearName=document.getElementById('clear-name');
const nameFeedback=document.getElementById('name-feedback');

function applyName(n){ greetName.textContent = n && n.trim()? n.trim() : 'there'; }
applyName(localStorage.getItem('username')||'');
saveName.addEventListener('click',()=>{
  const v=nameInput.value.trim();
  localStorage.setItem('username',v); applyName(v);
  nameFeedback.textContent=v?'Saved!':'Name cleared.'; setTimeout(()=>nameFeedback.textContent='',1200);
});
clearName.addEventListener('click',()=>{ localStorage.removeItem('username'); nameInput.value=''; applyName(''); });

/* Simulated login state */
const loginBtn=document.getElementById('login-toggle');
const loginStateSpan=document.getElementById('login-state');
function applyLoginState(){
  const loggedIn=localStorage.getItem('loggedIn')==='true';
  loginBtn.textContent=loggedIn?'Logout':'Login';
  loginStateSpan.textContent=`Status: ${loggedIn?'Logged in':'Logged out'}`;
}
applyLoginState();
loginBtn.addEventListener('click',()=>{
  const loggedIn=localStorage.getItem('loggedIn')==='true';
  localStorage.setItem('loggedIn', String(!loggedIn));
  applyLoginState();
});

/* Time-on-site timer */
const timerEl=document.getElementById('timer');
let seconds=0;
setInterval(()=>{
  seconds++;
  const m=String(Math.floor(seconds/60)).padStart(2,'0');
  const s=String(seconds%60).padStart(2,'0');
  timerEl.textContent=`${m}:${s}`;
},1000);

/* Projects: level filter + show/hide + collapsible */
const levelSelect=document.getElementById('level-select');
const projectsContainer=document.getElementById('projects-container');
const projectsEmpty=document.getElementById('projects-empty');
const toggleProjects=document.getElementById('toggle-projects');
const projectCards=[...document.querySelectorAll('.project-card')];

function applyProjectLevel(){
  const level=levelSelect.value;
  let count=0;
  projectCards.forEach(card=>{
    const match= level==='all' || card.dataset.level===level;
    card.style.display= match? '' : 'none';
    if(match) count++;
  });
  projectsEmpty.classList.toggle('hidden', count>0);
}
levelSelect.addEventListener('change', applyProjectLevel);
applyProjectLevel();

toggleProjects.addEventListener('click',()=>{
  const hidden=projectsContainer.style.display==='none';
  projectsContainer.style.display= hidden? '' : 'none';
  toggleProjects.textContent= hidden? 'Hide Projects' : 'Show Projects';
  projectsEmpty.style.display= hidden? '' : 'none';
});

document.querySelectorAll('.project-toggle').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const expanded=btn.getAttribute('aria-expanded')==='true';
    btn.setAttribute('aria-expanded', String(!expanded));
  });
});

/* GitHub API: list repos with sort+filter+error+retry */
const ghInput=document.getElementById('gh-user');
const loadBtn=document.getElementById('load-repos');
const reposState=document.getElementById('repos-state');
const reposList=document.getElementById('repos-list');
const reposEmpty=document.getElementById('repos-empty');
const sortSelect=document.getElementById('sort-select');
const langFilter=document.getElementById('lang-filter');

let reposData=[];

async function fetchRepos(){
  const user=(ghInput.value||'EyadShahat').trim();
  reposState.textContent='Loading…';
  reposList.innerHTML=''; reposEmpty.classList.add('hidden'); langFilter.innerHTML='<option value="all">All Languages</option>';
  try{
    const res=await fetch(`https://api.github.com/users/${encodeURIComponent(user)}/repos?per_page=100&sort=updated`,{cache:'no-store'});
    if(!res.ok) throw new Error('Failed to fetch repositories');
    const data=await res.json();
    reposData=data.map(r=>({
      name:r.name, html_url:r.html_url, stargazers_count:r.stargazers_count,
      language:r.language||'Other', updated_at:r.updated_at
    }));
    buildLanguageFilter(reposData);
    renderRepos();
    reposState.textContent=`Showing repositories for ${user}`;
  }catch(err){
    reposState.innerHTML=`Couldn’t load repos. <button id="retry-repos" class="linklike">Retry</button>`;
    document.getElementById('retry-repos')?.addEventListener('click', fetchRepos);
  }
}

function buildLanguageFilter(list){
  const langs=[...new Set(list.map(r=>r.language))].sort();
  langs.forEach(l=>{
    const opt=document.createElement('option'); opt.value=l; opt.textContent=l; langFilter.appendChild(opt);
  });
}

function renderRepos(){
  const sort=sortSelect.value;
  const lang=langFilter.value;
  let arr=[...reposData];

  if(lang!=='all') arr=arr.filter(r=>r.language===lang);

  arr.sort((a,b)=>{
    if(sort==='updated') return new Date(b.updated_at)-new Date(a.updated_at);
    if(sort==='stars') return b.stargazers_count-a.stargazers_count;
    return a.name.localeCompare(b.name);
  });

  reposList.innerHTML='';
  arr.forEach(r=>{
    const card=document.createElement('div'); card.className='repo-card reveal in-view';
    card.innerHTML=`
      <h4><a href="${r.html_url}" target="_blank" rel="noopener">${r.name}</a></h4>
      <div class="repo-meta">
        <span>★ ${r.stargazers_count}</span>
        <span>${r.language}</span>
        <span>Updated: ${new Date(r.updated_at).toLocaleDateString()}</span>
      </div>`;
    reposList.appendChild(card);
  });

  reposEmpty.classList.toggle('hidden', arr.length>0);
  if(arr.length===0) reposState.textContent='No repositories match your filters.';
}

loadBtn.addEventListener('click', fetchRepos);
sortSelect.addEventListener('change', renderRepos);
langFilter.addEventListener('change', renderRepos);

/* Contact form validation */
const form=document.getElementById('contact-form');
const formName=document.getElementById('name');
const formEmail=document.getElementById('email');
const formMsg=document.getElementById('message');
const nameErr=document.getElementById('name-error');
const emailErr=document.getElementById('email-error');
const msgErr=document.getElementById('message-error');
const formStatus=document.getElementById('form-status');

const validEmail=v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

form.addEventListener('submit',e=>{
  e.preventDefault();
  let ok=true;

  if(!formName.value.trim()){ nameErr.textContent='Please enter your name.'; ok=false; } else nameErr.textContent='';
  if(!validEmail(formEmail.value.trim())){ emailErr.textContent='Please enter a valid email.'; ok=false; } else emailErr.textContent='';
  if(!formMsg.value.trim()){ msgErr.textContent='Please enter a message.'; ok=false; } else msgErr.textContent='';

  if(!ok){ formStatus.textContent=''; return; }

  formStatus.textContent='Sending…';
  setTimeout(()=>{ formStatus.textContent='✅ Message sent (demo). Thanks!'; form.reset(); },700);
});

/* Reveal on scroll */
const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('in-view'); io.unobserve(e.target); }
  });
},{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
