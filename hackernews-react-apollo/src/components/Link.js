//create component that expects a link to be passed as props and renders the description and url of that link

import React from 'react';

const Link = (props) => {
    const { link } = props;
    return (
        <div>
            <div>
                {link.description} ({link.url})
            </div>
        </div>
    )
}

export default Link;