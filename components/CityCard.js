import { View, Text, StyleSheet, ImageBackground } from "react-native"

export default function CityCard({uri, cityName, locationDesc, state, temp, minMaxTemp}) {
    return (
        <ImageBackground 
            source={{ uri: uri }} 
            style={styles.card}
            imageStyle={styles.backgroundImage}
        >
            <View style={styles.overlay}>
                <View>
                    <Text style={styles.cityLocation}>
                        {cityName}
                    </Text>
                    <View>
                        <Text style={styles.cityLocationFav}>{locationDesc}</Text>
                    </View>
                    <View>
                        <Text style={styles.cityState}>{state}</Text>
                    </View>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.cityTemperature}>
                        {temp}°
                    </Text>
                    <Text style={styles.cityMinMax}>
                        Máx.: {minMaxTemp.max}° Min.: {minMaxTemp.min}°
                    </Text>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '90%',
        height: 93,
        marginTop: 20,
        alignSelf: 'center',
        borderRadius: 25,
        overflow: 'hidden',
    },
    backgroundImage: {
        borderRadius: 25,
        width: '100%',
        height: '100%',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20,
    },
    cityLocation: {
        color: '#F9F9F9',
        fontSize: 24,
        fontWeight: 'bold',
    },
    cityTemperature: {
        color: '#FFFFFF',
        fontSize: 40,
    },
    cityMinMax: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '200',
    },
    cityLocationFav: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: '200',
    },
    cityState: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: '200',
    },

});