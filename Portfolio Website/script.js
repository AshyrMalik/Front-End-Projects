let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav ul li a');

window.onscroll = () => {
  let top = window.scrollY;
  sections.forEach(sec => {
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');
    if (top >= offset && top < offset + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
      });
      document.querySelector(`header nav ul li a[href='#${id}']`).classList.add('active');
    }
  });
};

menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
};



document.addEventListener("DOMContentLoaded", function() {
  var downloadBtn = document.getElementById('downloadBtn');

  downloadBtn.addEventListener('click', function() {
      // Replace 'your_cv.pdf' with the actual URL of your PDF file
      var pdfUrl = 'file:///C:/Users/MrLaptop/Desktop/Portfolio/CV.pdf';

      // Create a temporary anchor element
      var tempLink = document.createElement('a');
      tempLink.href = pdfUrl;
      tempLink.setAttribute('target', '_blank'); // Open link in a new tab
      tempLink.setAttribute('download', ''); // Hint to browser to download

      // Append the anchor element to the body
      document.body.appendChild(tempLink);

      // Trigger the click event of the anchor element
      tempLink.click();

      // Remove the temporary anchor element
      document.body.removeChild(tempLink);
  });
});


document.addEventListener("DOMContentLoaded", function() {
  var contactForm = document.getElementById('contactForm');
  
  contactForm.addEventListener('submit', function(e) {
      e.preventDefault(); 
      var formData = new FormData(contactForm);
      var csvContent = "data:text/csv;charset=utf-8,";
      formData.forEach(function(value, key) {
          csvContent += '"' + value + '",';
      });

      csvContent += "\n";
      
     var encodedUri = encodeURI(csvContent);
      var link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "contact_data.csv");
      document.body.appendChild(link);

      link.click();
  });
});
