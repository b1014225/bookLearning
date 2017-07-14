
function clickSentence(){

  $('.button_other').click(function(){　//workのopenとclose
  var $index=$('.button_other').index($(this));
  var $none=$('.figure-none').eq($index);
  if($none.hasClass('open')){
    $none.slideUp();
    $none.removeClass('open');

  } else{
    $none.slideDown();
    $none.addClass('open');
    $none.css('display','inline-block');
  }
});

};
clickSentence();


var obj = document.getElementsByClassName("description");
var length = obj.length;
 for(var i = 0; i < length;i++) {
   obj.item(i).onmouseover = function () {
   var element = document.createElement("div");
   element.innerHTML = this.getAttribute('data-text');
   console.log(this);
   element.className = "tooltips";
   this.appendChild(element);
   }
   obj.item(i).onmouseout = function () {
   this.removeChild(this.childNodes.item(this.childNodes.length - 1));
   }
 }

 var pages=document.getElementsByClassName('page');
 var page_length=pages.length;
 var menu=document.getElementById("tab_menuId");
 var elemLi=new Array(page_length);
 for(var i=0;i<page_length;i++){
   elemLi[i]=document.createElement('li');
   elemLi[i].innerHTML=''+sentenceId+'-'+(i+1)+'';
   elemLi[i].className='tab_menu';
   menu.appendChild(elemLi[i]);
 };

 elemLi[page_length-1].innerHTML='テスト';
 menu.appendChild(elemLi[page_length-1]);

 var elemA=document.createElement('a');
 elemA.href='/bookIndex';
 elemA.innerHTML='本の目次へ>>';
 menu.appendChild(elemA);
 elemA.className='href_bookIndex';

 $('.tab_menu').click(function(){
   for(var i =0;i<page_length;i++){
     var $page=$('.page').eq(i);
     if($page.hasClass('open')){
       $page.fadeOut();
       $page.removeClass('open');
     };
   };

   var $index=$('.tab_menu').index($(this));
   console.log($index);
   var $page=$('.page').eq($index);
   console.log($page);
   $page.fadeIn();
   $page.addClass('open');
 });
