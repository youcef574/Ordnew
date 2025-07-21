// Language Management
class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'fr';
        this.translations = {
            fr: {
                // Header
                dashboard: 'Tableau de bord',
                settings: 'Paramètres',
                logout: 'Déconnexion',
                
                // Page Title
                pageTitle: 'Gestion des Commandes',
                
                // Stats
                newOrders: 'Nouvelles',
                processing: 'En cours',
                shipped: 'Expédiées',
                completed: 'Terminées',
                
                // Toolbar
                searchPlaceholder: 'Rechercher par nom, téléphone ou numéro de commande...',
                allStatuses: 'Tous les statuts',
                new: 'Nouveau',
                cancelled: 'Annulé',
                to: 'à',
                export: 'Exporter',
                addTestOrder: 'Commande test',
                
                // Table Headers
                id: 'id',
                nom: 'Nom',
                phone: 'Téléphone',
                wilaya: 'Wilaya',
                produit: 'produit',
                variants: 'Variantes',
                quantity: 'Qté',
                total: 'Total',
                date: 'Date',
                statut: 'statut',
                action: 'action',
                
                // Modal
                invoiceTitle: 'Facture de clients',
                invoiceTitle: 'Facture',
                produit: 'Produit',
                variantes: 'Variantes',
                quantite: 'Quantité',
                nom: 'Nom',
                telephone: 'Téléphone',
                wilaya: 'Wilaya',
                commune: 'Commune',
                prixProduit: 'Prix produit',
                fraisLivraison: 'Frais de livraison',
                total: 'Total',
                callClient: '📞 Appeler le client',
                memos: '📝 Mémos / Notes',
                noAnswer: '❌ N\'a pas répondu',
                called: '☎ Appelé avec succès',
                callLater: '⏳ Rappeler plus tard',
                
                // Actions
                details: 'Détails',
                
                // Messages
                orderCopied: 'Informations de la commande copiées !',
                noteAdded: 'Note ajoutée avec succès !',
                statusUpdated: 'Statut mis à jour !',
                testOrderAdded: 'Commande test ajoutée !',
                
                // WhatsApp Modal
                whatsappNotification: 'Notification WhatsApp',
                whatsappQuestion: 'Voulez-vous notifier le client via WhatsApp du changement de statut ?',
                sendWhatsApp: 'Envoyer WhatsApp',
                cancel: 'Annuler',
                
                // Status
                statusNew: 'Nouveau',
                statusProcessing: 'En cours',
                statusShipped: 'Expédié',
                statusCompleted: 'Terminé',
                statusCancelled: 'Annulé'
            },
            en: {
                // Header
                dashboard: 'Dashboard',
                settings: 'Settings',
                logout: 'Logout',
                
                // Page Title
                pageTitle: 'Orders Management',
                
                // Stats
                newOrders: 'New',
                processing: 'Processing',
                shipped: 'Shipped',
                completed: 'Completed',
                
                // Toolbar
                searchPlaceholder: 'Search by name, phone or order number...',
                allStatuses: 'All statuses',
                new: 'New',
                cancelled: 'Cancelled',
                to: 'to',
                export: 'Export',
                addTestOrder: 'Test order',
                
                // Table Headers
                id: 'id',
                nom: 'Name',
                phone: 'Phone',
                wilaya: 'Wilaya',
                produit: 'product',
                variants: 'Variants',
                quantity: 'Qty',
                total: 'Total',
                date: 'Date',
                statut: 'status',
                action: 'action',
                
                // Modal
                invoiceTitle: 'Invoice',
                produit: 'Product',
              //  couleur: 'Color',
                Variantes: 'variable',   
                quantite: 'Quantity',
                nom: 'Name',
                telephone: 'Phone',
                wilaya: 'Wilaya',
                commune: 'City',
                prixProduit: 'Product price',
                fraisLivraison: 'Delivery fees',
                total: 'Total',
                callClient: '📞 Call client',
                memos: '📝 Memos / Notes',
                noAnswer: '❌ No answer',
                called: '☎ Called successfully',
                callLater: '⏳ Call back later',
                
                // Actions
                details: 'Details',
                
                // Messages
                orderCopied: 'Order information copied!',
                noteAdded: 'Note added successfully!',
                statusUpdated: 'Status updated!',
                testOrderAdded: 'Test order added!',
                
                // WhatsApp Modal
                whatsappNotification: 'WhatsApp Notification',
                whatsappQuestion: 'Would you like to notify the customer via WhatsApp about the status change?',
                sendWhatsApp: 'Send WhatsApp',
                cancel: 'Cancel',
                
                // Status
                statusNew: 'New',
                statusProcessing: 'Processing',
                statusShipped: 'Shipped',
                statusCompleted: 'Completed',
                statusCancelled: 'Cancelled'
            }
        };
        
        this.init();
    }
    
    init() {
        this.updateLanguageDisplay();
        this.translatePage();
        
        // Language toggle event
        document.getElementById('langToggle').addEventListener('click', () => {
            this.toggleLanguage();
        });
    }
    
    toggleLanguage() {
        this.currentLang = this.currentLang === 'fr' ? 'en' : 'fr';
        localStorage.setItem('language', this.currentLang);
        this.updateLanguageDisplay();
        this.translatePage();
        
        // Update table headers
        this.updateTableHeaders();
        
        // Update modal if open
        if (window.ordersManager && window.ordersManager.currentOrder) {
            window.ordersManager.populateModal(window.ordersManager.currentOrder);
        }
    }
    
    updateLanguageDisplay() {
        const langText = document.getElementById('langText');
        langText.textContent = this.currentLang === 'fr' ? 'Français' : 'English';
    }
    
    translatePage() {
        const elements = document.querySelectorAll('[data-key]');
        elements.forEach(element => {
            const key = element.getAttribute('data-key');
            if (this.translations[this.currentLang][key]) {
                element.textContent = this.translations[this.currentLang][key];
            }
        });
        
        // Translate placeholders
        const placeholderElements = document.querySelectorAll('[data-key-placeholder]');
        placeholderElements.forEach(element => {
            const key = element.getAttribute('data-key-placeholder');
            if (this.translations[this.currentLang][key]) {
                element.placeholder = this.translations[this.currentLang][key];
            }
        });
    }
    
    updateTableHeaders() {
        const headers = document.querySelectorAll('.orders-table th');
        const headerKeys = ['id', 'nom', 'phone', 'wilaya', 'produit', 'variants', 'quantity', 'total', 'date', 'statut', 'action'];
        
        headers.forEach((header, index) => {
            if (headerKeys[index] && this.translations[this.currentLang][headerKeys[index]]) {
                header.textContent = this.translations[this.currentLang][headerKeys[index]];
            }
        });
    }
    
    t(key) {
        return this.translations[this.currentLang][key] || key;
    }
}

