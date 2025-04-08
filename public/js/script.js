(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
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


//index.ejs// public/js/script.js
document.addEventListener("DOMContentLoaded", () => {
  const filters = document.querySelectorAll(".filter");
  const cards = document.querySelectorAll(".listing-card");

  filters.forEach((filter) => {
    filter.addEventListener("click", () => {
      // Remove "active" from all
      filters.forEach(f => f.classList.remove("active"));
      // Add "active" to clicked
      filter.classList.add("active");

      const selectedCategory = filter.getAttribute("data-category").toLowerCase();

      cards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category").toLowerCase();

        if (selectedCategory === "all" || cardCategory === selectedCategory) {
          card.parentElement.style.display = "block";
        } else {
          card.parentElement.style.display = "none";
        }
      });
    });
  });
});
