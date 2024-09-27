import { Tabs } from "expo-router";
import { FontAwesome5 } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarShowLabel: false, headerShown: false }}>
      <Tabs.Screen
        name="home"
        options={{ 
          title: "Home",
          tabBarIcon: ({ color, size }) => <FontAwesome5 name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="qwe"  // 동적 경로로 이름 설정
        options={{ 
          title: "Qwe",
          href: {
            pathname: "/home/qwe",  // 원하는 경로로 설정
          },
          tabBarIcon: ({ color, size }) => <FontAwesome5 name="list" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="walking"
        options={{ 
          title: "Walking",
          tabBarIcon: ({ color, size }) => <FontAwesome5 name="walking" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Calendar",
          tabBarIcon: ({ color, size }) => <FontAwesome5 name="calendar" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="board"
        options={{
          title: "Board",
          tabBarIcon: ({ color, size }) => <FontAwesome5 name="clipboard" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: "Setting",
          tabBarIcon: ({ color, size }) => <FontAwesome5 name="cog" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
