import React, {Component} from 'react';
export default class Validation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      userName: '',
      mobileNumber: '',
      password: '',
      confirmPassword: '',
      errors: {
        email: '',
        userName: '',
        mobileNumber: '',
        password: '',
        confirmPassword: '',
      },
      usersData: [],
    };
  }
  validateForm = () => {
    const {email, userName, mobileNumber, password, confirmPassword} =
      this.state;
    const errors = {
      email: '',
      userName: '',
      mobileNumber: '',
      password: '',
      confirmPassword: '',
    };

    // Validation for email
    if (!email.toLowerCase().includes('@gmail.com')) {
      errors.email = 'Email should contain @gmail.com';
    }

    // Validation for username
    const userNameRegex = /^[a-zA-Z0-9]*$/;
    if (!userName.match(userNameRegex)) {
      errors.userName = 'Username should consist only of alphabets';
    }

    // Validation for mobile number
    const mobileNumberRegex = /^[0-9]+$/;
    if (!mobileNumber.match(mobileNumberRegex)) {
      errors.mobileNumber = 'Mobile number should contain numbers only';
    }

    // Validation for password
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password.match(passwordRegex)) {
      errors.password =
        'Password must be 8 characters with letters and numbers';
    }

    // Validation for password match
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    // Set the errors state
    this.setState({errors});

    // Check if there are any errors
    return Object.values(errors).every(error => error === '');
  };
}
