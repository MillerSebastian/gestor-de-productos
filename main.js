// ===== CONFIGURACIÓN Y VARIABLES GLOBALES =====
const CONFIG = {
  STORAGE_KEYS: {
    USERS: "srstore_users",
    CURRENT_USER: "srstore_current_user",
    PRODUCTS: "srstore_products",
  },
  CATEGORIES: {
    electronica: { name: "Electrónica", icon: "fas fa-laptop" },
    ropa: { name: "Ropa", icon: "fas fa-tshirt" },
    hogar: { name: "Hogar", icon: "fas fa-home" },
    deportes: { name: "Deportes", icon: "fas fa-football-ball" },
    libros: { name: "Libros", icon: "fas fa-book" },
    juguetes: { name: "Juguetes", icon: "fas fa-puzzle-piece" },
    belleza: { name: "Belleza", icon: "fas fa-spa" },
    automovil: { name: "Automóvil", icon: "fas fa-car" },
  },
};

// Variables globales para el estado de la aplicación
let currentUser = null;
let products = [];
let editingProductId = null;
let activeAlerts = []; // Array para manejar alertas activas
let selectedExcelFile = null; // Archivo Excel seleccionado

// === INTERNACIONALIZACIÓN ===
const LANG_KEY = "srstore_lang";
const translations = {
  es: {
    addProduct: "Agregar Producto",
    productName: "Nombre del Producto",
    price: "Precio",
    quantity: "Cantidad",
    category: "Categoría",
    selectCategory: "Selecciona una categoría",
    statsTotal: "Total Productos",
    statsValue: "Valor Total",
    statsCategories: "Categorías",
    statsLowStock: "Stock Bajo",
    myProducts: "Mis Productos",
    importExcel: "Importar Excel",
    exportExcel: "Exportar Excel",
    updatePassword: "Actualizar Contraseña",
    logout: "Cerrar Sesión",
    loginTitle: "Iniciar Sesión",
    loginUser: "Nombre de Usuario",
    loginPass: "Contraseña",
    loginBtn: "Iniciar Sesión",
    loginInfo:
      "Si es tu primera vez, solo escribe un nombre de usuario y una contraseña para crear tu cuenta.<br><strong>Requisitos:</strong> Usuario y contraseña de mínimo 8 caracteres. La contraseña debe tener al menos una mayúscula.",
    // Tour
    tourStep1:
      'Aquí puedes agregar nuevos productos llenando el formulario y haciendo clic en "Agregar Producto".',
    tourStep2:
      "Usa estos botones para importar productos desde Excel o exportar tu inventario actual.",
    tourStep3:
      "Estas tarjetas muestran estadísticas rápidas de tus productos, valor total, categorías y stock bajo.",
    tourStep4:
      "Aquí verás la lista de todos tus productos agregados. Puedes editar o eliminar cada uno.",
    tourStep5:
      "Haz clic aquí para actualizar tu contraseña en cualquier momento.",
    tourStep6: "Haz clic aquí para cerrar sesión de forma segura.",
    tourNext: "Siguiente",
    tourPrev: "Anterior",
    tourClose: "Cerrar",
    tourHelp: "¿Cómo funciona?",
    // Botones de tarjetas
    edit: "Editar",
    delete: "Eliminar",
    // Footer
    rights:
      "Todos los derechos reservados | Por Sebastian Rodelo Riwi Coder | hecho con el 💜 y mucho codigo.",
    contact: "Contacto",
    help: "Ayuda",
    privacy: "Privacidad",
    // Modal Excel
    importExcelTitle: "Importar Productos desde Excel",
    importExcelInstructions:
      "Tu archivo Excel debe tener las siguientes columnas en este orden:",
    importExcelCategories: "Códigos de Categorías:",
    importExcelSelect: "Seleccionar archivo Excel (.xlsx, .xls)",
    importExcelProcess: "Procesar Archivo",
    importExcelCancel: "Cancelar",
    // Modal contraseña
    updatePasswordTitle: "Actualizar Contraseña",
    currentPassword: "Contraseña Actual",
    newPassword: "Nueva Contraseña",
    confirmPassword: "Confirmar Nueva Contraseña",
    saveChanges: "Guardar Cambios",
    // Alertas y confirmaciones
    alertFillAll: "Por favor completa todos los campos",
    alertUser8: "El nombre de usuario debe tener al menos 8 caracteres",
    alertPass8: "La contraseña debe tener al menos 8 caracteres",
    alertPassUpper: "La contraseña debe tener al menos una letra mayúscula",
    alertUserExists: "Ese usuario ya existe. Ingresa la contraseña correcta.",
    alertWelcome: "¡Bienvenido, {user}!",
    alertWrong: "Credenciales incorrectas",
    alertProductAdded: "Producto agregado exitosamente",
    alertProductUpdated: "Producto actualizado exitosamente",
    alertProductDeleted: "Producto eliminado exitosamente",
    alertProductError: "Error al procesar el producto",
    alertLogout: "Sesión cerrada exitosamente",
    alertPasswordWrong: "La contraseña actual es incorrecta.",
    alertPassword8: "La nueva contraseña debe tener al menos 8 caracteres.",
    alertPasswordUpper:
      "La nueva contraseña debe tener al menos una mayúscula.",
    alertPasswordMatch: "Las contraseñas no coinciden.",
    alertPasswordDiff: "La nueva contraseña debe ser diferente a la actual.",
    alertPasswordUpdated: "Contraseña actualizada exitosamente.",
    confirmDelete: '¿Estás seguro de que quieres eliminar "{name}"?',
    confirmImport: "¿Estás seguro de que quieres importar {count} productos?",
    // ...otros textos clave...
  },
  en: {
    addProduct: "Add Product",
    productName: "Product Name",
    price: "Price",
    quantity: "Quantity",
    category: "Category",
    selectCategory: "Select a category",
    statsTotal: "Total Products",
    statsValue: "Total Value",
    statsCategories: "Categories",
    statsLowStock: "Low Stock",
    myProducts: "My Products",
    importExcel: "Import Excel",
    exportExcel: "Export Excel",
    updatePassword: "Update Password",
    logout: "Log Out",
    loginTitle: "Sign In",
    loginUser: "Username",
    loginPass: "Password",
    loginBtn: "Sign In",
    loginInfo:
      "If this is your first time, just enter a username and password to create your account.<br><strong>Requirements:</strong> Username and password at least 8 characters. Password must have at least one uppercase letter.",
    // Tour
    tourStep1:
      'Here you can add new products by filling out the form and clicking "Add Product".',
    tourStep2:
      "Use these buttons to import products from Excel or export your current inventory.",
    tourStep3:
      "These cards show quick stats of your products, total value, categories, and low stock.",
    tourStep4:
      "Here you will see the list of all your added products. You can edit or delete each one.",
    tourStep5: "Click here to update your password at any time.",
    tourStep6: "Click here to log out safely.",
    tourNext: "Next",
    tourPrev: "Previous",
    tourClose: "Close",
    tourHelp: "How does it work?",
    // Card buttons
    edit: "Edit",
    delete: "Delete",
    // Footer
    rights:
      "All rights reserved | By Sebastian Rodelo Riwi Coder | made with the 💜 and a lot of code.",
    contact: "Contact",
    help: "Help",
    privacy: "Privacy",
    // Excel modal
    importExcelTitle: "Import Products from Excel",
    importExcelInstructions:
      "Your Excel file must have the following columns in this order:",
    importExcelCategories: "Category Codes:",
    importExcelSelect: "Select Excel file (.xlsx, .xls)",
    importExcelProcess: "Process File",
    importExcelCancel: "Cancel",
    // Password modal
    updatePasswordTitle: "Update Password",
    currentPassword: "Current Password",
    newPassword: "New Password",
    confirmPassword: "Confirm New Password",
    saveChanges: "Save Changes",
    // Alerts and confirmations
    alertFillAll: "Please fill in all fields",
    alertUser8: "Username must be at least 8 characters",
    alertPass8: "Password must be at least 8 characters",
    alertPassUpper: "Password must have at least one uppercase letter",
    alertUserExists: "That user already exists. Enter the correct password.",
    alertWelcome: "Welcome, {user}!",
    alertWrong: "Incorrect credentials",
    alertProductAdded: "Product added successfully",
    alertProductUpdated: "Product updated successfully",
    alertProductDeleted: "Product deleted successfully",
    alertProductError: "Error processing product",
    alertLogout: "Logged out successfully",
    alertPasswordWrong: "Current password is incorrect.",
    alertPassword8: "New password must be at least 8 characters.",
    alertPasswordUpper: "New password must have at least one uppercase letter.",
    alertPasswordMatch: "Passwords do not match.",
    alertPasswordDiff: "New password must be different from the current one.",
    alertPasswordUpdated: "Password updated successfully.",
    confirmDelete: 'Are you sure you want to delete "{name}"?',
    confirmImport: "Are you sure you want to import {count} products?",
    // ...
  },
  fr: {
    addProduct: "Ajouter un produit",
    productName: "Nom du produit",
    price: "Prix",
    quantity: "Quantité",
    category: "Catégorie",
    selectCategory: "Sélectionnez une catégorie",
    statsTotal: "Total Produits",
    statsValue: "Valeur Totale",
    statsCategories: "Catégories",
    statsLowStock: "Stock Faible",
    myProducts: "Mes Produits",
    importExcel: "Importer Excel",
    exportExcel: "Exporter Excel",
    updatePassword: "Changer le mot de passe",
    logout: "Déconnexion",
    loginTitle: "Connexion",
    loginUser: "Nom d'utilisateur",
    loginPass: "Mot de passe",
    loginBtn: "Connexion",
    loginInfo:
      "Pour la première fois, entrez simplement un nom d'utilisateur et un mot de passe pour créer votre compte.<br><strong>Exigences :</strong> Nom d'utilisateur et mot de passe d'au moins 8 caractères. Le mot de passe doit comporter au moins une majuscule.",
    // Tour
    tourStep1:
      'Ici, vous pouvez ajouter de nouveaux produits en remplissant le formulaire puis en cliquant sur "Ajouter un produit".',
    tourStep2:
      "Utilisez ces boutons pour importer des produits depuis Excel ou exporter votre inventaire actuel.",
    tourStep3:
      "Ces cartes affichent des statistiques rapides sur vos produits, la valeur totale, les catégories et le stock faible.",
    tourStep4:
      "Ici, vous verrez la liste de tous vos produits ajoutés. Vous pouvez éditer ou supprimer chacun d'eux.",
    tourStep5: "Cliquez ici pour changer votre mot de passe à tout moment.",
    tourStep6: "Cliquez ici pour vous déconnecter en toute sécurité.",
    tourNext: "Suivant",
    tourPrev: "Précédent",
    tourClose: "Fermer",
    tourHelp: "Comment ça marche ?",
    // Card buttons
    edit: "Éditer",
    delete: "Supprimer",
    // Footer
    rights:
      "Tous droits réservés | Par Sebastian Rodelo Riwi Coder | fait avec le 💜 et beaucoup de code.",
    contact: "Contact",
    help: "Aide",
    privacy: "Confidentialité",
    // Excel modal
    importExcelTitle: "Importer des produits depuis Excel",
    importExcelInstructions:
      "Votre fichier Excel doit avoir les colonnes suivantes dans cet ordre :",
    importExcelCategories: "Codes de catégories :",
    importExcelSelect: "Sélectionner un fichier Excel (.xlsx, .xls)",
    importExcelProcess: "Traiter le fichier",
    importExcelCancel: "Annuler",
    // Password modal
    updatePasswordTitle: "Changer le mot de passe",
    currentPassword: "Mot de passe actuel",
    newPassword: "Nouveau mot de passe",
    confirmPassword: "Confirmer le nouveau mot de passe",
    saveChanges: "Enregistrer les modifications",
    // Alerts and confirmations
    alertFillAll: "Veuillez remplir tous les champs",
    alertUser8: "Le nom d'utilisateur doit comporter au moins 8 caractères",
    alertPass8: "Le mot de passe doit comporter au moins 8 caractères",
    alertPassUpper: "Le mot de passe doit comporter au moins une majuscule",
    alertUserExists: "Cet utilisateur existe déjà. Entrez le bon mot de passe.",
    alertWelcome: "Bienvenue, {user} !",
    alertWrong: "Identifiants incorrects",
    alertProductAdded: "Produit ajouté avec succès",
    alertProductUpdated: "Produit mis à jour avec succès",
    alertProductDeleted: "Produit supprimé avec succès",
    alertProductError: "Erreur lors du traitement du produit",
    alertLogout: "Déconnexion réussie",
    alertPasswordWrong: "Le mot de passe actuel est incorrect.",
    alertPassword8:
      "Le nouveau mot de passe doit comporter au moins 8 caractères.",
    alertPasswordUpper:
      "Le nouveau mot de passe doit comporter au moins une majuscule.",
    alertPasswordMatch: "Les mots de passe ne correspondent pas.",
    alertPasswordDiff:
      "Le nouveau mot de passe doit être différent de l'actuel.",
    alertPasswordUpdated: "Mot de passe mis à jour avec succès.",
    confirmDelete: 'Êtes-vous sûr de vouloir supprimer "{name}" ?',
    confirmImport: "Êtes-vous sûr de vouloir importer {count} produits ?",
    // ...
  },
  zh: {
    addProduct: "添加产品",
    productName: "产品名称",
    price: "价格",
    quantity: "数量",
    category: "类别",
    selectCategory: "选择类别",
    statsTotal: "产品总数",
    statsValue: "总价值",
    statsCategories: "类别",
    statsLowStock: "库存低",
    myProducts: "我的产品",
    importExcel: "导入Excel",
    exportExcel: "导出Excel",
    updatePassword: "更新密码",
    logout: "退出登录",
    loginTitle: "登录",
    loginUser: "用户名",
    loginPass: "密码",
    loginBtn: "登录",
    loginInfo:
      "首次使用时，只需输入用户名和密码即可创建账户。<br><strong>要求：</strong>用户名和密码至少8个字符，密码需包含至少一个大写字母。",
    // Tour
    tourStep1: '在这里填写表单并点击"添加产品"即可添加新产品。',
    tourStep2: "使用这些按钮可以从Excel导入产品或导出当前库存。",
    tourStep3: "这些卡片显示产品总数、总价值、类别和低库存等统计信息。",
    tourStep4: "这里会显示你所有已添加的产品列表。你可以编辑或删除每个产品。",
    tourStep5: "点击这里可随时更新你的密码。",
    tourStep6: "点击这里可安全退出登录。",
    tourNext: "下一步",
    tourPrev: "上一步",
    tourClose: "关闭",
    tourHelp: "如何使用？",
    // Card buttons
    edit: "编辑",
    delete: "删除",
    // Footer
    rights:
      "版权所有 | 由 Sebastian Rodelo Riwi Coder 编写 | 用💜和很多代码编写。",
    contact: "联系",
    help: "帮助",
    privacy: "隐私",
    // Excel modal
    importExcelTitle: "从Excel导入产品",
    importExcelInstructions: "你的Excel文件必须按如下顺序包含以下列：",
    importExcelCategories: "类别代码：",
    importExcelSelect: "选择Excel文件（.xlsx, .xls）",
    importExcelProcess: "处理文件",
    importExcelCancel: "取消",
    // Password modal
    updatePasswordTitle: "更新密码",
    currentPassword: "当前密码",
    newPassword: "新密码",
    confirmPassword: "确认新密码",
    saveChanges: "保存更改",
    // Alerts and confirmations
    alertFillAll: "请填写所有字段",
    alertUser8: "用户名至少8个字符",
    alertPass8: "密码至少8个字符",
    alertPassUpper: "密码需包含至少一个大写字母",
    alertUserExists: "该用户已存在。请输入正确的密码。",
    alertWelcome: "欢迎, {user}!",
    alertWrong: "凭证错误",
    alertProductAdded: "产品添加成功",
    alertProductUpdated: "产品更新成功",
    alertProductDeleted: "产品删除成功",
    alertProductError: "处理产品时出错",
    alertLogout: "成功退出登录",
    alertPasswordWrong: "当前密码不正确。",
    alertPassword8: "新密码至少8个字符。",
    alertPasswordUpper: "新密码需包含至少一个大写字母。",
    alertPasswordMatch: "两次输入的密码不一致。",
    alertPasswordDiff: "新密码必须与当前密码不同。",
    alertPasswordUpdated: "密码更新成功。",
    confirmDelete: '你确定要删除"{name}"吗？',
    confirmImport: "你确定要导入{count}个产品吗？",
    // ...
  },
};

