// Ensure DOM is fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {
    // Carousel Script
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.image-card');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    let currentIndex = 0;
    const cardWidth = cards.length ? cards[0].offsetWidth : 0; // Check if cards exist
    let autoScrollInterval;

    function updateCarousel() {
        if (track) {
            track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
            leftArrow.disabled = currentIndex === 0;
            rightArrow.disabled = currentIndex === cards.length - 1;
        }
    }

    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            if (currentIndex < cards.length - 1) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateCarousel();
        }, 3000);
    }

    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    if (leftArrow) {
        leftArrow.addEventListener('click', () => {
            stopAutoScroll();
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
            startAutoScroll();
        });
    }

    if (rightArrow) {
        rightArrow.addEventListener('click', () => {
            stopAutoScroll();
            if (currentIndex < cards.length - 1) {
                currentIndex++;
                updateCarousel();
            }
            startAutoScroll();
        });
    }

    if (cards.length) {
        updateCarousel();
        startAutoScroll();
    }

    // Navigation Script
    const navButtons = document.querySelectorAll('.nav-links button');
    const pages = document.querySelectorAll('.page');

    function showPage(targetId) {
        pages.forEach(page => {
            page.style.display = 'none';
        });
        const targetPage = document.querySelector(targetId);
        if (targetPage) {
            targetPage.style.display = 'flex';
        }
    }

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            window.location.hash = targetId;
            showPage(targetId);
        });
    });

    window.addEventListener('load', () => {
        const hash = window.location.hash || '#home';
        showPage(hash);
    });

    window.addEventListener('hashchange', () => {
        const hash = window.location.hash || '#home';
        showPage(hash);
    });

    // Gallery Features Script
    const likeButtons = document.querySelectorAll('.like-button');
    const commentInputs = document.querySelectorAll('.comment-input');

    likeButtons.forEach(button => {
        let liked = false;
        button.addEventListener('click', () => {
            liked = !liked;
            button.textContent = liked ? '♥' : '♡';
            button.style.background = liked ? '#ff5555' : 'transparent';
            button.style.color = '#fff';
        });
    });

    commentInputs.forEach(input => {
        const commentsList = input.nextElementSibling;
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && input.value.trim() !== '') {
                const commentText = input.value.trim();
                const commentDiv = document.createElement('div');
                commentDiv.classList.add('comment');
                commentDiv.innerHTML = `
                    <span>${commentText}</span>
                    <button class="delete-comment">🗑️</button>
                `;
                commentsList.appendChild(commentDiv);
                input.value = '';

                const deleteButton = commentDiv.querySelector('.delete-comment');
                deleteButton.addEventListener('click', () => {
                    commentsList.removeChild(commentDiv);
                });
            }
        });
    });

    // Portfolio Functions
    function tempConverter() {
        let v = prompt("Please choose an option to convert:\nC for Celsius to Fahrenheit\nF for Fahrenheit to Celsius");
        if (!v) {
            alert("Invalid option.");
            return;
        }
        v = v.toLowerCase().trim();
        switch (v) {
            case "c":
                let celsius = Number(prompt("Enter temperature in Celsius:"));
                if (isNaN(celsius)) {
                    alert("Please enter a valid number.");
                    return;
                }
                alert(`The temperature in Fahrenheit is ${(celsius * 1.8 + 32).toFixed(2)}°F.`);
                break;
            case "f":
                let fahr = Number(prompt("Enter temperature in Fahrenheit:"));
                if (isNaN(fahr)) {
                    alert("Please enter a valid number.");
                    return;
                }
                alert(`The temperature in Celsius is ${((fahr - 32) / 1.8).toFixed(2)}°C.`);
                break;
            default:
                alert("Invalid option.");
        }
    }

   
        function longerWord() {
            let w1 = prompt("Please enter word 1 to be compared:");
            let w2 = prompt("Please enter word 2 to be compared:");

            if (w1 === null || w2 === null || w1.trim() === "" || w2.trim() === "") {
                alert("Invalid input. Please enter valid words.");
                return;
            }

            w1 = w1.trim().toLowerCase();
            w2 = w2.trim().toLowerCase();

            if (w1.length > w2.length) {
                alert(`Word 1 "${w1}" is the longer word than Word 2 "${w2}".`);
            } else if (w2.length > w1.length) {
                alert(`Word 2 "${w2}" is the longer word than Word 1 "${w1}".`);
            } else {
                alert("Wow! Both words have the same length.");
            }
        }

        

    function birthStone() {
        let month = prompt("Please enter your birth month:");
        if (!month) {
            alert("Please enter a valid month.");
            return;
        }
        month = month.toLowerCase().trim();
        const birthstones = {
            january: "Garnet",
            february: "Amethyst",
            march: "Aquamarine",
            april: "Diamond",
            may: "Emerald",
            june: "Alexandrite & Pearl",
            july: "Ruby",
            august: "Peridot",
            september: "Sapphire",
            october: "Opal & Tourmaline",
            november: "Citrine & Topaz",
            december: "Blue Zircon, Turquoise, & Tanzanite",
        };
        alert(birthstones[month] ? `Your birthstone is ${birthstones[month]}.` : "Invalid month. Please try again.");
    }

    function basicOperations() {
        let choice = Number(prompt("Choose an arithmetic operation:\n1. Addition\n2. Subtraction\n3. Multiplication\n4. Division"));
        if (![1, 2, 3, 4].includes(choice)) {
            alert("Invalid choice.");
            return;
        }
        let num1 = Number(prompt("Enter the first number:"));
        let num2 = Number(prompt("Enter the second number:"));
        if (isNaN(num1) || isNaN(num2)) {
            alert("Please enter valid numbers.");
            return;
        }
        if (choice === 4 && num2 === 0) {
            alert("Division by zero is not allowed.");
            return;
        }
        let result = choice === 1 ? num1 + num2 :
                     choice === 2 ? num1 - num2 :
                     choice === 3 ? num1 * num2 :
                     num1 / num2;
        let operation = ["Addition", "Subtraction", "Multiplication", "Division"][choice - 1];
        alert(`The result of ${operation} is ${result.toFixed(2)}.`);
    }

    function acceleration() {
        let initialVelocity = Number(prompt("Enter initial velocity in m/s:"));
        let finalVelocity = Number(prompt("Enter final velocity in m/s:"));
        let timeChange = Number(prompt("Enter the time change in seconds:"));
        if ([initialVelocity, finalVelocity, timeChange].some(isNaN)) {
            alert("Please enter valid numbers.");
            return;
        }
        if (timeChange === 0) {
            alert("Time change cannot be zero.");
            return;
        }
        let accel = (finalVelocity - initialVelocity) / timeChange;
        alert(`The acceleration is ${accel.toFixed(2)} m/s².`);
    }

    // Connect Portfolio Buttons to Functions
    const tempCalcBtn = document.getElementById('tempCalcBtn');
    const longerWordBtn = document.getElementById('longerWordBtn');
    const birthstoneBtn = document.getElementById('birthstoneBtn');
    const basicOpsBtn = document.getElementById('basicOpsBtn');
    const accelBtn = document.getElementById('accelBtn');

    if (tempCalcBtn) tempCalcBtn.addEventListener('click', tempConverter);
    if (longerWordBtn) longerWordBtn.addEventListener('click', longerWord);
    if (birthstoneBtn) birthstoneBtn.addEventListener('click', birthStone);
    if (basicOpsBtn) basicOpsBtn.addEventListener('click', basicOperations);
    if (accelBtn) accelBtn.addEventListener('click', acceleration);
});