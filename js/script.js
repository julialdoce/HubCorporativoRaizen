// Estado da aplicação
let currentUser = {
    name: 'Usuário Demo',
    role: 'admin', // 'admin' ou 'viewer'
    email: 'usuario@raizen.com.br'
};

let notifications = [
    {
        id: 1,
        title: 'Novo arquivo Excel adicionado',
        message: 'Relatório mensal de vendas foi carregado',
        type: 'info',
        read: false,
        timestamp: new Date(Date.now() - 1000 * 60 * 30)
    },
    {
        id: 2,
        title: 'Sistema EPI atualizado',
        message: 'Nova versão do sistema de controle de EPI disponível',
        type: 'warning',
        read: false,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2)
    }
];

let files = [
    {
        id: 1,
        name: 'Relatório Mensal Vendas - Janeiro 2025.xlsx',
        author: 'João Silva',
        uploadDate: new Date('2025-01-15'),
        size: '2.4 MB',
        category: 'Vendas',
        downloads: 23
    },
    {
        id: 2,
        name: 'Controle Estoque EPI - Q4 2024.xlsx',
        author: 'Maria Santos',
        uploadDate: new Date('2024-12-20'),
        size: '1.8 MB',
        category: 'Estoque',
        downloads: 45
    },
    {
        id: 3,
        name: 'Análise Financeira - Dezembro 2024.xlsx',
        author: 'Carlos Oliveira',
        uploadDate: new Date('2024-12-30'),
        size: '3.2 MB',
        category: 'Financeiro',
        downloads: 67
    },
    {
        id: 4,
        name: 'Relatório RH - Férias 2025.xlsx',
        author: 'Ana Costa',
        uploadDate: new Date('2025-01-10'),
        size: '1.5 MB',
        category: 'RH',
        downloads: 12
    }
];

let systems = [
    {
        id: 1,
        name: 'EPI Estoque',
        description: 'Sistema de controle de equipamentos de proteção individual',
        url: 'https://epi.raizen.com.br',
        category: 'Segurança',
        icon: 'fas fa-shield-alt',
        status: 'online'
    },
    {
        id: 2,
        name: 'Portal RH',
        description: 'Portal de recursos humanos e gestão de pessoas',
        url: 'https://rh.raizen.com.br',
        category: 'RH',
        icon: 'fas fa-users',
        status: 'online'
    },
    {
        id: 3,
        name: 'SAP GUI',
        description: 'Sistema integrado de gestão empresarial',
        url: 'https://sap.raizen.com.br',
        category: 'ERP',
        icon: 'fas fa-database',
        status: 'online'
    },
    {
        id: 4,
        name: 'Portal Financeiro',
        description: 'Sistema de gestão financeira e contábil',
        url: 'https://financeiro.raizen.com.br',
        category: 'Financeiro',
        icon: 'fas fa-dollar-sign',
        status: 'maintenance'
    },
    {
        id: 5,
        name: 'Sistema de Vendas',
        description: 'Plataforma de gestão de vendas e clientes',
        url: 'https://vendas.raizen.com.br',
        category: 'Vendas',
        icon: 'fas fa-chart-line',
        status: 'online'
    },
    {
        id: 6,
        name: 'Portal de Compras',
        description: 'Sistema de gestão de compras e fornecedores',
        url: 'https://compras.raizen.com.br',
        category: 'Compras',
        icon: 'fas fa-shopping-cart',
        status: 'online'
    }
];

let announcements = [
    {
        id: 1,
        title: 'Manutenção Programada - Sistema SAP',
        content: 'O sistema SAP ficará indisponível para manutenção no dia 15/01/2025 das 22h às 6h. Planeje suas atividades com antecedência.',
        type: 'alert',
        category: 'Sistemas',
        priority: 'high',
        author: 'TI Corporativo',
        publishDate: new Date('2025-01-10')
    },
    {
        id: 2,
        title: 'Nova Versão do Portal RH Disponível',
        content: 'Foi lançada uma nova versão do Portal RH com melhorias na interface e novas funcionalidades para gestão de férias.',
        type: 'info',
        category: 'RH',
        priority: 'medium',
        author: 'Recursos Humanos',
        publishDate: new Date('2025-01-08')
    },
    {
        id: 3,
        title: 'Treinamento Obrigatório - Segurança do Trabalho',
        content: 'Todos os colaboradores devem participar do treinamento de segurança do trabalho até o dia 31/01/2025. Inscrições pelo Portal RH.',
        type: 'warning',
        category: 'Segurança',
        priority: 'high',
        author: 'Segurança do Trabalho',
        publishDate: new Date('2025-01-05')
    },
    {
        id: 4,
        title: 'Atualização de Procedimentos Financeiros',
        content: 'Novos procedimentos para aprovação de despesas foram implementados. Consulte o manual atualizado no Portal Financeiro.',
        type: 'info',
        category: 'Financeiro',
        priority: 'medium',
        author: 'Financeiro',
        publishDate: new Date('2025-01-03')
    },
    {
        id: 5,
        title: 'Reunião Geral - Resultados Q4 2024',
        content: 'Reunião geral para apresentação dos resultados do quarto trimestre de 2024. Data: 20/01/2025 às 14h no auditório principal.',
        type: 'info',
        category: 'Geral',
        priority: 'medium',
        author: 'Diretoria',
        publishDate: new Date('2025-01-02')
    }
];

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    updateUI();
});

