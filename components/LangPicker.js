import React, { useState } from "react";
import { View, TextInput, StyleSheet, Button, Modal } from "react-native";
import RNPickerSelect from "react-native-picker-select";

const LangPicker = (props) => {
  const [langList, setLangList] = useState([]);
  const [reducedLangList, setReducedLangList] = useState([]);
  const getSupportedLangs = () => {
    console.log("got pressed");
    return fetch(
      "https://api.cognitive.microsofttranslator.com/languages?api-version=3.0&scope=translation"
    )
      .then((response) => response.json())
      .then((json) => {
        //Object.keys(json.translation).length
        for (const lang of Object.values(json.translation)) {
            console.log(lang.name);
          setLangList((prevLangList) => [...prevLangList, lang]);
          setReducedLangList((prevReducedLangList) => [
            ...prevReducedLangList,
            {
              label: lang.name,
              value: lang.nativeName,
            },
          ]);
        }
        console.log(reducedLangList);
        console.log(langList);
      });
  };

  return (
    <View style={styles.picker}>
      <RNPickerSelect
        onValueChange={(value) => console.log(value)}
        items={reducedLangList}
      />
      <Button title="test" onPress={getSupportedLangs} />

    </View>
  );
};

const styles = StyleSheet.create({
  picker: {
    margin:10,
  }
})

export default LangPicker;
