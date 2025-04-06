// GSAP Animations
gsap.from(".logo", { x: "-5rem", opacity: 0, duration: 1 });
gsap.from("nav ul li", { y: "-3rem", opacity: 0, duration: 1, stagger: 0.2 });
gsap.from(".signup", { scale: 0, opacity: 0, duration: 1 });
gsap.from(".profile-icon", { rotation: 360, opacity: 0, duration: 1 });

gsap.from(".hero-content h1", { y: "3rem", opacity: 0, duration: 1.5, ease: "bounce" });
gsap.from(".hero-content p", { y: "2rem", opacity: 0, duration: 1, delay: 1 });
gsap.from(".cta-button", { scale: 0, opacity: 0, duration: 1, delay: 1.5, ease: "elastic.out(1, 0.5)" });

gsap.to(".cta-button", { opacity: 1, duration: 0.3, delay: 2 });


document.addEventListener("DOMContentLoaded", () => {
    // Select all images in view_2 section
    document.querySelectorAll(".view_2 img").forEach(img => {
        img.style.position = "relative"; // Ensure images are relative for ripple positioning
        
        img.addEventListener("mouseenter", () => {
            gsap.to(img, { scale: 1.05, duration: 0.5, ease: "power2.out" });
        });

        img.addEventListener("mousemove", (e) => {
            let rect = img.getBoundingClientRect();
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;

            let ripple = document.createElement("span");
            ripple.classList.add("ripple");
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            img.appendChild(ripple);

            // GSAP animation for water drop wave
            gsap.to(ripple, {
                scale: 5,
                opacity: 10,
                duration: 1,
                ease: "power2.out",
                onComplete: () => ripple.remove()
            });
        });

        img.addEventListener("mouseleave", () => {
            gsap.to(img, { scale: 1, duration: 0.5, ease: "power2.inOut" });
        });
    });
});

/* section 3 */
// gsap.from(".view_3", { duration: 1, opacity: 0, y: 50, ease: "power2.out" });
// gsap.from(".feature", { duration: 1, opacity: 0, stagger: 0.2, scale: 0.8, ease: "power2.out" });



//glassmorphic nav
document.addEventListener("DOMContentLoaded", () => {
    let nav = document.querySelector("nav");
    let glassBar = document.createElement("div");
    glassBar.classList.add("nav-glass");
    nav.prepend(glassBar); // Add before links so it stays behind

    let navItems = document.querySelectorAll("nav ul li a");

    navItems.forEach((item) => {
        item.addEventListener("mouseenter", (e) => {
            let rect = item.getBoundingClientRect();
            let navRect = nav.getBoundingClientRect();
            let leftPos = rect.left - navRect.left;
            let width = rect.width;

            gsap.to(glassBar, {
                x: leftPos,
                width: width,
                duration: 0.3,
                ease: "power2.out",
            });
        });
    });

    // Reset on mouse leave
    nav.addEventListener("mouseleave", () => {
        gsap.to(glassBar, { width: "0px", duration: 0.3, ease: "power2.out" });
    });
});


//paragraph hover
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".view_2 .slide").forEach(slide => {
        slide.addEventListener("mouseenter", () => {
            gsap.to(slide, { 
                background: "linear-gradient(135deg, rgba(0, 128, 255, 0.5), rgba(0, 255, 128, 0.5))", 
                duration: 0.5 
            });
        });

        slide.addEventListener("mouseleave", () => {
            gsap.to(slide, { 
                background: "transparent", 
                duration: 0.5 
            });
        });
    });
});


