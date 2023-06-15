$(document).ready(function(){
  fetchAsyncData()

  $(".ans-btn").on('click', function(event){ 
    console.log($(this).attr("id"));

    if($(this).data('answer') === answer){
      console.log("correct nas");
      $("#" + $(this).attr("id")).css({
        "backgroundColor": "lightgreen",
        "color" : "black"

      })
      $(".btn").attr('disabled', 'true')
      $(".py-5.text-center").css("cursor", "no-drop")
      $("#nxt-btn").css("display", "initial")
      $("#nxt-btn").removeAttr("disabled")
      
    }
    else{
      console.log("wrong");
      $("#" + $(this).attr("id")).css({
        "backgroundColor" : "red",
        "color" : "black",
        
        
      })
      $(".btn").attr('disabled', 'true')
      $(".py-5.text-center").css("cursor", "no-drop")
      $("#nxt-btn").css("display", "initial")
      $("#nxt-btn").removeAttr("disabled")
      $("#nxt-btn").text("Try Again")
      console.log($(this).attr("id"));
    }


  })

  $("#nxt-btn").click(function(){
    fetchAsyncData()
    $(".btn").removeAttr('disabled')
    $(".py-5.text-center").css("cursor", "pointer")
    $(".ans-btn").css('background-color', 'initial')
    $(this).css('display', 'none')

    

  })

})


// To feth the data from .json file
function fetchData(){
  return new Promise((res, err)=>{
    const data = fetch("./data.json").then(response => response.json())
    res(data)
  })
}

// Generatign random indexes for country and correct/wrong anwers

function gettingRandomNums(data){
  const max = data.length
  const countryIndex = Math.round(Math.random() * max) //Index for country
  answer = data[countryIndex].city //Global variable for correct answer
  $("#country").text(data[countryIndex].country)
  
  const wrongAns = []
  
  for (var i=0; i<3; i++){
    let wrongIndex = Math.round(Math.random() * max)
    if(wrongIndex !== countryIndex){
      wrongAns.push(data[wrongIndex].city)
    }
    else{
      let wrongIndex = Math.round(Math.random() * max)
      wrongAns.push(data[wrongIndex].city)
      console.log('mismatched');
    }
  }
  
  var correctIndex = Math.round(Math.random() * 4)
  
  wrongAns.splice(correctIndex -1, 0 , data[countryIndex].city)
  
  const answerBox = document.getElementsByClassName("opt")
  const btn = document.getElementsByClassName("btn")
  
  for(let count = 0; count < answerBox.length; count++){
    answerBox[count].innerHTML = wrongAns[count]
    btn[count].setAttribute("data-answer", wrongAns[count])
  }
  
  console.log("Correct Answer: " , data[countryIndex].city);
}



async function fetchAsyncData(){
  try{
    
    const data = await fetchData()
    gettingRandomNums(data)
    
  }  
  catch (err){
    console.log(err);

  }
}

