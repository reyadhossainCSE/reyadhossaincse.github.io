/* Renders the whole site from data.js. You normally never need to edit this file. */
(function () {
  "use strict";
  var S = window.SITE || {};
  var P = S.profile || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var has = function (v) { return v != null && String(v).trim() !== ""; };
  var ext = function (href) { return /^https?:/i.test(href) ? ' target="_blank" rel="noopener"' : ""; };

  function toast(msg) {
    var t = $("#toast"); t.textContent = msg; t.hidden = false;
    clearTimeout(toast.h); toast.h = setTimeout(function () { t.hidden = true; }, 1800);
  }
  function copy(text) {
    function fallback() {
      var ta = document.createElement("textarea"); ta.value = text; document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy") ? toast("Copied") : toast("Select the text and copy it"); } catch (e) { toast("Select the text and copy it"); }
      ta.remove();
    }
    try { navigator.clipboard.writeText(text).then(function () { toast("Copied"); }, fallback); } catch (e) { fallback(); }
  }

  /* ---------- Profile & hero ---------- */
  var nameParts = (P.name || "").split(" ");
  var last = nameParts.length > 1 ? nameParts.slice(-2).join(" ") : P.name;
  var first = nameParts.length > 2 ? nameParts.slice(0, -2).join(" ") : "";
  $("#heroName").innerHTML = (first ? '<span class="first">' + esc(first) + "</span>" : "") + esc(last);
  $("#heroRole").innerHTML = esc(P.title) + (has(P.affiliation) ? ' <span class="at">at ' + esc(P.affiliation) + "</span>" : "");
  $("#heroTag").textContent = P.tagline || "";
  $("#heroPlace").textContent = P.location || "";
  var brand = $("#brand"); brand.textContent = P.shortName || P.name || ""; brand.setAttribute("data-initials", P.initials || "");
  $("#initials").textContent = P.initials || "";
  if (P.seeking && P.seeking.show) { $("#seeking").hidden = false; $("#seekingText").textContent = P.seeking.text; }

  if (has(P.photo)) {
    var img = $("#photo");
    img.onload = function () { img.hidden = false; $("#initials").hidden = true; };
    img.alt = "Portrait of " + (P.name || "");
    img.src = P.photo;
  }
  ["#cvBtn", "#cvLink"].forEach(function (id) {
    var a = $(id); if (has(P.cv)) a.href = P.cv; else a.closest(id === "#cvBtn" ? ".btn" : ".contact-row").hidden = true;
  });
  if (has(P.email)) {
    var e = $("#emailLink"); e.textContent = P.email; e.href = "mailto:" + P.email;
    $("#copyEmail").addEventListener("click", function () { copy(P.email); });
  }
  $("#contactPlace").textContent = P.location || "";
  $("#footName").textContent = "© " + new Date().getFullYear() + " " + (P.name || "");
  $("#footNote").textContent = S.footerNote || "";
  document.title = (P.name || "") + " · " + (P.title || "Researcher");

  /* ---------- Academic profiles ---------- */
  var LINKS = [
    ["orcid", "ORCID", "iD"], ["googleScholar", "Google Scholar", "GS"], ["researchGate", "ResearchGate", "RG"],
    ["scopus", "Scopus", "SC"], ["webOfScience", "Web of Science", "WoS"], ["semanticScholar", "Semantic Scholar", "S2"],
    ["dblp", "DBLP", "DB"], ["arxiv", "arXiv", "aX"], ["github", "GitHub", "GH"], ["kaggle", "Kaggle", "K"],
    ["linkedin", "LinkedIn", "in"], ["twitter", "X / Twitter", "X"], ["youtube", "YouTube", "YT"], ["medium", "Blog", "B"]
  ];
  var L = S.links || {};
  var linkHTML = LINKS.filter(function (l) { return has(L[l[0]]); }).map(function (l) {
    return '<a href="' + esc(L[l[0]]) + '" target="_blank" rel="noopener"><span class="b">' + l[2] + "</span>" + l[1] + "</a>";
  }).join("");
  if (has(P.email)) linkHTML += '<a href="mailto:' + esc(P.email) + '"><span class="b">@</span>Email</a>';
  $("#profiles").innerHTML = linkHTML; $("#profiles2").innerHTML = linkHTML;

  /* ---------- Stats ---------- */
  $("#stats").innerHTML = (S.stats || []).map(function (s) {
    return "<div><dt>" + esc(s.value) + "</dt><dd>" + esc(s.label) + "</dd></div>";
  }).join("");
  if (!(S.stats || []).length) $("#stats").hidden = true;

  /* ---------- About & news ---------- */
  $("#aboutText").innerHTML = (P.about || []).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
  $("#newsList").innerHTML = (S.news || []).map(function (n) {
    return "<li><time>" + esc(n.date) + "</time><span>" + esc(n.text) + "</span></li>";
  }).join("");
  if (!(S.news || []).length) $(".news").hidden = true;

  /* ---------- Interests ---------- */
  $("#interests").innerHTML = (S.interests || []).map(function (i) {
    var g = (i.area || "").split(" ").map(function (w) { return w[0]; }).join("").slice(0, 2);
    return '<article class="interest"><span class="glyph" aria-hidden="true">' + esc(g) + '</span><div class="area">' + esc(i.area) +
      "</div><h3>" + esc(i.title) + "</h3><p>" + esc(i.text) + "</p></article>";
  }).join("");

  /* ---------- Publications ---------- */
  var TYPES = { journal: "Journal", conference: "Conference", preprint: "Preprint", chapter: "Book chapter", poster: "Poster", thesis: "Thesis" };
  var STATUS = { published: "Published", accepted: "Accepted", review: "Under review", prep: "In preparation" };
  var PUBS = (S.publications || []).slice();
  var pubState = { type: "all", q: "" };

  function authorsHTML(a) { return esc(a).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"); }
  function bibtex(p) {
    var lastName = (P.name || "author").split(" ").pop().toLowerCase();
    var key = lastName + p.year + (p.title.split(/\s+/)[0] || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    var kind = { journal: "article", conference: "inproceedings", chapter: "incollection", thesis: "mastersthesis" }[p.type] || "misc";
    var vf = { journal: "journal", conference: "booktitle", chapter: "booktitle" }[p.type] || "howpublished";
    var authors = p.authors.replace(/\*\*/g, "").replace(/,?\s*et al\.?/i, " and others").split(/\s*,\s*/).filter(Boolean).join(" and ");
    return "@" + kind + "{" + key + ",\n  title     = {" + p.title + "},\n  author    = {" + authors + "},\n  " +
      (vf + "          ").slice(0, 9) + " = {" + p.venue + "},\n  year      = {" + p.year + "}" +
      (has(p.doi) ? ",\n  doi       = {" + p.doi + "}" : "") + "\n}";
  }
  function renderPubFilter() {
    var counts = { all: PUBS.length };
    PUBS.forEach(function (p) { counts[p.type] = (counts[p.type] || 0) + 1; });
    var btns = [["all", "All"]].concat(Object.keys(TYPES).filter(function (k) { return counts[k]; }).map(function (k) { return [k, TYPES[k]]; }));
    if (PUBS.some(function (p) { return p.selected; })) btns.splice(1, 0, ["selected", "Selected"]);
    counts.selected = PUBS.filter(function (p) { return p.selected; }).length;
    $("#pubFilter").innerHTML = btns.map(function (b) {
      return '<button data-v="' + b[0] + '" aria-pressed="' + (pubState.type === b[0]) + '">' + b[1] + '<span class="n">' + counts[b[0]] + "</span></button>";
    }).join("");
  }
  function renderPubs() {
    var q = pubState.q.toLowerCase();
    var list = PUBS.filter(function (p) {
      var okType = pubState.type === "all" || (pubState.type === "selected" ? p.selected : p.type === pubState.type);
      return okType && (!q || (p.title + " " + p.authors + " " + p.venue).toLowerCase().indexOf(q) > -1);
    }).sort(function (a, b) { return b.year - a.year; });
    if (!list.length) { $("#pubList").innerHTML = '<p class="empty">No publications match your search. Try another word or choose "All".</p>'; return; }
    var html = "", yr = null;
    list.forEach(function (p) {
      if (p.year !== yr) { yr = p.year; html += '<div class="year">' + esc(yr) + "</div>"; }
      var links = [
        has(p.doi) && '<a href="https://doi.org/' + esc(p.doi) + '" target="_blank" rel="noopener">DOI</a>',
        has(p.pdf) && '<a href="' + esc(p.pdf) + '"' + ext(p.pdf) + ">PDF</a>",
        has(p.code) && '<a href="' + esc(p.code) + '" target="_blank" rel="noopener">Code</a>',
        has(p.slides) && '<a href="' + esc(p.slides) + '"' + ext(p.slides) + ">Slides</a>",
        '<button data-bib="' + PUBS.indexOf(p) + '">Cite (BibTeX)</button>'
      ].filter(Boolean).join("");
      html += '<article class="pub"><div class="type">' + esc(TYPES[p.type] || p.type) + "</div><div>" +
        '<div class="title">' + esc(p.title) + '<span class="badges">' +
        (STATUS[p.status] ? '<span class="badge ' + esc(p.status) + '">' + STATUS[p.status] + "</span>" : "") +
        (p.selected ? '<span class="badge star">Selected</span>' : "") + "</span></div>" +
        '<div class="authors">' + authorsHTML(p.authors) + "</div>" +
        '<div class="venue">' + esc(p.venue) + "</div>" +
        (has(p.abstract) ? "<details><summary>Abstract</summary><p>" + esc(p.abstract) + "</p></details>" : "") +
        '<div class="pub-links">' + links + "</div></div></article>";
    });
    $("#pubList").innerHTML = html;
  }
  $("#pubFilter").addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return; pubState.type = b.dataset.v; renderPubFilter(); renderPubs();
  });
  $("#pubSearch").addEventListener("input", function (e) { pubState.q = e.target.value; renderPubs(); });
  $("#pubList").addEventListener("click", function (e) {
    var b = e.target.closest("[data-bib]"); if (b) copy(bibtex(PUBS[+b.dataset.bib]));
  });
  $("#pubNote").textContent = has(L.googleScholar) ? "" : "";
  if (has(L.googleScholar)) $("#pubNote").innerHTML = 'Full list and citations on <a href="' + esc(L.googleScholar) + '" target="_blank" rel="noopener">Google Scholar</a>.';
  renderPubFilter(); renderPubs();

  /* ---------- Projects ---------- */
  var PROJ = (S.projects || []).slice().sort(function (a, b) { return (b.featured ? 1 : 0) - (a.featured ? 1 : 0); });
  var projTag = "All";
  var tags = ["All"];
  PROJ.forEach(function (p) { (p.tags || []).forEach(function (t) { if (tags.indexOf(t) < 0) tags.push(t); }); });

  function renderProjFilter() {
    $("#projFilter").innerHTML = tags.map(function (t) {
      return '<button data-t="' + esc(t) + '" aria-pressed="' + (projTag === t) + '">' + esc(t) + "</button>";
    }).join("");
  }
  function renderProjects() {
    var list = PROJ.filter(function (p) { return projTag === "All" || (p.tags || []).indexOf(projTag) > -1; });
    $("#projList").innerHTML = list.map(function (p, i) {
      var links = [
        has(p.paper) && '<a href="' + esc(p.paper) + '"' + ext(p.paper) + ">Paper</a>",
        has(p.code) && '<a href="' + esc(p.code) + '" target="_blank" rel="noopener">Code</a>',
        has(p.demo) && '<a href="' + esc(p.demo) + '" target="_blank" rel="noopener">Demo</a>'
      ].filter(Boolean).join("");
      var cover = has(p.image)
        ? '<img src="' + esc(p.image) + '" alt="" loading="lazy">'
        : '<canvas data-seed="' + esc(p.title) + '" aria-hidden="true"></canvas>';
      return '<article class="card"><div class="cover">' + cover +
        '<span class="stamp ' + esc(p.status) + '">' + (p.status === "ongoing" ? "● Ongoing" : "Completed") + "</span></div>" +
        '<div class="card-body"><span class="yr">' + esc(p.year) + "</span><h3>" + esc(p.title) + "</h3><p>" + esc(p.summary) + "</p>" +
        '<ul class="chips">' + (p.tags || []).map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>" +
        (links ? '<div class="pub-links">' + links + "</div>" : "") + "</div></article>";
    }).join("");
    drawCovers();
  }
  $("#projFilter").addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return; projTag = b.dataset.t; renderProjFilter(); renderProjects();
  });

  /* Generated cover art: a small data-plot unique to each project title */
  function hash(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function rng(seed) { return function () { seed = (seed + 0x6D2B79F5) | 0; var t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  function cssVar(n) { return getComputedStyle(document.documentElement).getPropertyValue(n).trim(); }
  function drawCovers() {
    var accent = cssVar("--accent"), line = cssVar("--line"), soft = cssVar("--accent-soft");
    document.querySelectorAll(".cover canvas").forEach(function (c) {
      var r = rng(hash(c.dataset.seed)), dpr = Math.min(window.devicePixelRatio || 1, 2);
      var w = c.clientWidth || 320, h = c.clientHeight || 160;
      c.width = w * dpr; c.height = h * dpr; var x = c.getContext("2d"); x.scale(dpr, dpr);
      x.clearRect(0, 0, w, h);
      x.strokeStyle = line; x.lineWidth = 1;
      for (var gx = 0; gx < w; gx += 24) { x.beginPath(); x.moveTo(gx + .5, 0); x.lineTo(gx + .5, h); x.stroke(); }
      for (var gy = 0; gy < h; gy += 24) { x.beginPath(); x.moveTo(0, gy + .5); x.lineTo(w, gy + .5); x.stroke(); }
      var style = Math.floor(r() * 3);
      if (style === 0) { // scatter clusters
        for (var k = 0; k < 3; k++) {
          var cx = w * (.2 + r() * .65), cy = h * (.2 + r() * .55);
          for (var i = 0; i < 26; i++) {
            var a = r() * 6.28, d = r() * 34;
            x.fillStyle = k === 0 ? accent : soft; x.globalAlpha = k === 0 ? .85 : 1;
            x.beginPath(); x.arc(cx + Math.cos(a) * d, cy + Math.sin(a) * d * .7, 2.6, 0, 6.28); x.fill();
          }
        }
      } else if (style === 1) { // curve with area
        var pts = [], y = h * (.4 + r() * .3);
        for (var px = 0; px <= w; px += w / 14) { y = Math.max(h * .15, Math.min(h * .8, y + (r() - .5) * h * .22)); pts.push([px, y]); }
        x.beginPath(); x.moveTo(0, h); pts.forEach(function (p) { x.lineTo(p[0], p[1]); }); x.lineTo(w, h); x.closePath();
        x.fillStyle = soft; x.fill();
        x.beginPath(); pts.forEach(function (p, i) { i ? x.lineTo(p[0], p[1]) : x.moveTo(p[0], p[1]); });
        x.strokeStyle = accent; x.lineWidth = 2; x.stroke();
        var e = pts[pts.length - 2]; x.fillStyle = accent; x.beginPath(); x.arc(e[0], e[1], 4, 0, 6.28); x.fill();
      } else { // bars
        var n = 10, bw = w / (n * 1.6);
        for (var b = 0; b < n; b++) {
          var bh = h * (.15 + r() * .6), bx = w * .1 + b * bw * 1.5;
          x.fillStyle = b === Math.floor(r() * n) ? accent : soft; x.globalAlpha = 1;
          x.fillRect(bx, h - bh, bw, bh);
        }
        x.fillStyle = accent; x.fillRect(w * .1 + 3 * bw * 1.5, h * .15, bw, h * .85);
      }
      x.globalAlpha = 1;
    });
  }
  renderProjFilter(); renderProjects();

  /* ---------- Timelines ---------- */
  function tl(items) {
    return (items || []).map(function (t) {
      return '<li><span class="when">' + esc(t.when) + "</span><h4>" + esc(t.title) + '</h4><div class="place">' + esc(t.place) + "</div>" +
        (has(t.text) ? "<p>" + esc(t.text) + "</p>" : "") + "</li>";
    }).join("");
  }
  $("#expList").innerHTML = tl(S.experience);
  $("#eduList").innerHTML = tl(S.education);
  $("#coursework").innerHTML = (S.coursework || []).map(function (c) { return "<li>" + esc(c) + "</li>"; }).join("");
  if (!(S.coursework || []).length) $(".coursework").hidden = true;
  var ta = "";
  if ((S.talks || []).length) ta += '<div><h3 class="col-title">Talks &amp; presentations</h3><ol class="timeline">' + tl(S.talks) + "</ol></div>";
  if ((S.awards || []).length) ta += '<div><h3 class="col-title">Awards &amp; scholarships</h3><ol class="timeline">' + tl(S.awards) + "</ol></div>";
  $("#talksAwards").innerHTML = ta;

  /* ---------- Skills, certificates, activities ---------- */
  var SK = S.skills || {};
  $("#skillGrid").innerHTML = Object.keys(SK).map(function (g) {
    return '<div class="skill"><h3>' + esc(g) + '</h3><ul class="chips">' + SK[g].map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul></div>";
  }).join("");
  $("#certList").innerHTML = (S.certificates || []).map(function (c) {
    var t = has(c.link) ? '<a href="' + esc(c.link) + '" target="_blank" rel="noopener">' + esc(c.title) + "</a>" : esc(c.title);
    return "<li><span>" + t + '</span><span class="by">' + esc(c.by) + "</span></li>";
  }).join("");
  $("#actList").innerHTML = (S.activities || []).map(function (a) { return "<li>" + esc(a) + "</li>"; }).join("");

  /* ---------- Contact form (Formspree) ---------- */
  if (has(S.contactForm)) {
    var f = $("#contactForm"); f.hidden = false; f.action = S.contactForm;
    f.addEventListener("submit", function (ev) {
      ev.preventDefault(); var st = $("#formStatus"); st.textContent = "Sending…";
      fetch(S.contactForm, { method: "POST", body: new FormData(f), headers: { Accept: "application/json" } })
        .then(function (r) { if (!r.ok) throw 0; f.reset(); st.textContent = "Thank you. Your message was sent and I will reply by email."; })
        .catch(function () { st.textContent = "The message could not be sent. Please email me directly at " + (P.email || "") + "."; });
    });
  }

  /* ---------- Theme toggle ---------- */
  $("#themeBtn").addEventListener("click", function () {
    var root = document.documentElement;
    var cur = root.getAttribute("data-theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    var next = cur === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    drawCovers(); net.recolor();
  });

  /* ---------- Mobile menu & active section ---------- */
  var nav = $("#nav"), menuBtn = $("#menuBtn");
  menuBtn.addEventListener("click", function () {
    var open = nav.classList.toggle("open"); menuBtn.setAttribute("aria-expanded", open);
  });
  nav.addEventListener("click", function (e) { if (e.target.tagName === "A") { nav.classList.remove("open"); menuBtn.setAttribute("aria-expanded", "false"); } });
  var navLinks = Array.prototype.slice.call(nav.querySelectorAll("a"));
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (en.isIntersecting) navLinks.forEach(function (a) { a.classList.toggle("on", a.getAttribute("href") === "#" + en.target.id); });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    document.querySelectorAll("main .sec").forEach(function (s) { io.observe(s); });
  }
  var topbar = $("#topbar");
  window.addEventListener("scroll", function () { topbar.classList.toggle("scrolled", window.scrollY > 8); }, { passive: true });

  /* ---------- Hero: neural-network canvas ---------- */
  var net = (function () {
    var c = $("#net"), x = c.getContext("2d"), nodes = [], W, H, dpr, color, lineRGB, raf;
    var still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    var mouse = { x: -999, y: -999 };
    function recolor() { color = cssVar("--net-node"); lineRGB = cssVar("--net-line"); if (still) frame(); }
    function size() {
      dpr = Math.min(window.devicePixelRatio || 1, 2); W = c.clientWidth; H = c.clientHeight;
      c.width = W * dpr; c.height = H * dpr; x.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.round(Math.min(90, (W * H) / 11000)); var r = rng(7); nodes = [];
      for (var i = 0; i < n; i++) nodes.push({ x: W * (.35 + r() * .65), y: r() * H, vx: (r() - .5) * .25, vy: (r() - .5) * .25, s: 1.2 + r() * 2 });
      if (still) frame();
    }
    function frame() {
      x.clearRect(0, 0, W, H);
      for (var i = 0; i < nodes.length; i++) {
        var a = nodes[i];
        if (!still) {
          a.x += a.vx; a.y += a.vy;
          if (a.x < W * .3 || a.x > W) a.vx *= -1;
          if (a.y < 0 || a.y > H) a.vy *= -1;
        }
        for (var j = i + 1; j < nodes.length; j++) {
          var b = nodes[j], dx = a.x - b.x, dy = a.y - b.y, d = dx * dx + dy * dy;
          if (d < 16000) { x.strokeStyle = "rgba(" + lineRGB + "," + (0.22 * (1 - d / 16000)).toFixed(3) + ")"; x.lineWidth = 1; x.beginPath(); x.moveTo(a.x, a.y); x.lineTo(b.x, b.y); x.stroke(); }
        }
        var md = (a.x - mouse.x) * (a.x - mouse.x) + (a.y - mouse.y) * (a.y - mouse.y);
        if (md < 22000) { x.strokeStyle = "rgba(" + lineRGB + "," + (0.45 * (1 - md / 22000)).toFixed(3) + ")"; x.beginPath(); x.moveTo(a.x, a.y); x.lineTo(mouse.x, mouse.y); x.stroke(); }
        x.fillStyle = color; x.beginPath(); x.arc(a.x, a.y, a.s, 0, 6.28); x.fill();
      }
      if (!still) raf = requestAnimationFrame(frame);
    }
    var hero = c.parentElement;
    hero.addEventListener("pointermove", function (e) { var r = c.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
    hero.addEventListener("pointerleave", function () { mouse.x = mouse.y = -999; });
    document.addEventListener("visibilitychange", function () { if (still) return; if (document.hidden) cancelAnimationFrame(raf); else raf = requestAnimationFrame(frame); });
    var rt; window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(function () { size(); drawCovers(); }, 150); });
    recolor(); size(); if (!still) raf = requestAnimationFrame(frame);
    return { recolor: recolor };
  })();
})();
