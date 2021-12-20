import { Actiontype } from "../contants/action-types";
const initialState = {
    products : [],
    minibanner : [],
    FirstiamgeArray : [],
    SecondiamgeArray: [],
    ThirdiamgeArray: [],
    HomepageproductArray : [],
    MainproductArray: [],
    MainproductimageArray: [],
    MainheaderArray: [],
    MainProductListingArray: [],
    MainAddtocartArray: [],
}

export const productReducer = (state = initialState ,{type ,payload}) =>
{
    switch(type){
        case Actiontype.SET_BANNER:
            return { ...state, products:payload};
        default : 
        return state;
    }
};

export const miniProductReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case Actiontype.MINI_BANNER:
            return {...state, minibanner: payload };
        default:
            return state;
    }
}
export const miniFirstimageReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case Actiontype.FIRST_IMAGE_HOMEPAGE:
            return { ...state, FirstiamgeArray: payload };
        default:
            return state;
    }
}
export const miniSecondimageReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case Actiontype.SECOND_IMAGE_HOMEPAGE:
            return { ...state, SecondiamgeArray: payload };
        default:
            return state;
    }
}

export const miniThirdimageReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case Actiontype.THIRD_IMAGE_HOMEPAGE:
            return { ...state, ThirdiamgeArray: payload };
        default:
            return state;
    }
}

export const miniHomepageproduct = (state = initialState, { type, payload }) => {
    switch (type) {
        case Actiontype.HOMEPAGE_PRODUCT:
            return { ...state, HomepageproductArray: payload };
        default:
            return state;
    }
}

// *************************SECOND PAGE ALL FUNCTION*****************************************
export const miniMainproduct = (state = initialState, { type, payload }) => {
    switch (type) {
        case Actiontype.MAIN_PRODUCT_LISTING:
            return { ...state, MainproductArray: payload };
        default:
            return state;
    }
}

export const miniMainproductimage = (state = initialState, { type, payload }) => {
    switch (type) {
        case Actiontype.MAIN_PRODUCT_LISTING_IMAGE:
            return { ...state, MainproductimageArray: payload };
        default:
            return state;
    }
}
export const miniHeadertimage = (state = initialState, { type, payload }) => {
    switch (type) {
        case Actiontype.HEADER:
            return { ...state, MainheaderArray: payload };
        default:
            return state;
    }
}
export const miniProductListing = (state = initialState, { type, payload }) => {
    switch (type) {
        case Actiontype.PRODUCT_LISTING:
            return { ...state, MainProductListingArray: payload };
        default:
            return state;
    }
}
export const miniAddtocartproduct = (state = initialState, { type, payload }) => {
    switch (type) {
        case Actiontype.ADDTOCARTPAGE:
            return { ...state, MainAddtocartArray: payload };
        default:
            return state;
    }
}