// ===== ELEMENTOS DEL DOM =====
const elements = {
  loginModal: document.getElementById("loginModal"),
  mainContent: document.getElementById("mainContent"),
  userInfo: document.getElementById("userInfo"),
  currentUserSpan: document.getElementById("currentUser"),
  loginForm: document.getElementById("loginForm"),
  productForm: document.getElementById("productForm"),
  productsGrid: document.getElementById("productsGrid"),
  logoutBtn: document.getElementById("logoutBtn"),
  alertContainer: document.getElementById("alertContainer"),
  // Elementos de Excel
  importExcelBtn: document.getElementById("importExcelBtn"),
  exportExcelBtn: document.getElementById("exportExcelBtn"),
  importExcelModal: document.getElementById("importExcelModal"),
  excelFile: document.getElementById("excelFile"),
  fileInfo: document.getElementById("fileInfo"),
  processExcelBtn: document.getElementById("processExcelBtn"),
  cancelImportBtn: document.getElementById("cancelImportBtn"),
  stats: {
    totalProducts: document.getElementById("totalProducts"),
    totalValue: document.getElementById("totalValue"),
    totalCategories: document.getElementById("totalCategories"),
    lowStock: document.getElementById("lowStock"),
  },
  // Agregar referencias a los nuevos elementos
  updatePasswordBtn: document.getElementById("updatePasswordBtn"),
  updatePasswordModal: document.getElementById("updatePasswordModal"),
  updatePasswordForm: document.getElementById("updatePasswordForm"),
  cancelUpdatePasswordBtn: document.getElementById("cancelUpdatePasswordBtn"),
};

