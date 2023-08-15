import { useState } from "react"
import {View, TextInput, Button} from "react-native"

const Start = () => {
    const [text, setText] = useState('')
    return (
        <View>
            <TextInput
                value={text}
                onChangeText={setText}
                placeholder = 'Your Name'
            ></TextInput>
            <Button
                title="Start Chatting"
                onPress={()=>navigation.navigate('Chat')}
            />

        </View>
    )
         
}
 
export default Start