//Animacion del loader
window.onload = function () {
  const text = document.querySelector(".loader h1");
  const words = text.querySelectorAll("span");
  let currentWord = 0;

  function typeWriterEffect() {
    if (currentWord < words.length) {
      words[currentWord].style.opacity = 1; // Hacer visible la palabra
      currentWord++;
      setTimeout(typeWriterEffect, 500); // Espera 1 segundo antes de mostrar la siguiente palabra
    } else {
      // Espera un tiempo y luego aplica la clase de salida
      setTimeout(() => {
        words.forEach((word, index) => {
          word.classList.add("out");
          word.style.animationDelay = `${(words.length - index - 1) * 0.5}s`; // Retraso inverso
        });

        // Mostrar el contenido del portafolio
        document.querySelector(".loader").style.display = "none"; // Ocultar el loader
        document.querySelector("#main-content").style.display = "block"; // Mostrar el contenido

        // Iniciar la animación del texto dinámico después de que se muestre el contenido
        iniciarAnimacionTexto();
      }, 1000); // Cambia el tiempo según sea necesario
    }
  }

  // Iniciar el efecto de máquina de escribir
  typeWriterEffect();
};

//NAVEGACION EN EL NAVBAR
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  });
});

// Función para cerrar el navbar
function closeNavbar() {
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  
  if (navbarCollapse.classList.contains('show')) {
    navbarToggler.click();
  }
}

// Cuando el documento esté listo
document.addEventListener('DOMContentLoaded', function() {
  // Cerrar navbar al hacer click en los enlaces
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', closeNavbar);
  });

  // Cerrar navbar al hacer click fuera
  document.addEventListener('click', function(event) {
    const navbar = document.querySelector('.navbar-collapse');
    const toggleButton = document.querySelector('.navbar-toggler');
    
    if (navbar.classList.contains('show') && 
        !navbar.contains(event.target) && 
        !toggleButton.contains(event.target)) {
      closeNavbar();
    }
  });
});

// Función para la animación de texto en el INICIO
function iniciarAnimacionTexto() {
  const phrases = [
    "de Sistemas de Información",
    "con experiencia en Backend",
    "con experiencia en Frontend",
    "con experiencia en Base de Datos",
    "con experiencia en Aplicativos Móviles",
  ];

  let currentPhraseIndex = 0;
  const dynamicText = document.getElementById("dynamic-text");

  function typePhrase(phrase) {
    let index = 0;
    dynamicText.textContent = ""; // Limpiar el texto

    const typingInterval = setInterval(() => {
      if (index < phrase.length) {
        dynamicText.textContent += phrase.charAt(index);
        index++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          erasePhrase();
        }, 2000); // Esperar 1 segundo antes de borrar
      }
    }, 50); // Velocidad de escritura
  }

  function erasePhrase() {
    let index = dynamicText.textContent.length;

    const erasingInterval = setInterval(() => {
      if (index > 0) {
        dynamicText.textContent = dynamicText.textContent.slice(0, index - 1);
        index--;
      } else {
        clearInterval(erasingInterval);
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length; // Cambiar a la siguiente frase
        setTimeout(() => {
          typePhrase(phrases[currentPhraseIndex]);
        }, 500); // Esperar medio segundo antes de escribir la siguiente frase
      }
    }, 50); // Velocidad de borrado
  }

  // Iniciar la animación
  typePhrase(phrases[currentPhraseIndex]);
}

//MANEJAR LOS TABS
document.addEventListener("DOMContentLoaded", function () {
  const tabLinks = document.querySelectorAll(".project-tabs .nav-link");

  tabLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Remover aria-selected="true" de todos los tabs
      tabLinks.forEach((tab) => {
        tab.setAttribute("aria-selected", "false");
      });

      // Establecer aria-selected="true" solo en el tab clickeado
      this.setAttribute("aria-selected", "true");
    });
  });
});

