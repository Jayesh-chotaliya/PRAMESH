import React from "react";


export const Url = () =>
{
    var answer = window.location.href;
    const answer_array = answer.split('/');
    if (answer_array[2] == 'localhost:3000') {
        var url = 'http://localhost/pramesh/backend/api/all_banner_get';
    }
    else {
        var url = 'http://pramesh.justcodenow.com/backend/api/all_banner_get';
    }
    
    // SET_PRODUCTS: url;
    
    
}

// export default Url;