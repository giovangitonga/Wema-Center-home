(function(){
"use strict";

/* ===== THEME ===== */
var root=document.documentElement;
function applyTheme(t){ if(t){root.setAttribute('data-theme',t);} else {root.removeAttribute('data-theme');}
  var isDark = t==='dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches);
  var sun=document.getElementById('themeIconSun'), moon=document.getElementById('themeIconMoon');
  if(sun) sun.style.display = isDark?'none':'block';
  if(moon) moon.style.display = isDark?'block':'none';
}
function currentIsDark(){ var t=localStorage.getItem('wc_theme'); return t==='dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches); }
function toggleTheme(){ var next = currentIsDark() ? 'light' : 'dark'; localStorage.setItem('wc_theme', next); applyTheme(next); }
applyTheme(localStorage.getItem('wc_theme'));
document.querySelectorAll('.theme-toggle').forEach(function(b){ b.addEventListener('click', toggleTheme); });

/* ===== TOASTS ===== */
function toast(title,msg){
  var wrap=document.getElementById('toastWrap'); if(!wrap) return;
  var el=document.createElement('div'); el.className='toast';
  el.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13l4 4L19 7"/></svg><div><b>'+title+'</b>'+(msg?msg:'')+'</div>';
  wrap.appendChild(el);
  requestAnimationFrame(function(){ el.classList.add('show'); });
  setTimeout(function(){ el.classList.remove('show'); setTimeout(function(){ el.remove(); },350); },4200);
}
function flashButtonSuccess(btn, successText, revertHtml, ms){
  var orig = revertHtml!==undefined ? revertHtml : btn.innerHTML;
  btn.classList.add('btn-success');
  btn.innerHTML = '✓ '+successText;
  setTimeout(function(){ btn.classList.remove('btn-success'); btn.innerHTML = orig; }, ms||2200);
}
window.nwToast=toast; window.nwFlash=flashButtonSuccess;

/* ===== MOBILE NAV (event delegated + touch-safe) ===== */
var hamburger=document.getElementById('hamburger'), mobilePanel=document.getElementById('mobilePanel');
function closeMobilePanel(){ if(!hamburger||!mobilePanel) return; hamburger.classList.remove('open'); mobilePanel.classList.remove('show'); mobilePanel.setAttribute('aria-hidden','true'); document.body.style.overflow=''; }
function openMobilePanel(){ if(!hamburger||!mobilePanel) return; hamburger.classList.add('open'); mobilePanel.classList.add('show'); mobilePanel.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; }
if(hamburger && mobilePanel){
  hamburger.addEventListener('click', function(e){
    e.preventDefault();
    if(mobilePanel.classList.contains('show')) closeMobilePanel(); else openMobilePanel();
  });
  mobilePanel.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', closeMobilePanel); });
}
window.addEventListener('scroll', function(){ var nav=document.getElementById('siteNav'); if(nav) nav.classList.toggle('scrolled', window.scrollY>6); });

/* ===== COUNT UP ===== */
function runCountUps(){
  document.querySelectorAll('[data-count]').forEach(function(el){
    var end=parseInt(el.getAttribute('data-count'),10), dur=1100, t0=performance.now();
    function step(t){ var p=Math.min(1,(t-t0)/dur); el.textContent=Math.round(end*(1-Math.pow(1-p,3))); if(p<1) requestAnimationFrame(step); }
    requestAnimationFrame(step);
  });
}
runCountUps();

/* ===== POPUP BANNER ===== */
var popup=document.getElementById('popupBanner');
if(popup){
  if(!sessionStorage.getItem('wc_popup_dismissed')){ setTimeout(function(){ popup.classList.add('show'); },4000); }
  var pc=document.getElementById('popupClose'); if(pc) pc.addEventListener('click', function(){ popup.classList.remove('show'); sessionStorage.setItem('wc_popup_dismissed','1'); });
  var pcta=document.getElementById('popupCta'); if(pcta) pcta.addEventListener('click', function(){ popup.classList.remove('show'); sessionStorage.setItem('wc_popup_dismissed','1'); });
}

/* ===== DATA LAYER ===== */
var DB_KEYS={homes:'wc_homes',blog:'wc_blog',donations:'wc_donations',messages:'wc_messages',campaigns:'wc_campaigns'};

var IMG='assets/images/';

var seedHomes=[
  {name:'Wema Center', location:'Mombasa', capacity:20, age:'3–15', year:2019, color:'warn', img:IMG+'hero-mombasa.jpeg', alt:'Wema Center, a thatched-roof children\'s home on the Mombasa coast, with children playing outside', desc:'Our home on the Mombasa coast, with a strong focus on early years care and a resident nurse for the youngest children. Twenty children live here as one family, close to a public primary school and a government health facility. Currently raising funds for a solar power upgrade.'}
];

var seedBlog=[
  {title:"How school fees change a child's trajectory", tag:'Education', date:'2026-08-14', img:IMG+'blog1.jpeg', summary:'A term of fees is small money with a long reach — here is what it actually buys.', body:"When we cover a term of fees, we are not just buying a seat in a classroom. We are buying a child a place among peers who no longer ask why their uniform is different, a teacher who expects them to show up for the exam, and a school-leaving certificate that opens the next door. Last November, all five of our Form Four candidates sat their KCSE exams — a first for Wema Center since we opened our doors in Mombasa. Two of them, Faith and Kevin, are now waiting on university placement letters. Their house mother, Mama Grace, keeps their exam timetables pinned to the kitchen wall next to the younger children's — a small, deliberate reminder of what is possible. We are budgeting KES 400,000 for the 2026 school fees fund; as of this month we are just over 80% of the way there."},
  {title:'Learning a trade at Wema Center', tag:'Our home', date:'2026-06-02', img:IMG+'blog2.webp', summary:'A workshop, not just a dormitory — tailoring and computer skills for teens close to leaving care.', body:"Our vocational corner was set up with a different brief from the rest of the home: it is built for teenagers who are close to ageing out of care, with four sewing machines and a small computer lab donated by a Mombasa tech firm. Six of our older teens use it every week. Three are already earning small amounts from tailoring jobs taken on through a local cooperative, and one, nineteen-year-old Peter, recently completed a two-month apprenticeship at a workshop in Changamwe. House father Daniel Kiptoo says the goal isn't just a trade — it's proving to a seventeen-year-old that someone still believes they have a future worth training for."},
  {title:'Why family reunification matters', tag:'Family care', date:'2026-04-19', img:IMG+'blog3.jpeg', summary:'A home is not always the end goal — sometimes it is a bridge back.', body:"Not every child who comes to us has lost their family entirely. Some have a grandmother two counties over, or a father working away who did not know where else to turn. Our two social workers, Samuel Otieno and Winnie Adhiambo, spend as much time tracing and supporting extended family — in Mombasa, Kwale, Kilifi and beyond — as they do running daily life at the home. In 2025, six children returned safely to relatives after a home assessment and safety plan, with our team continuing home visits and a small monthly stipend for a year after each reunification. It is quieter work than opening a new home, but it is often the better outcome for the child."},
  {title:'Volunteer spotlight: Faith, weekend reading club', tag:'Volunteers', date:'2026-02-27', img:IMG+'blog4.jpeg', summary:'Two years of Saturday mornings, one shelf of borrowed books.', body:"Faith Njeri started visiting Wema Center on Saturday mornings in 2024 with a bag of secondhand books from a Mombasa charity shop. Two years on, her reading club is staffed by a rotating group of eleven volunteers and has its own small library corner at the home. She says the only rule is that every child picks their own book — no assigned reading. \"The point isn't literacy scores,\" she says, \"it's giving a nine-year-old the experience of choosing something for himself and finishing it.\""},
  {title:'Inside a home visit: what our social workers actually do', tag:'Family care', date:'2026-01-15', img:IMG+'blog5.webp', summary:"A day with Winnie Adhiambo, tracing a child's extended family in rural Kwale.", body:"Most people picture a social worker's job as paperwork. Winnie Adhiambo's week looks more like this: a boda boda ride to a village two hours outside Mombasa to interview a grandmother about taking in her grandson; an afternoon at the sub-county children's office confirming a placement is safe; an evening call to a teacher checking a child's attendance has stabilised. Every reunification case takes an average of four months of this kind of unglamorous, essential legwork before a child ever moves. We currently have two active reunification cases."},
  {title:'Our 2025 annual report, in six numbers', tag:'Transparency', date:'2025-12-10', img:IMG+'blog6.jpeg', summary:'A short, honest look at where the money went last year.', body:"Every December we publish a plain-language summary before the full audited report is ready. In 2025: 20 children were in our care across the year, 31 have graduated Form Four since 2015, KES 11.8 million was spent on the home and its programs, 62% of that went to direct care (food, housing, clothing), 6 children were safely reunified with family, and we ended the year with three months of operating reserve — our board's minimum target. The full audited accounts are available to any donor on request."}
];

var seedCampaigns=[
  {name:'New dormitory — Wema Center', goal:1800000, raised:1224000, img:IMG+'campaign-dormitory.jpeg'},
  {name:'Solar power upgrade — Wema Center', goal:650000, raised:260000, img:IMG+'campaign-solar.jpeg'},
  {name:'School fees fund, 2026', goal:400000, raised:328000, img:IMG+'campaign-fees.jpeg'}
];

var seedFaqs=[
  {q:'How does a child come into your care?', a:'Almost always through a referral from a county children\'s officer, a police child protection unit, or a chief\'s office — never a walk-in placement. Every admission is assessed and approved by a government children\'s officer before a child moves into Wema Center.'},
  {q:'Are donations tax deductible?', a:'Wema Center is registered with the Kenya NGO Coordination Board as a charitable trust. Kenyan taxpayers can claim relief on donations under the Income Tax Act; we issue an official donation receipt for every gift on request.'},
  {q:'Can I visit the home?', a:'Yes, with two weeks\' notice so we can arrange it without disrupting the children\'s school and routine. Call us on +254 713 199 200 or email giovan.gitonga@akamom.org to book. Visits are supervised by a staff member and follow our child safeguarding policy — we do not allow unaccompanied contact with children.'},
  {q:'How is my donation actually spent?', a:'On average 62% goes directly to care (food, housing, clothing), 20% to education, 10% to healthcare and 8% to operations. Sponsors and recurring donors receive a termly update; all donors can request the full audited annual report.'},
  {q:'Can I adopt a child from Wema Center?', a:'Adoption in Kenya is handled entirely through the Children\'s Court and registered adoption societies, not directly by children\'s homes. We support family reunification as our first option, and refer serious adoption enquiries to the relevant government process.'},
  {q:'What happens when a young person turns 18?', a:'We run an aftercare program for two years past 18 — help finding housing, continued contact with a social worker, and for many, ongoing vocational support through our tailoring and computer training. No young person leaves with nothing.'}
];

var galleryItems=[
  {img:IMG+'blog5.webp', alt:'Children lined up for morning assembly in the courtyard, with the Kenyan flag', cap:'Morning assembly at Wema Center — every school day begins together in the courtyard.'},
  {img:IMG+'garden.webp', alt:'Children tending rows of vegetables in the kitchen garden', cap:'The kitchen garden at Wema Center, tended by the children on weekends.'},
  {img:IMG+'blog2.webp', alt:'Two teens at sewing machines in the tailoring corner', cap:'The tailoring corner, mid-apprenticeship.'},
  {img:IMG+'gallery1.jpg', alt:'Children reading books on a mat under a mango tree', cap:"Reading club, Saturday morning — Faith's volunteer program, always under the mango tree."},
  {img:IMG+'gallery2.jpeg', alt:'Children seated at a long table for a meal', cap:'Meal time at Wema Center — three meals a day, cooked on site.'},
  {img:IMG+'gallery3.jpg', alt:'Children playing football and building sandcastles on a Mombasa beach', cap:'A weekend outing to the beach — sand, sea and a lot of football.'}
];

var programs=[
  {t:'Shelter & family care', d:'Small house units led by trained house parents, not institutional wards.', i:'M4 11l8-7 8 7M6 10v9h12v-9'},
  {t:'Education support', d:'School fees, uniforms, books and homework mentoring through to Form Four.', i:'M4 6h16M4 12h16M4 18h10'},
  {t:'Healthcare & nutrition', d:'On-site first aid, clinic partnerships, and three balanced meals a day.', i:'M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 5.65-7 10-7 10z'},
  {t:'Psychosocial support', d:'A resident social worker at the home, plus group and individual counselling.', i:'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.42-4.03 8-9 8-1.5 0-2.9-.3-4.1-.85L3 20l1.05-3.5A7.9 7.9 0 0 1 3 12c0-4.42 4.03-8 9-8s9 3.58 9 8z'},
  {t:'Vocational & life skills', d:'Tailoring, computer and life-skills training for teens nearing 18.', i:'M14.7 6.3a1 1 0 0 1 1.4 0l1.6 1.6a1 1 0 0 1 0 1.4L9 17H6v-3l7.7-7.7zM13 8l3 3'},
  {t:'Family reunification', d:'Tracing safe relatives and supporting the household for a year after return.', i:'M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75'},
  {t:'Emergency intake & assessment', d:'A 24-hour intake line with Mombasa County officers, and a full needs assessment within 48 hours of arrival.', i:'M12 9v4M12 17h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z'},
  {t:'Alumni & aftercare', d:'Two years of housing help and social-worker contact for every young person past 18.', i:'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z'}
];

var timelineItems=[
  {y:'2015', h:'Three children, one Mombasa teacher', d:'Everlyn Chebet takes in three siblings she finds sleeping outside her classroom and fosters them in her own house.'},
  {y:'2017', h:'A rented house and our first school partnership', d:'Wema Center moves into a rented four-room house in Mombasa, and we sign our first formal partnership with a public primary school.'},
  {y:'2019', h:'Wema Center opens, with a resident nurse', d:'Our own home opens on the Mombasa coast, with our first full-time on-site healthcare role.'},
  {y:'2021', h:'Vocational training begins', d:'Sewing and basic computer classes start at Wema Center for teens preparing to leave care.'},
  {y:'2023', h:'Family reunification program formalised', d:'A dedicated reunification team is set up to trace relatives and support children returning home.'},
  {y:'2026', h:'Today: one home, twenty children', d:'Five partner schools, fourteen staff, and our first cohort of vocational graduates entering apprenticeships.'}
];

function loadDB(key, seed){ var raw=localStorage.getItem(key); if(raw){ try{ return JSON.parse(raw); }catch(e){} } localStorage.setItem(key, JSON.stringify(seed)); return JSON.parse(JSON.stringify(seed)); }
function saveDB(key, data){ localStorage.setItem(key, JSON.stringify(data)); }
window.nwDB={keys:DB_KEYS, load:loadDB, save:saveDB};

var homes=loadDB(DB_KEYS.homes, seedHomes);
var blogPosts=loadDB(DB_KEYS.blog, seedBlog);
var donations=loadDB(DB_KEYS.donations, []);
var messages=loadDB(DB_KEYS.messages, []);
var campaigns=loadDB(DB_KEYS.campaigns, seedCampaigns);
window.nwState={homes:homes, blogPosts:blogPosts, donations:donations, messages:messages, campaigns:campaigns};

/* ===== illustrated art helpers ===== */
function homeArtSvg(color, variant){
  var v=variant%3;
  var scene = v===0
    ? '<path d="M0 170 L110 90 L220 170 Z" fill="var(--surface)" opacity=".9"/><path d="M140 190 L250 110 L400 200 L400 225 L140 225 Z" fill="var(--surface)" opacity=".65"/><circle cx="120" cy="150" r="14" fill="var(--'+color+')"/><circle cx="150" cy="150" r="14" fill="var(--accent)"/>'
    : v===1
    ? '<rect x="40" y="90" width="140" height="120" rx="8" fill="var(--surface)" opacity=".9"/><path d="M30 92 L110 40 L190 92 Z" fill="var(--surface)" opacity=".9"/><circle cx="260" cy="150" r="46" fill="var(--surface)" opacity=".55"/><circle cx="105" cy="150" r="13" fill="var(--'+color+')"/><circle cx="135" cy="160" r="10" fill="var(--accent)"/>'
    : '<rect x="60" y="80" width="120" height="130" rx="10" fill="var(--surface)" opacity=".9"/><rect x="200" y="110" width="150" height="100" rx="10" fill="var(--surface)" opacity=".65"/><circle cx="110" cy="150" r="13" fill="var(--accent)"/><circle cx="270" cy="160" r="13" fill="var(--'+color+')"/>';
  return '<svg viewBox="0 0 400 225" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"><rect width="400" height="225" fill="var(--'+color+'-tint)"/>'+scene+'<circle cx="340" cy="50" r="24" fill="var(--'+color+')" opacity=".45"/></svg>';
}
function blogArtSvg(seed){
  var hues=['primary','accent','warn']; var c=hues[seed%3];
  return '<svg viewBox="0 0 300 150" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"><rect width="300" height="150" fill="var(--'+c+'-tint)"/><circle cx="60" cy="90" r="34" fill="var(--'+c+')" opacity=".8"/><rect x="130" y="40" width="140" height="14" rx="7" fill="var(--surface)"/><rect x="130" y="64" width="110" height="10" rx="5" fill="var(--surface)" opacity=".7"/><rect x="130" y="82" width="120" height="10" rx="5" fill="var(--surface)" opacity=".7"/></svg>';
}
function galleryArtSvg(seed){
  var hues=['primary','accent','warn']; var c=hues[seed%3];
  var shapes=[
    '<circle cx="150" cy="120" r="60" fill="var(--'+c+')" opacity=".8"/><rect x="40" y="160" width="220" height="40" fill="var(--surface)" opacity=".8"/>',
    '<rect x="60" y="60" width="180" height="110" rx="16" fill="var(--surface)" opacity=".9"/><circle cx="110" cy="115" r="18" fill="var(--'+c+')"/><circle cx="160" cy="115" r="18" fill="var(--accent)"/><circle cx="210" cy="115" r="18" fill="var(--warn)"/>',
    '<path d="M40 200 Q150 60 260 200 Z" fill="var(--'+c+'-tint)"/><circle cx="150" cy="150" r="26" fill="var(--'+c+')"/>'
  ];
  return '<svg viewBox="0 0 300 225" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"><rect width="300" height="225" fill="var(--surface-2)"/>'+shapes[seed%3]+'</svg>';
}
function escAttr(t){ return String(t==null?'':t).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;'); }
function imgTag(src,alt){ return '<img src="'+escAttr(src)+'" alt="'+escAttr(alt)+'" loading="lazy" decoding="async">'; }
function homeVisual(h,i){ return h.img ? imgTag(h.img, h.alt||h.name) : homeArtSvg(h.color,i); }
function blogVisual(p,i){ return p.img ? imgTag(p.img,'') : blogArtSvg(i); }
function galleryVisual(g,i){ return g.img ? imgTag(g.img,g.alt||g.cap) : galleryArtSvg(i); }
function formatDate(iso){ var d=new Date(iso+'T00:00:00'); return d.toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'}); }

/* ===== PROGRAMS (programs.html) ===== */
if(document.getElementById('programsGrid')){
  document.getElementById('programsGrid').innerHTML = programs.map(function(p){
    return '<div class="program-card"><div class="icon"><svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="'+p.i+'"/></svg></div><h3>'+p.t+'</h3><p>'+p.d+'</p></div>';
  }).join('');
}

/* ===== TIMELINE (impact.html) ===== */
if(document.getElementById('timelineList')){
  document.getElementById('timelineList').innerHTML = timelineItems.map(function(t){ return '<div class="tl-item"><div class="tl-dot">'+t.y+'</div><h4>'+t.h+'</h4><p>'+t.d+'</p></div>'; }).join('');
}

/* ===== FAQ (faq.html) ===== */
if(document.getElementById('faqList')){
  document.getElementById('faqList').innerHTML = seedFaqs.map(function(f,i){
    return '<div class="faq-item" id="faq-'+i+'"><button class="faq-q" data-faq="'+i+'">'+f.q+'<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></button><div class="faq-a"><p>'+f.a+'</p></div></div>';
  }).join('');
  document.querySelectorAll('.faq-q').forEach(function(b){ b.addEventListener('click', function(){ document.getElementById('faq-'+b.getAttribute('data-faq')).classList.toggle('open'); }); });
}

/* ===== GALLERY (gallery.html) ===== */
if(document.getElementById('galleryGrid')){
  document.getElementById('galleryGrid').innerHTML = galleryItems.map(function(g,i){
    return '<div class="gallery-item"><div class="gallery-art">'+galleryVisual(g,i)+'</div><div class="gallery-cap">'+g.cap+'</div></div>';
  }).join('');
}

/* ===== HOMES (homes.html) ===== */
function renderHomes(){
  var grid=document.getElementById('homesGrid'); if(!grid) return;
  grid.className = 'homes-grid' + (homes.length===1 ? ' single' : '');
  grid.innerHTML = homes.map(function(h,i){
    return '<div class="home-card"><div class="home-art">'+homeVisual(h,i)+'</div>'
    +'<div class="home-body"><h3>'+h.name+'</h3>'
    +'<div class="home-meta"><span>📍 '+h.location+'</span><span>👥 '+h.capacity+' children</span><span>🎂 '+h.age+'</span><span>Since '+h.year+'</span></div>'
    +'<p>'+h.desc+'</p>'
    +'<div class="home-actions"><button class="btn btn-outline btn-sm" data-home-view="'+i+'">Learn more</button><button class="btn btn-accent btn-sm" data-home-sponsor="'+i+'">Sponsor a child here</button></div>'
    +'</div></div>';
  }).join('');
  document.querySelectorAll('[data-home-view]').forEach(function(b){ b.addEventListener('click', function(){ openHomeModal(homes[parseInt(b.getAttribute('data-home-view'),10)]); }); });
  document.querySelectorAll('[data-home-sponsor]').forEach(function(b){
    b.addEventListener('click', function(){
      var h=homes[parseInt(b.getAttribute('data-home-sponsor'),10)];
      sessionStorage.setItem('wc_prefill', JSON.stringify({freq:'monthly', amount:3000, note:h.name}));
      window.location.href='donate.html';
    });
  });
}
function openHomeModal(h){
  var idx=homes.indexOf(h);
  var body=document.getElementById('homeModalBody'); if(!body) return;
  body.innerHTML = '<div class="home-art" style="border-radius:14px;overflow:hidden;height:200px;width:100%;aspect-ratio:auto;margin-bottom:16px">'+homeVisual(h, idx)+'</div>'
    +'<h2 style="font-size:1.4rem">'+h.name+'</h2>'
    +'<div class="home-meta" style="margin-bottom:12px">📍 '+h.location+' · 👥 '+h.capacity+' children · 🎂 '+h.age+' · Since '+h.year+'</div>'
    +'<p>'+h.desc+'</p><a class="btn btn-primary" href="donate.html" id="modalSponsorGo">Sponsor a child here</a>';
  document.getElementById('homeModalBackdrop').classList.add('show');
  var go=document.getElementById('modalSponsorGo');
  if(go) go.addEventListener('click', function(){ sessionStorage.setItem('wc_prefill', JSON.stringify({freq:'monthly', amount:3000, note:h.name})); });
}
if(document.getElementById('homesGrid')){
  renderHomes();
  var hmc=document.getElementById('homeModalClose'); if(hmc) hmc.addEventListener('click', function(){ document.getElementById('homeModalBackdrop').classList.remove('show'); });
  var hmb=document.getElementById('homeModalBackdrop'); if(hmb) hmb.addEventListener('click', function(e){ if(e.target===this) this.classList.remove('show'); });
}

/* ===== BLOG (blog.html) ===== */
function renderBlog(){
  var grid=document.getElementById('blogGrid'); if(!grid) return;
  grid.innerHTML = blogPosts.map(function(p,i){
    return '<div class="blog-card" data-post="'+i+'"><div class="blog-art">'+blogVisual(p,i)+'</div><div class="blog-body"><p class="blog-tag">'+p.tag+'</p><h4>'+p.title+'</h4><p>'+p.summary+'</p><span class="blog-date">'+formatDate(p.date)+'</span></div></div>';
  }).join('');
  document.querySelectorAll('[data-post]').forEach(function(c){ c.addEventListener('click', function(){ openBlogModal(blogPosts[parseInt(c.getAttribute('data-post'),10)]); }); });
}
function openBlogModal(p){
  var mi=document.getElementById('modalImg');
  if(mi){ if(p.img){ mi.src=p.img; mi.alt=''; mi.hidden=false; } else { mi.hidden=true; } }
  document.getElementById('modalTag').textContent=p.tag;
  document.getElementById('modalTitle').textContent=p.title;
  document.getElementById('modalDate').textContent=formatDate(p.date);
  document.getElementById('modalBody').innerHTML='<p>'+p.body+'</p>';
  document.getElementById('blogModalBackdrop').classList.add('show');
}
if(document.getElementById('blogGrid')){
  renderBlog();
  var bmc=document.getElementById('blogModalClose'); if(bmc) bmc.addEventListener('click', function(){ document.getElementById('blogModalBackdrop').classList.remove('show'); });
  var bmb=document.getElementById('blogModalBackdrop'); if(bmb) bmb.addEventListener('click', function(e){ if(e.target===this) this.classList.remove('show'); });
}

/* ===== CAMPAIGNS (impact.html) ===== */
function renderCampaigns(){
  var list=document.getElementById('campaignList'); if(!list) return;
  list.innerHTML = campaigns.map(function(c){
    var pct=Math.min(100, Math.round(c.raised/c.goal*100));
    return '<div class="campaign">'+(c.img?imgTag(c.img,'').replace('<img ','<img class="campaign-thumb" '):'')+'<div class="campaign-main"><div class="campaign-top"><h4>'+c.name+'</h4><b>'+pct+'%</b></div><div class="bar"><i data-pct="'+pct+'"></i></div><div class="campaign-sub"><span>KES '+c.raised.toLocaleString()+' raised</span><span>Goal KES '+c.goal.toLocaleString()+'</span></div></div></div>';
  }).join('');
  requestAnimationFrame(function(){ document.querySelectorAll('#campaignList .bar>i').forEach(function(i){ i.style.width=i.getAttribute('data-pct')+'%'; }); });
}
if(document.getElementById('campaignList')) renderCampaigns();

/* ===== DONATE FORM (donate.html) ===== */
if(document.getElementById('donateForm')){
  var freq='once', amount=1500, payMethod='mpesa';
  var prefillRaw=sessionStorage.getItem('wc_prefill');
  if(prefillRaw){
    try{ var pf=JSON.parse(prefillRaw); if(pf.freq) freq=pf.freq; if(pf.amount) amount=pf.amount; sessionStorage.removeItem('wc_prefill'); if(pf.note) toast('Sponsorship started','Supporting a child at '+pf.note+' — complete the form to confirm.'); }catch(e){}
  }
  function setFrequency(f){ freq=f; document.querySelectorAll('#freqSeg button').forEach(function(b){ b.classList.toggle('active', b.getAttribute('data-freq')===f); }); updateSubmitLabel(); }
  function setAmount(a){
    amount=a;
    document.querySelectorAll('#amountGrid button').forEach(function(b){ b.classList.remove('active'); });
    var match=document.querySelector('#amountGrid button[data-amt="'+a+'"]');
    if(match){ match.classList.add('active'); document.getElementById('customAmount').style.display='none'; }
    updateSubmitLabel();
  }
  function updateSubmitLabel(){ document.getElementById('submitAmt').textContent='KES '+Number(amount).toLocaleString()+(freq==='monthly'?' / month':''); }
  document.getElementById('freqSeg').addEventListener('click', function(e){ var b=e.target.closest('button'); if(!b) return; setFrequency(b.getAttribute('data-freq')); });
  document.getElementById('amountGrid').addEventListener('click', function(e){
    var b=e.target.closest('button'); if(!b) return; var v=b.getAttribute('data-amt');
    if(v==='custom'){
      document.querySelectorAll('#amountGrid button').forEach(function(x){x.classList.remove('active');});
      b.classList.add('active');
      var ci=document.getElementById('customAmount'); ci.style.display='block'; ci.focus();
      ci.oninput=function(){ if(ci.value){ amount=parseInt(ci.value,10)||0; updateSubmitLabel(); } };
    } else { setAmount(parseInt(v,10)); }
  });
  document.getElementById('payTabs').addEventListener('click', function(e){
    var t=e.target.closest('.pay-tab'); if(!t) return;
    payMethod=t.getAttribute('data-pay');
    document.querySelectorAll('.pay-tab').forEach(function(x){ x.classList.remove('active'); });
    t.classList.add('active');
    document.getElementById('payMpesa').style.display = payMethod==='mpesa' ? 'block':'none';
    document.getElementById('payCard').style.display = payMethod==='card' ? 'block':'none';
  });
  var sb=document.getElementById('sponsorBtn'); if(sb) sb.addEventListener('click', function(){ setFrequency('monthly'); setAmount(3000); document.getElementById('donorName').focus(); });

  document.getElementById('donateForm').addEventListener('submit', function(e){
    e.preventDefault();
    if(payMethod==='mpesa' && !document.getElementById('mpesaPhone').value.trim()){ toast('Phone number needed','Enter the M-Pesa number to continue.'); return; }
    if(payMethod==='card' && !document.getElementById('cardNumber').value.trim()){ toast('Card details needed','Enter a card number to continue.'); return; }
    var btn=document.getElementById('donateSubmit');
    var originalHtml=btn.innerHTML;
    btn.disabled=true; btn.innerHTML='Processing payment…';
    setTimeout(function(){
      var record={ name: document.getElementById('donorName').value.trim(), email: document.getElementById('donorEmail').value.trim(), amount: amount, freq: freq, method: payMethod, date: new Date().toISOString() };
      donations.unshift(record); saveDB(DB_KEYS.donations, donations);
      var c = campaigns[Math.floor(Math.random()*campaigns.length)];
      c.raised = Math.min(c.goal, c.raised + amount);
      saveDB(DB_KEYS.campaigns, campaigns);
      btn.disabled=false; btn.classList.add('btn-success'); btn.innerHTML='✓ Payment received';
      setTimeout(function(){ btn.classList.remove('btn-success'); btn.innerHTML=originalHtml; document.getElementById('donateForm').style.display='none';
        document.getElementById('successMsg').textContent = 'KES '+amount.toLocaleString()+(freq==='monthly'?' a month':'')+' from '+(record.name||'you')+' has been recorded via '+(payMethod==='mpesa'?'M-Pesa':'card')+'.';
        document.getElementById('donateSuccess').classList.add('show');
      }, 700);
      toast('Payment confirmed', 'KES '+amount.toLocaleString()+' via '+(payMethod==='mpesa'?'M-Pesa':'card')+'.');
    }, 1300);
  });
  document.getElementById('donateAgainBtn').addEventListener('click', function(){
    document.getElementById('donateSuccess').classList.remove('show');
    document.getElementById('donateForm').style.display='block';
    document.getElementById('donateForm').reset();
    setFrequency('once'); setAmount(1500); payMethod='mpesa';
    document.querySelectorAll('.pay-tab').forEach(function(x){x.classList.remove('active');});
    document.querySelector('.pay-tab[data-pay="mpesa"]').classList.add('active');
    document.getElementById('payMpesa').style.display='block'; document.getElementById('payCard').style.display='none';
  });
  setFrequency(freq); setAmount(amount);
}

/* ===== CONTACT FORM (contact.html) ===== */
if(document.getElementById('contactForm')){
  document.getElementById('contactForm').addEventListener('submit', function(e){
    e.preventDefault();
    var rec={ name:document.getElementById('cName').value.trim(), email:document.getElementById('cEmail').value.trim(), reason:document.getElementById('cReason').value, message:document.getElementById('cMessage').value.trim(), date:new Date().toISOString() };
    messages.unshift(rec); saveDB(DB_KEYS.messages, messages);
    var btn=document.getElementById('contactSubmit');
    flashButtonSuccess(btn, 'Message sent', 'Send message', 2200);
    toast('Message sent', "We usually reply within two working days.");
    this.reset();
  });
}

/* ===== NEWSLETTER (every page footer) ===== */
if(document.getElementById('newsletterBtn')){
  document.getElementById('newsletterBtn').addEventListener('click', function(){
    var v=document.getElementById('newsletterEmail').value.trim();
    if(!v || v.indexOf('@')===-1){ toast('Enter a valid email','We need an email to add you to the list.'); return; }
    flashButtonSuccess(this, 'Joined', 'Join', 1800);
    toast('Subscribed', "You'll get our quarterly update.");
    document.getElementById('newsletterEmail').value='';
  });
}

})();
