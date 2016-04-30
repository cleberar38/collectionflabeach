var Header = React.createClass({displayName: "Header",
    render: function () {
        return (
            React.createElement("div", {className: "navbar navbar-default navbar-static-top", role: "navigation"}, 
                React.createElement("div", {className: "container"}, 
                    React.createElement("img", {className: "navbar-header"}, this.props.title)
                    // ,
                    // React.createElement("button", {className: "btn btn-primary logout-link"},"Register"),
                    // React.createElement("button", {className: "btn logout-link"},"Logout")
                )
            )
        );
    }
});

var Logo = React.createClass({displayName: "Logo",
    render: function () {
        return (
            React.createElement("div", {className: "center-block trim app-logo"}, 
                React.createElement("img", {src: "pics/logo.png", className: "logo-center image-logo"})
            )
        );
    }
});

var SearchBar = React.createClass({displayName: "SearchBar",
    searchKeyChangeHandler: function() {
        var searchKey = this.refs.searchKey.getDOMNode().value;
        this.props.searchKeyChange(searchKey);
    },
    clearText: function() {
        this.refs.searchKey.getDOMNode().value = "";
        this.props.searchKeyChange("");
    },
    render: function () {
        return (
            React.createElement("div", {className: "search-wrapper"}, 
                React.createElement("input", {type: "search", ref: "searchKey", className: "form-control", 
                    placeholder: "Enter a partial item, category, or name", 
                    value: this.props.searchKey, 
                    onChange: this.searchKeyChangeHandler}), 
                React.createElement("button", {className: "btn btn-link"}, React.createElement("span", {className: "glyphicon glyphicon-remove", "aria-hidden": "true", onClick: this.clearText}))
            )
        );
    }
});

var ProductList = React.createClass({displayName: "ProductList",
    getInitialState: function(){
        return(
            {
                submitTitle: "Done Collecting"
            }
        );
    },
    handleTitle: function(title){
        this.setState({
            submitTitle: title
        });
    },

    render: function () {
        
        var items = this.props.products.map(function (products, index) {
            return (
                React.createElement(ProductListItem, {productAction: this.props.productAction, product: products, searchKeyChange: this.props.searchKeyChange, onClick: this.props.onClick , showObjPli: this.props.showObj})
            );
        }.bind(this));
        return (
            React.createElement("div", {className: "container items-list"}, 
                React.createElement("div", {className: "row"}, 
                    items
                ),
                React.createElement(DoneCollection, {done: this.props.done, addDeleteBtnStatus: this.props.addDeleteBtnStatus, showHideHeader: this.props.showHideHeader, doneCollection: this.props.doneCollection, submitYourData: this.props.submitYourData, addOrRemoveAction: this.props.addOrRemoveAction, product: this.props.products, showObjAdi: this.props.showObj, showHideAdi: this.props.showHide, showHideDc: this.props.showHide, /*showObj: this.props.showObj, showHideDc: this.props.showHide,*/ title: this.state.submitTitle, changeTitle: this.handleTitle})
            )
        );
    }
});

var ProductListItem = React.createClass({displayName: "ProductListItem",
    handleCollection: function(evt){
        this.props.onClick(this.props.product);
    },
    linkHandler: function(e) {
        this.props.searchKeyChange(e.target.innerHTML);
    },
    render: function () {
        var links;
        if (this.props.product.tags) {
            var tags = this.props.product.tags.split(', ');
            links = tags.map(function(tag) {
                return React.createElement("a", {href: "#", className: "tag", onClick: this.linkHandler, key: this.props.product.id + '-' + tag}, tag);
            }.bind(this));
        }
        var divStyle = {"backgroundImage": "url('pics/" + this.props.product.image + "')"};
        return (
            React.createElement("div", {className: "col-lg-3 col-md-3 col-sm-3 col-xs-3 nopadding", key: this.props.product.id}, 
                React.createElement("button",{className: "btn "+this.props.showObjPli.btnState+" btn-icons", previousValues: this.props, onClick: this.handleCollection},

                    React.createElement("div", {className: "panel panel-default"}, 
                        React.createElement("div", {className: "panel-body"},
                            React.createElement("p", {className: "level"}, this.props.product.weight) 
                        )
                    ),
                    React.createElement("p", null, React.createElement("div", {className: "icon"}, this.props.product.itemname))
                )
            )
        );
    }
});

