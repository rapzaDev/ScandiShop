import React, { PureComponent, createContext } from 'react';

type MyBagContextType = {
    bagVisible: boolean;
    handleClickMyBag: () => void;
}

type MyBagState = {
    bagVisible: boolean;
}

type MyBagContextProviderProps = {
    children: React.ReactNode;
}

export const MyBagContext = createContext( {} as MyBagContextType );

class MyBagContextProvider extends PureComponent<
    MyBagContextProviderProps,
    MyBagState
> {

    state: MyBagState = {
        bagVisible: false,
    }

    handleClickMyBag() {
        this.setState( (state) =>  ({
            bagVisible: !state.bagVisible
        }));
    }

    render() {

        const { handleClickMyBag } = this;
        const { bagVisible } = this.state;

        return (

            <MyBagContext.Provider value={{ bagVisible, handleClickMyBag }}>
                { this.props.children }
            </MyBagContext.Provider>

        );

    }

};

export { MyBagContextProvider };
