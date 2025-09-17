// Delegations page functionality

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('country-search');
    const continentFilter = document.getElementById('continent-filter');
    const delegationsGrid = document.getElementById('delegations-grid');
    const delegationCards = document.querySelectorAll('.delegation-card');

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            filterDelegations(searchTerm, continentFilter?.value || '');
        });
    }

    // Filter functionality
    if (continentFilter) {
        continentFilter.addEventListener('change', function() {
            const continent = this.value;
            filterDelegations(searchInput?.value.toLowerCase() || '', continent);
        });
    }

    // Filter delegations function
    function filterDelegations(searchTerm, continent) {
        delegationCards.forEach(card => {
            const countryName = card.querySelector('h3').textContent.toLowerCase();
            const cardContinent = card.getAttribute('data-continent');
            
            const matchesSearch = countryName.includes(searchTerm);
            const matchesContinent = !continent || cardContinent === continent;
            
            if (matchesSearch && matchesContinent) {
                card.style.display = 'block';
                card.classList.add('fade-in');
            } else {
                card.style.display = 'none';
                card.classList.remove('fade-in');
            }
        });
    }

    // Delegation detail buttons
    const delegationButtons = document.querySelectorAll('.delegation-btn');
    delegationButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.delegation-card');
            const country = card.querySelector('h3').textContent;
            showDelegationModal(country, card);
        });
    });

    // Show delegation modal
    function showDelegationModal(country, card) {
        const modal = createModal();
        const delegateCount = card.querySelector('.delegation-size').textContent;
        const focus = card.querySelector('.delegation-focus').textContent;
        
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2>Delegação ${country}</h2>
                <div class="modal-body">
                    <p><strong>Tamanho da Delegação:</strong> ${delegateCount}</p>
                    <p><strong>Foco Principal:</strong> ${focus}</p>
                    <div class="delegation-details">
                        <h3>Informações Adicionais</h3>
                        <ul>
                            <li>Participação em comissões principais</li>
                            <li>Reuniões bilaterais agendadas</li>
                            <li>Apresentações especiais programadas</li>
                            <li>Contribuições para debates temáticos</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        modal.style.display = 'flex';
        
        // Close modal functionality
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    // Create modal element
    function createModal() {
        const modal = document.createElement('div');
        modal.className = 'delegation-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.8);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease-out;
        `;
        
        // Add modal styles
        const modalStyles = document.createElement('style');
        modalStyles.textContent = `
            .modal-content {
                background: white;
                padding: 2rem;
                border-radius: 15px;
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                position: relative;
                animation: slideUp 0.3s ease-out;
            }
            
            .close-modal {
                position: absolute;
                top: 1rem;
                right: 1rem;
                font-size: 2rem;
                cursor: pointer;
                color: var(--primary-blue);
            }
            
            .modal-body {
                margin-top: 1rem;
            }
            
            .delegation-details {
                margin-top: 2rem;
                padding: 1rem;
                background: white;
                border-radius: 10px;
            }
            
            .delegation-details ul {
                margin-top: 1rem;
                padding-left: 1.5rem;
            }
            
            .delegation-details li {
                margin-bottom: 0.5rem;
            }
        `;
        
        if (!document.querySelector('#modal-styles')) {
            modalStyles.id = 'modal-styles';
            document.head.appendChild(modalStyles);
        }
        
        return modal;
    }

    // Animate stats bars
    const statBars = document.querySelectorAll('.bar-fill');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
                statsObserver.unobserve(bar);
            }
        });
    });

    statBars.forEach(bar => {
        statsObserver.observe(bar);
    });
});
