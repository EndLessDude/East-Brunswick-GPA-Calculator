const navbarHTML = `
<div class="navbar">
    <a href="#">Coming Soon</a>
    <a href="course-grading.html">Course Grading</a>
    <a href="index.html">Home</a>
    <a href="gpa.html">GPA Calculator</a>
    <a href="#">Coming Soon</a>
</div>
`;

// Inject navbar at the top of the body
document.body.insertAdjacentHTML('afterbegin', navbarHTML);