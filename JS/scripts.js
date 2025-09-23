const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("three-canvas"),
    alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);

const particles = new THREE.BufferGeometry();
const particleCount = 1000;
const positions = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 2000;
}
particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({
    color: 0x00f5ff,
    size: 2
});
const mesh = new THREE.Points(particles, material);
scene.add(mesh);

camera.position.z = 100;

function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.x += 0.0005;
    mesh.rotation.y += 0.001;
    renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

function animateOnScroll() {
    const fadeElements = document.querySelectorAll('.fade-in');
    const slideLeftElements = document.querySelectorAll('.slide-in-left');
    const slideRightElements = document.querySelectorAll('.slide-in-right');
    const scaleUpElements = document.querySelectorAll('.scale-up');
    const skillCategories = document.querySelectorAll('.skill-category');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const projectCards = document.querySelectorAll('.project-card');
    const serviceItems = document.querySelectorAll('.service-item');

    function checkVisibility(element, offset = 0) {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const isVisible = (elementTop <= window.innerHeight - offset) && (elementBottom >= 0);
        return isVisible;
    }

    function animateElements(elements, className) {
        elements.forEach(element => {
            if (checkVisibility(element, 100)) {
                element.classList.add('visible');
            }
        });
    }

    setTimeout(() => {
        animateElements(fadeElements, 'fade-in');
    }, 100);
    setTimeout(() => {
        animateElements(slideLeftElements, 'slide-in-left');
    }, 200);
    setTimeout(() => {
        animateElements(slideRightElements, 'slide-in-right');
    }, 300);
    setTimeout(() => {
        animateElements(scaleUpElements, 'scale-up');
    }, 400);

    setTimeout(() => {
        skillCategories.forEach((item, index) => {
            setTimeout(() => {
                if (checkVisibility(item, 150)) {
                    item.classList.add('visible');
                }
            }, index * 150);
        });
    }, 600);
    setTimeout(() => {
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                if (checkVisibility(item, 150)) {
                    item.classList.add('visible');
                }
            }, index * 200);
        });
    }, 700);
    setTimeout(() => {
        projectCards.forEach((item, index) => {
            setTimeout(() => {
                if (checkVisibility(item, 150)) {
                    item.classList.add('visible');
                }
            }, index * 150);
        });
    }, 800);
    setTimeout(() => {
        serviceItems.forEach((item, index) => {
            setTimeout(() => {
                if (checkVisibility(item, 150)) {
                    item.classList.add('visible');
                }
            }, index * 150);
        });
    }, 900);
}

window.addEventListener('scroll', animateOnScroll);

window.addEventListener('load', function() {
    setTimeout(() => {
        animateOnScroll();
    }, 300);
});

const skillBars = document.querySelectorAll('.skill-progress');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.style.width;
            entry.target.style.width = '0';
            setTimeout(() => {
                entry.target.style.width = width;
            }, 300);
        }
    });
}, {
    threshold: 0.5
});

skillBars.forEach(bar => {
    observer.observe(bar);
});

const modeBtn = document.getElementById('toggle-mode');
const userPref = localStorage.getItem('themeMode');

function setTheme(mode) {
    document.body.classList.remove('light-mode', 'dark-mode');
    document.body.classList.add(mode);
    localStorage.setItem('themeMode', mode);
    if (mode === 'light-mode') {
        modeBtn.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        modeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

window.addEventListener('DOMContentLoaded', () => {
    setTheme(userPref || 'dark-mode');
});

modeBtn.addEventListener('click', () => {
    const currentMode = document.body.classList.contains('light-mode') ? 'light-mode' : 'dark-mode';
    setTheme(currentMode === 'dark-mode' ? 'light-mode' : 'dark-mode');
});
// Hamburger Menu Toggle
const hamburgerBtn = document.getElementById('hamburger-btn');
const navbar = document.getElementById('navbar');
const navLinks = navbar.querySelectorAll('a');

hamburgerBtn.addEventListener('click', () => {
    navbar.classList.toggle('active');
    const icon = hamburgerBtn.querySelector('i');
    // Change icon between hamburger and 'X'
    if (navbar.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close menu when a link is clicked (for single-page navigation)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navbar.classList.contains('active')) {
            navbar.classList.remove('active');
            hamburgerBtn.querySelector('i').classList.remove('fa-times');
            hamburgerBtn.querySelector('i').classList.add('fa-bars');
        }
    });
});