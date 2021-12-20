import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

require("es6-promise").polyfill();
require("isomorphic-fetch");

// FRONT DESIGN
// const HomePage = React.lazy(() =>
//   import("./components/Front/HomePage/HomePage")
// );

const Addtocart   = React.lazy(() => import("./components/Front/Addtocart/Addtocart"));


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
        localStorage.clear();
        localStorage.setItem("setupTime", now);
      }
    }
    // *****************Cookie data Store *************************************
    var cookie = localStorage.getItem("cookie");
    if (cookie == null) 
    {
         localStorage.setItem("cookie", now);
    }
    



    return (
      <Router>
        {/* **********************************FRONT********************************************************** */}

        <Suspense fallback={x()}>
          <Route exact path="/">
            <HomePage />
          </Route>
        </Suspense>

        <Suspense fallback={x()}>
          <Route exact path="/category">
            <MainCategory />
          </Route>
        </Suspense>

        <Suspense fallback={x()}>
          <Route exact path="/product-listing/:name/:id">
            <Product_listing />
          </Route>
        </Suspense>

        <Suspense
          fallback={<div className="loader">Loading...............</div>}
        >
          <Route exact path="/register">
            <Register />
          </Route>
        </Suspense>

        <Suspense fallback={<div>Loading...............</div>}>
          <Route exact path="/login">
            <Login />
          </Route>
        </Suspense>

        <Suspense fallback={<div>Loading...............</div>}>
          <Route exact path="/addtocart/:id/:id">
            <Addtocart />
          </Route>
        </Suspense>

        <Suspense fallback={x()}>
          <Route exact path="/product-listing">
            <AllProduct />
          </Route>
        </Suspense>

        

        

        <Suspense fallback={<div>Loading...............</div>}>
          <Route exact path="/admin/login">
            <LazyLogin />
          </Route>
        </Suspense>
        <Suspense fallback={<div>Loading...............</div>}>
          <Route exact path="/admin/">
            <LazyDashboard iAdminId={iAdminId} vUserName={vUserName} />
          </Route>
        </Suspense>
        {/* *********************************USER COMPONENT************************************ */}
        <Suspense fallback={<div>Loading...............</div>}>
          <Route exact path="/admin/listing">
            <LazyListing />
          </Route>
        </Suspense>
        <Suspense fallback={<div>Loading...............</div>}>
          <Route exact path="/admin/listing/useradd">
            <LazyUseradd />
          </Route>
        </Suspense>
        <Suspense fallback={<div>Loading...............</div>}>
          <Route exact path="/admin/user/edit/:id">
            <LazyUser_Edit />
          </Route>
        </Suspense>
        {/* *********************************BANNER COMPONENT************************************ */}
        <Suspense fallback={<div>Loading...............</div>}>
          <Route exact path="/admin/banner">
            <LazyBanner_listing />
          </Route>
        </Suspense>
        <Suspense fallback={<div>Loading...............</div>}>
          <Route exact path="/admin/banner/add">
            <LazyAdd />
          </Route>
        </Suspense>
        <Suspense fallback={<div>Loading...............</div>}>
          <Route exact path="/admin/banner/edit/:id">
            <LazyBanner_edit />
          </Route>
        </Suspense>
        {/* *********************************IMAGE CONTENT COMPONENT************************************ */}
        <Suspense fallback={<div>Loading...............</div>}>
          <Route exact path="/admin/image-content">
            <LazyContentlisting />
          </Route>
        </Suspense>
        <Suspense fallback={<div>Loading...............</div>}>
          <Route exact path="/admin/image-add">
            <LazyAddImage />
          </Route>
        </Suspense>
        <Suspense fallback={<div>Loading...............</div>}>
          <Route exact path="/admin/image-content/edit/:id">
            <LazyImage_content_edit />
          </Route>
        </Suspense>
        {/* *********************************STORIES COMPONENT************************************ */}
        <Suspense fallback={<div>Loading...............</div>}>
          <Route exact path="/admin/stories">
            <LazySrorieslisting />
          </Route>
        </Suspense>
        <Suspense fallback={<div>Loading...............</div>}>
          <Route exact path="/admin/stories/add">
            <LazyAddstories />
          </Route>
        </Suspense>
        <Suspense fallback={<div>Loading...............</div>}>
          <Route exact path="/admin/stories/edit/:id">
            <LazyStories_edit />
          </Route>
        </Suspense>
        {/* *********************************PRODUCT COMPONENT************************************ */}
        <Suspense fallback={<div>Loading...............</div>}>
          <Route exact path="/admin/product/listing">
            <LazyProductlisting />
          </Route>
        </Suspense>
        <Suspense fallback={<div>Loading...............</div>}>
          <Route exact path="/admin/product/add">
            <LazyAddproduct />
          </Route>
        </Suspense>
        <Suspense fallback={<div>Loading...............</div>}>
          <Route exact path="/admin/product/edit/:id">
            <LazyProduct_edit />
          </Route>
        </Suspense>
        <Suspense fallback={<div>Loading...............</div>}>
          <Route exact path="/admin/product/variants">
            <LazyVariant />
          </Route>
        </Suspense>

        <Suspense fallback={<div>Loading...............</div>}>
          <Route exact path="/admin/product-image/:id">
            <LazyProductImage />
          </Route>
        </Suspense>

        {/* *********************************CATEGORY COMPONENT************************************ */}
        <Suspense fallback={<div>Loading...............</div>}>
          <Route exact path="/admin/category/listing">
            <LazyCategory_listing />
          </Route>
        </Suspense>
        <Suspense fallback={<div>Loading...............</div>}>
          <Route exact path="/admin/category/add">
            <LazyCategory_add />
          </Route>
        </Suspense>
        <Suspense fallback={<div>Loading...............</div>}>
          <Route exact path="/admin/category/edit/:id">
            <LazyCategory_edit />
          </Route>
        </Suspense>
        {/* *********************************SUB CATEGORY COMPONENT************************************ */}
        <Suspense fallback={<div>Loading...............</div>}>
          <Route exact path="/admin/subcategory/listing">
            <LazySubcategory_listing />
          </Route>
        </Suspense>
        <Suspense fallback={<div>Loading...............</div>}>
          <Route exact path="/admin/subcategory/add">
            <LazySubcategoryadd />
          </Route>
        </Suspense>
        <Suspense fallback={<div>Loading...............</div>}>
          <Route exact path="/admin/subcategory/edit/:id">
            <LazySubcategory_edit />
          </Route>
        </Suspense>
        {/* *********************************Order COMPONENT************************************ */}
        <Suspense fallback={<div>Loading...............</div>}>
          <Route exact path="/admin/order/listing">
            <LazyOrder_listing />
          </Route>
        </Suspense>
        {/* *********************************Variant COMPONENT************************************ */}
        <Suspense fallback={<div>Loading...............</div>}>
          <Route exact path="/admin/variants/listing">
            <LazyVariants_listing />
          </Route>
        </Suspense>
        <Suspense fallback={<div>Loading...............</div>}>
          <Route exact path="/admin/variants/add">
            <LazyVariants_add />
          </Route>
        </Suspense>
        <Suspense fallback={<div>Loading...............</div>}>
          <Route exact path="/admin/variants/edit/:id">
            <LazyVariants_edit />
          </Route>
        </Suspense>
        {/* *********************************Variant Option COMPONENT************************************ */}
        <Suspense fallback={<div>Loading...............</div>}>
          <Route exact path="/admin/variant_option/listing">
            <LazyVariant_option_listing />
          </Route>
        </Suspense>
        <Suspense fallback={<div>Loading...............</div>}>
          <Route exact path="/admin/option/add">
            <LazyVariant_option_add />
          </Route>
        </Suspense>
        <Suspense fallback={<div>Loading...............</div>}>
          <Route exact path="/admin/option/edit/:id">
            <LazyVariant_option_edit />
          </Route>
        </Suspense>
        {/* *********************************USER COMPONENT END************************************ */}
      </Router>
    );
  }
}
export default App;
