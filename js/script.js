// =========================================
// 1. STICKY NAVIGATION EFFECT
// =========================================
const header = document.querySelector("header");

window.addEventListener("scroll", function() {
    if (header) {
        header.classList.toggle("sticky", window.scrollY > 0);
    }
});

// =========================================
// 2. MOBILE MENU TOGGLE
// =========================================
let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar nav ul');

if (menu && navbar) {
    menu.onclick = () => {
        menu.classList.toggle('open');
        navbar.classList.toggle('open');
    };
}

window.onscroll = () => {
    if (menu && navbar) {
        menu.classList.remove('open');
        navbar.classList.remove('open');
    }
    if (header) {
        header.classList.toggle("sticky", window.scrollY > 0);
    }
};

// =========================================
// 3. INVENTORY FILTER FUNCTION
// =========================================
function filterSelection(category, btn) {
    let elements = document.getElementsByClassName("filter-item");
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove("show");
        if (category === "all" || elements[i].classList.contains(category)) {
            elements[i].classList.add("show");
        }
    }
    
    // Fix for button highlighting
    if (btn) {
        let btns = document.getElementsByClassName("filter-btn");
        for (let i = 0; i < btns.length; i++) {
            btns[i].classList.remove("active");
        }
        btn.classList.add("active");
    }
}

// Initial filter on load
document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementsByClassName("filter-item").length > 0) {
        const activeBtn = document.querySelector('.filter-btn.active');
        filterSelection('all', activeBtn);
    }
});

// =========================================
// 4. SPECS MODAL LOGIC & DATA
// =========================================

