const firstName=document.getElementById('firstName');
const lastName=document.getElementById('lastName');
const password=document.getElementById('password');
const confirmPassword=document.getElementById('confirmPassword');
const email=document.getElementById('email');
const btn=document.querySelector('.btn');

const form=document.getElementById('myForm');

//validation colors


const green='#4caf50';
const red='#f44336';

//handle form
form.addEventListener('submit',function(event){
    event.preventDefault();

    if(validateFirstName &&validateLastName&&validatePassword&&validateConfirmPassword&&validateEmail){
        //get the user name
        const name=firstName.value;
        const container=document.querySelector('div.container');
        const loader=document.createElement('div');

        loader.className='progress';

        const loadingBar=document.createElement('div');
        loadingBar.className='indeterminate';
        container.appendChild(loader)
        loader.appendChild(loadingBar);

        setTimeout(function(){
            const loaderDiv=document.querySelector('div.progress');

            const panel=document.createElement('div');      
            panel.className='card-panel green';
            const text=document.createElement('span');
            text.appendChild(document.createTextNode(  `Sign up successful, welcome to AntisocialApe ${name}`));
            panel.appendChild(text);
            container.replaceChild(panel,loaderDiv); 
        
        
        },1000)

    } 
})

//validators
function validateFirstName(){
    //check if is empty

    if(checkIfEmpty(firstName))return;

    //if it has only letters

    if(!checkIfOnlyLetters(firstName)) return;

    return true;
}



function validateLastName(){
    //check if is empty

    if(checkIfEmpty(lastName))return;

    //if it has only letters

    if(!checkIfOnlyLetters(lastName)) return;

    return true;
}
function validatePassword(){
    //epty check
    if(checkIfEmpty(password))return;

    //must be of certain length
    if(!meetLength(password,6,100))return;

    //check password against our character set

    //1-a
    //2-a 1

    //3- A a 1

    //4 A a 1 @

    if(!containsCharacters(password, 3)) return;
    if (!containsCharacters(email, 5)) return;

    return true;

}

function validateConfirmPassword(){
    if(password.className!=='valid'){
        setInvalid(confirmPassword,'password must be valid');
        return;
    }

    //check if they are similar

    if(password.value!==confirmPassword.value){
        setInvalid(confirmPassword,'Passwords much match');
        return;
    }else{
        setValid(confirmPassword);
    }

    return true;
}


function validateEmail(){
    if(checkIfEmpty(email)) return;
    if(!containsCharacters(email,5)) return;
    return true;
}

function checkIfEmpty(field){

    if(isEmpty(field.value.trim())){
        //set field invalid
        setInvalid(field,`${field.name} must not be empty`);
        return true;
    }else{
        //set field to valid
        setValid(field)

        return false;
    }
}

function isEmpty(value){
    if(value==='')
    { return true;}
        return false;

    


    
}

function setInvalid(field,message){
    field.className='invalid';
    field.nextElementSibling.innerHTML=message;
    field.nextElementSibling.style.color=red;
}

function setValid(field,message){
    field.className='valid';
    field.nextElementSibling.innerHTML=message;
    // field.nextElementSibiling.style.color=green;
}


function checkIfOnlyLetters(field){
    if(/^[a-zA-Z ]+$/.test(field.value)){
        setValid(field);
        return true;
    }else{
        setInvalid(field,`${field.name} must contain only letters`);
        return false;
    }
}

function meetLength(field, minLength, maxLength) {
    if (field.value.length >= minLength && field.value.length < maxLength) {
      setValid(field);
      return true;
    } else if (field.value.length < minLength) {
      setInvalid(
        field,
        `${field.name} must be at least ${minLength} characters long`
      );
      return false;
    } else {
      setInvalid(
        field,
        `${field.name} must be shorter than ${maxLength} characters`
      );
      return false;
    }
  }

function containsCharacters(field,code){

    let regEx;

    switch(code){
        case 1:
            //letters
            regEx = /(?=.*[a-zA-Z])/;
            return matchWithRegEx(regEx,field,'Must contain at least one letter');
        case 2:
            //letters and numbers

            regEx = /(?=.*\d)(?=.*[a-zA-Z])/;
            return matchWithRegEx(regEx,field,'Must contain at least one letter and one number ');

        case 3:
            //uppercase , lowercase, number
            // At least one uppercase letter, one lowercase letter and one number
            regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
            return matchWithRegEx(regEx,field,'Must contain at least one upper case, one lowercase and one number ');   
        case 4:
            //upper case, lowercase, number and special character
            // At least one uppercase letter, one lowercase letter, one number and one special character (symbol)
             regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
 
            
             return matchWithRegEx(regEx,field,"Must contain, one uppercase,one number, one lowercase and one special character");
        case 5:
            //email pattern;  
            regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return matchWithRegEx(regEx,field,"Must be avalid email address");
              

        default:
            return false
    }
}

function matchWithRegEx(regEx,field,message){
    if(field.value.match(regEx)){
        setValid(field);
        return true;
    }else{
        setInvalid(field,message);
        return false;
    }
}