function showMessage(id, message, isSuccess = false) {
    const element = document.getElementById(id);
    element.className = isSuccess ? "success" : "error";
    element.innerHTML = message;
}

function validateName() {
    const name = document.getElementById("name").value.trim();
    const regex = /^[A-Za-z][A-Za-z.\- ]*$/;

    if (name === "") {
        showMessage("nameError", "Name cannot be empty");
        return false;
    }

    const words = name.split(/\s+/);
    if (words.length < 2) {
        showMessage("nameError", "Name must contain at least two words");
        return false;
    }

    if (!regex.test(name)) {
        showMessage("nameError", "Name can contain letters, dot(.) or dash(-) only and must start with a letter");
        return false;
    }

    showMessage("nameError", "Valid name", true);
    return false;
}

function validateEmail() {
    const email = document.getElementById("email").value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        showMessage("emailError", "Email cannot be empty");
        return false;
    }

    if (!regex.test(email)) {
        showMessage("emailError", "Invalid email format");
        return false;
    }

    showMessage("emailError", "Valid email", true);
    return false;
}

function validateGender() {
    const gender = document.querySelector('input[name="gender"]:checked');

    if (!gender) {
        showMessage("genderError", "Please select a gender");
        return false;
    }

    showMessage("genderError", "Valid gender", true);
    return false;
}

function validateDob() {
    const dd = document.getElementById("dd").value.trim();
    const mm = document.getElementById("mm").value.trim();
    const yyyy = document.getElementById("yyyy").value.trim();

    if (dd === "" || mm === "" || yyyy === "") {
        showMessage("dobError", "Date of birth cannot be empty");
        return false;
    }

    const day = parseInt(dd);
    const month = parseInt(mm);
    const year = parseInt(yyyy);

    if (isNaN(day) || isNaN(month) || isNaN(year)) {
        showMessage("dobError", "Date of birth must be numeric");
        return false;
    }

    if (day < 1 || day > 31) {
        showMessage("dobError", "Day must be between 1 and 31");
        return false;
    }

    if (month < 1 || month > 12) {
        showMessage("dobError", "Month must be between 1 and 12");
        return false;
    }

    if (year < 1900 || year > 2016) {
        showMessage("dobError", "Year must be between 1900 and 2016");
        return false;
    }

    showMessage("dobError", "Valid date of birth", true);
    return false;
}

function validateDegree() {
    const degree = document.querySelectorAll('input[name="degree"]:checked');

    if (degree.length === 0) {
        showMessage("degreeError", "Please select at least one degree");
        return false;
    }

    showMessage("degreeError", "Valid degree", true);
    return false;
}

function validateBlood() {
    const blood = document.getElementById("blood").value;

    if (blood === "") {
        showMessage("bloodError", "Please select a blood group");
        return false;
    }

    showMessage("bloodError", "Valid blood group", true);
    return false;
}

function validatePic() {
    const userId = document.getElementById("userId").value.trim();
    const pic = document.getElementById("picture").value;

    if (userId === "") {
        showMessage("picError", "User ID cannot be empty");
        return false;
    }

    const id = parseInt(userId);
    if (isNaN(id) || id <= 0) {
        showMessage("picError", "User ID must be a positive number");
        return false;
    }

    if (pic === "") {
        showMessage("picError", "Please choose a picture");
        return false;
    }

    showMessage("picError", "Valid profile picture", true);
    return false;
}

function validateProfile() {
    const name = document.getElementById("pname").value.trim();
    const email = document.getElementById("pemail").value.trim();
    const gender = document.querySelector('input[name="pgender"]:checked');
    const dd = document.getElementById("pdd").value.trim();
    const mm = document.getElementById("pmm").value.trim();
    const yyyy = document.getElementById("pyyyy").value.trim();
    const blood = document.getElementById("pblood").value;
    const degree = document.querySelectorAll('input[name="pdegree"]:checked');
    const photo = document.getElementById("pphoto").value;

    const nameRegex = /^[A-Za-z][A-Za-z.\- ]*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name === "") {
        showMessage("profileError", "Name cannot be empty");
        return false;
    }

    const words = name.split(/\s+/);
    if (words.length < 2) {
        showMessage("profileError", "Name must contain at least two words");
        return false;
    }

    if (!nameRegex.test(name)) {
        showMessage("profileError", "Invalid name");
        return false;
    }

    if (email === "") {
        showMessage("profileError", "Email cannot be empty");
        return false;
    }

    if (!emailRegex.test(email)) {
        showMessage("profileError", "Invalid email");
        return false;
    }

    if (!gender) {
        showMessage("profileError", "Please select a gender");
        return false;
    }

    if (dd === "" || mm === "" || yyyy === "") {
        showMessage("profileError", "Date of birth cannot be empty");
        return false;
    }

    const day = parseInt(dd);
    const month = parseInt(mm);
    const year = parseInt(yyyy);

    if (isNaN(day) || isNaN(month) || isNaN(year)) {
        showMessage("profileError", "Date of birth must be numeric");
        return false;
    }

    if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1900 || year > 2016) {
        showMessage("profileError", "Invalid date of birth");
        return false;
    }

    if (blood === "") {
        showMessage("profileError", "Please select a blood group");
        return false;
    }

    if (degree.length === 0) {
        showMessage("profileError", "Please select at least one degree");
        return false;
    }

    if (photo === "") {
        showMessage("profileError", "Please choose a photo");
        return false;
    }

    showMessage("profileError", "Profile form is valid", true);
    return false;
}