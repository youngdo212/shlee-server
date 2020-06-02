/* global React, ReactDOM */

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
      <button onClick={() => this.setState({ liked: true })}>
        Like it!
      </button>
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