function initializeApp() {
    // Aplicar classe do perfil ao body
    document.body.className = currentUser.role;
    
    // Renderizar conteúdo inicial
    renderNotifications();
    renderDashboard();
    renderFiles();
    renderSystems();
    renderAnnouncements();
    
    // Mostrar seção inicial
    showSection('dashboard');
}

function setupEventListeners() {
    // Dropdown toggles
    document.querySelectorAll('.dropdown-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const dropdown = this.parentElement;
            
            // Fechar outros dropdowns
            document.querySelectorAll('.dropdown').forEach(d => {
                if (d !== dropdown) d.classList.remove('active');
            });
            
            dropdown.classList.toggle('active');
        });
    });

    // Fechar dropdowns ao clicar fora
    document.addEventListener('click', function() {
        document.querySelectorAll('.dropdown').forEach(d => {
            d.classList.remove('active');
        });
    });

    // Busca de arquivos
    const fileSearch = document.getElementById('fileSearch');
    if (fileSearch) {
        fileSearch.addEventListener('input', filterFiles);
    }

    // Filtro de categoria de arquivos
    const fileCategory = document.getElementById('fileCategory');
    if (fileCategory) {
        fileCategory.addEventListener('change', filterFiles);
    }

    // Upload de arquivo
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
        fileInput.addEventListener('change', handleFileUpload);
    }
}

// Navegação
function showSection(sectionId) {
    // Remover classe active de todas as seções
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remover classe active de todos os nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Mostrar seção selecionada
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Ativar nav item correspondente
    const navItem = document.querySelector(`[onclick="showSection('${sectionId}')"]`);
    if (navItem) {
        navItem.classList.add('active');
    }
    
    // Fechar sidebar no mobile
    if (window.innerWidth <= 1024) {
        document.getElementById('sidebar').classList.remove('active');
    }
}

// Toggle sidebar mobile
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

// Troca de perfil
function switchRole(newRole) {
    currentUser.role = newRole;
    document.body.className = newRole;
    
    // Atualizar texto do seletor
    const roleText = newRole === 'admin' ? 'Administrador' : 'Visualizador';
    document.getElementById('currentRole').textContent = roleText;
    
    // Mostrar toast
    showToast('Perfil Alterado', `Agora você está como ${roleText}`, 'info');
    
    // Fechar dropdown
    document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
}

// Sistema de notificações
function renderNotifications() {
    const notificationList = document.getElementById('notificationList');
    const notificationBadge = document.getElementById('notificationBadge');
    
    if (!notificationList) return;
    
    const unreadCount = notifications.filter(n => !n.read).length;
    
    // Atualizar badge
    if (unreadCount > 0) {
        notificationBadge.textContent = unreadCount;
        notificationBadge.style.display = 'flex';
    } else {
        notificationBadge.style.display = 'none';
    }
    
    // Renderizar lista
    notificationList.innerHTML = notifications.map(notification => `
        <div class="notification-item ${!notification.read ? 'unread' : ''}" onclick="markNotificationAsRead(${notification.id})">
            <h4>${notification.title}</h4>
            <p>${notification.message}</p>
            <small>${formatDate(notification.timestamp)}</small>
        </div>
    `).join('');
}

function markNotificationAsRead(notificationId) {
    const notification = notifications.find(n => n.id === notificationId);
    if (notification) {
        notification.read = true;
        renderNotifications();
    }
}

function markAllAsRead() {
    notifications.forEach(n => n.read = true);
    renderNotifications();
    showToast('Notificações', 'Todas as notificações foram marcadas como lidas', 'success');
}

