
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function FloatButton({ onPress, children, buttonStyle, textStyle }) {
    return (
        <TouchableOpacity style={[styles.BnttSetup, buttonStyle]} onPress={onPress}>
            <Text style={[styles.textDefault, textStyle]}>{children}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    BnttSetup: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#007bff',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    textDefault: {
        color: '#ffffff',
        fontSize: 24,
        fontWeight: '600',
        textAlign: 'center',
        lineHeight: 60,
        textAlignVertical: 'center',
    }
});
