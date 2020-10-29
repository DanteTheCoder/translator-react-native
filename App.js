import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import {
  PowerTranslator,
  ProviderTypes,
  TranslatorConfiguration,
  TranslatorFactory,
} from "react-native-power-translator";

import LangPicker from './components/LangPicker';

export default function App() {
  const [srcLang, setSrcLang] = useState("en");
  const [dstLang, setDstLang] = useState("tr");
  const [transInput, setTransInput] = useState("");
  const [transOutput, setTransOutput] = useState("");
  const [maxLengthInput, setMaxLengthInput] = useState(5000);
  TranslatorConfiguration.setConfig(
    ProviderTypes.Microsoft,
    "cc4f546c45414762b0dd7cc25eb11bf7",
    dstLang,
    srcLang
  );
  const translator = TranslatorFactory.createTranslator();

  const transInputHandler = (enteredText) => {
    setTransInput(enteredText);
    translator.translate(enteredText).then((translated) => {
      setTransOutput(translated);
    });
  };

  return (
    <View style={styles.container}>
      <LangPicker></LangPicker>
      <View style={styles.inputFieldContainer}>
        <TextInput
          multiline={true}
          placeholder="Input goes here"
          maxLength={maxLengthInput}
          onChangeText={transInputHandler}
          style={styles.inputField}
        />
      </View>
      <View style={styles.inputFieldContainer}>
        <Text style={styles.outputField}>{transOutput}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  inputFieldContainer: {
    borderColor: "black",
    borderRadius: 1,
    width: "80%",
    height: "50%",
  },
  inputField: {
    fontSize: 18,
    backgroundColor: "lavender",
    padding: 10,
    borderWidth: 1,
    borderBottomColor: "silver",
  },
  outputField: {
    fontSize: 18,
    padding: 10,
    borderWidth: 1,
    borderColor: "indigo",
    backgroundColor: "lavender",
    width: "80%",
  },
});
