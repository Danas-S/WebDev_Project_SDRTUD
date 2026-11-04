document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const searchPanelHeader = document.querySelector('header .search-panel');
    const searchPanelFooter = document.querySelector('footer .search-panel');
    const searchPopup = document.querySelector('.search-popup');
    const searchPopupClose = document.querySelector('.search-popup-close');
    const header = document.querySelector('header');
    const mobileMenu = document.querySelector('.mobile-menu');
    const hoverPopup = document.querySelector('.hover-popup');
    const formSubmitButton = document.querySelector('.contact-form .contact-button[type=submit]');
    //Contact form
    let contactForm = null;
    let contactFormError = null;
    let contactFormSuccess = null;
    //Contact Inputs
    let contactNameInput = null;
    let contactEmailInput = null;
    let contactPhoneInput = null;
    let contactMessageInput = null;
    //If page is Contact proceed
    if(document.title.includes("Contact")) {
        contactForm = document.querySelector('.contact-form');
        contactNameInput = document.querySelector('.contact-form #name');
        contactEmailInput = document.querySelector('.contact-form #email');
        contactPhoneInput = document.querySelector('.contact-form #phone');
        contactMessageInput = document.querySelector('.contact-form #message');
        contactFormError = document.querySelector('.contact-form-wrapper .error-message');
        contactFormSuccess = document.querySelector('.contact-form-wrapper .submit-message');
    }

    
    //Modifiers
    const show = 'show';
    const popupOpened = 'popup-opened';
    
    //Number formatting: returns (###) ###-#### from the digits typed so far
    function phoneFormat(input) {
        const digits = input.replace(/\D/g, '');
        if (digits.length > 6) return '(' + digits.slice(0, 3) + ') ' + digits.slice(3, 6) + '-' + digits.slice(6);
        if (digits.length > 3) return '(' + digits.slice(0, 3) + ') ' + digits.slice(3);
        if (digits.length > 0) return '(' + digits;
        return '';
    }
    //Event Listeners
    //Search popup: focus moves into the popup when it opens, and back to
    //the button that opened it when it closes (close button or Escape)
    const searchPopupInput = searchPopup.querySelector('.search-popup-input');
    let searchOpener = null;
    function openSearch(opener) {
        searchOpener = opener;
        searchPopup.classList.add(show);
        document.body.classList.add(popupOpened);
        searchPopupInput.focus();
    }
    function closeSearch() {
        searchPopup.classList.remove(show);
        document.body.classList.remove(popupOpened);
        if (searchOpener) {
            searchOpener.focus();
        }
    }
    searchPanelHeader.addEventListener('click', () => openSearch(searchPanelHeader));
    searchPanelFooter.addEventListener('click', () => openSearch(searchPanelFooter));
    searchPopupClose.addEventListener('click', closeSearch);
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && searchPopup.classList.contains(show)) {
            closeSearch();
        }
    });
    mobileMenu.addEventListener('click', e => {
        if(header.classList.contains(show)) {
            header.classList.remove(show);
            hoverPopup.classList.remove(show);
            document.body.classList.remove(popupOpened);
            mobileMenu.setAttribute('aria-expanded', 'false');
        } else {
            header.classList.add(show);
            hoverPopup.classList.add(show);
            document.body.classList.add(popupOpened);
            mobileMenu.setAttribute('aria-expanded', 'true');
        }
    });
    hoverPopup.addEventListener('click', e => {
        if(header.classList.contains(show)) {
            header.classList.remove(show);
        }
        hoverPopup.classList.remove(show);
        document.body.classList.remove(popupOpened);
        mobileMenu.setAttribute('aria-expanded', 'false');
    });

    if(document.title.includes("Contact")) {
        //Full name: at least two words, each starting with a letter from any language
        //(also allows apostrophes, hyphens and full stops, e.g. O'Brien, Mary-Kate)
        const nameRegex = /^\p{L}[\p{L}\p{M}'’.-]*(?:\s+\p{L}[\p{L}\p{M}'’.-]*)+$/u;
        const emailRegex = /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)*\.[^\s@.]{2,}$/;
        const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
        contactPhoneInput.addEventListener('input', () => {
            contactPhoneInput.value = phoneFormat(contactPhoneInput.value);
        });
        formSubmitButton.addEventListener('click', e => {
            e.preventDefault();
            const nameStatus = nameRegex.test(contactNameInput.value.trim());
            const emailStatus = emailRegex.test(contactEmailInput.value.trim());
            const phoneStatus = phoneRegex.test(contactPhoneInput.value);
            const messageStatus = contactMessageInput.value.trim() !== '';
            //Clear Form error field
            contactFormError.textContent = "";
            if (!nameStatus) {
                contactFormError.innerHTML += "<span>Error: Enter your full name.</span></br>";
            } 
            if (!emailStatus) {
                contactFormError.innerHTML += "<span>Error: Enter your email.</span></br>";
            } 
            if (!phoneStatus) {
                contactFormError.innerHTML += "<span>Error: Enter your phone.</span></br>";
            } 
            if (!messageStatus) {
                contactFormError.innerHTML += "<span>Error: Enter your message.</span></br>";
            }
            if(nameStatus && emailStatus && phoneStatus && messageStatus){
                contactForm.classList.add("hide");
                contactFormSuccess.classList.add("show");
                contactFormSuccess.focus();
            }
        });
    }
});