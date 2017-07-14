var number=0;
var number2=0;
function checkTest1(testTitle,Answer){
  var cf=document.getElementById('cf');
  var elemDiv=new Array(3);
  for(var i=0;i<3;i++){
    elemDiv[i]=document.createElement('div');
  }
  elemDiv[0].className='testList';
  elemDiv[1].className='test-button';
  elemDiv[1].innerHTML='チェック';
  elemDiv[2].className='success';
  var elemH3=document.createElement('h3');

  cf.appendChild(elemDiv[0]);
  var tl=document.getElementsByClassName('testList')[number];
  elemH3.innerHTML=testTitle;
  tl.appendChild(elemH3);
  var elemInput=document.createElement('input');
  elemInput.type='text';
  elemInput.name='answer_text';
  tl.appendChild(elemInput);
  elemDiv[1].onclick=check.bind(elemDiv[1],1,Answer,number);
  tl.appendChild(elemDiv[1]);
  tl.appendChild(elemDiv[2]);
  number++;
};

function checkTest2(testTitle,Answer,a1,a2,a3,a4){
  var cf=document.getElementById('cf');
  var elemDiv=new Array(3);
  for(var i=0;i<3;i++){
    elemDiv[i]=document.createElement('div');
  }
  elemDiv[0].className='testList2';
  elemDiv[1].className='test-button';
  elemDiv[1].innerHTML='チェック';
  elemDiv[2].className='success2'
  var elemH3=document.createElement('h3');

  cf.appendChild(elemDiv[0]);
  var tl=document.getElementsByClassName('testList2')[number2];
  elemH3.innerHTML=testTitle;
  tl.appendChild(elemH3);
  var elemInput =new Array(4);
  var a=[a1,a2,a3,a4];
  for(var i=0;i<4;i++){
    elemInput[i]=document.createElement('input');
    elemInput[i].type='radio';
    elemInput[i].name='answer_radio';
    elemInput[i].value=a[i];
    tl.appendChild(elemInput[i]);
    var elemRadioTitle=document.createElement('p');
    elemRadioTitle.className='RadioTitle';
    elemRadioTitle.innerHTML=a[i];
    tl.appendChild(elemRadioTitle);
  }
  elemDiv[1].onclick=check.bind(elemDiv[1],2,Answer,number2);
  tl.appendChild(elemDiv[1]);
  tl.appendChild(elemDiv[2]);
  number2++;
};

function check(testType,Answer,number){
  if (testType==1){
    var textName=document.getElementsByName('answer_text');
    var answer=textName[number].value;
    var success=document.getElementsByClassName('success');;
    if(answer==Answer){
      success[number].innerHTML='正解';
    }else　if(answer==''){
      success[number].innerHTML='※何か記入してください';
    }else{
      success[number].innerHTML='不正解';
    }
  }else if(testType==2){
    var radioName=document.getElementsByName('answer_radio');
    for(var i=0;i<radioName.length;i++){
      if(radioName[i].checked){
        answer=radioName[i].value;
      };
    };
    var result_message =document.getElementsByClassName("success2");
    if(answer==Answer){
      result_message[number].innerHTML="正解";
    }else if(answer==''){
      result_message[number].innerHTML="※どれか一つ選択してください";
    }else{
      result_message[number].innerHTML="不正解";
    };
  }
};
