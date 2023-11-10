(function() {
"use strict";

gsap.registerPlugin(ScrollTrigger);

window.App = {};

App.config = {
  cursorFollower: {
    enabled: true,
    disableBreakpoint: '992', // cursor will be disabled on this device width
  },
}

App.html = document.querySelector('html');
App.body = document.querySelector('body');
App.SMcontroller = new ScrollMagic.Controller();

window.onload = function () {
  document.fonts.ready.then(function () {
    initialReveal()
  })
}

function initialReveal() {
  const preloader = document.querySelector('.js-preloader')
  
  if (!preloader) {
    RevealAnim.init()
    initComponents()
    return
  }

  setTimeout(() => {
    preloader.classList.add('-is-hidden')
    initComponents()
    RevealAnim.init()
  }, 600)
}


// Reloads all scripts when navigating through pages
function initComponents() {
  sectionSlider()
  testimonialsSlider_1()
  marquee()
  calendarSlider()

  menuEvents()
  headerSticky()
  dbSidebarToggle()
  Header.init()

  Tabs.init()
  Accordion.init()
  lazyLoading()
  parallaxInit()
  mapCard()
  galleryInit()
  Cursor.init()

  heroSlider7()
  heroSlider9()
  heroSlider10()

  Select.init(".js-select")
  priceRangeSliderInit()
  requestForm()

  splitText()
  parallaxIt()
  hero1Reveal()
  toTopButton()
  tabsSlider()
  hero5Reveal()
  testimonialsSlider1()
  testimonialsSlider_2()

  lineChart()

  dropdown()
  countChange()

  initMap()
  initMapTourPages()
  initMapSingle()

  Events.init()

  pinOnScroll()
  calendarInteraction()

  selectControl()
  liveSearch()

  //
	// your custom plugins init here
  //
}

function liveSearch() {
  const targets = document.querySelectorAll('.js-liverSearch')
  if (!targets) return

  const data = [
    { icon: "icon-pin", title: "Phuket", text: "Thailand, Asia" },
    { icon: "icon-price-tag", title: "London Day Trips", text: "England" },
    { icon: "icon-flag", title: "Europe", text: "Country" },
    { image: "img/misc/icon.png", title: "Centipede Tour - Guided Arizona Desert Tour by ATV", text: "Country" },
    { icon: "icon-pin", title: "Istanbul", text: "Turkey" },
    { icon: "icon-pin", title: "Berlin", text: "Germany, Europe" },
    { icon: "icon-pin", title: "London", text: "England, Europe" },
  ]

  targets.forEach(el => {
    const search = el.querySelector('.js-search')
    const results = el.querySelector('.js-results')
    let searchTerm = ''

    results.querySelectorAll('.js-search-option').forEach(option => {
      const title = option.querySelector('.js-search-option-target').innerHTML
      option.addEventListener('click', () => search.value = title)
    })

    search.addEventListener('input', (event) => {
      searchTerm = event.target.value.toLowerCase()
      showList(searchTerm, results)

      results.querySelectorAll('.js-search-option').forEach(option => {
        const title = option.querySelector('.js-search-option-target').innerHTML
        option.addEventListener('click', () => search.value = title)
      })
    })
  })

  const showList = (searchTerm, resultsEl) => {
    resultsEl.innerHTML = '';

    data
      .filter((item) => item.title.toLowerCase().includes(searchTerm))
      .forEach((e) => {
        const div = document.createElement('div')

        if (e.image) {
          div.innerHTML = `
            <button class="headerSearchRecent__item js-search-option" data-x-click="headerSearch">
              <div class="size-50 bg-white rounded-12 border-1 flex-center">
                <img src="${e.image}" alt="image" class="rounded-12">
              </div>
              <div class="ml-10">
                <div class="text-overflow fw-500 js-search-option-target">${e.title}</div>
                <div class="lh-14 text-14 text-light-2">${e.text}</div>
              </div>
            </button>
          `
        } else {
          div.innerHTML = `
            <button class="headerSearchRecent__item js-search-option" data-x-click="headerSearch">
              <div class="size-50 bg-white rounded-12 border-1 flex-center">
                <i class="${e.icon} text-20"></i>
              </div>
              <div class="ml-10">
                <div class="fw-500 js-search-option-target">${e.title}</div>
                <div class="lh-14 text-14 text-light-2">${e.text}</div>
              </div>
            </button>
          `
        }

        resultsEl.appendChild(div)
      })
  }
}

function selectControl() {
  const targets = document.querySelectorAll('.js-select-control')
  if (!targets) return

  targets.forEach(el => {
    const chosen = el.querySelector('.js-select-control-chosen')
    const buttons = el.querySelectorAll('.js-select-control-button')

    buttons.forEach(button => {
      const choice = button.querySelector('.js-select-control-choice')

      button.addEventListener('click', () => {
        if (el.querySelector('.-is-button-active')) {
          el.querySelector('.-is-button-active').classList.remove('-is-button-active')
        }

        closeAllDropdowns()

        button.classList.add('-is-button-active')
        chosen.innerHTML = choice.innerHTML
      })
    })
  })
}


function calendarInteraction() {
  const target = document.querySelectorAll('.js-calendar')
  if (!target) return

  target.forEach(elTarget => {
    const gridCells = elTarget.querySelectorAll('.table-calendar__grid > *')

    const firstDate = elTarget.querySelector('.js-first-date')
    const lastDate = elTarget.querySelector('.js-last-date')

    let completeState = false
    let firstItem = false
    let lastItem = false

    gridCells.forEach((el, i) => {
      el.addEventListener('click', () => {
        el.classList.add('-is-active')

        if (firstItem && getIndex(firstItem) > getIndex(el)) {
          lastItem = firstItem
          firstItem = el
        }

        if (firstItem && !lastItem) {
          lastItem = el
        }
        
        if (!firstItem) {
          firstItem = el
        }
        
        if (completeState) {
          firstItem = false
          lastItem = false
          
          const array = elTarget.querySelectorAll('.-is-active')
          array.forEach(el2 => {
            el2.classList.remove('-is-active')
          })
          
          const array2 = elTarget.querySelectorAll('.-is-in-path')
          array2.forEach(el2 => {
            el2.classList.remove('-is-in-path')
          })

          completeState = false

        } else if (firstItem && lastItem) {
          const iterationCount = Math.abs(getIndex(firstItem) - getIndex(lastItem))
    
          for (let l = 1; l < iterationCount; l++) {
            const item = elTarget.querySelector(`[data-index="${ getIndex(firstItem) + l }"]`)
            item.classList.add('-is-in-path')
          }

          if (firstDate) {
            firstDate.innerHTML = `${firstItem.querySelector('.js-date').innerHTML} ${firstItem.getAttribute('data-month')} -`
          }

          if (lastDate) {
            lastDate.innerHTML = `${lastItem.querySelector('.js-date').innerHTML} ${lastItem.getAttribute('data-month')}`
          }
    
          completeState = true
          closeAllDropdowns()
        }
      })
    })
  })

  function getIndex(element) {
    return parseInt(element.getAttribute('data-index'))
  }
}

function calendarSlider() {
  new Swiper('.js-calendar-slider', {
    speed: 600,
    autoHeight: true,
    spaceBetween: 50,

    slidesPerView: 1,
    breakpoints: {
      991: { slidesPerView: 2 },
    },
    
    navigation: {
      prevEl: '.js-calendar-prev',
      nextEl: '.js-calendar-next',
    },
  })

  new Swiper('.js-calendar-slider-2', {
    speed: 600,
    autoHeight: true,
    spaceBetween: 50,
    slidesPerView: 1,
    navigation: {
      prevEl: '.js-calendar-prev',
      nextEl: '.js-calendar-next',
    },
  })
}

function dropdown() {
  const targets = document.querySelectorAll('.js-dropdown')
  if (!targets.length) return

  targets.forEach((target) => {
    const title = target.querySelector('.js-title')
    const button = target.querySelector('.js-button')
    const menuItems = target.querySelectorAll('.js-menu-items > *')

    if (button) {
      button.addEventListener('click', () => {
        closeAllDropdowns()
        target.classList.toggle('is-active')
      })
    }

    menuItems.forEach((el) => {
      el.addEventListener('click', () => {
        if (!target.classList.contains('js-dont-close')) {
          target.classList.toggle('is-active')
          title.innerHTML = el.innerHTML
        }
        target.setAttribute("data-main-value", el.getAttribute('data-value'))
      })
    })
  })
}

function heroSlider7() {
  const target = document.querySelector('.js-hero-type-7 .js-slider')

  new Swiper(target, {
    speed: 600,
    parallax: true,
    lazy: true,
    spaceBetween: 0,
    slidesPerView: 1,

    lazy: {
      loadPrevNext: true,
    },
    navigation: {
      prevEl: ".js-prev",
      nextEl: ".js-next",
    },
  })
}

function heroSlider9() {
  const target = document.querySelector('.js-hero-type-9 .js-slider')

  if (!target) return

  new Swiper(target, {
    // direction: "vertical",
    speed: 600,
    parallax: true,
    lazy: true,
    spaceBetween: 0,
    slidesPerView: 1,
    lazy: {
      loadPrevNext: true,
    },
    pagination: {
      el: '.js-nav',
      clickable: true,
      renderBullet: function (index, className) {
        return `<div class="${className}">0${index + 1}</div>`
      },
    },
    navigation: {
      prevEl: ".js-prev",
      nextEl: ".js-next",
    },
  })
}

function heroSlider10() {
  const target = document.querySelector('.js-hero-type-10 .js-slider')

  new Swiper(target, {
    direction: "vertical",
    speed: 600,
    parallax: true,
    lazy: true,
    spaceBetween: 0,
    slidesPerView: 1,
    mousewheel: {
      invert: false,
    },
    lazy: {
      loadPrevNext: true,
    },
    pagination: {
      el: '.js-pagination',
      bulletClass: 'pagination__item',
      bulletActiveClass: 'is-active',
      bulletElement: 'div',
      clickable: true
    }
  })
}

function mapCard() {
  const targets = document.querySelectorAll('.js-mapPlaces')
  
  targets.forEach((target) => {
    const cards = target.querySelectorAll('[data-map-card]')
    const buttons = target.querySelectorAll(`[data-map-place]`)

    cards.forEach((el) => {
      const attrVal = el.getAttribute('data-map-card')
      const button = target.querySelector(`[data-map-place="${attrVal}"]`)

      el.addEventListener('click', (e) => {
        cards.forEach((el) => el.classList.remove('isCardActive'))
        buttons.forEach((el) => el.classList.remove('isActive'))

        if (!el.classList.contains('isCardActive')) {
          button.classList.toggle('isActive')
          el.classList.add('isCardActive')
        }
      })
    })
  })
}

function galleryInit() {
  GLightbox({
    selector: '.js-gallery',
    touchNavigation: true,
    loop: false,
    autoplayVideos: true,
  });
}

function priceRangeSliderInit() {
  const targets = document.querySelectorAll('.js-price-rangeSlider')

  targets.forEach(el => {
    const slider = el.querySelector('.js-slider')

    noUiSlider.create(slider, {
      start: [20, 70000],
      step: 1,
      connect: true,
      range: {
        'min': 0,
        'max': 100000
      },
      format: {
        to: function (value) {
          return "$" + value.toFixed(0)
        },
  
        from: function (value) {
          return value
        }
      }
    })
  
    const snapValues = [
      el.querySelector('.js-lower'),
      el.querySelector('.js-upper')
    ]
  
    slider.noUiSlider.on('update', function (values, handle) {
      snapValues[handle].innerHTML = values[handle];
    })
  })
}

function requestForm() {
  const buttons = document.querySelectorAll('.js-toggle-requestForm')
  const form = document.querySelector('.js-requestForm')

  if (!buttons || !form) return

  buttons.forEach((el) => {
    el.addEventListener('click', () => form.classList.toggle('is-active'))
  })
}

function splitText() {
  splt({
    target: ".js-splt"
  })
}

function parallaxIt() {
  const target = document.querySelectorAll('.js-mouse-move-container')

  target.forEach(container => {
    const $this = container
    const targets = container.querySelectorAll('.js-mouse-move')
    
    targets.forEach(el => {
      const movement = el.getAttribute('data-move')

      document.addEventListener('mousemove', (e) => {
        const relX = e.pageX - $this.offsetLeft
        const relY = e.pageY - $this.offsetTop
      
        gsap.to(el, {
          x: (relX - $this.offsetWidth / 2) / $this.offsetWidth * -movement,
          duration: 0.4,
        })
      })
    })
  })
}

function hero1Reveal() {
  const hero = document.querySelector('.js-hero-type-1')
  if (!hero) return

  const title = hero.querySelectorAll('.js-title > .char')
  const bg = hero.querySelector('.js-bg')
  const image = hero.querySelector('.js-image')

  gsap.timeline()
    .fromTo(title, {
      opacity: 0,
      y: "-100%",
      rotate: "12deg",
    }, {
      rotate: "0",
      y: "0%",
      opacity: 1,
      duration: 0.25,
      delay: 1.0,
      stagger: 0.1,
    })
    .fromTo(image, {
      opacity: 0,
      y: "32px",
    }, {
      y: "0px",
      opacity: 1,
      duration: 0.5,
    })
}

function hero5Reveal() {
  const hero = document.querySelector('.js-hero-type-5')
  if (!hero) return

  const lines = hero.querySelector('.js-lines')
  const icon = hero.querySelector('.js-icon')
  const image = hero.querySelector('.js-image')
  const subtitle = hero.querySelectorAll('.js-subtitle > *')
  const title = hero.querySelector('.js-title')
  const text = hero.querySelector('.js-text')
  const button = hero.querySelector('.js-button')

  gsap.timeline()
    .fromTo(lines, {
      opacity: 0,
      scale: 0.95,
    }, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      delay: 0.5,
    })
    .fromTo(icon, {
      opacity: 0,
      scale: 0.95,
    }, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      delay: 0.1,
    })
    .fromTo(image, {
      opacity: 0,
      x: "32px",
    }, {
      x: "0px",
      opacity: 1,
      duration: 0.5,
      delay: 0.1,
    })

    .fromTo(subtitle, {
      opacity: 0,
      scale: 0.95,
    }, {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      stagger: 0.5,
      delay: 0.2,
    })
    .fromTo([title, text, button], {
      opacity: 0,
      x: "20px",
    }, {
      x: "0px",
      opacity: 1,
      duration: 0.5,
      stagger: 0.5,
    })
}

