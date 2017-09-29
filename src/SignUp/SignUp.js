import React from 'react'
import Input from 'react-toolbox/lib/input'

class Registration extends React.Component {
  state = { name: '', phone: '', email: '', hint: '' };

  handleChange = (name, value) => {
    this.setState({...this.state, [name]: value});
  };

  render () {
    return (
      <div style={{padding: '40px'}}>
        <Input type='text' label='First Name' name='firstName' value={this.state.firstName} onChange={this.handleChange.bind(this, 'firstName')} maxLength={40 } />
        <Input type='text' label='Last Name' name='lastName' value={this.state.lastName} onChange={this.handleChange.bind(this, 'lastName')} maxLength={40 } />
        <Input type='text' label='Email' name='name' value={this.state.name} onChange={this.handleChange.bind(this, 'name')} maxLength={40 } />
        <Input type='text' label='City' name='city' value={this.state.city} onChange={this.handleChange.bind(this, 'city')} maxLength={40 } />
      </div>
    );
  }
}

export default Registration
