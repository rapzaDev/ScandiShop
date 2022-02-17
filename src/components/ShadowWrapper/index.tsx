import React, { PureComponent } from 'react';

import {   
    ShadowContainer,
} from './styles';

type ShadowWrapperProps = {
    children: React.ReactNode;
    active: boolean;
}

class ShadowWrapper extends PureComponent<ShadowWrapperProps> {

    render() {

        return (

            <ShadowContainer 
                className="shadow-container"
                active={this.props.active}
            >
                {this.props.children}
            </ShadowContainer>

        );

    }

};

export { ShadowWrapper };
