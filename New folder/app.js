/* ============================================
   MAIN APPLICATION JAVASCRIPT
   ============================================ */

// Sample Music Data
const audioMusicData = [
    {
        id: 1,
        title: "Midnight Dreams",
        artist: "Luna Echo",
        genre: "electronic",
        duration: "3:45",
        date: "2024-01-15",
        format: "MP3 320kbps",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        thumbnail: "🎵"
    },
    {
        id: 2,
        title: "Electric Love",
        artist: "Neon Nights",
        genre: "pop",
        duration: "3:22",
        date: "2024-02-10",
        format: "MP3 320kbps",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        thumbnail: "🎧"
    },
    {
        id: 3,
        title: "Rock Anthem",
        artist: "Storm Riders",
        genre: "rock",
        duration: "4:15",
        date: "2024-02-20",
        format: "MP3 320kbps",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        thumbnail: "🎸"
    },
    {
        id: 4,
        title: "Hip Hop Vibes",
        artist: "Beat Masters",
        genre: "hip-hop",
        duration: "3:58",
        date: "2024-03-05",
        format: "MP3 320kbps",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        thumbnail: "🎤"
    },
    {
        id: 5,
        title: "Classical Symphony",
        artist: "Orchestra Harmony",
        genre: "classical",
        duration: "5:32",
        date: "2024-03-15",
        format: "FLAC Lossless",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        thumbnail: "🎻"
    },
    {
        id: 6,
        title: "Jazz Smoothness",
        artist: "Blue Notes",
        genre: "jazz",
        duration: "4:42",
        date: "2024-03-25",
        format: "MP3 320kbps",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
        thumbnail: "🎺"
    }
];

const videoMusicData = [
    {
        id: 101,
        title: "Midnight Dreams Music Video",
        artist: "Luna Echo",
        duration: "3:45",
        date: "2024-01-16",
        format: "MP4",
        quality: ["720p", "1080p", "4k"],
        url: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4",
        thumbnail: "🎬"
    },
    {
        id: 102,
        title: "Electric Love Live",
        artist: "Neon Nights",
        duration: "3:22",
        date: "2024-02-11",
        format: "MP4",
        quality: ["720p", "1080p"],
        url: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/ElephantsDream.mp4",
        thumbnail: "🎥"
    },
    {
        id: 103,
        title: "Rock Anthem Performance",
        artist: "Storm Riders",
        duration: "4:15",
        date: "2024-02-21",
        format: "MP4",
        quality: ["720p", "1080p", "4k"],
        url: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/ForBiggerBlazes.mp4",
        thumbnail: "🎞️"
    },
    {
        id: 104,
        title: "Hip Hop Stage Show",
        artist: "Beat Masters",
        duration: "3:58",
        date: "2024-03-06",
        format: "MP4",
        quality: ["720p", "1080p"],
        url: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/ForBiggerEscapes.mp4",
        thumbnail: "🎭"
    }
];

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Close menu on link click
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        });
    });

    // Update active nav link
    updateActiveNavLink();
});

function updateActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Download Function
function downloadFile(url, filename) {
    // For demo purposes, we're using fetch to create a download
    // In a real application, you might use server-side solutions
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    
    setTimeout(() => {
        document.body.removeChild(link);
    }, 100);
    
    // Show notification
    showNotification(`Downloading: ${filename}`);
}

// Notification Function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Search and Filter Functions
function filterContent(searchTerm, genre, container, dataArray, isVideo = false) {
    let filtered = dataArray.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.artist.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesGenre = !genre || item.genre === genre;
        return matchesSearch && matchesGenre;
    });
    
    return filtered;
}

// Render Music Cards
function renderMusicCards(container, items) {
    if (!container) return;
    
    container.innerHTML = '';
    
    if (items.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 2rem; color: #64748b; grid-column: 1/-1;">No music found</p>';
        return;
    }
    
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'music-card';
        card.innerHTML = `
            <div class="music-card-image">${item.thumbnail}</div>
            <div class="music-card-content">
                <div class="music-card-title">${item.title}</div>
                <div class="music-card-artist">${item.artist}</div>
                <div class="music-card-meta">
                    <span>${item.duration}</span>
                    <span>${item.genre}</span>
                </div>
                <div class="music-card-actions">
                    <button class="play-btn" data-id="${item.id}">▶ Play</button>
                    <button class="download-btn" data-id="${item.id}">⬇ Download</button>
                </div>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Render Video Cards
function renderVideoCards(container, items) {
    if (!container) return;
    
    container.innerHTML = '';
    
    if (items.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 2rem; color: #64748b; grid-column: 1/-1;">No videos found</p>';
        return;
    }
    
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'video-card';
        card.innerHTML = `
            <div class="video-card-image">${item.thumbnail}</div>
            <div class="video-card-content">
                <div class="video-card-title">${item.title}</div>
                <div class="video-card-artist">${item.artist}</div>
                <div class="video-card-meta">
                    <span>${item.duration}</span>
                    <span>${item.format}</span>
                </div>
                <div class="video-card-actions">
                    <button class="play-video-btn" data-id="${item.id}">▶ Play</button>
                    <button class="download-video-btn" data-id="${item.id}">⬇ Download</button>
                </div>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Animation for notifications (add to CSS if not present)
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);

// Get music item by ID
function getMusicById(id, dataArray) {
    return dataArray.find(item => item.id === id);
}

// Export data for use in other scripts
window.musicApp = {
    audioMusicData,
    videoMusicData,
    downloadFile,
    showNotification,
    filterContent,
    renderMusicCards,
    renderVideoCards,
    getMusicById
};
