import React, { Component, PropTypes } from 'react'
import { Row, Col } from 'react-flexbox-grid/lib/index'

import Header from '../containers/HeaderContainer'
import Exile from '../containers/ExileContainer'
import Fragment from '../containers/FragmentContainer'

export class Layout extends Component {

  componentWillMount () {
    if (this.props.isConnected) {
      this.props.getCanvSize()
    }
  }

  render () {
    return (
      <Col>
        <Row center='xs'><Header /></Row>
        <Row center='xs'><Fragment /></Row>
        <Row center='xs'><Exile /></Row>
      </Col>
    )
  }
}

Layout.propTypes = {
  isConnected: PropTypes.bool.isRequired,
  getCanvSize: PropTypes.func.isRequired,
  accounts: PropTypes.array.isRequired
}

export default Layout
