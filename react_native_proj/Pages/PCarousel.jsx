import React, { useContext, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { rideContext } from '../context/RidesContext';
import { Card, Paragraph, Title } from 'react-native-paper';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function PCarousel() {
  const { rides, addRide } = useContext(rideContext);
  const [activeIndex, setActiveIndex] = useState(rides.length - 1);

  return (
    <View style={styles.container}>
      <Carousel
        loop
        autoPlay={true}
        autoPlayInterval={2000}
        width={windowWidth}
        data={rides}
        onSnapToItem={(index) => setActiveIndex(rides.length - index - 1)}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <Card style={styles.card}>
              <Card.Content>
                <Title style={styles.title}>
                  {item.id} מ{item.from} ל{item.to}
                </Title>
                <Paragraph style={styles.paragraph}>הועלה ע"י: {item.userId}</Paragraph>
                <Paragraph style={styles.paragraph}>מס' מקומות: {item.seats}</Paragraph>
                <Paragraph style={styles.paragraph}>הערה: {item.note}</Paragraph>
              </Card.Content>
            </Card>
          </View>
        )}
        style={styles.carousel}
      />
      {/* <View style={styles.indicatorContainer}>
        {rides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              index === activeIndex ? styles.activeIndicator : null,
            ]}
          />
        ))}
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFEF',
    justifyContent: 'center',
    marginTop: 100,
  },
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  card: {
    width: windowWidth * 0.8,
    borderRadius: 10,
    backgroundColor: '#FFF',
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#F57C00',
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
    textAlign: 'center',
  },
  carousel: {
    borderRadius: 10,
    padding: 10,
  },
//   indicatorContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     position: 'absolute',
//     top: -10,
//     width: '100%',
//   },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
    backgroundColor: '#999',
  },
  activeIndicator: {
    backgroundColor: '#F57C00',
  },
});