function toTopButton() {
  const button = document.querySelector('.js-top-button')
  if (!button) return

  const pageContentHeight = document.querySelector('main').offsetHeight

  new ScrollMagic.Scene({ duration: pageContentHeight - 1600, })
    .setClassToggle(button, 'is-hidden')
    .addTo(App.SMcontroller)

  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

function tabsSlider() {
  const slider = document.querySelector('.js-tabsSlider')

  if (!slider) return

  new Swiper(slider, {
    speed: 400,
    slidesPerView: 1,
    spaceBetween: 0,
    // effect: "fade",
    navigation: {
      prevEl: '.js-tabsSlider-prev',
      nextEl: '.js-tabsSlider-next',
    },
    pagination: {
      el: document.querySelector('.js-tabsSlider-pagination'),
      clickable: true,
      renderBullet: function (index, className) {
        return `<div class="${className}">VILLA STYLE ${index + 1}</div>`
      },
    }
  })
}

function testimonialsSlider1() {
  const slider = document.querySelector('.js-section-slider-testimonials')
  if (!slider) return

  const images = document.querySelector('.js-section-slider-testimonials-images')

  const swiper = new Swiper(slider, {
    speed: 400,
    slidesPerView: 1,
    spaceBetween: 0,
    navigation: {
      prevEl: '.js-section-slider-testimonials-prev',
      nextEl: '.js-section-slider-testimonials-next',
    },
  })

  swiper.on('slideChange', function () {
    console.log(swiper.realIndex)
    images.style.transform = `translateX(${swiper.realIndex * -100}%)`
  })
}

function lineChart() {
  const ctx = document.getElementById('lineChart');
  if (!ctx) return;

  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [
        'Jan', 'Feb', 'Marc', 'April', 'May', 'Jun', 'July', 'Agust', 'Sept', 'Oct', 'Now', 'Dec',
      ],
      datasets: [{
        label: '#',
        data: [148, 100, 205, 110, 165, 145, 180, 156, 148, 220, 180, 245],
        tension: 0.4,
        backgroundColor: '#336CFB',
        borderColor: '#336CFB',
        borderWidth: 2,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          min: 0,
          max: 300,
          ticks: {
            stepSize: 50
          }
        }
      },
    },
  })
}

