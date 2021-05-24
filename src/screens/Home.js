import React from 'react'
import { View, Text } from 'react-native'
import {signOutController} from '../controllers'
import {Button} from 'native-base'
export default function Home() {
    return (
        <View>
            <Text>Home</Text>
            <Button danger onPress={signOutController}><Text> Danger </Text></Button>
        </View>
    )
}
