import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import * as Contacts from 'expo-contacts';
import { useState } from 'react';

export default function App() {
  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync(
        { fields: [Contacts.Fields.PhoneNumbers] }
      );
      if (data.length > 0) {
        console.log(data[1]);
        setContacts(data);
      }
    }

  }

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={({ item }) => (
          <View style={styles.flatlistItems}>
            <Text>{item.name}   </Text>
            <Text>{item.phoneNumbers?.[0]?.['number']}</Text>
          </View>
        )}
      />
      <Button title="Get contacts" onPress={getContacts} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatlistItems: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
});
