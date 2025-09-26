// Content script - se ejecuta en cada página

// Funciones para manipular el overflow del body
function setBodyOverflowAuto() {
  const body = document.body;
  
  // Guardar el valor original si no existe
  if (!body.hasAttribute('data-original-overflow')) {
    const currentOverflow = window.getComputedStyle(body).overflow;
    body.setAttribute('data-original-overflow', currentOverflow);
  }
  
  // Establecer overflow auto
  body.style.overflow = 'auto';
  
  console.log('Body Overflow Auto: Overflow cambiado a "auto"');
  
  return {
    success: true,
    previousValue: body.getAttribute('data-original-overflow'),
    newValue: 'auto'
  };
}

function resetBodyOverflow() {
  const body = document.body;
  const originalOverflow = body.getAttribute('data-original-overflow');
  
  if (originalOverflow !== null) {
    if (originalOverflow === 'visible') {
      body.style.overflow = '';
    } else {
      body.style.overflow = originalOverflow;
    }
    body.removeAttribute('data-original-overflow');
    
    console.log('Body Overflow Auto: Overflow restaurado a "' + originalOverflow + '"');
    
    return {
      success: true,
      restoredValue: originalOverflow
    };
  } else {
    return {
      success: false,
      message: 'No hay valor original guardado'
    };
  }
}

// Escuchar mensajes del popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Body Overflow Auto: Mensaje recibido:', request);
  
  if (request.action === 'setOverflowAuto') {
    const result = setBodyOverflowAuto();
    sendResponse(result);
  } else if (request.action === 'resetOverflow') {
    const result = resetBodyOverflow();
    sendResponse(result);
  }
  
  return true; // Mantiene el canal abierto para respuesta asíncrona
});

// Función para detectar si el body tiene overflow hidden o scroll problemático
function checkBodyOverflow() {
  const body = document.body;
  const computedStyle = window.getComputedStyle(body);
  const overflow = computedStyle.overflow;
  
  // Si el overflow es hidden, podríamos querer cambiarlo automáticamente
  if (overflow === 'hidden') {
    console.log('Body Overflow Auto: Detectado overflow:hidden en el body');
  }
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', checkBodyOverflow);
} else {
  checkBodyOverflow();
}

// Observar cambios en el estilo del body
const observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
      checkBodyOverflow();
    }
  });
});

// Comenzar a observar cambios en el body
if (document.body) {
  observer.observe(document.body, { 
    attributes: true, 
    attributeFilter: ['style'] 
  });
} else {
  // Si el body no está disponible aún, esperar
  document.addEventListener('DOMContentLoaded', function() {
    observer.observe(document.body, { 
      attributes: true, 
      attributeFilter: ['style'] 
    });
  });
}