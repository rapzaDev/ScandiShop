import { useContext } from 'react';
import { MyBagContext } from '../contexts/MyBagContext';

function useMyBag() {
    
    const value = useContext(MyBagContext);

    return value;

};

export { useMyBag };
