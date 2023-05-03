import React, { useState } from 'react';
import { Card, CardTitle, CardSubtitle, CardText, CardBody, Button } from 'reactstrap';

const BookInfo = ({
  image,
  title,
  language,
  description,
  authors,
  publisher,
  publishedDate,
  infoLink
}) => {

  return (
    <div style={{ textAlign: 'center' }}>
      <img class="image" alt="Sample" src={image} />
      <CardBody>
        <CardTitle tag="h5">
          {title}
        </CardTitle>
        <CardSubtitle
          className="mb-2 text-muted"
          tag="h6"
        >
          {authors}
        </CardSubtitle>
        <CardText>
          {description.length > 200 ? description.substring(0, 200) + '...' : description}
        </CardText>
      </CardBody>
    </div>
  );
};

export default BookInfo;