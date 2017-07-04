import React, { Component, PropTypes } from 'react'
import { Field } from 'redux-form'

import { AutoComplete, TextField } from 'redux-form-material-ui'
import { Col } from 'react-flexbox-grid/lib/index'
import RaisedButton from 'material-ui/RaisedButton'

export class NewFragment extends Component {

  render () {
    const { accounts, handleSubmit, submitTransaction } = this.props

    return (
      <Col xs={10} sm={6} md={5} lg={3}>
        <h2>New Fragment</h2>
        <form onSubmit={handleSubmit(submitTransaction)}>
          <br />
          <RaisedButton
            primary
            type='submit'
            label='Fragment' />
        </form>
      </Col>
    )
  }
}

NewFragment.propTypes = {
  accounts: PropTypes.array,
  handleSubmit: PropTypes.func,
  submitTransaction: PropTypes.func
}

export default NewFragment