function addNotification(title, message, type = 'info') {
    const newNotification = {
        id: Date.now(),
        title,
        message,
        type,
        read: false,
        timestamp: new Date()
    };
    
    notifications.unshift(newNotification);
    renderNotifications();
    showToast(title, message, type);
}

// Dashboard
function renderDashboard() {
    renderRecentFiles();
    renderRecentAnnouncements();
}

function renderRecentFiles() {
    const recentFiles = document.getElementById('recentFiles');
    if (!recentFiles) return;
    
    const recent = files.slice(0, 3);
    recentFiles.innerHTML = recent.map(file => `
        <div class="recent-item">
            <div class="recent-item-content">
                <h4>${file.name}</h4>
                <p>Por ${file.author} • ${file.size} • ${file.downloads} downloads</p>
            </div>
            <div class="recent-item-meta">
                <span class="file-category">${file.category}</span>
                <small>${formatDate(file.uploadDate)}</small>
            </div>
        </div>
    `).join('');
}

function renderRecentAnnouncements() {
    const recentAnnouncements = document.getElementById('recentAnnouncements');
    if (!recentAnnouncements) return;
    
    const recent = announcements.slice(0, 3);
    recentAnnouncements.innerHTML = recent.map(announcement => `
        <div class="recent-item">
            <div class="recent-item-content">
                <h4>${announcement.title}</h4>
                <p>${announcement.content.substring(0, 100)}...</p>
            </div>
            <div class="recent-item-meta">
                <span class="announcement-badge ${announcement.type}">${getTypeLabel(announcement.type)}</span>
                <span class="announcement-badge category">${announcement.category}</span>
                <small>Por ${announcement.author}</small>
                <small>${formatDate(announcement.publishDate)}</small>
            </div>
        </div>
    `).join('');
}

// Arquivos
function renderFiles() {
    const filesList = document.getElementById('filesList');
    if (!filesList) return;
    
    filesList.innerHTML = files.map(file => `
        <div class="file-item">
            <div class="file-icon">
                <i class="fas fa-file-excel"></i>
            </div>
            <div class="file-content">
                <h4>${file.name}</h4>
                <div class="file-meta">
                    <span><i class="fas fa-user"></i> ${file.author}</span>
                    <span><i class="fas fa-calendar"></i> ${formatDate(file.uploadDate)}</span>
                    <span><i class="fas fa-hdd"></i> ${file.size}</span>
                    <span><i class="fas fa-download"></i> ${file.downloads} downloads</span>
                </div>
                <span class="file-category">${file.category}</span>
            </div>
            <div class="file-actions">
                <button class="btn btn-secondary" onclick="downloadFile(${file.id})">
                    <i class="fas fa-download"></i> Download
                </button>
                ${currentUser.role === 'admin' ? `
                    <button class="btn btn-secondary" onclick="deleteFile(${file.id})" style="color: var(--error);">
                        <i class="fas fa-trash"></i>
                    </button>
                ` : ''}
            </div>
        </div>
    `).join('');
}

function filterFiles() {
    const searchTerm = document.getElementById('fileSearch').value.toLowerCase();
    const categoryFilter = document.getElementById('fileCategory').value;
    
    const filteredFiles = files.filter(file => {
        const matchesSearch = file.name.toLowerCase().includes(searchTerm) || 
                             file.author.toLowerCase().includes(searchTerm);
        const matchesCategory = !categoryFilter || file.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });
    
    const filesList = document.getElementById('filesList');
    filesList.innerHTML = filteredFiles.map(file => `
        <div class="file-item">
            <div class="file-icon">
                <i class="fas fa-file-excel"></i>
            </div>
            <div class="file-content">
                <h4>${file.name}</h4>
                <div class="file-meta">
                    <span><i class="fas fa-user"></i> ${file.author}</span>
                    <span><i class="fas fa-calendar"></i> ${formatDate(file.uploadDate)}</span>
                    <span><i class="fas fa-hdd"></i> ${file.size}</span>
                    <span><i class="fas fa-download"></i> ${file.downloads} downloads</span>
                </div>
                <span class="file-category">${file.category}</span>
            </div>
            <div class="file-actions">
                <button class="btn btn-secondary" onclick="downloadFile(${file.id})">
                    <i class="fas fa-download"></i> Download
                </button>
                ${currentUser.role === 'admin' ? `
                    <button class="btn btn-secondary" onclick="deleteFile(${file.id})" style="color: var(--error);">
                        <i class="fas fa-trash"></i>
                    </button>
                ` : ''}
            </div>
        </div>
    `).join('');
}

