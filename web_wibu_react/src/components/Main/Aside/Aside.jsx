import React from 'react';
import './Aside.css';

const Aside = () => {
  const userMenuItems = [
    { id: 'notifications', label: 'Thông báo', icon: '🔔' },
    { id: 'history', label: 'Lịch sử đọc', icon: '🔍' },
    { id: 'bookmark', label: 'Đánh dấu', icon: '🔖' },
    { id: 'following', label: 'Theo dõi', icon: '👥' },
    { id: 'messages', label: 'Hộp thư', icon: '✉️' },
    { id: 'library', label: 'Tủ sách', icon: '📚' },
    { id: 'discussions', label: 'Thảo luận', icon: '💬' },
    { id: 'shop', label: 'Mua hàng', icon: '🛒' }
  ];

  return (
    <aside className="main-aside">
      <div className="user-profile">
        <div className="avatar">
          <img src="/default-avatar.png" alt="User Avatar" />
        </div>
        <div className="user-info">
          <h3 className="username">Tên người dùng</h3>
          <span className="user-status">Online</span>
        </div>
      </div>

      <nav className="user-menu">
        {userMenuItems.map(item => (
          <a key={item.id} href={`/user/${item.id}`} className="menu-item">
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-label">{item.label}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
};

export default Aside;