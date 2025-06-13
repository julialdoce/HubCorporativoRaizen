// ===== NOVAS FUNCIONALIDADES DE EDIÇÃO PARA ADMIN =====

// Adicionar ao final do setupEventListeners()
function setupEventListeners() {
    // ... código existente ...
    
    // ===== NOVAS FUNCIONALIDADES DE EDIÇÃO =====
    
    // Edição inline para títulos e textos
    setupInlineEditing();
    
    // Context menus para sistemas e avisos
    setupContextMenus();
    
    // Drag and drop para reordenar
    setupDragAndDrop();
}

// ===== SISTEMA DE EDIÇÃO INLINE =====
function setupInlineEditing() {
    // Tornar títulos editáveis em modo admin
    document.querySelectorAll('[data-editable]').forEach(element => {
        if (currentUser.role === 'admin') {
            element.setAttribute('contenteditable', 'true');
            element.classList.add('editable');
            
            // Salvar ao perder foco
            element.addEventListener('blur', function() {
                saveInlineEdit(this);
            });
            
            // Salvar com Enter
            element.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.blur();
                }
            });
            
            // Cancelar com Esc
            element.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    this.innerHTML = this.getAttribute('data-original');
                    this.blur();
                }
            });
            
            // Salvar valor original
            element.setAttribute('data-original', element.innerHTML);
        }
    });
}

function saveInlineEdit(element) {
    const newValue = element.innerHTML.trim();
    const originalValue = element.getAttribute('data-original');
    
    if (newValue !== originalValue) {
        // Atualizar valor original
        element.setAttribute('data-original', newValue);
        
        // Mostrar feedback
        showToast('Conteúdo Atualizado', 'As alterações foram salvas', 'success');
        
        // Aqui você salvaria no backend
        console.log('Salvando alteração:', {
            element: element.getAttribute('data-editable'),
            oldValue: originalValue,
            newValue: newValue
        });
    }
}

// ===== CONTEXT MENUS =====
function setupContextMenus() {
    // Remover menus existentes
    document.querySelectorAll('.context-menu').forEach(menu => menu.remove());
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.context-menu')) {
            document.querySelectorAll('.context-menu').forEach(menu => {
                menu.classList.remove('active');
            });
        }
    });
}

function showSystemMenu(systemId, event = null) {
    if (currentUser.role !== 'admin') return;
    
    // Encontrar o sistema
    const system = systems.find(s => s.id === systemId);
    if (!system) return;
    
    // Remover menus existentes
    document.querySelectorAll('.context-menu').forEach(menu => menu.remove());
    
    // Criar menu contextual
    const menu = document.createElement('div');
    menu.className = 'context-menu active';
    menu.innerHTML = `
        <div class="context-menu-item" onclick="editSystem(${systemId})">
            <i class="fas fa-edit"></i>
            Editar Sistema
        </div>
        <div class="context-menu-item" onclick="toggleSystemStatus(${systemId})">
            <i class="fas fa-power-off"></i>
            ${system.status === 'online' ? 'Colocar em Manutenção' : 'Colocar Online'}
        </div>
        <div class="context-menu-item" onclick="duplicateSystem(${systemId})">
            <i class="fas fa-copy"></i>
            Duplicar Sistema
        </div>
        <div class="context-menu-separator"></div>
        <div class="context-menu-item danger" onclick="deleteSystem(${systemId})">
            <i class="fas fa-trash"></i>
            Excluir Sistema
        </div>
    `;
    
    // Posicionar menu
    if (event) {
        menu.style.position = 'fixed';
        menu.style.left = event.pageX + 'px';
        menu.style.top = event.pageY + 'px';
    }
    
    document.body.appendChild(menu);
    
    // Fechar menu após 10 segundos
    setTimeout(() => {
        if (menu.parentElement) {
            menu.classList.remove('active');
        }
    }, 10000);
}

