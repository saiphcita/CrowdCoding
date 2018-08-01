import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './Interface-worker.css';

class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div className="divShowMore">
        <button color="info" onClick={this.toggle} className="buttonChange button2">Show more</button>
        <Modal isOpen={this.state.modal} modalTransition={{ timeout: 400 }} backdropTransition={{ timeout: 1300 }}
          toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Post Number {this.props.ind}</ModalHeader>
          <ModalBody>
              {this.props.post}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Go Back</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalExample;