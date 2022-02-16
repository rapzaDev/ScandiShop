import React, { PureComponent } from 'react';

import { getState, subscribe } from '../../store';

import { Header }  from '../../components/Header/Header';
import { MyBag } from '../../components/MyBag/MyBag';

import {
    HomePage,
    Main,
    ShadowContainer
} from './styles';


type HomeState = {
    bagVisible: boolean;
    unsubscribe: any;
}

class Home extends PureComponent<{}, HomeState> {

    state: HomeState = {
        bagVisible: false,
        unsubscribe: undefined
    }
 
    componentDidMount() {
        const unsubscribe = subscribe( () => {
            const { value } = getState().myBag;

            this.setState(() => ({
                bagVisible: value
            }))
        });

        this.setState(() => ({
            unsubscribe: unsubscribe
        }))
    }

    componentWillUnmount() {
        this.state.unsubscribe();
    }


    renderMyBag() {

        return (
            <MyBag isVisible={ this.state.bagVisible } />
        );
    }


    render() {

        return (

            <HomePage id="home-page">
                
                <Header />

                <ShadowContainer 
                    className="shadow-container"
                    active={this.state.bagVisible}
                >
                    { this.renderMyBag() }


                    <Main>
                            
                    </Main>
                </ShadowContainer>

            </HomePage>

        );

    }

};

export { Home };
