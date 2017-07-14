



//var slides=['/images/book-image2.jpeg','/images/book-image3.jpeg','/images/book-image4.jpeg','/images/book-image5.jpeg','/images/book-image6.jpeg','/images/itou.jpg'];
var count=0;

function nextButton(){//右のボタン
  count++;
  if(count>slides.length-1){
    count=0;
  }

  changeImg(count);
}

function prevButton(){//左のボタン
  count--;
  if(count<0){
    count=slides.length-1;
  }

  changeImg(count);
}


function changeImg(count){
  var fadein=document.getElementById('slides').src=slides[count];
  var index = document.getElementsByClassName('slideIndex');

  for(var i =0;i<slides.length;i++){
    if(i==count){
      index[i].style.backgroundColor='#FF6860';
    }else{
      index[i].style.backgroundColor='#FFF';
    }
  }
}
