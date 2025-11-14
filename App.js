import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Image } from 'react-native';
import Personagem from './Personagem';

export default function App() {
  const [personagens, setPersonagens] = useState([]);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);

  const buscarPersonagens = async () => {
    try {
      setErro(null);
      const response = await fetch('https://rickandmortyapi.com/api/character');
      
      if (!response.ok) {
        throw new Error('Erro ao buscar personagens');
      }
      
      const data = await response.json();
      setPersonagens(data.results);
    } catch (error) {
      setErro('Não foi possível carregar os personagens. Tente novamente.');
      console.error('Erro:', error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarPersonagens();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>🛸 Rick and Morty</Text>
        <Text style={styles.subtitulo}>Lista de Personagens</Text>
      </View>

      {carregando ? (
        <View style={styles.carregandoContainer}>
          <ActivityIndicator size="large" color="#00b5cc" />
          <Text style={styles.textoCarregando}>Carregando personagens...</Text>
        </View>
      ) : erro ? (
        <View style={styles.erroContainer}>
          <Text style={styles.textoErro}>❌ {erro}</Text>
        </View>
      ) : (
        <FlatList
          data={personagens}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Personagem
              nome={item.name}
              status={item.status}
              especie={item.species}
              genero={item.gender}
              origem={item.origin.name}
              imagem={item.image}
            />
          )}
          contentContainerStyle={styles.lista}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#0f3460',
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00b5cc',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitulo: {
    fontSize: 14,
    color: '#bbb',
    textAlign: 'center',
  },
  carregandoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoCarregando: {
    color: '#fff',
    marginTop: 15,
    fontSize: 16,
  },
  erroContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  textoErro: {
    color: '#ff6b6b',
    fontSize: 16,
    textAlign: 'center',
  },
  lista: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});