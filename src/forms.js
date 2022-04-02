import React, { Component } from 'react';
import Modal from 'react-modal';

const MODAL_A = 'modal_a';
const MODAL_B = 'modal_b';

const DEFAULT_TITLE = 'Default title';

class Forms extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.ref = {
      username: React.createRef(),
      age: React.createRef(),
      password: React.createRef(),
      password_confirm: React.createRef()
    };
  }

  toggleModal = event => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  }

  async sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => ('00' + b.toString(16)).slice(-2)).join('');
  }

  async hashPassword(password) {
    let password_hashed = await this.sha256(password);
    password_hashed = await this.sha256(password_hashed);
    return password_hashed;
  }

  async createUser(updateGridRow) {
    if(
      this.ref.username.current == null ||
      this.ref.age.current == null ||
      this.ref.password.current == null ||
      this.ref.password_confirm.current == null
    ) {
      alert('Please fill in all the blanks');
      return;
    }
    const username = this.ref.username.current.value;
    const age = this.ref.age.current.value;
    const password = this.ref.password.current.value;
    const password_confirm = this.ref.password_confirm.current.value;
    if (this.ref.password.current.value.length < 8) {
      alert('Password too short, should have length at least 8');
      return;
    }
    if (
      this.ref.password.current.value !==
      this.ref.password_confirm.current.value
    ) {
      alert('Passwords are not the same');
      return;
    }
    const newRowData = { 
      username: username, 
      age: age, 
      password_digest: await this.hashPassword(password)
    };
    updateGridRow(arr => [...arr, newRowData]);
    this.toggleModal();
    return;
  }

  render() {
    const { isOpen } = this.state;
    console.log(this.hashPassword("1234578"));
    console.log(this.hashPassword("password"));
    console.log(this.hashPassword("qwertyui"));
    return (
      <div>
        <button className="btn btn-primary" onClick={this.toggleModal}>Create new user</button>
        <Modal
          id="modal_with_forms"
          isOpen={isOpen}
          closeTimeoutMS={150}
          contentLabel="modalB"
          shouldCloseOnOverlayClick={true}
          onRequestClose={this.toggleModal}
          aria={{
            labelledby: "heading",
            describedby: "fulldescription"
          }}>
          <h1 id="heading">Create new user</h1>
          <div id="fulldescription" tabIndex="0" role="document">
            <p>
              <label>
                Username:&nbsp;
                <input
                  ref={this.ref.username}
                  type="text"
                  autoFocus={true}
                />
              </label>
            </p>
            <p>
              <label>
                Age:&nbsp;
                <input
                  ref={this.ref.age}
                  type="number"
                />
              </label>
            </p>
            <p>
              <label>
                Password:&nbsp;
                <input
                  ref={this.ref.password}
                  type="password"
                />
              </label>
            </p>
            <p>
              <label>
                Confirm your password:&nbsp;
                <input
                  ref={this.ref.password_confirm}
                  type="password"
                  placeholder='at least 8 characters'
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      this.next_step();
                    }
                  }}
                />
              </label>
            </p>
            <button
              onClick={()=>this.createUser(this.props.updateGridRow)}
            >
              Confirm
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Forms;