// MENU HAMBURGUESA CON ANIMACIÓN SUAVE
const menuToggle = document.querySelector('.menu-toggle');
const navUl = document.querySelector('.nav ul');
const navLinks = document.querySelectorAll('.nav ul li');

let menuOpen = false;

menuToggle.addEventListener('click', () => {
    if (!menuOpen) {
        navUl.classList.add('active');

        // Animación: menú deslizando desde abajo
        gsap.fromTo(navUl, 
            { y: 100, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
        );

        // Animación secuencial de los links
        gsap.fromTo(navLinks, 
            { y: 30, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.2, ease: "power3.out" }
        );

        menuOpen = true;
    } else {
        // Animación de cierre
        gsap.to(navLinks, { y: 30, opacity: 0, duration: 0.3, stagger: 0.05, ease: "power3.in" });
        gsap.to(navUl, { y: 100, opacity: 0, duration: 0.4, ease: "power3.in", onComplete: () => {
            navUl.classList.remove('active');
        }});
        menuOpen = false;
    }
});

// Cerrar menú al hacer click en un enlace
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (menuOpen) {
            gsap.to(navLinks, { y: 30, opacity: 0, duration: 0.3, stagger: 0.05, ease: "power3.in" });
            gsap.to(navUl, { y: 100, opacity: 0, duration: 0.4, ease: "power3.in", onComplete: () => {
                navUl.classList.remove('active');
            }});
            menuOpen = false;
        }
    });
});

// MODAL PORTAFOLIO
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');

window.openModal = function(item) {
  const img = item.querySelector('img').src;
  const title = item.querySelector('h3').innerText;
  modalImg.src = img;
  modalTitle.innerText = title;
  modal.style.display = 'flex';
}

window.closeModal = function() {
  modal.style.display = 'none';
}

// Cerrar modal al hacer click fuera del contenido
window.addEventListener('click', e => {
  if (e.target === modal) closeModal();
});

// ANIMACIONES & SCROLL SUAVE (GSAP)
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('section').forEach(sec => {
  gsap.from(sec, {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: sec,
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });
});

// BOTONES hover efecto (opcional extra)
document.querySelectorAll('.btn-hero, .btn-cta').forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    gsap.to(btn, { scale: 1.05, duration: 0.2 });
  });
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, { scale: 1, duration: 0.2 });
  });
});

// FORMULARIO DE CONTACTO → REDIRECCIÓN A WHATSAPP
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault(); // Evita que recargue la página

  const name = this.name.value;
  const email = this.email.value;
  const message = this.message.value;

  // Mensaje que aparecerá en WhatsApp
  const whatsappMessage = `Hola, soy ${name} (${email}). Quiero solicitar un paquete y este es mi mensaje: ${message}`;

  // Número de WhatsApp (cambia el código de país y número)
  const phone = '50493384936';

  // Redirige a WhatsApp con mensaje prellenado
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(whatsappMessage)}`, '_blank');

  // Opcional: muestra alerta de confirmación
  alert('¡Gracias! Te contactaremos por WhatsApp para gestionar tu solicitud.');
  
  // Limpia el formulario
  this.reset();
});
