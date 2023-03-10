import { useCallback, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { StatusBar } from "react-native";

import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import Colors from "./constants/colors";
import GameOverScreen from "./screens/GameOverScreen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState (true);
  const [guessRounds, setGuessRounds] = useState(0);

  const [fontsLoaded] = useFonts({
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async() =>{
    if(fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if(!fontsLoaded) {
    return null;
  }

  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }
  function gameOverHandler (numberOfRounds) {
    setGameIsOver(true);
    setGuessRounds(numberOfRounds)
  }
  function startNewGameHandler () {
    setUserNumber()
    setGuessRounds(0);
  }

  let screen = <StartGameScreen onPickNumber= {pickedNumberHandler}/>;
  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler}/>;
  }
  if (gameIsOver && userNumber) {
    screen = <GameOverScreen useNumber={userNumber} roundsNumber={guessRounds} onStartNewGame={startNewGameHandler} />
  }

  return (
    <>
    <StatusBar style='light' />
    <LinearGradient colors={[Colors.accent500,Colors.primary700 ]} style={styles.rootScreen} onLayout={onLayoutRootView}>
      <ImageBackground
        source={require("./assets/images/background.jpg")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
        
      </ImageBackground>
    </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.35,
  },
});