function uploadFile() {
    if (currentUser.role !== 'admin') {
        showToast('Acesso Negado', 'Apenas administradores podem fazer upload de arquivos', 'warning');
        return;
    }
    
    showModal('uploadModal');
}

function downloadFile(fileId) {
    const file = files.find(f => f.id === fileId);
    if (file) {
        file.downloads++;
        renderFiles();
        renderDashboard();
        showToast('Download Iniciado', `Download de ${file.name} iniciado`, 'info');
    }
}

function deleteFile(fileId) {
    if (currentUser.role !== 'admin') {
        showToast('Acesso Negado', 'Apenas administradores podem excluir arquivos', 'warning');
        return;
    }
    
    files = files.filter(f => f.id !== fileId);
    renderFiles();
    renderDashboard();
    showToast('Arquivo Excluído', 'Arquivo removido com sucesso', 'info');
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Validar tipo de arquivo
    if (!file.name.match(/\.(xlsx|xls)$/)) {
        showToast('Arquivo Inválido', 'Apenas arquivos Excel (.xlsx, .xls) são aceitos', 'error');
        return;
    }
    
    // Validar tamanho (10MB)
    if (file.size > 10 * 1024 * 1024) {
        showToast('Arquivo Muito Grande', 'O arquivo deve ter no máximo 10MB', 'error');
        return;
    }
    
    // Simular upload
    const newFile = {
        id: files.length + 1,
        name: file.name,
        author: currentUser.name,
        uploadDate: new Date(),
        size: formatFileSize(file.size),
        category: 'Geral',
        downloads: 0
    };
    
    files.unshift(newFile);
    renderFiles();
    renderDashboard();
    closeModal('uploadModal');
    showToast('Arquivo Carregado', `${file.name} foi carregado com sucesso`, 'success');
    
    // Limpar input
    event.target.value = '';
}

// Sistemas
function renderSystems() {
    const systemsList = document.getElementById('systemsList');
    if (!systemsList) return;
    
    systemsList.innerHTML = systems.map(system => `
        <div class="system-card">
            <div class="system-header">
                <div class="system-icon">
                    <i class="${system.icon}"></i>
                </div>
                <div class="system-info">
                    <h4>${system.name}</h4>
                    <span class="system-category">${system.category}</span>
                </div>
                ${currentUser.role === 'admin' ? `
                    <button class="btn btn-secondary" onclick="deleteSystem(${system.id})" style="color: var(--error); margin-left: auto;">
                        <i class="fas fa-trash"></i>
                    </button>
                ` : ''}
            </div>
            <p class="system-description">${system.description}</p>
            <div class="system-footer">
                <span class="system-status ${system.status}">
                    ${getStatusLabel(system.status)}
                </span>
                <button class="btn btn-primary" onclick="accessSystem('${system.url}')" 
                        ${system.status === 'offline' ? 'disabled' : ''}>
                    <i class="fas fa-external-link-alt"></i> Acessar
                </button>
            </div>
        </div>
    `).join('');
}

function accessSystem(url) {
    showToast('Acessando Sistema', 'Redirecionando para o sistema...', 'info');
    // Em produção, abriria o sistema em nova aba
    // window.open(url, '_blank');
}

function addSystem() {
    if (currentUser.role !== 'admin') {
        showToast('Acesso Negado', 'Apenas administradores podem adicionar sistemas', 'warning');
        return;
    }
    
    const newSystem = {
        id: systems.length + 1,
        name: 'Novo Sistema',
        description: 'Descrição do novo sistema corporativo',
        url: 'https://novo-sistema.raizen.com.br',
        category: 'Geral',
        icon: 'fas fa-external-link-alt',
        status: 'online'
    };
    
    systems.unshift(newSystem);
    renderSystems();
    showToast('Sistema Adicionado', 'Novo sistema foi adicionado com sucesso', 'success');
}

function deleteSystem(systemId) {
    if (currentUser.role !== 'admin') {
        showToast('Acesso Negado', 'Apenas administradores podem excluir sistemas', 'warning');
        return;
    }
    
    systems = systems.filter(s => s.id !== systemId);
    renderSystems();
    showToast('Sistema Removido', 'Sistema foi removido com sucesso', 'info');
}

