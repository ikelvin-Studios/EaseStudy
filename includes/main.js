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

  console.log("Study button Clicked");
  // var subject = $(this).attr("subject");
  console.log(subject);
  console.log(year);
   // $.ajax({
   //      url:"pages/quiz.html",
   //      method:"post",
   //      data:{action:subject},
   //      success:function(data){
   //           $('#main-content').html(data);
   //      }
   // });
};