// Tour interactivo
const helpTourBtn = document.getElementById("helpTourBtn");
const TOUR_KEY = "srstore_tour_shown";

function getTranslation(key, params = {}) {
  const lang = localStorage.getItem(LANG_KEY) || "es";
  let text =
    translations[lang] && translations[lang][key]
      ? translations[lang][key]
      : translations["es"][key] || key;
  Object.keys(params).forEach((p) => {
    text = text.replace(`{${p}}`, params[p]);
  });
  return text;
}

const tourSteps = [
  {
    element: ".product-form",
    textKey: "tourStep1",
  },
  {
    element: ".excel-actions",
    textKey: "tourStep2",
  },
  {
    element: ".stats-grid",
    textKey: "tourStep3",
  },
  {
    element: ".products-section",
    textKey: "tourStep4",
  },
  {
    element: ".update-password-btn",
    textKey: "tourStep5",
  },
  {
    element: ".logout-btn",
    textKey: "tourStep6",
  },
];

function showTour(stepIndex = 0) {
  if (stepIndex >= tourSteps.length) {
    removeTourBubble();
    helpTourBtn.style.display = "block";
    localStorage.setItem(TOUR_KEY, "true");
    return;
  }
  const step = tourSteps[stepIndex];
  const target = document.querySelector(step.element);
  if (!target) {
    showTour(stepIndex + 1);
    return;
  }
  removeTourBubble();
  const bubble = document.createElement("div");
  bubble.className = "tour-bubble";
  bubble.innerHTML = `<div class="tour-text">${getTranslation(
    step.textKey
  )}</div><div class="tour-actions"><button class="btn btn-success next-tour-btn">${getTranslation(
    "tourNext"
  )}</button>${
    stepIndex > 0
      ? `<button class="btn btn-secondary prev-tour-btn">${getTranslation(
          "tourPrev"
        )}</button>`
      : ""
  }<button class="btn btn-danger close-tour-btn">${getTranslation(
    "tourClose"
  )}</button></div>`;
  document.body.appendChild(bubble);
  // Posicionar la burbuja
  const rect = target.getBoundingClientRect();
  bubble.style.top = `${rect.bottom + window.scrollY + 12}px`;
  bubble.style.left = `${rect.left + window.scrollX}px`;
  // Scroll al elemento si es necesario
  target.scrollIntoView({ behavior: "smooth", block: "center" });
  // Acciones
  bubble.querySelector(".next-tour-btn").onclick = () =>
    showTour(stepIndex + 1);
  if (stepIndex > 0)
    bubble.querySelector(".prev-tour-btn").onclick = () =>
      showTour(stepIndex - 1);
  bubble.querySelector(".close-tour-btn").onclick = () => {
    removeTourBubble();
    helpTourBtn.style.display = "block";
    localStorage.setItem(TOUR_KEY, "true");
  };
}
function removeTourBubble() {
  const bubble = document.querySelector(".tour-bubble");
  if (bubble) bubble.remove();
}
// Mostrar tour automáticamente la primera vez
window.addEventListener("DOMContentLoaded", () => {
  if (currentUser && !localStorage.getItem(TOUR_KEY)) {
    setTimeout(() => showTour(0), 800);
  } else {
    helpTourBtn.style.display = "block";
  }
});
// Botón flotante para relanzar el tour
helpTourBtn.addEventListener("click", () => showTour(0));

// ===== CLASE PARA MANEJO DE ALMACENAMIENTO =====
class StorageManager {
  /**
   * Obtiene datos del localStorage
   * @param {string} key - Clave del almacenamiento
   * @param {*} defaultValue - Valor por defecto si no existe
   * @returns {*} Datos almacenados o valor por defecto
   */
  static get(key, defaultValue = null) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
      console.error("Error al obtener datos del almacenamiento:", error);
      return defaultValue;
    }
  }

  /**
   * Guarda datos en localStorage
   * @param {string} key - Clave del almacenamiento
   * @param {*} value - Valor a almacenar
   */
  static set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error al guardar datos en almacenamiento:", error);
    }
  }

  /**
   * Elimina datos del localStorage
   * @param {string} key - Clave a eliminar
   */
  static remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error al eliminar datos del almacenamiento:", error);
    }
  }
}

// ===== CLASE PARA MANEJO DE USUARIOS =====
class UserManager {
  /**
   * Autentica un usuario
   * @param {string} username - Nombre de usuario
   * @param {string} password - Contraseña
   * @returns {boolean} True si la autenticación es exitosa
   */
  static authenticate(username, password) {
    const users = StorageManager.get(CONFIG.STORAGE_KEYS.USERS, {});

    // Si el usuario no existe, lo creamos automáticamente
    if (!users[username]) {
      users[username] = { password, createdAt: new Date().toISOString() };
      StorageManager.set(CONFIG.STORAGE_KEYS.USERS, users);
      return true;
    }

    // Verificamos la contraseña
    return users[username].password === password;
  }