function countChange() {
  const counters = document.querySelectorAll('.js-counter')
  if (!counters) return

  counters.forEach(el => {
    const count = el.querySelector('.js-count')
    const buttonDown = el.querySelector('.js-down')
    const buttonUp = el.querySelector('.js-up')

    buttonDown.addEventListener('click', () => {
      if (count.innerHTML != 0) {
        count.innerHTML = parseInt(count.innerHTML) - 1
      }
    })

    buttonUp.addEventListener('click', () => {
      count.innerHTML = parseInt(count.innerHTML) + 1
    })
  })
}

function pinOnScroll() {
  const target = document.querySelectorAll('.js-pin-container');
  if (!target) return;

  target.forEach(el => {
    const sceneDuration = el.offsetHeight;
    const sceneOffset = el.querySelector('.js-pin-content').offsetHeight + 90;

    const scene = new ScrollMagic.Scene({
      duration: sceneDuration - sceneOffset,
      offset: sceneOffset,
      triggerElement: el,
      triggerHook: "onEnter",
    })
    .setPin(".js-pin-content")
    .addTo(App.SMcontroller)

    let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

    if (width < 992) {
      scene.duration('1px')
      scene.refresh()
    } else {
      scene.duration(sceneDuration - sceneOffset)
      scene.refresh()
    }

    window.addEventListener('resize', () => {
      let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

      if (width < 992) {
        scene.duration('1px');
        scene.refresh();
      } else {
        scene.duration(sceneDuration - sceneOffset);
        scene.refresh();
      }
    })
  });
}

function headerSticky() {
  const target = document.querySelector(".js-header")
  if (!target) return

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      target.classList.add('-is-sticky')
    } else {
      target.classList.remove('-is-sticky')
    }
  })
}

function dbSidebarToggle() {
  const target = document.querySelector(".js-toggle-db-sidebar")
  if (!target) return

  const dashboard = document.querySelector(".js-dashboard")

  if (window.innerWidth < 575) dashboard.classList.remove("-is-sidebar-visible")

  target.addEventListener('click', () => dashboard.classList.toggle("-is-sidebar-visible"))
}

function menuEvents() {
  let isMenuOpen = false
  const menuButtons = document.querySelectorAll('.js-menu-button')

  menuButtons.forEach((el) => {
    el.addEventListener('click', (e) => {
      if (!isMenuOpen) {
        menuOpen()
        isMenuOpen = true
      } else {
        menuClose()
        isMenuOpen = false
      }
    })
  })
}

function menuOpen() {
  const menu = document.querySelector('.js-menu')
  const header = document.querySelector('.js-header')

  gsap.timeline()
    .to(menu, {
      opacity: 1,
      onStart: () => {
        menu.classList.add("-is-active")
        document.body.classList.add("overflow-hidden")
        header.classList.add("-dark")
      }
    })
}

function menuClose() {
  const menu = document.querySelector('.js-menu')
  const header = document.querySelector('.js-header')

  gsap.timeline()
    .to(menu, {
      opacity: 0,
      onStart: () => {
        menu.classList.remove("-is-active")
        document.body.classList.remove("overflow-hidden")
        header.classList.remove("-dark")
      }
    })
}


