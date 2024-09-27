import * as React from "react";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import { COLORS, icons, images, SIZES } from "../../constants";
import { useNavigation } from "expo-router";

const AGender = () => {
  const navigation = useNavigation()
  const [selectedGender, setSelectedGender] = useState(null)
  const handleGenderSelect = (gender) => {
    setSelectedGender(gender)
  }

  return (
    <Pressable style={styles.aGender} onPress={() => {}}>
      <View style={styles.statusbarParent}>
        <Pressable style={styles.titlebackIcon} onPress={() => {}}>
          <Pressable style={styles.arrowLeftbackIcon}>
            <Image
              style={styles.icon}
              resizeMode="center"
              source={icons.arrow_back}
            />
          </Pressable>
          <Text style={styles.fillYourProfile}>back</Text>
        </Pressable>
      </View>
      <View style={styles.whatsYourGenderParent}>
        <Text style={[styles.whatsYourGender, styles.maleTypo]}>
          What’s Your Gender
        </Text>
        <View style={styles.view}>
          <TouchableOpacity style={styles.botGenderMaleParent} onPress={()=>handleGenderSelect("female")}>   
            <View style={styles.botGenderMale}>
              <View style={[styles.gradientButton, styles.gradientPosition]}>
                <View
                  style={[styles.gradientButtonChild, styles.gradientPosition, selectedGender ==="male" && styles.selectedIcon]}
                />
                <View
                  style={[styles.gradientButtonItem, styles.gradientPosition]}
                />
              </View>
              <Image
                style={[styles.vectorIcon, selectedGender === "male" && styles.selectedIcon]}
                resizeMode="center"
                source={icons.male}
              />
            </View>
            <Text style={[styles.male, styles.maleFlexBox]}>Male</Text>
          </TouchableOpacity>   
          <TouchableOpacity style={styles.botGenderFemaleParent} onPress={()=>handleGenderSelect("male")}>  
            <View style={styles.botGenderFemale}>
              <View style={[styles.gradientButton, styles.gradientPosition]}>
                <View
                  style={[styles.gradientButtonChild2, styles.gradientPosition, selectedGender ==="female" && styles.selectedIcon]}
                />
                <View
                  style={[styles.gradientButtonItem, styles.gradientPosition]}
                />
              </View>
              <Image
                style={[styles.vectorIcon2, selectedGender === "female" && styles.selectedIcon]}
                resizeMode="center"
                source={icons.female}
              />
            </View>
            <Text style={[styles.female, styles.femaleFlexBox]}>Female</Text>
          </TouchableOpacity>   
        </View>
        <TouchableOpacity style={[styles.continue, styles.femaleFlexBox, selectedGender&&styles.seledted1]} disabled={!selectedGender} onPress={()=>navigation.navigate('age')}>
            <Text style={[styles.continue1, styles.maleTypo]}>Continue</Text>
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  timePosition: {
    top: "50%",
    position: "absolute",
  },
  timeClr: {
    color: "#000",
    textAlign: "center",
  },
  maleTypo: {
    fontFamily: "Poppins-Bold",
    fontWeight: "700",
    textTransform: "capitalize",
  },
  gradientPosition: {
    bottom: "0%",
    left: "0%",
    right: "0%",
    top: "0%",
    height: "100%",
    position: "absolute",
    width: "100%",
  },
  maleFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  femaleFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  arrowLeftbackIcon: {
    height: 24,
    width: 24,
  },
  fillYourProfile: {
    lineHeight: 30,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
    color: "#374151",
    textAlign: "left",
    fontSize: 20,
  },
  titlebackIcon: {
    paddingLeft: 24,
    gap: 14,
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
  },
  statusbarParent: {
    marginTop: 51,
    alignSelf: "stretch",
    alignItems: "center",
  },
  whatsYourGender: {
    fontSize: 25,
    color: "#27187e",
    textAlign: "left",
    fontWeight: "bold",
  },
  gradientButtonChild: {
    backgroundColor: COLORS.soft_blue,
    borderRadius: 100,
  },
  gradientButtonChild2: {
    backgroundColor: COLORS.bright_pink,
    borderRadius: 100,
  },
  seledted1:{
    backgroundColor: COLORS.dark_indigo,
  },
  selectedIcon:{
    backgroundColor: COLORS.continue_gray,
  },
  gradientButtonItem: {
    borderColor: COLORS.light_mist_grey,
    borderRadius: 100,
    borderWidth: 0,
    borderStyle: "solid",
    bottom: "0%",
    shadowRadius: 0,
  },
  gradientButton: {
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 0,
  },
  vectorIcon: {
    height: 100,
    width: 100,
    top: "30%",
    right: "30%",
    bottom: "30%",
    left: "30%",
    maxWidth: "100%",
    maxHeight: "100%",
    position: "static",
  },
  vectorIcon2: {
    height: 100,
    width: 100,
    top: "30%",
    right: "30%",
    bottom: "30%",
    left: "30%",
    maxWidth: "100%",
    maxHeight: "100%",
    position: "static",
  },
  botGenderMale: {
    height: 163,
    width: 163,
    justifyContent: "center",
    alignItems: "center",
  },
  botGenderFemale:{
    height: 163,
    width: 163,
    justifyContent: "center",
    alignItems: "center",
  },
  male: {
    display: "flex",
    height: 26,
    fontFamily: "Poppins-Bold",
    fontWeight: "700",
    textTransform: "capitalize",
    fontSize: 20,
    textAlign: "center",
    color: "#000",
    alignSelf: "stretch",
  },
  female: {
    display: "flex",
    height: 26,
    fontFamily: "Poppins-Bold",
    fontWeight: "700",
    textTransform: "capitalize",
    fontSize: 20,
    textAlign: "center",
    color: "#000",
    alignSelf: "stretch",
  },
  botGenderMaleParent: {
    height: "44.21%",
    bottom: "55.79%",
    left: "0%",
    right: "0%",
    top: "0%",
    position: "absolute",
    gap: 7,
    alignItems: "center",
    width: "100%",
    alignItems: "center",
  },
  botGenderFemaleParent: {
    height: "44.21%",
    width: "99.45%",
    top: "56.67%",
    right: "0.26%",
    bottom: "55.79%",
    left: "0.29%",
    gap: 7,
    position: "absolute",
    alignItems: "center",
  },
  view: {
    height: 450,
    width: 163,
  },
  continue1: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
  },
  continue: {
    backgroundColor: COLORS.continue_gray,
    width: 179,
    paddingHorizontal: 36,
    paddingVertical: 10,
    borderRadius: 100,
    flexDirection: "row",
    overflow: "hidden",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#fff",
    justifyContent: "center",
  },
  whatsYourGenderParent: {
    height: 739,
    gap: 56,
    alignSelf: "stretch",
    alignItems: "center",
  },
  aGender: {
    borderRadius: 54,
    backgroundColor: "#fff",
    flex: 1,
    height: 852,
    gap: 10,
    width: "100%",
    alignItems: "center",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#fff",
    borderStyle: "solid",
  },
});

export default AGender;
