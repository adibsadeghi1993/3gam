import React from "react";
import "./Item.css";

const Item = ({ book, input }) => {
  const title = book.volumeInfo.title.toLowerCase();
  const word = input.toLowerCase();

  var trigger = word;
  var sentence = title;
  var emboldened = sentence.split(trigger).join(trigger.bold());

  const messageList = [emboldened];
  function createMarkup() {
    return { __html: messageList.join("") };
  }
  return (
    <>
      <p dangerouslySetInnerHTML={createMarkup()} />
    </>
  );
};

export default Item;
