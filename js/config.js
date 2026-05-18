// ─── Inicialización de Firebase ───────────────────────────────────────────────
if (typeof firebase !== 'undefined' && window.firebaseConfig && window.firebaseConfig.apiKey !== 'TU_API_KEY') {
  firebase.initializeApp(window.firebaseConfig);
  console.log('Firebase Inicializado');
}

const db = (typeof firebase !== 'undefined' && firebase.apps.length > 0) ? firebase.database() : null;

// ─── Claves / Rutas de DB ──────────────────────────────────────────────────────
const KEYS = {
  CONFIG:      'config',
  PRODUCTS:    'products',
  CATEGORIES:  'categories',
  BRANCHES:    'branches',
  USERS:       'users',
  ORDERS:      'orders',
};

// ─── Configuración por defecto ────────────────────────────────────────────────
const DEFAULT_CONFIG = {
  // Identidad
  restaurantName:   'Andopar Centro de Servicios',
  logoText:         'Andopar',
  logoImage:        'images/logo.png',           // base64 o URL
  showLogoText:     true,                       // Mostrar texto junto al logo
  logoFontFamily:   "'Outfit', sans-serif",       // Fuente del texto del logo
  logoScale:        1.3,                         // Escala del logo (0.5 a 3.0)
  logoX:            0,                           // Posición X del logo en nav
  logoY:            0,                           // Posición Y del logo en nav
  tagline:          'Neumáticos, Combustibles y Repuestos Premium Scania',

  // Hero
  heroTitle:        'Potencia y Rendimiento en Cada Kilómetro',
  heroSubtitle:     'El centro de servicios líder para tu flota. Ofrecemos neumáticos de alta durabilidad, combustibles de máxima calidad y repuestos premium para camiones Scania.',
  heroBgImage:      'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1600&auto=format&fit=crop&q=80',           // base64 o URL de la imagen de fondo del hero
  heroBtn1Text:     'Ver Nuestros Productos',
  heroBtn1Link:     'productos.html',
  heroBtn2Text:     'Consultar por WhatsApp',
  heroBtn2Link:     'https://wa.me/595982300307',
  heroFilterColor:  '#000000',               // Negro para mejor contraste
  heroFilterOpacity: 0.6,                   // Opacidad ajustada

  // Contacto
  contactTitle:     '¿Tenés alguna consulta sobre tu flota?',
  contactSubtitle:  'Escribinos y te asesoramos al instante',
  contactBgImage:   'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?w=1200&auto=format&fit=crop&q=70',
  contactFilterColor: '#0a0a0a',
  contactFilterOpacity: 0.8,
  whatsappNumber:   '595982300307',
  contactPhone:     '(0982) 300307',
  contactEmail:     'contacto@andopar.com.py',
  email:            'contacto@andopar.com.py',

  // Estilo Navbar
  navStyleMode:     'blur',                      // 'blur' o 'color'
  navColor:         '#000000',

  // Colores (CSS variables) - Rojo deportivo y premium
  colorPrimary:     '#E31B23',
  colorPrimaryDark: '#B31217',
  colorAccent:      '#FFC107',
  colorBgDark:      '#0a0a0a',
  colorBgLight:     '#f5f5f5',

  // Redes sociales
  socialInstagram:  '',
  socialFacebook:   '',
  socialTiktok:     '',
  socialWhatsapp:   '',

  // Footer
  footerTagline:    'Servicios y repuestos de alta gama para vehículos pesados',
  footerCopyright:  'Todos los derechos reservados.',
  footerLogoScale:  1.0,
  footerLogoX:      0,
  footerLogoY:      0,
  romaLogoScale:    2.7,
  romaLogoX:        10,
  romaLogoY:        2,

  // Sección locales
  branchesTitle:    'Nuestros Locales',
  branchesSubtitle: 'Encontranos en las mejores ubicaciones del país',

  // Sección productos
  productsTitle:    'Nuestros Productos',
  productsSubtitle: 'Una selección premium de alta resistencia',
  productsPreviewCount: 4,        // 4 u 8 tarjetas en el inicio
  theme:            'dark',      // 'light' o 'dark'
  navTextColor:     '#ffffff',
};

