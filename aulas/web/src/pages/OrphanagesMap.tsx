import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {FiPlus, FiArrowRight} from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import mapMarkerImg from '../images/map_mark.svg';
import mapIcon from '../util/mapIcon';

import '../styles/pages/orphanages-map.css';
import api from '../services/api';

// O front-end não conhece a estrutura do objeto orfanato
// Esta informação está encapsulada no back-end
// Portanto criamos uma interface Typescript para que o código entenda
interface Orphanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

function OrphanagesMap() {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    useEffect( () => {
        api.get('orphanages').then(response => {
            setOrphanages(response.data);
        });
    }, [] );
    // Os dados vão ser carregados pelo useEffect() do React e não pelo axios.get() do axios
    // Porque componentes React carregam diversas vezes em tela enquanto atualizam
    // O useEffect() controla isso e faz com que os dados do servidor sejam carregados apenas uma vez (quando [] é vazio)

    return(
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy"/>

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a suavisita :)</p>
                </header>
                <footer>
                    <strong>Guarulhos</strong>
                    <span>São Paulo</span>
                </footer>
            </aside>

            <Map center={[-23.4382299,-46.5613134]} zoom={15} style={{ width: '100%', height:'100%' }}>
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                {orphanages.map(orphanage => {
                    return (
                        <Marker key={orphanage.id} position={[orphanage.latitude, orphanage.longitude]} icon={mapIcon} >
                            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                                {orphanage.name}
                                <Link to={`/orphanages/${orphanage.id}`}>
                                    <FiArrowRight size={20} color="#FFF" />
                                </Link>
                            </Popup>
                        </Marker>
                    )
                })}
            </Map>

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={35} color="#FFF" />
            </Link>
        </div>
    );
}

export default OrphanagesMap;