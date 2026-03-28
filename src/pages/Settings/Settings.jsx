import React, { useState } from 'react';
import { Moon, Sun, Monitor, Trash2, AlertTriangle } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../../components/Modal/Modal';
import styles from './Settings.module.css';

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { dispatch } = useAuth();
  const { addToast } = useToast();
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      // Mocking account deletion
      await new Promise(resolve => setTimeout(resolve, 1500));
      addToast('Account scheduled for deletion', 'success');
      dispatch({ type: 'SIGN_OUT' });
    } catch {
      addToast('Error deleting account', 'error');
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Settings</h1>
        <p className={styles.subtitle}>Manage your app preferences and account settings</p>
      </header>

      <div className={styles.content}>
        {/* Appearance Section */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Appearance</h2>
            <p className={styles.sectionDesc}>Customize how the application looks on your device.</p>
          </div>
          
          <div className={styles.card}>
            <div className={styles.settingRow}>
              <div className={styles.settingInfo}>
                <div className={styles.settingInfoTitle}>Theme Selection</div>
                <div className={styles.settingInfoDesc}>Toggle between Light and Dark mode.</div>
              </div>
              
              <button 
                onClick={toggleTheme} 
                className={styles.themeToggle}
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? (
                  <>
                    <Moon size={18} />
                    <span>Dark Mode</span>
                  </>
                ) : (
                  <>
                    <Sun size={18} />
                    <span>Light Mode</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Danger Zone Section */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Danger Zone</h2>
            <p className={styles.sectionDesc}>Irreversible actions regarding your account.</p>
          </div>
          
          <div className={`${styles.card} ${styles.dangerCard}`}>
            <div className={styles.settingRow}>
              <div className={styles.settingInfo}>
                <div className={styles.settingInfoTitle}>Delete Account</div>
                <div className={styles.settingInfoDesc}>
                  Permanently remove your account and all associated data. This action cannot be undone.
                </div>
              </div>
              
              <button 
                onClick={() => setIsDeleteModalOpen(true)} 
                className={styles.deleteButton}
              >
                <Trash2 size={18} />
                Delete Account
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Confirmation Modal */}
      <Modal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Account"
      >
        <div className={styles.modalContent}>
          <div className={styles.warningBox}>
            <AlertTriangle size={24} className={styles.warningIcon} />
            <div>
              <h4 className={styles.warningTitle}>Warning</h4>
              <p className={styles.warningText}>
                You are about to permanently delete your account. All your data will be wiped and you will not be able to recover it.
              </p>
            </div>
          </div>
          
          <div className={styles.modalActions}>
            <button 
              className={styles.cancelButton} 
              onClick={() => setIsDeleteModalOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </button>
            <button 
              className={styles.confirmDeleteButton} 
              onClick={handleDeleteAccount}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Yes, delete my account'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