const machineData = {
    // --- EARTHMOVING ---
    'excavators': {
        title: "Premium Excavators",
        desc: "Superior digging force and heavy-lift capacity for large-scale mining and construction projects.",
        img: "../assets/images/excavators.webp",
        specs: ["<strong>Net Power:</strong> 300 - 524 HP", "<strong>Operating Weight:</strong> 36,000 - 90,000 kg", "<strong>Bucket Capacity:</strong> 1.8 - 5.2 m³"]
    },
    'motor-graders': {
        title: "Precision Motor Graders",
        desc: "Essential for haul road maintenance and precision leveling in rugged terrain.",
        img: "../assets/images/motor-graders.webp",
        specs: ["<strong>Base Power:</strong> 170 - 250 HP", "<strong>Blade Width:</strong> 12 - 14 ft", "<strong>Weight:</strong> 17,000 - 24,000 kg"]
    },
    'track-tractors': {
        title: "Track Type Tractors (Dozers)",
        desc: "High-traction dozers designed for extreme land clearing and bulk material movement.",
        img: "../assets/images/track-type-tractors.webp",
        specs: ["<strong>Flywheel Power:</strong> 200 - 850 HP", "<strong>Operating Weight:</strong> 20,000 - 100,000 kg", "<strong>Blade Type:</strong> Semi-Universal / U-Blade"]
    },
    'wheel-loaders': {
        title: "Wheel Loaders",
        desc: "Versatile, high-cycle loaders for rapid material handling and stockpiling.",
        img: "../assets/images/wheel-loaders.webp",
        specs: ["<strong>Power:</strong> 230 - 400 HP", "<strong>Bucket Capacity:</strong> 3.5 - 7.0 m³", "<strong>Operating Weight:</strong> 18,000 - 35,000 kg"]
    },
    'wheel-excavators': {
        title: "Wheel Excavators",
        desc: "Combines the power of an excavator with the mobility of a wheeled vehicle for urban and site utility work.",
        img: "../assets/images/wheel-excavators.webp",
        specs: ["<strong>Power:</strong> 150 - 175 HP", "<strong>Max Speed:</strong> 37 km/h", "<strong>Max Dig Depth:</strong> 6.0 Meters"]
    },
    'long-reach': {
        title: "Long Reach Excavators",
        desc: "Specially designed for deep-water dredging and high-reach embankment work.",
        img: "../assets/images/long-reach-excavator.webp",
        specs: ["<strong>Max Reach:</strong> 18 - 22 Meters", "<strong>Boom Length:</strong> 10.5 Meters", "<strong>Arm Length:</strong> 7.5 Meters"]
    },
    'skidsteers': {
        title: "Compact Skidsteers",
        desc: "Highly maneuverable loaders for tight spaces and diverse utility attachments.",
        img: "../assets/images/skidsteers.webp",
        specs: ["<strong>Rated Op. Capacity:</strong> 950 - 1,500 kg", "<strong>Engine Power:</strong> 74 - 110 HP", "<strong>Vertical Lift Path:</strong> Yes"]
    },

    // --- TRUCKS ---
    'arctic-dumps': {
        title: "Articulated Rear Dumps",
        desc: "Perfect for high-volume hauling across rough, muddy, or steep terrain.",
        img: "../assets/images/artic-rear-dumps.webp",
        specs: ["<strong>Payload:</strong> 25 - 45 Tons", "<strong>Heaped Capacity:</strong> 15 - 25 m³", "<strong>Drive:</strong> 6x6 All-Wheel Drive"]
    },
    'off-highway': {
        title: "Off-Highway Trucks",
        desc: "Rugged haulers built for heavy mining extraction and massive site relocation.",
        img: "../assets/images/off-highway-trucks.webp",
        specs: ["<strong>Gross Power:</strong> 500 - 1,200 HP", "<strong>Payload Capacity:</strong> 60 - 100 Tons", "<strong>Top Speed Loaded:</strong> 60 km/h"]
    },
    'water-tanker': {
        title: "Dust Suppression Water Trucks",
        desc: "Critical for site safety and dust control on active mining haul roads.",
        img: "../assets/images/water-trucks.webp",
        specs: ["<strong>Tank Capacity:</strong> 5,000 - 20,000 Liters", "<strong>Spray System:</strong> Rear & Side Nozzles", "<strong>Chassis:</strong> Heavy Duty 6x4 / 6x6"]
    },
    'mechanics-truck': {
        title: "Field Mechanics Trucks",
        desc: "Mobile workshops equipped for onsite machinery repair and maintenance.",
        img: "../assets/images/mechanics-truck.webp",
        specs: ["<strong>Crane Capacity:</strong> 3,000 - 10,000 lbs", "<strong>Air Compressor:</strong> Included", "<strong>Storage:</strong> Multi-drawer tool cabinets"]
    },
    'fuel-lube': {
        title: "Fuel & Lube Trucks",
        desc: "Keeps your fleet moving with onsite refueling and oil service capabilities.",
        img: "../assets/images/fuel-lube-trucks.webp",
        specs: ["<strong>Fuel Capacity:</strong> 2,000 - 8,000 Gallons", "<strong>Lube Systems:</strong> Multi-pump grease/oil reels", "<strong>Safety:</strong> Fire suppression equipped"]
    },
    'trailers': {
        title: "Lowboy & Equipment Trailers",
        desc: "Designed for the safe transport of heavy tracked and wheeled machinery.",
        img: "../assets/images/trailers.webp",
        specs: ["<strong>Deck Capacity:</strong> 40 - 80 Tons", "<strong>Loading:</strong> Detachable Gooseneck", "<strong>Axles:</strong> Triple / Quad Axle Options"]
    },

    // --- LIFTING ---
    'rough-crane': {
        title: "Rough Terrain Cranes",
        desc: "Precision lifting for remote sites with unstable ground conditions.",
        img: "../assets/images/RoughTerrain.webp",
        specs: ["<strong>Lift Capacity:</strong> 30 - 100 Tons", "<strong>Max Tip Height:</strong> 45 - 65 Meters", "<strong>Steering:</strong> 4-Wheel Crab Steer"]
    },
    'tele-forklift': {
        title: "Telescopic Forklifts",
        desc: "Combines the reach of a crane with the utility of a forklift.",
        img: "../assets/images/telescopic-forklifts.webp",
        specs: ["<strong>Lift Capacity:</strong> 3,000 - 5,000 kg", "<strong>Max Lift Height:</strong> 12 - 17 Meters", "<strong>Drive:</strong> 4WD"]
    },
    'gen-forklift': {
        title: "General Forklifts",
        desc: "Reliable yard and warehouse loaders for palletized materials.",
        img: "../assets/images/general-forklifts.webp",
        specs: ["<strong>Capacity:</strong> 2.5 - 7 Tons", "<strong>Fuel:</strong> Diesel / LPG", "<strong>Mast:</strong> 3-Stage Container Entry"]
    },
    'scissor-lift': {
        title: "Scissor Manlifts",
        desc: "Safe elevated platforms for facility maintenance and site electrical work.",
        img: "../assets/images/scissor-manlifts.webp",
        specs: ["<strong>Platform Height:</strong> 10 - 18 Meters", "<strong>Capacity:</strong> 320 - 680 kg", "<strong>Power:</strong> Electric / Rough Terrain Diesel"]
    },

    // --- SPECIALIZED ---
    'crushers': {
        title: "Mobile Crushers & Screeners",
        desc: "Onsite processing of ore and rock to reduce transport costs and increase efficiency.",
        img: "../assets/images/crushers-screeners.webp",
        specs: ["<strong>Type:</strong> Jaw / Cone / Impact", "<strong>Throughput:</strong> 200 - 500 Tons/hr", "<strong>Mobility:</strong> Track Mounted"]
    },
    'handlers': {
        title: "Material Handlers",
        desc: "Optimized for high-volume scrap, timber, or port handling operations.",
        img: "../assets/images/material-handlers.webp",
        specs: ["<strong>Reach:</strong> 15 - 20 Meters", "<strong>Elevating Cab:</strong> Included", "<strong>Attachment:</strong> Grapple / Magnet"]
    },
    'scrap-processing': {
        title: "Scrap & Demolition Processors",
        desc: "Heavy-duty machines for the rapid destruction and processing of steel and concrete.",
        img: "../assets/images/scrap-1.webp",
        specs: ["<strong>Tool:</strong> Hydraulic Shears / Pulverizers", "<strong>System:</strong> High-Flow Hydraulics", "<strong>Protection:</strong> Reinforced Guarding"]
    },
    'ultra-demo': {
        title: "Ultra High Demolition",
        desc: "Tall-reach excavators for precision structural demolition.",
        img: "../assets/images/ultra-high-demolition.webp",
        specs: ["<strong>Max Height:</strong> 28 - 40 Meters", "<strong>Tool Weight:</strong> Up to 3,000 kg", "<strong>Tilting Cab:</strong> 30 Degrees"]
    },
    'rollers': {
        title: "Vibratory Rollers",
        desc: "Compaction excellence for road bases and infrastructure prep.",
        img: "../assets/images/vibratory-rollers.webp",
        specs: ["<strong>Drum Type:</strong> Smooth / Padfoot", "<strong>Weight:</strong> 10 - 14 Tons", "<strong>Vibration:</strong> Dual Frequency"]
    },
    'pipelayers': {
        title: "Precision Pipelayers",
        desc: "Purpose-built machines for large-diameter pipeline installation.",
        img: "../assets/images/pipelayers.webp",
        specs: ["<strong>Lift Capacity:</strong> 40,000 - 90,000 kg", "<strong>Boom Length:</strong> 7 Meters", "<strong>System:</strong> Hydraulically Controlled Winch"]
    },
    'stabilizers': {
        title: "Stabilizers & Reclaimers",
        desc: "Deep-mixing soil stabilization and pavement recycling.",
        img: "../assets/images/stabilizers-reclaimers.webp",
        specs: ["<strong>Cutting Width:</strong> 2.4 Meters", "<strong>Working Depth:</strong> 0.5 Meters", "<strong>Power:</strong> 500+ HP"]
    },
    'generators': {
        title: "Industrial Power Generators",
        desc: "Reliable off-grid power solutions for remote mining sites and camps.",
        img: "../assets/images/generators.webp",
        specs: ["<strong>Output:</strong> 100 - 1500 kVA", "<strong>Engine:</strong> Diesel Tier 4 Final", "<strong>Enclosure:</strong> Sound Attenuated Weatherproof"]
    },
    'sweepers': {
        title: "Industrial Site Sweepers",
        desc: "Maintains clean, safe haul roads and site facilities.",
        img: "../assets/images/sweepers.webp",
        specs: ["<strong>Broom Width:</strong> 2.5 Meters", "<strong>Hopper:</strong> 5 m³ Capacity", "<strong>System:</strong> Vacuum / Regenerative Air"]
    },

    // --- ATTACHMENTS ---
    'hydro-hammers': {
        title: "Hydraulic Rock Hammers",
        desc: "Breaks the toughest rock and concrete with high-impact hydraulic force.",
        img: "../assets/images/hydraulic-hammers.webp",
        specs: ["<strong>Impact Class:</strong> 2,000 - 15,000 ft-lb", "<strong>Carrier Weight:</strong> 15 - 90 Tons", "<strong>System:</strong> Auto-Greasing Ready"]
    },
    'work-tools': {
        title: "Precision Work Tools",
        desc: "Range of buckets, thumbs, and hitches for versatile site operations.",
        img: "../assets/images/work-tools.webp",
        specs: ["<strong>Types:</strong> Digging / Skeleton / Mud Buckets", "<strong>Connection:</strong> Quick Coupler Compatible", "<strong>Material:</strong> Hardox Steel"]
    },
    'heavy-attachments': {
        title: "Heavy Equipment Attachments",
        desc: "Specialized grapples and shears for the world's largest machinery.",
        img: "../assets/images/z-a-miscellaneous.webp",
        specs: ["<strong>Tool types:</strong> Scrap Shears / Material Grapples", "<strong>Rotation:</strong> 360 Degree Continuous", "<strong>Durability:</strong> Extreme Duty Wear Plates"]
    }
};

