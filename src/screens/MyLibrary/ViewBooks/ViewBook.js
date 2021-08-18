import React, {useState} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';

import Pdf from 'react-native-pdf';
import styles from './viewBooks.styles';

const ViewBook = ({route}) => {
  const {url} = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState('');
  const [currentPage, setCurrentPage] = useState('');

  const source = {
    uri: url,
    cache: true,
  };
  const pdfView = () => {
    return (
      <Pdf
        source={source}
        // fitWidth={true}
        onLoadComplete={numberOfPages => {
          // console.log(`number of pages: ${numberOfPages}`);
          setTotalPages(`${numberOfPages}`);
          setIsLoading(false);
        }}
        onPageChanged={(page, numberOfPages) => {
          // console.log(`current page: ${page}`);
          setCurrentPage(`${page}`);
        }}
        onError={error => {
          // console.log(error);
        }}
        // horizontal
        style={styles.pdf}
      />
    );
  };
  return (
    <View style={styles.screen}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.heading}>
          <Text style={styles.pageNum}>
            {currentPage} / {totalPages}
          </Text>
        </View>
      )}
      {pdfView()}
    </View>
  );
};

export default ViewBook;
