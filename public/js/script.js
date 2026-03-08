// Toast Utility
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container') || createToastContainer();
  
  const toast = document.createElement('div');
  toast.className = `custom-toast toast-${type}`;
  
  const iconClass = type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation';
  const title = type === 'success' ? 'Success' : 'Error';
  
  toast.innerHTML = `
    <div class="toast-icon">
      <i class="fa-solid ${iconClass}"></i>
    </div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
    <button class="btn-close ms-2" style="font-size: 0.7rem;" onclick="this.parentElement.classList.add('hide'); setTimeout(()=>this.parentElement.remove(), 300)"></button>
  `;
  
  container.appendChild(toast);
  
  // Auto remove
  setTimeout(() => {
    toast.classList.add('hide');
    setTimeout(() => toast.remove(), 300);
  }, 5000);
}

function createToastContainer() {
  const container = document.createElement('div');
  container.id = 'toast-container';
  container.className = 'toast-container';
  document.body.appendChild(container);
  return container;
}

// Password Toggle logic
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('password-toggle') || e.target.parentElement.classList.contains('password-toggle')) {
        const toggle = e.target.classList.contains('password-toggle') ? e.target : e.target.parentElement;
        const input = toggle.parentElement.querySelector('input');
        const icon = toggle.querySelector('i');
        
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    }
});

(() => {
  'use strict'
  const forms = document.querySelectorAll('.needs-validation')
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }
      form.classList.add('was-validated')
    }, false)
  })
})();


// new.ejs
function toggleOtherCategory() {
  const categorySelect = document.getElementById('category');
  const otherCategoryInput = document.getElementById('otherCategoryInput');
  if(categorySelect.value === 'Other') {
    otherCategoryInput.style.display = 'block';
    document.getElementById('other-category').setAttribute('required', 'true');
  }else{
    otherCategoryInput.style.display = 'none';
    document.getElementById('other-category').removeAttribute('required');
  }
}


// Theme Toggle Logic
function initTheme() {
    const theme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-bs-theme', theme);
    updateThemeIcon(theme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const icons = document.querySelectorAll('.theme-toggle i');
    icons.forEach(icon => {
        icon.className = theme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    
    const themeBtn = document.querySelectorAll('.theme-toggle');
    themeBtn.forEach(btn => {
        btn.addEventListener('click', toggleTheme);
    });

    const filters = document.querySelectorAll('.filter');
    const listingCols = document.querySelectorAll('.listing-col');
    // ... rest of filtering logic
});

// Improved Filtering
document.addEventListener('DOMContentLoaded', () => {
    const filters = document.querySelectorAll('.filter');
    const listingCols = document.querySelectorAll('.listing-col');

    if (filters.length > 0) {
        filters.forEach((filter) => {
            filter.addEventListener('click', (e) => {
                // If it's a direct category filter (client side)
                const category = filter.getAttribute('data-category');
                if (!category) return; // Let links handle it
                
                e.preventDefault();
                const selectedCategory = category.toLowerCase();

                filters.forEach(f => f.classList.remove('active'));
                filter.classList.add('active');

                listingCols.forEach((col) => {
                    const listingCategory = col.getAttribute('data-category').toLowerCase();
                    if (selectedCategory === 'all' || listingCategory === selectedCategory) {
                        col.style.display = 'block';
                    } else {
                        col.style.display = 'none';
                    }
                });
            });
        });
    }
});