  /**
   * Obtiene el usuario actual
   * @returns {string|null} Nombre del usuario actual
   */
  static getCurrentUser() {
    return StorageManager.get(CONFIG.STORAGE_KEYS.CURRENT_USER);
  }

  /**
   * Establece el usuario actual
   * @param {string} username - Nombre de usuario
   */
  static setCurrentUser(username) {
    StorageManager.set(CONFIG.STORAGE_KEYS.CURRENT_USER, username);
  }

  /**
   * Cierra la sesión del usuario actual
   */
  static logout() {
    StorageManager.remove(CONFIG.STORAGE_KEYS.CURRENT_USER);
  }
}

// ===== CLASE PARA MANEJO DE PRODUCTOS =====
class ProductManager {
  /**
   * Obtiene todos los productos del usuario actual
   * @returns {Array} Array de productos
   */
  static getUserProducts() {
    if (!currentUser) return [];

    const allProducts = StorageManager.get(CONFIG.STORAGE_KEYS.PRODUCTS, {});
    return allProducts[currentUser] || [];
  }

  /**
   * Guarda los productos del usuario actual
   * @param {Array} userProducts - Array de productos del usuario
   */
  static saveUserProducts(userProducts) {
    if (!currentUser) return;

    const allProducts = StorageManager.get(CONFIG.STORAGE_KEYS.PRODUCTS, {});
    allProducts[currentUser] = userProducts;
    StorageManager.set(CONFIG.STORAGE_KEYS.PRODUCTS, allProducts);
  }

  /**
   * Agrega un nuevo producto
   * @param {Object} product - Objeto del producto
   */
  static addProduct(product) {
    const userProducts = this.getUserProducts();
    const newProduct = {
      id: Date.now().toString(),
      ...product,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    userProducts.push(newProduct);
    this.saveUserProducts(userProducts);
    return newProduct;
  }

  /**
   * Actualiza un producto existente
   * @param {string} productId - ID del producto
   * @param {Object} updatedData - Datos actualizados
   */
  static updateProduct(productId, updatedData) {
    const userProducts = this.getUserProducts();
    const productIndex = userProducts.findIndex((p) => p.id === productId);

    if (productIndex !== -1) {
      userProducts[productIndex] = {
        ...userProducts[productIndex],
        ...updatedData,
        updatedAt: new Date().toISOString(),
      };
      this.saveUserProducts(userProducts);
      return userProducts[productIndex];
    }

    return null;
  }

  /**
   * Elimina un producto
   * @param {string} productId - ID del producto a eliminar
   */
  static deleteProduct(productId) {
    const userProducts = this.getUserProducts();
    const filteredProducts = userProducts.filter((p) => p.id !== productId);
    this.saveUserProducts(filteredProducts);
  }
}

// ===== CLASE PARA MANEJO DE UI =====
class UIManager {
  /**
   * Muestra una alerta
   * @param {string} message - Mensaje a mostrar
   * @param {string} type - Tipo de alerta (success, danger, warning)
   */
  static showAlert(message, type = "success") {
    const alertDiv = document.createElement("div");
    alertDiv.className = `alert alert-${type} show`;
    alertDiv.id = `alert-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    const icon =
      type === "success" ? "fas fa-check-circle" : "fas fa-exclamation-circle";
    alertDiv.innerHTML = `
                    <i class="${icon}"></i>
                    <span>${message}</span>
                `;

    // Agregar al body en lugar del contenedor para que aparezca como modal
    document.body.appendChild(alertDiv);

    // Agregar a la lista de alertas activas
    activeAlerts.push(alertDiv);

    // Actualizar posiciones de todas las alertas
    this.updateAlertPositions();

    // Remover la alerta después de 3 segundos
    setTimeout(() => {
      this.removeAlert(alertDiv);
    }, 3000);
  }

  /**
   * Actualiza las posiciones de todas las alertas activas
   */
  static updateAlertPositions() {
    activeAlerts.forEach((alert, index) => {
      alert.style.top = `${20 + index * 80}px`;
    });
  }

  /**
   * Remueve una alerta específica
   * @param {HTMLElement} alertElement - Elemento de alerta a remover
   */
  static removeAlert(alertElement) {
    if (alertElement.parentNode) {
      alertElement.remove();
    }

    // Remover de la lista de alertas activas
    const index = activeAlerts.indexOf(alertElement);
    if (index > -1) {
      activeAlerts.splice(index, 1);
    }

    // Actualizar posiciones de las alertas restantes
    this.updateAlertPositions();
  }

  /**
   * Muestra una confirmación personalizada
   * @param {string} message - Mensaje de confirmación
   * @param {Function} onConfirm - Función a ejecutar si se confirma
   * @param {Function} onCancel - Función a ejecutar si se cancela
   */
  static showConfirm(message, onConfirm, onCancel = null) {
    const confirmDiv = document.createElement("div");
    confirmDiv.className = "alert alert-warning show";
    confirmDiv.id = `confirm-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    confirmDiv.style.display = "flex";
    confirmDiv.style.justifyContent = "space-between";
    confirmDiv.style.alignItems = "center";
    confirmDiv.style.gap = "10px";

    confirmDiv.innerHTML = `
      <div style="display: flex; align-items: center; gap: 10px;">
        <i class="fas fa-question-circle"></i>
        <span>${message}</span>
      </div>
      <div style="display: flex; gap: 10px;">
        <button class="btn btn-sm btn-success" id="confirmYes">
          <i class="fas fa-check"></i> Sí
        </button>
        <button class="btn btn-sm btn-danger" id="confirmNo">
          <i class="fas fa-times"></i> No
        </button>
      </div>
    `;

    // Agregar al body en lugar del contenedor para que aparezca como modal
    document.body.appendChild(confirmDiv);

    // Agregar a la lista de alertas activas
    activeAlerts.push(confirmDiv);

    // Actualizar posiciones de todas las alertas
    this.updateAlertPositions();

    // Event listeners para los botones
    const yesBtn = confirmDiv.querySelector("#confirmYes");
    const noBtn = confirmDiv.querySelector("#confirmNo");

    yesBtn.addEventListener("click", () => {
      this.removeAlert(confirmDiv);
      if (onConfirm) onConfirm();
    });

    noBtn.addEventListener("click", () => {
      this.removeAlert(confirmDiv);
      if (onCancel) onCancel();
    });

    // Remover automáticamente después de 10 segundos
    setTimeout(() => {
      this.removeAlert(confirmDiv);
      if (onCancel) onCancel();
    }, 10000);
  }

  /**
   * Actualiza las estadísticas mostradas
   */
  static updateStats() {
    const userProducts = ProductManager.getUserProducts();

    // Usar Object.values() para obtener todos los productos
    const productValues = Object.values(userProducts);

    // Calcular estadísticas usando métodos de array
    const totalProducts = productValues.length;
    const totalValue = productValues.reduce((sum, product) => {
      return sum + parseFloat(product.price) * parseInt(product.quantity);
    }, 0);

    // Usar Set para contar categorías únicas
    const categories = new Set();
    productValues.forEach((product) => {
      categories.add(product.category);
    });

    const lowStockCount = productValues.filter((product) => {
      return parseInt(product.quantity) < 5;
    }).length;

    // Actualizar elementos del DOM
    elements.stats.totalProducts.textContent = totalProducts;
    elements.stats.totalValue.textContent = `$${totalValue.toFixed(2)}`;
    elements.stats.totalCategories.textContent = categories.size;
    elements.stats.lowStock.textContent = lowStockCount;
  }

