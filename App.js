import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    FlatList
} from 'react-native';

const proxy = process.env['proxy'];

const port = process.env['port'];

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            searchFor: '',
            images: [],
            results: true
        };
    }

    handleSearchQuery = () => {
        const {images, searchFor} = this.state;
        fetch(`${proxy}:${port}/images/${searchFor}`)
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    images: result.data,
                    results: true
                })
            })
    };

    handleTextInput = (searchFor) => {
        this.setState({searchFor})
    };

    render() {
        const {images, searchFor} = this.state;

        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.textAtSearch}>Input request:</Text>
                    <TextInput
                        placeholder="Search"
                        style={styles.searchInputStyles}
                        onChangeText={this.handleTextInput}
                        onSubmitEditing={this.handleSearchQuery}
                        underlineColorAndroid={'rgba(0,0,0,0)'}
                        placeholderTextColor={'#322d4c'}
                        value={searchFor}
                    />
                </View>
                <FlatList
                    data={images}
                    numColumns={2}
                    style={styles.listStyle}
                    renderItem={({item, index}) =>
                        <Image style={styles.imageSize}
                               source={{
                                   uri: item.src
                               }}/>
                    }
                    keyExtractor={(item, index) => String(index)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#bcd9dc',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    text: {
        alignSelf: 'center',
        color: '#000',
        fontWeight: 'bold'
    },
    textAtSearch: {
        alignSelf: 'center',
        color: '#000',
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10
    },
    searchInputStyles: {
        height: 40,
        borderColor: '#FFF',
        borderWidth: 1,
        minWidth: 200,
        color: '#02004c',
        fontWeight: 'bold',
        paddingLeft: 10,
        paddingRight: 10
    },
    imageSize: {
        width: 100,
        height: 100,
        margin: 10
    },
    listStyle: {
        flex: 1,
        marginTop: 10,
        flexDirection: 'column',
        flexWrap: 'wrap'
    }
});