// Orders Management System
class OrdersManager {
    constructor() {
        this.orders = this.loadOrders();
        this.filteredOrders = [...this.orders];
        this.currentOrder = null;
        this.pendingStatusChange = null;
        
        this.init();
    }
    
    init() {
        this.renderOrders();
        this.updateStats();
        this.bindEvents();
        this.initModal();
        this.initWhatsAppModal();
    }
    
    loadOrders() {
        // Load from localStorage or return sample data
        const saved = localStorage.getItem('orders');
        if (saved) {
            return JSON.parse(saved);
        }
        
        return this.generateSampleOrders();
    }
    
    saveOrders() {
        localStorage.setItem('orders', JSON.stringify(this.orders));
    }
    
    generateSampleOrders() {
        const sampleOrders = [
            {
                id: '1',
                customerName: 'Marie',
                phone: '+33 6 12 34 56 78',
                wilaya: 'Paris',
                city: 'Paris',
                product: 'Collier Élégance',
                variants: 'Or rose, 45cm',
                quantity: 1,
                total: 89.99,
                customerNotes: 'Livraison rapide s\'il vous plaît',
                sellerNotes: '',
                date: new Date(Date.now() - 86400000).toISOString(),
                status: 'new',
                isRead: false
            },
            {
                id: '2',
                customerName: 'Jean',
                phone: '+33 6 98 76 54 32',
                wilaya: 'Rhône',
                city: 'Lyon',
                product: 'Bague Diamant',
                variants: 'Argent, Taille 56',
                quantity: 1,
                total: 159.99,
                customerNotes: '',
                sellerNotes: '☎ Appelé avec succès',
                date: new Date(Date.now() - 172800000).toISOString(),
                status: 'processing',
                isRead: true
            },
            {
                id: '3',
                customerName: 'Sophie',
                phone: '+33 6 11 22 33 44',
                wilaya: 'Bouches-du-Rhône',
                city: 'Marseille',
                product: 'Bracelet Charme',
                variants: 'Or blanc, 18cm',
                quantity: 2,
                total: 199.98,
                customerNotes: 'Cadeau d\'anniversaire',
                sellerNotes: '',
                date: new Date(Date.now() - 259200000).toISOString(),
                status: 'shipped',
                isRead: true
            }
        ];
        
        return sampleOrders;
    }
    
