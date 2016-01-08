var React = require('react');
var LensOvalButton = require('./LensOvalButton');


var LensComponentMenu = React.createClass({
  getInitialState: function() {
    return {
      value: "Enter Component Name",
      inputField: false
    }
  },
  handleInputChange: function(e) {
    this.setState({
      value: e.target.value
    })
  },
  toggleInputFields: function() {
    if (this.state.inputField) {
      this.setState({inputField: false});
    } else {
      this.setState({inputField: true});
    }
  },
  addCustomComponent: function(componentName) {
    this.toggleInputFields();
    this.props.addCustomComponent(componentName);
  },
  render: function() {
    var lensComponents = [];
    var inputFields = [];

    if(this.props.lensComponentLibrary) {
      this.props.lensComponentLibrary.forEach(function(component, id) {
        lensComponents.push(<LensOvalButton key={id}
          backgroundColor='#E0E0E0'
          content={component.name}
          actionPayload={component}
          border='none'
          action={this.props.addComponent}
          margin='5px'/>);
      }, this);
    }

    if(this.state.inputField) {
      inputFields = [];
      inputFields.push(<input id='add-component-value'
        type='text'
        value={this.state.value}
        onChange={this.handleInputChange}/>);
      inputFields.push( <LensOvalButton key='submit-new-component'
        margin='5px'
        action={this.addCustomComponent}
        actionPayload={this.state.value}
        content='DONE' />)
      inputFields.push( <LensOvalButton key='cancel-new-component'
        margin='5px'
        action={this.toggleInputFields}
        actionPayload={null}
        content='CANCEL' />)
    } else {
      inputFields = [];
      inputFields.push(<LensOvalButton key='add-new-component'
        margin='5px'
        action={this.toggleInputFields}
        actionPayload={null}
        content='ADD NEW COMPONENT' />)
    }

    return (
      <div className='lens-component-menu'>
        {lensComponents}
        {inputFields}

      </div>
    )
  }
});

module.exports = LensComponentMenu;
