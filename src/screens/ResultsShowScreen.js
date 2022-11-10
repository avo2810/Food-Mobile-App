import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, FlatList, Image, Button } from 'react-native'
import yelp from "../api/yelp";
import { Context } from '../context/FavoriteContext'

const ResultsShowScreen = ({ navigation }) => {
    //communicate from one screen to the other using navigation
    const id = navigation.getParam('id')
    //to get address and phone number
    const [result, setResult] = useState(null)
    //to get reviews
    const [reviewResult, setReview] = useState(null)
    const { addFavorite } = useContext(Context)
    var businessName = ""
    const businessID = id

    const getResult = async (id) => {
        const response = await yelp.get(`/${id}`)
        setResult(response.data)
    }
    const getReview = async (id) => {
        const response = await yelp.get(`/${id}/reviews`)
        setReview(response.data)
    }

    useEffect(() => {
        getResult(id)
    }, [])

    useEffect(() => {
        getReview(id)
    }, [])

    if (!result) {
        return null;
    }
    if (!reviewResult) {
        return null;
    }

    businessName = result.name;


    return (
        <View>
            <Text style={styles.title}>{result.name}</Text>
            <View style={styles.address}>
                <Text style={{ fontWeight: 'bold' }}>Address: </Text>
                <FlatList
                    horizontal
                    data={result.location.display_address}
                    keyExtractor={(address) => address}
                    renderItem={({ item }) => {
                        return (
                            <Text>{item} </Text>
                        )
                    }}
                />
            </View>
            <Text style={{ marginBottom: 10, marginLeft: 7 }}>
                <Text style={{ fontWeight: 'bold' }}>Phone number: </Text>
                <Text>{result.display_phone}</Text>
            </Text>
            <Text style={{ fontWeight: 'bold', marginBottom: 10, marginLeft: 7 }}>Images: </Text>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={result.photos}
                keyExtractor={(photo) => photo}
                renderItem={({ item }) => {
                    return <Image style={styles.image} source={{ uri: item }} />
                }}
            />
            <Text style={{ fontWeight: 'bold', marginBottom: 10, marginLeft: 7 }}>Reviews: </Text>
            <FlatList
                showsHorizontalScrollIndicator={false}
                data={reviewResult.reviews}
                keyExtractor={(customer_review) => customer_review.id}
                renderItem={({ item }) => {
                    return (<View style={styles.review}><Text>* {item.text}</Text></View>)
                }}
            />
            <Button
                title="Add to Favorites"
                onPress={() => addFavorite(businessName, businessID, () => navigation.navigate('Favorite'))}
            />
        </View>
    )

}

const styles = StyleSheet.create({
    title: {
        textAlign: "center",
        fontSize: 28,
        margin: 10,
        fontWeight: "bold",
        color: '#4682B4',
        fontStyle: 'italic'
    },
    image: {
        height: 200,
        width: 300,
        marginLeft: 7,
        borderRadius: 4,
        marginBottom: 10
    },
    address: {
        flexDirection: 'row',
        marginBottom: 10,
        marginLeft: 7,
    },
    review: {
        flex: 1,
        marginLeft: 7,
        marginBottom: 10,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20,
        paddingBottom: 5,
        paddingRight: 10,
        paddingLeft: 10
    }
})

export default ResultsShowScreen