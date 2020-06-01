var objSet = [];

var studentName = '';
var recordList = [];
var mode = "interactive";

var subjectName = '';
var subjectYear = '';

$(document).ready(function(){
 // var main = $(this).attr("main-content");
 // Show the Modal on load
checkAccount();
activateMode();
console.log("What is mode again: "+mode);
 var upcount = 0;

 console.log("homepage is active");
 $.ajax({
      url:"pages/home.html",
      method:"post",
      data:{action:upcount},
      success:function(data){
           $('#main-contentArea').html(data);
      }
 });

});

function study(subject){
  var subject = subject;
  var yearID = subject+'-year';
  var year = $('#'+yearID).val();
  subjectName = subject;
  subjectYear = year;
  var subjectNotice = "let's solve the awesome quiz below.";
  var objectivesInstructions = "Choose from the multi-choice options";
  var writtenInstructions = "Solve This At Your Own Pace";
  if (subject=='english') {
    subjectName = 'English Language';
  } else if(subject=='maths') {
    subjectName = 'Core Mathematics';
  } else if(subject=='science') {
    subjectName = 'Integrated Science';
  } else if(subject=='social') {
    subjectName = 'Social Studies';
  } else {
    subjectName = subjectName;
  }
  console.log("Study button Clicked");
  // var subject = $(this).attr("subject");
  console.log(subject);
  console.log(year);
   $.ajax({
        url:"pages/quiz.html",
        method:"post",
        data:{action:subject},
        success:function(data){
             $('#main-contentArea').html(data);
             $('#subject-header').html(subjectName+' - '+year);
             $('#objectives-instructions').html(objectivesInstructions);
             fetchJSON('contents/'+subject+'/'+year+'-', 'obj.json');
             fetchJSON('contents/'+subject+'/'+year+'-', 'written.json');


        }
   });
};

function fetchJSON(linkHead, file) {
  var linkHead = linkHead;
  var file = file;
  var link = linkHead+file;
  var ourRequest = new XMLHttpRequest();
  ourRequest.open('GET', link);
  ourRequest.onload = function(){
    var ourData = JSON.parse(ourRequest.responseText);
    // console.log(ourData);
    renderHTML(ourData);
  };
  ourRequest.send();
}

function renderHTML(data) {
  // var mainArea = getElementByID("main-area");
  var htmlString = '';
  var countNo = 1;
  var length = data.length;
  for(i = 0; i < length; i++){

    var optionE = '';
    // if (!data[i].options.E) {
    //   optionE = '<br/><label><input type="radio" name="obj-q'+data[i].no+'" value="E">E. '+data[i].options.E+' </label>';
    // }
    if (data[i].type == 'quiz') {
      var objObject = {
        "num" : countNo,
        "no" : data[i].no,
        "answer" : data[i].answer,
        "choice" : "",
        "mark" : 0
      };
      objSet.push(objObject);
      //console.log(objSet);

      htmlString += '<div class="panel panel-default"><div class="panel-heading"><h4 class="panel-title"><a data-toggle="collapse" data-parent="#main-area" href="#collapse'+data[i].no+'" class="collapsed">#'+countNo+'. '+data[i].question+' <i class="fa fa-angle-down right icon-collapsed"><span class="text-primary">Choose:</span></i><i class="fa fa-angle-up right icon-expanded"><span class="text-primary"></span></i><h5 class="text-primary">Choice:<span id="choice-q'+data[i].no+'"></span></h5></a></h4></div><div id="collapse'+data[i].no+'" class="panel-collapse collapse"><div class="panel-body"><form class=""><label><input type="radio" name="obj-q'+data[i].no+'" value="A" onclick="choose(\'A\', '+countNo+')">A. '+data[i].options.A+' </label><br/><label><input type="radio" name="obj-q'+data[i].no+'" value="B" onclick="choose(\'B\', '+countNo+')">B. '+data[i].options.B+' </label><br/><label><input type="radio" name="obj-q'+data[i].no+'" value="C" onclick="choose(\'C\', '+countNo+')">C. '+data[i].options.C+' </label><br/><label><input type="radio" name="obj-q'+data[i].no+'" value="D" onclick="choose(\'D\', '+countNo+')">D. '+data[i].options.D+' </label>'+optionE+'</form></div></div></div>';

      countNo++;
    } else if(data[i].type == 'instructions'){
      htmlString += '<br/><p>'+data[i].note+'</p><br/>';
    } else if(data[i].type == 'essay'){
        htmlString += '<div class="panel panel-default"><div class="panel-body"><p class="panel-content">#'+countNo+'. '+data[i].problem+'</p></div></div>';
        countNo++;
    } else if(data[i].type == 'title'){
      htmlString += '<br/><center><h3><b>'+data[i].note+'<b></h3></center><br/>';
    }



  }

  // TODO: View AssessMent Button
  htmlString += '<div class="margin-bottom-30"></div><button onclick="viewAssessment()" data-toggle="modal" data-target="#assessModal" class="btn btn-primary btn-block"><i class="fa fa-eye"></i> VIEW ASSESSMENT</button>';
  // return htmlString;
  // console.log($('#main-area'));
  // TODO:  $('#main-area').appendTo(htmlString);
  // $('#main-area').html(htmlString);

  $(htmlString).appendTo('#main-area')
}

function choose(choice, num){
  var choice = choice;
  var num = num;
  var findNum = num-1;
  var choiceSpot = "choice-q"+objSet[findNum].no;
  objSet[findNum].choice = choice;
   $('#'+choiceSpot).html(choice);
  // var quizObject = objSet[findNum];
  if (choice == objSet[findNum].answer) {
    objSet[findNum].mark = 1;
    console.log("Correct Choice");
    toastr['success']("Correct Choice");

  } else {
    objSet[findNum].mark = 1;
    console.log("Wrong Choice");
    toastr['error']("Wrong Choice");
  }
  console.log("#"+num+" Answer Chosen: "+choice);
}
