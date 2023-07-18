import React from 'react';
import {View, Text, Button, ScrollView, StyleSheet} from 'react-native';
import PieChart from './PieChart';
import questionData from '../questionData.json';

type Question = {
  id: number;
  question: string;
  answer: string | string[];
};

type RouteParams = {
  state: (string | string[])[];
};

const Result = ({navigation, route}: any) => {
  const {state} = route.params as RouteParams;
  let isRightAnswer = false;

  const rightAnswerData = questionData.reduce((prev, question) => {
    const userAnswer = state[question.id - 1];
    const correctAnswer = question.answer;
    const isAnswerCorrect =
      Array.isArray(userAnswer) && Array.isArray(correctAnswer)
        ? JSON.stringify(userAnswer.sort()) ===
          JSON.stringify(correctAnswer.sort())
        : userAnswer === correctAnswer;

    return isAnswerCorrect ? prev + 1 : prev;
  }, 0);

  // if (!state) {
  //   return (
  //     <View>
  //       <Text style={{color: 'black'}}>Not Available</Text>
  //     </View>
  //   );
  // }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.answerText} testID="got-answer">
        You got {rightAnswerData}/5
      </Text>
      <View style={styles.pieChartContainer} testID="pie-chart">
        <PieChart chartColourPercentage={(rightAnswerData * 100) / 5} />
      </View>
      {questionData.map((question: Question) => {
        isRightAnswer = (() => {
          const userAnswer = state[question.id - 1];
          const correctAnswer = question.answer;
          return Array.isArray(userAnswer) && Array.isArray(correctAnswer)
            ? JSON.stringify(userAnswer.sort()) ===
                JSON.stringify(correctAnswer.sort())
            : userAnswer === correctAnswer;
        })();
        return (
          <View key={question.id}>
            <Text style={styles.question} testID="question">
              Q: {question.question}
            </Text>
            <View
              style={{
                backgroundColor: isRightAnswer ? '#00bc22' : '#ee1c25',
                padding: 10,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.questionText}>
                {JSON.stringify(state[question.id - 1])}
              </Text>
            </View>
            {!isRightAnswer && (
              <View>
                <Text style={styles.rightAns} testID="answer">
                  Right answer:{' '}
                </Text>
                <Text style={styles.rightAns}>
                  {JSON.stringify(question?.answer)}
                </Text>
              </View>
            )}
          </View>
        );
      })}
      <View style={styles.btnContainer}>
        <Button
          title="Retry"
          onPress={() => navigation.navigate('Question', {id: 1})}
        />
        <Button title="Exit" onPress={() => navigation.navigate('Home')} />
      </View>
    </ScrollView>
  );
};

export default Result;

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10,
  },
  answerText: {
    marginTop: 10,
    marginLeft: 115,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pieChartContainer: {
    marginLeft: 65,
    marginTop: 10,
  },
  question: {
    color: 'black',
    padding: 2,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {color: 'white'},
  rightAns: {color: 'black'},
  btnContainer: {
    gap: 10,
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 110,
  },
});
