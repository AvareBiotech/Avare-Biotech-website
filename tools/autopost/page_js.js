(function(){
  var SCRIPT=window.SCRIPT, PDF_FALLBACK="";
  function $(s){return document.querySelector(s);}
  function $all(s){return Array.prototype.slice.call(document.querySelectorAll(s));}

  /* burger */
  var burger=$("#burger"), pill=$("#navPill");
  if(burger) burger.addEventListener("click",function(){burger.classList.toggle("open");pill.classList.toggle("mobile-open");});

  /* lang switcher */
  var seg=(location.pathname.split("/").filter(Boolean)[0]||"").toLowerCase();
  var codes=["en","pt","es","ar","af","ur","tr","de","fr","it","ru","hi","ja","zh","el"];
  var cur=codes.indexOf(seg)>=0?seg:"en";
  var tgl=$("#langToggle");
  if(tgl) tgl.firstChild.nodeValue=cur.toUpperCase()+" ";
  function langURL(c){ if(c==="ar")return "/ar"; if(c==="en")return "/learn/"+window.SLUG; return "/"+c+"/learn/"+window.SLUG; }
  $all(".av-lang__opt,.nav-lang-mob button").forEach(function(b){
    if(b.getAttribute("data-code")===cur)b.classList.add("active");
    b.addEventListener("click",function(e){e.stopPropagation();var c=b.getAttribute("data-code");if(c==="ar"){window.open("/ar","_blank");}else{window.location.href=langURL(c);}});
  });
  if(tgl){
    tgl.addEventListener("click",function(e){e.stopPropagation();$("#avLang").classList.toggle("open");});
    document.addEventListener("click",function(){$("#avLang").classList.remove("open");});
  }

  /* modals generic open/close */
  function open(id){var o=$("#"+id);if(o){o.classList.add("open");document.body.style.overflow="hidden";}}
  function close(o){o.classList.remove("open");document.body.style.overflow="";}
  $all("[data-close]").forEach(function(b){b.addEventListener("click",function(){close($("#"+b.getAttribute("data-close")));var clr=b.getAttribute("data-clear");if(clr&&$("#"+clr))$("#"+clr).src="";});});
  $all(".learn-modal-overlay,.av-faq-overlay,.av-video-overlay,.av-video-player-overlay,.av-protocol-overlay,.av-pdf-overlay,#casesOverlay").forEach(function(o){
    o.addEventListener("click",function(e){if(e.target===o){close(o);var fr=o.querySelector("iframe");if(fr)fr.src="";}});
  });
  document.addEventListener("keydown",function(e){if(e.key==="Escape"){$all(".open").forEach(function(o){close(o);var fr=o.querySelector("iframe");if(fr)fr.src="";});}});

  /* download flow (multiple modals via data-modal / data-submit / data-dl) */
  var subscribed=localStorage.getItem("learn_subscribed")==="1";
  function setLock(){$all(".dl-lock").forEach(function(s){s.textContent=subscribed?"↓":"🔒";});}
  setLock();
  function dl(url){if(!url)return;var a=document.createElement("a");a.href=url;a.download=url.split("/").pop()||"download.pdf";a.target="_blank";document.body.appendChild(a);a.click();document.body.removeChild(a);}
  function showState(prefix){var f=$("#"+prefix+"Form"),s=$("#"+prefix+"Success");if(f)f.style.display=subscribed?"none":"";if(s)s.style.display=subscribed?"":"none";}
  $all("[data-modal]").forEach(function(b){b.addEventListener("click",function(){var p=b.getAttribute("data-modal");showState(p);open(p+"Overlay");});});
  $all("[data-dl]").forEach(function(b){b.addEventListener("click",function(){dl(b.getAttribute("data-dl"));});});
  $all("[data-submit]").forEach(function(b){b.addEventListener("click",function(){submitEmail(b.getAttribute("data-submit"));});});
  $all('input[type="email"]').forEach(function(inp){inp.addEventListener("keydown",function(e){if(e.key==="Enter")submitEmail(inp.id.replace("Email",""));});});
  function submitEmail(prefix){
    var inp=$("#"+prefix+"Email");var email=(inp.value||"").trim();
    if(!email||email.indexOf("@")<0){alert("Please enter a valid email.");return;}
    var btn=document.querySelector('[data-submit="'+prefix+'"]');if(btn)btn.disabled=true;
    try{fetch(SCRIPT+"?"+new URLSearchParams({type:"learn_subscribe",email:email}).toString(),{method:"GET",mode:"no-cors"});}catch(e){}
    setTimeout(function(){
      localStorage.setItem("learn_subscribed","1");subscribed=true;setLock();showState(prefix);
      var s=$("#"+prefix+"Success");var single=s?s.getAttribute("data-single"):"";
      if(single)dl(single);
    },700);
  }

  /* FAQ accordion + footer popups */
  $all(".av-faq-question").forEach(function(q){q.addEventListener("click",function(){q.parentElement.classList.toggle("open");});});
  if($("#openFaq"))$("#openFaq").addEventListener("click",function(e){e.preventDefault();open("faqOverlay");});
  if($("#openVideo"))$("#openVideo").addEventListener("click",function(e){e.preventDefault();open("videoOverlay");});
  if($("#openProtocol"))$("#openProtocol").addEventListener("click",function(e){e.preventDefault();open("protoOverlay");});
  if($("#openCases"))$("#openCases").addEventListener("click",function(e){e.preventDefault();open("casesOverlay");});
  $all(".av-video-thumb").forEach(function(t){t.addEventListener("click",function(){$("#ytFrame").src="https://www.youtube.com/embed/"+t.getAttribute("data-yt")+"?autoplay=1";open("playerOverlay");});});
  $all(".av-protocol-view-btn").forEach(function(b){b.addEventListener("click",function(){$("#pdfFrame").src="https://docs.google.com/gview?url="+b.getAttribute("data-view")+"&embedded=true";open("pdfOverlay");});});
  $all(".av-case-card").forEach(function(c){c.addEventListener("click",function(){$("#pdfFrame").src="https://docs.google.com/gview?url="+c.getAttribute("data-view")+"&embedded=true";open("pdfOverlay");});});
})();
