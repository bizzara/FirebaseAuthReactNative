import { View, Text, ImageBackground, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { images, FONTS, COLORS, SIZES } from '../constants'
import Button from '../components/Button'

const Welcome = ({ navigation }) => {
  return (
    <View style={{flex: 1}}>
        <ImageBackground 
            source={images.background}
            style={styles.background}>
                <Image
                   source={images.logo}
                   resizeMode='contain'
                   style={styles.logo}
                />
                <Text style={styles.title}>Welcome</Text>
                <Text style={styles.subtitle}>Do meditation. Stay focused.</Text>
                <Text style={styles.subtitle}>Live a healthy life.</Text>

                <View style={{ marginTop: 72 }}>
                <Button 
                  title="Login With Email" 
                  style={styles.btn}
                  onPress={()=>navigation.navigate("Login")}
                  />
                  <View style={styles.bottomContainer}>
                     <Text style={{ ...FONTS.body3, color: COLORS.white }}>
                        Don't have account ?
                     </Text>
                     <TouchableOpacity
                        onPress={()=>navigation.navigate("Signup")}
                     >
                     <Text style={{ ...FONTS.h3, color: COLORS.white }}>
                       {" "} Signup
                    </Text>
                     </TouchableOpacity>
                  </View>
                </View>
        </ImageBackground>
   </View>
  )
}

const styles = StyleSheet.create({
    background: { 
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    logo: {
        height: SIZES.width * .8,
        width:  SIZES.width * .8
    },
    title: { 
        ...FONTS.h1, 
        textTransform: "uppercase",
        color: COLORS.white
    },
    subtitle: {
        ...FONTS.body2,
        color: COLORS.white
    },
    btn: {
        width: SIZES.width - 44
    },
    bottomContainer: { 
        flexDirection: "row", 
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 12
    }
})

export default Welcome