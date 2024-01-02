import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useGlobalState } from "./Context";
import React, { useState } from "react";
import { CheckBox } from "react-native-elements";
import Collapsible from "react-native-collapsible";
import { Bewerber } from "./Bewerber";

const [state, dispatch] = useGlobalState();

export const ValidationScreen = ({ navigation }: { navigation: any }) => {
  const [studentData, setStudentData] = useState({
    nachname: state.validationData?.nachname,
    vornamen: state.validationData?.vornamen,
    wunsch_abteilung: state.validationData?.wunsch_abteilung,
    alternativ_abteilung: state.validationData?.alternativ_abteilung,
    alternativ_abteilung2: state.validationData?.alternativ_abteilung2,
    geschlecht: state.validationData?.geschlecht,
    svn_kurz: state.validationData?.svn_kurz,
    geburtsdatum: state.validationData?.geburtsdatum,
    telefonnummer: state.validationData?.telefonnummer,
    vorschule_jahre: state.validationData?.vorschule_jahre,
    volkschule_jahre: state.validationData?.volkschule_jahre,
    mittelschule_jahre: state.validationData?.mittelschule_jahre,
    ahs_jahre: state.validationData?.ahs_jahre,
    poly_jahre: state.validationData?.poly_jahre,
    sonstige_jahre: state.validationData?.sonstige_jahre,
    herkunftsschule_typ: state.validationData?.herkunftsschule_typ,
    herkunftsschule_name: state.validationData?.herkunftsschule_name,
    geburtsstaat: state.validationData?.geburtsstaat,
    staatsbuergerschaft: state.validationData?.staatsbuergerschaft,
    muttersprache: state.validationData?.muttersprache,
    alltagssprache: state.validationData?.alltagssprache,
    religion: state.validationData?.religion,
    geschwister_an_der_schule: state.validationData?.geschwister_an_der_schule,
    verhalten7sst: state.validationData?.verhalten7sst,
    original_jahreszeugnis: state.validationData?.original_jahreszeugnis,
  });

  const [guardianData, setGuardianData] = useState(state.validationData?.erziehungsberechtigte.map((guardian) => 
    { return {
      type: guardian.type,
      anrede: guardian.anrede,
      title: guardian.title,
      akad_grad: guardian.akad_grad,
      vorname: guardian.vorname,
      zweiter_vorname: guardian.zweiter_vorname,
      nachname: guardian.nachname,
      akad_grad_nach: guardian.akad_grad_nach,
      land: guardian.land,
      plz: guardian.plz,
      gemeinde: guardian.gemeinde,
      strasse: guardian.strasse,
      hausnummer: guardian.hausnummer,
      telefonnummer1: guardian.telefonnummer1,
      telefonnummer2: guardian.telefonnummer2,
      email: guardian.email,
      schueler_wohnt_hier: guardian.schueler_wohnt_hier,
      ist_erziehungsberechtigt: guardian.ist_erziehungsberechtigt,
    }},
  ) ?? []);

  const handleStudentDataChange = (field, value) => {
    setStudentData({ ...studentData, [field]: value });
  };

  const handleGuardianDataChange = (field, value, idx) => {
    const newGuardianData = guardianData.map((guardian, index) => {
      if (index === idx) {
        return {
          ...guardian,
          [field]: value,
        };
      }
      return guardian;
    });

    setGuardianData(newGuardianData);
  };

  if (state.validationData === undefined) {
    return <Text>No Validation Data</Text>;
  }

  function validationFinished() {
    state.socketClient?.sendValidatedData(new Bewerber(studentData, guardianData));
    dispatch({ validationData: undefined });
  }

  return (
    <ScrollView>
      {Object.keys(studentData).map((field) => (
        <View key={field} style={styles.container}>
          <Text style={styles.label}>{field}:</Text>
          {typeof studentData[field] === "boolean" ? (
            <CheckBox
              checked={studentData[field]}
              onPress={() =>
                handleStudentDataChange(field, !studentData[field])
              }
            />
          ) : (
            <View />
          )}
          {typeof studentData[field] === "string" ? (
            <TextInput
              style={styles.input}
              value={studentData[field]}
              onChangeText={(text) => handleStudentDataChange(field, text)}
            />
          ) : (
            <View />
          )}
          {typeof studentData[field] === "number" ? (
            <TextInput
              style={styles.input}
              value={
                studentData[field].toString() == "NaN"
                  ? ""
                  : studentData[field].toString()
              }
              onChangeText={(text) => handleStudentDataChange(field, text)}
            />
          ) : (
            <View />
          )}
        </View>
      ))}
      <TouchableOpacity
        onPress={() => {
          const newGuardianData = [
            ...guardianData,
            {
              type: "",
              anrede: "",
              title: "",
              akad_grad: "",
              vorname: "",
              zweiter_vorname: "",
              nachname: "",
              akad_grad_nach: "",
              land: "",
              plz: "",
              gemeinde: "",
              strasse: "",
              hausnummer: "",
              telefonnummer1: "",
              telefonnummer2: "",
              email: "",
              schueler_wohnt_hier: false,
              ist_erziehungsberechtigt: false,
            },
          ];
          setGuardianData(newGuardianData);
        }}
      >
        <Text style={{ color: "green", fontSize: 20, margin: 5 }}>
          Erzeihungsberechtigten Hinzufügen
        </Text>
      </TouchableOpacity>
      {guardianData.map((guardian, idx) => (
        <View key={idx} style={styles.guardianContainer}>
          <Text style={styles.label}>Erziehungsberechtigter {idx + 1}:</Text>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => {
                const newGuardianData = guardianData.filter(
                  (guardian, index) => index !== idx
                );
                setGuardianData(newGuardianData);
              }}
            >
              <Text style={{ color: "red", fontSize: 20, }}>
                Löschen
              </Text>
            </TouchableOpacity>
          </View>
          {Object.keys(guardianData[idx]).map((field) => (
            <View key={field} style={styles.container}>
              <Text style={styles.label}>{field}:</Text>
              {typeof guardianData[idx][field] === "boolean" ? (
                <CheckBox
                  checked={guardianData[idx][field]}
                  onPress={() =>
                    handleGuardianDataChange(
                      field,
                      !guardianData[idx][field],
                      idx
                    )
                  }
                />
              ) : (
                <View />
              )}
              {typeof guardianData[idx][field] === "string" ? (
                <TextInput
                  style={styles.input}
                  value={guardianData[idx][field]}
                  onChangeText={(text) =>
                    handleGuardianDataChange(field, text, idx)
                  }
                />
              ) : (
                <View />
              )}
              {typeof guardianData[idx][field] === "number" ? (
                <TextInput
                  style={styles.input}
                  value={
                    guardianData[idx][field].toString() == "NaN"
                      ? ""
                      : guardianData[idx][field].toString()
                  }
                  onChangeText={(text) =>
                    handleGuardianDataChange(field, text, idx)
                  }
                />
              ) : (
                <View />
              )}
            </View>
          ))}
        </View>
      ))}
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => validationFinished()}
        >
          <Text style={styles.text}>Finish</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  guardianContainer: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    backgroundColor: "lightgrey",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#888",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
    alignItems: "center",
  },
  input: {
    flex: 2,
    borderWidth: 1,
    borderColor: "gray",
    padding: 8,
    borderRadius: 4,
  },
  text: {
    color: "#fff",
    fontSize: 18,
  },
});
