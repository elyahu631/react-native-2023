import { View, Text } from 'react-native'
import React from 'react'

export default function CRide({ item }) {
  return (
    <Card style={styles.card}>
    <Card.Cover  />
    <Card.Content>
      <Title>{item.id}</Title>
      <Paragraph>{item.note}</Paragraph>
    </Card.Content>
  </Card>
  )
}


  