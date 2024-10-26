window.addEventListener('scroll', function() {
    var bottomNav = document.querySelector('.bottom-nav');
    var banner = document.querySelector('.banner');
    var topNav = document.querySelector('.top-nav');
    var aside = document.querySelector('aside');
    var main = document.querySelector('main');

    var bannerBottom = banner.offsetTop + banner.offsetHeight;
    var scrollPosition = window.scrollY;

    // Xử lý bottom nav
    if (scrollPosition + topNav.offsetHeight >= bannerBottom - bottomNav.offsetHeight) {
        bottomNav.style.position = 'fixed';
        bottomNav.style.top = topNav.offsetHeight + 'px';
        bottomNav.style.bottom = 'auto';
    } else {
        bottomNav.style.position = 'absolute';
        bottomNav.style.top = (bannerBottom - bottomNav.offsetHeight) + 'px';
        bottomNav.style.bottom = 'auto';
    }

    // Xử lý aside
    var asideTop = main.offsetTop;
    if (scrollPosition + topNav.offsetHeight + bottomNav.offsetHeight > asideTop) {
        aside.classList.add('aside-fixed');
        aside.style.top = (topNav.offsetHeight + bottomNav.offsetHeight) + 'px';
        aside.style.bottom = '0';
        main.classList.add('aside-fixed-active');
    } else {
        aside.classList.remove('aside-fixed');
        aside.style.top = 'auto';
        aside.style.bottom = 'auto';
        main.classList.remove('aside-fixed-active');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const bannerImages = document.querySelectorAll('.banner-image');
    const prevButton = document.querySelector('.banner-nav.prev');
    const nextButton = document.querySelector('.banner-nav.next');
    let currentIndex = 0;

    function showImage(index) {
        bannerImages.forEach(img => img.classList.remove('active'));
        bannerImages[index].classList.add('active');
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % bannerImages.length;
        showImage(currentIndex);
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + bannerImages.length) % bannerImages.length;
        showImage(currentIndex);
    }

    prevButton.addEventListener('click', prevImage);
    nextButton.addEventListener('click', nextImage);

    showImage(currentIndex);
});









document.querySelector('.theme-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
});







// Kiểm tra và áp dụng theme đã lưu
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
}






// Giả lập việc đăng nhập
function login(username) {
    document.querySelector('.username').textContent = username;
    document.querySelector('.avatar').src = 'path/to/user-avatar.png'; // Thay đổi avatar khi đăng nhập
    localStorage.setItem('username', username);
}

// Kiểm tra xem người dùng đã đăng nhập chưa khi tải trang
window.addEventListener('load', function() {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
        login(savedUsername);
    }
});

// Thêm event listener cho nút đăng xuất
document.querySelector('a[href="#logout"]').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('.username').textContent = 'Khách';
    document.querySelector('.avatar').src = 'path/to/default-avatar.png';
    localStorage.removeItem('username');
});

document.addEventListener('DOMContentLoaded', function() {
    const topNavTabs = document.querySelector('.top-nav-tabs');
    const topNovelsGrid = document.getElementById('top-novels');
    const bannerImages = document.querySelectorAll('.banner-image');
    const dots = document.querySelectorAll('.dot');
    const prevButton = document.querySelector('.banner-nav.prev');
    const nextButton = document.querySelector('.banner-nav.next');
    let currentIndex = 0;

    topNavTabs.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            e.preventDefault(); // Ngăn chặn hành vi mặc định của liên kết
            
            // Remove active class from all tabs
            topNavTabs.querySelectorAll('a').forEach(a => a.classList.remove('active'));
            // Add active class to clicked tab
            e.target.classList.add('active');

            // Get the period from data attribute
            const period = e.target.getAttribute('data-period');

            // Update the novels grid (this is where you'd normally fetch data from an API)
            updateTopNovels(period);
        }
    });

    function updateTopNovels(period) {
        // In a real application, you'd fetch data from an API here
        // For this example, we'll just update the title of each novel
        topNovelsGrid.innerHTML = ''; // Clear existing novels

        for (let i = 0; i < 12; i++) {
            const novelCard = createNovelCard(`Top ${period} Novel ${i + 1}`);
            topNovelsGrid.appendChild(novelCard);
        }
    }

    function createNovelCard(title) {
        const card = document.createElement('div');
        card.className = 'LN-card';
        card.innerHTML = `
            <div class="LN-image">
                <img src="/api/placeholder/200/280" alt="LN thumbnail">
                <div class="glow-overlay"></div>
            </div>
            <div class="LN-info">
                <div class="LN-title">${title}</div>
                <span class="LN-chapter">Chapter 1</span>
                <span class="time-ago">1 ngày trước</span>
            </div>
        `;
        return card;
    }

    function showImage(index) {
        bannerImages.forEach(img => img.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        bannerImages[index].classList.add('active');
        dots[index].classList.add('active');
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % bannerImages.length;
        showImage(currentIndex);
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + bannerImages.length) % bannerImages.length;
        showImage(currentIndex);
    }

    nextButton.addEventListener('click', nextImage);
    prevButton.addEventListener('click', prevImage);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            showImage(currentIndex);
        });
    });

    // Initialize with top day novels
    updateTopNovels('day');
});