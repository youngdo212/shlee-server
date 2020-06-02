import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return `You liked comment number ${this.props.commentID}`;
    }

    return (
      <Button
        onClick={() => this.setState({ liked: true })}
        variant="contained" color="primary"
      >
        Like it!
      </Button>
    );
  }
}


document.querySelectorAll('#like_button_container')
  .forEach((domContainer) => {
    const commentID = parseInt(domContainer.dataset.commentid, 10);
    ReactDOM.render(
      <LikeButton commentID={commentID}/>,
      domContainer,
    );
  });
