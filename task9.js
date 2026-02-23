$(document).ready(function(){

const form=$("#dynamicForm");

$.getJSON("task9.json", function(formJSON){

    
    formJSON.forEach(field=>{

        let html=`<label>${field.label}</label>`;

        if(field.type==="select"){
            html+=`<select id="${field.id}" class="${field.class||""}">
            ${field.options.map(o=>`<option value="${o}">${o}</option>`).join("")}
            </select>`;
        }
        else if(field.type==="checkbox"){
            html+=`<input type="checkbox" id="${field.id}">`;
        }
        else{
            html+=`<input type="${field.type}" id="${field.id}" class="${field.class||""}">`;
        }

        html+=`<div class="error" id="${field.id}Error"></div>`;
        form.append(html);
    });

    form.append(`<button type="submit">Register</button>`);


    
    $(document).on("change","#country",function(){
        if($(this).val()==="India") $("#state").removeClass("hidden");
        else $("#state").addClass("hidden");
    });

    
    $(document).on("change","#student",function(){
        if(this.checked) $("#college").removeClass("hidden");
        else $("#college").addClass("hidden");
    });

});

// validation_check
$(document).on("submit","#dynamicForm",function(e){

    e.preventDefault();
    $(".error").text("");
    let valid=true;

    if(!$("#name").val()){
        $("#nameError").text("Name required"); valid=false;
    }

    let email=$("#email").val();
    if(!email.match(/^\S+@\S+\.\S+$/)){
        $("#emailError").text("Valid email required"); valid=false;
    }

    if($("#password").val().length<=8){
        $("#passwordError").text("Min 8 characters"); valid=false;
    }

    if($("#country").val()==="Select"){
        $("#countryError").text("Choose country"); valid=false;
    }

    if($("#country").val()==="USA" && !$("#state").val()){
        $("#stateError").text("State required"); valid=false;
    }

    if($("#student").is(":checked") && !$("#college").val()){
        $("#collegeError").text("Enter college name"); valid=false;
    }

    if(valid) alert("Form submitted successfully!");

});

});