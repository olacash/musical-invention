/* ============================================
   GALLERY PAGE SCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    const galleryContent = document.getElementById('galleryContent');
    const viewToggles = document.querySelectorAll('.view-toggle');
    const gallerySort = document.getElementById('gallerySort');
    const detailsModal = document.getElementById('detailsModal');
    const closeBtn = detailsModal?.querySelector('.close');
    
    let currentView = 'grid';
    let currentSort = 'recent';
    
    // Combine audio and video data
    const allMusicData = [
        ...window.musicApp.audioMusicData.map(item => ({...item, type: 'audio'})),
        ...window.musicApp.videoMusicData.map(item => ({...item, type: 'video'}))
    ];
    
    // Render initial gallery
    if (galleryContent) {
        renderGallery(sortGalleryData(allMusicData, currentSort));
    }
    
    // View toggle
    viewToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            // Remove active from all
            viewToggles.forEach(t => t.classList.remove('active'));
            // Add active to clicked
            this.classList.add('active');
            
            currentView = this.dataset.view;
            galleryContent.classList.remove('grid-view', 'list-view');
            
            if (currentView === 'list') {
                galleryContent.classList.add('list-view');
            } else {
                galleryContent.classList.add('grid-view');
            }
        });
    });
    
    // Sort functionality
    if (gallerySort) {
        gallerySort.addEventListener('change', function() {
            currentSort = this.value;
            const sorted = sortGalleryData(allMusicData, currentSort);
            renderGallery(sorted);
        });
    }
    
    function sortGalleryData(data, sortType) {
        const sorted = [...data];
        
        switch(sortType) {
            case 'popular':
                return sorted.reverse();
            case 'trending':
                return sorted.slice(0, 4).reverse();
            case 'alphabetical':
                return sorted.sort((a, b) => a.title.localeCompare(b.title));
            case 'recent':
            default:
                return sorted;
        }
    }
    
    function renderGallery(items) {
        galleryContent.innerHTML = '';
        
        items.forEach(item => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            
            const badge = item.type === 'video' ? '🎬' : '🎵';
            
            galleryItem.innerHTML = `
                <div class="music-card-image" style="position: relative;">
                    ${item.thumbnail}
                    <div style="
                        position: absolute;
                        top: 10px;
                        right: 10px;
                        background: rgba(0, 0, 0, 0.7);
                        color: white;
                        padding: 0.5rem;
                        border-radius: 6px;
                        font-size: 0.9rem;
                    ">
                        ${badge}
                    </div>
                </div>
                <div class="music-card-content">
                    <div class="music-card-title">${item.title}</div>
                    <div class="music-card-artist">${item.artist}</div>
                    <div class="music-card-meta">
                        <span>${item.duration}</span>
                        <span>${item.type === 'video' ? item.format : item.genre}</span>
                    </div>
                    <div class="music-card-actions">
                        <button class="details-btn" data-id="${item.id}" data-type="${item.type}">ℹ️ Info</button>
                        <button class="quick-download-btn" data-id="${item.id}" data-type="${item.type}">⬇ Download</button>
                    </div>
                </div>
            `;
            
            galleryContent.appendChild(galleryItem);
        });
        
        attachGalleryEventListeners(allMusicData);
    }
    
    function attachGalleryEventListeners(dataArray) {
        // Details button
        document.querySelectorAll('.details-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.dataset.id);
                const type = this.dataset.type;
                showDetails(id, type, dataArray);
            });
        });
        
        // Quick download button
        document.querySelectorAll('.quick-download-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.dataset.id);
                const type = this.dataset.type;
                quickDownload(id, type, dataArray);
            });
        });
    }
    
    function showDetails(id, type, dataArray) {
        let item;
        if (type === 'audio') {
            item = window.musicApp.getMusicById(id, window.musicApp.audioMusicData);
        } else {
            item = window.musicApp.getMusicById(id, window.musicApp.videoMusicData);
        }
        
        if (!item) return;
        
        document.getElementById('detailsTitle').textContent = item.title;
        document.getElementById('detailsArtist').textContent = item.artist;
        document.getElementById('detailsGenre').textContent = item.genre || item.format || 'N/A';
        document.getElementById('detailsDuration').textContent = item.duration;
        document.getElementById('detailsDate').textContent = item.date;
        document.getElementById('detailsFormat').textContent = item.format;
        
        // Update action buttons
        const viewDetailsBtn = document.getElementById('viewDetailsBtn');
        const downloadDetailsBtn = document.getElementById('downloadDetailsBtn');
        
        if (viewDetailsBtn) {
            viewDetailsBtn.onclick = function() {
                if (type === 'audio') {
                    window.location.href = 'audio-music.html';
                } else {
                    window.location.href = 'video-music.html';
                }
            };
        }
        
        if (downloadDetailsBtn) {
            downloadDetailsBtn.onclick = function() {
                quickDownload(id, type, dataArray);
            };
        }
        
        if (detailsModal) {
            detailsModal.classList.add('active');
        }
    }
    
    function quickDownload(id, type, dataArray) {
        let item;
        if (type === 'audio') {
            item = window.musicApp.getMusicById(id, window.musicApp.audioMusicData);
            if (item) {
                const filename = `${item.artist} - ${item.title}.mp3`;
                window.musicApp.downloadFile(item.url, filename);
            }
        } else {
            item = window.musicApp.getMusicById(id, window.musicApp.videoMusicData);
            if (item) {
                const filename = `${item.artist} - ${item.title}.mp4`;
                window.musicApp.downloadFile(item.url, filename);
            }
        }
    }
    
    // Close modal
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            detailsModal.classList.remove('active');
        });
    }
    
    // Close modal when clicking outside
    if (detailsModal) {
        detailsModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    }
});

// Add CSS for list view
const listViewStyle = document.createElement('style');
listViewStyle.textContent = `
    .gallery-grid.list-view {
        grid-template-columns: 1fr !important;
    }
    
    .gallery-grid.list-view .gallery-item {
        display: flex;
        flex-direction: row;
    }
    
    .gallery-grid.list-view .music-card-image {
        width: 200px;
        height: 200px;
        flex-shrink: 0;
    }
    
    .gallery-grid.list-view .music-card-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    
    @media (max-width: 768px) {
        .gallery-grid.list-view .gallery-item {
            flex-direction: column;
        }
        
        .gallery-grid.list-view .music-card-image {
            width: 100%;
            height: 200px;
        }
    }
`;
document.head.appendChild(listViewStyle);
