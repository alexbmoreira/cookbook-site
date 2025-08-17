import React from 'react';
import {observer} from 'mobx-react';
import sanitizeHtml from 'sanitize-html';

const HtmlRender = observer(({html, className}) => {
  const allowedTags = sanitizeHtml.defaults.allowedTags.concat(['span']);
  const sanitizationConfig = {allowedTags};

  return (
    <div className={className ? className : ''}
      dangerouslySetInnerHTML={{__html: html === null ? '' : sanitizeHtml(html, sanitizationConfig)}}
    />
  );
});

export default HtmlRender;