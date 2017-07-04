import Exile from '../../../../contracts/Exile.sol'
import CanvasFrag from '../../../../contracts/CanvasFrag.sol'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_CANV_SIZE   = 'GET_CANV_SIZE'
export const SET_CANV_SIZE   = 'SET_CANV_SIZE'
export const NEW_FRAGMENT    = 'NEW_FRAGMENT'
export const EXILE_PIXLE     = 'EXILE_PIXLE'
export const SET_PIXLE_COLOR = 'SET_PIXLE_COLOR'
export const RENDER_FRAG     = 'RENDER_FRAG'
export const SET_CANV_FRAG   = 'SET_CANV_FRAG'
export const GET_CANV_DRAG   = 'GET_CANV_FRAG'


// ------------------------------------
// helpers
// ------------------------------------

/* This gets the deployed instance of Exile */
const getExile = ({ getState }) => {
  Exile.setProvider(getState().web3Wrap.web3.currentProvider)
  return Exile.deployed()
}

/* Need some way to get the array of Exile stuff maybe on connect? 
    the getState() method calls the store, which has the Web3Wrap store
*/
const getCanvasFragment = ({ getState }) => {
  CanvasFrag.setProvider(getState().web3Wrap.web3.currentProvider)
  return CanvasFrag.deployed()
}

const getCanvasAtAddress = ({ address }) => {
  return CanvasFrag.at(address);
}


const getDefaultAccount = ({ getState }) => {
  return getState().web3Wrap.web3.eth.accounts[0]
}

// ------------------------------------
// Actions
// Actions are payloads of information that send data from your application to your store. They are the only source of information for the store. You send them to the store using store.dispatch()
// ------------------------------------
// Returns the addrecss of a canvasFragment, might be combined

//TODO, integrate color updates

/*
export const exilePixle = ( {color} ) => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      let pixle = getExile({ getState })
      let account = getDefaultAccount({ getState })
      console.log("Using account: " + account)
      let max_gas = 470000;
      console.log("Changing color at... " + pixle.address)
      pixle.exile(0, 0, 0, color, { from: account, gas: max_gas })
          .then(() => {
            console.log("getting updated canvas size...")
            return pixle.getAddr.call(0, { from: account })
          })
          .then(value => {
            console.log("New number of frags: " + value.valueOf())
            dispatch({
              type: EXILE_PIXLE,
              payload: { value: value.valueOf() }
            })
            resolve()
          })
          .catch(e => {
            console.log(e)
          })
    })
  }
}
*/

//checks out, only callable by owner (restricted). So, pretty useless. switch to set Pixle probably
export const newFragment = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      let pixle = getExile({ getState })
      console.log("calling Exile Contract of " + pixle.address)
      let canvas  = getCanvasFragment({ getState })
      console.log("Looking at fragment at  " + canvas.address)
      let account = getDefaultAccount({ getState })
      console.log("Using account: " + account)
      //let frag  = canv.at()
      let max_gas = 470000;
      pixle.Fragment({ from: account, gas: max_gas })
          .then(() => {
            console.log("getting updated canvas size...")
            return pixle.getCanvSize.call({ from: account })
          })
          .then(value => {
            console.log("New number of frags: " + value.valueOf())
            dispatch({
              type: SET_CANV_SIZE,
              payload: { value: value.valueOf() }
            })
            resolve()
          })
          .catch(e => {
            console.log(e)
          })
    })
  }
}


//TODO: call from the fragment number
// get address
//pull image data
// dispatch SET_CANV_FRAG to store
//write something that renders the fragment
//probably need to call this in a loop for the size of getCanvFrag

export const getCanvasFrag = ( {fragmentNum} ) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      let pixle = getExile({ getState }) //get the Exile contract
      let account = getDefaultAccount({ getState })
      let canvas  = getCanvasFragment({ getState })
      console.log("Looking at fragment at  " + canvas.address)
      //grab the address returned for fragmentNum
      pixle.getAddr.call(fragmentNum, {from: account })
        .then(function (value) { //the address returned
          canvas.at(value.valueOf());
          console.log("Current fragment at : " + canvas.address)
          resolve()
        }).catch(function (e) {
          console.log(e)
          reject()
        })
    })
  }
}



//works
export const getCanvSize = () => {
  console.log("Fetching array of bitmaps... "); //
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      let pixle = getExile({ getState })
      console.log("getting pixle contract... at " + pixle.address);
      let account = getDefaultAccount({ getState })
      console.log("Using account " + account);
      pixle.getCanvSize.call({from: account })
        .then(function (value) {
          console.log("attempting to update store... ")
          dispatch({
            type: SET_CANV_SIZE,
            payload: {value: value.valueOf()}
          })
          resolve()
        }).catch(function (e) {
          console.log(e)
          reject()
        })
    })
  }
}



export const actions = {
  getCanvSize,
  newFragment,
  getCanvasFrag
  //getAddr
}

// ------------------------------------
// Action Handlers (actually copy the state to a new one, it is returned by the reducer to the store to update the app state)
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_CANV_SIZE]: (state, action) => {
    return Object.assign({}, state, action.payload) //payload is addr of canvas
  },
  [RENDER_FRAG]: (state, action) => {
    return Object.assign({}, state, action.payload)
  },
  [SET_PIXLE_COLOR]: (state, action) => {
    return Object.assign({}, state, action.payload)
  }
}

// ------------------------------------
// Reducer
// Actions describe the fact that something happened, but don't specify how the application's state changes in response. This is the job of reducers.
// ------------------------------------
const initialState = { account: null, value: '0' }
export default function ExileReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
