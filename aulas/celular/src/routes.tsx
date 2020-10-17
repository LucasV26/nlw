import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import OrphanagesMap from './pages/OrphanagesMap';
import OrphanageDetails from './pages/OrphanageDetails';

const { Navigator, Screen } = createStackNavigator();
// Navigator => Todas as telas abertas
// Screen => Tela atual

export default function Routes(){
    return(
        <NavigationContainer>
            {/* Configurando para que não seja mostrado um Header com nome da rota */}
            {/* Em todas as páginas */}
            <Navigator screenOptions={{headerShown: false}}>

                <Screen name="OrphanagesMap" component={OrphanagesMap} />
                <Screen name="OrphanageDetails" component={OrphanageDetails} />

            </Navigator>

        </NavigationContainer>
    );
}