(async () => {
  "use strict";

  const designs = [
    { name: "Picco", beds: 4, baths: 2, cars: 2, price: 720, width: 15, tags: ["frontage", "single"], label: "", img: "design-1.jpg" },
    { name: "Cambric", beds: 5, baths: 3, cars: 2, price: 940, width: 15, tags: ["single"], label: "", img: "design-2.jpg" },
    { name: "Boucle", beds: 4, baths: 2, cars: 2, price: 760, width: 15, tags: ["frontage", "single"], label: "", img: "design-3.jpg" },
    { name: "Amazon", beds: 4, baths: 2.5, cars: 2, price: 810, width: 17, tags: ["single"], label: "", img: "design-4.jpg" },
    { name: "Mahogany", beds: 5, baths: 3, cars: 2, price: 980, width: 17, tags: ["multi", "single"], label: "", img: "design-5.jpg" },
    { name: "Magnolia", beds: 5, baths: 3, cars: 2, price: 965, width: 15, tags: ["multi", "single"], label: "", img: "design-6.jpg" },
    { name: "Juniper", beds: 5, baths: 3, cars: 2, price: 995, width: 15, tags: ["multi", "single"], label: "", img: "design-7.jpg" },
    { name: "Antico", beds: 4, baths: 2, cars: 2, price: 745, width: 15, tags: ["frontage", "single"], label: "", img: "design-8.jpg" },
    { name: "Birch", beds: 4, baths: 2, cars: 2, price: 730, width: 15, tags: ["frontage", "single"], label: "", img: "design-1.jpg" },
    { name: "Lamae", beds: 4, baths: 2, cars: 2, price: 770, width: 15, tags: ["frontage", "single"], label: "", img: "design-2.jpg" },
    { name: "Elm", beds: 4, baths: 3, cars: 2, price: 850, width: 17, tags: ["multi", "single"], label: "", img: "design-3.jpg" },
    { name: "Hickory", beds: 6, baths: 3, cars: 2, price: 1240, width: 17, tags: ["multi", "single"], label: "", img: "design-4.jpg" },
    { name: "Harvey Venti", beds: 4, baths: 2, cars: 2, price: 790, width: 15, tags: ["country"], label: "New", img: "design-5.jpg" },
    { name: "Jardee Venti", beds: 4, baths: 2, cars: 2, price: 805, width: 15, tags: ["country"], label: "", img: "design-6.jpg" },
    { name: "Merredin Venti", beds: 4, baths: 2, cars: 2, price: 780, width: 15, tags: ["country"], label: "", img: "design-7.jpg" },
  ];

  const tagLabels = {
    single: "Single Storey",
    narrow: "Narrow Lot",
    frontage: "15m Frontage",
    multi: "Multi-Generational",
    country: "Country",
    courtyard: "Courtyard",
    display: "Display Home",
    new: "Brand New",
  };

  const displayHomes = [
    { name: "Quandong", addr: "8 Spearmint Court, Henley Brook", beds: 4, baths: 2, cars: 2, flag: "New display", img: "display-1.jpg" },
    { name: "Karri", addr: "25 Abundant Boulevard, Jandakot", beds: 4, baths: 2, cars: 2, flag: "New display", img: "display-2.jpg" },
    { name: "Mallet", addr: "8 Serpentine Road, Baldivis", beds: 4, baths: 2, cars: 2, flag: "", img: "display-3.jpg" },
  ];

  const stories = [
    {
      quote:
        "We walked in with a plan we'd already drawn in our heads and left with something better. They moved a wall, opened up the rear, and the whole house finally made sense for a family of five.",
      name: "Tim & Angela",
      role: "Built in Henley Brook",
      img: "portrait-1.svg",
    },
    {
      quote:
        "Three builders, three very different quotes. Ridgeline was the only one who talked me out of two things I wanted. That honesty is why we signed, and why I'd go back tomorrow.",
      name: "Debbie & Peter",
      role: "Built in Karrinyup",
      img: "portrait-2.svg",
    },
    {
      quote:
        "Our parents live out the back and we live out the front. It sounds simple until you've tried to fit it on a block. They designed the whole thing around how we'd actually use the space.",
      name: "The Sandhu Family",
      role: "Multi-generational build in Piara Waters",
      img: "portrait-3.svg",
    },
  ];

  const faqs = [
    {
      q: "Can I customise a home design?",
      a: "Yes. Every design in our range is a starting point rather than a fixed plan. Our in-house designers will rework the floor plan, swap inclusions and adjust finishes so the home suits your block and your routine. Changes are priced as you go, not bundled into a surprise at the end.",
    },
    {
      q: "How long does the build take?",
      a: "A straightforward single-storey build on a settled block typically runs six to nine months from contract to handover. Multi-generational and custom work generally takes longer, and anything involving land subdivision adds considerably. We'll give you a realistic program during the consultation, before you commit to anything.",
    },
    {
      q: "Do you build north or south of the river?",
      a: "Both. We build across Perth Metro and into the South West, with display homes spread between the northern suburbs and south of the river. Designs are available by region, so please select your area when browsing so we only show plans your sales consultant actually covers.",
    },
    {
      q: "What does a fixed price contract include?",
      a: "It includes the full scope of work as a line-item schedule: site preparation, frame, roof, external finishes, internal finishes, kitchen, bathroom and electrical fit-off. Variations are only ever priced once you've approved them in writing. No percentage games, no allowances that quietly disappear.",
    },
    {
      q: "What happens at handover?",
      a: "We walk the entire home with you against a written snag list and fix everything before the keys change hands. You receive the full documentation set, appliance warranties, and a two-year structural warranty with a direct local support number — not a call centre.",
    },
    {
      q: "Do you offer finance or a construction loan?",
      a: "We don't lend money ourselves, but our finance partner can structure a construction loan that draws down in stages as the build progresses, which many owners find far more comfortable than borrowing the full amount up front. We can make the introduction during your consultation.",
    },
  ];

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const icon = {
    bed: '<svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor" aria-hidden="true"><path d="M2 18v-8h20v8h-2v-3H4v3H2zm2-8V6h7v4H4zm9 0V6h7v4h-7z"/></svg>',
    bath: '<svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor" aria-hidden="true"><path d="M4 11h16v2a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6v-2zm2-2V7a2 2 0 0 1 4 0v2h4V7a2 2 0 0 1 4 0v2h2v1H6V9z"/></svg>',
    car: '<svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor" aria-hidden="true"><path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11h1a1 1 0 0 1 1 1v4h-2v2h-2v-2H7v2H5v-2H3v-4a1 1 0 0 1 1-1h1zm2.6-4L6.4 11h11.2L16.4 7H7.6zM6.5 13.5a1.3 1.3 0 1 0 0-2.6 1.3 1.3 0 0 0 0 2.6zm11 0a1.3 1.3 0 1 0 0-2.6 1.3 1.3 0 0 0 0 2.6z"/></svg>',
  };

  const specsHTML = (d) => `
    <li class="spec">${icon.bed}<strong>${d.beds}</strong></li>
    <li class="spec">${icon.bath}<strong>${d.baths}</strong></li>
    <li class="spec">${icon.car}<strong>${d.cars}</strong></li>`;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- mobile nav ---------- */

  const burger = $("#burger");
  const nav = $("#nav");
  const scrim = $("#navScrim");

  const setNav = (open) => {
    nav.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("is-locked", open);
    if (open) {
      scrim.hidden = false;
    } else {
      scrim.hidden = true;
    }
  };

  burger.addEventListener("click", () =>
    setNav(burger.getAttribute("aria-expanded") !== "true")
  );
  scrim.addEventListener("click", () => setNav(false));
  $$("#nav a").forEach((a) => a.addEventListener("click", () => setNav(false)));
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) {
      setNav(false);
      burger.focus();
    }
  });

  const mqDesktop = window.matchMedia("(min-width: 901px)");
  mqDesktop.addEventListener("change", (e) => {
    if (e.matches) setNav(false);
  });

  /* ---------- sticky header + to top ---------- */

  const header = $("#header");
  const toTop = $("#toTop");

  const onScroll = () => {
    const y = window.scrollY;
    header.dataset.scrolled = String(y > 12);
    toTop.hidden = y < 600;
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  toTop.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })
  );

  /* ---------- reveal on scroll ---------- */

  const revealables = $$(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const delay = Number(entry.target.dataset.delay || 0);
          setTimeout(() => entry.target.classList.add("is-visible"), delay);
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealables.forEach((el, i) => {
      el.dataset.delay = String((i % 4) * 80);
      io.observe(el);
    });
  } else {
    revealables.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- stat counters ---------- */

  const counters = $$("[data-count]");
  const animateCount = (el) => {
    const target = Number(el.dataset.count);
    const duration = 1400;
    const start = performance.now();

    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString("en-AU");
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if ("IntersectionObserver" in window && !reduceMotion) {
    const co = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateCount(entry.target);
          co.unobserve(entry.target);
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((c) => co.observe(c));
  } else {
    counters.forEach((c) => {
      c.textContent = Number(c.dataset.count).toLocaleString("en-AU");
    });
  }

  /* ---------- design explorer ---------- */

  const grid = $("#designGrid");
  const empty = $("#designEmpty");
  const countEl = $("#resultCount");
  const priceInput = $("#f-price");
  const widthInput = $("#f-width");

  const state = { price: 900, width: 20, beds: 0, type: "all" };

  const cardHTML = (d) => `
    <article class="card">
      <div class="card__media">
        <img src="assets/${d.img}" alt="Illustrated placeholder for the ${d.name} design" loading="lazy" width="900" height="640" />
        ${d.label ? `<span class="card__tag">${d.label}</span>` : ""}
      </div>
      <div class="card__body">
        <p class="card__tags">${d.tags.map((t) => tagLabels[t]).join(", ")}</p>
        <h3 class="card__title">${d.name}</h3>
        <ul class="card__specs">${specsHTML(d)}</ul>
        <span class="card__cta">View home design <span aria-hidden="true">→</span></span>
      </div>
    </article>`;

  const matches = (d) =>
    d.price <= state.price &&
    d.width <= state.width &&
    d.beds >= state.beds &&
    (state.type === "all" || d.tags.includes(state.type));

  const renderDesigns = () => {
    const found = designs.filter(matches);
    grid.innerHTML = found.map(cardHTML).join("");
    empty.hidden = found.length > 0;
    countEl.textContent =
      found.length === designs.length
        ? `Showing all ${found.length} designs`
        : `Showing ${found.length} of ${designs.length} designs`;
  };

  priceInput.addEventListener("input", () => {
    const v = Number(priceInput.value);
    state.price = Number.isFinite(v) && v >= 0 ? v : Infinity;
    renderDesigns();
  });

  widthInput.addEventListener("input", () => {
    const v = Number(widthInput.value);
    state.width = Number.isFinite(v) && v >= 0 ? v : Infinity;
    renderDesigns();
  });

  $$("[data-group]").forEach((group) => {
    const kind = group.dataset.group;
    group.addEventListener("click", (e) => {
      const chip = e.target.closest(".chip");
      if (!chip) return;
      $$(".chip", group).forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      state[kind] = kind === "beds" ? Number(chip.dataset.value) : chip.dataset.value;
      renderDesigns();
    });
  });

  $("#resetFilters").addEventListener("click", () => {
    state.price = 900;
    state.width = 20;
    state.beds = 0;
    state.type = "all";
    priceInput.value = "900";
    widthInput.value = "20";
    $$("[data-group]").forEach((group) => {
      const kind = group.dataset.group;
      $$(".chip", group).forEach((c) => {
        const isDefault =
          (kind === "beds" && c.dataset.value === "0") ||
          (kind === "type" && c.dataset.value === "all");
        c.classList.toggle("is-active", isDefault);
      });
    });
    renderDesigns();
  });

  renderDesigns();

  /* ---------- display homes ---------- */

  $("#displayGrid").innerHTML = displayHomes
    .map(
      (h) => `
    <article class="dcard">
      <div class="dcard__media">
        <img src="assets/${h.img}" alt="Illustrated placeholder of the ${h.name} display home" loading="lazy" width="900" height="640" />
        ${h.flag ? `<span class="dcard__flag">${h.flag}</span>` : ""}
      </div>
      <div class="dcard__body">
        <h3>${h.name}</h3>
        <p class="dcard__addr">${h.addr}</p>
        <ul class="dcard__specs">${specsHTML(h)}</ul>
        <span class="card__cta">Get directions <span aria-hidden="true">→</span></span>
      </div>
    </article>`
    )
    .join("");

  /* ---------- region toggle ---------- */

  const regionBtns = $$(".region__btn");
  regionBtns.forEach((btn) =>
    btn.addEventListener("click", () => {
      regionBtns.forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
      const isMetro = btn.dataset.region === "metro";
      state.price = isMetro ? 900 : 780;
      state.width = isMetro ? 20 : 15;
      priceInput.value = String(state.price);
      widthInput.value = String(state.width);
      renderDesigns();
    })
  );

  /* ---------- hero carousel (images + optional video) ---------- */

  const heroSlides = [
    { type: "video", src: "assets/hero.mp4", poster: "assets/hero.jpg", title: "Modular Solutions", lead: "Built to be different.", cta: "Modular Solutions" },
  ];

  const heroEl = $(".hero");
  const heroStage = $("#heroSlides");
  const heroDots = $("#heroDots");
  const heroTitle = $("#heroTitle");
  const heroLead = $("#heroLead");
  const heroCta = $("#heroCta");

  heroStage.innerHTML = heroSlides.map((s, i) => {
    if (s.type === "video") {
      return `<video class="slide-video" muted loop playsinline preload="auto" poster="${s.poster}">
                <source src="${s.src}" type="video/mp4" />
              </video>`;
    }
    return `<img class="slide-img" src="${s.src}" alt="" ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} />`;
  }).join("");

  const heroLayers = $$(".slide-img, .slide-video", heroStage);

  heroDots.innerHTML = heroSlides.map((_, i) =>
    `<button type="button" role="tab" aria-selected="${i === 0}" aria-label="Slide ${i + 1}"></button>`
  ).join("");
  const heroDotBtns = $$("button", heroDots);

  let heroIndex = 0;
  let heroTimer = null;
  const HERO_MS = 6000;

  const applyHero = (i) => {
    const prev = heroIndex;
    heroIndex = (i + heroSlides.length) % heroSlides.length;
    const s = heroSlides[heroIndex];

    heroLayers.forEach((layer, li) => {
      const on = li === heroIndex;
      layer.classList.toggle("is-active", on);
      layer.classList.toggle("is-prev", li === prev && !on);
      if (layer.tagName === "VIDEO") {
        if (on) {
          const p = layer.play();
          if (p && p.catch) p.catch(() => {});
        } else {
          layer.pause();
        }
      }
    });

    heroDotBtns.forEach((b, bi) => b.setAttribute("aria-selected", String(bi === heroIndex)));

    heroTitle.textContent = s.title;
    heroLead.textContent = s.lead;
    heroCta.textContent = s.cta;

    heroEl.classList.remove("is-swapping");
    void heroEl.offsetWidth;
    heroEl.classList.add("is-swapping");
  };

  const startHero = () => {
    if (reduceMotion) return;
    stopHero();
    heroTimer = setInterval(() => applyHero(heroIndex + 1), HERO_MS);
  };
  const stopHero = () => {
    if (heroTimer) clearInterval(heroTimer);
    heroTimer = null;
  };

  heroDotBtns.forEach((b, i) =>
    b.addEventListener("click", () => {
      applyHero(i);
      startHero();
    })
  );
  $("#heroPrev").addEventListener("click", () => { applyHero(heroIndex - 1); startHero(); });
  $("#heroNext").addEventListener("click", () => { applyHero(heroIndex + 1); startHero(); });

  heroEl.addEventListener("mouseenter", stopHero);
  heroEl.addEventListener("mouseleave", startHero);
  heroEl.addEventListener("focusin", stopHero);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopHero();
    else startHero();
  });

  let heroTouchX = null;
  heroEl.addEventListener("touchstart", (e) => {
    stopHero();
    heroTouchX = e.touches[0].clientX;
  }, { passive: true });
  heroEl.addEventListener("touchend", (e) => {
    if (heroTouchX == null) return;
    const dx = e.changedTouches[0].clientX - heroTouchX;
    if (Math.abs(dx) > 45) applyHero(heroIndex + (dx < 0 ? 1 : -1));
    heroTouchX = null;
    startHero();
  }, { passive: true });

  const pauseBtn = document.createElement("button");
  pauseBtn.className = "hero__pause";
  pauseBtn.type = "button";
  pauseBtn.setAttribute("aria-label", "Pause slideshow");
  pauseBtn.innerHTML = '<svg viewBox="0 0 12 12" fill="currentColor"><rect x="2" y="1.5" width="3" height="9"/><rect x="7" y="1.5" width="3" height="9"/></svg>';
  let paused = false;
  pauseBtn.addEventListener("click", () => {
    paused = !paused;
    pauseBtn.setAttribute("aria-label", paused ? "Play slideshow" : "Pause slideshow");
    pauseBtn.innerHTML = paused
      ? '<svg viewBox="0 0 12 12" fill="currentColor"><path d="M3 1.5l7 4.5-7 4.5z"/></svg>'
      : '<svg viewBox="0 0 12 12" fill="currentColor"><rect x="2" y="1.5" width="3" height="9"/><rect x="7" y="1.5" width="3" height="9"/></svg>';
    if (paused) stopHero();
    else startHero();
  });
  heroEl.appendChild(pauseBtn);

  applyHero(0);
  startHero();

  /* ---------- testimonial carousel ---------- */

  const track = $("#carTrack");
  const dotsWrap = $("#carDots");

  track.innerHTML = stories
    .map(
      (s, i) => `
    <li class="slide" role="group" aria-roledescription="slide" aria-label="${i + 1} of ${stories.length}">
      <div class="slide__media">
        <img src="assets/${s.img}" alt="" aria-hidden="true" loading="lazy" width="400" height="400" />
        <span class="slide__quote-mark" aria-hidden="true">&ldquo;</span>
      </div>
      <div class="slide__body">
        <blockquote>${s.quote}</blockquote>
        <div class="slide__person">
          <img src="assets/${s.img}" alt="" aria-hidden="true" loading="lazy" width="48" height="48" />
          <div>
            <strong>${s.name}</strong>
            <span>${s.role}</span>
          </div>
        </div>
      </div>
    </li>`
    )
    .join("");

  let index = 0;
  let timer = null;

  dotsWrap.innerHTML = stories
    .map(
      (_, i) =>
        `<button type="button" role="tab" aria-selected="${i === 0}" aria-label="Story ${i + 1}"></button>`
    )
    .join("");
  const dots = $$("button", dotsWrap);

  const go = (i) => {
    index = (i + stories.length) % stories.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, di) => d.setAttribute("aria-selected", String(di === index)));
  };

  const startAuto = () => {
    if (reduceMotion) return;
    stopAuto();
    timer = setInterval(() => go(index + 1), 6500);
  };
  const stopAuto = () => {
    if (timer) clearInterval(timer);
    timer = null;
  };

  $("#carNext").addEventListener("click", () => {
    go(index + 1);
    startAuto();
  });
  $("#carPrev").addEventListener("click", () => {
    go(index - 1);
    startAuto();
  });
  dots.forEach((d, i) =>
    d.addEventListener("click", () => {
      go(i);
      startAuto();
    })
  );

  const carousel = $("#carousel");
  carousel.addEventListener("mouseenter", stopAuto);
  carousel.addEventListener("mouseleave", startAuto);
  carousel.addEventListener("focusin", stopAuto);
  carousel.addEventListener("focusout", startAuto);

  track.addEventListener(
    "touchstart",
    (e) => {
      stopAuto();
      carousel.dataset.touchX = String(e.touches[0].clientX);
    },
    { passive: true }
  );
  track.addEventListener(
    "touchend",
    (e) => {
      const startX = Number(carousel.dataset.touchX);
      if (!Number.isFinite(startX)) return;
      const delta = e.changedTouches[0].clientX - startX;
      if (Math.abs(delta) > 45) go(index + (delta < 0 ? 1 : -1));
      delete carousel.dataset.touchX;
      startAuto();
    },
    { passive: true }
  );

  startAuto();

  /* ---------- faq accordion ---------- */

  const faqList = $("#faqList");
  faqList.innerHTML = faqs
    .map(
      (f, i) => `
    <div class="qa">
      <h3>
        <button class="qa__btn" type="button" aria-expanded="false" aria-controls="qa-panel-${i}" id="qa-btn-${i}">
          <span>${f.q}</span>
          <span class="qa__icon" aria-hidden="true"></span>
        </button>
      </h3>
      <div class="qa__panel" id="qa-panel-${i}" role="region" aria-labelledby="qa-btn-${i}" data-open="false">
        <div><p>${f.a}</p></div>
      </div>
    </div>`
    )
    .join("");

  $$(".qa__btn", faqList).forEach((btn) => {
    btn.addEventListener("click", () => {
      const panel = document.getElementById(btn.getAttribute("aria-controls"));
      const open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      panel.dataset.open = String(!open);
    });
  });

  /* ---------- enquiry form ---------- */

  const form = $("#enquiryForm");
  const status = $("#formStatus");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const required = $$("[required]", form);
    let firstBad = null;

    required.forEach((field) => {
      const ok = field.type === "checkbox" ? field.checked : field.value.trim() !== "";
      field.setAttribute("aria-invalid", String(!ok));
      if (!ok && !firstBad) firstBad = field;
    });

    if (firstBad) {
      status.dataset.state = "error";
      status.textContent = "Please complete the highlighted fields.";
      firstBad.focus();
      return;
    }

    status.dataset.state = "ok";
    status.textContent = "Thanks — your enquiry has been recorded for this demo.";
    form.reset();
    $$("[required]", form).forEach((f) => f.setAttribute("aria-invalid", "false"));
  });

  $$("input, textarea", form).forEach((field) =>
    field.addEventListener("input", () => field.setAttribute("aria-invalid", "false"))
  );

  /* ---------- chat widget ---------- */

  $("#helpdesk").addEventListener("click", () => {
    alert("Chat is disabled in this front-end demonstration.");
  });

  /* ---------- nav link smoothing with header offset ---------- */

  $$('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top =
        target.getBoundingClientRect().top + window.scrollY - header.offsetHeight - 12;
      window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
      history.replaceState(null, "", id);
    });
  });
})();