  /**
   * Renderiza la lista de productos
   */
  static renderProducts() {
    const userProducts = ProductManager.getUserProducts();
    elements.productsGrid.innerHTML = "";

    if (userProducts.length === 0) {
      elements.productsGrid.innerHTML = `
                        <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                            <i class="fas fa-box-open" style="font-size: 3rem; color: #ccc; margin-bottom: 20px;"></i>
                            <h3 style="color: #666;">No hay productos agregados</h3>
                            <p style="color: #999;">Agrega tu primer producto usando el formulario anterior</p>
                        </div>
                    `;
      return;
    }

    // Usar for...of para iterar sobre los productos
    for (const product of userProducts) {
      const productCard = this.createProductCard(product);
      elements.productsGrid.appendChild(productCard);
    }

    this.updateStats();
    this.checkProductsScroll();
  }

  /**
   * Verifica si hay scroll en la sección de productos y muestra el indicador
   */
  static checkProductsScroll() {
    const productsSection = document.querySelector(".products-section");
    const productsGrid = elements.productsGrid;

    if (productsSection && productsGrid) {
      // Verificar si hay scroll después de un pequeño delay para que se renderice
      setTimeout(() => {
        const hasScroll = productsGrid.scrollHeight > productsGrid.clientHeight;
        productsSection.classList.toggle("has-scroll", hasScroll);

        // Agregar event listener para detectar cambios en el scroll
        productsGrid.addEventListener("scroll", () => {
          const isAtBottom =
            productsGrid.scrollTop + productsGrid.clientHeight >=
            productsGrid.scrollHeight - 10;
          productsSection.classList.toggle("has-scroll", !isAtBottom);
        });
      }, 100);
    }
  }

  /**
   * Crea una tarjeta de producto
   * @param {Object} product - Datos del producto
   * @returns {HTMLElement} Elemento DOM de la tarjeta
   */
  static createProductCard(product) {
    const card = document.createElement("div");
    card.className = "product-card";

    const category = CONFIG.CATEGORIES[product.category];
    const isLowStock = parseInt(product.quantity) < 5;

    card.innerHTML = `
                    <div class="product-header">
                        <div>
                            <div class="product-name">
                                <i class="${category.icon}"></i>
                                ${product.name}
                            </div>
                            ${
                              isLowStock
                                ? '<span style="color: var(--danger-color); font-size: 0.8rem;"><i class="fas fa-exclamation-triangle"></i> Stock Bajo</span>'
                                : ""
                            }
                        </div>
                        <div class="product-category">${category.name}</div>
                    </div>
                    <div class="product-details">
                        <div class="product-price">${parseFloat(
                          product.price
                        ).toFixed(2)}</div>
                        <div class="product-quantity">
                            <i class="fas fa-cubes"></i>
                            ${getTranslation("quantity")}: ${product.quantity}
                        </div>
                    </div>
                    <div class="product-actions">
                        <button class="btn btn-sm" onclick="editProduct('${
                          product.id
                        }')">
                            <i class="fas fa-edit"></i>
                            ${getTranslation("edit")}
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="deleteProduct('${
                          product.id
                        }')">
                            <i class="fas fa-trash"></i>
                            ${getTranslation("delete")}
                        </button>
                    </div>
                `;

    return card;
  }

  /**
   * Limpia el formulario de productos
   */
  static clearProductForm() {
    elements.productForm.reset();
    editingProductId = null;

    const submitBtn = elements.productForm.querySelector(
      'button[type="submit"]'
    );
    submitBtn.innerHTML = '<i class="fas fa-plus"></i> Agregar Producto';
    submitBtn.className = "btn btn-success";
  }

  /**
   * Llena el formulario con datos de un producto para edición
   * @param {Object} product - Datos del producto
   */
  static fillProductForm(product) {
    document.getElementById("productName").value = product.name;
    document.getElementById("productPrice").value = product.price;
    document.getElementById("productQuantity").value = product.quantity;
    document.getElementById("productCategory").value = product.category;

    editingProductId = product.id;

    const submitBtn = elements.productForm.querySelector(
      'button[type="submit"]'
    );
    submitBtn.innerHTML = '<i class="fas fa-save"></i> Actualizar Producto';
    submitBtn.className = "btn btn-success";

    // Scroll hacia el formulario
    elements.productForm.scrollIntoView({ behavior: "smooth" });
  }

  /**
   * Muestra el modal de importación Excel
   */
  static showImportExcelModal() {
    elements.importExcelModal.style.display = "block";
    this.clearExcelForm();
  }

  /**
   * Oculta el modal de importación Excel
   */
  static hideImportExcelModal() {
    elements.importExcelModal.style.display = "none";
    this.clearExcelForm();
  }

  /**
   * Limpia el formulario de Excel
   */
  static clearExcelForm() {
    elements.excelFile.value = "";
    elements.fileInfo.innerHTML = "";
    elements.fileInfo.classList.add("hidden");
    elements.processExcelBtn.disabled = true;
    selectedExcelFile = null;
  }

  /**
   * Muestra información del archivo seleccionado
   * @param {File} file - Archivo seleccionado
   */
  static showFileInfo(file) {
    const fileInfo = elements.fileInfo;
    const isValidFile =
      file && (file.name.endsWith(".xlsx") || file.name.endsWith(".xls"));

    if (isValidFile) {
      fileInfo.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <strong>${file.name}</strong> (${(file.size / 1024).toFixed(1)} KB)
      `;
      fileInfo.className = "file-info";
      fileInfo.classList.remove("hidden");
      elements.processExcelBtn.disabled = false;
    } else {
      fileInfo.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        Por favor selecciona un archivo Excel válido (.xlsx o .xls)
      `;
      fileInfo.className = "file-info error";
      fileInfo.classList.remove("hidden");
      elements.processExcelBtn.disabled = true;
    }
  }

  /**
   * Procesa el archivo Excel y importa los productos
   * @param {File} file - Archivo Excel a procesar
   */
  static async processExcelFile(file) {
    try {
      const data = await this.readExcelFile(file);
      const products = this.parseExcelData(data);

      if (products.length === 0) {
        UIManager.showAlert(
          "No se encontraron productos válidos en el archivo",
          "danger"
        );
        return;
      }

      // Confirmar importación
      UIManager.showConfirm(
        `¿Estás seguro de que quieres importar ${products.length} productos?`,
        () => {
          this.importProducts(products);
        }
      );
    } catch (error) {
      console.error("Error al procesar archivo Excel:", error);
      UIManager.showAlert("Error al procesar el archivo Excel", "danger");
    }
  }

  /**
   * Lee el archivo Excel usando SheetJS
   * @param {File} file - Archivo Excel
   * @returns {Array} Datos del archivo
   */
  static readExcelFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = function (e) {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          resolve(jsonData);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  }

  /**
   * Parsea los datos del Excel a productos
   * @param {Array} data - Datos del Excel
   * @returns {Array} Array de productos
   */
  static parseExcelData(data) {
    const products = [];

    // Saltar la primera fila (encabezados)
    for (let i = 1; i < data.length; i++) {
      const row = data[i];

      // Verificar que la fila tenga al menos 4 columnas
      if (row.length >= 4) {
        const [name, price, quantity, category] = row;

        // Validar datos
        if (name && price && quantity && category) {
          const product = {
            name: String(name).trim(),
            price: parseFloat(price).toFixed(2),
            quantity: parseInt(quantity),
            category: String(category).trim(),
          };

          // Validar que la categoría sea válida
          if (CONFIG.CATEGORIES[product.category]) {
            products.push(product);
          }
        }
      }
    }

    return products;
  }

