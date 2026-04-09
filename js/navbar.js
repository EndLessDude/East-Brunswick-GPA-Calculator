// Create the navbar HTML
const navbarHTML = `
<nav class="navbar">
  <div class="logo">East Brunswick GPA Calculator</div>
  <ul class="nav-links">
    <li><a href="index.html">Home</a></li>
    <li><a href="gpa.html">GPA Calculator</a></li>
    <li><a href="course-grading.html">Course Grading</a></li>
    <li><a href="#">Coming Soon</a></li>
    <li><a href="#">About</a></li>
  </ul>
</nav>
`;

// Inject navbar at the top of the body
document.body.insertAdjacentHTML('afterbegin', navbarHTML);