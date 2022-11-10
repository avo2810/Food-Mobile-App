import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import { Context } from '../context/FavoriteContext';
import { Feather } from '@expo/vector-icons'


const FavoriteScreen = ({ navigation }) => {
    //value is the value that we set for FavoriteContext
    const { state, deleteFavorite, getFavorite } = useContext(Context)

    useEffect(() => {
        getFavorite()
        const listener = navigation.addListener('didFocus', () => {
            getFavorite()
        })

        return () => {
            listener.remove()
        }
    }, [])
    if (Object.keys(state).length === 0) {
        return <View><Text>There are no favorites saved</Text></View>
    } else {
        return (
            <View>
                <FlatList
                    data={state}
                    keyExtractor={Restaurant => Restaurant.id}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity onPress={() => navigation.navigate('ResultsShow', { id: item.businessID })}>
                                <View style={styles.row}>
                                    <Text style={styles.title}>{item.businessName}</Text>
                                    <TouchableOpacity onPress={() => deleteFavorite(item.id)}>
                                        <Feather style={styles.icon} name='trash' />
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
                <Button
                    onPress={() => navigation.navigate('Search')} title="GO TO SEARCH SCREEN"
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderColor: 'gray'
    },
    title: {
        fontSize: 18
    },
    icon: {
        fontSize: 24

    }
})

export default FavoriteScreen
