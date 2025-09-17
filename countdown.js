// Countdown Timer for MaxOnu Event

document.addEventListener('DOMContentLoaded', function() {
    // Set the date for the MaxOnu event
    const eventDate = new Date('October 18, 2025 07:00:00').getTime();
    
    // Get countdown elements
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
        console.warn('Countdown elements not found');
        return;
    }

    // Update countdown every second
    const countdownInterval = setInterval(function() {
        const now = new Date().getTime();
        const distance = eventDate - now;

        if (distance < 0) {
            clearInterval(countdownInterval);
            showEventStarted();
            return;
        }

        // Calculate time units
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Update display with animation
        updateTimeUnit(daysElement, days);
        updateTimeUnit(hoursElement, hours);
        updateTimeUnit(minutesElement, minutes);
        updateTimeUnit(secondsElement, seconds);

        // Update excitement meter based on time remaining
        updateExcitementMeter(distance);
    }, 1000);

    // Function to update time unit with animation
    function updateTimeUnit(element, value) {
        const formattedValue = value.toString().padStart(2, '0');
        if (element.textContent !== formattedValue) {
            element.style.transform = 'scale(1.1)';
            element.style.color = 'var(--accent-yellow)';
            
            setTimeout(() => {
                element.textContent = formattedValue;
                element.style.transform = 'scale(1)';
                element.style.color = 'var(--primary-blue)';
            }, 150);
        }
    }

    // Function to show event started message
    function showEventStarted() {
        const countdownContainer = document.querySelector('.countdown-container');
        if (countdownContainer) {
            countdownContainer.innerHTML = `
                <div class="event-started">
                    <h2>🎉 O MaxOnu 2025 começou! 🎉</h2>
                    <p>O maior evento de delegações das Nações Unidas está acontecendo agora!</p>
                </div>
            `;
        }
    }

    // Function to update excitement meter
    function updateExcitementMeter(timeRemaining) {
        const excitementFill = document.getElementById('excitement-fill');
        if (!excitementFill) return;

        const totalTime = new Date('December 15, 2025 09:00:00').getTime() - new Date('January 1, 2025').getTime();
        const timeElapsed = totalTime - timeRemaining;
        const percentage = Math.min(95, (timeElapsed / totalTime) * 100 + 50);
        
        excitementFill.style.width = percentage + '%';
    }

    // Add special effects for milestone moments
    setInterval(function() {
        const now = new Date();
        const currentSeconds = now.getSeconds();
        
        // Special animation every 10 seconds
        if (currentSeconds % 10 === 0) {
            addSparkleEffect();
        }
    }, 1000);

    // Function to add sparkle effect
    function addSparkleEffect() {
        const countdownTimer = document.querySelector('.countdown-timer');
        if (!countdownTimer) return;

        for (let i = 0; i < 5; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: var(--accent-yellow);
                border-radius: 50%;
                pointer-events: none;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: sparkle 1s ease-out forwards;
                z-index: 10;
            `;
            countdownTimer.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 1000);
        }
    }

    // Add sparkle animation to CSS
    const sparkleStyle = document.createElement('style');
    sparkleStyle.textContent = `
        @keyframes sparkle {
            0% {
                opacity: 0;
                transform: scale(0) rotate(0deg);
            }
            50% {
                opacity: 1;
                transform: scale(1) rotate(180deg);
            }
            100% {
                opacity: 0;
                transform: scale(0) rotate(360deg);
            }
        }
        
        .event-started {
            text-align: center;
            padding: 3rem;
            background: linear-gradient(135deg, var(--accent-yellow), #ff9800);
            border-radius: 20px;
            color: var(--primary-blue);
            animation: bounce 2s ease-in-out infinite;
        }
        
        .event-started h2 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
        }
        
        .event-started p {
            font-size: 1.2rem;
            font-weight: 500;
        }
    `;
    document.head.appendChild(sparkleStyle);

    // Initialize countdown with current values
    const now = new Date().getTime();
    const distance = eventDate - now;
    
    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysElement.textContent = days.toString().padStart(2, '0');
        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
    }
});