// Updated with Safety Check for missing elements
function openSpecs(id) {
    const modal = document.getElementById("specs-modal");
    if (!modal) {
        console.error("Critical Error: 'specs-modal' element not found in HTML.");
        return;
    }

    const data = machineData[id];

    if (data) {
        document.getElementById("modal-title").innerText = data.title;
        document.getElementById("modal-desc").innerText = data.desc;
        document.getElementById("modal-image").src = data.img;
        
        const specsList = document.getElementById("modal-specs");
        if (specsList) {
            specsList.innerHTML = ""; 
            data.specs.forEach(spec => {
                let li = document.createElement("li");
                li.innerHTML = spec;
                specsList.appendChild(li);
            });
        }

        modal.style.display = "block";
        document.body.style.overflow = "hidden"; // Prevent body scroll
    } else {
        console.warn("Machine Data ID missing for: " + id);
    }
}

function closeModal() {
    const modal = document.getElementById("specs-modal");
    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
}

window.onclick = function(event) {
    const modal = document.getElementById("specs-modal");
    if (event.target == modal) {
        closeModal();
    }
}

// =========================================
// 5. CONTACT FORM AJAX SUBMISSION (UPDATED SAFETY)
// =========================================
const contactForm = document.getElementById('contact-form');
const statusMsg = document.getElementById('form-status');

