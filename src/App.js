import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

require("es6-promise").polyfill();
require("isomorphic-fetch");

// FRONT DESIGN
// const HomePage = React.lazy(() =>
//   import("./components/Front/HomePage/HomePage")
// );

const Addtocart   = React.lazy(() => import("./components/Front/Addtocart/Addtocart"));
const PageNotFound = React.lazy(() => import("./components/Front/Errorpage/Errorpage"));
const Checkout = React.lazy(() => import("./components/Front/Checkout/Checkout"));
const Verifyotp = React.lazy(() => import("./components/Front/Verifyotp/Verifyotp"));
const Viewcart = React.lazy(() => import("./components/Front/Viewcart/Viewcart"));


const Register = React.lazy(() =>
  import("./components/Front/Register/Register")
);
const Login = React.lazy(() => import("./components/Front/Login/Login"));

const MainCategory = React.lazy(() => {
  return new Promise((resolve) => {
    setTimeout(
      () => resolve(import("./components/Front/HomePage/Maincategory")),
      2000
    );
  });
});

const HomePage = React.lazy(() => {
  return new Promise((resolve) => {
    setTimeout(
      () => resolve(import("./components/Front/HomePage/HomePage")),
      1500);
  });
});

const AllProduct = React.lazy(() => {
  return new Promise((resolve) => {
    setTimeout(
      () => resolve(import("./components/Front/Product/AllProduct")),
      1500);
  });
});




const Product_listing = React.lazy(() => {
  return new Promise((resolve) => {
    setTimeout(
      () => resolve(import("./components/Front/Product/Product_listing")),
      2000
    );
  });
});

var x = () => {
  return (
    <div class="loader">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  );
};

// ***************Product Listing*******************
// const Product_listing = React.lazy(() =>
//   import("./components/Front/Product/Product_listing")
// );

const LazyLogin = React.lazy(() => import("./components/Admin/Login"));
const LazyDashboard = React.lazy(() => import("./components/Admin/Dashboard"));
// ***************USER Components*******************
const LazyListing = React.lazy(() => import("./components/Admin/User/Listing"));
const LazyUseradd = React.lazy(() => import("./components/Admin/User/Useradd"));
const LazyUser_Edit = React.lazy(() =>
  import("./components/Admin/User/User_Edit")
);
// ***************BANNER Components*******************
const LazyAdd = React.lazy(() => import("./components/Admin/Banner/add"));
const LazyBanner_listing = React.lazy(() =>
  import("./components/Admin/Banner/Banner_listing")
);
const LazyBanner_edit = React.lazy(() =>
  import("./components/Admin/Banner/Banner_edit")
);
// ***************IMAGE CONTENT Components*******************
const LazyContentlisting = React.lazy(() =>
  import("./components/Admin/Image_content/Contentlisting")
);
const LazyAddImage = React.lazy(() =>
  import("./components/Admin/Image_content/Addimage")
);
const LazyImage_content_edit = React.lazy(() =>
  import("./components/Admin/Image_content/Image_content_edit")
);
// ***************Stories Components*******************
const LazySrorieslisting = React.lazy(() =>
  import("./components/Admin/Srories/Srorieslisting")
);
const LazyStories_edit = React.lazy(() =>
  import("./components/Admin/Srories/Stories_edit")
);
const LazyAddstories = React.lazy(() =>
  import("./components/Admin/Srories/Addstories")
);
// ***************Product Components*******************
const LazyProductlisting = React.lazy(() =>
  import("./components/Admin/Product/Productlisting")
);
const LazyAddproduct = React.lazy(() =>
  import("./components/Admin/Product/Addproduct")
);
const LazyProduct_edit = React.lazy(() =>
  import("./components/Admin/Product/Product_edit")
);
const LazyVariant = React.lazy(() =>
  import("./components/Admin/Product/Variants")
);
const LazyProductImage = React.lazy(() =>
  import("./components/Admin/Product/Product_image")
);

// ***************Category Components*******************
const LazyCategory_listing = React.lazy(() =>
  import("./components/Admin/Category/Category_listing")
);
const LazyCategory_add = React.lazy(() =>
  import("./components/Admin/Category/add")
);
const LazyCategory_edit = React.lazy(() =>
  import("./components/Admin/Category/Category_edit")
);
// ***************Sub Category Components*******************
const LazySubcategory_listing = React.lazy(() =>
  import("./components/Admin/Subcategory/Subcategory_listing")
);
const LazySubcategoryadd = React.lazy(() =>
  import("./components/Admin/Subcategory/add")
);
const LazySubcategory_edit = React.lazy(() =>
  import("./components/Admin/Subcategory/Subcategory_edit")
);
// ***************Order Components*******************
const LazyOrder_listing = React.lazy(() =>
  import("./components/Admin/Order/Order_Listing")
);
// ***************Variant Components*******************
const LazyVariants_listing = React.lazy(() =>
  import("./components/Admin/Variants/Variants_listing")
);
const LazyVariants_add = React.lazy(() =>
  import("./components/Admin/Variants/add")
);
const LazyVariants_edit = React.lazy(() =>
  import("./components/Admin/Variants/Variants_edit")
);
// ***************Variant option Components*******************
const LazyVariant_option_listing = React.lazy(() =>
  import("./components/Admin/Variants_option/Variants_option_listing")
);
const LazyVariant_option_add = React.lazy(() =>
  import("./components/Admin/Variants_option/add")
);
const LazyVariant_option_edit = React.lazy(() =>
  import("./components/Admin/Variants_option/Option_edit")
);

