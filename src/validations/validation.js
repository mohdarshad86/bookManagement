const validate = function(a){
if(a.match (/^([a-z A-Z]){2,50}$/)) return true
}

const validateTitle = function(a){
if(a.match (/^[A-Za-z0-9\s\-_,\.:;()''""]+$/)) return true
}
// const validateObjectId = function(a){
//     if(a.match(/^[a-f\d]{24}$/i)) return true;
// }

const validateISBN= function(a){
    // if(a.match(/^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/i)) return true
    if(a.match(/^[0-9]+(-[0-9]+)+$/i)) return true
}

const validateEmail = function(a){
    if(a.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) return true
}

const validatePassword = function(a){
    if(a.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)) return true
}

const validatePhone = function(a){
    if(a.match(/^[6-9][0-9]{9}$/)) return true
}


module.exports={validate,validateTitle,validateISBN,validateEmail,validatePassword,validatePhone}