import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { getAllUsers, deleteUser } from '../../api/userApi';
import { useDebounce } from '../../hooks/useDebounce';
import { useToast } from '../../context/ToastContext';
import { DataTable } from '../../components/DataTable/DataTable';
import { Modal } from '../../components/Modal/Modal';
import styles from './Users.module.css';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  
  const [sortConfig, setSortConfig] = useState({ key: 'created_at', direction: 'desc' });
  const { addToast } = useToast();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const fetchUsersData = useCallback(async () => {
    setLoading(true);
    try {
      const { users: data, total } = await getAllUsers(currentPage, pageSize, debouncedSearch);
      setUsers(data || []); // Mock or real data
      setTotalItems(total || 0);
    } catch (error) {
      addToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize, debouncedSearch, addToast]);

  useEffect(() => {
    fetchUsersData();
  }, [fetchUsersData]);

  // Reset page to 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  const handleSort = useCallback((key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  }, [sortConfig]);

  // Client side sorting if API doesn't support dynamic order
  const sortedUsers = useMemo(() => {
    if (!sortConfig.key) return users;
    return [...users].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [users, sortConfig]);

  const confirmDelete = useCallback(async () => {
    if (!userToDelete) return;
    try {
      await deleteUser(userToDelete.id);
      addToast('User deleted successfully', 'success');
      fetchUsersData();
    } catch (error) {
      addToast(error.message, 'error');
    } finally {
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
    }
  }, [userToDelete, addToast, fetchUsersData]);

  const openDeleteModal = useCallback((user) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  }, []);

  const getRoleBadgeClass = (role) => {
    return role === 'admin' ? styles.badgeAdmin : styles.badgeUser;
  };

  const columns = useMemo(() => [
    {
      label: 'User',
      key: 'email',
      sortable: true,
      render: (row) => (
        <div className={styles.userInfo}>
          {row.avatar_url ? (
            <img src={row.avatar_url} alt="" className={styles.avatar} />
          ) : (
            <div className={styles.avatarFallback}>{row.email.charAt(0).toUpperCase()}</div>
          )}
          <div className={styles.userDetails}>
            <span className={styles.userName}>{row.full_name || 'Anonymous'}</span>
            <span className={styles.userEmail}>{row.email}</span>
          </div>
        </div>
      )
    },
    {
      label: 'Role',
      key: 'role',
      sortable: true,
      render: (row) => (
        <span className={`${styles.badge} ${getRoleBadgeClass(row.role)}`}>
          {row.role}
        </span>
      )
    },
    {
      label: 'Created At',
      key: 'created_at',
      sortable: true,
      render: (row) => new Date(row.created_at).toLocaleDateString()
    },
    {
      label: 'Actions',
      key: 'actions',
      sortable: false,
      render: (row) => (
        <div className={styles.actions}>
          <button className={styles.editBtn}>Edit Role</button>
          <button 
            className={styles.deleteBtn}
            onClick={() => openDeleteModal(row)}
          >
            Delete
          </button>
        </div>
      )
    }
  ], [openDeleteModal]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>User Management</h1>
          <p className={styles.subtitle}>Manage platform users, roles, and permissions.</p>
        </div>
      </header>

      <div className={styles.controls}>
        <div className={styles.searchWrapper}>
          <Search size={18} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search users by email..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && searchTerm !== debouncedSearch && (
            <Loader2 size={16} className={styles.searchSpinner} />
          )}
        </div>
      </div>

      <DataTable 
        columns={columns}
        data={sortedUsers}
        totalItems={totalItems}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        sortConfig={sortConfig}
        onSort={handleSort}
        loading={loading}
      />

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Deletion"
      >
        <div className={styles.modalContent}>
          <p>Are you sure you want to delete the user <strong>{userToDelete?.email}</strong>?</p>
          <p className={styles.warningText}>This action cannot be undone.</p>
          <div className={styles.modalActions}>
            <button className={styles.cancelBtn} onClick={() => setIsDeleteModalOpen(false)}>Cancel</button>
            <button className={styles.confirmDeleteBtn} onClick={confirmDelete}>Delete User</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