var DoneCollection = React.createClass({displayName: "DoneCollection",
    getInitialState: function(){
        return({
                subBtn: "btn-primary",
                submitdata: false,
                showCancelBtn: true,
                subDataBtn: "btn-primary btn-hidden",
                addDeleteBtnStatus: this.props.addDeleteBtnStatus

            }
        );
    },
    handleSubmission: function(btn){

        var totalItem = this.props.product.length;
        var prev = totalItem;

        console.log("handleSubmission props: ", this.props);
        console.log("handleSubmission state: ", this.state);

        if(btn.target.name == "submit-data"){
             this.setState({
                subBtn: "btn-primary btn-hidden",
                subDataBtn: "btn-success btn-hidden",
                submitdata: false,
                showCancelBtn: false,
                addDeleteBtnStatus: "btn-hidden"

            });
             this.props.done(true);
             if (this.props.done) {
            return (
                React.createElement(ThankYouMessage, {className: "login-view"})
            );
        }
        }
        
    },
    handleClick: function(evt){
        
        if(evt.target.name == "add"){
            this.props.showHideAdi({btnState: "btn-info"});
            this.props.addOrRemoveAction("add");
            this.props.changeTitle(this.props.doneCollection);
            this.setState({
                subBtn: "btn-primary",
                submitdata: false,
                subDataBtn: "btn-success btn-hidden"
            });
        }
        if(evt.target.name == "delete"){
            this.props.showHideAdi({btnState: "btn-danger"});
            this.props.addOrRemoveAction("delete");
            this.props.changeTitle(this.props.doneCollection);
            this.setState({
                subBtn: "btn-primary",
                submitdata: false,
                subDataBtn: "btn-success btn-hidden"
            });
        }
    },
    handleCollection: function(btn){
        var totalItem = this.props.product.length;
        var prev = totalItem;
        if(btn.target.name == "done-submit" && this.props.subBtn == "btn-success"){
            this.props.changeTitle(this.props.doneCollection);
            this.props.showHideDc({btnState:"btn-info"});
            this.setState({
                subBtn: "btn-primary",
                submitdata: false
            });
            this.props.addOrRemoveAction("add");
        }
        if(btn.target.name == "done-submit"){
            this.props.product.map(function(data,index){
                if(data.weight > 0){
                    prev -= 1;
                }
            });
            if(prev == totalItem){
                console.log("IT No item selected!");
                    this.props.changeTitle(this.props.doneCollection);
                    this.setState({
                        subBtn: "btn-primary",
                        submitdata: false
                    });
                    this.props.showHideDc({btnState: "btn-info"});
            }else{
                if(this.state.subBtn == "btn-primary"){
                    this.props.changeTitle(this.props.submitYourData);
                    this.setState({
                        submitdata: true
                    });

                    this.props.showHideDc({btnState: "btn-success"});
                    this.props.addOrRemoveAction("null");
                    this.setState({
                        subBtn: "btn-primary btn-hidden",
                        subDataBtn: "btn-success btn-shown",
                        submitdata: false
                    });
                }else{
                    if(prev == totalItem){
                        this.props.changeTitle(this.props.doneCollection);
                        this.setState({
                            subBtn: "btn-primary",
                            submitdata: false
                            
                        });
                        this.props.showHideDc({btnState: "btn-info"});
                        this.props.addOrRemoveAction("add");
                        React.render(React.createElement(ThankYouMessage, null), document.getElementById("main"));
                    }
                }
            }
        }
        if(btn.target.name == "cancel"){
            this.props.changeTitle(this.props.doneCollection);
            this.props.showHideDc({btnState:"btn-info"});
            this.setState({
                subBtn: "btn-primary",
                subDataBtn: "btn-success btn-hidden",
                submitdata: false,
                addDeleteBtnStatus: "btn-shown"
            });
            this.props.addOrRemoveAction("add");
        }
    },
    render: function(){
        var cancelBtn = this.state.showCancelBtn ? React.createElement("button",{name: "cancel", className: "btn btn-danger btn-block", onClick: this.handleCollection}, "Cancel") : null;
        return (
            
            React.createElement("hr", {className: ""}, 
                React.createElement("div", {className: "container add-delete-btn text-center"}, 
                    React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "btn-group btn-group-lg "+this.state.addDeleteBtnStatus+"", onClick: this.handleClick},
                                React.createElement("button", {className: "btn-primary", name: "add"}, "Add items3"),
                                React.createElement("button", {className: "btn-danger", name: "delete"}, "Delete items3"),
                                React.createElement("hr", {className: ""}), 
                                React.createElement("div", {className: "container collect-btn"}, 
                                    React.createElement("div", {className: "row"},
                                        React.createElement("div", {className: "btn-block", role: "group"},
                                            React.createElement("button",{name: "done-submit", className: "btn "+this.state.subBtn+" btn-block", productsBody: this.props.productsBody, items: this.props.items, onClick: this.handleCollection}, this.props.title),
                                            React.createElement("button",{name: "submit-data", className: "btn "+this.state.subDataBtn+" btn-block", productsBody: this.props.productsBody, items: this.props.items, onClick: this.handleSubmission}, this.props.title),
                                            cancelBtn
                                        )
                                )
                            )
                        )
                    )
                )
            )
                
        );
    }
});

