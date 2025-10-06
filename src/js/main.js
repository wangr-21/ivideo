import { allVideos, freeVideoSources, mockVideos } from '../assets/mock/videoData.js';

// 主应用逻辑
document.addEventListener('DOMContentLoaded', function() {
    console.log('iVideo 应用初始化...');
    
    // 导航栏滚动效果
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 初始化内容
    initializeContent();
    
    // 搜索功能
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    // 横幅播放按钮 - 修复事件监听
    const bannerPlayBtn = document.getElementById('bannerPlayBtn');
    if (bannerPlayBtn) {
        bannerPlayBtn.addEventListener('click', function() {
            console.log('横幅播放按钮被点击');
            // 播放第一个视频
            if (allVideos.length > 0) {
                playVideo(allVideos[0]);
            } else {
                console.error('没有可用的视频数据');
            }
        });
    } else {
        console.error('未找到横幅播放按钮');
    }

    // 视频播放器关闭功能
    setupVideoPlayer();
});

// 设置视频播放器事件
function setupVideoPlayer() {
    const videoModal = document.getElementById('videoModal');
    const closeBtn = document.querySelector('.close-btn');
    const videoPlayer = document.getElementById('videoPlayer');
    
    if (closeBtn && videoModal) {
        closeBtn.addEventListener('click', function() {
            videoModal.style.display = 'none';
            if (videoPlayer) {
                videoPlayer.pause();
                videoPlayer.currentTime = 0;
            }
        });
    }
    
    window.addEventListener('click', function(e) {
        if (e.target === videoModal) {
            videoModal.style.display = 'none';
            if (videoPlayer) {
                videoPlayer.pause();
                videoPlayer.currentTime = 0;
            }
        }
    });
}

// 初始化内容
function initializeContent() {
    const contentRows = document.getElementById('contentRows');
    if (!contentRows) {
        console.error('未找到内容行容器');
        return;
    }
    
    console.log('正在初始化内容...');
    
    // 创建免费视频行
    createVideoRow(contentRows, '免费视频', freeVideoSources);
    
    // 创建教学视频行
    createVideoRow(contentRows, '教学视频', mockVideos);
    
    // 创建推荐视频行（混合）
    const recommendedVideos = [...freeVideoSources, ...mockVideos]
        .sort(() => Math.random() - 0.5)
        .slice(0, 6);
    createVideoRow(contentRows, '推荐视频', recommendedVideos);
    
    console.log('内容初始化完成');
}

// 创建视频行
function createVideoRow(container, title, videos) {
    if (videos.length === 0) {
        console.warn(`没有视频数据用于: ${title}`);
        return;
    }
    
    const row = document.createElement('div');
    row.className = 'row';
    
    const rowTitle = document.createElement('h2');
    rowTitle.className = 'row-title';
    rowTitle.textContent = title;
    
    const rowContent = document.createElement('div');
    rowContent.className = 'row-content';
    
    row.appendChild(rowTitle);
    row.appendChild(rowContent);
    container.appendChild(row);
    
    // 生成卡片
    videos.forEach(video => {
        const card = createCardElement(video);
        rowContent.appendChild(card);
    });
}

// 创建卡片元素
function createCardElement(videoData) {
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('data-video-id', videoData.id);
    
    const thumbnail = videoData.thumbnail || videoData.cover;
    const videoUrl = videoData.src || videoData.videoUrl;
    
    card.innerHTML = `
        <img src="${thumbnail}" alt="${videoData.title}海报" onerror="this.src='https://via.placeholder.com/300x450/333/fff?text=No+Image'">
        <div class="card-overlay">
            <h3>${videoData.title}</h3>
            <p>${videoData.author} • ${formatDuration(videoData.duration)}</p>
            <p class="card-stats">${formatNumber(videoData.views)} 次观看 • ${formatNumber(videoData.likes)} 赞</p>
            <div class="card-buttons">
                <button class="play-btn"><i class="fas fa-play"></i></button>
                <button class="info-btn"><i class="fas fa-plus"></i></button>
            </div>
        </div>
    `;
    
    // 添加事件监听器
    card.addEventListener('click', function(e) {
        console.log('卡片被点击，视频ID:', videoData.id);
        if (!e.target.closest('.card-buttons')) {
            playVideo(videoData);
        }
    });
    
    const playButton = card.querySelector('.play-btn');
    if (playButton) {
        playButton.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('卡片播放按钮被点击，视频ID:', videoData.id);
            playVideo(videoData);
        });
    }
    
    return card;
}

