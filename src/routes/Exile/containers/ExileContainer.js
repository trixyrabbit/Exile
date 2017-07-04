//todo turn this into a pixle rendering container.

import { connect } from 'react-redux'

import Exile from '../components/Exile'

const mapDispatchToProps = {
}

const mapStateToProps = (state) => ({
  isConnected: state.web3Wrap.isConnected,
  fragments: state.exile.value
})

export default connect(mapStateToProps, mapDispatchToProps)(Exile)
