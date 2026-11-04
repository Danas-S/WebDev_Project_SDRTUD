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
    
    //Form serialize
    function serializeFormData(form) {
        const formData = new FormData(form);
        const serializedData = {};
        for (const [name, value] of formData) {
            serializedData[name] = value;
        }
        return serializedData;
    }
    //Number formatting
    function phoneFormat(input) {
        input = input.replace(/\D/g,'');
        const size = input.length;
        if (size>0) {input="("+input}
        if (size>3) {input=input.slice(0,4)+") "+input.slice(4,11)}
        if (size>6) {input=input.slice(0,9)+"-" +input.slice(9)}
        if (size===10) {input = input.slice(0,13)}
        //returns (###) ###-####
        return input;
    }
    //Event Listeners
    searchPanelHeader.addEventListener('click', e => {
        searchPopup.classList.add(show);
        document.body.classList.add(popupOpened);
    });
    searchPanelFooter.addEventListener('click', e => {
        searchPopup.classList.add(show);
        document.body.classList.add(popupOpened);
    });
    searchPopupClose.addEventListener('click', e => {
        searchPopup.classList.remove(show);
        document.body.classList.remove(popupOpened);
    });
    mobileMenu.addEventListener('click', e => {
        if(header.classList.contains(show)) {
            header.classList.remove(show);
            hoverPopup.classList.remove(show);
            document.body.classList.remove(popupOpened);
        } else {
            header.classList.add(show);
            hoverPopup.classList.add(show);
            document.body.classList.add(popupOpened);
        }
    });
    hoverPopup.addEventListener('click', e => {
        if(header.classList.contains(show)) {
            header.classList.remove(show);
        }
        hoverPopup.classList.remove(show);
        document.body.classList.remove(popupOpened);
    });

    if(document.title.includes("Contact")) {
        const nameRegex = /^([a-zA-Zà-úÀ-Ú]{2,})+\s+([a-zA-Zà-úÀ-Ú\s]{2,})+$/;
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; 
        const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
        contactPhoneInput.addEventListener('keydown', e => {
            const phone = e.target.value;
            contactPhoneInput.value = phoneFormat(phone);
        });
        formSubmitButton.addEventListener('click', e => {
            e.preventDefault();
            const nameStatus = nameRegex.test(contactNameInput.value);
            const emailStatus = emailRegex.test(contactEmailInput.value);
            const phoneStatus = phoneRegex.test(contactPhoneInput.value);
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
            if(nameStatus && emailStatus && phoneStatus){
                const formData = serializeFormData(contactForm);
                contactForm.classList.add("hide");
                contactFormSuccess.classList.add("show");
                console.log("form: ", formData);
            }
        });
    }
});