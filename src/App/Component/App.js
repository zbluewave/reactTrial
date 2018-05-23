import React, { Component } from 'react';

import ContentWrapper from '../../ContentWrapper/Component/ContentWrapper';
import Login from '../../Login/Component/Login';

class App extends Component {
    render() {
        return (
            <ContentWrapper>
                    <Login />
            </ContentWrapper>
        );
    }
}

export default App;
