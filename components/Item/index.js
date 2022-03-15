import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import * as Animatable from 'react-native-animatable'

const Item = ({ data, markCheck, deleteItem }) => {
	return (
		<Animatable.View
			style={styles.container}
			animation='bounceIn'
			useNativeDriver
		>
			<TouchableOpacity onPress={() => markCheck(data)}>
				<Ionicons name='md-checkmark-circle' size={30} color={data.isDone ? 'green' : 'red'} />
			</TouchableOpacity>
			<View>
				<Text style={{
					color: '#121212',
					fontSize: 20,
					paddingLeft: 8,
					paddingRight: 20,
					textDecorationLine: data.isDone ? 'line-through' : 'none'
				}}>
					{data.item}
				</Text>
			</View>
			<TouchableOpacity onPress={() => deleteItem(data)}>
				<Ionicons name='trash-bin' size={25} color='red' />
			</TouchableOpacity>
		</Animatable.View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		margin: 8,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: 'white',
		opacity: 0.8,
		borderRadius: 5,
		padding: 15,
		elevation: 1.5,
		shadowColor: '#000',
		shadowOpacity: 0.2,
		shadowOffset: {
			width: 1,
			height: 3
		}
	}
})

export default Item