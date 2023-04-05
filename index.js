function changeMenuIcon() {
    const [buttonIconMenu] = document.getElementsByClassName("navbar-toggler-icon");
    const [buttonIconX] = document.getElementsByClassName("material-symbols-outlined");
    const state = buttonIconMenu.style.display;

    if( state >= 'none') {
        buttonIconMenu.style.display = 'block';
        buttonIconX.style.display = 'none';
    } else {
        buttonIconMenu.style.display = 'none';
        buttonIconX.style.display = 'block';
    }
}

let titleText = ['Portfolio', 'CesarFC Dev'];
let counter = 0;

setInterval(()=> {
    document.title = titleText[counter % titleText.length];
    counter++;
},4000)

const bottonToggle = document.getElementById('navbar-toggle');
bottonToggle.addEventListener('click', changeMenuIcon)

//Selecciono los li tags de la navbar 
//y luego seleciono en div de la lista ul 
//Para agregarles un click event listener y luego llamar a collapse toggle y cerrar navlink
const navItem = document.querySelectorAll('.nav-item');
const menuToggle = document.getElementById('navbarSupportedContent');
const toggleNavBar = () => {
    const bsCollapse = new bootstrap.Collapse(menuToggle);
    bsCollapse.toggle()
    changeMenuIcon()
}
navItem.forEach((l) => {
    l.addEventListener('click', toggleNavBar)
})

//Para que el titulo cmabie en home
let type = new Typed('.textline',{
    strings:[
        "Frontend Dev",
        'React Dev',
        "Pianist",
    ],
    typeSpeed: 100,
    // startDelay: 500,
    backSpeed: 100,
    backDelay: 500,
    loop: true,
    loopCount: Infinity,
})

const navBarActive = document.getElementById('navbarSupportedContent');
const navLinks = navBarActive.getElementsByClassName("nav-link");

for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener("click", function() {
      let current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      this.className += " active";
    });
  }

//inital form object to send
let formObject = {};
//Formsubmit email 
const URL_EMAIL = 'https://formsubmit.co/ajax/cafc2030@gmail.com';
//To get the form
const myContactForm = document.getElementById('contact-form');
//toast element
const toastLiveExample = document.getElementById('liveToast');
//To get the lading div
const loadingDiv = document.getElementById('loading-message');
//send button
const sendbutton = document.getElementById('send-message');

myContactForm.addEventListener('submit', function handleSubmit(event) {
    event.preventDefault();
    sendbutton.setAttribute('disabled', '');
    //sendbutton.innerHTML = ''
    loadingDiv.style.display = 'inline-block';

    const formData = event.target;
    for (let i = 0; i < formData.length -1; i++) {
        formObject = {
            ...formObject,
            [formData[i].name]: formData[i].value,
        }
    }

    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(formObject),
    }

    fetch(URL_EMAIL, options)
    .then((res) => res.json())
    .then((data) => {  
        sendbutton.removeAttribute('disabled');
        //sendbutton.innerHTML = 'Send Message';
        loadingDiv.style.display = 'none';        
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        toastBootstrap.show()
  });

  myContactForm.reset();
  });