// ─── Locales por defecto ──────────────────────────────────────────────────────
const DEFAULT_BRANCHES = [
  {
    id: 'branch-1',
    name: 'Centro de Servicios Andopar - Central',
    address: 'Av. Madame Lynch 1420, Asunción',
    phone: '+595 21 600-000',
    hours: 'Lunes a Sábado: 07:00 a 20:00hs',
    image: 'https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?w=800&auto=format&fit=crop&q=80',
    mapsUrl: 'https://goo.gl/maps/example1',
    active: true,
  },
  {
    id: 'branch-2',
    name: 'Estación Andopar - Ciudad del Este',
    address: 'Ruta PY02, Km 4, Ciudad del Este',
    phone: '+595 61 500-000',
    hours: 'Lunes a Domingo: 24hs (Combustible)',
    image: 'https://images.unsplash.com/photo-1527018601619-a508a2be00cd?w=800&auto=format&fit=crop&q=80',
    mapsUrl: 'https://goo.gl/maps/example2',
    active: true,
  }
];

// ─── Categorías por defecto ───────────────────────────────────────────────────
const DEFAULT_CATEGORIES = [
  { id: 'cat-neumaticos', name: 'Neumáticos', slug: 'neumaticos', active: true },
  { id: 'cat-combustibles', name: 'Combustibles', slug: 'combustibles', active: true },
  { id: 'cat-scania', name: 'Repuestos Scania', slug: 'repuestos-scania', active: true }
];

