window.AudioContext = window.AudioContext || window.webkitAudioContext;


window.onload=function(){
    let audioCtx = new AudioContext();    
    // 获取<audio>节点
    // 通过<audio>节点创建音频源
    // 将音频源关联到分析器
    // 将分析器关联到输出设备（耳机、扬声器）
    let audio = document.getElementById('myAudio');
    audio.src='Take_Me_Home_Country_Roads.mp3';
    audio.crossOrigin = 'anonymous';
    let source = audioCtx.createMediaElementSource(audio);
    let analyser = audioCtx.createAnalyser(); 
    // let gainNode = audioCtx.createGain();
    
    // gainNode.gain.value = 0.5;
    source.connect(analyser);
    // analyser.connect(gainNode);
    analyser.connect(audioCtx.destination);
    
    analyser.fftSize = 512;

    // source.connect(audioCtx.destination)
    let bufferLength = analyser.frequencyBinCount; 
    let dataArray = new Uint8Array(bufferLength);   // Uint8Array 的长度应该和 frequencyBinCount 相等
    
    analyser.getByteTimeDomainData(dataArray);
    console.log(dataArray)    
    
    let canvas = document.getElementById("myCanvas");
    console.log(canvas)
    let ctx = canvas.getContext("2d");
    if (canvas.getContext){
        console.log("aaa");
    }
    console.log("bbb");
    let WIDTH = canvas.width;
    let HEIGHT = canvas.height;
    let barWidth = WIDTH/ bufferLength;
    let barHeight;
    console.log("bufferLength",bufferLength);
    
    ctx.fillRect(0,0,23,23);
    
    function renderFrame(){
        let dataArray = new Uint8Array(bufferLength); 
        analyser.getByteFrequencyData(dataArray);
        // analyser.getByteTimeDomainData(dataArray);
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
    
        //console.log(dataArray);
        for(let i=0,x=0; i<bufferLength; i++){
            barHeight  = dataArray[i]/16;
    
            let r = barHeight + 25*(i/bufferLength);
            let g = 250*(i/bufferLength);
            let b = 50;
    
            ctx.fillStyle = "rgb("+r+","+g+","+b+")";
            ctx.fillRect(x,HEIGHT-barHeight,barWidth,barHeight)
            x +=barWidth+2;
        }
    
        requestAnimationFrame(renderFrame);
    }
    audio.volume = 0.3;
    audio.play(); 
    // 开始播放
    
    renderFrame();
    console.log("over");
}

//init

//start

//pause

//continue;

//next

//prev




// var oscillator = audioCtx.createOscillator();
// var gainNode = audioCtx.createGain();
// oscillator.connect(gainNode);
// gainNode.connect(audioCtx.destination);
// oscillator.type = 'sine';
// oscillator.frequency.value = 196.00;
// gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
// gainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.01);
// oscillator.start(audioCtx.currentTime);
// gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1);
// oscillator.stop(audioCtx.currentTime + 1);    



//         let canvas = document.getElementById("myCanvas");
//         canvasCtx = canvas.getContext("2d");
//         // //获取API
//         var AudioContext = AudioContext || webkitAudioContext;
//         let audioCtx = new AudioContext;
//         audioElement = document.querySelector('myAudio');
//         // audioElement.crossOrigin="anonymous"; w无效
//         // //加载媒体
//         let audio = new Audio("童年.mp3");
//         audioSource = audioCtx.createMediaElementSource(audio);
    
//         //创建分析器
//         analyser = audioCtx.createAnalyser();    
//         //快速傅里叶变换参数
//         analyser.fftSize = 256;    
//         //bufferArray长度
//         bufferLength = analyser.frequencyBinCount;
//         //创建bufferArray，用来装音频数据
//         dataArray = new Uint8Array(bufferLength);
        


//         // //连接：source → analyser → destination
//         // source.connect(analyser);
//         // analyser.connect(context.destination);

//         //创建处理器，参数分别是缓存区大小、输入声道数、输出声道数
//         scriptProcessor = audioCtx.createScriptProcessor(2048, 1, 1);
        
