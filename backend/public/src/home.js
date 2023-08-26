$(document).ready(function() {
  "use strict";
  
    //$("#body").css({"height": "660px"});
    document.body.style.height= "900px";
  
    //document.body.style.height = screen.availHeight- 128 + "px";
    $("#body").css({"height":  "834px"});
  
  async function fetchingData() {
    let promise1= await fetch("http://localhost:3000/languages");
    let result= await promise1.json();
    let jsCodes= result.Javascript;
    let pyCodes= result.Python;
    let cCodes= result.C;
    let cppCodes= result.Cpp;
    for (var prop in jsCodes) {
      codeRenderer(jsCodes[prop].title, jsCodes[prop].code, "javascript", "accordion-inner-js");
    }
    for (var prop in pyCodes) {
      codeRenderer(pyCodes[prop].title, pyCodes[prop].code, "python", "accordion-inner-py");
    }
    for (var prop in cCodes) {
      codeRenderer(cCodes[prop].title, cCodes[prop].code, "c", "accordion-inner-c");
    }
    for (var prop in cppCodes) {
      codeRenderer(cppCodes[prop].title, cppCodes[prop].code, "cpp", "accordion-inner-cpp");
    }
  }
  fetchingData();
  
  /**
  @param {String} codeTitle Code snippet name
  @param {String} code Enter your code
  @param {String} language programming language name
  @param {String} accordionName name of accordion
  @return {void}
  */
  function codeRenderer(codeTitle, code, language, accordionName) {
    let codeList= code.split("\n");
    let preTag= document.createElement("pre");
    let codeTag= document.createElement("code");
    codeTag.classList.add(language);
    for (var prop in codeList) {
      codeTag.innerHTML+= codeList[prop]+ "\n";
    }
    preTag.append(codeTag);
    let codeBlock= document.createElement("div");
    codeBlock.classList.add("code-block");
    codeBlock.append(preTag);
    let title= document.createElement("h3");
    title.innerText= codeTitle;
    document.getElementById(accordionName).append(title, codeBlock);
  }
  $(".accordion").css("display", "none");
  document.querySelector("#show").onclick= function() {
    if ($("#autocomplete").val() ==="JavaScript") {
      $(".accordion").css("display", "none");
      $("#accordion-js").css("display", "block");
    } else if ($("#autocomplete").val() === "Python") {
      $(".accordion").css("display", "none");
      $("#accordion-py").css("display", "block");
    } else if ($("#autocomplete").val() === "C") {
      $(".accordion").css("display", "none");
      $("#accordion-c").css("display", "block");
    } else if ($("#autocomplete").val() === "C++") {
      $(".accordion").css("display", "none");
      $("#accordion-cpp").css("display", "block");
    } else if ($("#autocomplete").val() === "C#") {
      $(".accordion").css("display", "none");
      $("#accordion-cs").css("display", "block");
    } else if ($("#autocomplete").val() === "PHP") {
      $(".accordion").css("display", "none");
      $("#accordion-php").css("display", "block");
    } 
  };
  setTimeout(()=> {
  $("#accordion-inner-js").accordion({collapsible: true});
  $("#accordion-inner-c").accordion({collapsible: true});
  $("#accordion-inner-cpp").accordion({collapsible: true});
  $("#accordion-inner-cs").accordion({collapsible: true});
  $("#accordion-inner-php").accordion({collapsible: true});
  $("#accordion-inner-py").accordion({collapsible: true});
  
  $(".code-block").css("display","block")
  let langs= [
    "C", "C++", "C#", "Python", "PHP", "JavaScript"
  ];
  $("#autocomplete").autocomplete({
    source: langs,
  });
  }, 250);
});