var ThankYouMessage = React.createClass({displayName: "ThankYouMessage",
    render: function(){
        return ( 
            React.createElement("div", {},
                React.createElement(Header, {title: "Thank you!"}), 
                React.createElement("div", {className: "jumbotron"},
                    React.createElement("div", {className: "container"},
                        React.createElement("dl", {className: "text-left"},
                            React.createElement("dt", {className: "text-left"},
                                "Your clean is finished and sent to DB"
                            ),
                            React.createElement("dd", {className: "text-left"},
                                "Thank you for you participation! You have now collect X cleanups, and you've pick-up X"
                            ),
                            React.createElement("dd", {className: "text-left"},
                                "Fact: Recycling is the best way to help pollutants problem, save wildlife and help the eath. Keep-up the good work"
                            )
                        ),
                        React.createElement("dl", {className: "text-left"},
                            React.createElement("dt", {className: "text-left"}),
                            React.createElement("dd", {className: "text-left"})
                        ),
                        React.createElement("div", {className: ""})
                    )
                )
            )
        )
    }
});

var Paginator = React.createClass({displayName: "Paginator",
    render: function () {
        var pages = Math.ceil(this.props.total/this.props.pageSize);
        return (
            React.createElement("div", {className: "container"}, 
                React.createElement("div", {className: "row padding", style: {height: "40px"}}, 
                    React.createElement("div", {className: "col-xs-4 nopadding"}, 
                        React.createElement("button", {type: "button", className: "btn btn-default" + (this.props.page <= 1 ? " hidden" : ""), onClick: this.props.previous}, 
                            React.createElement("span", {className: "glyphicon glyphicon-chevron-left", "aria-hidden": "true"}), " Previous"
                        )
                    ), 
                    React.createElement("div", {className: "col-xs-4 text-center"}, 
                        React.createElement("div", {className: "legend"}, this.props.total, " items • page ", this.props.page, "/", pages)
                    ), 
                    React.createElement("div", {className: "col-xs-4 nopadding"}, 
                        React.createElement("button", {type: "button", className: "btn btn-default pull-right" + (this.props.page >= pages ? " hidden" : ""), onClick: this.props.next}, 
                        "Next ", React.createElement("span", {className: "glyphicon glyphicon-chevron-right", "aria-hidden": "true"})
                        )
                    )
                )
            )
        );
    }
});

var RegistrationForm = React.createClass({displayName: "RegistrationForm",
    getInitialState: function(){
        return {
            
        };
    },
    handleChange: function(evt){
        this.data[evt.target.name] = evt.target.value;
        
    },

    componentDidMount: function(){
        this.data = {};
    },
    toggleRegistrationLogin: function(){
        var self = this;

        /*
         * TODO: Create a Registration form
         * If user doesn't exist display the registration form
         * Allow the user to register a username and password
         * After the registration dismiss registration form and allow user to login
        */
        
        self.props.login(false);
        self.props.register(true);
    },
    handleRegistrationForm: function(){
        var self = this;
        console.log("Registration:");
        /*
         * TODO: Create a Registration form
         * If user doesn't exist display the registration form
         * Allow the user to register a username and password
         * After the registration dismiss registration form and allow user to login
        */
        productService.registerRequest(this.data)
            .success(function(response){
               
                //console.log("productService.loginRequest(this.data) :",response);
                //self.props.login(true);

            })
            .error(function(xhr, status, err){
                
                self.setState({
                   // errormessage: "Wrong Info buddy...!!!"
                });
            });

    },

    render: function(){
        var errorComponent = this.state.errormessage ? React.createElement("div",{className: "alert alert-danger"}, this.state.errormessage) : null;

        return(
            React.createElement("div",{className: ""},
                React.createElement(Header,{className: "", title: "Flager Beach - Register"}),
                React.createElement(Logo,{className: ""}),                
                React.createElement("div", {className: "container"},
                    React.createElement("div", {className: "row login-view"},
                        React.createElement("div", {className: "form-signin"}),
                        React.createElement("h2", {className: "form-signin-heading"}),
                        React.createElement("div", {className: "sr-only"}),
                        React.createElement("input", {type: "text", name: "username", onChange: this.handleChange, id:"inputEmail", className: "form-control", placeholder: "Email address", required: "", autofocus:""}),
                        React.createElement("div", {className: "sr-only"}),
                        React.createElement("input", {type: "password", name: "password", onChange: this.handleChange, id: "inputPassword", className: "form-control", placeholder: "Password", required:""}),
                        React.createElement("div", {className: "checkbox"}),
                        React.createElement("button", {className: "btn btn-lg btn-primary btn-block", type: "submit", onClick: this.handleRegistrationForm}, "Register"),
                        React.createElement("button", {className: "btn btn-primary logout-link", onClick: this.toggleRegistrationLogin},"Login"),
                        errorComponent
                    )
                )
            )
        );
    }
});

