import React from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    Platform,
    TouchableNativeFeedback
} from 'react-native';

export default CategoryGridItem = props => {
    let CurrentTouchable = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        CurrentTouchable = TouchableNativeFeedback;
    }

    return (
        <View style={styles.gridItem}>
            <CurrentTouchable style={{flex: 1}} onPress={props.onSelect}>
                <View style={{ ...styles.container, ...{ backgroundColor: props.color } }}>
                    <Text style={styles.title} numberOfLines={2}>{props.title}</Text>
                </View>
            </CurrentTouchable>
        </View>
    );
};

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 15,
        height: 150,
        borderRadius: 10,
        //прячу эффект нажатия, переходящий за границы скругленных углов на андроид
        overflow: Platform.OS ==='android' &&  Platform.Version >= 21 ? 'hidden' : 'visible',
        elevation: 5, //из-за overflow: hidden на андроиде оно будет перекрывать тень, так что тень должна быть в перен контейнере
    },
    container: {
        flex: 1,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: .26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        
        padding: 15,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        textAlign: 'right'
    }
});