//         audioSource.connect(analyser);
//         analyser.connect(audioCtx.scriptProcessor);
//         //分析器连接处理器，处理器连接扬声器
//         analyser.connect(scriptProcessor);
//         scriptProcessor.connect(audioCtx.destination);    




//         let oscillator = audioCtx.createOscillator();
//         let gainNode = audioCtx.createGain();

//         gainNode.gain.value = 0.5;  // 音量 0~1
//         oscillator.type = 'sine';   // 振荡器输出正弦波
//         oscillator.frequency.value = 200;  // 振荡频率200Hz  
    

//         oscillator.connect(gainNode);    // 发生源振荡器连接音量
//         gainNode.connect(audioCtx.destination); //音量连接扬声器
//         oscillator.start();
//         oscillator.stop(audioCtx.currentTime + 100000); 
//         // initAnalyser () {
// 	//创建分析器
//      analyser = audioCtx.createAnalyser();
//     //快速傅里叶变换参数
//     analyser.fftSize = 256;
//     //bufferArray长度
//     bufferLength = analyser.frequencyBinCount;
//     //创建bufferArray，用来装音频数据
//     dataArray = new Uint8Array(bufferLength);
//     audioSource.connect(analyser)

// // initScriptProcessor () {
// 	//创建处理器，参数分别是缓存区大小、输入声道数、输出声道数
//     scriptProcessor = audioCtx.createScriptProcessor(2048, 1, 1);
//     //分析器连接处理器，处理器连接扬声器
//     analyser.connect(scriptProcessor);
//     scriptProcessor.connect(audioCtx.destination);
// // }
//     scriptProcessor.onaudioprocess = draw; 




//     function draw () {
//         let cWidth = canvas.width,
//             cHeight = canvas.height,
//             barWidth = parseInt(.5 * cWidth / bufferLength),
//             barHeight,
//             x = 0;
//         canvasCtx.clearRect(0, 0, cWidth, cHeight);
//         //分析器获取音频数据“切片”
//         analyser.getByteFrequencyData(dataArray);
        
//         //把每个音频“切片”画在画布上
//         for (var i = 0; i < bufferLength; i++) {
//             barHeight = parseInt(0.4 * dataArray[i]);
//             canvasCtx.fillRect(x, cHeight - barHeight, barWidth, barHeight);
//             x += barWidth + 3;
//         }
//     }
// //获取API
// var AudioContext = AudioContext || webkitAudioContext;
// var context = new AudioContext;
// var context = new AudioContext;
// var audio = new Audio("童年.mp3");
// //加载媒体

// //创建节点
// var source = context.createMediaElementSource(audio);
// var analyser = context.createAnalyser();
// //连接：source → analyser → destination
// source.connect(analyser);
// analyser.connect(context.destination);
// //创建数据
// var output = new Uint8Array(360);
// var source = context.createBuffer;
// audio.start(0);

// (function drawSpectrum() {
//     analyser.getByteFrequencyData(output);//获取频域数据
//     // cxt.clearRect(0, 0, wrap.width, wrap.height);
//     // //画线条
//     // for (var i = 0; i < 360; i++) {
//     //     var value = output[i] / 8;//<===获取数据
//     //     cxt.beginPath();
//     //     cxt.lineWidth = 2;
//     //     cxt.moveTo(300, 300);
//     //     //R * cos (PI/180*一次旋转的角度数) ,-R * sin (PI/180*一次旋转的角度数)
//     //     cxt.lineTo(Math.cos((i * 1) / 180 * Math.PI) * (200 + value) + 300, (- Math.sin((i * 1) / 180 * Math.PI) * (200 + value) + 300));
//     //     cxt.stroke();
//     // }
//     // //画一个小圆，将线条覆盖
//     // cxt.beginPath();
//     // cxt.lineWidth = 1;
//     // cxt.arc(300, 300, 200, 0, 2 * Math.PI, false);
//     // cxt.fillStyle = "#fff";
//     // cxt.stroke();
//     // cxt.fill();

//     //请求下一帧
//     console.log('111111111111');
//     requestAnimationFrame(drawSpectrum);
// })();