  /**
   * Importa los productos al sistema
   * @param {Array} products - Array de productos a importar
   */
  static importProducts(products) {
    try {
      let importedCount = 0;

      for (const product of products) {
        ProductManager.addProduct(product);
        importedCount++;
      }

      UIManager.showAlert(
        `${importedCount} productos importados exitosamente`,
        "success"
      );
      UIManager.renderProducts();
      UIManager.hideImportExcelModal();
    } catch (error) {
      console.error("Error al importar productos:", error);
      UIManager.showAlert("Error al importar los productos", "danger");
    }
  }

  /**
   * Exporta los productos actuales a Excel
   */
  static exportToExcel() {
    try {
      const userProducts = ProductManager.getUserProducts();
      if (userProducts.length === 0) {
        UIManager.showAlert(getTranslation("alertProductError"), "warning");
        return;
      }
      const lang = localStorage.getItem(LANG_KEY) || "es";
      // Preparar datos para Excel
      const excelData = [
        [
          getTranslation("productName"),
          getTranslation("price"),
          getTranslation("quantity"),
          getTranslation("category"),
          "Fecha Creación",
        ],
      ];
      userProducts.forEach((product) => {
        excelData.push([
          product.name,
          product.price,
          product.quantity,
          categoryNames[lang][product.category] || product.category,
          new Date(product.createdAt).toLocaleDateString(),
        ]);
      });
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.aoa_to_sheet(excelData);
      XLSX.utils.book_append_sheet(workbook, worksheet, "Productos");
      const fileName = `productos_${currentUser}_${
        new Date().toISOString().split("T")[0]
      }.xlsx`;
      XLSX.writeFile(workbook, fileName);
      UIManager.showAlert(getTranslation("alertProductAdded"), "success");
    } catch (error) {
      console.error("Error al exportar productos:", error);
      UIManager.showAlert(getTranslation("alertProductError"), "danger");
    }
  }
}

// ===== FUNCIONES AUXILIARES PARA DEMOSTRAR MÉTODOS =====

/**
 * Busca productos por nombre usando filter y includes
 * @param {string} searchTerm - Término de búsqueda
 * @returns {Array} Productos encontrados
 */
function searchProducts(searchTerm) {
  const userProducts = ProductManager.getUserProducts();

  return userProducts.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
}

/**
 * Ordena productos por diferentes criterios
 * @param {string} sortBy - Criterio de ordenamiento (name, price, quantity, category)
 * @param {string} order - Orden (asc, desc)
 * @returns {Array} Productos ordenados
 */
function sortProducts(sortBy = "name", order = "asc") {
  const userProducts = [...ProductManager.getUserProducts()]; // Crear copia para no mutar el original

  return userProducts.sort((a, b) => {
    let valueA = a[sortBy];
    let valueB = b[sortBy];

    // Convertir a números si es necesario
    if (sortBy === "price" || sortBy === "quantity") {
      valueA = parseFloat(valueA);
      valueB = parseFloat(valueB);
    }

    // Convertir a minúsculas para strings
    if (typeof valueA === "string") {
      valueA = valueA.toLowerCase();
      valueB = valueB.toLowerCase();
    }

    if (order === "desc") {
      return valueB > valueA ? 1 : -1;
    } else {
      return valueA > valueB ? 1 : -1;
    }
  });
}

/**
 * Calcula estadísticas avanzadas de los productos
 * @returns {Object} Objeto con estadísticas detalladas
 */
function calculateAdvancedStats() {
  const userProducts = ProductManager.getUserProducts();

  if (userProducts.length === 0) {
    return { message: "No hay productos para analizar" };
  }

  // Usar map() para extraer valores específicos
  const prices = userProducts.map((product) => parseFloat(product.price));
  const quantities = userProducts.map((product) => parseInt(product.quantity));
  const values = userProducts.map(
    (product) => parseFloat(product.price) * parseInt(product.quantity)
  );

  // Calcular estadísticas usando reduce()
  const stats = {
    products: {
      total: userProducts.length,
      avgPrice: prices.reduce((sum, price) => sum + price, 0) / prices.length,
      maxPrice: Math.max(...prices),
      minPrice: Math.min(...prices),
      totalInventoryValue: values.reduce((sum, value) => sum + value, 0),
    },
    inventory: {
      totalItems: quantities.reduce((sum, qty) => sum + qty, 0),
      avgQuantity:
        quantities.reduce((sum, qty) => sum + qty, 0) / quantities.length,
      maxQuantity: Math.max(...quantities),
      minQuantity: Math.min(...quantities),
    },
  };

  return stats;
}

// ===== INICIALIZACIÓN =====

// Event listener para cuando el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
  console.log("SR Store - Sistema de Tienda iniciado");

  // Inicializar la aplicación
  initApp();

  // Mostrar información de categorías en consola (demostración de for...in)
  showCategoryInfo();

  // Configurar interval para actualizar estadísticas cada 30 segundos
  setInterval(() => {
    if (currentUser) {
      UIManager.updateStats();
    }
  }, 30000);

  // Mensaje de bienvenida en consola
  console.log(`
                ╔══════════════════════════════════════╗
                ║              SR STORE                ║
                ║         Sistema de Tienda            ║
                ║                                      ║
                ║  Funcionalidades implementadas:      ║
                ║  • Login de usuarios                 ║
                ║  • Gestión de productos              ║
                ║  • Almacenamiento local              ║
                ║  • Estadísticas en tiempo real       ║
                ║  • Responsive design                 ║
                ║                                      ║
                ║  Métodos de objeto utilizados:       ║
                ║  • Object.keys()                     ║
                ║  • Object.values()                   ║
                ║  • Object.entries()                  ║
                ║  • for...in, for...of                ║
                ║  • forEach(), map(), filter()        ║
                ║  • reduce()                          ║
                ╚══════════════════════════════════════╝
            `);
});

// Función global para generar reporte (accesible desde consola)
window.generateReport = generateCategoryReport;
window.searchProducts = searchProducts;
window.sortProducts = sortProducts;
window.calculateStats = calculateAdvancedStats;

// Manejar errores globales
window.addEventListener("error", function (e) {
  console.error("Error global capturado:", e.error);
  UIManager.showAlert("Ha ocurrido un error inesperado", "danger");
});

// Manejar errores de promesas no capturadas
window.addEventListener("unhandledrejection", function (e) {
  console.error("Promesa rechazada no manejada:", e.reason);
  UIManager.showAlert("Error de conexión o procesamiento", "danger");
});

/**
 * Inicializa la aplicación
 */
function initApp() {
  // Verificar si hay un usuario logueado
  currentUser = UserManager.getCurrentUser();

  if (currentUser) {
    showMainContent();
  } else {
    showLoginModal();
  }

  // Configurar event listeners
  setupEventListeners();
}

/**
 * Configura todos los event listeners
 */
