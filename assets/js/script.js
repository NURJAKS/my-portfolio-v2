'use strict';

// Script runs after DOM is loaded (defer attribute)
(function () {

  // element toggle function
  const elementToggleFunc = function (elem) {
    if (elem) elem.classList.toggle("active");
  }

  // sidebar variables
  const sidebar = document.querySelector("[data-sidebar]");
  const sidebarBtn = document.querySelector("[data-sidebar-btn]");

  // sidebar toggle functionality for mobile
  if (sidebarBtn && sidebar) {
    sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
  }

  // testimonials variables (only if elements exist)
  const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
  const modalContainer = document.querySelector("[data-modal-container]");
  const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
  const overlay = document.querySelector("[data-overlay]");
  const modalImg = document.querySelector("[data-modal-img]");
  const modalTitle = document.querySelector("[data-modal-title]");
  const modalText = document.querySelector("[data-modal-text]");

  // modal toggle function
  const testimonialsModalFunc = function () {
    if (modalContainer) modalContainer.classList.toggle("active");
    if (overlay) overlay.classList.toggle("active");
  }

  // add click event to all modal items (only if they exist)
  if (testimonialsItem.length > 0 && modalImg && modalTitle && modalText) {
    for (let i = 0; i < testimonialsItem.length; i++) {
      testimonialsItem[i].addEventListener("click", function () {
        const avatar = this.querySelector("[data-testimonials-avatar]");
        const title = this.querySelector("[data-testimonials-title]");
        const text = this.querySelector("[data-testimonials-text]");

        if (avatar && modalImg) {
          modalImg.src = avatar.src;
          modalImg.alt = avatar.alt;
        }
        // Используем textContent вместо innerHTML для предотвращения XSS
        if (title && modalTitle) modalTitle.textContent = title.textContent;
        if (text && modalText) modalText.textContent = text.textContent;

        testimonialsModalFunc();
      });
    }
  }

  // add click event to modal close button (only if they exist)
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  }
  if (overlay) {
    overlay.addEventListener("click", testimonialsModalFunc);
  }



  // custom select variables (only if elements exist)
  const select = document.querySelector("[data-select]");
  const selectItems = document.querySelectorAll("[data-select-item]");
  const selectValue = document.querySelector("[data-selecct-value]");
  const filterBtn = document.querySelectorAll("[data-filter-btn]");

  if (select) {
    select.addEventListener("click", function () { elementToggleFunc(this); });
  }

  // filter variables
  const filterItems = document.querySelectorAll("[data-filter-item]");

  const filterFunc = function (selectedValue) {
    for (let i = 0; i < filterItems.length; i++) {
      if (selectedValue === "все" || selectedValue === "all") {
        filterItems[i].classList.add("active");
      } else if (selectedValue === filterItems[i].dataset.category) {
        filterItems[i].classList.add("active");
      } else {
        filterItems[i].classList.remove("active");
      }
    }
  }

  // add event in all select items (only if they exist)
  if (selectItems.length > 0 && selectValue) {
    for (let i = 0; i < selectItems.length; i++) {
      selectItems[i].addEventListener("click", function () {
        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        if (select) elementToggleFunc(select);
        filterFunc(selectedValue);
      });
    }
  }

  // add event in all filter button items for large screen
  let lastClickedBtn = filterBtn[0];

  for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      filterFunc(selectedValue);

      lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;
    });
  }



  // contact form variables (only if form exists)
  const form = document.querySelector("[data-form]");
  const formInputs = document.querySelectorAll("[data-form-input]");
  const formBtn = document.querySelector("[data-form-btn]");

  // add event to all form input field (only if form exists)
  if (form && formInputs.length > 0 && formBtn) {
    for (let i = 0; i < formInputs.length; i++) {
      formInputs[i].addEventListener("input", function () {
        // check form validation
        if (form.checkValidity()) {
          formBtn.removeAttribute("disabled");
        } else {
          formBtn.setAttribute("disabled", "");
        }
      });
    }
  }



  // page navigation variables
  const navigationLinks = document.querySelectorAll("[data-nav-link]");
  const pages = document.querySelectorAll("[data-page]");

  // Mapping navigation button text to page data-page attribute
  const pageMapping = {
    "главная": "главная",
    "кейсы": "кейсы",
    "тарифы": "тарифы",
    "заказать & обсудить задачу": "заказать & обсудить задачу",
    "связаться": "связаться",
    "Связаться": "связаться",
    "Обсудить задачу": "заказать & обсудить задачу"
  };

  // Function to switch page
  function switchPage(targetPageName) {
    if (!targetPageName) return;

    // Remove active class from all pages and links
    for (let j = 0; j < pages.length; j++) {
      pages[j].classList.remove("active");
    }

    for (let j = 0; j < navigationLinks.length; j++) {
      navigationLinks[j].classList.remove("active");
    }

    // Find and activate corresponding page
    for (let j = 0; j < pages.length; j++) {
      const pageName = pages[j].dataset.page;
      if (pageName === targetPageName) {
        pages[j].classList.add("active");
        break;
      }
    }

    // Find and activate corresponding link
    for (let j = 0; j < navigationLinks.length; j++) {
      const linkText = navigationLinks[j].textContent.trim();
      const mappedPage = pageMapping[linkText];
      if (mappedPage === targetPageName) {
        navigationLinks[j].classList.add("active");
        break;
      }
    }

    window.scrollTo(0, 0);
  }

  // Expose switchPage to global scope so it can be called by selectTariff
  window.switchPage = switchPage;

  // add event to all nav link (only if they exist)
  if (navigationLinks.length > 0 && pages.length > 0) {
    console.log('Navigation initialized:', navigationLinks.length, 'links,', pages.length, 'pages');

    for (let i = 0; i < navigationLinks.length; i++) {
      navigationLinks[i].addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        // Get the exact text content of the clicked link
        const linkText = this.textContent.trim();
        console.log('Navigation clicked:', linkText);

        // Get the target page name from mapping
        const targetPage = pageMapping[linkText] || linkText.toLowerCase();
        console.log('Target page:', targetPage);

        // Switch to the target page
        switchPage(targetPage);
      });
    }
  } else {
    console.error('Navigation elements not found! Links:', navigationLinks.length, 'Pages:', pages.length);
  }


  // order form variables
  const orderForm = document.querySelector("[data-order-form]");
  const orderInputs = document.querySelectorAll("[data-order-input]");
  const orderBtn = document.querySelector("[data-order-btn]");

  if (orderForm && orderInputs.length > 0 && orderBtn) {
    // add event to all form input field
    for (let i = 0; i < orderInputs.length; i++) {
      orderInputs[i].addEventListener("input", function () {
        // check form validation
        if (orderForm.checkValidity()) {
          orderBtn.removeAttribute("disabled");
        } else {
          orderBtn.setAttribute("disabled", "");
        }
      });
    }

    // handle form submission
    orderForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(orderForm);
      const orderType = formData.get("order-type");
      const tariff = formData.get("tariff");
      const fullname = formData.get("fullname");
      const phone = formData.get("phone");
      const description = formData.get("description");

      // Create WhatsApp message
      const message = `Новый заказ:\n\n` +
        `Тип заказа: ${orderType}\n` +
        `Тариф: ${tariff}\n` +
        `Имя: ${fullname}\n` +
        `Телефон: ${phone}\n` +
        `Описание проекта:\n${description}`;

      // Encode message for URL
      const encodedMessage = encodeURIComponent(message);

      // WhatsApp API URL
      const whatsappNumber = "77002174701";
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

      // Open WhatsApp
      window.open(whatsappUrl, "_blank");

      // Reset form
      orderForm.reset();
      orderBtn.setAttribute("disabled", "");
    });
  }

  // Add event listeners for tariff selection buttons (replacing inline onclick)
  const tariffButtons = document.querySelectorAll(".btn-select-tariff");
  tariffButtons.forEach(function(button) {
    button.addEventListener("click", function(e) {
      e.preventDefault();
      // Get tariff ID from data attribute or button text
      const tariffId = this.getAttribute("data-tariff-id") || 
                       this.textContent.trim().toLowerCase().replace(/\s+/g, "-");
      selectTariff(tariffId);
    });
  });

})(); // End of IIFE

// Global selectTariff function
function selectTariff(tariffId) {
  // Switch to Order page
  if (window.switchPage) {
    window.switchPage("заказать & обсудить задачу");
  }

  // Pre-select tariff in the form
  const tariffSelect = document.getElementById("tariff");
  if (tariffSelect) {
    tariffSelect.value = tariffId;
  }

  // Also pre-select "Web site" as order type if reasonable
  const orderTypeSelect = document.getElementById("order-type");
  if (orderTypeSelect) {
    orderTypeSelect.value = "website";
  }
}