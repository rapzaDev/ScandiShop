import React, { PureComponent } from 'react';

import {   
    ShadowContainer,
} from './styles';

type ShadowWrapperProps = {
    active: boolean;
}

class ShadowWrapper extends PureComponent<ShadowWrapperProps> {

    constructor(props:ShadowWrapperProps) {
        super(props);
    }

    render() {

        return (

            <ShadowContainer 
                id="shadow-container"
                active={this.props.active}
            />

        );

    }

};

export { ShadowWrapper };
