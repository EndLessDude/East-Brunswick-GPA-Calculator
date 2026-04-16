// GPA points table
const gradeTables = {
    "Academic": { "A+":4.3,"A":4.0,"A-":3.7,"B+":3.3,"B":3.0,"B-":2.7,"C+":2.3,"C":2.0,"C-":1.7,"D+":1.3,"D":1.0,"D-":0.7,"F":0.0 },
    "Accelerated": { "A+":4.515,"A":4.2,"A-":3.885,"B+":3.465,"B":3.15,"B-":2.835,"C+":2.415,"C":2.1,"C-":1.785,"D+":1.365,"D":1.05,"D-":0.735,"F":0.0 },
    "Honors": { "A+":4.945,"A":4.6,"A-":4.255,"B+":3.795,"B":3.45,"B-":3.105,"C+":2.645,"C":2.3,"C-":1.955,"D+":1.495,"D":1.15,"D-":0.805,"F":0.0 },
    "AP": { "A+":5.375,"A":5.0,"A-":4.625,"B+":4.125,"B":3.75,"B-":3.375,"C+":2.875,"C":2.5,"C-":2.125,"D+":1.625,"D":1.25,"D-":0.875,"F":0.0 }
};

// Add course row
function addCourse() {
    const div = document.createElement("div");
    div.classList.add("course");

    div.innerHTML = `
        <label>Class:</label>
        <input type="text" placeholder="Optional" class="name">

        <label>Credits:</label>
        <select class="credits">
            <option value="1.25">1.25</option>
            <option value="2.5">2.5</option>
            <option value="3.75">3.75</option>
            <option value="5" selected>5</option>
            <option value="7.5">7.5</option>
        </select>

        <label>Grade:</label>
        <select class="grade">
            <option value="">Grade</option>
            <option>A+</option><option>A</option><option>A-</option>
            <option>B+</option><option>B</option><option>B-</option>
            <option>C+</option><option>C</option><option>C-</option>
            <option>D+</option><option>D</option><option>D-</option>
            <option>F</option>
        </select>

        <label>Level:</label>
        <select class="level">
            <option>Academic</option>
            <option>Accelerated</option>
            <option>Honors</option>
            <option>AP</option>
        </select>

        <button class="remove-btn">❌</button>
    `;

    div.querySelector(".remove-btn").addEventListener("click", () => { 
        div.remove();
        calculateGPA();
    });

    document.getElementById("courses").appendChild(div);

    // Auto-add row when last row is filled
    const creditsSelect = div.querySelector(".credits");
    const gradeSelect = div.querySelector(".grade");

    function tryAddRow() {
        const allCourses = document.querySelectorAll(".course");
        if (div !== allCourses[allCourses.length - 1]) return;
        if (!creditsSelect.value || !gradeSelect.value) return;

        let totalCredits = 0;
        allCourses.forEach(c => {
            totalCredits += parseFloat(c.querySelector(".credits").value || 0);
        });

        if (totalCredits < 40) addCourse();
    }

    creditsSelect.addEventListener("change", tryAddRow);
    gradeSelect.addEventListener("change", tryAddRow);
}

// Calculate GPA
function calculateGPA() {
    const courses = document.querySelectorAll(".course");
    const useUnweighted = document.getElementById("unweighted-btn").classList.contains("active");

    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach(course => {
        const creditsValue = course.querySelector(".credits").value;
        const grade = course.querySelector(".grade").value;
        let level = course.querySelector(".level").value;

        if (!creditsValue || !grade) return;

        const credits = parseFloat(creditsValue);
        if (useUnweighted) level = "Academic";
        const points = gradeTables[level][grade];

        totalPoints += points * credits;
        totalCredits += credits;
    });

    if (totalCredits === 0) {
        document.getElementById("result").innerText = "Enter at least one class";
        return;
    }

    const gpa = totalPoints / totalCredits;
    document.getElementById("result").innerText = "GPA: " + gpa.toFixed(3);
}

// GPA Type Toggle
const weightedBtn = document.getElementById("weighted-btn");
const unweightedBtn = document.getElementById("unweighted-btn");

weightedBtn.addEventListener("click", () => {
    weightedBtn.classList.add("active");
    unweightedBtn.classList.remove("active");
});

unweightedBtn.addEventListener("click", () => {
    unweightedBtn.classList.add("active");
    weightedBtn.classList.remove("active");
});

// Initialize
window.addEventListener("DOMContentLoaded", () => {
    addCourse();
    document.getElementById("add-course-btn").addEventListener("click", addCourse);
});