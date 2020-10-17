import React, { useState } from 'react';

import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../services/api';

import mapMarker from '../images/map-marker.png';

// Criando uma interfaca para que o componente saiba que tipo de dado está sendo retornado do servidor (quais os parâmetros do objeto)
interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

export default function OrphanagesMap() {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    // Use effect para executar a chamada do servidor apenas uma vez
    useFocusEffect(() => {
      api.get('orphanages').then(response => {
        setOrphanages(response.data); // Coletando o response da nossa rota do servidor back-end
      });
    }); // O array do segundo parâmetro de useEffect() indica quando chamar essa função denovo

    const navigation = useNavigation();
    
    function handleNavigateToOrphanageDetails(id: number) {
        // Navegando a partir do 'name' configurado no arquivo routes.tsx
        navigation.navigate('OrphanageDetails', { id }); // O objeto no segundo parâmetro são dados adicionais que eu quero enviar para a rota
    }

    function handleNavigateToCreateOrphanage() {
      // Navegando a partir do 'name' configurado no arquivo routes.tsx
      navigation.navigate('SelectMapPosition');
  }

    return (
        <View style={styles.container}>
            <MapView provider={PROVIDER_GOOGLE} style={styles.map} initialRegion={{
                latitude: -23.439730091461957,
                longitude: -46.566184759140015,
                latitudeDelta: 0.008,
                longitudeDelta: 0.008,
            }} >

                {orphanages.map(orphanage => {
                  return (
                    <Marker key={orphanage.id} icon={mapMarker} calloutAnchor={{
                      x: 2.4,
                      y: 0.8,
                    }} coordinate={{
                        latitude: orphanage.latitude,
                        longitude: orphanage.longitude,
                    }} >
                      {/* O callout chama a função de navegação ao ser clicado */}
                      <Callout tooltip onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}>
  
                          <View style={styles.calloutContainer}>
  
                              <Text style={styles.calloutText}> {orphanage.name} </Text>
  
                          </View>
  
                      </Callout>
  
                  </Marker>
                  );
                })}

            </MapView>

            <View style={styles.footer}>
                <Text style={styles.footerText}> {orphanages.length} orfanatos encontrados... </Text>
                <RectButton style={styles.createOrphanageButton} onPress={handleNavigateToCreateOrphanage}>
                    <Feather name='plus' size={20} color='#FFF' />
                </RectButton>
            </View>
        </View>
    ); // Estas tags são do React Native, não utilizamos HTML
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  
    calloutContainer: {
      width: 160,
      height: 46,
      paddingHorizontal: 16,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius: 16,
      justifyContent: 'center',
    },
  
    calloutText: {
      fontFamily: 'Nunito_700Bold',
      color: '#0089a5',
      fontSize: 14,
    },
  
    footer: {
      position: 'absolute',
      left: 24,
      right: 24,
      bottom: 32,
  
      backgroundColor: '#FFF',
      borderRadius: 20,
      height: 56,
      paddingLeft: 24,
  
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  
      elevation: 3,
    },
  
    footerText: {
      fontFamily: 'Nunito_700Bold',
      color: '#8fa7b3',
    },
  
    createOrphanageButton: {
      width: 56,
      height: 56,
      backgroundColor: '#15c3d3',
      borderRadius: 20,
  
      justifyContent: 'center',
      alignItems: 'center',
    },
  }); // Estes são os estilos, não utilizamos arquivos CSS e não criamos id ou class