//Funcionalidad de la parte de CONTACTO
document.addEventListener("DOMContentLoaded", function () {
  const messageForm = document.getElementById("messageForm");
  const commentForm = document.getElementById("commentForm");
  const commentsList = document.getElementById("comments-list");
  const commentCount = document.getElementById("comment-count");
  const uploadBtn = document.getElementById("uploadBtn");

  // Cargar comentarios guardados
  let comments = JSON.parse(localStorage.getItem("comments")) || [];

  // Actualizar contador y lista de comentarios
  function updateComments() {
    commentCount.textContent = comments.length;
    commentsList.innerHTML = comments
      .map(
        (comment, index) => `
          <div class="comment-item">
              <div class="comment-avatar">
              ${
                comment.avatar
                  ? `<img src="${comment.avatar}" alt="Avatar de ${comment.name}">`
                  : `<i class="fa fa-user" style="font-size: 2em; color: #ffffff;"></i>`
              }
              </div>
              <div class="comment-content">
                  <div class="comment-header">
                      <strong>${comment.name}</strong>
                      <span class="comment-time">${formatTime(
                        new Date(comment.timestamp)
                      )}</span>
                  </div>
                  <p>${comment.message}</p>
              </div>
          </div>
      `
      )
      .join("");
  }

  // Formatear tiempo
  function formatTime(date) {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    const times = {
      año: diff / (365 * 24 * 60 * 60),
      mes: diff / (30 * 24 * 60 * 60),
      día: diff / (24 * 60 * 60),
      hora: diff / (60 * 60),
      minuto: diff / 60,
    };

    for (let [unit, value] of Object.entries(times)) {
      if (value >= 1) {
        const round = Math.floor(value);
        return `Hace ${round} ${unit}${round !== 1 ? "s" : ""}`;
      }
    }
    return "Hace un momento";
  }

  // Función para mostrar notificaciones
function showNotification(message, isError = false) {
  const container = document.getElementById('notification-container');
  const notification = container.querySelector('.notification');
  const messageElement = container.querySelector('.notification-message');
  
  // Actualizar el mensaje y la clase
  messageElement.textContent = message;
  notification.className = `notification ${isError ? 'error' : ''}`;
  
  // Mostrar la notificación
  container.style.display = 'block';
  
  // Ocultar después de 3 segundos
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.5s ease-out forwards';
    setTimeout(() => {
      container.style.display = 'none';
      notification.style.animation = '';
    }, 500);
  }, 3000);
}

  // Manejar envío de mensaje de contacto
  messageForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Enviar email usando EmailJS
    emailjs
      .send("service_4vkea0e", "template_0iqr8xj", {
        from_name: name,
        reply_to: email,
        message: message,
        to_name: "Smith",
      })
      .then(
        function (response) {
          showNotification("¡Mensaje enviado con éxito! Gracias por contactarme.");
          messageForm.reset();
        },
        function (error) {
          showNotification("Error al enviar el mensaje. Por favor, intenta nuevamente.", true);
        }
      );
  });

  // Manejar subida de foto de perfil
  let selectedAvatar = null;
  uploadBtn.addEventListener("click", function () {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = function (e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          selectedAvatar = e.target.result;
          uploadBtn.innerHTML = '<i class="fa fa-check"></i> Foto seleccionada';
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  });

  // Manejar envío de comentarios
  commentForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("commentName").value;
    const message = document.getElementById("commentMessage").value;

    const newComment = {
      name,
      message,
      avatar: selectedAvatar,
      timestamp: new Date().toISOString(),
    };

    comments.unshift(newComment);
    localStorage.setItem("comments", JSON.stringify(comments));

    updateComments();
    commentForm.reset();
    selectedAvatar = null;
    uploadBtn.innerHTML =
      '<i class="fa fa-image"></i> Elige una foto de perfil';
  });

  // Cargar comentarios al iniciar
  updateComments();
});