var LoginForm = React.createClass({displayName: "LoginForm",
    getInitialState: function(){
        return {
            errormessage: null
        };
    },
    handleChange: function(evt){
        this.data[evt.target.name] = evt.target.value;
        
    },

    componentDidMount: function(){
        this.data = {};
    },
    toggleLoginRegistration: function(){
        var self = this;

        /*
         * TODO: Create a Registration form
         * If user doesn't exist display the registration form
         * Allow the user to register a username and password
         * After the registration dismiss registration form and allow user to login
        */
        
        self.props.login(true);
        self.props.register(false);

    },
    handleLoginForm: function(){
        var self = this;

        /*
         *TODO: 
         *Create a ajax call to the server and check if the user exist.
         *If the user doesn't display a message on the screen that the username or password is not right
         *If the user exists run the func this.props.login to display the application
        */
        productService.loginRequest(this.data)
            .success(function(response){
               
                //console.log("productService.loginRequest(this.data) :",response);
                self.props.login(true);

            })
            .error(function(xhr, status, err){
                
                self.setState({
                    errormessage: "Wrong Info buddy...!!!"
                });
            });

    },

    render: function(){
        var errorComponent = this.state.errormessage ? React.createElement("div",{className: "alert alert-danger"}, this.state.errormessage) : null;

        return(
            React.createElement("div",{className: ""},
                React.createElement(Header,{className: "", title: "Flager Beach - Login"}),
                React.createElement(Logo,{className: ""}),                
                React.createElement("div", {className: "container"},
                    React.createElement("div", {className: "row login-view"},
                        React.createElement("div", {className: "form-signin"}),
                        React.createElement("h2", {className: "form-signin-heading"}),
                        React.createElement("div", {className: "sr-only"}),
                        React.createElement("input", {type: "text", name: "username", onChange: this.handleChange, id:"inputEmail", className: "form-control", placeholder: "Email address", required: "", autofocus:""}),
                        React.createElement("div", {className: "sr-only"}),
                        React.createElement("input", {type: "password", name: "password", onChange: this.handleChange, id: "inputPassword", className: "form-control", placeholder: "Password", required:""}),
                        React.createElement("div", {className: "checkbox"}),
                        React.createElement("button", {className: "btn btn-lg btn-primary btn-block", type: "submit", onClick: this.handleLoginForm}, "Login"),
                        React.createElement("button", {className: "btn btn-primary logout-link", onClick: this.toggleLoginRegistration},"Register"),
                        errorComponent
                    )
                )
            )
        );
    }
}); 