    bindEvents() {
        // Search functionality
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.filterOrders();
        });
        
        // Status filter
        document.getElementById('statusFilter').addEventListener('change', () => {
            this.filterOrders();
        });
        
        // Date filters
        document.getElementById('dateFrom').addEventListener('change', () => {
            this.filterOrders();
        });
        
        document.getElementById('dateTo').addEventListener('change', () => {
            this.filterOrders();
        });
        
        // Add test order
        document.getElementById('addTestOrderBtn').addEventListener('click', () => {
            this.addTestOrder();
        });
        
        // Export functionality
        document.getElementById('exportBtn').addEventListener('click', () => {
            this.exportOrders();
        });
        
        // User menu toggle
        document.getElementById('menuToggle').addEventListener('click', (e) => {
            e.stopPropagation();
            const dropdown = document.getElementById('dropdownMenu');
            dropdown.classList.toggle('show');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            const dropdown = document.getElementById('dropdownMenu');
            dropdown.classList.remove('show');
        });
    }
    
    filterOrders() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const statusFilter = document.getElementById('statusFilter').value;
        const dateFrom = document.getElementById('dateFrom').value;
        const dateTo = document.getElementById('dateTo').value;
        
        this.filteredOrders = this.orders.filter(order => {
            // Search filter
            const matchesSearch = !searchTerm || 
                order.customerName.toLowerCase().includes(searchTerm) ||
                order.phone.includes(searchTerm) ||
                order.id.toLowerCase().includes(searchTerm) ||
                order.product.toLowerCase().includes(searchTerm) ||
                order.wilaya.toLowerCase().includes(searchTerm) ||
                order.city.toLowerCase().includes(searchTerm);
            
            // Status filter
            const matchesStatus = !statusFilter || order.status === statusFilter;
            
            // Date filter
            const orderDate = new Date(order.date).toISOString().split('T')[0];
            const matchesDateFrom = !dateFrom || orderDate >= dateFrom;
            const matchesDateTo = !dateTo || orderDate <= dateTo;
            
            return matchesSearch && matchesStatus && matchesDateFrom && matchesDateTo;
        });
        
        this.renderOrders();
        
        // Add search result count
        this.updateSearchResults();
    }
    
    updateSearchResults() {
        const searchInput = document.getElementById('searchInput');
        const resultCount = this.filteredOrders.length;
        const totalCount = this.orders.length;
        
        // Update placeholder to show results
        if (searchInput.value.trim()) {
            searchInput.setAttribute('data-results', `${resultCount} résultat${resultCount > 1 ? 's' : ''}`);
        } else {
            searchInput.removeAttribute('data-results');
        }
    }
    
    renderOrders() {
        const tbody = document.getElementById('ordersTableBody');
        tbody.innerHTML = '';
        
        if (this.filteredOrders.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align: center; padding: 2rem; color: var(--text-gray);">
                        ${window.langManager.t('noOrdersFound') || 'Aucune commande trouvée'}
                    </td>
                </tr>
            `;
            return;
        }
        
        this.filteredOrders.forEach((order, index) => {
            const row = document.createElement('tr');
            if (!order.isRead) {
                row.classList.add('unread');
            }
            
            // Extract first name only
            const firstName = order.customerName.split(' ')[0];
            
            row.innerHTML = `
                <td class="col-id"><strong>${index + 1}</strong></td>
                <td class="col-nom truncate" title="${order.customerName}">${firstName}</td>
                <td class="col-phone">${order.phone}</td>
                <td class="col-wilaya truncate" title="${order.wilaya}, ${order.city}">${order.wilaya}</td>
                <td class="col-produit truncate" title="${order.product}">${order.product}</td>
                <td class="col-variants truncate" title="${order.variants}">${order.variants}</td>
                <td class="col-quantity">${order.quantity}</td>
                <td class="col-total">€${order.total.toFixed(2)}</td>
                <td class="col-date">${this.formatDate(order.date)}</td>
                <td class="col-statut">${this.renderStatusDropdown(order.id, order.status)}</td>
                <td class="col-action">
                    <button class="action-btn" onclick="ordersManager.openOrderModal('${order.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                </td>
            `;
            
            // Add click event to row
            row.addEventListener('click', (e) => {
                if (!e.target.closest('.action-btn') && !e.target.closest('.status-dropdown')) {
                    this.openOrderModal(order.id);
                }
            });
            
            tbody.appendChild(row);
        });
        
        // Bind status dropdown events
        this.bindStatusDropdowns();
    }
    
    renderStatusDropdown(orderId, currentStatus) {
        const statusOptions = {
            new: { icon: 'fas fa-plus-circle', text: window.langManager.t('statusNew'), color: 'new' },
            processing: { icon: 'fas fa-clock', text: window.langManager.t('statusProcessing'), color: 'processing' },
            shipped: { icon: 'fas fa-truck', text: window.langManager.t('statusShipped'), color: 'shipped' },
            completed: { icon: 'fas fa-check-circle', text: window.langManager.t('statusCompleted'), color: 'completed' },
            cancelled: { icon: 'fas fa-times-circle', text: window.langManager.t('statusCancelled'), color: 'cancelled' }
        };
        
        const currentOption = statusOptions[currentStatus];
        
        return `
            <div class="status-dropdown" data-order-id="${orderId}">
                <select class="status-select ${currentStatus}" onchange="ordersManager.updateOrderStatusFromTable('${orderId}', this.value)">
                    ${Object.entries(statusOptions).map(([status, option]) => 
                        `<option value="${status}" ${status === currentStatus ? 'selected' : ''}>${option.text}</option>`
                    ).join('')}
                </select>
                <div class="status-display ${currentStatus}">
                    <i class="${currentOption.icon}"></i>
                    <span>${currentOption.text}</span>
                </div>
            </div>
        `;
    }
    
    bindStatusDropdowns() {
        // Add click handlers for status dropdowns
        document.querySelectorAll('.status-dropdown').forEach(dropdown => {
            const select = dropdown.querySelector('.status-select');
            const display = dropdown.querySelector('.status-display');
            
            display.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdown.classList.toggle('open');
                
                // Close other dropdowns
                document.querySelectorAll('.status-dropdown').forEach(other => {
                    if (other !== dropdown) {
                        other.classList.remove('open');
                    }
                });
            });
        });
        
        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.status-dropdown')) {
                document.querySelectorAll('.status-dropdown').forEach(dropdown => {
                    dropdown.classList.remove('open');
                });
            }
        });
    }
    
    updateOrderStatusFromTable(orderId, newStatus) {
        const order = this.orders.find(o => o.id === orderId);
        if (order && order.status !== newStatus) {
            // Store the pending change
            this.pendingStatusChange = {
                order: order,
                oldStatus: order.status,
                newStatus: newStatus
            };
            
            // Show WhatsApp notification modal
            this.showWhatsAppModal();
        }
    }
    
    renderStatusBadge(status) {
      
