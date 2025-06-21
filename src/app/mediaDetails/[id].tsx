import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import mediaDetailedList from "@assets/data/mediaDetailedList.json";
import MediaInfo from "@/components/MediaDetails/MediaInfo";
import { useVideoPlayer, VideoView } from "expo-video";
import MediaHeader from "@/components/MediaDetails/MediaHeader";
import { useRef } from "react";

export default function MediaDetails() {
  const { id } = useLocalSearchParams();
  const videoViewRef = useRef<VideoView | null>(null);

  const mediaItem = mediaDetailedList.find((media) => media.id === id);

  if (!mediaItem) {
    return <Text>Media Not Found!</Text>;
  }

  const {
    type,
    title,
    description,
    releaseYear,
    ageRestriction,
    duration,
    thumbnail,
    trailer,
    videoUrl,
    seasons,
  } = mediaItem;

  const videoSource =
    type === "MOVIE" ? videoUrl : seasons?.[0]?.episodes?.[0]?.videoUrl;

  if (!videoSource) {
    return <Text>No playable video found.</Text>;
  }

  const trailerPlayer = useVideoPlayer(trailer, (player) => {
    player.currentTime = 10;
    player.play();
  });

  const mediaPlayer = useVideoPlayer(videoSource, (player) => {
    player.showNowPlayingNotification = true;
  });

  const onPlayMediaPressed = () => {
    trailerPlayer.pause();
    videoViewRef.current?.enterFullscreen();
    mediaPlayer.play();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MediaHeader
        thumbnail={thumbnail}
        trailerPlayer={trailerPlayer}
        mediaPlayer={mediaPlayer}
        videoViewRef={videoViewRef}
      />
      <MediaInfo
        title={title}
        releaseYear={releaseYear}
        ageRestriction={ageRestriction}
        duration={duration}
        description={description}
        type={type}
        nrOfSeasons={seasons?.length}
        onPlayMediaPressed={onPlayMediaPressed}
      />
    </SafeAreaView>
  );
}