const Header = (function() {
  let navList;
  let navBtnListBack;
  let menuDeepLevel;
  let timeline = gsap.timeline();

  function updateVars() {
    navList = document.querySelector('.js-navList');
    navBtnListBack = document.querySelectorAll('.js-nav-list-back');
    menuDeepLevel = 0;
  }
  
  function init() {
    updateVars()
    menuListBindEvents()
  }

  function deepLevelCheck(level) {
    return level;
  }

  function menuListBindEvents() {
    const listItems = document.querySelectorAll('.js-navList .js-has-submenu');
    if (!listItems.length) return;

    navBtnListBack.forEach(el => {
      el.addEventListener('click', () => {
        const visibleList = navList.querySelector('ul.-is-active');
        const parentList = visibleList.parentElement.parentElement;
  
        menuDeepLevel--;
        menuListStepAnimate(visibleList, parentList, menuDeepLevel);
      })
    })

    listItems.forEach(el => {
      const parentLink = el.querySelector('li > a');
      parentLink.removeAttribute('href');

      parentLink.addEventListener('click', () => {
        const parent = el.parentElement;
        const subnavList = el.lastElementChild;

        menuDeepLevel++;
        menuListStepAnimate(parent, subnavList, menuDeepLevel, parentLink.innerHTML);
      });
    });
  }

  function menuListStepAnimate(hideList, showList, level) {
    let hideListItems = hideList.children;
    hideListItems = Array.from(hideListItems);
    const hideListLinks = hideListItems.map(item => item.querySelector('li > a'));
    
    let showListItems = showList.children;
    showListItems = Array.from(showListItems);
    const showListLinks = showListItems.map(item => item.querySelector('li > a'));

    // let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    // if (width < 1199 || document.querySelector('.js-desktopMenu')) {}

    timeline
      .clear()

    if (!deepLevelCheck(level)) {
      gsap.to(navBtnListBack, {
        ease: "quart.inOut",
        duration: 0.6,
        opacity: 0,
      })
    }
    
    timeline.to(hideListLinks, {
      ease: 'quart.out',
      stagger: -0.04,
      duration: 0.8,
      y: '100%',
      onStart: () => {
        showList.classList.add('-is-active');
      },
      onComplete: () => {
        hideList.classList.remove('-is-active');
      },
    })

    if (deepLevelCheck(level)) {
      timeline.to(navBtnListBack, {
        ease: "quart.inOut",
        duration: 0.6,
        y: '0px',
        opacity: 1,
      }, '>-0.5')
    }

    timeline.to(showListLinks, {
      ease: 'quart.out',
      stagger: 0.08,
      duration: 0.9,
      y: '0%',
    }, '>-0.6')
  }

  function headerSticky() {
    const header = document.querySelector('.js-header');
    if (!header) return;
  
    let classList = ''
  
    if (header.getAttribute('data-add-bg')) {
      classList = header.getAttribute('data-add-bg')
    }
  
    new ScrollMagic.Scene({ offset: '6px', })
      .setClassToggle(header, classList)
      .addTo(App.SMcontroller);
  
    new ScrollMagic.Scene({ offset: '6px', })
      .setClassToggle(header, 'is-sticky')
      .addTo(App.SMcontroller);
  }

  return {
    headerSticky: headerSticky,
    init: init,
  }
})();

function marquee() {
  const targets = document.querySelectorAll('.js-marquee')

  if (!targets) return

  targets.forEach((el) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        scrub: 1,
        // markers: true,
      }
    })
  
    tl
      .to(".js-first", {duration: 4, xPercent: -80})
      .to(".js-second", {duration: 4, xPercent: 80}, "<")
  })
}

/*--------------------------------------------------
  08. Section sliders
---------------------------------------------------*/

function sectionSlider() {
  const sectionSlider = document.querySelectorAll('.js-section-slider');
  if (!sectionSlider.length) return;

  for (let i = 0; i < sectionSlider.length; i++) {
    const el = sectionSlider[i];

    let prevNavElement = el.querySelector('.js-prev')
    let nextNavElement = el.querySelector('.js-next')

    if (el.getAttribute('data-nav-prev'))
      prevNavElement = document.querySelector(`.${el.getAttribute('data-nav-prev')}`)
    if (el.getAttribute('data-nav-next'))
      nextNavElement = document.querySelector(`.${el.getAttribute('data-nav-next')}`)
    
    let gap = 0;
    let loop = false;
    let centered = false;
    let pagination = false;
    let scrollbar = false;

    if (el.getAttribute('data-gap'))    gap = el.getAttribute('data-gap');
    if (el.hasAttribute('data-loop'))   loop = true;
    if (el.hasAttribute('data-center')) centered = true;

    if (el.getAttribute('data-pagination')) {
      let paginationElement = document.querySelector(`.${el.getAttribute('data-pagination')}`)
      
      pagination = {
        el: paginationElement,
        bulletClass: 'pagination__item',
        bulletActiveClass: 'is-active',
        bulletElement: 'div',
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + 0 + (index + 1) + "</span>";
        },
      }
    }

    if (el.hasAttribute('data-scrollbar')) {
      scrollbar = {
        el: '.js-scrollbar',
        draggable: true,
      }
    }
   
    const colsArray = el.getAttribute('data-slider-cols').split(' ');

    let cols_base = 1;
    let cols_xl = 1;
    let cols_lg = 1;
    let cols_md = 1;
    let cols_sm = 1;

    colsArray.forEach(el => {
      if (el.includes('base')) cols_base = el.slice(-1);
      if (el.includes('xl')) cols_xl = el.slice(-1);
      if (el.includes('lg')) cols_lg = el.slice(-1);
      if (el.includes('md')) cols_md = el.slice(-1);
      if (el.includes('sm')) cols_sm = el.slice(-1);
    });

    new Swiper(el, {
      speed: 600,
      autoHeight: true,
      
      centeredSlides: centered,
      parallax: true,
      watchSlidesVisibility: true,
      loop: loop,
      loopAdditionalSlides: 1,
      preloadImages: false,
      lazy: true,
      
      scrollbar: scrollbar,
      pagination: pagination,
      spaceBetween: 10,
      
      // width: 330,
      slidesPerView: parseInt(cols_base),
      breakpoints: {
        1199: { slidesPerView: parseInt(cols_xl), width: null, spaceBetween: parseInt(gap), },
        991: { slidesPerView: parseInt(cols_lg), width: null, spaceBetween: parseInt(gap), },
        767:  { slidesPerView: parseInt(cols_md), width: null, spaceBetween: parseInt(gap), },
        574:  { slidesPerView: parseInt(cols_sm), width: null, spaceBetween: parseInt(gap), },
      },

      lazy: {
        loadPrevNext: true,
      },
      navigation: {
        prevEl: prevNavElement,
        nextEl: nextNavElement,
      },
    })
  }
}

function testimonialsSlider_1() {
  new Swiper('.js-testimonials-slider-1', {
    speed: 400,
    slidesPerView: 1,
    spaceBetween: 0,
    effect: "cards",
    lazy: {
      loadPrevNext: true,
    },
    breakpoints: {
      767:  { width: 430 },
    },
    pagination: {
      el: '.js-testimonials-pagination',
      bulletClass: 'pagination__item',
      bulletActiveClass: 'is-active',
      bulletElement: 'div',
      clickable: true
    }
  })
}

function testimonialsSlider_2() {
  const slider = new Swiper('.js-testimonialsSlider_1', {
    speed: 400,
    slidesPerView: 1,
    lazy: {
      loadPrevNext: true,
    },
  })

  const paginationItems = document.querySelectorAll('.js-testimonialsSlider_1-pagination > *')

  paginationItems.forEach((el, i) => {
    el.addEventListener('click', () => {
      document
        .querySelector('.js-testimonialsSlider_1-pagination .is-active')
        .classList.remove('is-active')
      el.classList.add('is-active')
      slider.slideTo(i)
    })
  })

  slider.on('slideChangeTransitionStart', () => {
    document
      .querySelector('.js-testimonialsSlider_1-pagination .is-active')
      .classList.remove('is-active')
    paginationItems[slider.realIndex].classList.add('is-active')
  })
}