class App extends React.Component {
  render() {
    //admin login
    var iAdminId = localStorage.getItem("iAdminId");
    var vUserName = localStorage.getItem("vUserName");

    var hours = 5;
    var now = new Date().getTime();
  

    var setupTime = localStorage.getItem("setupTime");
    if (setupTime == null) {
      localStorage.setItem("setupTime", now);
    } else {
      if (now - setupTime > hours * 60 * 60 * 1000) {
        // localStorage.clear();
        localStorage.removeItem("iAdminId");
        localStorage.removeItem("vUserName");
        localStorage.setItem("setupTime", now);
      }
    }
    // *****************Cookie data Store *************************************
    var cookie = localStorage.getItem("cookie");
    if (cookie === null)
    {
        localStorage.setItem("cookie", now);
    }
    
    return (
      <Router>
        {/* **********************************FRONT********************************************************** */}

        <Suspense fallback={x()}>
          <Switch>


            <Route exact path="/" component={HomePage} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/category" component={MainCategory} />

            <Route exact path="/product-listing" component={AllProduct} />
            <Route exact path="/product-listing/:id" component={AllProduct} />
            <Route exact path="/product-listing/:name/:id" component={Product_listing} />

            <Route exact path="/addtocart/:id/:id" component={Addtocart} />

            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/verifyotp" component={Verifyotp} />
            <Route exact path="/viewcart" component={Viewcart} />

            <Route exact path="/admin/login" component={LazyLogin} />
            <Route exact path="/admin/" component={LazyDashboard} iAdminId={iAdminId} vUserName={vUserName} />

        {/* *********************************USER COMPONENT************************************ */}

            <Route exact path="/admin/listing" component={LazyListing}/>
            <Route exact path="/admin/listing/useradd" component={LazyUseradd}/>
            <Route exact path="/admin/user/edit/:id" component={LazyUser_Edit} />


        {/* *********************************BANNER COMPONENT************************************ */}
        <Route exact path="/admin/banner" component={LazyBanner_listing}/>
        <Route exact path="/admin/banner/add" component={LazyAdd} />
        <Route exact path="/admin/banner/edit/:id" component={LazyBanner_edit} />

        {/* *********************************IMAGE CONTENT COMPONENT************************************ */}
        <Route exact path="/admin/image-content" component={LazyContentlisting} />
        <Route exact path="/admin/image-add" component={LazyAddImage}/>
        <Route exact path="/admin/image-content/edit/:id" component={LazyImage_content_edit}/>


        {/* *********************************STORIES COMPONENT************************************ */}

        <Route exact path="/admin/stories" component={LazySrorieslisting}/>
        <Route exact path="/admin/stories/add" component={LazyAddstories} />
        <Route exact path="/admin/stories/edit/:id"  component={LazyStories_edit}/>

        {/* *********************************PRODUCT COMPONENT************************************ */}


        <Route exact path="/admin/product/listing"  component={LazyProductlisting}/>
        <Route exact path="/admin/product/add" component={LazyAddproduct} />
        <Route exact path="/admin/product/edit/:id" component={LazyProduct_edit}/>
        <Route exact path="/admin/product/variants" component={LazyVariant} />
        <Route exact path="/admin/product-image/:id" component={LazyProductImage} />


        {/* *********************************CATEGORY COMPONENT************************************ */}


        <Route exact path="/admin/category/listing" component={LazyCategory_listing} />
        <Route exact path="/admin/category/add" component={LazyCategory_add} />
        <Route exact path="/admin/category/edit/:id" component={LazyCategory_edit} />


        {/* *********************************SUB CATEGORY COMPONENT************************************ */}


        <Route exact path="/admin/subcategory/listing" component={LazySubcategory_listing} />
          <Route exact path="/admin/subcategory/add" component={LazySubcategoryadd} />
          <Route exact path="/admin/subcategory/edit/:id" component={LazySubcategory_edit} />


         {/* *********************************Order COMPONENT************************************ */}


         <Route exact path="/admin/order/listing" component={LazyOrder_listing}/>


        {/* *********************************Variant Option COMPONENT************************************ */}

         <Route exact path="/admin/variants/listing" component={LazyVariants_listing} />
          <Route exact path="/admin/variants/add" component={LazyVariants_add} />
          <Route exact path="/admin/variants/edit/:id" component={LazyVariants_edit} />

        {/* *********************************Variant Option COMPONENT************************************ */}

        <Route exact path="/admin/variant_option/listing" component={LazyVariant_option_listing} />
          <Route exact path="/admin/option/add" component={LazyVariant_option_add} />
          <Route exact path="/admin/option/edit/:id" component={LazyVariant_option_edit} />

            <Route component={PageNotFound} />

          </Switch>
        </Suspense>



    

      </Router>
    );
  }
}
export default App;