var App = React.createClass({displayName: "App",
    getInitialState: function() {
        return {
            searchKey: "",
            min: 0,
            max: 30,
            products: [],
            total: 0,
            page: 1,
            productAction: "add",
            doneCollection: "Done Collecting",
            submitYourData: "Submit your data",
            addDeleteBtnStatus: "btn-shown",
            showHide: {
                btnState: "btn-info",
                showAddDeleteBtn: "btn-shown",
                showCancelBtn: true,
                showSubmissionBtn: false,
                showDoneCollectionBtn: true,
                showReviewTitle: false,
                showMainTitle: true,
                showDate: false
            },
            isLogin: false,
            registerIsHidden: true,
            isDone: false
        }
    },
    toggleLogin: function(value){
        this.setState({
            isLogin: value
        });
    },
    toggleRegistration: function(value){
        this.setState({
            registerIsHidden: value
        });
    },
    toggleDone: function(value){
        this.setState({
            isLogin: value
        });
    },
    handleProductAction: function(action){
        this.setState({
            productAction: action
        });
    },
    propsAddDeleteFunc: function(){
        console.log("propsAddDeleteFunc App Parents");
    },
    handleShow: function(show){
        this.setState(
        {
            showHide: {
                btnState: show.btnState,
                showAddDeleteBtn: show.showAddDeleteBtn,
                showCancelBtn: show.showCancelBtn,
                showSubmissionBtn: show,
                showDoneCollectionBtn: show.showDoneCollectionBtn,
                showReviewTitle: show.showReviewTitle,
                showMainTitle: show.showMainTitle,
                showDate: show.showDate
            }
        });
    },
    componentDidMount: function() {
        this.findProducts();
    },
    componentDidUpdate: function(evt){


        this.updateItem();

        var w = $(".level");
        if(this.props.previousitems !== undefined   ){
            var previtems = this.props.previousitems.values;
            for(var j=0, lenj=previtems.length; j<lenj; j++){
                var itemkey = previtems[j].key;
                for(var i=0, leni= w.length; i<leni; i++){
                    var levelkey = $(w[i]).attr("data-reactid").split(".$")[1].split(".")[0];
                    if(itemkey == levelkey ){
                        var val = previtems[j].value;
                        $(w[i]).html(""+val+"");
                    }
                }
            }
        }
    },
    searchKeyChangeHandler: function(searchKey) {
        this.setState({searchKey: searchKey, page: 1}, this.findProducts);
    },
    rangeChangeHandler: function(values) {
        this.setState({min: values[0], max: values[1], page: 1}, this.findProducts);
    },

    

    findProducts: function() {
        productService.findAll({search: this.state.searchKey, min: this.state.min, max: this.state.max, page: this.state.page}).done(function(data) {
            this.setState({
                products: data.products,
                page: data.page,
                pageSize: data.pageSize,
                total: data.total
            });
        }.bind(this));
    },
    nextPage: function() {
        var p = this.state.page + 1;
        this.setState({page: p}, this.findProducts);
    },
    prevPage: function() {
        var p = this.state.page - 1;
        this.setState({page: p}, this.findProducts);
    },
    updateItem: function(){
        
    },
    addItem: function(product){
        var self = this;
        this.state.products.forEach(function(data){
            if(data.id == product.id){
                if(self.state.productAction == "add"){
                    data.weight  += 1;
                }else{
                    if(self.state.productAction == "delete"){
                        if(data.weight != 0 ){
                            data.weight  -= 1;
                        }
                    }
                }   
            }
        });
        this.setState({
            products: this.state.products
        });
    },
    render: function() {
        if (!this.state.isLogin) {
            return (
                React.createElement(LoginForm, {className: "login-view", register: this.toggleRegistration, login: this.toggleLogin})
            );
        }
        if (!this.state.registerIsHidden) {
            return (
                React.createElement(RegistrationForm, {className: "login-view", login: this.toggleLogin, register: this.toggleRegistration})
            );
        }

        

        return (

            React.createElement("div", null, 
                React.createElement(Header, {title: "Flager Beach - All Stars"}), 
                React.createElement("div", {className: "container"},
                    React.createElement("div", {className: "row"}, 
                        React.createElement("div", {className: "col-xs-6 col-md-4"},
                            React.createElement(Logo)
                        ),
                        React.createElement("div", {className: "col-xs-12 col-md-8 center-block trim"}, 
                            React.createElement(SearchBar, {searchKey: this.state.searchKey, searchKeyChange: this.searchKeyChangeHandler}) 
                        )
                    )
                ), 
                React.createElement(Paginator, {page: this.state.page, pageSize: this.state.pageSize, total: this.state.total, previous: this.prevPage, next: this.nextPage}), 
                React.createElement(ProductList, {done: this.toggleDone, addDeleteBtnStatus: this.state.addDeleteBtnStatus, doneCollection: this.state.doneCollection, submitYourData: this.state.submitYourData, showObj: this.state.showHide, showHide: this.handleShow, productAction: this.state.productAction, addOrRemoveAction: this.handleProductAction, products: this.state.products, total: this.state.total, searchKeyChange: this.searchKeyChangeHandler, onClick: this.addItem})
            )
        );
    }
});

React.render(React.createElement(App, null), document.getElementById('main'));