const Tabs = (function() {
  function init() {
    const targets = document.querySelectorAll(".js-tabs");
    if (!targets) return;

    targets.forEach(el => {
      singleTab(el)
    })
  }

  function singleTab(target) {
    const controls = target.querySelector('.js-tabs-controls');
    const controlsItems = target.querySelectorAll('.js-tabs-controls .js-tabs-button');
    const content = target.querySelector('.js-tabs-content');

    for (let l = 0; l < controlsItems.length; l++) {
      const el = controlsItems[l];
      
      el.addEventListener("click", (e) => {
        const selector = el.getAttribute('data-tab-target');

        controls.querySelector('.is-tab-el-active').classList.remove('is-tab-el-active')
        content.querySelector('.is-tab-el-active').classList.remove('is-tab-el-active')

        el.classList.add('is-tab-el-active')
        content.querySelector(selector).classList.add('is-tab-el-active')
      });
    }
  }

  return {
    init: init,
  }
})();

const Accordion = (function() {
  function init() {
    const targets = document.querySelectorAll(".js-accordion");
    if (!targets) return;

    for (let i = 0; i < targets.length; i++) {
      const items = targets[i].querySelectorAll('.accordion__item');

      for (let l = 0; l < items.length; l++) {
        const button = items[l].querySelector('.accordion__button')
        const content = items[l].querySelector('.accordion__content')
        const titleChange = items[l].querySelector('[data-open-change-title]')
        let buttonOrigTitle
        let buttonNewTitle

        if (items[l].classList.contains('js-accordion-item-active')) {
          items[l].classList.toggle('is-active')
          content.style.maxHeight = content.scrollHeight + "px"
        }

        if (titleChange) {
          buttonOrigTitle = titleChange.innerHTML
          buttonNewTitle = titleChange.getAttribute('data-open-change-title')
        }
        
        button.addEventListener("click", (e) => {
          items[l].classList.toggle('is-active');

          if (titleChange) {
            if (items[l].classList.contains('is-active')) {
              titleChange.innerHTML = buttonNewTitle
            } else {
              titleChange.innerHTML = buttonOrigTitle
            }
          }
  
          if (content.style.maxHeight) {
            content.style.maxHeight = null
          } else {
            content.style.maxHeight = content.scrollHeight + "px"
          }
        })
      }
    }
  }

  return {
    init: init,
  }
})();

const ShowMore = (function() {
  function init() {
    const targets = document.querySelectorAll(".js-show-more");
    if (!targets) return;

    targets.forEach((el, i) => {
      const button = el.querySelector('.show-more__button')
      const content = el.querySelector('.show-more__content')
      
      button.addEventListener("click", (e) => {
        el.classList.toggle('is-active')

        if (content.style.maxHeight) {
          content.style.maxHeight = null
        } else {
          content.style.maxHeight = content.scrollHeight + "px"
        }
      })
    })
  }

  return {
    init: init,
  }
})();

/*--------------------------------------------------
  12. Parallax
---------------------------------------------------*/

function parallaxInit() {
  if (!document.querySelector('[data-parallax]')) return;
  const target = document.querySelectorAll('[data-parallax]')

  target.forEach(el => {
    jarallax(el, {
      speed: el.getAttribute('data-parallax'),
      imgElement: '[data-parallax-target]',
    })
  })
}

/*--------------------------------------------------
  06. Elements reveal
---------------------------------------------------*/

const RevealAnim = (function() {
  function single() {
    const animationTarget = document.querySelectorAll('[data-anim]');
    if (!animationTarget.length) return;

    for (let i = 0; i < animationTarget.length; i++) {
      const el = animationTarget[i];
    
      new ScrollMagic.Scene({
        offset: '350px',
        triggerElement: el,
        triggerHook: "onEnter",
        reverse: false,
      })
      .on('enter', function (event) {
        animateElement(el);
      })
      .addTo(App.SMcontroller)
    }
  }
  
  function container() {
  
    const animationContainer = document.querySelectorAll('[data-anim-wrap]');
  
    if (!animationContainer.length) {
      return;
    }
    
    for (let i = 0; i < animationContainer.length; i++) {
      const el = animationContainer[i];
    
      new ScrollMagic.Scene({
        offset: '350px',
        triggerElement: el,
        triggerHook: "onEnter",
        reverse: false,
      })
      .on('enter', function (event) {
        
        const animChilds = el.querySelectorAll('[data-anim-child]');
        el.classList.add('animated');
        animChilds.forEach(el => animateElement(el));
        
      })
      .addTo(App.SMcontroller)
    }
  
  }
  

  function animateElement(target) {
    
    let attrVal;
    let animDelay;
    let attrDelayPart;
  
    if (target.getAttribute('data-anim')) {
      attrVal = target.getAttribute('data-anim');
    } else {
      attrVal = target.getAttribute('data-anim-child');
    }
    
    if (attrVal.includes('delay-')) {
      attrDelayPart = attrVal.split(' ').pop();
      animDelay = attrDelayPart.substr(attrDelayPart.indexOf('-') + 1) / 10;
    }
  
    if (attrVal.includes('counter')) {
      counter(target, animDelay);
    }
    else if (attrVal.includes('line-chart')) {
      lineChart(target, animDelay);
    }
    else if (attrVal.includes('pie-chart')) {
      pieChart(target, animDelay);
    }
    else if (attrVal.includes('split-lines')) {
      splitLines(target, animDelay);
    }
    else {
      target.classList.add('is-in-view');
    }

  }

  function pieChart(target, animDelay = 0) {
  
    const counterVal = target.getAttribute('data-percent');
    const chartBar = target.querySelector('.js-chart-bar');
    
    if (counterVal < 0) { counterVal = 0;}
    if (counterVal > 100) { counterVal = 100;}
    
    gsap.fromTo(chartBar, {
      drawSVG: `0%`,
    }, {
      delay: 0.3 + animDelay,
      duration: 1.4,
      ease: 'power3.inOut',
      drawSVG: `${counterVal}%`,
  
      onStart: () => {
        chartBar.classList.remove('bar-stroke-hidden');
      }
    });
  
  
    let object = { count: 0 };
    const barPercent = target.querySelector('.js-chart-percent');
  
    gsap.to(object, {
      count: counterVal,
      delay: 0.45 + animDelay,
      duration: 1,
      ease: 'power3.inOut',
      
      onUpdate: function() {
        barPercent.innerHTML = Math.round(object.count) + '%';
      },
    });
  
  }
  
  function lineChart(target, animDelay = 0) {
  
    const counterVal = target.getAttribute('data-percent');
  
    gsap.fromTo(target.querySelector('.js-bar'), {
      scaleX: 0,
    }, {
      delay: 0.45 + animDelay,
      duration: 1,
      ease: 'power3.inOut',
      scaleX: counterVal / 100,
    })
  
  
    let object = { count: 0 };
    const barPercent = target.querySelector('.js-number');
  
    gsap.to(object, {
      count: counterVal,
      delay: 0.45 + animDelay,
      duration: 1,
      ease: 'power3.inOut',
      
      onUpdate: function() {
        barPercent.innerHTML = Math.round(object.count);
      },
    });
  
  }
  
  function counter(target, animDelay = 0) {
  
    const counterVal = target.getAttribute('data-counter');
    const counterAdd = target.getAttribute('data-counter-add');
    const totalDelay = animDelay;
    let symbols = '';
    
    let object = { count: 0 };
    const counterNum = target.querySelector('.js-counter-num');

    if (counterAdd) {
      symbols = counterAdd;
    }
  
    gsap.to(object, {
      count: counterVal,
      delay: totalDelay,
      duration: 1.8,
      ease: 'power3.inOut',
      
      onUpdate: function() {
        counterNum.innerHTML = Math.round(object.count) + symbols;
      },
    });
  
  }

  function init() {
    single();
    container();
  }

  return {
    init: init,
  }
})();

