import React, { PureComponent } from 'react';

import { Header } from '../../components/Header/Header';

import {
    HomePage,
} from './styles';

class Home extends PureComponent {

    render() {

        return (

            <HomePage id="home-page">
                
                <Header />

                <main>
                    
                </main>

            </HomePage>

        );

    }

};

export { Home };
