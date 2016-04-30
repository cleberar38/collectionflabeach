productService = (function () {

    var baseURL = "";

    // The public API
    return {
        findAll: function(values) {
            return $.ajax({
                url: baseURL + "/products", 
                data: values
            });
        },

        findById: function(id) {
            return $.ajax(baseURL + "/products/" + id);
        },
        
        updateAll: function(values){
            
            return $.ajax({
                type: "POST",
                url: baseURL + "/update",
                data: values,
                dataType: "json",
                sucess: function(data){
                    // console.log(data);
                }
            });
        },
        
        loginRequest: function(values){
            
            return $.ajax({
                type: "POST",
                url: baseURL + "/login",
                data: values
                //dataType: "json",
                //success: function(result){
                //    console.log("loginRequest: ",result)
                //}
            });
        },

        registerRequest: function(values){
            return $.ajax({
                type: "POST",
                url: baseURL + "/register",
                data: values
            });
        } 
    };

}());