function setupEventListeners() {
  // Event listener para el formulario de login
  elements.loginForm.addEventListener("submit", handleLogin);

  // Event listener para el formulario de productos
  elements.productForm.addEventListener("submit", handleProductSubmit);

  // Event listener para el botón de logout
  elements.logoutBtn.addEventListener("click", handleLogout);

  // Event listeners para Excel
  elements.importExcelBtn.addEventListener("click", () => {
    UIManager.showImportExcelModal();
  });

  elements.exportExcelBtn.addEventListener("click", () => {
    UIManager.exportToExcel();
  });

  elements.excelFile.addEventListener("change", (e) => {
    const file = e.target.files[0];
    selectedExcelFile = file;
    UIManager.showFileInfo(file);
  });

  elements.processExcelBtn.addEventListener("click", () => {
    if (selectedExcelFile) {
      UIManager.processExcelFile(selectedExcelFile);
    }
  });

  elements.cancelImportBtn.addEventListener("click", () => {
    UIManager.hideImportExcelModal();
  });

  // Event listener para cerrar modal con Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (elements.loginModal.style.display === "block") {
        // No permitir cerrar el modal de login con Escape si no hay usuario logueado
        if (currentUser) {
          hideLoginModal();
        }
      } else if (elements.importExcelModal.style.display === "block") {
        UIManager.hideImportExcelModal();
      }
    }
  });

  // Mostrar modal
  elements.updatePasswordBtn.addEventListener("click", () => {
    elements.updatePasswordModal.style.display = "block";
    elements.updatePasswordForm.reset();
  });

  // Ocultar modal
  elements.cancelUpdatePasswordBtn.addEventListener("click", () => {
    elements.updatePasswordModal.style.display = "none";
  });

  // Validar y actualizar contraseña
  elements.updatePasswordForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const current = elements.updatePasswordForm.currentPassword.value;
    const nueva = elements.updatePasswordForm.newPassword.value;
    const confirm = elements.updatePasswordForm.confirmPassword.value;

    const users = StorageManager.get(CONFIG.STORAGE_KEYS.USERS, {});
    if (!users[currentUser] || users[currentUser].password !== current) {
      UIManager.showAlert(getTranslation("alertPasswordWrong"), "danger");
      return;
    }
    if (nueva.length < 8) {
      UIManager.showAlert(
        getTranslation("alertPassword8", { count: 8 }),
        "danger"
      );
      return;
    }
    if (!/[A-Z]/.test(nueva)) {
      UIManager.showAlert(getTranslation("alertPasswordUpper"), "danger");
      return;
    }
    if (nueva !== confirm) {
      UIManager.showAlert(getTranslation("alertPasswordMatch"), "danger");
      return;
    }
    if (nueva === current) {
      UIManager.showAlert(getTranslation("alertPasswordDiff"), "danger");
      return;
    }
    // Actualizar contraseña
    users[currentUser].password = nueva;
    StorageManager.set(CONFIG.STORAGE_KEYS.USERS, users);
    elements.updatePasswordModal.style.display = "none";
    UIManager.showAlert(getTranslation("alertPasswordUpdated"), "success");
  });
}

/**
 * Maneja el evento de login
 * @param {Event} e - Evento del formulario
 */
function handleLogin(e) {
  e.preventDefault();

  const formData = new FormData(elements.loginForm);
  const username = formData.get("username").trim();
  const password = formData.get("password").trim();

  // Validaciones básicas
  if (!username || !password) {
    UIManager.showAlert(getTranslation("alertFillAll"), "danger");
    return;
  }

  if (username.length < 8) {
    UIManager.showAlert(getTranslation("alertUser8"), "danger");
    return;
  }

  if (password.length < 8) {
    UIManager.showAlert(getTranslation("alertPass8"), "danger");
    return;
  }

  if (!/[A-Z]/.test(password)) {
    UIManager.showAlert(getTranslation("alertPassUpper"), "danger");
    return;
  }

  // Verificar si el usuario ya existe
  const users = StorageManager.get(CONFIG.STORAGE_KEYS.USERS, {});
  if (users[username]) {
    if (users[username].password !== password) {
      UIManager.showAlert(getTranslation("alertWrong"), "danger");
      return;
    }
  }

  // Intentar autenticar o crear usuario
  if (UserManager.authenticate(username, password)) {
    currentUser = username;
    UserManager.setCurrentUser(username);
    showMainContent();
    UIManager.showAlert(
      getTranslation("alertWelcome", { user: username }),
      "success"
    );
  } else {
    UIManager.showAlert(getTranslation("alertWrong"), "danger");
  }
}

/**
 * Maneja el envío del formulario de productos
 * @param {Event} e - Evento del formulario
 */
function handleProductSubmit(e) {
  e.preventDefault();

  const formData = new FormData(elements.productForm);

  // Crear objeto del producto usando Object.fromEntries()
  const productData = Object.fromEntries(formData.entries());

  // Validaciones
  if (!validateProductData(productData)) {
    return;
  }

  // Convertir tipos de datos
  productData.productPrice = parseFloat(productData.productPrice).toFixed(2);
  productData.productQuantity = parseInt(productData.productQuantity);

  try {
    if (editingProductId) {
      // Actualizar producto existente
      const updatedProduct = ProductManager.updateProduct(editingProductId, {
        name: productData.productName,
        price: productData.productPrice,
        quantity: productData.productQuantity,
        category: productData.productCategory,
      });

      if (updatedProduct) {
        UIManager.showAlert(getTranslation("alertProductUpdated"), "success");
      } else {
        UIManager.showAlert(getTranslation("alertProductError"), "danger");
      }
    } else {
      // Crear nuevo producto
      ProductManager.addProduct({
        name: productData.productName,
        price: productData.productPrice,
        quantity: productData.productQuantity,
        category: productData.productCategory,
      });

      UIManager.showAlert(getTranslation("alertProductAdded"), "success");
    }

    // Limpiar formulario y actualizar vista
    UIManager.clearProductForm();
    UIManager.renderProducts();
  } catch (error) {
    console.error("Error al procesar producto:", error);
    UIManager.showAlert(getTranslation("alertProductError"), "danger");
  }
}

/**
 * Valida los datos del producto
 * @param {Object} data - Datos del producto
 * @returns {boolean} True si los datos son válidos
 */
function validateProductData(data) {
  // Usar Object.keys() para verificar campos requeridos
  const requiredFields = [
    "productName",
    "productPrice",
    "productQuantity",
    "productCategory",
  ];

  for (const field of requiredFields) {
    if (!data[field] || data[field].toString().trim() === "") {
      UIManager.showAlert(getTranslation("alertFillAll"), "danger");
      return false;
    }
  }

  // Validar precio
  const price = parseFloat(data.productPrice);
  if (isNaN(price) || price < 0) {
    UIManager.showAlert(getTranslation("alertFillAll"), "danger");
    return false;
  }

  // Validar cantidad
  const quantity = parseInt(data.productQuantity);
  if (isNaN(quantity) || quantity < 0) {
    UIManager.showAlert(getTranslation("alertFillAll"), "danger");
    return false;
  }

  // Validar nombre del producto
  if (data.productName.trim().length < 2) {
    UIManager.showAlert(getTranslation("alertFillAll"), "danger");
    return false;
  }

  return true;
}

/**
 * Maneja el logout
 */
function handleLogout() {
  UIManager.showConfirm(
    getTranslation("confirmDelete", { name: currentUser }),
    () => {
      UserManager.logout();
      currentUser = null;
      products = [];
      editingProductId = null;

      hideMainContent();
      showLoginModal();
      UIManager.showAlert(getTranslation("alertLogout"), "success");
    }
  );
}

/**
 * Edita un producto
 * @param {string} productId - ID del producto a editar
 */
function editProduct(productId) {
  const userProducts = ProductManager.getUserProducts();
  const product = userProducts.find((p) => p.id === productId);

  if (product) {
    UIManager.fillProductForm(product);
  } else {
    UIManager.showAlert(getTranslation("alertProductError"), "danger");
  }
}

/**
 * Elimina un producto
 * @param {string} productId - ID del producto a eliminar
 */
function deleteProduct(productId) {
  const userProducts = ProductManager.getUserProducts();
  const product = userProducts.find((p) => p.id === productId);

  if (!product) {
    UIManager.showAlert(getTranslation("alertProductError"), "danger");
    return;
  }

  UIManager.showConfirm(
    getTranslation("confirmDelete", { name: product.name }),
    () => {
      try {
        ProductManager.deleteProduct(productId);
        UIManager.renderProducts();
        UIManager.showAlert(getTranslation("alertProductDeleted"), "success");

        // Si estábamos editando este producto, limpiar el formulario
        if (editingProductId === productId) {
          UIManager.clearProductForm();
        }
      } catch (error) {
        console.error("Error al eliminar producto:", error);
        UIManager.showAlert(getTranslation("alertProductError"), "danger");
      }
    }
  );
}

