import React, { useState, useEffect } from 'react';
import { Camera, Save, User } from 'lucide-react';
import { useUser } from '../../hooks/useUser';
import { updateUserProfile, uploadAvatar } from '../../api/userApi';
import { useToast } from '../../context/ToastContext';
import styles from './Profile.module.css';

export default function Profile() {
  const { profile, refreshProfile } = useUser();
  const { addToast } = useToast();
  
  const [name, setName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (profile?.full_name) {
      setName(profile.full_name);
    }
  }, [profile]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!profile?.id) return;
    
    setIsSaving(true);
    try {
      await updateUserProfile(profile.id, { full_name: name });
      await refreshProfile();
      addToast('Profile updated successfully', 'success');
    } catch (error) {
      addToast(error.message, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !profile?.id) return;
    
    // Validate image format
    if (!file.type.startsWith('image/')) {
      addToast('Please select an image file', 'error');
      return;
    }
    
    setIsUploading(true);
    try {
      const publicUrl = await uploadAvatar(profile.id, file);
      await updateUserProfile(profile.id, { avatar_url: publicUrl });
      await refreshProfile();
      addToast('Avatar updated successfully', 'success');
    } catch (error) {
      addToast(error.message, 'error');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Your Profile</h1>
        <p className={styles.subtitle}>Manage your public information and avatar</p>
      </header>

      <div className={styles.content}>
        <div className={styles.card}>
          <div className={styles.avatarSection}>
            <div className={styles.avatarWrapper}>
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt="Profile" className={styles.avatarImage} />
              ) : (
                <div className={styles.avatarPlaceholder}>
                  <User size={48} className={styles.userIcon} />
                </div>
              )}
              
              <label className={styles.uploadButton}>
                {isUploading ? (
                  <span className={styles.loader}></span>
                ) : (
                  <Camera size={20} />
                )}
                <input 
                  type="file" 
                  accept="image/*" 
                  className={styles.hiddenInput}
                  onChange={handleAvatarUpload}
                  disabled={isUploading}
                />
              </label>
            </div>
            <div className={styles.avatarInfo}>
              <h3 className={styles.avatarTitle}>Profile Picture</h3>
              <p className={styles.avatarDesc}>JPG, GIF or PNG. 1MB max.</p>
            </div>
          </div>

          <form onSubmit={handleUpdateProfile} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>Full Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.input}
                placeholder="John Doe"
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>Email Address</label>
              <input
                id="email"
                type="email"
                value={profile?.email || ''}
                disabled
                className={styles.inputDisabled}
                title="Email cannot be changed here"
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="role" className={styles.label}>Role</label>
              <input
                id="role"
                type="text"
                value={profile?.role || 'user'}
                disabled
                className={styles.inputDisabled}
                style={{ textTransform: 'capitalize' }}
              />
            </div>

            <div className={styles.formActions}>
              <button type="submit" className={styles.submitButton} disabled={isSaving || isUploading}>
                {isSaving ? <span className={styles.loaderSmall}></span> : <Save size={18} />}
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
