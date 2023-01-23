const validate= function(a){
if(a.match (/^([a-z A-Z $@&:]){2,50}$/)) return true
}


const validateObjectId =function(a){
    if(a.match(/^[a-f\d]{24}$/i)) return true;
}

const validateISBN= function(a){
    if(a.match(/^.*(?=.{10,13})(?=.*\d).*/)) return true
}

module.exports={validate,validateObjectId,validateISBN}