// Avisos
function renderAnnouncements() {
    const announcementsList = document.getElementById('announcementsList');
    if (!announcementsList) return;
    
    announcementsList.innerHTML = announcements.map(announcement => `
        <div class="announcement-item ${announcement.type}">
            <div class="announcement-header">
                <div class="announcement-icon">
                    <i class="${getTypeIcon(announcement.type)}"></i>
                </div>
                <div class="announcement-content">
                    <h4>${announcement.title}</h4>
                    <div class="announcement-badges">
                        <span class="announcement-badge type">${getTypeLabel(announcement.type)}</span>
                        <span class="announcement-badge category">${announcement.category}</span>
                        <span class="announcement-badge priority">${getPriorityLabel(announcement.priority)}</span>
                    </div>
                    <p class="announcement-text">${announcement.content}</p>
                </div>
                ${currentUser.role === 'admin' ? `
                    <button class="btn btn-secondary" onclick="deleteAnnouncement(${announcement.id})" style="color: var(--error); margin-left: auto;">
                        <i class="fas fa-trash"></i>
                    </button>
                ` : ''}
            </div>
            <div class="announcement-footer">
                <span>Por ${announcement.author}</span>
                <span>${formatDate(announcement.publishDate)}</span>
            </div>
        </div>
    `).join('');
}

function createAnnouncement() {
    if (currentUser.role !== 'admin') {
        showToast('Acesso Negado', 'Apenas administradores podem criar avisos', 'warning');
        return;
    }
    
    const newAnnouncement = {
        id: announcements.length + 1,
        title: 'Novo Aviso',
        content: 'Conteúdo do novo aviso criado pelo sistema.',
        type: 'info',
        category: 'Geral',
        priority: 'medium',
        author: currentUser.name,
        publishDate: new Date()
    };
    
    announcements.unshift(newAnnouncement);
    renderAnnouncements();
    renderDashboard();
    showToast('Aviso Criado', 'Novo aviso foi publicado com sucesso', 'success');
}

function deleteAnnouncement(announcementId) {
    if (currentUser.role !== 'admin') {
        showToast('Acesso Negado', 'Apenas administradores podem excluir avisos', 'warning');
        return;
    }
    
    announcements = announcements.filter(a => a.id !== announcementId);
    renderAnnouncements();
    renderDashboard();
    showToast('Aviso Excluído', 'Aviso foi removido com sucesso', 'info');
}

// Modais
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

// Toast
function showToast(title, message, type = 'info') {
    const toastContainer = document.getElementById('toastContainer');
    const toastId = 'toast-' + Date.now();
    
    const toast = document.createElement('div');
    toast.id = toastId;
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="${getTypeIcon(type)}"></i>
        </div>
        <div class="toast-content">
            <h4 class="toast-title">${title}</h4>
            <p class="toast-message">${message}</p>
        </div>
        <button class="toast-close" onclick="removeToast('${toastId}')">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    toastContainer.appendChild(toast);
    
    // Auto remove após 5 segundos
    setTimeout(() => {
        removeToast(toastId);
    }, 5000);
}

function removeToast(toastId) {
    const toast = document.getElementById(toastId);
    if (toast) {
        toast.remove();
    }
}

// Utilitários
function formatDate(date) {
    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).format(date);
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function getTypeIcon(type) {
    const icons = {
        'info': 'fas fa-info-circle',
        'warning': 'fas fa-exclamation-circle',
        'alert': 'fas fa-exclamation-triangle',
        'success': 'fas fa-check-circle',
        'error': 'fas fa-times-circle'
    };
    return icons[type] || icons.info;
}

function getTypeLabel(type) {
    const labels = {
        'info': 'Info',
        'warning': 'Aviso',
        'alert': 'Alerta'
    };
    return labels[type] || 'Info';
}

function getStatusLabel(status) {
    const labels = {
        'online': 'Online',
        'maintenance': 'Manutenção',
        'offline': 'Offline'
    };
    return labels[status] || 'Desconhecido';
}

function getPriorityLabel(priority) {
    const labels = {
        'high': 'Alta',
        'medium': 'Média',
        'low': 'Baixa'
    };
    return labels[priority] || 'Média';
}

function updateUI() {
    // Atualizar contadores nos badges de navegação
    document.querySelector('[onclick="showSection(\'dashboard\')"] .nav-badge').textContent = '4';
    document.querySelector('[onclick="showSection(\'arquivos\')"] .nav-badge').textContent = files.length;
    document.querySelector('[onclick="showSection(\'sistemas\')"] .nav-badge').textContent = systems.length;
    document.querySelector('[onclick="showSection(\'avisos\')"] .nav-badge').textContent = announcements.length;
}

// Fechar modal ao clicar fora
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});

// Responsive
window.addEventListener('resize', function() {
    if (window.innerWidth > 1024) {
        document.getElementById('sidebar').classList.remove('active');
    }
});

