//点击开始游戏，动态生成100个小格，100个div
//leftclick 没有雷，显示数字（代表以按当前小格为中心周围8个格的雷数 扩散（当前周围8个没有雷）
//          有雷，直接游戏结束
//rightclick 有标记，取消标记，如果没有标记并且没有数字，就标记  判断标记是否正确，10个都正确标记，提示成功
//已经出现数字，无效果
window.onload = function(){
    var startBtn = document.getElementById('btn');
    var box = document.getElementById('box');
    var flagBox = document.getElementById('flagBox');
    var alertBox = document.getElementById('alertBox');
    var alertImg = document.getElementById('alertImg');
    var closeBtn = document.getElementById('close');
    var score = document.getElementById('score');
    var minesNum;
    var mineOver;
    var block;
    var mineMap = [];
    var startGmaeBool = true;
    bindEvent();
    function bindEvent(){
        startBtn.onclick = function(){
            if(startGmaeBool){
                box.style.display = 'block';
                flagBox.style.display = 'block';
                init();
                startGmaeBool = false;
            }
        }
        box.oncontextmenu = function(){
            return false;
        }
        box.onmousedown = function(e){
            var event = e.target;
            if(e.which == 1){
                leftClick(event);
            }else if(e.which == 3){
                rightClick(event);
            }
        }
        closeBtn.onclick = function(){
            alertBox.style.display = 'none';
            // flagtBox.style.display = 'none';
            box.style.display = 'none';
            box.innerHTML = '';
            startGmaeBool = true;
        }
    }
    function init(){
        minesNum=10;
        mineOver=10;
        score.innerHTML = mineOver;
        for(var i=0; i<10; i++){
            for(var j=0;j<10;j++){
                var con=document.createElement('div');
                con.classList.add('block');
                con.setAttribute('id',i+'-'+j);
                box.appendChild(con);
                mineMap.push({mine:0});
            }
        }
        block = document.getElementsByClassName('block');
        while(minesNum){
            var mineIndex = Math.floor(Math.random()*100);
            if(mineMap[mineIndex].mine === 0){
                mineMap[mineIndex].mine = 1;
                block[mineIndex].classList.add('islei');
                minesNum --;
            }
        }
    }
    function leftClick(dom){
        if(dom.classList.contains('flag')){
            return;
        }
        var islei = document.getElementsByClassName('islei');
        if(dom && dom.classList.contains('islei')){
            console.log('gameOver');
            for(var i= 0;i < islei.length; i ++){
                islei[i].classList.add('show');
            }
            setTimeout(function(){
                alertBox.style.display = 'block';
                alertImg.style.backgroundImage = 'url("img/over.jpg")';
            },800)
        }else{
            var n = 0;
            var posArr = dom && dom.getAttribute('id').split('-');
            var posX = posArr && +posArr[0];
            var posY = posArr && +posArr[1];
            dom && dom.classList.add('num');
            for(var i = posX - 1 ;i <= posX + 1 ; i++){
                for(var j = posY - 1; j <= posY + 1; j++){
                    var aroundBox = document.getElementById(i + '-' + j);
                    if(aroundBox && aroundBox.classList.contains('islei')){
                        n++;
                    }
                }
            }
            dom && (dom.innerHTML = n);
            if(n == 0){
                for(var i = posX - 1; i <= posX + 1; i++){
                    for(var j = posY - 1; j <= posY + 1; j++){
                        var nearBox = document.getElementById(i + '-' + j);
                        if(nearBox && nearBox.length != 0){
                            if(!nearBox.classList.contains('check')){
                                nearBox.classList.add('check');
                                leftClick(nearBox);
                            }
                        }
                    }
                }
            }
        }
    }
    function rightClick(dom){
        if(dom.classList.contains('num')){
            return;
        }
        dom.classList.toggle('flag');
        if(dom.classList.contains('islei') && dom.classList.contains('flag')){
            mineOver --;
        }
        if(dom.classList.contains('islei') && !dom.classList.contains('flag')){
            mineOver ++;
        }
        score.innerHTML = mineOver;
        if(mineOver == 0){
            alertBox.style.display = 'block';
            alertImg.style.display = 'url("img/success.png")';
        }
    }
}
