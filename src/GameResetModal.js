import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

class GameResetModal extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <>
        <Modal
          show={this.props.show}
          onHide={this.props.handleCloseModal}
          backdrop="static"
          keyboard={false}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Game Complete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Click on the Reset button below to start a new game.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.gameReset}>
              Reset Game
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default GameResetModal;