function showAnnouncementMenu(announcementId, event = null) {
    if (currentUser.role !== 'admin') return;
    
    // Encontrar o aviso
    const announcement = announcements.find(a => a.id === announcementId);
    if (!announcement) return;
    
    // Remover menus existentes
    document.querySelectorAll('.context-menu').forEach(menu => menu.remove());
    
    // Criar menu contextual
    const menu = document.createElement('div');
    menu.className = 'context-menu active';
    menu.innerHTML = `
        <div class="context-menu-item" onclick="editAnnouncement(${announcementId})">
            <i class="fas fa-edit"></i>
            Editar Aviso
        </div>
        <div class="context-menu-item" onclick="duplicateAnnouncement(${announcementId})">
            <i class="fas fa-copy"></i>
            Duplicar Aviso
        </div>
        <div class="context-menu-item" onclick="toggleAnnouncementPriority(${announcementId})">
            <i class="fas fa-exclamation"></i>
            Alterar Prioridade
        </div>
        <div class="context-menu-separator"></div>
        <div class="context-menu-item danger" onclick="deleteAnnouncement(${announcementId})">
            <i class="fas fa-trash"></i>
            Excluir Aviso
        </div>
    `;
    
    // Posicionar menu
    if (event) {
        menu.style.position = 'fixed';
        menu.style.left = event.pageX + 'px';
        menu.style.top = event.pageY + 'px';
    }
    
    document.body.appendChild(menu);
    
    // Fechar menu após 10 segundos
    setTimeout(() => {
        if (menu.parentElement) {
            menu.classList.remove('active');
        }
    }, 10000);
}

// ===== FUNÇÕES DE EDIÇÃO =====

// Editar Sistema
function editSystem(systemId) {
    const system = systems.find(s => s.id === systemId);
    if (!system) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.id = 'editSystemModal';
    modal.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>Editar Sistema</h3>
                <button class="modal-close" onclick="closeModal('editSystemModal')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <form id="editSystemForm">
                    <div class="form-group">
                        <label for="systemName">Nome do Sistema</label>
                        <input type="text" id="systemName" value="${system.name}" required>
                    </div>
                    <div class="form-group">
                        <label for="systemDescription">Descrição</label>
                        <textarea id="systemDescription" rows="3" required>${system.description}</textarea>
                    </div>
                    <div class="form-group">
                        <label for="systemUrl">URL</label>
                        <input type="url" id="systemUrl" value="${system.url}" required>
                    </div>
                    <div class="form-group">
                        <label for="systemCategory">Categoria</label>
                        <select id="systemCategory" required>
                            <option value="Segurança" ${system.category === 'Segurança' ? 'selected' : ''}>Segurança</option>
                            <option value="RH" ${system.category === 'RH' ? 'selected' : ''}>RH</option>
                            <option value="ERP" ${system.category === 'ERP' ? 'selected' : ''}>ERP</option>
                            <option value="Financeiro" ${system.category === 'Financeiro' ? 'selected' : ''}>Financeiro</option>
                            <option value="Vendas" ${system.category === 'Vendas' ? 'selected' : ''}>Vendas</option>
                            <option value="Compras" ${system.category === 'Compras' ? 'selected' : ''}>Compras</option>
                            <option value="Geral" ${system.category === 'Geral' ? 'selected' : ''}>Geral</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="systemStatus">Status</label>
                        <select id="systemStatus" required>
                            <option value="online" ${system.status === 'online' ? 'selected' : ''}>Online</option>
                            <option value="maintenance" ${system.status === 'maintenance' ? 'selected' : ''}>Manutenção</option>
                            <option value="offline" ${system.status === 'offline' ? 'selected' : ''}>Offline</option>
                        </select>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="closeModal('editSystemModal')">Cancelar</button>
                <button class="btn btn-primary" onclick="saveSystemEdit(${systemId})">Salvar Alterações</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.getElementById('systemName').focus();
}

function saveSystemEdit(systemId) {
    const system = systems.find(s => s.id === systemId);
    if (!system) return;
    
    // Pegar valores do formulário
    const name = document.getElementById('systemName').value.trim();
    const description = document.getElementById('systemDescription').value.trim();
    const url = document.getElementById('systemUrl').value.trim();
    const category = document.getElementById('systemCategory').value;
    const status = document.getElementById('systemStatus').value;
    
    // Validações
    if (!name || !description || !url) {
        showToast('Erro de Validação', 'Preencha todos os campos obrigatórios', 'error');
        return;
    }
    
    // Atualizar sistema
    system.name = name;
    system.description = description;
    system.url = url;
    system.category = category;
    system.status = status;
    
    // Re-renderizar
    renderSystems();
    renderDashboard();
    
    // Fechar modal
    closeModal('editSystemModal');
    
    showToast('Sistema Atualizado', 'As alterações foram salvas com sucesso', 'success');
}

