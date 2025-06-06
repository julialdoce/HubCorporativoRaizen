import React, { useState, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Users, 
  FileSpreadsheet, 
  Link, 
  Bell, 
  Settings, 
  Eye, 
  Edit3, 
  Upload, 
  Download, 
  Trash2, 
  Plus, 
  X,
  AlertCircle,
  CheckCircle,
  Clock,
  ExternalLink,
  Shield,
  User
} from 'lucide-react';

const RaizenHub = () => {
  const [userRole, setUserRole] = useState('viewer'); // 'admin' ou 'viewer'
  const [currentUser, setCurrentUser] = useState('João Silva');
  const [activeTab, setActiveTab] = useState('dashboard');
  const fileInputRef = useRef(null);

  // Estados para dados
  const [excelFiles, setExcelFiles] = useState([
    { id: 1, name: 'Estoque EPI - Janeiro 2025.xlsx', uploadDate: '2025-01-15', uploadedBy: 'Maria Santos', size: '2.3 MB' },
    { id: 2, name: 'Relatório Segurança - Dezembro.xlsx', uploadDate: '2025-01-10', uploadedBy: 'Carlos Lima', size: '1.8 MB' },
    { id: 3, name: 'Controle Equipamentos.xlsx', uploadDate: '2025-01-08', uploadedBy: 'Ana Costa', size: '4.1 MB' }
  ]);

  const [systemLinks, setSystemLinks] = useState([
    { id: 1, name: 'EPI Estoque', url: 'https://epi.raizen.com', description: 'Sistema de controle de estoque de EPIs', category: 'Segurança' },
    { id: 2, name: 'Portal RH', url: 'https://rh.raizen.com', description: 'Portal de recursos humanos', category: 'RH' },
    { id: 3, name: 'Sistema Manutenção', url: 'https://manutencao.raizen.com', description: 'Controle de manutenção preventiva', category: 'Operações' },
    { id: 4, name: 'Relatórios HSE', url: 'https://hse.raizen.com', description: 'Health, Safety & Environment', category: 'Segurança' }
  ]);

  const [announcements, setAnnouncements] = useState([
    { id: 1, title: 'Atualização Sistema EPI', content: 'O sistema de controle de EPI será atualizado no próximo sábado (08/06). Haverá indisponibilidade das 08h às 12h.', type: 'warning', date: '2025-06-05', author: 'TI Raizen' },
    { id: 2, title: 'Nova Política de Segurança', content: 'Implementação das novas diretrizes de segurança conforme NR-35. Todos os colaboradores devem participar do treinamento até 15/06.', type: 'info', date: '2025-06-04', author: 'Segurança do Trabalho' },
    { id: 3, title: 'Parada Programada', content: 'Parada programada da unidade para manutenção preventiva de 10 a 12 de junho. Cronograma detalhado disponível no sistema.', type: 'alert', date: '2025-06-03', author: 'Operações' }
  ]);

  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Novo arquivo Excel adicionado: Estoque EPI - Janeiro 2025.xlsx', time: '2 horas atrás', read: false },
    { id: 2, message: 'Sistema EPI será atualizado amanhã', time: '5 horas atrás', read: false },
    { id: 3, message: 'Relatório mensal de segurança disponível', time: '1 dia atrás', read: true }
  ]);

  // Modais
  const [showAddLink, setShowAddLink] = useState(false);
  const [showAddAnnouncement, setShowAddAnnouncement] = useState(false);
  const [newLink, setNewLink] = useState({ name: '', url: '', description: '', category: '' });
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '', type: 'info' });

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.includes('spreadsheet') || file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
      const newFile = {
        id: excelFiles.length + 1,
        name: file.name,
        uploadDate: new Date().toISOString().split('T')[0],
        uploadedBy: currentUser,
        size: (file.size / (1024 * 1024)).toFixed(1) + ' MB'
      };
      setExcelFiles([newFile, ...excelFiles]);
      
      // Adicionar notificação
      const newNotification = {
        id: notifications.length + 1,
        message: `Novo arquivo Excel adicionado: ${file.name}`,
        time: 'Agora',
        read: false
      };
      setNotifications([newNotification, ...notifications]);
    }
  };

  const addSystemLink = () => {
    if (newLink.name && newLink.url) {
      const link = {
        id: systemLinks.length + 1,
        ...newLink
      };
      setSystemLinks([...systemLinks, link]);
      setNewLink({ name: '', url: '', description: '', category: '' });
      setShowAddLink(false);
    }
  };

  const addAnnouncement = () => {
    if (newAnnouncement.title && newAnnouncement.content) {
      const announcement = {
        id: announcements.length + 1,
        ...newAnnouncement,
        date: new Date().toISOString().split('T')[0],
        author: currentUser
      };
      setAnnouncements([announcement, ...announcements]);
      setNewAnnouncement({ title: '', content: '', type: 'info' });
      setShowAddAnnouncement(false);
    }
  };

  const getAnnouncementIcon = (type) => {
    switch(type) {
      case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'alert': return <AlertCircle className="w-5 h-5 text-red-500" />;
      default: return <CheckCircle className="w-5 h-5 text-blue-500" />;
    }
  };

  const getAnnouncementColor = (type) => {
    switch(type) {
      case 'warning': return 'border-yellow-200 bg-yellow-50';
      case 'alert': return 'border-red-200 bg-red-50';
      default: return 'border-blue-200 bg-blue-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold text-lg">
                RAIZEN BSMA
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Hub Corporativo</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Notificações */}
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-500 cursor-pointer hover:text-gray-700" />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </div>
              
              {/* Perfil e Controle de Acesso */}
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-700">{currentUser}</span>
                <select 
                  value={userRole} 
                  onChange={(e) => setUserRole(e.target.value)}
                  className="ml-2 px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="viewer">👁️ Visualizador</option>
                  <option value="admin">⚙️ Administrador</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navegação */}
        <nav className="flex space-x-8 mb-8">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: Settings },
            { id: 'files', label: 'Arquivos Excel', icon: FileSpreadsheet },
            { id: 'systems', label: 'Sistemas', icon: Link },
            { id: 'announcements', label: 'Avisos', icon: Bell }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === id 
                  ? 'bg-green-100 text-green-700 border border-green-200' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Resumo */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Arquivos Excel</p>
                    <p className="text-2xl font-bold text-gray-900">{excelFiles.length}</p>
                  </div>
                  <FileSpreadsheet className="w-8 h-8 text-green-500" />
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Sistemas</p>
                    <p className="text-2xl font-bold text-gray-900">{systemLinks.length}</p>
                  </div>
                  <Link className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avisos Ativos</p>
                    <p className="text-2xl font-bold text-gray-900">{announcements.length}</p>
                  </div>
                  <Bell className="w-8 h-8 text-yellow-500" />
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Notificações</p>
                    <p className="text-2xl font-bold text-gray-900">{notifications.filter(n => !n.read).length}</p>
                  </div>
                  <AlertCircle className="w-8 h-8 text-red-500" />
                </div>
              </div>
            </div>

            {/* Avisos Recentes */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Avisos Recentes</h2>
              </div>
              <div className="p-6 space-y-4">
                {announcements.slice(0, 3).map((announcement) => (
                  <div key={announcement.id} className={`p-4 rounded-lg border-l-4 ${getAnnouncementColor(announcement.type)}`}>
                    <div className="flex items-start space-x-3">
                      {getAnnouncementIcon(announcement.type)}
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{announcement.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{announcement.content}</p>
                        <p className="text-xs text-gray-400 mt-2">
                          {announcement.author} • {new Date(announcement.date).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Arquivos Excel */}
        {activeTab === 'files' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Arquivos Excel</h2>
              {userRole === 'admin' && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Upload className="w-5 h-5" />
                  <span>Adicionar Arquivo</span>
                </button>
              )}
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".xlsx,.xls"
              className="hidden"
            />

            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Arquivo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Enviado por
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tamanho
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {excelFiles.map((file) => (
                    <tr key={file.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FileSpreadsheet className="w-5 h-5 text-green-500 mr-3" />
                          <span className="text-sm font-medium text-gray-900">{file.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {file.uploadedBy}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {new Date(file.uploadDate).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {file.size}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-800">
                            <Download className="w-4 h-4" />
                          </button>
                          {userRole === 'admin' && (
                            <button className="text-red-600 hover:text-red-800">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Sistemas */}
        {activeTab === 'systems' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Sistemas Corporativos</h2>
              {userRole === 'admin' && (
                <button
                  onClick={() => setShowAddLink(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  <span>Adicionar Sistema</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {systemLinks.map((system) => (
                <div key={system.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Link className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{system.name}</h3>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {system.category}
                        </span>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">{system.description}</p>
                  
                  <a
                    href={system.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium"
                  >
                    <span>Acessar Sistema</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Avisos */}
        {activeTab === 'announcements' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Avisos e Comunicados</h2>
              {userRole === 'admin' && (
                <button
                  onClick={() => setShowAddAnnouncement(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  <span>Novo Aviso</span>
                </button>
              )}
            </div>

            <div className="space-y-4">
              {announcements.map((announcement) => (
                <div key={announcement.id} className={`bg-white rounded-lg shadow-sm border-l-4 ${getAnnouncementColor(announcement.type)} p-6`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      {getAnnouncementIcon(announcement.type)}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{announcement.title}</h3>
                        <p className="text-gray-700 mb-4">{announcement.content}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>{announcement.author}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{new Date(announcement.date).toLocaleDateString('pt-BR')}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    {userRole === 'admin' && (
                      <button className="text-red-600 hover:text-red-800">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal Adicionar Sistema */}
      {showAddLink && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Adicionar Sistema</h3>
              <button onClick={() => setShowAddLink(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Nome do Sistema"
                value={newLink.name}
                onChange={(e) => setNewLink({...newLink, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
              <input
                type="url"
                placeholder="URL do Sistema"
                value={newLink.url}
                onChange={(e) => setNewLink({...newLink, url: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
              <textarea
                placeholder="Descrição"
                value={newLink.description}
                onChange={(e) => setNewLink({...newLink, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-20"
              />
              
              <select
                value={newLink.category}
                onChange={(e) => setNewLink({...newLink, category: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecione uma categoria</option>
                <option value="Segurança">Segurança</option>
                <option value="RH">RH</option>
                <option value="Operações">Operações</option>
                <option value="Financeiro">Financeiro</option>
                <option value="TI">TI</option>
              </select>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={addSystemLink}
                className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Adicionar
              </button>
              <button
                onClick={() => setShowAddLink(false)}
                className="flex-1 border border-gray-300 py-2 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Adicionar Aviso */}
      {showAddAnnouncement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Novo Aviso</h3>
              <button onClick={() => setShowAddAnnouncement(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Título do Aviso"
                value={newAnnouncement.title}
                onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              
              <textarea
                placeholder="Conteúdo do Aviso"
                value={newAnnouncement.content}
                onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 h-24"
              />
              
              <select
                value={newAnnouncement.type}
                onChange={(e) => setNewAnnouncement({...newAnnouncement, type: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="info">Informação</option>
                <option value="warning">Aviso</option>
                <option value="alert">Alerta</option>
              </select>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={addAnnouncement}
                className="flex-1 bg-yellow-600 text-white py-2 rounded-md hover:bg-yellow-700 transition-colors"
              >
                Publicar
              </button>
              <button
                onClick={() => setShowAddAnnouncement(false)}
                className="flex-1 border border-gray-300 py-2 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<RaizenHub />);