/**
 * Muestra el modal de login
 */
function showLoginModal() {
  elements.loginModal.style.display = "block";
  elements.loginForm.reset();
  // Enfocar el campo de usuario
  setTimeout(() => {
    document.getElementById("username").focus();
  }, 100);
}

/**
 * Oculta el modal de login
 */
function hideLoginModal() {
  elements.loginModal.style.display = "none";
}

/**
 * Muestra el contenido principal
 */
function showMainContent() {
  hideLoginModal();
  elements.mainContent.classList.remove("hidden");
  elements.userInfo.classList.remove("hidden");
  elements.currentUserSpan.textContent = currentUser;

  // Cargar y mostrar productos
  loadUserData();
}

/**
 * Oculta el contenido principal
 */
function hideMainContent() {
  elements.mainContent.classList.add("hidden");
  elements.userInfo.classList.add("hidden");
  UIManager.clearProductForm();
}

/**
 * Carga los datos del usuario actual
 */
function loadUserData() {
  try {
    products = ProductManager.getUserProducts();
    UIManager.renderProducts();

    // Mostrar mensaje de bienvenida si es la primera vez
    if (products.length === 0) {
      setTimeout(() => {
        UIManager.showAlert(
          getTranslation("alertWelcome", { user: currentUser }),
          "success"
        );
      }, 500);
    }
  } catch (error) {
    console.error("Error al cargar datos del usuario:", error);
    UIManager.showAlert(getTranslation("alertProductError"), "danger");
  }
}

/**
 * Función para demostrar el uso de for...in
 * Muestra información detallada de las categorías
 */
function showCategoryInfo() {
  console.log("=== Información de Categorías ===");

  // Usar for...in para iterar sobre las propiedades del objeto CONFIG.CATEGORIES
  for (const categoryKey in CONFIG.CATEGORIES) {
    if (CONFIG.CATEGORIES.hasOwnProperty(categoryKey)) {
      const category = CONFIG.CATEGORIES[categoryKey];
      console.log(`Categoría: ${categoryKey}`);
      console.log(`  Nombre: ${category.name}`);
      console.log(`  Icono: ${category.icon}`);
      console.log("---");
    }
  }
}

/**
 * Función para demostrar el uso de Object.entries()
 * Genera un reporte de productos por categoría
 */
function generateCategoryReport() {
  const userProducts = ProductManager.getUserProducts();
  const categoryStats = {};

  // Inicializar estadísticas por categoría
  // Usar Object.entries() para obtener pares clave-valor
  for (const [key, value] of Object.entries(CONFIG.CATEGORIES)) {
    categoryStats[key] = {
      name: value.name,
      count: 0,
      totalValue: 0,
      products: [],
    };
  }

  // Calcular estadísticas usando forEach()
  userProducts.forEach((product) => {
    const category = product.category;
    if (categoryStats[category]) {
      categoryStats[category].count++;
      categoryStats[category].totalValue +=
        parseFloat(product.price) * parseInt(product.quantity);
      categoryStats[category].products.push(product.name);
    }
  });

  console.log("=== Reporte por Categorías ===");

  // Usar Object.values() para iterar sobre los valores
  Object.values(categoryStats).forEach((stat) => {
    if (stat.count > 0) {
      console.log(`${stat.name}:`);
      console.log(`  Productos: ${stat.count}`);
      console.log(`  Valor Total: ${stat.totalValue.toFixed(2)}`);
      console.log(`  Lista: ${stat.products.join(", ")}`);
      console.log("---");
    }
  });

  return categoryStats;
}

const darkModeBtn = document.getElementById("darkModeBtn");
const DARK_KEY = "srstore_dark_mode";

function setDarkMode(enabled) {
  if (enabled) {
    document.body.classList.add("dark-mode");
    darkModeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    localStorage.setItem(DARK_KEY, "true");
  } else {
    document.body.classList.remove("dark-mode");
    darkModeBtn.innerHTML = '<i class="fas fa-moon"></i>';
    localStorage.setItem(DARK_KEY, "false");
  }
}

darkModeBtn.addEventListener("click", () => {
  setDarkMode(!document.body.classList.contains("dark-mode"));
});

// Al cargar la página, aplicar preferencia guardada
window.addEventListener("DOMContentLoaded", () => {
  setDarkMode(localStorage.getItem(DARK_KEY) === "true");
});

function setLang(lang) {
  localStorage.setItem(LANG_KEY, lang);
  document.documentElement.setAttribute("lang", lang);
  updateTexts(lang);
  updateCategoryOptions(lang);
}

function updateTexts(lang) {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        el.placeholder = translations[lang][key];
      } else {
        el.innerHTML = translations[lang][key];
      }
    }
  });
}

const langSelector = document.getElementById("langSelector");
langSelector.addEventListener("change", (e) => {
  setLang(e.target.value);
  if (typeof UIManager !== "undefined" && UIManager.renderProducts) {
    UIManager.renderProducts();
  }
});

const langSelectorLogin = document.getElementById("langSelectorLogin");
if (langSelectorLogin) {
  langSelectorLogin.addEventListener("change", (e) => {
    setLang(e.target.value);
    langSelector.value = e.target.value;
    langSelectorLogin.value = e.target.value;
    if (typeof UIManager !== "undefined" && UIManager.renderProducts) {
      UIManager.renderProducts();
    }
  });
}

// Al cambiar el idioma principal, sincronizar el del login
langSelector.addEventListener("change", (e) => {
  setLang(e.target.value);
  if (langSelectorLogin) langSelectorLogin.value = e.target.value;
  if (typeof UIManager !== "undefined" && UIManager.renderProducts) {
    UIManager.renderProducts();
  }
});

// Al cargar la página, sincronizar ambos selectores
window.addEventListener("DOMContentLoaded", () => {
  const lang = localStorage.getItem(LANG_KEY) || "es";
  langSelector.value = lang;
  if (langSelectorLogin) langSelectorLogin.value = lang;
  setLang(lang);
});

// Traducción de categorías
const categoryNames = {
  es: {
    electronica: "Electrónica",
    ropa: "Ropa",
    hogar: "Hogar",
    deportes: "Deportes",
    libros: "Libros",
    juguetes: "Juguetes",
    belleza: "Belleza",
    automovil: "Automóvil",
  },
  en: {
    electronica: "Electronics",
    ropa: "Clothing",
    hogar: "Home",
    deportes: "Sports",
    libros: "Books",
    juguetes: "Toys",
    belleza: "Beauty",
    automovil: "Automobile",
  },
  fr: {
    electronica: "Électronique",
    ropa: "Vêtements",
    hogar: "Maison",
    deportes: "Sports",
    libros: "Livres",
    juguetes: "Jouets",
    belleza: "Beauté",
    automovil: "Automobile",
  },
  zh: {
    electronica: "电子产品",
    ropa: "服装",
    hogar: "家居",
    deportes: "运动",
    libros: "书籍",
    juguetes: "玩具",
    belleza: "美妆",
    automovil: "汽车",
  },
};

function updateCategoryOptions(lang) {
  const select = document.getElementById("productCategory");
  if (!select) return;
  const options = select.querySelectorAll("option");
  // Primera opción es el placeholder
  options[0].textContent = translations[lang].selectCategory;
  // Las demás son las categorías
  const keys = Object.keys(categoryNames[lang]);
  for (let i = 0; i < keys.length; i++) {
    options[i + 1].textContent = categoryNames[lang][keys[i]];
  }
}