/*--------------------------------------------------
  11. Lazy loading
---------------------------------------------------*/

function lazyLoading() {
  if (!document.querySelector('.js-lazy')) {
    return;
  }

  new LazyLoad({
    elements_selector: ".js-lazy",
  });
}

const Select = (function() {
  function init(selector) {
    document.querySelectorAll(selector).forEach((el) => singleSelect(el))
    document.querySelectorAll('.js-multiple-select').forEach((el) => multipleSelect(el))
  }

  function multipleSelect(target) {
    console.log(target)
    const button = target.querySelector('.js-button')
    const title = button.querySelector('.js-button-title')
    
    button.addEventListener('click', () => {
      let dropdown = target.querySelector('.js-dropdown')
      
      if (dropdown.classList.contains('-is-visible')) {
        dropdown.classList.remove('-is-visible')
      } else {
        closeAlldropdowns()
        dropdown.classList.add('-is-visible')
      }
    })

    const dropdown = target.querySelector('.js-dropdown')
    const options = dropdown.querySelectorAll('.js-options > *')

    options.forEach((el) => {
      el.addEventListener('click', () => {
        let selectedValues = []
        el.classList.toggle('-is-choosen')

        const array = dropdown.querySelectorAll('.-is-choosen .js-target-title')
        array.forEach((el2) => {
          selectedValues.push(el2.innerHTML)
        })

        if (!array.length) {
          title.innerHTML = "Default"
          target.setAttribute("data-select-value", "")
        } else {
          title.innerHTML = selectedValues.join(', ')
          target.setAttribute("data-select-value", selectedValues.join(', '))
        }

        const checkbox = el.querySelector('input')
        checkbox.checked = !checkbox.checked
      })
    })
  }

  function singleSelect(target) {
    const button = target.querySelector('.js-button')
    const title = button.querySelector('.js-button-title')
    
    if (target.classList.contains('js-liveSearch')) {
      liveSearch(target)
    }

    button.addEventListener('click', () => {
      let dropdown = target.querySelector('.js-dropdown')
      
      if (dropdown.classList.contains('-is-visible')) {
        dropdown.classList.remove('-is-visible')
      } else {
        closeAlldropdowns()
        dropdown.classList.add('-is-visible')
      }
      
      if (target.classList.contains('js-liveSearch')) {
        target.querySelector('.js-search').focus()
      }
    })

    const dropdown = target.querySelector('.js-dropdown')
    const options = dropdown.querySelectorAll('.js-options > *')

    options.forEach((el) => {
      el.addEventListener('click', () => {
        title.innerHTML = el.innerHTML
        target.setAttribute("data-select-value", el.getAttribute('data-value'))
        dropdown.classList.toggle('-is-visible')
      })
    })
  }

  function liveSearch(target) {
    const search = target.querySelector('.js-search')
    const options = target.querySelectorAll('.js-options > *')
    
    search.addEventListener('input', (event) => {
      let searchTerm = event.target.value.toLowerCase()

      options.forEach((el) => {
        el.classList.add('d-none')

        if (el.getAttribute('data-value').includes(searchTerm)) {
          el.classList.remove('d-none')
        }
      })
    })
  }

  function closeAlldropdowns() {
    const targets = document.querySelectorAll('.js-select, .js-multiple-select')
    if (!targets) return
    
    targets.forEach(el => {
      if (el.querySelector('.-is-visible')) {
        el.querySelector('.-is-visible').classList.remove('-is-visible')
      }
    })
  }

  return {
    init: init,
  }
})()

/*--------------------------------------------------
  05. Custom cursor
---------------------------------------------------*/

const Cursor = (function() {

  const cursor = document.querySelector(".js-cursor");
  let follower;
  let label;
  let icon;

  let clientX;
  let clientY;
  let cursorWidth;
  let cursorHeight;
  let cursorTriggers;
  let state;

  function variables() {

    follower = cursor.querySelector(".js-follower");
    label = cursor.querySelector(".js-label");
    icon = cursor.querySelector(".js-icon");

    clientX = -100;
    clientY = -100;
    cursorWidth = cursor.offsetWidth / 2;
    cursorHeight = cursor.offsetHeight / 2;
    cursorTriggers;
    state = false;

  }

  function init() {

    if (!cursor) return;

    variables();
    state = true;
    cursor.classList.add('is-enabled');

    document.addEventListener("mousedown", e => {
      cursor.classList.add('is-mouse-down');
    });

    document.addEventListener("mouseup", e => {
      cursor.classList.remove('is-mouse-down');
    });

    document.addEventListener("mousemove", (event) => {
      clientX = event.clientX;
      clientY = event.clientY;
    });

    const render = () => {
      cursor.style.transform = `translate(${clientX - cursorWidth}px, ${clientY - cursorHeight}px)`;
      requestAnimationFrame(render);
    };

    requestAnimationFrame(render);

    update();
    breakpoint();

  }

  function enterHandler({ target }) {

    cursor.classList.add('is-active');

    if (target.getAttribute('data-cursor-label')) {
      App.body.classList.add('is-cursor-active');
      cursor.classList.add('has-label');
      label.innerHTML = target.getAttribute('data-cursor-label');
    }

    if (target.getAttribute('data-cursor-label-light')) {
      App.body.classList.add('is-cursor-active');
      cursor.classList.add('has-label-light');
      label.innerHTML = target.getAttribute('data-cursor-label-light');
    }

    if (target.getAttribute('data-cursor-icon')) {
      App.body.classList.add('is-cursor-active');
      cursor.classList.add('has-icon');
      const iconAttr = target.getAttribute('data-cursor-icon');
      icon.innerHTML = feather.icons[iconAttr].toSvg();
    }

  }
  
  function leaveHandler() {

    App.body.classList.remove('is-cursor-active');
    cursor.classList.remove('is-active');
    cursor.classList.remove('has-label');
    cursor.classList.remove('has-label-light');
    cursor.classList.remove('has-icon');
    label.innerHTML = '';
    icon.innerHTML = '';

  }

  function update() {

    if (!cursor) return;

    cursorTriggers = document.querySelectorAll([
      "button",
      "a",
      "input",
      "[data-cursor]",
      "[data-cursor-label]",
      "[data-cursor-label-light]",
      "[data-cursor-icon]",
      "textarea"
    ]);
    
    cursorTriggers.forEach(el => {
      el.addEventListener("mouseenter", enterHandler);
      el.addEventListener("mouseleave", leaveHandler);
    });

  }

  function clear() {

    if (!cursor) return;
    
    cursorTriggers.forEach(el => {
      el.removeEventListener("mouseenter", enterHandler);
      el.removeEventListener("mouseleave", leaveHandler);
    });

  }

  function hide() {

    if (!cursor) return;
    cursor.classList.add('is-hidden');

  }

  function show() {

    if (!cursor) return;
    cursor.classList.remove('is-hidden');

  }

  function breakpoint() {

    if (!state) return;
    if (!App.config.cursorFollower.disableBreakpoint) return;

    let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

    if (width < App.config.cursorFollower.disableBreakpoint) {
      state = false;
      cursor.classList.remove('is-enabled');
      clear();
    } else {
      state = true;
      cursor.classList.add('is-enabled');
      update();
    }

    window.addEventListener('resize', () => {
      let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

      if (width < App.config.cursorFollower.disableBreakpoint) {
        state = false;
        cursor.classList.remove('is-enabled');
        clear();
      } else {
        state = true;
        cursor.classList.add('is-enabled');
        update();
      }
    })

  }

  return {
    init: init,
    leaveHandler: leaveHandler,
    update: update,
    clear: clear,
    hide: hide,
    show: show,
  };

})();