if (contactForm && statusMsg) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const submitBtn = document.getElementById('submit-btn');
        
        if (submitBtn) {
            submitBtn.innerText = "Sending...";
            submitBtn.disabled = true;
        }

        fetch('../php/contact-handler.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            if (data.trim() === "success") {
                statusMsg.style.color = "#D4AF37"; // Gold color
                statusMsg.innerText = "Message sent successfully!";
                contactForm.reset();
            } else {
                statusMsg.style.color = "#ff4444";
                statusMsg.innerText = "Error sending message. Please try again.";
            }
        })
        .catch(error => {
            statusMsg.style.color = "#ff4444";
            statusMsg.innerText = "Server error. Please check your connection.";
        })
        .finally(() => {
            if (submitBtn) {
                submitBtn.innerText = "Submit Message";
                submitBtn.disabled = false;
            }
        });
    });
}

fetch('../php/contact-handler.php', {
    method: 'POST',
    body: formData
})
.then(response => {
    // If the file is missing or server is down, this catches it
    if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
    }
    return response.text();
})
.then(data => {
    if (data.trim() === "success") {
        statusMsg.style.color = "#D4AF37";
        statusMsg.innerText = "Message sent successfully!";
        contactForm.reset();
    } else {
        console.error("Server Response:", data); // Check F12 Console for this
        statusMsg.style.color = "#ff4444";
        statusMsg.innerText = "Server error. Please check your connection.";
    }
})
.catch(error => {
    console.error("Fetch Error:", error); // This tells you if the path is wrong
    statusMsg.style.color = "#ff4444";
    statusMsg.innerText = "Connection error. Are you using a local server?";
});