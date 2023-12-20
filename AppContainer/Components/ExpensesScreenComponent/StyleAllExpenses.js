import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    height: height * 0.78,
    backgroundColor: "white",
    padding: "2.5%",
  },
  familyMemberSection: {
    marginBottom: 20,
  },
  familyMemberHeader: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 10,
  },
  headerContainer: {
    borderRadius: 5,
    backgroundColor: "#EFF3FB",
    paddingRight: width * 0.05,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryItemTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  categoryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 2,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  modalContentContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    // justifyContent: "space-between",
    alignItems: "center",
  },
  detailText: {
    fontSize: 14,
    textAlign: "center",
    width: width * 0.17,
  },
  detailTextTitle: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    width: width * 0.17,
  },
  pickerContainer: {
    borderWidth: 1,
    height: height * 0.065,
    marginLeft: width * 0.01,
    textAlign: "center",
    width: width * 0.8,
    backgroundColor: "#EFF3FB",
    borderColor: "#205578",
    borderRadius: 5,

    paddingHorizontal: 10,
    marginBottom: 20,
  },
  pickerContainer2: {
    borderWidth: 1,
    height: height * 0.05,
    marginLeft: width * 0.01,
    textAlign: "center",
    width: width * 0.4,
    backgroundColor: "#EFF3FB",
    borderColor: "#205578",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: height * 0.02,
  },
  pickerContainer3: {
    borderWidth: 1,
    height: height * 0.06,
    marginLeft: width * 0.01,
    width: width * 0.63,
    textAlign: "center",
    backgroundColor: "#EFF3FB",
    borderColor: "#205578",
    borderRadius: 5,
    // paddingLeft: width * 0.1,
    marginBottom: 20,
  },
  pickerItem: {
    fontSize: width * 0.035,
    textAlign: "center",
    // Include other styling as needed
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  madalViewConteiner: {
    width: width * 0.9,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
  },
  modalTextTitle: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  modalText: {
    fontSize: 18,
  },
  closeButton: {
    backgroundColor: "red",
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    marginTop: "2%",
  },
  saveButton: {
    backgroundColor: "#205578",
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  datePickerModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  datePickerContainer: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  pickerGroup: {
    flexDirection: "row",
    justifyContent: "center",
  },
  datePicker: {
    width: 120,
  },
  datePickerText: {
    marginVertical: 8,
    padding: 2,
    textAlign: "center",
  },
});
