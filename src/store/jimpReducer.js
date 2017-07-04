import Jimp from 'jimp';
//import truffleConfig from '../../truffle.js'

// ------------------------------------
// Constants
// ------------------------------------
export const IMAGE_LOAD = 'IMAGE_LOAD'
export const IMAGE_UPDATE = 'IMAGE_UPDATE'


/*


Jimp.read('./test.png', function (err, image) {



  for (var i = image.bitmap.width - 1; i >= 0; i--) {
    for (var j = image.bitmap.height - 1; j >= 0; j--) {
      var color = image.getPixelColor(i, j);      // returns the colour of that pixel e.g. 0xFFFFFFFF 
      //console.log(color);
      var newColor = 0x01AA44FF;
      image.setPixelColor(newColor, i, j); // sets the colour of that pixel 
    }
  }
  var file = "out.png";
  image.write(file)

});

*/
// ------------------------------------
// Actions
// ------------------------------------
export const imageLoad = () => {
  return (dispatch, getState) => {
    /*eslint-disable */

    let output = (typeof web3 !== 'undefined') // web3 given by metamask
                  ? { type: WEB3_CONNECTED, payload: { web3: new Web3(web3.currentProvider), isConnected: true } }
                  //: { type: WEB3_DISCONNECTED, payload: { web3: null, isConnected: false } }  // comment out for optional section
                  : { type: WEB3_CONNECTED, payload: { web3: new Web3(new Web3.providers.HttpProvider(web3Location)), isConnected: true } }  // comment in for optional section
    /*eslint-enable */
    dispatch(output)
  }
}

export function imageUpdate ({ x, y, color }) {
  return {
    type: IMAGE_UPDATE,
    payload: {
      x,
      y,
      color
    }
  }
}

export const actions = {
  imageLoad,
  imageUpdate
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [IMAGE_LOAD]: (state, action) => {
    return action.payload
  },
  [IMAGE_UPDATE]: (state, action) => {
    return action.payload
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { isConnected: false }
export default function jimpReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
