import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeLanguageContext = createContext();

const translations = {
  en: {
    dashboard: "Dashboard",
    myAssessments: "My Assessments",
    profile: "Profile",
    settings: "Settings",
    logout: "Logout",
    allAssessments: "All Assessments",
    assessmentsSubtitle: "View and submit your available assessments",
    noAssessments: "No assessments found.",
    notifications: "Notifications",
    privacySecurity: "Privacy & Security",
    preferences: "Preferences",
    account: "Account",
    saveSettings: "Save Settings",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    language: "Language",
    changePassword: "Change Password",
    currentPassword: "Current Password",
    newPassword: "New Password",
    confirmNewPassword: "Confirm New Password",
    accountVisibility: "Account Visibility",
    twoFactorAuth: "Two-Factor Authentication",
    emailNotifications: "Email Notifications",
    smsNotifications: "SMS Notifications",
    automatedReminders: "Automated Reminders",
  },
  es: {
    dashboard: "Panel",
    myAssessments: "Mis Evaluaciones",
    profile: "Perfil",
    settings: "Configuración",
    logout: "Cerrar sesión",
    allAssessments: "Todas las Evaluaciones",
    assessmentsSubtitle: "Ver y enviar tus evaluaciones disponibles",
    noAssessments: "No se encontraron evaluaciones.",
    notifications: "Notificaciones",
    privacySecurity: "Privacidad y Seguridad",
    preferences: "Preferencias",
    account: "Cuenta",
    saveSettings: "Guardar Configuración",
    darkMode: "Modo Oscuro",
    lightMode: "Modo Claro",
    language: "Idioma",
    changePassword: "Cambiar Contraseña",
    currentPassword: "Contraseña Actual",
    newPassword: "Nueva Contraseña",
    confirmNewPassword: "Confirmar Nueva Contraseña",
    accountVisibility: "Visibilidad de la Cuenta",
    twoFactorAuth: "Autenticación de Dos Factores",
    emailNotifications: "Notificaciones por Correo",
    smsNotifications: "Notificaciones por SMS",
    automatedReminders: "Recordatorios Automáticos",
  },
  fr: {
    dashboard: "Tableau de bord",
    myAssessments: "Mes Évaluations",
    profile: "Profil",
    settings: "Paramètres",
    logout: "Déconnexion",
    allAssessments: "Toutes les Évaluations",
    assessmentsSubtitle: "Voir et soumettre vos évaluations disponibles",
    noAssessments: "Aucune évaluation trouvée.",
    notifications: "Notifications",
    privacySecurity: "Confidentialité et Sécurité",
    preferences: "Préférences",
    account: "Compte",
    saveSettings: "Enregistrer les Paramètres",
    darkMode: "Mode Sombre",
    lightMode: "Mode Clair",
    language: "Langue",
    changePassword: "Changer le Mot de Passe",
    currentPassword: "Mot de Passe Actuel",
    newPassword: "Nouveau Mot de Passe",
    confirmNewPassword: "Confirmer le Nouveau Mot de Passe",
    accountVisibility: "Visibilité du Compte",
    twoFactorAuth: "Authentification à Deux Facteurs",
    emailNotifications: "Notifications Email",
    smsNotifications: "Notifications SMS",
    automatedReminders: "Rappels Automatiques",
  },
  de: {
    dashboard: "Dashboard",
    myAssessments: "Meine Bewertungen",
    profile: "Profil",
    settings: "Einstellungen",
    logout: "Abmelden",
    allAssessments: "Alle Bewertungen",
    assessmentsSubtitle: "Verfügbare Bewertungen anzeigen und einreichen",
    noAssessments: "Keine Bewertungen gefunden.",
    notifications: "Benachrichtigungen",
    privacySecurity: "Datenschutz & Sicherheit",
    preferences: "Einstellungen",
    account: "Konto",
    saveSettings: "Einstellungen speichern",
    darkMode: "Dunkelmodus",
    lightMode: "Hellmodus",
    language: "Sprache",
    changePassword: "Passwort ändern",
    currentPassword: "Aktuelles Passwort",
    newPassword: "Neues Passwort",
    confirmNewPassword: "Neues Passwort bestätigen",
    accountVisibility: "Kontosichtbarkeit",
    twoFactorAuth: "Zwei-Faktor-Authentifizierung",
    emailNotifications: "E-Mail-Benachrichtigungen",
    smsNotifications: "SMS-Benachrichtigungen",
    automatedReminders: "Automatische Erinnerungen",
  },
  zh: {
    dashboard: "仪表板",
    myAssessments: "我的作业",
    profile: "个人资料",
    settings: "设置",
    logout: "退出登录",
    allAssessments: "所有作业",
    assessmentsSubtitle: "查看并提交你的可用作业",
    noAssessments: "没有找到作业。",
    notifications: "通知",
    privacySecurity: "隐私与安全",
    preferences: "偏好设置",
    account: "账户",
    saveSettings: "保存设置",
    darkMode: "深色模式",
    lightMode: "浅色模式",
    language: "语言",
    changePassword: "更改密码",
    currentPassword: "当前密码",
    newPassword: "新密码",
    confirmNewPassword: "确认新密码",
    accountVisibility: "账户可见性",
    twoFactorAuth: "双重身份验证",
    emailNotifications: "邮件通知",
    smsNotifications: "短信通知",
    automatedReminders: "自动提醒",
  },
};

export function ThemeLanguageProvider({ children }) {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [language, setLanguage] = useState(localStorage.getItem("language") || "en");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = "";
    document.body.classList.add(theme === "dark" ? "dark-theme" : "light-theme");
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const updateTheme = (newTheme) => setTheme(newTheme);
  const updateLanguage = (newLanguage) => setLanguage(newLanguage);

  const t = translations[language] || translations.en;

  const themeStyles =
    theme === "dark"
      ? {
          background: "#0f172a",
          cardBackground: "#111827",
          text: "#f9fafb",
          subText: "#cbd5e1",
          border: "#374151",
          sidebarBg: "#111827",
          sidebarText: "#f9fafb",
          mutedBg: "#1f2937",
        }
      : {
          background: "#f8fafc",
          cardBackground: "#ffffff",
          text: "#111827",
          subText: "#6b7280",
          border: "#e5e7eb",
          sidebarBg: "#ffffff",
          sidebarText: "#111827",
          mutedBg: "#f3f4f6",
        };

  return (
    <ThemeLanguageContext.Provider
      value={{
        theme,
        language,
        updateTheme,
        updateLanguage,
        themeStyles,
        t,
      }}
    >
      {children}
    </ThemeLanguageContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeLanguageContext);
}

export function useLanguage() {
  return useContext(ThemeLanguageContext);
}