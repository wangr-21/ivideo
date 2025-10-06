// 视频播放器增强功能
class VideoPlayer {
    constructor() {
        this.player = document.getElementById('videoPlayer');
        this.modal = document.getElementById('videoModal');
        this.init();
    }
    
    init() {
        // 添加键盘控制
        document.addEventListener('keydown', (e) => {
            if (this.modal.style.display === 'flex') {
                this.handleKeyControls(e);
            }
        });
        
        // 添加播放进度跟踪
        this.player.addEventListener('timeupdate', () => {
            this.trackProgress();
        });
        
        // 视频结束事件
        this.player.addEventListener('ended', () => {
            this.handleVideoEnd();
        });
    }
    
    handleKeyControls(e) {
        switch(e.key) {
            case ' ':
            case 'k':
                e.preventDefault();
                this.togglePlayPause();
                break;
            case 'f':
                this.toggleFullscreen();
                break;
            case 'm':
                this.toggleMute();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                this.seek(-10);
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.seek(10);
                break;
            case 'Escape':
                this.closePlayer();
                break;
        }
    }
    
    togglePlayPause() {
        if (this.player.paused) {
            this.player.play();
        } else {
            this.player.pause();
        }
    }
    
    toggleFullscreen() {
        if (!document.fullscreenElement) {
            if (this.player.requestFullscreen) {
                this.player.requestFullscreen();
            } else if (this.player.webkitRequestFullscreen) {
                this.player.webkitRequestFullscreen();
            } else if (this.player.msRequestFullscreen) {
                this.player.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    }
    
    toggleMute() {
        this.player.muted = !this.player.muted;
    }
    
    seek(seconds) {
        this.player.currentTime += seconds;
    }
    
    trackProgress() {
        // 在实际应用中，这里可以保存观看进度
        const progress = (this.player.currentTime / this.player.duration) * 100;
        console.log(`观看进度: ${progress.toFixed(2)}%`);
    }
    
    handleVideoEnd() {
        // 在实际应用中，这里可以显示下一个视频推荐
        console.log('视频播放结束');
        
        // 3秒后自动关闭播放器
        setTimeout(() => {
            this.closePlayer();
        }, 3000);
    }
    
    closePlayer() {
        this.modal.style.display = 'none';
        this.player.pause();
    }
}

// 初始化视频播放器
document.addEventListener('DOMContentLoaded', function() {
    new VideoPlayer();
});