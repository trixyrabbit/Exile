import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { NewFragment } from '../components/NewFragment'
import { newFragment as newFragmentFn } from '../modules/exileModule'

const validate = values => { // validate input
  const errors = {}
  return errors
}

const warn = values => { // todo add warnings if desired
  const warnings = {}
  return warnings
}

const mapDispatchToProps = {
  submitTransaction: newFragmentFn
}

const mapStateToProps = (state) => ({
  accounts: (state.web3Wrap.web3 && state.web3Wrap.web3.eth) ? state.web3Wrap.web3.eth.accounts : []
})

export default reduxForm({
  form: 'newFragment',
  validate,
  warn
})(connect(mapStateToProps, mapDispatchToProps)(NewFragment))

