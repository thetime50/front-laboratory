<template>
    <div class="component-audio">
        <h1>麦克风与音频设备控制Demo</h1>

        <div class="container">
            <div class="section">
                <h2>麦克风选择</h2>
                <select v-model="selectedMicrophone" @change="updateDeviceInfo">
                    <option v-if="!microphones.length" value="">正在加载麦克风列表...</option>
                    <option v-else v-for="mic in microphones" :key="mic.deviceId" :value="mic.deviceId">
                        {{ mic.label || `麦克风 ${microphones.indexOf(mic) + 1}` }}
                    </option>
                </select>
                <div class="device-info">
                    <span>状态: <span>{{ microphoneStatus }}</span></span>
                    <span>声道: <span>{{ channelInfo }}</span></span>
                </div>
            </div>

            <div class="section">
                <h2>播放设备选择</h2>
                <select v-model="selectedPlayback" @change="updateDeviceInfo">
                    <option v-if="!playbackDevices.length" value="">正在加载播放设备列表...</option>
                    <option v-else v-for="device in playbackDevices" :key="device.deviceId" :value="device.deviceId">
                        {{ device.label || `播放设备 ${playbackDevices.indexOf(device) + 1}` }}
                    </option>
                </select>
                <div class="device-info">
                    <span>状态: <span>{{ playbackStatus }}</span></span>
                    <span>设备类型: <span>{{ deviceType }}</span></span>
                </div>
            </div>

            <div class="section">
                <h2>音频可视化</h2>
                <div class="visualizer">
                    <canvas ref="visualizerCanvas"></canvas>
                </div>
            </div>

            <div class="section">
                <h2>音频控制</h2>
                <div class="controls">
                    <button @click="startRecording" v-if="!isRecording">开始录制</button>
                    <button @click="stopRecording" v-else class="stop">停止录制</button>
                    <button @click="playRecordedAudio" :disabled="!recordedAudio || isPlaying"
                        class="play">播放录音</button>
                    <button @click="downloadAudio" :disabled="!recordedAudio" class="download">下载录音</button>
                </div>
                <div class="status" :class="statusClass">{{ statusText }}</div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "audio",
    data() {
        return {
            // 音频上下文和相关对象
            audioContext: null,
            analyser: null,
            microphone: null,
            mediaRecorder: null,

            // 音频数据
            audioChunks: [],
            recordedAudio: null,

            // 可视化
            canvasCtx: null,
            animationId: null,

            // 状态标志
            isRecording: false,
            isPlaying: false,

            // 设备列表
            microphones: [],
            playbackDevices: [],

            // 选中的设备
            selectedMicrophone: '',
            selectedPlayback: '',

            // 状态信息
            statusText: '准备就绪',
            statusClass: 'status',
            microphoneStatus: '未选择',
            playbackStatus: '未选择',
            channelInfo: '-',
            deviceType: '-'
        };
    },
    mounted() {
        this.initCanvas();
        this.getDevices();

        // 监听设备变化
        navigator.mediaDevices.addEventListener('devicechange', this.getDevices);
    },
    beforeDestroy() {
        // 清理资源
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.mediaRecorder && this.isRecording) {
            this.mediaRecorder.stop();
        }

        // 移除事件监听器
        navigator.mediaDevices.removeEventListener('devicechange', this.getDevices);
    },
    methods: {
        initCanvas() {
            const canvas = this.$refs.visualizerCanvas;
            this.canvasCtx = canvas.getContext('2d');
            this.drawBlankVisualizer();
        },

        async getDevices() {
            try {
                // 请求麦克风权限以获取设备标签
                await navigator.mediaDevices.getUserMedia({ audio: true });

                // 获取所有设备
                const devices = await navigator.mediaDevices.enumerateDevices();

                // 过滤并显示麦克风
                this.microphones = devices.filter(device => device.kind === 'audioinput');

                // 过滤并显示播放设备
                this.playbackDevices = devices.filter(device => device.kind === 'audiooutput');

                this.selectedMicrophone = this.microphones[0]?.deviceId;
                this.selectedPlayback = this.playbackDevices[0]?.deviceId;

                this.updateDeviceInfo();
            } catch (error) {
                console.error('获取设备列表时出错:', error);
                this.statusText = '错误: ' + error.message;
            }
        },

        updateDeviceInfo() {
            this.microphoneStatus = this.selectedMicrophone ? '已选择' : '未选择';
            this.playbackStatus = this.selectedPlayback ? '已选择' : '未选择';

            // 检测设备类型
            const selectedPlayback = this.playbackDevices.find(
                device => device.deviceId === this.selectedPlayback
            );

            if (selectedPlayback) {
                const label = selectedPlayback.label.toLowerCase();
                if (label.includes('bluetooth') || label.includes('bt')) {
                    this.deviceType = '蓝牙设备';
                } else if (label.includes('speaker') || label.includes('扬声器')) {
                    this.deviceType = '扬声器';
                } else if (label.includes('headphone') || label.includes('耳机')) {
                    this.deviceType = '耳机';
                } else {
                    this.deviceType = '其他设备';
                }
            } else {
                this.deviceType = '-';
            }
        },

        async startRecording() {
            try {
                this.statusText = '正在准备录制...';
                this.statusClass = 'status';

                // 创建音频上下文
                if (!this.audioContext) {
                    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
                }

                // 获取选定的麦克风
                const deviceId = this.selectedMicrophone;
                const constraints = {
                    audio: deviceId ? { deviceId: { exact: deviceId } } : true
                };

                const stream = await navigator.mediaDevices.getUserMedia(constraints);

                // 创建分析器用于可视化
                this.analyser = this.audioContext.createAnalyser();
                this.analyser.fftSize = 256;

                // 连接音频节点
                this.microphone = this.audioContext.createMediaStreamSource(stream);
                this.microphone.connect(this.analyser);

                // 设置媒体录制器
                this.mediaRecorder = new MediaRecorder(stream);
                this.audioChunks = [];

                this.mediaRecorder.ondataavailable = event => {
                    this.audioChunks.push(event.data);
                };

                this.mediaRecorder.onstop = () => {
                    const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
                    this.recordedAudio = URL.createObjectURL(audioBlob);

                    // 更新状态
                    this.isRecording = false;

                    this.statusText = '录制完成';
                    this.statusClass = 'status';

                    // 停止可视化
                    cancelAnimationFrame(this.animationId);
                    this.drawBlankVisualizer();
                };

                // 开始录制
                this.mediaRecorder.start();
                this.isRecording = true;

                this.statusText = '正在录制...';
                this.statusClass = 'status recording';

                // 更新频道信息
                const audioTrack = stream.getAudioTracks()[0];
                const settings = audioTrack.getSettings();
                this.channelInfo = settings.channelCount || '未知';

                // 开始可视化
                this.drawVisualizer();

            } catch (error) {
                console.error('开始录制时出错:', error);
                this.statusText = '错误: ' + error.message;
                this.isRecording = false;
            }
        },

        stopRecording() {
            if (this.mediaRecorder && this.isRecording) {
                this.mediaRecorder.stop();

                // 断开所有音频连接
                if (this.microphone) {
                    this.microphone.disconnect();
                }

                // 停止所有音频轨道
                this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
            }
        },

        playRecordedAudio() {
            if (!this.recordedAudio) return;

            const audio = new Audio(this.recordedAudio);
            this.isPlaying = true;

            audio.onended = () => {
                this.isPlaying = false;
                this.statusText = '播放完成';
                this.statusClass = 'status';
            };

            this.statusText = '正在播放...';
            this.statusClass = 'status playing';

            audio.play();
        },

        downloadAudio() {
            if (!this.recordedAudio) return;

            const a = document.createElement('a');
            a.href = this.recordedAudio;
            a.download = `recording-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.wav`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        },

        drawVisualizer() {
            if (!this.analyser) return;

            const bufferLength = this.analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            const canvas = this.$refs.visualizerCanvas;
            const width = canvas.width;
            const height = canvas.height;

            const draw = () => {
                this.animationId = requestAnimationFrame(draw);

                this.analyser.getByteFrequencyData(dataArray);

                this.canvasCtx.fillStyle = 'rgb(0, 0, 0)';
                this.canvasCtx.fillRect(0, 0, width, height);

                const barWidth = (width / bufferLength) * 2.5;
                let barHeight;
                let x = 0;

                for (let i = 0; i < bufferLength; i++) {
                    barHeight = dataArray[i] / 2;

                    const hue = i / bufferLength * 360;
                    this.canvasCtx.fillStyle = `hsl(${hue}, 100%, 50%)`;
                    this.canvasCtx.fillRect(x, height - barHeight, barWidth, barHeight);

                    x += barWidth + 1;
                }
            };

            draw();
        },

        drawBlankVisualizer() {
            const canvas = this.$refs.visualizerCanvas;
            const width = canvas.width;
            const height = canvas.height;

            this.canvasCtx.fillStyle = 'rgb(0, 0, 0)';
            this.canvasCtx.fillRect(0, 0, width, height);

            this.canvasCtx.fillStyle = 'rgba(255, 255, 255, 0.1)';
            this.canvasCtx.font = '16px Arial';
            this.canvasCtx.textAlign = 'center';
            this.canvasCtx.fillText('音频可视化区域', width / 2, height / 2);
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-audio {}


.container {
    max-width: 800px;
    width: 100%;
    border-radius: 15px;
    padding: 25px;
    // box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    margin-top: 20px;
}

h1 {
    text-align: center;
    margin: 20px 0 20px 0;
    font-size: 2.2rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.section {
    margin-bottom: 25px;
    padding: 15px;
    background: rgba(0, 0, 0, 0.05);
    border-radius: 10px;
}

h2 {
    margin-bottom: 15px;
    color: #fdbb2d;
    font-size: 1.4rem;
}

select,
button {
    width: 100%;
    padding: 12px;
    margin: 8px 0;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    background: rgba(255, 255, 255, 0.9);
    color: #333;
    cursor: pointer;
    transition: all 0.3s ease;
}

select:hover,
button:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

button {
    background: #4CAF50;
    color: white;
    font-weight: bold;
}

button:disabled {
    background: #666;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
}

button.stop {
    background: #f44336;
}

button.play {
    background: #2196F3;
}

button.download {
    background: #FF9800;
}

.controls {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 15px;
}

.controls button {
    flex: 1;
    min-width: 120px;
}

.visualizer {
    width: 100%;
    height: 150px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    margin: 15px 0;
    overflow: hidden;
}

canvas {
    width: 100%;
    height: 100%;
}

.status {
    padding: 10px;
    text-align: center;
    font-weight: bold;
    margin-top: 10px;
    border-radius: 5px;
    background: rgb(230, 230, 230, );
}

.status.recording {
    background: rgba(244, 67, 54, 0.05);
    color: #ff8a80;
}

.status.playing {
    background: rgba(33, 150, 243, 0.05);
    color: #80d6ff;
}

.device-info {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    font-size: 0.9rem;
    color: #ccc;
}

@media (max-width: 600px) {
    .container {
        padding: 15px;
    }

    h1 {
        font-size: 1.8rem;
    }

    .controls button {
        min-width: 100%;
    }
}
</style>