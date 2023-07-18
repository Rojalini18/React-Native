import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Checkbox, RadioButton} from 'react-native-paper';
import questionData from '../questionData.json';

export type IAnswerType = Array<Array<string> | string>;
type IArrFiveType = Array<string>;

const Question = ({navigation, route}: any) => {
  const [answersArray, setAnswersArray] = useState<IAnswerType>(
    Array(5).fill([]),
  );
  const [arrAnswer5, setArrAnswer5] = useState<IArrFiveType>([]);

  let {id}: {id?: number} = route.params ?? {};

  if (!id) {
    id = 1;
  }

  const handleAnswerSubmit = (): void => {
    navigation.navigate('Result', {state: answersArray});
  };

  const handleCheckBox = (optionValue: string): void => {
    setAnswersArray((value: any): IAnswerType => {
      const dataArray = [...value];
      if (!dataArray[2].includes(optionValue)) {
        dataArray[2] = [...dataArray[2], optionValue];
      } else {
        dataArray[2] = dataArray[2].filter((item: any) => {
          return item !== optionValue;
        });
      }
      return dataArray;
    });
  };

  const handleMatchFollowing = (item: string): void => {
    setArrAnswer5((prev: IArrFiveType): IArrFiveType => {
      const updateDataArr: IArrFiveType = [...prev];
      !updateDataArr.includes(item) && updateDataArr.push(item);
      return updateDataArr;
    });
  };

  useEffect((): void => {
    //console.log(answersArray, arrAnswer5);
  }, [answersArray, arrAnswer5]);

  useEffect((): void => {
    setAnswersArray((values: IAnswerType): IAnswerType => {
      const dataArray: IAnswerType = [...values];
      dataArray[4] = arrAnswer5;
      return dataArray;
    });
  }, [arrAnswer5]);

  if (id > 5 || id < 1) {
    return (
      <View>
        <Text>Id not Available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.questionIdContainer}>
        {questionData.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.questionId,
              id === index + 1 && styles.currentQuestionId,
            ]}
            onPress={() => navigation.navigate('Question', {id: index + 1})}>
            <Text style={styles.questionIdText}>{index + 1}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>
          {id}) {questionData[id - 1]?.question}
        </Text>
      </View>
      <View style={styles.answerContainer}>
        {(() => {
          switch (id) {
            case 1:
              return (
                <TextInput
                  style={styles.questionOne}
                  value={answersArray[0].toString()}
                  onChangeText={(text: string) => {
                    setAnswersArray((values: IAnswerType): IAnswerType => {
                      const dataArray: IAnswerType = [...values];
                      dataArray[0] = text;
                      return dataArray;
                    });
                  }}
                />
              );
            case 2:
              return (
                <View style={styles.radioContainer}>
                  {questionData[1]?.option.map((item: string) => (
                    <View key={item} style={styles.optionContainer}>
                      <RadioButton
                        value={item}
                        status={
                          answersArray[1] === item ? 'checked' : 'unchecked'
                        }
                        onPress={() => {
                          setAnswersArray(
                            (values: IAnswerType): IAnswerType => {
                              const dataArray: IAnswerType = [...values];
                              dataArray[1] = item;
                              return dataArray;
                            },
                          );
                        }}
                      />
                      <Text style={styles.optionText}>{item}</Text>
                    </View>
                  ))}
                </View>
              );
            case 3:
              return (
                <View>
                  {questionData[2]?.option.map((item: string) => (
                    <View key={item}>
                      <Checkbox.Item
                        label={item}
                        status={
                          answersArray[2]?.includes(item)
                            ? 'checked'
                            : 'unchecked'
                        }
                        onPress={() => handleCheckBox(item)}
                        color="black"
                        uncheckedColor="black"
                      />
                    </View>
                  ))}
                </View>
              );
            case 4:
              return (
                <View style={styles.radioContainer}>
                  {questionData[3]?.option.map((item: string) => (
                    <View key={item} style={styles.optionContainerYesOrNo}>
                      <RadioButton
                        value={item}
                        status={
                          answersArray[3] === item ? 'checked' : 'unchecked'
                        }
                        onPress={() => {
                          setAnswersArray(
                            (values: IAnswerType): IAnswerType => {
                              const dataArray: IAnswerType = [...values];
                              dataArray[3] = item;
                              return dataArray;
                            },
                          );
                        }}
                      />
                      <Text style={styles.optionText}>{item}</Text>
                    </View>
                  ))}
                </View>
              );
            case 5:
              return (
                <View>
                  <View style={styles.retryButton}>
                    <Button title="Retry" onPress={() => setArrAnswer5([])} />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{flex: 1}}>
                      {questionData[4]?.questionOption.map(
                        (item: string, index: number) => (
                          <View style={styles.questionBox}>
                            <Text key={index} style={{color: 'black'}}>
                              {item}
                            </Text>
                          </View>
                        ),
                      )}
                    </View>
                    <View style={{flex: 1}}>
                      {questionData[4]?.option.map(
                        (item: string, index: number) => (
                          <View key={index} style={styles.answerBox}>
                            <Button
                              disabled={arrAnswer5.includes(item)}
                              onPress={() => handleMatchFollowing(item)}
                              title={item}
                            />
                          </View>
                        ),
                      )}
                    </View>
                  </View>
                </View>
              );
          }
        })()}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          testID="Prev"
          title="Prev"
          onPress={() => navigation.navigate('Question', {id: id - 1})}
          disabled={id <= 1}
        />
        <Button
          testID="Next"
          title="Next"
          onPress={() => navigation.navigate('Question', {id: id + 1})}
          disabled={id >= 5}
        />
        {id === 5 && (
          <Button
            testID="submitBtn"
            title="Submit"
            onPress={handleAnswerSubmit}
          />
        )}
      </View>
    </View>
  );
};

export default Question;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionIdContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 15,
  },
  questionId: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentQuestionId: {
    backgroundColor: 'grey',
  },
  questionIdText: {
    color: 'black',
    fontSize: 16,
  },
  questionContainer: {
    color: 'black',
    marginBottom: 16,
  },
  questionText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  answerContainer: {
    color: 'black',
    marginBottom: 16,
    width: '100%',
  },
  questionOne: {
    color: 'black',
    width: '50%',
    justifyContent: 'center',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginLeft: 80,
    paddingBottom: 2,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 16,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  optionText: {
    color: 'black',
    marginLeft: 8,
  },
  optionContainerYesOrNo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 60,
  },
  retryButton: {
    height: 50,
    width: 100,
    marginLeft: 115,
    marginTop: 10,
    marginBottom: 20,
  },
  questionBox: {
    height: 55,
    width: 150,
    marginLeft: 10,
    marginBottom: 10,
    borderWidth: 1,
    padding: 2,
    textAlign: 'center',
  },
  answerBox: {
    height: 50,
    width: 100,
    marginLeft: 50,
    marginBottom: 10,
  },
  buttonContainer: {
    gap: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