// 播放视频
function playVideo(videoData) {
    console.log('播放视频:', videoData.title);
    
    const videoModal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('videoPlayer');
    
    if (!videoModal) {
        console.error('未找到视频模态框');
        return;
    }
    
    if (!videoPlayer) {
        console.error('未找到视频播放器');
        return;
    }
    
    // 设置视频信息
    const videoTitle = document.getElementById('videoTitle');
    const videoDescription = document.getElementById('videoDescription');
    const videoAuthor = document.getElementById('videoAuthor');
    const videoViews = document.getElementById('videoViews');
    const videoUploadTime = document.getElementById('videoUploadTime');
    const qualitySelector = document.getElementById('qualitySelector');
    
    if (videoTitle) videoTitle.textContent = videoData.title;
    if (videoDescription) videoDescription.textContent = videoData.description;
    if (videoAuthor) videoAuthor.textContent = `作者: ${videoData.author}`;
    if (videoViews) videoViews.textContent = `观看: ${formatNumber(videoData.views)}`;
    if (videoUploadTime) videoUploadTime.textContent = `上传: ${videoData.uploadTime}`;
    
    // 设置视频源
    const videoUrl = videoData.src || videoData.videoUrl;
    console.log('设置视频源:', videoUrl);
    
    videoPlayer.src = videoUrl;
    videoPlayer.load(); // 强制重新加载视频
    
    // 设置清晰度选项
    if (qualitySelector) {
        setupQualitySelector(qualitySelector, videoData);
    }
    
    // 显示模态框
    videoModal.style.display = 'flex';
    
    // 尝试播放视频
    const playPromise = videoPlayer.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {
            console.log('视频开始播放');
        }).catch(error => {
            console.log('自动播放被阻止:', error);
            // 显示播放按钮让用户手动点击
            showPlayButton();
        });
    }
}

// 显示播放按钮（当自动播放被阻止时）
function showPlayButton() {
    const videoPlayer = document.getElementById('videoPlayer');
    if (!videoPlayer) return;
    
    // 创建一个覆盖层和播放按钮
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;
    `;
    
    const playBtn = document.createElement('button');
    playBtn.innerHTML = '<i class="fas fa-play" style="font-size: 3rem;"></i>';
    playBtn.style.cssText = `
        background: #e50914;
        border: none;
        border-radius: 50%;
        width: 80px;
        height: 80px;
        color: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    playBtn.addEventListener('click', function() {
        videoPlayer.play();
        overlay.remove();
    });
    
    overlay.appendChild(playBtn);
    
    const videoContainer = videoPlayer.parentElement;
    if (videoContainer) {
        videoContainer.style.position = 'relative';
        videoContainer.appendChild(overlay);
    }
}

// 设置清晰度选择器
function setupQualitySelector(container, videoData) {
    container.innerHTML = '';
    
    const qualities = videoData.qualities || [];
    if (qualities.length <= 1) {
        container.style.display = 'none';
        return;
    }
    
    container.style.display = 'flex';
    
    qualities.forEach(quality => {
        const button = document.createElement('button');
        button.className = 'quality-btn';
        button.textContent = quality.label || quality.name;
        button.addEventListener('click', () => {
            const videoPlayer = document.getElementById('videoPlayer');
            if (videoPlayer) {
                videoPlayer.src = quality.url;
                videoPlayer.load();
                videoPlayer.play().catch(e => {
                    console.log('清晰度切换后播放失败:', e);
                });
                
                // 更新激活状态
                document.querySelectorAll('.quality-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                button.classList.add('active');
            }
        });
        container.appendChild(button);
    });
    
    // 默认选择第一个
    if (container.firstChild) {
        container.firstChild.classList.add('active');
    }
}

// 搜索处理
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        // 清空搜索结果，恢复原始内容
        const contentRows = document.getElementById('contentRows');
        contentRows.innerHTML = '';
        initializeContent();
        return;
    }
    
    // 过滤视频
    const filteredVideos = allVideos.filter(video => 
        video.title.toLowerCase().includes(searchTerm) ||
        video.description.toLowerCase().includes(searchTerm) ||
        (video.tags && video.tags.some(tag => tag.toLowerCase().includes(searchTerm))) ||
        video.author.toLowerCase().includes(searchTerm)
    );
    
    // 显示搜索结果
    const contentRows = document.getElementById('contentRows');
    contentRows.innerHTML = '';
    
    if (filteredVideos.length > 0) {
        createVideoRow(contentRows, `搜索结果 (${filteredVideos.length})`, filteredVideos);
    } else {
        const noResults = document.createElement('div');
        noResults.className = 'no-results';
        noResults.innerHTML = `
            <h3>没有找到相关视频</h3>
            <p>请尝试其他搜索关键词</p>
        `;
        contentRows.appendChild(noResults);
    }
}

// 工具函数
function formatDuration(duration) {
    return duration;
}

function formatNumber(num) {
    if (num >= 10000) {
        return (num / 10000).toFixed(1) + '万';
    }
    return num.toString();
}

document.addEventListener('DOMContentLoaded', () => {
    // 选择导航栏内所有下拉菜单（包含视频分类与个人账户）
    const navDropdowns = document.querySelectorAll('.navbar .dropdown');

    navDropdowns.forEach(drop => {
        // 查找可点击的触发器：优先 .nav-link，其次图标 <i>
        const toggler = drop.querySelector('.nav-link, i');
        if (!toggler) return;

        // 点击切换展开/收起
        toggler.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // 关闭其他下拉菜单（保持只有一个打开）
            navDropdowns.forEach(d => { 
                if (d !== drop) d.classList.remove('open'); 
            });
            
            // 切换当前下拉菜单状态
            drop.classList.toggle('open');
        });

        // 阻止在下拉内容内部点击时冒泡到 document（避免被外部点击处理器关闭）
        const content = drop.querySelector('.dropdown-content');
        if (content) {
            content.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
    });

    // 点击页面其他区域时关闭所有下拉
    document.addEventListener('click', () => {
        navDropdowns.forEach(d => d.classList.remove('open'));
    });

    // Esc 键关闭所有下拉
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            navDropdowns.forEach(d => d.classList.remove('open'));
        }
    });
});