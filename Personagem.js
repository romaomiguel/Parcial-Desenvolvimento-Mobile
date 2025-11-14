import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function Personagem({ nome, status, especie, genero, origem, imagem }) {
  // Define a cor baseada no status
  const getStatusColor = () => {
    switch (status.toLowerCase()) {
      case 'alive':
        return '#4CAF50';
      case 'dead':
        return '#ff6b6b';
      default:
        return '#999';
    }
  };

  // Traduz o status
  const getStatusTexto = () => {
    switch (status.toLowerCase()) {
      case 'alive':
        return 'Vivo';
      case 'dead':
        return 'Morto';
      default:
        return 'Desconhecido';
    }
  };

  // Traduz o gênero
  const getGeneroTexto = () => {
    switch (genero.toLowerCase()) {
      case 'male':
        return 'Masculino';
      case 'female':
        return 'Feminino';
      case 'genderless':
        return 'Sem gênero';
      default:
        return 'Desconhecido';
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: imagem }} style={styles.imagem} />
      
      <View style={styles.conteudo}>
        <Text style={styles.nome}>{nome}</Text>
        
        <View style={styles.statusContainer}>
          <View style={[styles.statusBolinha, { backgroundColor: getStatusColor() }]} />
          <Text style={styles.statusTexto}>{getStatusTexto()} - {especie}</Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.label}>Gênero:</Text>
          <Text style={styles.valor}>{getGeneroTexto()}</Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.label}>Origem:</Text>
          <Text style={styles.valor} numberOfLines={1}>{origem}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#16213e',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imagem: {
    width: 120,
    height: 120,
    backgroundColor: '#0f3460',
  },
  conteudo: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusBolinha: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  statusTexto: {
    fontSize: 14,
    color: '#bbb',
  },
  info: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    color: '#999',
    marginRight: 5,
  },
  valor: {
    fontSize: 12,
    color: '#fff',
    flex: 1,
  },
});