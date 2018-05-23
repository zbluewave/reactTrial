import React, { Component } from 'react';
import {
    Message
} from 'semantic-ui-react';

import ContentWrapper from '../../ContentWrapper/Component/ContentWrapper';

const className = "NoRouteFound";

class NoRouteFound extends Component {
    render() {
        return (
            <ContentWrapper>
                <div className={`${className}__container`}>
                    <Message
                        header={"Page Not Found"}
                        content={<p> Please check your link and try again. </p>}
                        error
                    />
                </div>
            </ContentWrapper>
        );
    }
}

export default NoRouteFound;