// Editar Aviso
function editAnnouncement(announcementId) {
    const announcement = announcements.find(a => a.id === announcementId);
    if (!announcement) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.id = 'editAnnouncementModal';
    modal.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-content large">
            <div class="modal-header">
                <h3>Editar Aviso</h3>
                <button class="modal-close" onclick="closeModal('editAnnouncementModal')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <form id="editAnnouncementForm">
                    <div class="form-group">
                        <label for="announcementTitle">Título</label>
                        <input type="text" id="announcementTitle" value="${announcement.title}" required>
                    </div>
                    <div class="form-group">
                        <label for="announcementContent">Conteúdo</label>
                        <textarea id="announcementContent" rows="6" required>${announcement.content}</textarea>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="announcementType">Tipo</label>
                            <select id="announcementType" required>
                                <option value="info" ${announcement.type === 'info' ? 'selected' : ''}>Informação</option>
                                <option value="warning" ${announcement.type === 'warning' ? 'selected' : ''}>Aviso</option>
                                <option value="alert" ${announcement.type === 'alert' ? 'selected' : ''}>Alerta</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="announcementPriority">Prioridade</label>
                            <select id="announcementPriority" required>
                                <option value="high" ${announcement.priority === 'high' ? 'selected' : ''}>Alta</option>
                                <option value="medium" ${announcement.priority === 'medium' ? 'selected' : ''}>Média</option>
                                <option value="low" ${announcement.priority === 'low' ? 'selected' : ''}>Baixa</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="announcementCategory">Categoria</label>
                        <select id="announcementCategory" required>
                            <option value="Sistemas" ${announcement.category === 'Sistemas' ? 'selected' : ''}>Sistemas</option>
                            <option value="RH" ${announcement.category === 'RH' ? 'selected' : ''}>RH</option>
                            <option value="Segurança" ${announcement.category === 'Segurança' ? 'selected' : ''}>Segurança</option>
                            <option value="Financeiro" ${announcement.category === 'Financeiro' ? 'selected' : ''}>Financeiro</option>
                            <option value="Geral" ${announcement.category === 'Geral' ? 'selected' : ''}>Geral</option>
                        </select>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="closeModal('editAnnouncementModal')">Cancelar</button>
                <button class="btn btn-primary" onclick="saveAnnouncementEdit(${announcementId})">Salvar Alterações</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.getElementById('announcementTitle').focus();
}

function saveAnnouncementEdit(announcementId) {
    const announcement = announcements.find(a => a.id === announcementId);
    if (!announcement) return;
    
    // Pegar valores do formulário
    const title = document.getElementById('announcementTitle').value.trim();
    const content = document.getElementById('announcementContent').value.trim();
    const type = document.getElementById('announcementType').value;
    const priority = document.getElementById('announcementPriority').value;
    const category = document.getElementById('announcementCategory').value;
    
    // Validações
    if (!title || !content) {
        showToast('Erro de Validação', 'Preencha todos os campos obrigatórios', 'error');
        return;
    }
    
    // Atualizar aviso
    announcement.title = title;
    announcement.content = content;
    announcement.type = type;
    announcement.priority = priority;
    announcement.category = category;
    
    // Re-renderizar
    renderAnnouncements();
    renderDashboard();
    
    // Fechar modal
    closeModal('editAnnouncementModal');
    
    showToast('Aviso Atualizado', 'As alterações foram salvas com sucesso', 'success');
}

// ===== FUNÇÕES AUXILIARES =====

function toggleSystemStatus(systemId) {
    const system = systems.find(s => s.id === systemId);
    if (!system) return;
    
    // Alternar status
    if (system.status === 'online') {
        system.status = 'maintenance';
    } else {
        system.status = 'online';
    }
    
    renderSystems();
    renderDashboard();
    showToast('Status Alterado', `${system.name} agora está ${getStatusLabel(system.status)}`, 'info');
}

function duplicateSystem(systemId) {
    const system = systems.find(s => s.id === systemId);
    if (!system) return;
    
    const newSystem = {
        ...system,
        id: Math.max(...systems.map(s => s.id)) + 1,
        name: system.name + ' (Cópia)',
        url: system.url.replace('.com', '-copy.com')
    };
    
    systems.unshift(newSystem);
    renderSystems();
    renderDashboard();
    showToast('Sistema Duplicado', 'Sistema foi duplicado com sucesso', 'success');
}

