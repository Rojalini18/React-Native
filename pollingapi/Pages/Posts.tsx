import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Table, Row, Rows, Col} from 'react-native-table-component';
import axios from 'axios';

export const Posts = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  interface IData {
    url: string;
    title: string;
    created_at: string;
    author: string;
    objectID: string;
  }

  const [data, setData] = useState<IData[]>([]);
  const [item, setItem] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pageRendered, setPageRendered] = useState(true);
  const selectPage = useRef(page);
  let interval: any;

  useEffect(() => {
    interval = setTimeout(() => {
      if (!loading) {
        selectPage.current += 1;
        setPage(selectPage.current);
      }
    }, 10000);
    return () => clearTimeout(interval);
  }, [page, loading]);

  useEffect(() => {
    if (!loading && pageRendered) {
      fetchData(page);
    }
  }, [page, loading]);

  const fetchData = async (page: number) => {
    setLoading(true);
    const getData = await axios.get(
      `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`,
    );
    if (getData.data.hits.length > 0) {
      setData([...data, ...getData.data.hits]);
      setPage(page + 1);
    } else {
      setPageRendered(false);
    }

    setItem(page);
    setLoading(false);
  };

  const tableHead = ['TITLE', 'URL', 'CREATED_AT', 'AUTHOR'];

  return (
    <ScrollView style={{flex: 1, padding: 5}}>
      <Table style={{borderWidth: 2}}>
        <Row
          data={tableHead}
          style={{
            borderWidth: 1,
            height: 50,
            backgroundColor: 'black',
            paddingVertical: 8,
          }}
          textStyle={{
            fontSize: 12,
            fontWeight: 'bold',
            textAlign: 'center',
            color: 'white',
          }}
        />
        {data.map((post, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate('Raw_JSON', {item: post})}
            style={{flex: 1, flexDirection: 'row'}}>
            <Col
              data={[post.title]}
              style={{borderWidth: 1, margin: 'auto'}}
              textStyle={{
                color: 'black',
                fontSize: 10,
                textAlign: 'center',
                padding: 2,
                gap: 2,
              }}
            />
            <Col
              data={[post.url]}
              style={{borderWidth: 1, margin: 'auto'}}
              textStyle={{
                color: 'black',
                fontSize: 10,
                textAlign: 'center',
                padding: 2,
                gap: 2,
              }}
            />
            <Col
              data={[post.created_at]}
              style={{borderWidth: 1, margin: 'auto'}}
              textStyle={{
                color: 'black',
                fontSize: 10,
                textAlign: 'center',
                padding: 2,
                gap: 2,
              }}
            />
            <Col
              data={[post.author]}
              style={{borderWidth: 1, margin: 'auto'}}
              textStyle={{
                color: 'black',
                fontSize: 10,
                textAlign: 'center',
                padding: 2,
                gap: 2,
              }}
            />
          </TouchableOpacity>
        ))}
      </Table>
    </ScrollView>
  );
};
