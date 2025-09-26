// Función para mostrar mensajes de estado
function showStatus(message, type = 'success') {
  const status = document.getElementById('status');
  status.textContent = message;
  status.className = `status ${type}`;
  status.style.display = 'block';
  
  setTimeout(() => {
    status.style.display = 'none';
  }, 3000);
}

// Función para ejecutar código en la página activa
async function executeInActiveTab(func, args = []) {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // Verificar que tenemos acceso a la pestaña
    if (!tab || !tab.id) {
      throw new Error('No se pudo acceder a la pestaña activa');
    }
    
    // Verificar que no es una página especial de Chrome
    if (tab.url.startsWith('chrome://') || tab.url.startsWith('chrome-extension://')) {
      throw new Error('No se puede ejecutar en páginas especiales de Chrome');
    }
    
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: func,
      args: args
    });
    
    return results[0].result;
  } catch (error) {
    console.error('Error executing script:', error);
    showStatus(`Error: ${error.message}`, 'info');
    return null;
  }
}

// Función que se ejecutará en el contexto de la página para establecer overflow auto
function setBodyOverflowAuto() {
  const body = document.body;
  
  // Guardar el valor original si no existe
  if (!body.hasAttribute('data-original-overflow')) {
    const currentOverflow = window.getComputedStyle(body).overflow;
    body.setAttribute('data-original-overflow', currentOverflow);
  }
  
  // Establecer overflow auto
  body.style.overflow = 'auto';
  
  return {
    success: true,
    previousValue: body.getAttribute('data-original-overflow'),
    newValue: 'auto'
  };
}

// Función que se ejecutará en el contexto de la página para restaurar overflow original
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

// Método alternativo usando mensajes al content script
async function sendMessageToContentScript(action) {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    return new Promise((resolve) => {
      chrome.tabs.sendMessage(tab.id, { action: action }, (response) => {
        if (chrome.runtime.lastError) {
          console.error('Error sending message:', chrome.runtime.lastError);
          resolve(null);
        } else {
          resolve(response);
        }
      });
    });
  } catch (error) {
    console.error('Error sending message:', error);
    return null;
  }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
  
  // Botón para establecer overflow auto
  document.getElementById('setAuto').addEventListener('click', async function() {
    // Intentar primero con executeScript
    let result = await executeInActiveTab(setBodyOverflowAuto);
    
    // Si falla, intentar con messages
    if (!result) {
      result = await sendMessageToContentScript('setOverflowAuto');
    }
    
    if (result && result.success) {
      showStatus('✓ Overflow establecido a "auto"', 'success');
    } else {
      showStatus('⚠ No se pudo cambiar el overflow', 'info');
    }
  });
  
  // Botón para restaurar overflow original
  document.getElementById('resetOverflow').addEventListener('click', async function() {
    // Intentar primero con executeScript
    let result = await executeInActiveTab(resetBodyOverflow);
    
    // Si falla, intentar con messages
    if (!result) {
      result = await sendMessageToContentScript('resetOverflow');
    }
    
    if (result && result.success) {
      showStatus(`✓ Overflow restaurado a "${result.restoredValue}"`, 'success');
    } else if (result && !result.success) {
      showStatus('⚠ ' + result.message, 'info');
    } else {
      showStatus('⚠ No se pudo restaurar el overflow', 'info');
    }
  });
  
});