/*--------------------------------------------------
  ?. Map
---------------------------------------------------*/

class HTMLMapMarker extends google.maps.OverlayView {
  constructor(args) {
    super();
    this.latlng = args.latlng
    this.html = args.html
    this.setMap(args.map)
  }

  createDiv() {
    this.div = document.createElement('div');
    this.div.style.position = 'absolute';
    
    if (this.html) {
      this.div.innerHTML = this.html;
    }
    google.maps.event.addDomListener(this.div, 'click', event => {
      google.maps.event.trigger(this, 'click');
    });
  }

  appendDivToOverlay() {
    const panes = this.getPanes();
    panes.overlayMouseTarget.appendChild(this.div);
  }

  positionDiv() {
    const point = this.getProjection().fromLatLngToDivPixel(this.latlng);
    if (point) {
      this.div.style.left = `${point.x}px`;
      this.div.style.top = `${point.y}px`;
    }
  }

  draw() {
    if (!this.div) {
      this.createDiv();
      this.appendDivToOverlay();
    }
    this.positionDiv();
  }

  remove() {
    if (this.div) {
      this.div.parentNode.removeChild(this.div);
      this.div = null;
    }
  }

  getVisible() {
    return this.latlng;
  }

  getPosition() {
    return new google.maps.LatLng(this.latlng);
  }

  getDraggable() {
    return false;
  }
}

function initMap() {
  if (!document.querySelector('.js-map')) return

  const map = new google.maps.Map(document.querySelector('.js-map'), {
    zoom: 12,
    center: {
      lat: 40.69,
      lng: -73.88
    }
  })

  const locations = [
    { lat: 40.800610, lng: -74.035242 },
    { lat: 40.730610, lng: -73.935242 },
    { lat: 40.740610, lng: -73.825242 },
    { lat: 40.700610, lng: -73.885242 },
    { lat: 40.670610, lng: -73.785242 },
    { lat: 40.680610, lng: -73.905242 },
  ]

  const contentString = `
    <div class="tourCard -type-1 pt-10 pb-15 px-10 border-1 rounded-12">
      <div class="tourCard__header">
        <div class="tourCard__image ratio ratio-28:20">
          <img src="img/tourCards/1/1.png" alt="image" class="img-ratio rounded-12">
        </div>

        <button class="tourCard__favorite">
          <i class="icon-heart"></i>
        </button>
      </div>

      <div class="tourCard__content px-10 pt-15">
        <div class="tourCard__location d-flex items-center text-13 text-light-2">
          <i class="icon-pin d-flex text-16 text-light-2 mr-5"></i>
          New York, USA
        </div>
        
        <h3 class="tourCard__title text-16 fw-500 mt-10">
          <span>Phi Phi Islands Day Tour from Phuket</span>
        </h3>

        <div class="tourCard__rating d-flex items-center text-13 mt-10">
          <div class="d-flex x-gap-5">
            <div><i class="icon-star text-10 text-yellow-2"></i></div>
            <div><i class="icon-star text-10 text-yellow-2"></i></div>
            <div><i class="icon-star text-10 text-yellow-2"></i></div>
            <div><i class="icon-star text-10 text-yellow-2"></i></div>
            <div><i class="icon-star text-10 text-yellow-2"></i></div>
          </div>

          <span class="text-dark-1 ml-10">4.8 (269)</span>
        </div>

        <div class="d-flex justify-between items-center border-1-top text-13 text-dark-1 pt-15 mt-15">
          <div class="d-flex items-center">
            <i class="icon-clock text-16 mr-5"></i>
            4 days
          </div>

          <div>From <span class="text-16 fw-500">$771,00</span></div>
        </div>
      </div>
    </div>
  `;

  const markers = locations.map((location) => {
    const marker = new HTMLMapMarker({
      latlng: location,
      map: map,
      html: `
        <div class="mapMarker bg-white rounded-200 border-dark-1 px-20 py-10">
          <div class="text-14 fw-500">US$72</div>
        </div>
      `
    })

    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    })

    google.maps.event.addListener(map, 'click', function() {
      infowindow.close()
    })
  
    marker.addListener("click", () => {
      setTimeout(() => {
        infowindow.open({
          anchor: marker,
          map,
          shouldFocus: false,
        })
      }, 50);
    })

    return marker;
  })

  new markerClusterer.MarkerClusterer({ map, markers: markers })
}

function initMapTourPages() {
  if (!document.querySelector('.js-map-tour')) return

  const map = new google.maps.Map(document.querySelector('.js-map-tour'), {
    zoom: 10,
    center: {
      lat: 40.8,
      lng: -74.02
    }
  })

  const locations = [
    { lat: 40.800610, lng: -74.035242 },
    { lat: 41.000610, lng: -74.135242 },
    { lat: 40.700610, lng: -73.835242 },
  ]

  const contentString = `
    <div class="flex-center rounded-4">
      <div class="px-15 py-15">
        <div class="text-16 fw-500">Khao Sok National Park</div>
      </div>
    </div>
  `;

  const markers = locations.map((location, index) => {
    const marker = new HTMLMapMarker({
      latlng: location,
      map: map,
      html: `
        <div class="mapMarker button -outline-accent-1 flex-center bg-white rounded-200 border-accent-1 size-40 text-accent-1">
          <div class="text-14 fw-500">${index + 1}</div>
        </div>
      `
    })

    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    })

    google.maps.event.addListener(map, 'click', function() {
      infowindow.close()
    })
  
    marker.addListener("click", () => {
      setTimeout(() => {
        infowindow.open({
          anchor: marker,
          map,
          shouldFocus: false,
        })
      }, 50);
    })

    return marker;
  })

  new markerClusterer.MarkerClusterer({ map, markers: markers })
}

