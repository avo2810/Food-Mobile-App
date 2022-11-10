import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import SearchBar from "../components/SearchBar";
import useResults from "../hook/useResults";
import ResultsList from "../components/ResultsList";
import { AntDesign } from '@expo/vector-icons';

const SearchScreen = ({ navigation }) => {
    const [term, setTerm] = useState('')
    const [searchApi, results, errorMessage] = useResults()

    const filterResultsByPrice = price => {
        // price == '$' || '$$' || '$$$'
        return results.filter(result => {
            return result.price === price
        })
    }

    return (
        //<View style={{ flex: 1}}> first way
        //second way is to delete <View>
        <>
            <SearchBar
                term={term}
                onTermChange={setTerm}
                onTermSubmit={() => searchApi(term)}
            />
            {errorMessage ? <Text>{errorMessage}</Text> : null}
            {/* <Text>We have found {results.length} results</Text> */}
            <ScrollView>
                <ResultsList results={filterResultsByPrice('$')} title="Cost Effective" />
                <ResultsList results={filterResultsByPrice('$$')} title="Bit Pricier" />
                <ResultsList results={filterResultsByPrice('$$$')} title="Big Spender" />
            </ScrollView>
        </>
    )
}
SearchScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Favorite')}>
                <AntDesign name="heart" size={24} color="black" />
            </TouchableOpacity>
        ),
    }
}

const styles = StyleSheet.create({
})

export default SearchScreen