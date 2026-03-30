// GPA points table
const gradeTables = {
    "Academic": {
        "A+": 4.30, "A": 4.00, "A-": 3.70,
        "B+": 3.30, "B": 3.00, "B-": 2.70,
        "C+": 2.30, "C": 2.00, "C-": 1.70,
        "D+": 1.30, "D": 1.00, "D-": 0.70,
        "F": 0.00
    },
    "Accelerated": {
        "A+": 4.515, "A": 4.200, "A-": 3.885,
        "B+": 3.465, "B": 3.150, "B-": 2.835,
        "C+": 2.415, "C": 2.100, "C-": 1.785,
        "D+": 1.365, "D": 1.050, "D-": 0.735,
        "F": 0.000
    },
    "Honors": {
        "A+": 4.945, "A": 4.600, "A-": 4.255,
        "B+": 3.795, "B": 3.450, "B-": 3.105,
        "C+": 2.645, "C": 2.300, "C-": 1.955,
        "D+": 1.495, "D": 1.150, "D-": 0.805,
        "F": 0.000
    },
    "AP": {
        "A+": 5.375, "A": 5.000, "A-": 4.625,
        "B+": 4.125, "B": 3.750, "B-": 3.375,
        "C+": 2.875, "C": 2.500, "C-": 2.125,
        "D+": 1.625, "D": 1.250, "D-": 0.875,
        "F": 0.000
    }
};

// Add course row
function addCourse() {
    const div = document.createElement("div");
    div.classList.add("course");

    div.innerHTML = `
        <div class="course-row">
            <input type="text" placeholder="Class Name (optional)" class="name">

            <select class="credits">
                <option value="2.5">2.5</option>
                <option value="3.75">3.75</option>
                <option value="5" selected>5</option>
                <option value="7.5">7.5</option>
            </select>

            <select class="grade">
                <option value="">Grade</option>
                <option>A+</option><option>A</option><option>A-</option>
                <option>B+</option><option>B</option><option>B-</option>
                <option>C+</option><option>C</option><option>C-</option>
                <option>D+</option><option>D</option><option>D-</option>
                <option>F</option>
            </select>

            <select class="level">
                <option>Academic</option>
                <option>Accelerated</option>
                <option>Honors</option>
                <option>AP</option>
            </select>
        </div>
    `;

    document.getElementById("courses").appendChild(div);

    const creditsSelect = div.querySelector(".credits");
    const gradeSelect = div.querySelector(".grade");

    function tryAddRow() {
        const allCourses = document.querySelectorAll(".course");

        // Only trigger if this is the last row
        if (div !== allCourses[allCourses.length - 1]) return;

        const credits = creditsSelect.value;
        const grade = gradeSelect.value;

        if (!credits || !grade) return;

        // Calculate total credits
        let totalCredits = 0;
        allCourses.forEach(c => {
            const val = c.querySelector(".credits").value;
            if (val) totalCredits += parseFloat(val);
        });

        if (totalCredits < 40) {
            addCourse();
        }
    }

    creditsSelect.addEventListener("change", tryAddRow);
    gradeSelect.addEventListener("change", tryAddRow);
}

// Calculate GPA
function calculateGPA() {
    const courses = document.querySelectorAll(".course");
    const gpaType = document.querySelector('input[name="gpaType"]:checked').value;
    const useUnweighted = gpaType === "unweighted";

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

// Start with ONE row
window.onload = function () {
    addCourse();
};