import { Text, View } from "react-native";
import mediaList from '@assets/data/mediaList.json';

export default function MediaListItem() {
  const mediaItem = mediaList[0];

  return (
    <View>
      <Text>{mediaItem.title}</Text>
    </View>
  );
}
