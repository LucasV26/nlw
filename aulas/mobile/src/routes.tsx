import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import OrphanagesMap from './pages/OrphanagesMap';
import OrphanageDetails from './pages/OrphanageDetails';
import SelectMapPosition from './pages/CreateOrphanage/SelectMapPosition';
import OrphanageData from './pages/CreateOrphanage/OrphanageData';
import Header from './components/Header';

const { Navigator, Screen } = createStackNavigator();
// Navigator => Todas as telas abertas
// Screen => Tela atual

export default function Routes(){
    return(
        <NavigationContainer>
            {/* Configurando para que não seja mostrado um Header com nome da rota */}
            {/* Em todas as páginas */}
            <Navigator screenOptions={{headerShown: false, cardStyle: {backgroundColor: '#f2f3f5'}}}>

                <Screen name="OrphanagesMap" component={OrphanagesMap} />
                <Screen name="OrphanageDetails" component={OrphanageDetails} options={{
                    headerShown: true,
                    header: () => <Header showCancel={false} title="Orfanato" />
                }} />
                
                {/* Fluxo de criação de novo orfanato: */}
                <Screen name="SelectMapPosition" component={SelectMapPosition} options={{
                    headerShown: true,
                    header: () => <Header title="Selecione no mapa" />
                }} />
                <Screen name="OrphanageData" component={OrphanageData} options={{
                    headerShown: true,
                    header: () => <Header title="Insira os dados" />
                }} />

            </Navigator>

        </NavigationContainer>
    );
}