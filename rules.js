// Rules page functionality

document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // Tab switching functionality
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            switchTab(targetTab, this);
        });
    });

    function switchTab(targetTab, clickedButton) {
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Add active class to clicked button and target content
        clickedButton.classList.add('active');
        const targetContent = document.getElementById(targetTab);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    }

    // Animate rule items on scroll
    const ruleItems = document.querySelectorAll('.rule-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.2 });

    ruleItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });

    // Contact card hover effects
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.boxShadow = '0 15px 30px rgba(26, 35, 126, 0.2)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });

    // Add styles for rule items and contact cards
    const rulesStyles = document.createElement('style');
    rulesStyles.textContent = `
        .tab-btn {
            padding: 1rem 2rem;
            background: transparent;
            border: 2px solid var(--primary-blue);
            color: var(--primary-blue);
            cursor: pointer;
            border-radius: 25px;
            margin: 0 0.5rem;
            transition: all 0.3s ease;
            font-weight: 500;
        }

        .tab-btn.active,
        .tab-btn:hover {
            background: var(--primary-blue);
            color: var(--pure-white);
        }

        .nav-tabs {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 1rem;
            margin-bottom: 3rem;
        }

        .rule-item {
            display: flex;
            align-items: flex-start;
            margin-bottom: 2rem;
            padding: 1.5rem;
            background: var(--pure-white);
            border-radius: 15px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
            transition: all 0.3s ease;
        }

        .rule-item:hover {
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            transform: translateY(-2px);
        }

        .rule-number {
            background: var(--accent-yellow);
            color: var(--primary-blue);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 1.2rem;
            margin-right: 1.5rem;
            flex-shrink: 0;
        }

        .rule-content h3 {
            color: var(--primary-blue);
            margin-bottom: 0.5rem;
            font-size: 1.3rem;
        }

        .rule-content p {
            line-height: 1.6;
            color: var(--text-dark);
        }

        .contact-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
            margin-top: 2rem;
        }

        .contact-card {
            background: var(--light-gray);
            padding: 1.5rem;
            border-radius: 15px;
            text-align: center;
            transition: all 0.3s ease;
            border: 2px solid transparent;
        }

        .contact-card:hover {
            border-color: var(--accent-yellow);
        }

        .contact-card h3 {
            color: var(--primary-blue);
            margin-bottom: 1rem;
            font-size: 1.2rem;
        }

        .contact-card p {
            margin: 0.5rem 0;
            font-weight: 500;
        }

        .emergency-contacts {
            margin-top: 4rem;
            padding: 3rem 2rem;
            background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
            border-radius: 20px;
            color: var(--pure-white);
        }

        .emergency-contacts h2 {
            text-align: center;
            margin-bottom: 2rem;
            color: var(--accent-yellow);
        }

        @media (max-width: 768px) {
            .nav-tabs {
                flex-direction: column;
                align-items: center;
            }

            .tab-btn {
                margin: 0.25rem 0;
                width: 200px;
            }

            .rule-item {
                flex-direction: column;
                text-align: center;
            }

            .rule-number {
                margin: 0 auto 1rem;
            }

            .contact-grid {
                grid-template-columns: 1fr;
            }
        }
    `;
    document.head.appendChild(rulesStyles);
});