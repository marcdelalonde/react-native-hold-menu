import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";

import StyleGuide from "../components/StyleGuide";
import { MaterialIcons } from "@expo/vector-icons";

import { Messages } from "./variables";
import { HoldMenuActions } from "../data/HoldMenuActions";

// React Native Hold Menu Components
import { ItemToHold } from "../../react-native-hold-menu";

interface ChatPageProps {}

const ChatPage = () => {
  const [selectedMessage, setSelectedMessage] = React.useState<number>(0);

  React.useEffect(() => {
    HoldMenuActions.SetBackDropState({
      toggle: selectedMessage > 0,
      onCloseMenu: () => setSelectedMessage(0),
    });
  }, [selectedMessage]);

  const handleOpenMenu = (messageId: number) => {
    setSelectedMessage(messageId);
  };

  const handleCloseMenu = () => {
    setSelectedMessage(0);
  };

  const messageStyles = (fromMe: boolean) =>
    fromMe
      ? {
          right: 0,
          borderBottomRightRadius: StyleGuide.spacing / 4,
          backgroundColor: StyleGuide.palette.whatsapp.messageBackgroundSender,
        }
      : {
          left: 0,
          borderBottomLeftRadius: StyleGuide.spacing / 4,
          backgroundColor:
            StyleGuide.palette.whatsapp.messageBackgroundReceiver,
        };

  const [scrollY, setScrollY] = React.useState(0);

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.container}
        scrollEnabled={!selectedMessage}
        scrollEventThrottle={50}
        onScroll={(event) => {
          setScrollY(event.nativeEvent.contentOffset.y);
        }}
      >
        {Messages.map((message, index) => {
          return (
            <ItemToHold
              id={scrollY}
              key={index}
              onOpenMenu={() => handleOpenMenu(message.id)}
              onCloseMenu={handleCloseMenu}
              isSelected={selectedMessage == message.id}
              containerStyle={[
                styles.messageContainer,
                { alignItems: message.fromMe ? "flex-end" : "flex-start" },
              ]}
              menuProps={{
                anchorPoint: message.fromMe ? "top-right" : "top-left",
              }}
              wrapperStyle={[
                styles.message,
                { ...messageStyles(message.fromMe), right: 0 },
              ]}
            >
              <Text style={styles.messageText}>{message.text}</Text>
              <View style={styles.messageTimeAndSeenContainer}>
                <Text style={styles.messageTimeText}>{message.time}</Text>
                <MaterialIcons
                  name="done-all"
                  size={16}
                  color={StyleGuide.palette.whatsapp.seenCheckColor}
                />
              </View>
            </ItemToHold>
          );
        })}
        {/* <MenuBackDrop
          toggle={selectedMessage > 0}
          onCloseMenu={handleCloseMenu}
        /> */}
      </ScrollView>
    </>
  );
};

export default ChatPage;

const styles = StyleSheet.create({
  container: {
    width: StyleGuide.dimensionWidth,
    backgroundColor: StyleGuide.palette.whatsapp.chatBackground,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    paddingHorizontal: StyleGuide.spacing * 2,
    zIndex: 6,
  },
  messageContainer: {
    position: "relative",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    // backgroundColor: "red",
    marginTop: StyleGuide.spacing,
  },
  message: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    maxWidth: "80%",
    paddingHorizontal: StyleGuide.spacing,
    paddingVertical: StyleGuide.spacing,
    borderRadius: StyleGuide.spacing,
    shadowColor: "rgba(0, 0, 0, .2)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 120,
  },
  messageText: {
    ...StyleGuide.typography.body,
    color: StyleGuide.palette.whatsapp.messageText,
    textAlign: "left",
  },
  messageTimeAndSeenContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  messageTimeText: {
    marginRight: StyleGuide.spacing / 2,
    textAlign: "right",
    fontSize: 12,
    color: "gray",
  },
});