// ─── Productos por defecto ────────────────────────────────────────────────────
const DEFAULT_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Neumático de Tracción 295/80R22.5',
    description: 'Neumático premium diseñado para ejes de tracción de camiones de larga distancia. Alta resistencia al desgaste y máximo agarre en mojado.',
    price: 2850000,
    category: 'cat-neumaticos',
    image: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=800&auto=format&fit=crop&q=80',
    featured: true,
    available: true,
  },
  {
    id: 'prod-2',
    name: 'Neumático Direccional Premium',
    description: 'Diseño optimizado para ejes de dirección, proporcionando un guiado preciso, desgaste uniforme y reducción del consumo de combustible.',
    price: 2950000,
    category: 'cat-neumaticos',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&auto=format&fit=crop&q=80',
    featured: true,
    available: true,
  },
  {
    id: 'prod-3',
    name: 'Diésel Euro 6 Extra Power',
    description: 'Combustible diésel de ultra bajo azufre formulado con aditivos detergentes de última generación que limpian los inyectores y mejoran el torque.',
    price: 9500,
    category: 'cat-combustibles',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&auto=format&fit=crop&q=80',
    featured: true,
    available: true,
  },
  {
    id: 'prod-4',
    name: 'Nafta Súper Aditivada 97 Octanos',
    description: 'Nafta premium de máxima pureza para motores de alta exigencia. Reduce fricción interna, limpia impurezas y optimiza la potencia.',
    price: 8900,
    category: 'cat-combustibles',
    image: 'https://images.unsplash.com/photo-1527018601619-a508a2be00cd?w=800&auto=format&fit=crop&q=80',
    featured: false,
    available: true,
  },
  {
    id: 'prod-5',
    name: 'Filtro de Aceite Scania G-Series',
    description: 'Filtro original Scania diseñado para atrapar las partículas más finas de hollín y metal, asegurando la óptima lubricación del motor DC13.',
    price: 350000,
    category: 'cat-scania',
    image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=800&auto=format&fit=crop&q=80',
    featured: true,
    available: true,
  },
  {
    id: 'prod-6',
    name: 'Pastillas de Freno Scania Heavy Duty',
    description: 'Juego de pastillas de freno de alto rendimiento para ejes traseros Scania. Excelente disipación térmica y vida útil prolongada bajo carga extrema.',
    price: 1250000,
    category: 'cat-scania',
    image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=800&auto=format&fit=crop&q=80',
    featured: false,
    available: true,
  },
  {
    id: 'prod-7',
    name: 'Óptica Delantera LED Scania R-Series',
    description: 'Faros delanteros LED completos de repuesto para modelos Scania R y Streamline. Resistencia superior a vibraciones e iluminación de alta definición.',
    price: 2400000,
    category: 'cat-scania',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&auto=format&fit=crop&q=80',
    featured: true,
    available: true,
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// CLASE PRINCIPAL — AppConfig
// ═══════════════════════════════════════════════════════════════════════════════
class AppConfig {

  constructor() {
    this.config     = this._load(KEYS.CONFIG,     DEFAULT_CONFIG);
    this.products   = this._load(KEYS.PRODUCTS,   DEFAULT_PRODUCTS);
    this.categories = this._load(KEYS.CATEGORIES, DEFAULT_CATEGORIES);
    this.branches   = this._load(KEYS.BRANCHES,   DEFAULT_BRANCHES);
    
    // Autodetectar datos heredados de restaurante y forzar migración al nuevo rubro automotriz/camiones
    if (this.categories.some(c => c.id === 'cat-1')) {
      console.log("Detectados datos antiguos de restaurante. Migrando automáticamente al nuevo rubro de Neumáticos, Combustibles y Repuestos Scania...");
      this.config     = Object.assign({}, DEFAULT_CONFIG);
      this.categories = DEFAULT_CATEGORIES;
      this.products   = DEFAULT_PRODUCTS;
      this.branches   = DEFAULT_BRANCHES;
      this._save(KEYS.CONFIG,     this.config);
      this._save(KEYS.CATEGORIES, this.categories);
      this._save(KEYS.PRODUCTS,   this.products);
      this._save(KEYS.BRANCHES,   this.branches);
    }
    
    // Forzar actualización de imágenes si están vacías (para que el usuario vea los cambios)
    this._fillMissingData();
    
    this._applyTheme();

    if (db) {
      this._syncFromFirebase();
    }
  }

  // ─── Llenar datos faltantes (imágenes vacías) de los defaults ──────────────
  _fillMissingData() {
    let productsUpdated = false;
    this.products.forEach(p => {
      const def = DEFAULT_PRODUCTS.find(dp => dp.id === p.id);
      if (def && (!p.image || p.image === '')) {
        p.image = def.image;
        productsUpdated = true;
      }
      // Actualizar nombres y descripciones si son los por defecto antiguos
      if (def && (p.name === 'Plato Especial de la Casa' || p.name === 'Combinado Premium' || p.name === 'Bebida Especial')) {
        p.name = def.name;
        p.description = def.description;
        productsUpdated = true;
      }
    });

    let branchesUpdated = false;
    this.branches.forEach(b => {
      const def = DEFAULT_BRANCHES.find(db => db.id === b.id);
      if (def && (!b.image || b.image === '')) {
        b.image = def.image;
        branchesUpdated = true;
      }
    });

    if (productsUpdated) this._save(KEYS.PRODUCTS, this.products);
    if (branchesUpdated) this._save(KEYS.BRANCHES, this.branches);
    
    let configUpdated = false;
    if (this.config.heroBgImage === 'images/hero-bg.png') {
      this.config.heroBgImage = DEFAULT_CONFIG.heroBgImage;
      this.config.heroFilterColor = DEFAULT_CONFIG.heroFilterColor;
      this.config.heroFilterOpacity = DEFAULT_CONFIG.heroFilterOpacity;
      configUpdated = true;
    }
    if (this.config.heroBtn1Text === 'Ver Nuestra Carta') {
      this.config.heroBtn1Text = 'Ver Nuestros Productos';
      configUpdated = true;
    }
    if (this.config.productsTitle === 'Nuestra Carta') {
      this.config.productsTitle = 'Nuestros Productos';
      configUpdated = true;
    }
    if (configUpdated) {
      this._save(KEYS.CONFIG, this.config);
    }
  }

  // ─── Cargar desde localStorage o usar defecto ────────────────────────────
  _load(key, defaults) {
    try {
      const saved = localStorage.getItem(key);
      if (!saved) return structuredClone(defaults);
      // Para config, mergear con defaults para mantener nuevas claves
      if (key === KEYS.CONFIG) {
        return Object.assign({}, structuredClone(defaults), JSON.parse(saved));
      }
      return JSON.parse(saved);
    } catch (e) {
      console.warn(`[AppConfig] Error al cargar ${key}:`, e);
      return structuredClone(defaults);
    }
  }

  // ─── Guardar en localStorage ─────────────────────────────────────────────
  _save(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error(`[AppConfig] Error al guardar local ${key}:`, e);
    }

    if (db) {
      db.ref(key).set(data).catch(e => {
        console.error(`[AppConfig] Error al guardar en Firebase ${key}:`, e);
      });
    }
  }

  // ─── Sincronización en tiempo real desde Firebase ────────────────────────
  _syncFromFirebase() {
    const loadedKeys = new Set();
    const totalKeys = Object.keys(KEYS).length;

    Object.values(KEYS).forEach(key => {
      db.ref(key).on('value', snapshot => {
        const data = snapshot.val();
        
        // Solo actualizamos si hay datos válidos y NO están vacíos
        const hasData = data && (
          (Array.isArray(data) && data.length > 0) || 
          (typeof data === 'object' && Object.keys(data).length > 0)
        );

        if (hasData) {
          console.log(`[AppConfig] Sincronizado ${key} desde Firebase`);
          if (key === KEYS.CONFIG) {
            this.config = Object.assign({}, DEFAULT_CONFIG, data);
            this._applyTheme();
          }
          if (key === KEYS.PRODUCTS)   this.products = data;
          if (key === KEYS.CATEGORIES) this.categories = data;
          if (key === KEYS.BRANCHES)   this.branches = data;

          // Asegurar que las imágenes no se pierdan al sincronizar con un Firebase vacío de fotos
          this._fillMissingData();

          window.dispatchEvent(new CustomEvent('app-config-updated', { detail: { key } }));
        } else {
          console.log(`[AppConfig] Firebase vacío o incompleto para ${key}. Ignorando para evitar borrado.`);
          
          firebase.auth().onAuthStateChanged(user => {
            if (user) {
              console.log(`[AppConfig] Admin detectado. Subiendo datos locales a Firebase para ${key}...`);
              const localData = 
                (key === KEYS.CONFIG)     ? this.config : 
                (key === KEYS.PRODUCTS)   ? this.products :
                (key === KEYS.CATEGORIES) ? this.categories : 
                (key === KEYS.BRANCHES)   ? this.branches : null;
              
              if (localData) this._save(key, localData);
            }
          });
        }

        // Marcar llave como procesada para el preloader
        loadedKeys.add(key);
        if (loadedKeys.size >= totalKeys) {
          console.log('[AppConfig] Sincronización inicial completa');
          setTimeout(() => {
            const preloader = document.getElementById('site-preloader');
            if (preloader) preloader.classList.add('hidden');
          }, 300);
        }
      });
    });
  }

  // ─── Aplicar variables CSS dinámicamente ─────────────────────────────────
  _applyTheme() {
    const root = document.documentElement;
    const c = this.config;

    // Aplicar Tema (Claro / Oscuro)
    if (c.theme === 'light') root.classList.add('light');
    else root.classList.remove('light');

    root.style.setProperty('--color-primary',      c.colorPrimary     || '#D32F2F');
    root.style.setProperty('--color-primary-dark',  c.colorPrimaryDark || '#B71C1C');
    root.style.setProperty('--color-accent',        c.colorAccent      || '#FFC107');
    root.style.setProperty('--color-bg-dark',       c.colorBgDark      || '#1a1a1a');
    root.style.setProperty('--color-bg-medium',     c._colorBgMedium   || '#242424');
    root.style.setProperty('--color-bg-light',      c.colorBgLight     || '#f5f5f5');

    root.style.setProperty('--nav-text-color',     c.navTextColor     || '#ffffff');

    // Logo Nav
    root.style.setProperty('--nav-logo-scale', c.logoScale || 1);
    root.style.setProperty('--nav-logo-x', (c.logoX || 0) + 'px');
    root.style.setProperty('--nav-logo-y', (c.logoY || 0) + 'px');

    // Logo Footer Cliente
    root.style.setProperty('--footer-logo-scale', c.footerLogoScale || 1);
    root.style.setProperty('--footer-logo-x', (c.footerLogoX || 0) + 'px');
    root.style.setProperty('--footer-logo-y', (c.footerLogoY || 0) + 'px');

    // Logo RomaTech
    root.style.setProperty('--roma-logo-scale', c.romaLogoScale || 1);
    root.style.setProperty('--roma-logo-x', (c.romaLogoX || 0) + 'px');
    root.style.setProperty('--roma-logo-y', (c.romaLogoY || 0) + 'px');

    // Hero Filter
    root.style.setProperty('--hero-filter-color',   c.heroFilterColor || '#000000');
    root.style.setProperty('--hero-filter-opacity', c.heroFilterOpacity || 0.5);

    // Contact Filter
    root.style.setProperty('--contact-filter-color',   c.contactFilterColor || '#000000');
    root.style.setProperty('--contact-filter-opacity', c.contactFilterOpacity || 0.7);

    // Navbar Style
    if (c.navStyleMode === 'color') {
      root.style.setProperty('--nav-bg', c.navColor || '#000000');
      root.style.setProperty('--nav-blur', '0px');
    } else {
      root.style.setProperty('--nav-bg', 'rgba(0, 0, 0, 0.45)');
      root.style.setProperty('--nav-blur', '15px');
    }
  }

  // ─── Actualizar configuración ────────────────────────────────────────────
  updateConfig(updates) {
    Object.assign(this.config, updates);
    this._save(KEYS.CONFIG, this.config);
    this._applyTheme();
  }

  resetConfig() {
    this.config = structuredClone(DEFAULT_CONFIG);
    this._save(KEYS.CONFIG, this.config);
    this._applyTheme();
  }

  // ─── CRUD Productos ───────────────────────────────────────────────────────
  getProducts(onlyActive = false) {
    if (onlyActive) return this.products.filter(p => p.available);
    return this.products;
  }

  getFeaturedProducts(limit = 4) {
    const featured = this.products.filter(p => p.available && p.featured);
    // Si no hay suficientes destacados, completar con los demás
    if (featured.length >= limit) return featured.slice(0, limit);
    const rest = this.products.filter(p => p.available && !p.featured);
    return [...featured, ...rest].slice(0, limit);
  }

  getProductById(id) {
    return this.products.find(p => p.id === id) || null;
  }

  saveProduct(product) {
    if (!product.id) {
      // Nuevo producto
      product.id = 'prod-' + Date.now();
      this.products.push(product);
    } else {
      // Editar existente
      const idx = this.products.findIndex(p => p.id === product.id);
      if (idx !== -1) this.products[idx] = product;
    }
    this._save(KEYS.PRODUCTS, this.products);
    return product;
  }

  deleteProduct(id) {
    this.products = this.products.filter(p => p.id !== id);
    this._save(KEYS.PRODUCTS, this.products);
  }

  // ─── CRUD Categorías ──────────────────────────────────────────────────────
  getCategories(onlyActive = false) {
    if (onlyActive) return this.categories.filter(c => c.active);
    return this.categories;
  }

  saveCategory(category) {
    if (!category.id) {
      category.id = 'cat-' + Date.now();
      this.categories.push(category);
    } else {
      const idx = this.categories.findIndex(c => c.id === category.id);
      if (idx !== -1) this.categories[idx] = category;
    }
    this._save(KEYS.CATEGORIES, this.categories);
    return category;
  }

  deleteCategory(id) {
    this.categories = this.categories.filter(c => c.id !== id);
    this._save(KEYS.CATEGORIES, this.categories);
  }

  // ─── CRUD Locales ─────────────────────────────────────────────────────────
  getBranches(onlyActive = false) {
    if (onlyActive) return this.branches.filter(b => b.active);
    return this.branches;
  }

  saveBranch(branch) {
    if (!branch.id) {
      branch.id = 'branch-' + Date.now();
      this.branches.push(branch);
    } else {
      const idx = this.branches.findIndex(b => b.id === branch.id);
      if (idx !== -1) this.branches[idx] = branch;
    }
    this._save(KEYS.BRANCHES, this.branches);
    return branch;
  }

  deleteBranch(id) {
    this.branches = this.branches.filter(b => b.id !== id);
    this._save(KEYS.BRANCHES, this.branches);
  }

  // ─── Formato de precio ────────────────────────────────────────────────────
  formatPrice(price) {
    if (!price && price !== 0) return '';
    return new Intl.NumberFormat('es-PY', {
      style: 'currency',
      currency: 'PYG',
      maximumFractionDigits: 0,
    }).format(price);
  }

  // ─── Gestión de Perfil de Usuario ──────────────────────────────────────────
  async saveUserProfile(userId, data) {
    if (!db) return;
    try {
      await db.ref(`${KEYS.USERS}/${userId}`).set(data);
      console.log(`[AppConfig] Perfil guardado para ${userId}`);
    } catch (e) {
      console.error(`[AppConfig] Error al guardar perfil:`, e);
      throw e;
    }
  }

  async getUserProfile(userId) {
    if (!db) return null;
    try {
      const snapshot = await db.ref(`${KEYS.USERS}/${userId}`).once('value');
      return snapshot.val();
    } catch (e) {
      console.error(`[AppConfig] Error al obtener perfil:`, e);
      return null;
    }
  }

  async getUserOrders(userId) {
    if (!db) return [];
    try {
      // Los pedidos se guardan en /orders/ y cada pedido tiene un campo 'userId'
      // O se guardan en /orders/userId/idPedido. Dependerá de cómo estructuremos el carrito.
      // Por ahora, asumamos /orders/ filtrado por userId (aunque Firebase no es eficiente sin índices, para un MVP sirve)
      const snapshot = await db.ref(KEYS.ORDERS).orderByChild('userId').equalTo(userId).once('value');
      const data = snapshot.val();
      if (!data) return [];
      return Object.keys(data).map(key => ({ id: key, ...data[key] }));
    } catch (e) {
      console.error(`[AppConfig] Error al obtener pedidos:`, e);
      return [];
    }
  }

  // ─── Obtener categoría por ID ─────────────────────────────────────────────
  getCategoryName(categoryId) {
    const cat = this.categories.find(c => c.id === categoryId);
    return cat ? cat.name : '';
  }

  // ─── Verificación de Admin ────────────────────────────────────────────────
  async checkIsAdmin(userId) {
    if (!db) return false;
    try {
      const snapshot = await db.ref(`${KEYS.USERS}/${userId}/role`).once('value');
      return snapshot.val() === 'admin';
    } catch (e) {
      console.error("[AppConfig] Error al verificar rol de admin:", e);
      return false;
    }
  }
}

// ─── Instancia global ─────────────────────────────────────────────────────────
window.App = new AppConfig();
