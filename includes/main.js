$(document).ready(function(){
 // var main = $(this).attr("main-content");
 var upcount = 0;
 console.log("homepage is active");
 $.ajax({
      url:"pages/home.html",
      method:"post",
      data:{action:upcount},
      success:function(data){
           $('#main-content').html(data);
      }
 });

});

function study(subject){
  var subject = subject;
  var yearID = subject+'-year';
  var year = $('#'+yearID).val();
  var subjectName = subject;
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
             $('#main-content').html(data);
             $('#subject-header').html(subjectName+' - '+year);
             $('#objectives-instructions').html(objectivesInstructions);
             fetchJSON('contents/'+subject+'/'+year+'-obj.json');

        }
   });
};

function fetchJSON(link) {
  var link = link;
  var ourRequest = new XMLHttpRequest();
  ourRequest.open('GET', link);
  ourRequest.onload = function(){
    var ourData = JSON.parse(ourRequest.responseText);
    console.log(ourData);
    renderHTML(ourData);
  };
  ourRequest.send();
}

function renderHTML(data) {
  // var mainArea = getElementByID("main-area");
  var htmlString = '';
  for(i = 0; i < data.length; i++){
    if (data[i].type == 'quiz') {
      htmlString += '<div class="panel panel-default"><div class="panel-heading"><h4 class="panel-title"><a data-toggle="collapse" data-parent="#main-area" href="#collapse'+data[i].no+'" class="collapsed">#. '+data[i].question+' <i class="fa fa-angle-down right icon-collapsed"><span class="text-primary">Choose:</span></i><i class="fa fa-angle-up right icon-expanded"><span class="text-primary"></span></i><h5 class="text-primary">Choice:'+data[i].answer+'</h5></a></h4></div><div id="collapse'+data[i].no+'" class="panel-collapse collapse"><div class="panel-body"><form class=""><label><input type="radio" name="q1" value="A">A. '+data[i].options.A+' </label><br/><label><input type="radio" name="q1" value="B">B. '+data[i].options.B+' </label><br/><label><input type="radio" name="q1" value="C">C. '+data[i].options.C+' </label><br/><label><input type="radio" name="q1" value="D">D. '+data[i].options.D+' </label><br/><label><input type="radio" name="q1" value="">E. Alternate Answer </label></form></div></div></div>';

    } else if(data[i].type == 'instructions'){
      htmlString += '<p>'+data[i].note+'</p><br/>';
    }


  }


  // console.log($('#main-area'));
  // TODO:  $('#main-area').appendTo(htmlString);
  $('#main-area').html(htmlString);


}
