// =========================================
// 1. STICKY NAVIGATION EFFECT
// =========================================
const header = document.querySelector("header");

window.addEventListener("scroll", function() {
    header.classList.toggle("sticky", window.scrollY > 0);
});

// =========================================
// 2. MOBILE MENU TOGGLE
// =========================================
let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar nav ul');

if (menu) {
    menu.onclick = () => {
        menu.classList.toggle('open');
        navbar.classList.toggle('open');
    };
}

window.onscroll = () => {
    if (menu) {
        menu.classList.remove('open');
        navbar.classList.remove('open');
    }
    header.classList.toggle("sticky", window.scrollY > 0);
};

// =========================================
// 3. INVENTORY FILTER FUNCTION
// =========================================
function filterSelection(category, btn) {
    let elements = document.getElementsByClassName("filter-item");
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove("show");
        if (category == "all" || elements[i].classList.contains(category)) {
            elements[i].classList.add("show");
        }
    }
    if (btn) {
        let btns = document.getElementsByClassName("filter-btn");
        for (let i = 0; i < btns.length; i++) {
            btns[i].classList.remove("active");
        }
        btn.classList.add("active");
    }
}
document.addEventListener("DOMContentLoaded", function() {
    filterSelection('all', null);
});

// =========================================
// 4. SPECS MODAL LOGIC (NEW)
// =========================================

// THE DATA LIST - YOU EDIT THIS PART
const machineData = {
    'excavators': {
        title: "Heavy Duty Excavator",
        desc: "Designed for maximum digging power and stability in mining environments.",
        img: "../assets/images/excavators.webp", 
        specs: [
            "<strong>Net Power:</strong> 300 HP",
            "<strong>Operating Weight:</strong> 36,000 kg",
            "<strong>Max Dig Depth:</strong> 7.5 Meters",
            "<strong>Bucket Capacity:</strong> 1.8 m3"
        ]
    },
    'motor-graders': {
        title: "Motor Grader 140K",
        desc: "Optimize your haul roads with our precision grading machines.",
        img: "../assets/images/motor-grader.webp",
        specs: [
            "<strong>Base Power:</strong> 170 HP",
            "<strong>Blade Width:</strong> 12 ft",
            "<strong>Top Speed:</strong> 44 km/h",
            "<strong>Weight:</strong> 17,000 kg"
        ]
    },
    'track-tractors': {
        title: "Track Type Tractor (Dozer)",
        desc: "Moves more material in less time with superior traction.",
        img: "../assets/images/track-tractor.webp",
        specs: [
            "<strong>Engine Model:</strong> C9 ACERT",
            "<strong>Flywheel Power:</strong> 200 HP",
            "<strong>Operating Weight:</strong> 20,000 kg",
            "<strong>Blade Type:</strong> Semi-Universal"
        ]
    },
    // ... YOU CAN ADD THE OTHER 27 HERE FOLLOWING THE SAME PATTERN ...
    // Example for the next one:
    /*
    'wheel-loaders': {
        title: "Wheel Loader",
        desc: "Versatile loader for moving earth and minerals.",
        img: "../assets/images/wheel-loader.webp",
        specs: ["<strong>Power:</strong> 250 HP", "<strong>Weight:</strong> 15 Tons"]
    },
    */
};

// Function to Open Modal
function openSpecs(id) {
    const modal = document.getElementById("specs-modal");
    const data = machineData[id];

    if (data) {
        // Fill Data
        document.getElementById("modal-title").innerText = data.title;
        document.getElementById("modal-desc").innerText = data.desc;
        document.getElementById("modal-image").src = data.img;
        
        // Fill Specs List
        const specsList = document.getElementById("modal-specs");
        specsList.innerHTML = ""; // Clear old specs
        data.specs.forEach(spec => {
            let li = document.createElement("li");
            li.innerHTML = spec;
            specsList.appendChild(li);
        });

        // Show Modal
        modal.style.display = "block";
    } else {
        console.log("No data found for: " + id);
    }
}

// Function to Close Modal
function closeModal() {
    document.getElementById("specs-modal").style.display = "none";
}

// Close if clicking outside the box
window.onclick = function(event) {
    const modal = document.getElementById("specs-modal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


// =========================================
// 5. CONTACT FORM AJAX SUBMISSION
// =========================================
const contactForm = document.getElementById('contact-form');
const statusMsg = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Stop page refresh

        const formData = new FormData(contactForm);
        const submitBtn = document.getElementById('submit-btn');
        
        submitBtn.innerText = "Sending...";
        submitBtn.disabled = true;

        // Send data to the PHP folder
        fetch('../php/contact-handler.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            if (data === "success") {
                statusMsg.style.color = "green";
                statusMsg.innerText = "Message sent successfully!";
                contactForm.reset(); // Clear form
            } else {
                statusMsg.style.color = "red";
                statusMsg.innerText = "Error sending message. Please try again.";
            }
        })
        .catch(error => {
            statusMsg.style.color = "red";
            statusMsg.innerText = "Server error. Please check your connection.";
        })
        .finally(() => {
            submitBtn.innerText = "Submit Message";
            submitBtn.disabled = false;
        });
    });
}