function duplicateAnnouncement(announcementId) {
    const announcement = announcements.find(a => a.id === announcementId);
    if (!announcement) return;
    
    const newAnnouncement = {
        ...announcement,
        id: Math.max(...announcements.map(a => a.id)) + 1,
        title: announcement.title + ' (Cópia)',
        publishDate: new Date()
    };
    
    announcements.unshift(newAnnouncement);
    renderAnnouncements();
    renderDashboard();
    showToast('Aviso Duplicado', 'Aviso foi duplicado com sucesso', 'success');
}

function toggleAnnouncementPriority(announcementId) {
    const announcement = announcements.find(a => a.id === announcementId);
    if (!announcement) return;
    
    // Ciclar entre prioridades
    const priorities = ['low', 'medium', 'high'];
    const currentIndex = priorities.indexOf(announcement.priority);
    const nextIndex = (currentIndex + 1) % priorities.length;
    announcement.priority = priorities[nextIndex];
    
    renderAnnouncements();
    renderDashboard();
    showToast('Prioridade Alterada', `Prioridade alterada para ${getPriorityLabel(announcement.priority)}`, 'info');
}

// ===== DRAG & DROP (REORDENAÇÃO) =====
function setupDragAndDrop() {
    if (currentUser.role !== 'admin') return;
    
    // Tornar cards arrastáveis
    document.querySelectorAll('.system-card, .announcement-card').forEach(card => {
        card.draggable = true;
        card.addEventListener('dragstart', handleDragStart);
        card.addEventListener('dragover', handleDragOver);
        card.addEventListener('drop', handleDrop);
        card.addEventListener('dragend', handleDragEnd);
    });
}

let draggedElement = null;

function handleDragStart(e) {
    draggedElement = this;
    this.style.opacity = '0.5';
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    return false;
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    
    if (draggedElement !== this) {
        // Trocar posições
        const draggedIndex = Array.from(this.parentElement.children).indexOf(draggedElement);
        const targetIndex = Array.from(this.parentElement.children).indexOf(this);
        
        if (draggedIndex < targetIndex) {
            this.parentElement.insertBefore(draggedElement, this.nextSibling);
        } else {
            this.parentElement.insertBefore(draggedElement, this);
        }
        
        showToast('Posição Alterada', 'Item reordenado com sucesso', 'success');
    }
    
    return false;
}

function handleDragEnd(e) {
    this.style.opacity = '1';
    draggedElement = null;
}

// ===== ATUALIZAR FUNÇÃO DE INICIALIZAÇÃO =====
// Substitua a função initializeApp existente por esta:
function initializeApp() {
    // Aplicar classe do perfil ao body
    document.body.className = currentUser.role;
    
    // Renderizar conteúdo inicial
    renderNotifications();
    renderDashboard();
    renderFiles();
    renderSystems();
    renderAnnouncements();
    
    // Configurar funcionalidades de edição se for admin
    if (currentUser.role === 'admin') {
        setTimeout(() => {
            setupInlineEditing();
            setupDragAndDrop();
        }, 100);
    }
    
    // Mostrar seção inicial
    if (currentUser.isAuthenticated) {
        showSection('dashboard');
    } else {
        showHeroSection();
    }
}

// ===== FUNÇÃO PARA ATUALIZAR UI QUANDO MUDAR PERFIL =====
// Adicione esta função ao switchRole existente:
function switchRole(newRole) {
    if (newRole === 'admin' && !currentUser.isAuthenticated) {
        showLoginModal();
        return;
    }
    
    if (newRole === 'viewer') {
        logout();
        return;
    }
    
    currentUser.role = newRole;
    document.body.className = newRole;
    
    // Atualizar texto do seletor
    const roleText = newRole === 'admin' ? 'Administrador' : 'Visualizador';
    document.getElementById('currentRole').textContent = roleText;
    
    // Configurar funcionalidades de edição
    if (newRole === 'admin') {
        setTimeout(() => {
            setupInlineEditing();
            setupDragAndDrop();
        }, 100);
    } else {
        // Remover editabilidade
        document.querySelectorAll('[contenteditable="true"]').forEach(el => {
            el.removeAttribute('contenteditable');
            el.classList.remove('editable');
        });
    }
    
    // Re-renderizar para mostrar/ocultar controles admin
    renderSystems();
    renderAnnouncements();
    renderFiles();
    
    showToast('Perfil Alterado', `Agora você está como ${roleText}`, 'info');
    
    // Fechar dropdown
    document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
}