function initMapSingle() {
  if (!document.querySelector('.js-map-single')) return

  // const map = 
  new google.maps.Map(document.querySelector('.js-map-single'), {
    zoom: 12,
    center: {
      lat: 40.8,
      lng: -74.02
    }
  })

  // const locations = [
  //   { lat: 40.800610, lng: -74.035242 },
  // ]

  // const markers = locations.map((location) => {
  //   const marker = new HTMLMapMarker({
  //     latlng: location,
  //     map: map,
  //     html: `
  //       <div class="mapMarker flex-center bg-white rounded-100 bg-dark-1 size-40">
  //         <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  //           <g clip-path="url(#clip0_238_16072)">
  //           <path d="M10.0003 9.58022C11.8081 9.58022 13.2789 8.10963 13.2789 6.30205C13.2789 4.49447 11.8081 3.02393 10.0003 3.02393C8.19246 3.02393 6.72168 4.49447 6.72168 6.30205C6.72168 8.10963 8.19246 9.58022 10.0003 9.58022ZM10.0003 4.19565C11.1619 4.19565 12.107 5.14061 12.107 6.30205C12.107 7.46354 11.162 8.4085 10.0003 8.4085C8.83859 8.4085 7.89355 7.46354 7.89355 6.30205C7.89355 5.14061 8.83863 4.19565 10.0003 4.19565Z" fill="white"/>
  //           <path d="M6.43022 12.1926C7.31831 13.3948 6.96151 12.9273 9.51952 16.5795C9.75202 16.9127 10.2464 16.9143 10.4803 16.58C13.0498 12.9105 12.6963 13.3752 13.5699 12.1926C14.4549 10.9945 15.37 9.75555 15.8715 8.30375C16.5973 6.20215 16.2836 4.12273 14.9882 2.44852C14.9881 2.44852 14.9881 2.44848 14.9881 2.44848C13.8014 0.915312 11.9367 0 10.0001 0C8.06338 0 6.1987 0.915312 5.01201 2.44855C3.71658 4.12277 3.40283 6.20223 4.12869 8.30383C4.6301 9.75559 5.54526 10.9945 6.43022 12.1926ZM5.93881 3.16559C6.90514 1.91711 8.42338 1.17172 10.0001 1.17172C11.5767 1.17172 13.095 1.91711 14.0613 3.16559L14.0612 3.16555C15.1068 4.5168 15.3563 6.20578 14.7638 7.92133C14.3208 9.20367 13.4599 10.3693 12.6273 11.4965C11.979 12.3741 12.173 12.1057 10.0001 15.2204C7.8294 12.1088 8.02096 12.3738 7.37288 11.4965C6.54026 10.3693 5.67928 9.20363 5.23635 7.92133C4.64385 6.20574 4.8933 4.5168 5.93881 3.16559Z" fill="white"/>
  //           <path d="M6.91156 14.7331C6.73875 14.4596 6.37687 14.3779 6.10328 14.5507L4.43726 15.6029C4.07382 15.8325 4.07347 16.3638 4.43726 16.5936L9.68726 19.9095C9.8784 20.0303 10.122 20.0302 10.3131 19.9095L15.5631 16.5936C15.9266 16.364 15.9269 15.8327 15.5631 15.6029L13.8971 14.5507C13.6234 14.3779 13.2616 14.4596 13.0888 14.7331C12.9159 15.0067 12.9977 15.3685 13.2713 15.5413L14.153 16.0983L10.0002 18.7212L5.8473 16.0983L6.7291 15.5413C7.00269 15.3686 7.08437 15.0067 6.91156 14.7331Z" fill="white"/>
  //           </g>
  //           <defs>
  //           <clipPath id="clip0_238_16072">
  //           <rect width="20" height="20" fill="white"/>
  //           </clipPath>
  //           </defs>
  //         </svg>
  //       </div>
  //     `
  //   })

  //   return marker;
  // })

  // new markerClusterer.MarkerClusterer({ map, markers: markers })
}

const Events = (function() {
  function init() {
    const targets = document.querySelectorAll("[data-x-click]")
    if (!targets) return

    targets.forEach((eventTarget) => {
      const attributes = eventTarget.getAttribute('data-x-click').split(', ')
      
      attributes.forEach((el) => {
        const target = document.querySelector(`[data-x=${el}]`)
        
        eventTarget.addEventListener('click', () => {
          const toggleClass = target.getAttribute('data-x-toggle')
          if (!target.classList.contains(toggleClass)) {
            closeAllDropdowns()
          }
          target.classList.toggle(toggleClass)
        })
      })
    })
  }

  function ddInit() {
    const targets = document.querySelectorAll(".js-form-dd")
    if (!targets) return

    targets.forEach((el) => {
      const eventTarget = el.querySelector('[data-x-dd-click]')
      const attributes = eventTarget.getAttribute('data-x-dd-click').split(', ')
      
      attributes.forEach((el2) => {
        const target = el.querySelector(`[data-x-dd=${el2}]`)
        const toggleClass = target.getAttribute('data-x-dd-toggle')
        
        eventTarget.addEventListener('click', () => {
          if (eventTarget.querySelector('.js-dd-focus'))
            eventTarget.querySelector('.js-dd-focus').focus()

          if (target.classList.contains(toggleClass)) {
            target.classList.remove(toggleClass)
            el.classList.remove("-is-dd-wrap-active")
          } else {
            closeAllDropdowns()
            target.classList.add(toggleClass)
            el.classList.add("-is-dd-wrap-active")
          }
        })
      })
    })
  }

  // function closeAllDropdowns() {
  //   // const classes = document.querySelectorAll(".-is-dd-wrap-active")
  //   // if (classes) {
  //   //   classes.forEach(el => {
  //   //     el.classList.remove('-is-dd-wrap-active')
  //   //   });
  //   // }

  //   console.log('seoijr')

  //   const targets = document.querySelectorAll(".js-form-dd")
  //   if (!targets) return
  
  //   targets.forEach((el) => {
  //     const eventElement = el.querySelector('[data-x-dd]')
  //     const eventTarget = el.querySelector('[data-x-dd-click]')
  //     const attributes = eventTarget.getAttribute('data-x-dd-click').split(', ')
      
  //     attributes.forEach((el) => {
  //       eventElement.classList.remove('-is-active')
  //       const target = document.querySelector(`[data-x-dd=${el}]`)
  //       const toggleClass = target.getAttribute('data-x-dd-toggle')
  //       target.classList.remove(toggleClass)
  //     })
  //   })
  // }

  return {
    ddInit: ddInit,
    closeAllDropdowns: closeAllDropdowns,
    init: init,
  }
})()


function closeAllDropdowns() {
  const targets = document.querySelectorAll(".js-form-dd")
  if (!targets) return

  targets.forEach((el) => {
    if (el.querySelector('.is-active')) {
      el.querySelector('.is-active').classList.remove('is-active')
    }
  })

  const alldds = document.querySelectorAll('.js-dropdown.is-active')

  alldds.forEach(el => {
    el.classList.remove('is-active')
  })
}

window.onclick = function(event) {
  if (
    !event.target.closest(".js-form-dd")
  ) {
    console.log('test')
    closeAllDropdowns()
  }

  if (!event.target.closest('.js-select')) {
    const targets = document.querySelectorAll('.js-select')
    if (!targets) return
    
    targets.forEach(el => {
      if (el.querySelector('.-is-visible')) {
        el.querySelector('.-is-visible').classList.remove('-is-visible')
      }
    })
  }

  if (!event.target.closest('.js-multiple-select')) {
    const targets = document.querySelectorAll('.js-multiple-select')
    if (!targets) return
    
    targets.forEach(el => {
      if (el.querySelector('.-is-visible')) {
        el.querySelector('.-is-visible').classList.remove('-is-visible')
      }
    })
  }
}


})();
