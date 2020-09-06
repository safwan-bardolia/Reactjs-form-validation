import React from 'react';
import './App.css';


const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

class App extends React.Component{

  state={
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    formErrors:{
      firstName:"",
      lastName:"",
      email:"",
      password:"",  
    }
  }

// we have used ... because we want to use object.values() on remaining 4 field of state
formValid = ({formErrors, ...restProperty}) => {
  let valid=true;

  // Object.values creates an array that contains the values of every property in an object.
  Object.values(formErrors)
  .forEach(val=>{
    // val.length>0 : means any error string is present
    val.length > 0 && (valid=false);          // shorted syntax for if(val.length>0) then (valid=false)
  })


  // // it is useful when we directly submit the from without filling any field
  // Object.values(restProperty)
  // .forEach(val=>{
  //   /* check if any field is null,(this scenario occur when we have not filled any field & submit the form)
  //      and initially all the error property is also null so above function not work*/
  //   val === null && (valid=false);  
  //   console.log(val)
  // })


  // another solution for loop throgh an object
  // Object.entries creates an array of arrays. Each inner array has two item. The first item is the property; the second item is the value.
  const entries = Object.entries(restProperty);

  // loop throgh
  for(const [key, value] of entries) {
    if(value==="") {
      valid = false;
      
      // very imp setting error msg when we direct submit form
      formErrors[key] = `${key} cannot be empty`;
      console.log(formErrors)
      console.log(key);
      console.log(formErrors.key);
      console.log(this.state.formErrors);
    } 
  }
  
  this.setState({formErrors});
  console.log(this.state.formErrors)

  return valid;
}



  // when form is submitted (note that event is automatically passed)
  handleSubmit = (e) => {
    e.preventDefault();

    // call the formValid()
    if(this.formValid(this.state)){
      // post the data to api here
      // & clear the form
      console.log(`
        --SUBMITTING--
        FIRST NAME: ${this.state.firstName}
        LAST NAME: ${this.state.lastName}
        EMAIL: ${this.state.email}
        PASSWORD: ${this.state.password}
      `)
      // & clear the form
      this.setState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",    
      })
    }else {
      console.error('FORM INVALID - DISPLAY ERROR MESSAGE');
    }
  }

  // on change of any input field (note that event is automatically passed)
  handleChange = e => {
    e.preventDefault();

    // get the name of the input field which is change (e.g<input name="firstName">)
    // get the value also
    const {name, value} = e.target;
    
    // initialize state's formErrors in local variable(so we dont have to use "this.state.formErrors" each time )
    let formErrors = this.state.formErrors;

    switch(name) {
      case 'firstName':
        formErrors.firstName = value.length < 6 ? "minimum 6 characters required, firtName" : "";
        break;

      case 'lastName':
        formErrors.lastName = value.length < 6 ? "minimum 6 characters required, lastName" : "";
        break;      

      case 'email':
        // for email, emailRegex.test() returns true or false
        // if it returns true then email is valid (i.e no error)
        formErrors.email = emailRegex.test(value) && value.length > 8 ? "" : "invalid email"
        break;

      case 'password':  
        formErrors.password = value.length < 6 ? "minimum 6 characters required,password" : "";
        break;
      
      default:
        break;  
    }
    
    // update the state each time, i think formErrors is ES6 code i.e (formErrors:formErrors)
    this.setState({formErrors, [name]:value}, ()=>console.log(this.state))
  }

  render() {

    const {formErrors} = this.state;

    return (
      <div className="app">
        
        <div className="app_form">

          <h1>Create Account</h1>

          {/*noValidate: it specifies that the form-data (input) should not be validated when submitted. */}
          {/* If we enable HTML5 validations, we have little control of the look and feel of error messages */}
          <form onSubmit={this.handleSubmit} noValidate>

            <div className="firstName">
              {/* means label for name="firstName" is 'First Name' */}
              <label htmlFor="firstName">First Name</label>
              <input 
                type="text"
                // for displaying box as red when error present in current field
                className={formErrors.firstName.length > 0 ? "error":null}
                placeholder="First Name"
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleChange}
              />
              {/* displaying error msg */}
              { formErrors.firstName.length > 0 && (
                <span className="errorMessage">{formErrors.firstName}</span>
              )}
            </div>

            <div className="lastName">
              <label htmlFor="lastName">Last Name</label>
              <input 
                type="text"
                className={formErrors.lastName.length > 0 ? "error":null}
                placeholder="Last Name"
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleChange}
              />
              {/* displaying error msg */}
              { formErrors.lastName.length > 0 && (
                <span className="errorMessage">{formErrors.lastName}</span>
              )}
            </div>

            <div className="email">
              <label htmlFor="email">Email</label>
              <input 
                type="email"
                className={formErrors.email.length > 0 ? "error":null}
                placeholder="Email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              {/* displaying error msg */}
              { formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>

            <div className="password">
              <label htmlFor="password">Password</label>
              <input 
                type="password"
                className={formErrors.password.length > 0 ? "error":null}
                placeholder="Password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              {/* displaying error msg */}
              { formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}

            </div>

            <div className="createAccount">
              <button type="submit">Create Account</button>
              <small>Already have an Account?</small>
            </div>

          </form>

        </div>
        
      </div>
    )
  }
}

export default App;
