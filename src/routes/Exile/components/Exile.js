import React, { PropTypes } from 'react'

export const Exile = ({ fragments, isConnected }) => {
  fragments = (isConnected) ? fragments : '¯\\_(ツ)_/¯'
  return (
    <div>
      <span>Your Framents Arr: {fragments}</span>
    </div>	
  )
}

Exile.propTypes = {
  fragments: PropTypes.string,
  isConnected: PropTypes.bool
}

export default Exile
