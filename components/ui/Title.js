import { Text, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

function Title({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}

export default Title;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 24,
    //fontWeight: "bold",
    color: 'white',
    textAlign: "center",
    borderWidth: 2,
    borderColor: 'white',
    padding: 12,
    maxWidth: '80%', // in other screen, width should be smaller to fix the screen, n´but in the large screen, it is maximum is 80%
    // % when we set like this always refer to the parent container that holds an element. In this case: 80% maxWdth refer to the container that holds the title (<View style={styles.screen}>)
  },
});
